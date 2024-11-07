import Web3 from "web3";
import store from "../../redux/app/store";
import { NETWORKS, WALLET_TYPE } from "../../utils/constants";
import { isMobile } from "react-device-detect";

/**
 * create web3 Instance for Contract Function Calling.
 * @param abi
 * @param contractAddress
 * @param walletProvider
 * @returns
 */
export const web3Instance = async (
  abi: any,
  contractAddress: any,
  walletProvider: any
) => {
  const { ethereum } = window;
  const { walletType } = store?.getState()?.user;
  const account = store.getState().user?.walletAddress;
  if (ethereum && !!account && walletType == WALLET_TYPE.METAMASK) {
    let _web3Instance: any = await callWeb3(walletProvider);
    let Instance = new _web3Instance.eth.Contract(abi, contractAddress);
    return Instance;
  } else {
    let _web3Instance: any = await callWeb3(walletProvider);
    let Instance = new _web3Instance.eth.Contract(abi, contractAddress);
    return Instance;
  }
};

/**
 * create multi wallet provider.
 * @param walletProvider
 * @returns
 */

export const callWeb3 = async (walletProvider: any) => {
  const { walletType } = store?.getState()?.user;
  const { ethereum }: any = window;

  let web3Object: any;
  try {
    if (ethereum && walletType == WALLET_TYPE.METAMASK) {
      web3Object = new Web3(ethereum);
      return web3Object;
    } else if (walletType == WALLET_TYPE.WALLET_CONNECT) {
      if (walletProvider && !ethereum && isMobile && !ethereum?.isMetaMask) {
        web3Object = new Web3(walletProvider);
        return web3Object;
      } else if (
        (ethereum && isMobile && ethereum?.isMetaMask) ||
        (ethereum && isMobile && ethereum?.trustwallet)
      ) {
        web3Object = new Web3(ethereum);
        return web3Object;
      } else {
        if (walletProvider) {
          web3Object = new Web3(walletProvider);
          return web3Object;
        } else if (ethereum) {
          web3Object = new Web3(ethereum);
          return web3Object;
        } else {
          web3Object = new Web3(walletProvider);
          return web3Object;
        }
      }
    }
    else {
      web3Object = new Web3(NETWORKS[0].rpc);
      return web3Object;
    }
  } catch (error) {
    web3Object = new Web3(NETWORKS[0].rpc);
    return web3Object;
  }
};
