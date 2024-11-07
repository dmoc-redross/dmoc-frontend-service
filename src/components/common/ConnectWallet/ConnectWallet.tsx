import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ADMIN_WALLET_ADDRESS,
  DAPP_URL_METAMASK,
  NETWORKS,
  ROUTES,
} from "../../../utils/constants";
import Button from "../Button/Button";
import wc_icon from "../../../assets/icons/walletconnect.svg";
import wallet_icon from "../../../assets/icons/wallet_icon.png";
import { CloseIcon } from "../../../assets/icons/svgicons";
import styles from "./ConnectWallet.module.scss";
import { RootState } from "../../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import {
  walletAddress,
  walletType,
  saveBlockchainChainid,
  reset,
} from "../../../redux/features/reducers/user.slice";
import { WALLET_TYPE } from "../../../utils/constants";
import {
  changeNetwork,
  disconnectWallet,
} from "../../../redux/actions/user.action";
import {
  useDisconnect,
  useWeb3Modal,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { setLoading } from "../../../redux/features/reducers/loading.slice";



const ConnectWallet = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const { disconnect } = useDisconnect();
  let params = useParams();
  let location = useLocation();
  const { open } = useWeb3Modal();
  const { address, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const wType = useSelector((state: RootState) => state?.user?.walletType);
  const userAddress = useSelector(
    (state: RootState) => state?.user?.walletAddress
  );
  const [state, setState] = useState({
    isDisabled: false,
    active: false,
  });
  const walletsConnect = async (wallet: string) => {
    dispatch(walletType(wallet));
    setState((prevState) => ({ ...prevState, isDisabled: true }));
    setTimeout(() => setState((prevState) => ({ ...prevState, isDisabled: false })), 1000);
    try {
      await open();
      setTimeout(() => {
        let modal = document
          .querySelector("w3m-modal")
          ?.shadowRoot?.children.item(0) as HTMLElement;
        modal.style.alignItems = "center";
      }, 0);
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    if (userAddress) getRoutes();
  }, [userAddress]);

  const getRoutes = () => {
    if (location.pathname == `/auth/funds/${params?.id}`) {
      navigate(`${ROUTES.DASHBOARD + "/" + params?.id}`);
    } else if (location.pathname == "/auth/funds") {
      navigate(ROUTES.FUNDS);
    } else if (params?.id) {
      navigate(`${ROUTES.DASHBOARD + "/" + params?.id}`);
    } else {
      navigate(ROUTES.DASHBOARD);
    }
  };

  useEffect(() => {
    if (address) walletConnectAddress();
  }, [address]);

  const walletConnectAddress = async () => {
    try {
      dispatch(setLoading(true));
      if (
        chainId != NETWORKS[0]?.chainId &&
        wType == WALLET_TYPE.WALLET_CONNECT &&
        address?.toLowerCase() != ADMIN_WALLET_ADDRESS?.toLowerCase() &&
        !userAddress
      ) {
        const networkResponse: any = await changeNetwork(
          walletProvider,
          chainId
        );
        if (networkResponse == true) {
          setTimeout(() => {
            dispatch(walletAddress(address));
            dispatch(setLoading(false));
            getRoutes();
            dispatch(saveBlockchainChainid(NETWORKS[0]?.chainId.toString()));
          }, 3000);
        } else handleWalletDisconnect();
      } else if (
        address?.toLowerCase() != ADMIN_WALLET_ADDRESS?.toLowerCase() &&
        !userAddress
      ) {
        setTimeout(() => {
          dispatch(walletAddress(address));
          dispatch(setLoading(false));
          getRoutes();
          toast.success("Wallet connected successfully");
          dispatch(saveBlockchainChainid(NETWORKS[0]?.chainId.toString()));
        }, 3000);
      } else if (
        address?.toLowerCase() == ADMIN_WALLET_ADDRESS?.toLowerCase()
      ) {
        handleWalletDisconnect();
        address?.toLowerCase() == ADMIN_WALLET_ADDRESS?.toLowerCase() &&
          toast.error("You can't connect through the admin address!!");
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log("error", error);
    }
  };

  const handleWalletDisconnect = async () => {
    await disconnect();
    dispatch(setLoading(false));
    dispatch(disconnectWallet());
    dispatch(reset());
  };

  const walletList = [
    {
      id: 2,
      name: "Wallet Connect",
      icon: wc_icon,
    },
  ];

  const handleClick = () => {
    setState((prevState) => ({ ...prevState, active: !prevState.active }));
  };

  return (
    <>
      <div className={styles.cw}>
        <Button
          onClick={() => {
            walletsConnect(WALLET_TYPE.WALLET_CONNECT);
          }}
          icon={<img src={wallet_icon} alt="wallet-icon" />}
          className={styles.cw_btn}
          text="Connect Wallet"
          disabled={state.isDisabled}
        />
        <div
          className={`${styles.walletList} ${
            state?.active ? styles.walletList__show : ""
          } `}
        >
          <div className={styles.walletList__head}>
            <h5>Connect Wallet</h5>
            <button type="button" onClick={handleClick}>
              <CloseIcon />
            </button>
          </div>
          <div className={styles.walletList__body}>
            <ul>
              {walletList.map((item, index) => (
                <li key={index}>
                  <button type="button" className={styles.walletList__button}>
                    <span>
                      <img src={item.icon} alt={item.name} />
                    </span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
            <p>
              Note: Start your journey by connecting with one of the above
              wallets. be sure to store your private keys or seed phrases
              securely. never share them with anyone.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectWallet;
