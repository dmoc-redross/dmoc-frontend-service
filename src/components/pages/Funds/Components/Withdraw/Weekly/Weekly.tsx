import { Form, Formik } from "formik";
import { Button, WithdrawHeading } from "../../../../../common";
import styles from "./Weekly.module.scss";
import Countdown from "react-countdown";
import { Dispatch, useEffect, useState } from "react";
import { setLoading } from "../../../../../../redux/features/reducers/loading.slice";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import {
  WithdrawFromContract,
  globalTimeWithdraw,
} from "../../../../../Services/CallContract";
import toast from "react-hot-toast";
import { usdtValueConvert } from "../../../../../Services/Helper";
import { days, weekly_timer } from "../../../../../../utils/constants";
import { setweekRewardGenerated } from "../../../../../../redux/features/reducers/user.slice";
import { WeeklyProps } from "../../../../../Services/Interfaces";

const Weekly: React.FC<WeeklyProps> = ({
  setWithdrawButtonDisable,
  withdrawButtonDisable,
  handleRefresh,
}) => {
  const dispatch: Dispatch<any> = useDispatch();

  const {
    walletAddress,
    userDetails,
    freezingStatus,
    status,
    weekRewardGenerated,
    remainingDays,
    withdrawPercent,
  }: any | undefined = useSelector((state: any | undefined) => state?.user);

  const { loading } = useSelector((state: any) => state?.loading);

  const [weeklyWithdrawTime, setWeeklyWithdrawTime] = useState<
    string | number | undefined
  >();
  const totalRewards: number =
    Number(status?.receivedDailyIncome) + Number(status?.receivedWeeklyIncome);

  const { walletProvider } = useWeb3ModalProvider();

  const initialValues = {
    day: "",
    hour: "",
    minute: "",
  };
  const remainingRewards: Number =
    Number(status?.maxCap) - Number(totalRewards);

  useEffect(() => {
    if (walletAddress) getWithdrawTime(weekly_timer, "minutes");
  }, [userDetails, loading, withdrawButtonDisable]);

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
    setWeeklyWithdrawTime(globalTime);
  };

  const handleWithdraw = async () => {
    try {
      if (
        Number(usdtValueConvert(weekRewardGenerated)) >= Number(withdrawPercent)
      ) {
        dispatch(setLoading(true));
        const withdrawResponse = await WithdrawFromContract(
          "weekly",
          walletAddress,
          walletProvider
        );

        if (withdrawResponse?.status) {
          dispatch(setweekRewardGenerated(""));
          toast?.success("Tokens Withdraw Successfully !!");
          dispatch(setLoading(false));
        }
        // setDailyWithdrawAmount(values);
      } else {
        toast?.error(
          `Failed to withdraw tokens. Ensure weekly rewards should be atleast ${withdrawPercent}.`
        );
      }
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
  const onSubmit = (values: any) => {};

  return (
    <div className={`withdraw-inner ${styles.weekly_wdr}`}>
      {Number(usdtValueConvert(status?.totalInvested) == 0) ? (
        <WithdrawHeading
          title="Weekly"
          amount={weekRewardGenerated}
          tooltipMsg={"Please invest  to earn rewards"}
          handleRefresh={handleRefresh}
        />
      ) : usdtValueConvert(weekRewardGenerated) >=
          Number(usdtValueConvert(status?.maxCap)) ||
        usdtValueConvert(remainingRewards) ==
          usdtValueConvert(weekRewardGenerated) ? (
        <WithdrawHeading
          title="Weekly"
          amount={weekRewardGenerated}
          tooltipMsg={"Limit reached for rewards , Please withdraw"}
          handleRefresh={handleRefresh}
        />
      ) : Number(usdtValueConvert(totalRewards)) ==
        Number(usdtValueConvert(status?.maxCap)) ? (
        <WithdrawHeading
          title="Weekly"
          amount={weekRewardGenerated}
          tooltipMsg={
            remainingDays <= 0
              ? `Please re-invest within ${days} days to retain your sky tokens`
              : `Please re-invest within ${remainingDays} days to retain your sky tokens`
          }
          handleRefresh={handleRefresh}
        />
      ) : (
        <WithdrawHeading
          title="Weekly"
          amount={weekRewardGenerated}
          // tooltipMsg={"Please invest  to earn rewards"}
          handleRefresh={handleRefresh}
        />
      )}

      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div className={styles.weekly_timer}>
              {weeklyWithdrawTime ? (
                <Countdown
                  date={weeklyWithdrawTime}
                  intervalDelay={0}
                  key={weeklyWithdrawTime}
                  renderer={({ days, hours, minutes, seconds, completed }) => {
                    if (completed) {
                      setWithdrawButtonDisable(completed);
                    } else if (!completed) {
                      setWithdrawButtonDisable(completed);
                    }
                    return (
                      <>
                        <>
                          <span>{days > 9 ? days : `0${days}`} D</span>
                        </>
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
                    <span>{"00"} D</span>
                  </>
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
            {/* <div className={styles.weekly_timer}>
               <Input
                label="DD"
                placeholder="1D"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.day}
                formik={formik}
                name="day"
                className={styles.weekly_timer_input}
              /> 
              <>
                <span className={styles.weekly_timer_input}>D</span>
              </>
              <span className={styles.weekly_timer_divider}>:</span>

               <Input
                label="HH"
                placeholder="1H"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.hour}
                formik={formik}
                name="hour"
                className={styles.weekly_timer_input}
              />

              <>
                <span className={styles.weekly_timer_input}>H</span>
              </>
              <span className={styles.weekly_timer_divider}>:</span>
               <Input
                label="MM"
                placeholder="30M"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.minute}
                formik={formik}
                name="minute"
                className={styles.weekly_timer_input}
              /> 
              <>
                <span className={styles.weekly_timer_input}>M</span>
              </>
            </div> */}
            {/* {Number(usdtValueConvert(perdayRewardGenerated)) > 5
              ? ("Failed to withdraw tokens. Ensure daily rewards are greater than 5.")
              : ""} */}

            <Button
              text="Withdraw"
              className="w-100"
              disabled={
                userDetails?.totalInvested == "0" ||
                // !withdrawButtonDisable ||
                weekRewardGenerated == "0" ||
                !weekRewardGenerated ||
                freezingStatus == true ||
                // currentTime < newMilliSeconds ||
                parseFloat(usdtValueConvert(weekRewardGenerated)?.toString()) <
                  Number(withdrawPercent)
              }
              onClick={() => handleWithdraw()}
            />
            {Number(usdtValueConvert(weekRewardGenerated)) <
              Number(withdrawPercent) &&
            Number(usdtValueConvert(weekRewardGenerated)) > 0 ? (
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
      {/* <WalletAddress Adminkey="1" /> */}
    </div>
  );
};

export default Weekly;
