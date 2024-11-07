import Web3 from "web3";
import {
  ADMIN_WALLET_ADDRESS,
  NETWORKS,
  WALLET_TYPE,
} from "../../utils/constants";
import store from "../app/store";
import {
  logoutUser,
  saveUserPortfolio,
  setLinkId,
  setReferLink,
  setReferrerData,
  walletAddress,
  walletType,
} from "../features/reducers/user.slice";
import toast from "react-hot-toast";
import { DispatchType } from "../types";
import { setLoading } from "../features/reducers/loading.slice";
const { ethereum }: any = window;

export const isMetaMaskInstalled = async () => {
  const result = await Boolean(ethereum && ethereum?.isMetaMask);
  return result;
};
export const disconnectWallet = () => async (dispatch: any) => {
  try {
    dispatch(logoutUser());
    dispatch(walletType(""));
    dispatch(walletAddress(""));
    localStorage.clear();
  } catch (error: any) {
    console.log(error);
    return toast.error(error.message);
  }
};
export const ConnectMetamask = (walletTypes: any) => {
  const { ethereum }: any = window;
  return (dispatch: DispatchType) =>
    new Promise(async (resolve, reject) => {
      /**CHECK METAMASK IN INSTALLED OR NOT */
      try {
        if (!ethereum) {
          // MetaMask not found, redirect to MetaMask installation page
          window.location.href = "https://metamask.io/download.html";
          return;
        }
        if (walletTypes === WALLET_TYPE.METAMASK) {
          const installed = await isMetaMaskInstalled();
          let address;
          if (installed) {
            /**VERIFY METAMASK HAVE OUR NETWORK AND METAMASK SHOULD BE ON OUR NETWORK */
            let chain: any = ethereum.networkVersion;

            let selectedFromNetwork: any = NETWORKS.filter(function (
              item: any
            ) {
              return item.chainId == chain;
            });

            let validNetwork: any =
              selectedFromNetwork.length == 0
                ? await approveNetwork(NETWORKS[0]?.chainId, walletTypes)
                : true;
            if (validNetwork == true) {
              /**METHOD CALL WHEN ACCOUNT CHANGED IN METAMASK */
              ethereum.on(
                "accountsChanged",
                async function (accounts: string[]) {
                  address = accounts[0];
                  /**SAVE WALLET ADDRESS AND WALLET TYPE IN REDUX */
                  dispatch(walletType(WALLET_TYPE.METAMASK));

                  return dispatch(walletAddress(address));
                }
              );
              /**GET ACCOUNT DETAILS */
              const accounts = await ethereum.request({
                method: "eth_requestAccounts",
              });
              address = accounts[0];

              if (
                ADMIN_WALLET_ADDRESS?.toLowerCase() == address?.toLowerCase()
              ) {
                toast?.error("Invalid credentials");
                return;
              }

              /**SAVE WALLET ADDRESS AND WALLET TYPE IN REDUX */
              dispatch(walletType(WALLET_TYPE.METAMASK));
              resolve(address);
              return dispatch(walletAddress(address));
            } else {
              disconnectWallet();
              reject(false);
              return toast.error(validNetwork?.message);
            }
          } else {
            let accounts: any;

            accounts = await ethereum?.request({
              method: "eth_accounts",
            });
            if (accounts && accounts.length > 0) {
              if (
                ADMIN_WALLET_ADDRESS?.toLowerCase() ==
                accounts[0]?.toLowerCase()
              ) {
                toast?.error("Invalid credentials");
                return;
              }

              dispatch(walletType(WALLET_TYPE.METAMASK));
              resolve(accounts[0]);
              return dispatch(walletAddress(accounts[0]));
            } else {
              accounts = await ethereum?.request({
                method: "eth_requestAccounts",
              });
              if (accounts && accounts.length > 0) {
                if (
                  ADMIN_WALLET_ADDRESS?.toLowerCase() ==
                  accounts[0]?.toLowerCase()
                ) {
                  toast?.error("Invalid credentials");
                  return;
                }
                dispatch(walletType(WALLET_TYPE.METAMASK));
                dispatch(walletAddress(accounts[0]));
                return accounts[0];
              } else {
                toast.error("Please install MetaMask.");
                reject(false);
              }
            }
            // }
          }
        }
      } catch (error: any) {
        disconnectWallet();
        reject(false);
        return toast.error(error?.message);
      } finally {
        dispatch(setLoading(false));
      }
    });
};

