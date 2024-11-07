import { useCallback, useEffect, useMemo, useState } from "react";
import CommonPagination from "../../common/CommonPagination/CommonPagination";
import CommonTable from "../../common/CommonTable/CommonTable";
import Datepicker from "../../common/Datepicker/Datepicker";
import styles from "../ReferralList/ReferralList.module.scss";
import { Explore_URL, itemsCountPerPage } from "../../../utils/constants";
import { useSelector } from "react-redux";
import { TransactionHistory } from "../../Services/api.service";
import {
  CustomizeLink,
  formatNumber,
  toCustomFixed,
} from "../../Services/Helper";
import { NextArrowIcon } from "../../../assets/icons/svgicons";
import { CopyIcon } from "../../../assets/icons/svgicons";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import moment from "moment";
import { setTransactionHistory } from "../../../redux/features/reducers/user.slice";
import { RootState } from "../../../redux/types";
import { AppDispatch, useAppDispatch } from "../../../redux/app/store";
import { TransactionData, TxState } from "../../Services/Interfaces";

const Transaction = () => {
  const { walletAddress }: { walletAddress: string } = useSelector(
    (state: RootState) => state?.user
  );
  const dispatch: AppDispatch = useAppDispatch();

  const [state, setState] = useState<TxState>({
    transactionData: [],
    txCopyState: false,
    startDate: null,
    endDate: null,
    isTxMounted: false,
    pagination: {
      activePage: 1,
      totalItemsCount: 0,
      transactionLimit: 0,
    },
  });
  const transtable = useMemo(() => ["Transaction #", "Date", "Amount", "Type"], []);

  const handleTransactionHistory = useCallback(async () => {
    try {
      const { startDate, endDate, pagination } = state;
      const currentDate = new Date();
      const currentFormattedDate = moment(currentDate).format("YYYY-MM-DD");

      let formattedStartDate = startDate ? moment(startDate).format("YYYY-MM-DD") : currentFormattedDate;
      let formattedEndDate = endDate ? moment(endDate).format("YYYY-MM-DD") : currentFormattedDate;

      const data = {
        walletAddress,
        page: pagination?.activePage,
        limit: itemsCountPerPage,
        startDate: formattedStartDate == undefined || formattedStartDate == "Invalid date" ? "" : formattedStartDate,
        endDate: formattedEndDate == undefined || formattedEndDate == "Invalid date" ? currentFormattedDate : formattedEndDate,
      };

      const response = await TransactionHistory(data);
        if (response && response?.status == 200) {
          dispatch(setTransactionHistory(response && response?.data));
          setState((prevState) => ({
            ...prevState,
            transactionData: response?.data,
            pagination: {
              ...prevState?.pagination,
              totalItemsCount: response?.count,
              transactionLimit: response?.data?.length,
            },
          }));
        }else if(response?.status == 400 || response == undefined){
          dispatch(setTransactionHistory([]))
          setState((prevState) => ({
            ...prevState,
            transactionData: [],
            pagination: {
              ...prevState?.pagination,
              totalItemsCount: 0,
              transactionLimit: 0,
            },
          }));
        }
    } catch (error) {
      console.log(error);
    }
  }, [walletAddress, state, dispatch]);

  const txHashCopyClipBoard = () => {
    setTimeout(() => {
      setState((prevState) => ({ ...prevState, txCopyState: true }));
      toast.success("Copied");
    }, 100);
    setTimeout(() => {
      setState((prevState) => ({ ...prevState, txCopyState: false }));
    }, 3000);
  };

  useEffect(() => {
    let isMounted = true;

    const cleanup = () => {
      isMounted = false;
    };

    if (!state?.isTxMounted) {
      setState((prevState) => ({ ...prevState, isTxMounted: true }));
      return cleanup;
    }

    if (walletAddress)
      handleTransactionHistory();
    return cleanup;
  }, [walletAddress, state?.pagination?.activePage, state?.startDate, state?.endDate, state?.isTxMounted]);

  const handlePagination = useCallback((activePage: number) => {
    setState((prevState) => ({
      ...prevState,
      pagination: { ...prevState.pagination, activePage },
    }));
  }, [])

  const handleDateSelected = (date: Date | null | string, key: number) => {
    setState((prevState) => {
      if (key === 1) {
        return {
          ...prevState,
          startDate: date,
          endDate: prevState?.endDate && moment(date).isAfter(moment(prevState?.endDate)) ? date : prevState?.endDate,
        };
      } else {
        return {
          ...prevState,
          endDate: date,
          startDate: prevState?.startDate && moment(prevState?.startDate).isAfter(moment(date)) ? date : prevState?.startDate,
        };
      }
    });
  };

  const pageRangeDisplayed = useMemo(() => {
    return Math.ceil(state?.pagination?.totalItemsCount / itemsCountPerPage);
  }, [state?.pagination?.totalItemsCount]);

  // const memoizedTransactionData = useMemo(() => state?.transactionData, [transactionData]);

  return (
    <>
      <div className={styles.referral_list}>
        <div className={styles.transaction_heading}>
          <h4 className={styles.title}>Transaction History</h4>
          <div className={styles.transaction_heading_right}>
            <div className="trans_datepicker">
              <Datepicker
                className="datepicker_fst"
                selected={state?.startDate ? state?.startDate || undefined : new Date()}
                onChange={(date: Date | null | string) => handleDateSelected(date, 1)}
                maxDate={new Date() ? new Date() : state?.startDate}
              />
              <span>
                <NextArrowIcon />
              </span>
              <Datepicker
                className="datepicker_fst datepicker_sec"
                selected={state?.endDate ? state?.endDate || undefined : new Date()}
                onChange={(date: Date | null | string) => handleDateSelected(date, 2)}
                showIcon
                minDate={state?.startDate ? state?.startDate : undefined}
                maxDate={new Date()}
                disabled={
                  state?.startDate == "" || state?.startDate == null || state?.startDate == undefined
                }
              />
            </div>
          </div>
        </div>

        <CommonTable fields={transtable} className={styles.referral_list_table}>
          
         
          {state?.transactionData
            ? state?.transactionData?.length > 0 &&
              state?.transactionData?.map((data: TransactionData, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className={styles.wallet_address}>
                        <a
                          className=""
                          href={Explore_URL + data?.transactionHash}
                          target="_blank"
                        >
                          {CustomizeLink(data?.transactionHash)}
                        </a>
                        {data?.transactionHash && (
                          <CopyToClipboard
                            text={data && data?.transactionHash}
                            onCopy={txHashCopyClipBoard}
                          >
                            <button disabled={state?.txCopyState}>
                              <span className="ms-3">
                                <CopyIcon />
                              </span>
                            </button>
                          </CopyToClipboard>
                        )}
                      </div>
                    </td>

                    <td>
                      {data.timestamp
                        ? moment(Number(data?.timestamp) * 1000).format(
                            "DD-MM-YYYY"
                          )
                        : ""}
                    </td>
                    <td title={data?.amt ? data?.amt : "0"}>{`$${
                      data?.amount
                        ? formatNumber(toCustomFixed(data?.amt, 2))
                        : "0"
                    } USDT`}</td>
                    <td>
                      {data?.event == "Staked"
                        ? "Deposit"
                        : data?.event == "dailyRewardClaimed"
                        ? "Daily Withdraw"
                        : data?.event == "weeklyRewardsClaimed"
                        ? "Weekly Withdraw"
                        : "Deposit"}
                    </td>
                  </tr>
                );
              })
            : null}
        </CommonTable>

        {state?.transactionData?.length > 0 && state?.pagination?.transactionLimit < state?.pagination?.totalItemsCount && (
          <CommonPagination
            activePage={state?.pagination?.activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={state?.pagination?.totalItemsCount}
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={(newPage: number) => handlePagination(newPage)}
          />
        )}
      </div>
    </>
  );
};

export default Transaction;
