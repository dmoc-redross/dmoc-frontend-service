import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/types";
import CommonTable from "../../common/CommonTable/CommonTable";
import { RewardMangementapi } from "../../Services/api.service";
import styles from "./RewardChart.module.scss";
import moment from "moment";
import { RewardChartState, RewardData } from "../../Services/Interfaces";
// import { formatDate } from "../../Services/Helper";

const RewardChart = () => {
  const [state, setState] = useState<RewardChartState>({
    isMounted: false,
    referralLimits: [],
    levelLimits: []
  });

  const levelRewardTableHeaders = ["Level", "%", "Updated On"];
  const referralRewardTableHeaders = ["Referral", "%", "Updated On"];

  const { walletAddress } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!state?.isMounted) {
      setState((prevState) => ({ ...prevState, isMounted: true }));
      return;
    }

    if (walletAddress) {
      fetchRewardManagementData();
    }
  }, [walletAddress, state?.isMounted]);

  const fetchRewardManagementData = async () => {
    try {
      const response = await RewardMangementapi();
      const levelIncome = filterRewardData("InducedLevelIncomePercentUpdated", response?.data);
      const referralIncome = filterRewardData("ReferralIncomePercentUpdated", response?.data);

      setState((prevState: any) => ({
        ...prevState,
        levelLimits: levelIncome,
        referralLimits: referralIncome
      }));
    } catch (error) {
      console.error("Error fetching reward management data:", error);
    }
  };

  const filterRewardData = (event: string, data: RewardData[]): RewardData[] => {
    return data?.filter((item: any) => item?.event === event) || [];
  };

  const formatPercentage = (percent: number | string) => (percent ? (Number(percent) / 10).toString() : "");
  const formatDate = (timestamp: string | number) => (timestamp ? moment(Number(timestamp) * 1000).format("DD-MM-YYYY") : "");

  const renderTableRows = (data: RewardData[]): JSX.Element[] => {
    return data.map((item: RewardData, index: number) => (
      <tr key={index}>
        <td>{item?.level}</td>
        <td>
          <p title={formatPercentage(item?.percent)}>{formatPercentage(item?.percent)}</p>
        </td>
        <td>{formatDate(item?.timestamp)}</td>
      </tr>
    ));
  };

  return (
    <div className={styles.reward_charts}>
      <div className={styles.reward_note}>
        <p>
          Note: <span>Updated value will reflect after next deposit.</span>
        </p>
      </div>
      <div className={styles.reward_table}>
        <Row>
          <Col md={6}>
            <div className={styles.table_in}>
              <h2>Level Income</h2>
              <CommonTable fields={levelRewardTableHeaders} className={styles.rewardschatr_table}>
                {state.levelLimits.length > 0 && renderTableRows(state?.levelLimits)}
              </CommonTable>
            </div>
          </Col>
          <Col md={6}>
            <div className={styles.table_in}>
              <h2>Referral Income</h2>
              <CommonTable fields={referralRewardTableHeaders} className={styles.rewardschatr_table}>
                {state.referralLimits.length > 0 && renderTableRows(state?.referralLimits)}
              </CommonTable>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RewardChart;