export const approveNetwork = async (chainId: any, walletTypes: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      /**IF METAMASK IS ON DIFFRENT NETWORK */
      if (walletTypes === WALLET_TYPE.METAMASK) {
        if (ethereum.networkVersion != chainId) {
          try {
            /**SWITCH METAMASK TO OUR NETWORK */

            await ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: Web3.utils.toHex(chainId) }],
            });
            resolve(true);
          } catch (err: any) {
            console.log(err);
            /**IF METAMASK DO'NT HAVE OUR NETWORK. ADD NEW NETWORK */
            if (err.code == 4902 || err.code == 4100 || err.code == undefined) {
              let selectedNetwork: any = NETWORKS.filter(function (item: any) {
                return item.chainId == chainId;
              })[0];

              await ethereum
                .request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: Web3.utils.toHex(selectedNetwork.chainId),
                      chainName: selectedNetwork.symbol,
                      nativeCurrency: {
                        name: selectedNetwork.symbol,
                        symbol: selectedNetwork.symbol,
                        decimals: Number(selectedNetwork.decimals),
                      },
                      rpcUrls: [selectedNetwork.rpc],
                      blockExplorerUrls: [selectedNetwork.explorerUrl],
                    },
                  ],
                })
                .then((res: any) => {
                  resolve(true);
                })
                .catch((error: any) => {
                  console.log(error);
                  resolve(false);
                });
            }
          }
        }
      } else {
        toast.error("Please Connect Wallet");
        resolve(false);
      }
    } catch (error) {
      resolve(false);
      console.log(error, "error");
    }
  });
};

export const changeNetwork = async (
  connector: object | undefined | any,
  chainId: string | Number | any
) => {
  try {
    if (chainId != NETWORKS[0]?.chainId) {
      const switchResponse = await connector?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Web3.utils.toHex(NETWORKS[0]?.chainId) }],
      });
      if (switchResponse == null) {
        toast.dismiss();
        return true;
      }
    } else if (chainId == NETWORKS[0]?.chainId) {
      return true;
    }
  } catch (switchError: any) {
    try {
      if (switchError?.message == "User rejected the request.") {
        return false;
      }
      let res: any = await connector?.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: Web3.utils.toHex(NETWORKS[0]?.chainId),
            chainName: NETWORKS[0]?.label,
            rpcUrls: [NETWORKS[0]?.rpc],
            blockExplorerUrls: [NETWORKS[0]?.explorerUrl],
            nativeCurrency: {
              name: NETWORKS[0]?.label,
              symbol: NETWORKS[0]?.symbol, // 2-6 characters long
              decimals: 18,
            },
          },
        ],
      });
      if (res == null) {
        toast.dismiss();
        return true;
      }
    } catch (addError) {
      toast.dismiss();
      return addError;
    }
  }
};

if (ethereum) {
  ethereum.on("accountsChanged", (address: string) => {
    if (window?.location?.pathname?.includes("auth")) {
      if (ADMIN_WALLET_ADDRESS?.toLowerCase() == address[0]?.toLowerCase()) {
        store.dispatch(walletAddress(""));
        toast?.error("Invalid credentials");
        return;
      }
      store.dispatch(setLinkId(""));
      store.dispatch(setReferrerData(""));
      store.dispatch(saveUserPortfolio(""));
      store.dispatch(setReferLink(""));
      store.dispatch(walletAddress(address[0]));
    }
  });
}
