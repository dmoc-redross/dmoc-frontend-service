import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Button, WithdrawHeading } from "../../../../../common";
import Countdown from "react-countdown";
import styles from "../Weekly/Weekly.module.scss";
import { Dispatch, useEffect, useState } from "react";
import {
  WithdrawFromContract,
  globalTimeWithdraw,
  dailyWithdrawRewards,
} from "../../../../../Services/CallContract";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { setLoading } from "../../../../../../redux/features/reducers/loading.slice";
import toast from "react-hot-toast";
import { usdtValueConvert } from "../../../../../Services/Helper";
import { daily_timer, days } from "../../../../../../utils/constants";
import { setperDayRewardGenerated } from "../../../../../../redux/features/reducers/user.slice";
import { RootState } from "../../../../../../redux/types";

const Daily = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const {
    walletAddress,
    userDetails,
    freezingStatus,
    status,
    perdayRewardGenerated,
    remainingDays,
    withdrawPercent,
  } = useSelector((state: any) => state?.user);

  const { loading } = useSelector((state: any) => state?.loading);
  const { walletProvider } = useWeb3ModalProvider();
  const [withdrawButtonDisable, setWithdrawButtonDisable] =
    useState<boolean>(false);
  const [WithdrawTime, setWithdrawTime] = useState<string | number>();

  const initialValues = {
    amount: "",
  };
  const totalRewards: number =
    Number(status?.receivedDailyIncome) + Number(status?.receivedWeeklyIncome);

  const handleRefresh = async () => {
    try {
      const dailyRewards = await dailyWithdrawRewards(
        walletProvider,
        walletAddress
      );
      dispatch(setperDayRewardGenerated(dailyRewards));
    } catch (err) {
      console.log("daily error", err);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      getWithdrawTime(daily_timer, "minutes");
      handleRefresh();
    }
  }, [userDetails, loading, withdrawButtonDisable, status?.totalInvested > 0]);
  const remainingRewards: Number =
    Number(status?.maxCap) - Number(totalRewards);

  const getWithdrawTime = async (value: number, timeType: string) => {
    let timeVariable =
      timeType == "hours"
        ? value * 60 * 60
        : timeType == "minutes"
        ? value * 60
        : value;
    let globalTime = await globalTimeWithdraw(walletProvider);
    globalTime = globalTime?.toString();
    const floorValue = Math.floor(
      (Math.ceil(new Date().getTime() / 1000) - Number(globalTime)) /
        timeVariable
    );

    let groundTimeInSeconds = timeVariable * (floorValue + 1);

    const originalTimestamp =
      Math.ceil(new Date().getTime() / 1000) - Number(globalTime);
    const remainingTime = groundTimeInSeconds - originalTimestamp;

    const currentUnixTimeStamp = new Date().getTime() / 1000;
    if (Number(globalTime) + timeVariable < currentUnixTimeStamp) {
      globalTime = currentUnixTimeStamp + remainingTime;
    } else {
      globalTime = Number(globalTime) + timeVariable;
    }
    globalTime = globalTime * 1000;
    setWithdrawTime(globalTime);
  };

  const validationSchema = Yup.object({
    amount: Yup.string()
      .matches(/^[0-9]*$/, "Please enter a valid numeric amount")
      .required("Please enter minimum amount"),
  });
  const onSubmit = async (values: any) => {};

  const handleWithdraw = async () => {
    try {
      if (
        Number(usdtValueConvert(perdayRewardGenerated)) >=
        Number(withdrawPercent)
      ) {
        dispatch(setLoading(true));
        const withdrawResponse = await WithdrawFromContract(
          "Daily",
          walletAddress,
          walletProvider
        );

        if (withdrawResponse?.status) {
          // setDailyRewards("");
          dispatch(setperDayRewardGenerated(""));
          toast?.success("Tokens Withdraw Successfully !!");
          dispatch(setLoading(false));
        }
        // setDailyWithdrawAmount(values);
      } else {
        toast?.error(
          `Failed to withdraw tokens. Ensure daily rewards should be atleast ${withdrawPercent}.`
        );
      }
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className={`withdraw-inner `}>
      {Number(usdtValueConvert(status?.totalInvested) == 0) ? (
        <WithdrawHeading
          title="Daily"
          amount={perdayRewardGenerated}
          tooltipMsg={"Please invest to earn rewards"}
          handleRefresh={handleRefresh}
        />
      ) : usdtValueConvert(perdayRewardGenerated) >=
          Number(usdtValueConvert(status?.maxCap)) ||
        usdtValueConvert(remainingRewards) ==
          usdtValueConvert(perdayRewardGenerated) ? (
        <WithdrawHeading
          title="Daily"
          amount={perdayRewardGenerated}
          tooltipMsg={"Limit reached for rewards , Please withdraw "}
          handleRefresh={handleRefresh}
        />
      ) : Number(usdtValueConvert(totalRewards)) ==
        Number(usdtValueConvert(status?.maxCap)) ? (
        <WithdrawHeading
          title="Daily"
          amount={perdayRewardGenerated}
          tooltipMsg={
            remainingDays <= 0
              ? `Please re-invest within ${days} days to retain your sky tokens`
              : `Please re-invest within ${remainingDays} days to retain your sky tokens`
          }
          handleRefresh={handleRefresh}
        />
      ) : (
        <WithdrawHeading
          title="Daily"
          amount={perdayRewardGenerated}
          // tooltipMsg={"Please invest to earn rewards"}
          handleRefresh={handleRefresh}
        />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div className={styles.weekly_timer}>
              {WithdrawTime ? (
                <Countdown
                  date={WithdrawTime}
                  intervalDelay={0}
                  key={WithdrawTime}
                  renderer={({ days, hours, minutes, seconds, completed }) => {
                    if (completed) {
                      setWithdrawButtonDisable(completed);
                    }
                    return (
                      <>
                        <>
                          <span>{hours > 9 ? hours : `0${hours}`} H</span>
                        </>
                        <>
                          <span>{minutes > 9 ? minutes : `0${minutes}`} M</span>
                        </>
                        <>
                          <span>{seconds > 9 ? seconds : `0${seconds}`} S</span>
                        </>
                      </>
                    );
                  }}
                />
              ) : (
                <>
                  <>
                    <span>{"00"} H</span>
                  </>
                  <>
                    <span>{"00"} M</span>
                  </>
                  <>
                    <span>{"00"} S</span>
                  </>
                </>
              )}
            </div>
            <Button
              text="Withdraw"
              className="w-100"
              type="submit"
              disabled={
                userDetails?.totalInvested == "0" ||
                // !withdrawButtonDisable ||
                perdayRewardGenerated == "0" ||
                !perdayRewardGenerated ||
                freezingStatus == true ||
                parseFloat(
                  usdtValueConvert(perdayRewardGenerated)?.toString()
                ) < Number(withdrawPercent)
              }
              onClick={() => handleWithdraw()}
            />
            {Number(usdtValueConvert(perdayRewardGenerated)) <
              Number(withdrawPercent) &&
            Number(usdtValueConvert(perdayRewardGenerated)) > 0 ? (
              <p className="token_invest mt-3">
                {" "}
                To withdraw tokens, Ensure daily rewards should be atleast{" "}
                <b className="text-secondary">${withdrawPercent}</b>.
              </p>
            ) : (
              ""
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Daily;
