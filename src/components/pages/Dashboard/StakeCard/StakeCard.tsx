import styles from "./StakeCard.module.scss";
import icon from "../../../../assets/icons/income.png";
import icon2 from "../../../../assets/icons/reward.png";
import { Col, Row } from "react-bootstrap";
import IncomeCard from "./IncomeCard/IncomeCard";
import iconincome from "../../../../assets/icons/daily-income.png";
import iconincome2 from "../../../../assets/icons/graph.png";
import iconincome3 from "../../../../assets/icons/reffer-income.png";
import iconincome4 from "../../../../assets/icons/weekly-income.png";
import iconincome5 from "../../../../assets/icons/team.png";
import iconincome6 from "../../../../assets/icons/total-income.png";
import StakeIncomeCard from "./StakeIncomeCard/StakeIncomeCard";
import { useDispatch, useSelector } from "react-redux";
import { skyValueConvert, usdtValueConvert } from "../../../Services/Helper";
import { useEffect, useState } from "react";
import {
  dailyStatus,
  weeklyWithdrawRewards,
} from "../../../Services/CallContract";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import {
  setDuckIncome,
  setweekRewardGenerated,
} from "../../../../redux/features/reducers/user.slice";
import { RootState } from "../../../../redux/types";

function StakeCard() {
  const { userDetails, roi,walletAddress, status } = useSelector((state: RootState) => state?.user);
  const { loading } = useSelector((state: any) => state?.loading);
  const { walletProvider } = useWeb3ModalProvider();
  const { globalSkyPrice } : {globalSkyPrice : number | string} = useSelector((state: RootState) => state?.user);

  const [futureRewards, setFutureRewards] = useState<string | number>("");
  const dispatch = useDispatch();

  useEffect(() => {
    futureRewardsDashboard();
  }, [walletAddress, loading]);

  const futureRewardsDashboard = async () => {
    try {
      const futureRewards = await dailyStatus(
        walletAddress,
        walletProvider
      );

      setFutureRewards(skyValueConvert(futureRewards?.futureIncome));

      const weeklyRewards = await weeklyWithdrawRewards(
        walletProvider,
        walletAddress
      );

      if (weeklyRewards[0] == undefined || status?.totalInvested == 0) {
        dispatch(setweekRewardGenerated(0));
        dispatch(setDuckIncome(0));
      } else {
        dispatch(setweekRewardGenerated(weeklyRewards[0]));
        dispatch(
          setDuckIncome(usdtValueConvert(weeklyRewards && weeklyRewards[1]))
        );
      }
    } catch (err) {
      console.log("error in future duck income", err);
    }
  };

  const skycard = [
    {
      icon: icon,
      income: "Principle Amount",
      amount: status?.totalInvested==undefined || status?.totalInvested=="NaN"
        ? "0"
        : Number(status?.totalInvested),
      info: "USDT",
    },
    {
      icon: icon,
      income: "Total Income",
      amount:
        status?.totalInvested == undefined ||
        roi == undefined ||
        status?.inducedInterestAmount == undefined ||
        status?.dailyReferralIncome == undefined ||
        status?.weeklyReferralIncome == undefined
          ? "0"
          : (Number(status?.totalInvested) * Number(Number(roi)/ 10)) / 100 +
            Number(status?.inducedInterestAmount) +
            Number(
              Number(status?.dailyReferralIncome) +
                Number(status?.weeklyReferralIncome)
            ),
      info: "USDT",
    },
    {
      icon: icon2,
      income: "Total Revenue",
      amount:
      status?.receivedDailyIncome==undefined||
      status?.receivedDailyIncome=="NaN"|| 
      status?.receivedWeeklyIncome==undefined||
      status?.receivedWeeklyIncome=="NaN"
      ?"0"
      :
        Number(status?.receivedDailyIncome) +
        Number(status?.receivedWeeklyIncome),
      info: "USDT",
    },
  ];

  const card = [
    {
      icon: iconincome,
      income: "Self Earned Income", // daily roi income
      amount:
        roi == undefined ||
        roi == null ||
        status?.totalInvested == undefined ||
        status?.totalInvested == null
          ? "0"
          : (Number(status?.totalInvested) * Number(Number(roi)/10)) / 100,
    },
    {
      icon: iconincome2,
      income: "Level Income",
      amount:
        status?.inducedInterestAmount == undefined ||
        status?.inducedInterestAmount == "NaN" ||
        status?.inducedInterestAmount == null
          ? "0"
          : Number(status?.inducedInterestAmount),
    },
    {
      icon: iconincome3,
      income: "Referral Income",
      amount:
        status?.weeklyReferralIncome == undefined ||
        status?.weeklyReferralIncome == "NaN" ||
        status?.dailyReferralIncome == "NaN" ||
        status?.dailyReferralIncome == undefined
          ? "0"
          : status?.dailyReferralIncome &&
            status?.weeklyReferralIncome &&
            Number(
              Number(status?.dailyReferralIncome) +
                Number(status?.weeklyReferralIncome)
            ),
    },
    {
      icon: iconincome4,
      income: "Weekly Income",
      amount:
        status?.receivedWeeklyIncome == undefined ||
        status?.receivedWeeklyIncome == "NaN"
          ? "0"
          : Number(status?.receivedWeeklyIncome),
    },
    {
      icon: iconincome5,
      income: "My Team",
      amount: userDetails?.referralCount ? userDetails?.referralCount : "0",
    },
    {
      icon: iconincome6,
      income: "Future Golden Duck Income",
      amount: futureRewards==undefined ||futureRewards=="NaN" ?"0":  Number(futureRewards),
        info: globalSkyPrice
    },
  ];

  return (
    <>
      <div className={styles.stake_card}>
        <div className={styles.skymarvel_card}>
          {skycard &&
            skycard?.map((data, index) => {
              return (
                <StakeIncomeCard
                  icon={data?.icon}
                  income={data?.income}
                  amount={data?.amount}
                  info={data?.info}
                />
              );
            })}
        </div>
        <div className={styles.card_information}>
          <Row>
            {card &&
              card.map((data, index) => {
                return (
                  <Col sm={6} xl={6} xxl={4} key={index}>
                    <IncomeCard
                      icon={data?.icon}
                      income={data?.income}
                      amount={data?.amount}
                    />
                  </Col>
                );
              })}
          </Row>
        </div>
      </div>
    </>
  );
}

export default StakeCard;
