import Slider, { Settings } from "react-slick";
import { Button } from "../../../../common";
import styles from "./Deposit.module.scss";
import {
  dailyStatus,
  DepositToken,
  tokenAllowance,
  tokenApproval,
  userDetails,
  userTokenBalance,
} from "../../../../Services/CallContract";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  getCheckUser,
  getPackages,
  getRefererLink,
} from "../../../../Services/api.service";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { setLoading } from "../../../../../redux/features/reducers/loading.slice";
import {
  saveUserDetails,
  saveUserPortfolio,
  setReferLink,
  setReferrerData,
  setStatus,
  setUserBalance,
} from "../../../../../redux/features/reducers/user.slice";
import {
  amountFormate,
  formatNumber,
  formatNumberWithoutDecimal,
  toCustomFixed,
  toFunctionBigNumberFixed,
} from "../../../../Services/Helper";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../../redux/types";
import { Package, State } from "../../../../Services/Interfaces";

const Deposit = () => {
  const [state, setState] = useState<State>({
    isUserPortMounted: false,
    packageAmount: "",
    packagesmangement: [],
    isButtonDisabled: false
  });

  const dispatch = useDispatch();
  const params = useParams();
  const {
    walletAddress,
    userPortfolio,
    referrerData,
    linkId,
    freezingStatus,
    userBalance
  } = useSelector((state: RootState) => state?.user);
  const { walletProvider } = useWeb3ModalProvider();
  
  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    // slidesToShow: 4,
    slidesToScroll: 1,
    rows: 2,
    slidesPerRow: 4,
    arrows: false,

    // mobileFirst: true,
    responsive: [
      {
        breakpoint: 1439,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          slidesPerRow: 3,
          arrows: false,
          // dots: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          slidesPerRow: 3,
          arrows: false,
          // dots: true,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          slidesPerRow: 2,
          arrows: false,
          // dots: true,
        },
      },
    ],
  };

  const handleCheckUser = async () => {
    try {
      if (params?.id || linkId) {
        const checkUserRes = await getCheckUser({
          docIdReferrer: params?.id || linkId || "",
        });

        if (checkUserRes?.status == 200) {
          dispatch(setReferLink(checkUserRes?.data?.referralLink));
        } else {
          dispatch(setReferLink(""));
          dispatch(setReferrerData(""));
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const cleanup = () => {
      isMounted = false;
    };

    if (!state?.isUserPortMounted) {
      setState(prev => ({ ...prev, isUserPortMounted: true }));
      return cleanup;
    }

    if (walletAddress) {
      handleCheckUserPortfolio();
      handleCheckUser();
      userInformation();
      handleAddpackages();
    }
    return cleanup;
  }, [walletAddress, state?.isUserPortMounted]);

  const handleCheckUserPortfolio = async () => {
    try {
      const refererResponse = await getRefererLink({
        walletAddress,
      });

      if (refererResponse?.status == 200)
        dispatch(saveUserPortfolio(refererResponse?.data));
    } catch (error) {
      console.error("Error in :", error);
    }
  };

  const userInformation = async () => {
    try {
      const userInfo = await userDetails(walletAddress, walletProvider);
      if (userInfo) dispatch(saveUserDetails(userInfo));
      const res = await dailyStatus(walletAddress, walletProvider);
      if (res) dispatch(setStatus(res));
      const userBalance = await userTokenBalance(walletAddress, walletProvider);
      dispatch(setUserBalance(toFunctionBigNumberFixed(userBalance)))
    } catch (error) {
      console.log(error, "err");
    }
  };

  const handleDeposit = async () => {
    try {
      if (Number(userBalance) > 0) {
        dispatch(setLoading(true));
        const TokenAllowance = await tokenAllowance(
          walletAddress,
          walletProvider
        );
        if (
          Number(TokenAllowance) == 0 ||
          Number(TokenAllowance) < Number(state?.packageAmount) * 10 ** 18
        ) {
          const tokenApprove = await tokenApproval(
            walletAddress,
            walletProvider
          );

          if (tokenApprove?.status) {
            const depositResponse = await DepositToken(
              state?.packageAmount,
              walletAddress,
              referrerData?.walletAddress
                ? referrerData?.walletAddress
                : userPortfolio?.referrerAddress,
              walletProvider
            );

            if (depositResponse?.status) handlePostDepositSuccess();
          }
        } else {
          const depositResponse = await DepositToken(
            state?.packageAmount,
            walletAddress,
            referrerData?.walletAddress
              ? referrerData?.walletAddress
              : userPortfolio?.referrerAddress,
            walletProvider
          );
          if (depositResponse?.status) handlePostDepositSuccess();
        }
      } else {
        toast.error("You do not have funds to deposit");
        return;
      }
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  const handlePostDepositSuccess = () => {
    userInformation();
    handleCheckUserPortfolio();
    setState(prev => ({ ...prev, packageAmount: "" }));
    toast.success("Tokens Deposited Successfully !!");
    dispatch(setLoading(false));
  };

  const handleButtonClick = () => {
    if (Number(userBalance) >= Number(state?.packageAmount)) {
      handleDeposit();
    } else {
      toast.error("Low USDT Balance");
    }
    setState(prev => ({ ...prev, isButtonDisabled: true }));
    setTimeout(() => setState(prev => ({ ...prev, isButtonDisabled: false })), 4000);
  };
  
  const handleAddpackages = async () => {
    try {
      const data = {
        page: 1,
        limit: 1000,
      };
      const respackages = await getPackages(data);

      setState(prev => ({
        ...prev,
        packagesmangement: respackages?.status === 200 ? respackages?.data : [],
      }));
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className={`common-card ${styles.deposit}`}>
      <h4>Deposit</h4>

      {state?.packagesmangement
        ? state?.packagesmangement?.length > 0 && (
            <>
              <Slider {...settings} className={styles.deposit__slider}>
                {state?.packagesmangement?.map((item, index) => (
                  <div key={index}>
                    <button
                      title={toCustomFixed(item?.amount, 8)}
                      type="button"
                      className={`${styles.deposit__btn} ${
                        item?.amount == state?.packageAmount
                          ? styles.deposit__btn__active
                          : ""
                      }`}
                      onClick={() => setState(prev => ({ ...prev, packageAmount: item?.amount }))}
                    >
                      $
                      {item?.amount &&
                        formatNumber(toCustomFixed(item?.amount, 2))}
                    </button>
                  </div>
                ))}
              </Slider>
            </>
          )
        : null}

      {userBalance && userBalance?.length > 7 ? (
        <p title={`$${userBalance ? userBalance : "0"}`} className="mb-3">
          Usdt Balance: {`$${userBalance ? amountFormate(userBalance) : "0"}`}
        </p>
      ) : (
        <p>Usdt Balance: {`$${userBalance ? userBalance : "0"}`}</p>
      )}

      <Button
        text="Deposit"
        onClick={() =>
          handleButtonClick()
        }
        className={styles.deposit__actionBtn}
        disabled={
          !state?.packagesmangement ||
          !state?.packageAmount ||
          freezingStatus == true ||
          state?.isButtonDisabled
        }
      />
    </div>
  );
};

export default Deposit;
