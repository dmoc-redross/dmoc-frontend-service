import { scroll } from "framer-motion";
import { Dispatch, useEffect, useState } from "react";
import logo from "../../../assets/logo/logo.svg";
import {
  ADMIN_WALLET_ADDRESS,
  NETWORKS,
  ROUTES,
  WALLET_TYPE,
} from "../../../utils/constants";
import { motion } from "framer-motion";
import WalletAddress from "../WalletAddress/WalletAddress";
import Logout from "../Logout/Logout";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  saveBlockchainChainid,
  walletAddress,
} from "../../../redux/features/reducers/user.slice";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useNavigate } from "react-router-dom";
import { useDisconnect } from "@web3modal/ethers/react";
import { disconnectWallet } from "../../../redux/actions/user.action";
import toast from "react-hot-toast";
import { RootState } from "../../../redux/types";

type propTypes = {
  active?: boolean;
  handleActive?: () => void;
};

const Header = (props: propTypes) => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const { walletProvider }: any = useWeb3ModalProvider();
  const wType = useSelector((state: RootState) => state?.user?.walletType);
  const { blockchainChainId } = useSelector((state: RootState) => state?.user);
  const [scrolled, setScrolled] = useState<boolean>(false);

  scroll((progress) => setScrolled(progress > 0));

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { disconnect } = useDisconnect();
  useEffect(() => {
    if (address) redirectToHomePageByWalletConnect();
  }, [address, blockchainChainId]);

  const redirectToHomePageByWalletConnect = async () => {
    try {
      if (
        (blockchainChainId != NETWORKS[0]?.chainId &&
          wType == WALLET_TYPE.WALLET_CONNECT &&
          blockchainChainId) ||
        address?.toLowerCase() == ADMIN_WALLET_ADDRESS?.toLowerCase()
      ) {
        await disconnect();
        dispatch(disconnectWallet());
        navigate(ROUTES.HOME);
        toast?.error(
          address?.toLowerCase() == ADMIN_WALLET_ADDRESS?.toLowerCase()
            ? "You can't connect through the admin address!!"
            : "Wrong network!!"
        );
      } else if (!address && !isConnected) {
        await disconnect();
        dispatch(disconnectWallet());
        navigate(ROUTES.HOME);
      } else {
        dispatch(walletAddress(address));
      }
    } catch (error) {
      console.log(error, "errorIncaseOfNavigate");
    }
  };

  useEffect(() => {
    if (chainId != blockchainChainId) {
      dispatch(saveBlockchainChainid(chainId));
    }
  }, [chainId]);

  /**
   * wallet Connect session end from mobile
   */

  useEffect(() => {
    disconnectSessionEnd();
  });
  const disconnectSessionEnd = () => {
    try {
      if (walletProvider) {
        walletProvider.on("session_delete", () => {
          disconnect();
          dispatch(disconnectWallet());
          navigate(ROUTES.HOME);
        });
      }
    } catch (error) {}
  };
  const [active, setActive] = useState(false);
  return (
    <>
      <motion.header
        className={`${styles.header} ${scrolled ? styles.header_active : ""}`}
        initial={{
          y: "-100%",
        }}
        animate={{
          y: "0",
        }}
      >
        <div className={styles.header_in}>
          <div
            className={`${styles.header_links} ${active ? styles.active : ""}`}
          >
            <div className={`d-xl-none me-sm-4 ${styles.header_logo} `}>
              <img className="d-lg-block" src={logo} alt="logo" />
            </div>

            <WalletAddress inner className="d-md-flex" />
          </div>
          <div className={` ${styles.header_in_right}`}>
            <Logout className="d-md-block" />

            <button
              className={`${styles.toggler} ${
                props.active ? styles.active : ""
              } d-xl-none ms-3`}
              onClick={props.handleActive}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
