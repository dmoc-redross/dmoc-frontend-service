import { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import InnerHeading from "../../common/InnerHeading/InnerHeading";
import styles from "./Rewards.module.scss";
import { CustomSelect } from "../../common/Formik/FormikFields";
import { Button } from "../../common";
import { CopyIcon, ExportIcon } from "../../../assets/icons/svgicons";
import CommonTable from "../../common/CommonTable/CommonTable";
import CommonPagination from "../../common/CommonPagination/CommonPagination";
import IncomeCard from "../Dashboard/StakeCard/IncomeCard/IncomeCard";
import { LevelBreakdown } from "../../Services/api.service";
import { RootState } from "../../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import icon1 from "../../../assets/icons/deposit.svg";
import icon2 from "../../../assets/icons/rewards.svg";
import { EXPLORER_ADDRESS } from "../../../utils/constants";
import { dailyStatus, userDetails } from "../../Services/CallContract";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { CustomizeLink, toCustomFixed, usdtValueConvert } from "../../Services/Helper";
import { setLoading } from "../../../redux/features/reducers/loading.slice";
import { itemsCountPerPage } from "../../../utils/constants";
import { option } from "./rewards";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import moment from "moment";
import { CardData, LevelBreakdownResponse, RewardState, StatusResponse, UserDetails, WalletData } from "../../Services/Interfaces";

const Rewards: React.FC = () => {
  const { walletAddress, RewardMutipler } = useSelector(
    (state: RootState) => state?.user
  );
  const { walletProvider }: any = useWeb3ModalProvider();
  const dispatch = useDispatch();

  const [state, setState] = useState<RewardState>({
    selectedLevel: option[0],
    totalDepositedAmt: "0",
    totalWithdrawl: "0",
    allRecord: [],
    isRewardMounted: false,
    pagination: {
      activePage: 1,
      totalItemsCount: 0,
      transactionLimit: 0,
    },
    addressCopyState: false,
  });

  useEffect(() => {
    if (!state.isRewardMounted) setState((prevState: any) => ({ ...prevState, isRewardMounted: true }));
    else if (walletAddress) getLevelData();
  }, [walletAddress, state.isRewardMounted, state.pagination.activePage, state.selectedLevel]);

  const rewardheading = [
    "Wallet ID",
    "Deposit",
    "Last txn date",
    `${RewardMutipler && RewardMutipler}x of Deposit`,
    "Withdrawal",
    "Withdraw(%)"
  ];
  
  const getLevelData = async () => {
    try {
      const {pagination, selectedLevel} = state
      dispatch(setLoading(true));
      let data = {
        walletAddress,
        page: pagination?.activePage,
        limit: itemsCountPerPage,
        level: selectedLevel?.value ? selectedLevel?.value : 1
      }
      const response: LevelBreakdownResponse = await LevelBreakdown(data)

      if (response?.status != 200) {
        dispatch(setLoading(false));
        console.log(`Unexpected status code: ${response?.status}`);
        return;
      }
      dispatch(setLoading(false));
        const formattedAddresses = response?.data?.map((address: string) => ({ walletAddress: address }));
    
        const updatedData = await fetchWalletData(formattedAddresses);
        const totalWithdrawl = updatedData && updatedData?.reduce((acc: number, item: WalletData) => {
          return acc + parseFloat(item?.withdrawAmt.toString());
        }, 0);

        const totalDepositedAmt = updatedData && updatedData?.reduce((sum: number, item: WalletData) => {
          return sum + parseFloat(item?.depositedAmt.toString());
        }, 0);

        setState((prevState: RewardState) => ({
          ...prevState,
          totalWithdrawl: totalWithdrawl?.toString(),
          totalDepositedAmt: totalDepositedAmt?.toString(),
          allRecord: updatedData,
          pagination: {
            ...prevState.pagination,
            totalItemsCount: response?.count,
            transactionLimit: response?.data?.length,
          }
        }));
        dispatch(setLoading(false));
    } catch (error) {
      console.log("error in API call", error)
      dispatch(setLoading(false));
    }
  }

  const addressCopyClipBoard = () => {
    setTimeout(() => {
      setState((prevState: any) => ({ ...prevState, addressCopyState: true }));
      toast.success("Copied");
    }, 100);
    setTimeout(() => {
      setState((prevState: any) => ({ ...prevState, addressCopyState: false }));
    }, 3000);
  };

  const fetchWalletData = async (wallets: {walletAddress: string }[]): Promise<WalletData[]> => {
    const results = await Promise.all(wallets && wallets?.map(async (wallet: any) => {
      let statusRes: StatusResponse = await dailyStatus(wallet?.walletAddress, walletProvider);
      let depositedAmt = usdtValueConvert(statusRes?.totalInvested);

      let withdrawAmt = usdtValueConvert(statusRes?.totalRedeemed)
      let details: UserDetails = await userDetails(wallet?.walletAddress, walletProvider)
      let withdrawPercent = (Number(withdrawAmt && withdrawAmt) / (Number(RewardMutipler) * depositedAmt)) * 100

      return {
        walletAddress: wallet?.walletAddress,
        depositedAmt: isNaN(depositedAmt) || depositedAmt == null ? "0" : depositedAmt,
        timestamp: details.depositTime ? moment(Number(details.depositTime) * 1000).format(
          "DD-MM-YYYY"
        ) : "",
        rewardMutipler: isNaN(depositedAmt) || depositedAmt == null ? "0" : (RewardMutipler * depositedAmt).toFixed(2),
        withdrawAmt: isNaN(withdrawAmt) || withdrawAmt == null ? "0" : withdrawAmt,
        withdrawPercent: isNaN(withdrawPercent) || withdrawPercent == null ? "0" : withdrawPercent,
        isSeventyPercent: (withdrawPercent !== null || withdrawPercent !== "NaN" || withdrawPercent !== undefined) && (Number(withdrawPercent) || withdrawPercent) >= 70 ? true : false
      };
    }));
    return results;
  };

  const card: CardData[] = [
    {
      icon: icon1,
      income: "Deposit",
      title: state?.totalDepositedAmt,
    },
    {
      icon: icon2,
      income: "Withdrawn",
      title: state?.totalWithdrawl,
    },
  ];

  const handlePagination = async (page: number) => {
    setState((prevState: any) => ({
      ...prevState,
      pagination: { ...prevState.pagination, activePage: page },
    }));  
  };

  const pageRangeDisplayed = useMemo(() => {
    return Math.ceil(Number(state?.pagination.totalItemsCount) / Number(itemsCountPerPage));
  }, [state?.pagination?.totalItemsCount]);

  return (
    <div className={styles.rewards}>
      <div className={styles.card_information}>
        <Row>
          {card.map((data: CardData, index: number) => {
            return (
              <Col sm={6} md={4} key={index}>
                <IncomeCard
                  icon={data.icon}
                  income={data.income}
                  title={data.title}
                />
              </Col>
            );
          })}
        </Row>
      </div>
      <div className={styles.rewards_inner}>
        <InnerHeading title="Rewards Tree" />
        <div className={styles.filters}>
          <CustomSelect
            value={state?.selectedLevel}
            onChange={(e: any) => {
              setState((prevState: any) => ({
                ...prevState,
                selectedLevel: e,
                pagination: { ...prevState.pagination, activePage: 1 },
              }));
              }
            }
            // label="Type"
            options={option}
            defaultValue={option[0]}
            closeMenuOnSelect={true}
          />
          {/* <Button
                  text="Export CSV"
                  className="reward_btn"
                  icon={<ExportIcon />}
                /> */}
        </div>
      </div>
      <div className={styles.user_reward}>
        <CommonTable fields={rewardheading} className={styles.user_table}>
          {state?.allRecord ?
            state?.allRecord?.length > 0 && state?.allRecord?.map((data: any, index: number) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <a
                      className=""
                      href={EXPLORER_ADDRESS + data?.walletAddress}
                      target="_blank"
                    >
                      {CustomizeLink(data?.walletAddress)}
                    </a>
                    {data?.walletAddress && (
                      <CopyToClipboard
                        text={data && data?.walletAddress}
                        onCopy={addressCopyClipBoard}
                      >
                        <button className="flex-shrink-0" disabled={state?.addressCopyState}>
                          <span className="ms-3">
                            <CopyIcon />
                          </span>
                        </button>
                      </CopyToClipboard>
                    )}
                  </div>
                </td>
                <td title={data?.depositedAmt}>{`$${toCustomFixed(data?.depositedAmt, 2)}`}</td>
                <td>{data?.timestamp}</td>
                <td title={data?.rewardMutipler}>{data?.rewardMutipler}</td>
                <td title={data?.withdrawAmt} className={data?.isSeventyPercent ? "red" : ""} >{`$${toCustomFixed(data?.withdrawAmt, 2)}`}</td>
                <td title={data?.withdrawPercent} className={data?.isSeventyPercent ? "red" : ""}>{`${toCustomFixed(data?.withdrawPercent, 2)}%`}</td>
              </tr>
            )) : null}
        </CommonTable>
      </div>
      {
        state?.allRecord && state?.pagination?.totalItemsCount > state?.pagination?.transactionLimit && (
          <CommonPagination
            activePage={state?.pagination?.activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={state?.pagination?.totalItemsCount}
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={(e: any) => handlePagination(e)}
          />
        )
      }
    </div >
  );
};

export default Rewards;
