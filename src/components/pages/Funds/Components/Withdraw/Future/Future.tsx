import { Form, Formik } from "formik";
import { Button, CustomSlider, WithdrawHeading } from "../../../../../common";
import { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dailyStatus,
  futureWithdrawFunction,
  initialSkyTotalSupplyFunction,
  skyTokenTotalSupplyFunction,
} from "../../../../../Services/CallContract";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import {
  calculateRemainingDays,
  skyValueConvert,
  toCustomFixed,
} from "../../../../../Services/Helper";
import toast from "react-hot-toast";
import { setLoading } from "../../../../../../redux/features/reducers/loading.slice";
import { days, PROGRESS_BAR } from "../../../../../../utils/constants";
import {
  setProgress,
} from "../../../../../../redux/features/reducers/user.slice";
import { RootState } from "../../../../../../redux/types";
import { Action, Status, UserDetails, WithdrawState } from "../../../../../Services/Interfaces";

const Future = ({ setFutureIncome, futureIncome, handleRefresh }: any) => {
  const dispatch: Dispatch<any> = useDispatch();

  const { walletProvider } = useWeb3ModalProvider();
  const {
    walletAddress,
    freezingStatus,
    status,
    userDetails,
    duckIncome,
    currentTime,
    after14days,
    progress,
    remainingDays,
  } = useSelector((state: RootState) => state?.user);

  const [withdrawState, setWithdrawState] = useState<WithdrawState>({
    disable: true,
    progressValue: 0,
    totalSupply: "0",
  });

  const onSubmit = (values: any) => {};


  const futureIncomeReward = async () => {
    const futureReward = await dailyStatus(walletAddress, walletProvider);
    setFutureIncome(skyValueConvert(futureReward?.futureIncome));

    const totalSupply = await skyTokenTotalSupplyFunction(walletProvider);
    const initialSkyTotalSupply = await initialSkyTotalSupplyFunction(
      walletProvider
    );

    const progressBarValue = Number(
      (usdtValueConvert(totalSupply) /
        usdtValueConvert(initialSkyTotalSupply)) *
        100
    );

    let updatedBarValue = progressBarValue > 0 ? 100 - Number(progressBarValue) : 0;
    setWithdrawState((prevState) => ({
      ...prevState,
      disable: updatedBarValue <= 0.1 ? false : true,
      progressValue: Number(updatedBarValue) >= Number(PROGRESS_BAR) ? 100 : toCustomFixed(updatedBarValue, 2),
      totalSupply,
    }));

    dispatch(
      setProgress(
        Number(updatedBarValue) >= Number(PROGRESS_BAR)
          ? 100
          : toCustomFixed(updatedBarValue, 2)
      )
    );
  };

  useEffect(() => {
    futureIncomeReward();
  }, [status?.totalInvested > 0, withdrawState.totalSupply, walletAddress]);

  useEffect(() => {
    if (walletAddress) getNextTime(dispatch, status, userDetails, days);
  }, [walletAddress]);

  const FutureWithdraw = async () => {
    try {
      dispatch(setLoading(true));
      const futureResponse = await futureWithdrawFunction(
        walletProvider,
        walletAddress
      );
      if (futureResponse?.status) {
        toast?.success("Tokens Withdraw Successfully !!");
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  const initialTimeValues = {
    day: "",
    hour: "",
    minute: "",
  };
  const usdtValueConvert = (value: string | undefined): number => {
    // Assuming this function converts a USDT value string to a number
    return parseFloat(value ?? "0");
  };

  // Action creators
  const setCurrentTime = (time: string): Action => ({
    type: "SET_CURRENT_TIME",
    payload: time,
  });

  const setAfter14Days = (time: number): Action => ({
    type: "SET_AFTER_14_DAYS",
    payload: time,
  });

  const setRemainingDays = (days: number): Action => ({
    type: "SET_REMAINING_DAYS",
    payload: days,
  });

  const getNextTime = async (
    dispatch: Dispatch<Action>,
    status: Status,
    userDetails: UserDetails,
    days: string
  ) => {
    const totalInvested = usdtValueConvert(status.totalInvested);
    const resetTime = Number(userDetails.resetTime);
    const daysInMs = Number(days) * 24 * 60 * 60 * 1000; // 14 days in milliseconds

    if (totalInvested > 0 || userDetails.resetTime === "0" || resetTime === 0) {
      dispatch(setCurrentTime(""));
      dispatch(setAfter14Days(0));
    } else {
      const nextEpochTimeMs = resetTime * 1000 + daysInMs;
      const nextEpochTimeInSeconds = Math.floor(nextEpochTimeMs / 1000);
      dispatch(setAfter14Days(nextEpochTimeInSeconds));

      // Dynamic 14
      const currentTimeMs = new Date().getTime();
      dispatch(setCurrentTime(currentTimeMs.toString()));
      const daysLeft = calculateRemainingDays(nextEpochTimeInSeconds);
      dispatch(setRemainingDays(daysLeft));
    }
  };

  return (
    <div className={`withdraw-inner`}>
      {Number(usdtValueConvert(status?.totalInvested) == 0) &&
      (userDetails.resetTime == "0" || userDetails.resetTime == 0) ? (
        <WithdrawHeading
          title="Future Golden Duck"
          amount={duckIncome}
          tooltipMsg={"Please invest to earn rewards"}
          handleRefresh={handleRefresh}
        />
      ) : Number(progress) < Number(PROGRESS_BAR) ? (
        <WithdrawHeading
          title="Future Golden Duck"
          amount={
            userDetails?.resetTime > "0" ||
            userDetails?.resetTime > 0 ||
            Number(currentTime) > Number(after14days)
              ? futureIncome
              : duckIncome
          }
          tooltipMsg={`You can't withdraw until bar reaches to ${PROGRESS_BAR}% of burn`}
          handleRefresh={handleRefresh}
        />
      ) : Number(progress) > Number(PROGRESS_BAR) ? (
        <WithdrawHeading
          title="Future Golden Duck"
          amount={
            (userDetails?.resetTime > "0" || userDetails?.resetTime > 0) &&
            Number(currentTime) > Number(after14days)
              ? futureIncome
              : duckIncome
          }
          tooltipMsg={`ALERT: You crossed your ${days} days limit to
            re-invest, therefore you will loose your sky tokens on your new investment!`}
          handleRefresh={handleRefresh}
        />
      ) : (
        ""
      )}

      <Formik
        initialValues={initialTimeValues}
        // // validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik): any => (
          <Form>
            {Number(currentTime) > Number(after14days) ? (
              <p className="token_invest">
                {remainingDays <= 0
                  ? `ALERT: You crossed your ${days} days limit to re-invest, therefore you will lose your sky tokens on your new investment!`
                  : `You have ${remainingDays} days remaining to re-invest.`}
              </p>
            ) : (
              ""
            )}
            <Button
              text="Withdraw"
              className="w-100"
              onClick={() => FutureWithdraw()}
              disabled={
                withdrawState?.disable == true ||
                freezingStatus == true ||
                duckIncome == 0 ||
                futureIncome == 0 ||
                withdrawState?.progressValue < Number(PROGRESS_BAR)
              }
            />
            <p className="burning_text"> Burning Percentage </p>
            <CustomSlider
              progressbarValue={
                withdrawState?.progressValue == undefined || "NaN" ? "0" : withdrawState?.progressValue
              }
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Future;