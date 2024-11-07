import styles from "./Withdraw.module.scss";
import { Row, Col } from "react-bootstrap";
import Daily from "./Daily/Daily";
import Weekly from "./Weekly/Weekly";
import Future from "./Future/Future";
import { Dispatch, useEffect, useState } from "react";
import {
  dailyStatus,
  getWithdrawPercent,
  userDetails,
  weeklyWithdrawRewards,
} from "../../../../Services/CallContract";
import {
  saveUserDetails,
  setDuckIncome,
  setweekRewardGenerated,
  setWithdrawPercent,
} from "../../../../../redux/features/reducers/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { skyValueConvert, usdtValueConvert } from "../../../../Services/Helper";
import { RootState } from "../../../../../redux/types";

const Withdraw = () => {
  const { walletProvider } = useWeb3ModalProvider();
  const dispatch: Dispatch<any> = useDispatch();

  const { walletAddress, status } = useSelector((state: RootState) => state?.user);
  const { loading } = useSelector((state: any) => state.loading);

  const [futureIncome, setFutureIncome] = useState<string | number>("");
  const [withdrawButtonDisable, setWithdrawButtonDisable] =
    useState<boolean>(false);

  useEffect(() => {
    getResetTime();
  }, [walletAddress]);

  const getResetTime = async () => {
    const userInfo = await userDetails(walletAddress, walletProvider);
    if (userInfo) dispatch(saveUserDetails(userInfo));

    const withdrawPercent = await getWithdrawPercent(walletProvider);
    dispatch(setWithdrawPercent(withdrawPercent));
  };

  useEffect(() => {
    if (walletAddress) {
      handleRefresh();
    }
  }, [
    walletAddress,
    loading,
    withdrawButtonDisable,
    status?.totalInvested > 0,
  ]);

  const handleRefresh = async () => {
    try {
      const weeklyRewards = await weeklyWithdrawRewards(
        walletProvider,
        walletAddress
      );

      const futureReward = await dailyStatus(walletAddress, walletProvider);
      setFutureIncome(
        skyValueConvert(futureReward && futureReward?.futureIncome)
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
      console.log("future err", err);
    }
  };

  return (
    <div className={`common-card  ${styles.withdraw}`}>
      <h4 className="text-center">Withdraw</h4>
      <Row>
        <Col md={4} sm={6}>
          <Daily />
        </Col>
        <Col md={4} sm={6} className="gradient-border">
          <Weekly
            setWithdrawButtonDisable={setWithdrawButtonDisable}
            withdrawButtonDisable={withdrawButtonDisable}
            handleRefresh={handleRefresh}
          />
        </Col>
        <Col md={4} sm={6}>
          <Future
            setFutureIncome={setFutureIncome}
            futureIncome={futureIncome}
            handleRefresh={handleRefresh}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Withdraw;
