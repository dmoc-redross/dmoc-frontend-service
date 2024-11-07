import { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import Referral from "./Referral/Referral";
import StakeCard from "./StakeCard/StakeCard";
import SocialLinks from "../../common/SocialLinks/SocialLinks";
import StakeIncomeCard from "./StakeCard/StakeIncomeCard/StakeIncomeCard";
import icon2 from "../../../assets/icons/profile.png";
import icon3 from "../../../assets/icons/reffer-profile.png";
import Metaverse from "./Metaverse/Metaverse";
import { getCheckUser, getRefererLink } from "../../Services/api.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/types";
import { useParams } from "react-router-dom";
import {
  saveUserDetails,
  saveUserPortfolio,
  setReferLink,
  setStatus,
  setUpdatedROI,
} from "../../../redux/features/reducers/user.slice";
import { dailyStatus, getRoiUpdate, userDetails } from "../../Services/CallContract";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { SkyCardLink, DashUserState } from "../../Services/Interfaces";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { walletProvider } = useWeb3ModalProvider();
  const { walletAddress, userPortfolio, linkId }: DashUserState = useSelector(
    (state: RootState) => state?.user
  );

  const params = useParams();
  const [isDashMounted, setIsDashMounted] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const cleanup = () => {
      isMounted = false;
    };

    if (!isDashMounted) {
      setIsDashMounted(true);
      return cleanup;
    }

    if (walletAddress) {
      handleCheckUserPortfolio();
      userInformation();
      handleCheckUser();
    }
    return cleanup;
  }, [walletAddress, isDashMounted]);

  const handleCheckUserPortfolio = async () => {
    try {
      const refererResponse = await getRefererLink({
        walletAddress: walletAddress?.toLowerCase(),
      });

      if (refererResponse?.status == 200 && refererResponse != undefined) {
        dispatch(setUpdatedROI(refererResponse?.roiUpdate));
        dispatch(saveUserPortfolio(refererResponse?.data));
      } else dispatch(saveUserPortfolio(""));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCheckUser = async () => {
    try {
      if (params?.id || linkId) {
        const checkUserRes = await getCheckUser({
          docIdReferrer: params?.id || linkId || "",
        });
        dispatch(setReferLink(checkUserRes?.data?.referralLink));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const userInformation = async () => {
    try {
      const userInfo = await userDetails(walletAddress, walletProvider);
      if (userInfo) dispatch(saveUserDetails(userInfo));

      const res = await dailyStatus(walletAddress, walletProvider);
      const updatedRoi = await getRoiUpdate(walletProvider);
      if (res){
        dispatch(setStatus(res));
        dispatch(setUpdatedROI(updatedRoi))
      }
    } catch (error) {}
  };

  const skycardlinks: SkyCardLink[]  = [
    {
      icon: icon2,
      value: "My Referral Link",
      website: userPortfolio?.referralLink ? userPortfolio?.referralLink : "",
    },
    {
      icon: icon3,
      value: "Referral From",
      website: userPortfolio?.referrerAddress
        ? userPortfolio?.referrerAddress
        : "",
    },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard_in}>
        <div className={styles.col_8}>
          <div className={styles.referall}>
            <Referral />
            <StakeCard />
            <div className={styles.skymarvel_card}>
              {skycardlinks &&
                skycardlinks?.map(
                  (data: SkyCardLink) => {
                    return (
                      <StakeIncomeCard
                        icon={data?.icon}
                        value={data?.value}
                        website={data?.website}
                        className={styles?.skymarvel_inner}
                        copyClass={styles?.copyClass}
                      />
                    );
                  }
                )}
            </div>
          </div>
          {/* <Outlet /> */}
        </div>
        <div className={styles.col_4}>
          <SocialLinks className={styles.social_card} />
          <Metaverse />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
