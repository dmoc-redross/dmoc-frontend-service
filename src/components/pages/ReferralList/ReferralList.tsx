import { useEffect, useMemo, useState } from "react";
import styles from "./ReferralList.module.scss";
import CommonTable from "../../common/CommonTable/CommonTable";
import CommonPagination from "../../common/CommonPagination/CommonPagination";
import InnerHeading from "../../common/InnerHeading/InnerHeading";
import { referralsListing } from "../../Services/api.service";
import { useSelector } from "react-redux";
import { setReferralList } from "../../../redux/features/reducers/user.slice";
import {
  CustomizeLink,
  formatNumber,
  usdtValueConvert,
} from "../../Services/Helper";
import { CopyIcon } from "../../../assets/icons/svgicons";
import { EXPLORER_ADDRESS, itemsCountPerPage } from "../../../utils/constants";
import toast from "react-hot-toast";
import CopyToClipboard from "react-copy-to-clipboard";
import { RootState } from "../../../redux/types";
import { AppDispatch, useAppDispatch } from "../../../redux/app/store";
import { Pagination, Referral, RefListUserState } from "../../Services/Interfaces";

const initialPaginationState: Pagination = {
  activePage: 1,
  totalItemsCount: 0,
  transactionLimit: 0,
};

const ReferralList: React.FC = () => {
  const { walletAddress, Referrallisting }: RefListUserState = useSelector(
    (state: RootState) => state?.user
  );
  const dispatch: AppDispatch = useAppDispatch();
  const claimtable = ["Wallet ID", "Partners", "Deposit funds"];
  const [state, setState] = useState({
    pagination: initialPaginationState,
    referralCopyState: false,
    isTxMounted: false,
  });

  const addressCopyClipBoard = () => {
    setTimeout(() => {
      setState((prevState) => ({
      ...prevState,
      referralCopyState: true,
    }));
      toast.success("Copied");
    }, 100);
    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        referralCopyState: false,
      }));
    }, 3000);
  };

  const handleReferralList = useMemo(
    () => async () => {
    try {
      const {pagination} = state;
        const data = {
          walletAddress,
          page: pagination?.activePage,
          limit: itemsCountPerPage,
        };
        const response = await referralsListing(data);

        if (response) {
          dispatch(setReferralList(response && response?.data));
          setState((prevState) => ({
            ...prevState,
            pagination: {
              ...prevState.pagination,
              totalItemsCount: response.count,
              transactionLimit: response.data.length,
            },
          }))
        }
        return response?.data;
    } catch (error) {
      console.log(error, "errorInCaseOfReferralList");
    }
  },
  [walletAddress, state?.pagination?.activePage]);

  useEffect(() => {
    let isMounted = true;

    const cleanup = () => {
      isMounted = false;
    };

    if (!state?.isTxMounted) {
      setState((prevState) => ({
        ...prevState,
        isTxMounted: true,
      }));
      return cleanup;
    }

    if (walletAddress) 
      handleReferralList();
    return cleanup;
  }, [walletAddress, state?.pagination?.activePage, state?.isTxMounted, handleReferralList]);

  const handlePagination = async (activePage: number): Promise<void> => {
    setState((prevState) => ({
      ...prevState,
      pagination: {
        ...prevState.pagination,
        activePage,
      },
    }));
  }; 

  const displayedReferrals = useMemo(() => Referrallisting ? Referrallisting : [], [Referrallisting]);

  const pageRangeDisplayed = useMemo(() => {
    const {pagination} = state;
    return Math.ceil(pagination.totalItemsCount / itemsCountPerPage);
  }, [state?.pagination?.totalItemsCount]);

  return (
    <>
      <div className={styles.referral_list}>
        <InnerHeading title="Referral list" />

        <CommonTable fields={claimtable} className={styles.referral_list_table}>
          {displayedReferrals
            ? displayedReferrals?.length > 0 &&
              displayedReferrals?.map((data: Referral, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className={styles.wallet_address}>
                        <a
                          className=""
                          href={EXPLORER_ADDRESS + data?.referree}
                          target="_blank"
                        >
                          {data && CustomizeLink(data?.referree)}
                        </a>
                        {data?.referree && (
                          <CopyToClipboard
                            text={data && data?.referree}
                            onCopy={addressCopyClipBoard}
                          >
                            <button disabled={state?.referralCopyState}>
                              <span className="ms-3">
                                <CopyIcon />
                              </span>
                            </button>
                          </CopyToClipboard>
                        )}
                      </div>
                    </td>
                    <td>{data?.partners}</td>
                    <td
                      title={
                        data?.revenue ? usdtValueConvert(data?.revenue) : "0"
                      }
                    >
                      {formatNumber(usdtValueConvert(data?.revenue))}
                    </td>
                  </tr>
                );
              })
            : null}
        </CommonTable>
        {displayedReferrals && state?.pagination?.totalItemsCount > state?.pagination?.transactionLimit && (
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

export default ReferralList;
