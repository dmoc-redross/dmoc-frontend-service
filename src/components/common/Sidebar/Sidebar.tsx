import { Dispatch, useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "../../../assets/logo/logo.svg";
import { NavLink } from "react-router-dom";
import { ROUTES, zeroAddress } from "../../../utils/constants";
import {
  DashboardIcon,
  FundsIcon,
  ReferralIcon,
  RewardCharIcon,
  RewardIcon,
  TransactionIcon,
} from "../../../assets/icons/svgicons";
import styles from "./Sidebar.module.scss";
import WalletAddress from "../WalletAddress/WalletAddress";
import Logout from "../Logout/Logout";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { useDispatch, useSelector } from "react-redux";
import { freezeStatus, userDetails } from "../../Services/CallContract";
import {
  saveUserDetails,
  setFreezingStatus,
} from "../../../redux/features/reducers/user.slice";
import ReferralModal from "../Modal/ReferralModal/ReferralModal";
import { RootState } from "../../../redux/types";
import { LinkType, propTypes, SidebarState } from "../../Services/Interfaces";

const Sidebar = (props: propTypes) => {
  const dispatch: Dispatch<any> = useDispatch();

  const { walletProvider } = useWeb3ModalProvider();
  const { walletAddress, freezingStatus, linkId } = useSelector(
    (state: RootState) => state?.user
  );

  const [sidebarState, setSidebarState] = useState<SidebarState>({
    showRefModal: false,
    isSideMounted: false,
  });

  const lockStatus = async () => {
    let status = await freezeStatus(walletProvider, walletAddress);
    dispatch(setFreezingStatus(status));
    if (status == true) {
      // toast.error("Your account has been frozen by the Admin");
    }
  };

  const getRefModal = async () => {
    const userInfo = await userDetails(walletAddress, walletProvider);
    if (userInfo) dispatch(saveUserDetails(userInfo));
    if (userInfo?.referrer == zeroAddress && !linkId) setSidebarState({ ...sidebarState, showRefModal: true });
    else setSidebarState({ ...sidebarState, showRefModal: false });
  };

  useEffect(() => {
    let isMounted = true;

    const cleanup = () => {
      isMounted = false;
    };

    if (!sidebarState?.isSideMounted) {
      setSidebarState({ ...sidebarState, isSideMounted: true });
      return cleanup;
    }

    if (walletAddress) {
      lockStatus();
      getRefModal();
    }
    return cleanup;
  }, [walletAddress, sidebarState?.isSideMounted]);

  const links: LinkType[] = [
    {
      icon: <DashboardIcon />,
      text: "Dashboard",
      link: ROUTES.DASHBOARD,
    },
    // {
    //   icon: <ReferralIcon />,
    //   text: "Referral list",
    //   link: ROUTES.REFERRAL_LIST,
    // },
    {
      icon: <RewardIcon />,
      text: "Rewards Tree",
      link: ROUTES.REWARDSlIST,
    },
    {
      icon: <RewardCharIcon />,
      text: "Rewards Chart",
      link: ROUTES.REWARDCHART,
    },
    {
      icon: <TransactionIcon />,
      text: "Transaction History",
      link: ROUTES.TRANSACTION,
    },

    {
      icon: <FundsIcon />,
      text: "Funds",
      link: ROUTES.FUNDS,
      disabled: freezingStatus ? true : false,
    },
  ];

  return (
    <>
      <div
        onClick={props.handleActive}
        className={`${styles.overlay} ${
          props.active ? styles.active : ""
        } d-xl-none`}
      />

      <motion.div
        className={styles.sidebar_bg}
        animate={{
          ...(props.active
            ? {
                width: window.screen.availWidth < 575 ? "26rem" : "35rem",
                borderRadius: "0",
              }
            : {
                width: "0",
                borderRadius: "0 100% 100% 0",
              }),
        }}
        transition={{
          type: "tween",
          duration: props.active ? 0.8 : 0.3,
          ease: !props.active ? "backIn" : "backOut",
        }}
      />
      <motion.aside
        className={`${styles.sidebar} `}
        animate={{
          transform: props.active ? "translateX(0)" : "translateX(-100%)",
        }}
        transition={{
          type: "spring",
          duration: 0.2,
        }}
      >
        <div className={styles.sidebar_head}>
          <img src={logo} alt="logo" className={styles.logo} />
          <div className="d-flex justify-content-center align-items-center">
            <WalletAddress
              inner
              className={`d-md-none ${styles.sidebar_address}`}
            />
            {/* <div className="d-sm-none d-flex justify-content-center align-items-center">
              <button
                className={`${styles.toggler} ${
                  props.active ? styles.active : ""
                } ms-3`}
                onClick={props.handleActive}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div> */}
          </div>
        </div>

        <div className={styles.sidebar_links}>
          <ul>
            {links.map((item) => (
              <li key={item.link}>
                <NavLink
                  to={item.link}
                  data-disabled={item?.disabled}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                    item?.disabled ? e.preventDefault() : props?.handleActive();
                  }}
                >
                  <span>{item.icon}</span>
                  {item.text}
                </NavLink>
              </li>
            ))}
            <Logout className="d-sm-none logout_btn" />
          </ul>
          <hr />
        </div>
        <div className={styles.social_links}>
          {/* <SocialLinks /> */}

          {sidebarState?.showRefModal && (
            <ReferralModal
              show={sidebarState.showRefModal}
              handleClose={() => setSidebarState({ ...sidebarState, showRefModal: false })}
            />
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
