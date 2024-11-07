import toast from "react-hot-toast";
import { contractDetail } from "../../assets/abi/contractDetails";
import { web3Instance } from "./contractService";
import {
  getError,
  localeStringFunction,
  rewardManagement,
  usdtValueConvert,
  toFunctionBigNumberFixed,
} from "./Helper";
import store from "../../redux/app/store";
import { setLoading } from "../../redux/features/reducers/loading.slice";
import { MAX_LIMIT, NETWORKS } from "../../utils/constants";

export const tokenApproval = async (
  walletAddress: string,
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const USDT_TOKEN: any = contractDetail.filter(
      (a: any) => a.symbol == "USDT"
    );
    const Contract = await web3Instance(
      USDT_TOKEN[0].abi,
      USDT_TOKEN[0].address,
      walletProvider
    );
    if (Contract) {
      let gas = await Contract?.methods
        .approve(skyContract[0].address, MAX_LIMIT)
        .estimateGas({ from: walletAddress });
      const gasLimit = gas?.toString();
      let res = await Contract?.methods
        .approve(skyContract[0].address, MAX_LIMIT)
        .send({
          from: walletAddress,
          gas: gasLimit,
        });
      return res;
    }
  } catch (error) {
    store?.dispatch(setLoading(false));
    let err = getError(error);
    toast?.error(err);
  }
};

export const tokenAllowance = async (
  walletAddress: any,
  walletProvider: object | undefined | any
) => {
  try {
    const USDT_TOKEN: any = contractDetail.filter(
      (a: any) => a.symbol == "USDT"
    );
    const Contract = await web3Instance(
      USDT_TOKEN[0].abi,
      USDT_TOKEN[0].address,
      walletProvider
    );

    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    if (Contract) {
      const res = await Contract?.methods
        ?.allowance(walletAddress, skyContract[0].address)
        .call();
      return res?.toString();
    }
  } catch (error: any) {
    return error;
  }
};

export const DepositToken = async (
  amount: string | number,
  walletAddress: string,
  referrerAddress: string | undefined | any,
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );

    if (contract) {
      let gas: any = await contract?.methods
        ?.deposit(
          localeStringFunction(amount, NETWORKS && NETWORKS[0]?.decimals),
          referrerAddress
        )
        .estimateGas({ from: walletAddress });
      let gasLimit: any = gas?.toString();

      let res = await contract?.methods
        ?.deposit(
          localeStringFunction(amount, NETWORKS && NETWORKS[0]?.decimals),
          referrerAddress
        )
        .send({
          from: walletAddress,
          gas: gasLimit,
        });
      return res;
    }
  } catch (error: any) {
    store?.dispatch(setLoading(false));
    let err = getError(error);
    toast?.error(err);
  }
};

export const WithdrawFromContract = async (
  withDrawKey: string,
  walletAddress: string,
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );

    if (contract) {
      let Function =
        withDrawKey == "Daily"
          ? await contract?.methods?.withdrawDailyRewards
          : await contract?.methods?.withdrawWeeklyRewards;
      let gas: any = await Function().estimateGas({ from: walletAddress });
      let gasLimit: any = gas?.toString();
      let res = await Function().send({
        from: walletAddress,
        gas: gasLimit,
      });
      return res;
    }
  } catch (error) {
    store?.dispatch(setLoading(false));
    let err = getError(error);
    toast?.error(err);
  }
};

export const userDetails = async (
  walletAddress: string,
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const Contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );

    if (Contract) {
      const res = await Contract?.methods?.Details(walletAddress).call();
      return res;
    }
  } catch (error: any) {
    return 0;
  }
};

export const getWithdrawPercent = async (
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const Contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );

    if (Contract) {
      const res = await Contract?.methods?.withdrawLimit().call();
      const conver = usdtValueConvert(Number(res))
      return conver;
    }
  } catch (error: any) {
    return 0;
  }
};

export const dailyStatus = async (
  walletAddress: string,
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const Contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );

    if (Contract && walletAddress) {
      const res = await Contract?.methods?.Status(walletAddress).call();
      return res;
    }
  } catch (error: any) {
    console.log("Status error", error);
    return 0;
  }
};

export const getRoiUpdate = async (
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const Contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );

    if (Contract) {
      const res = await Contract?.methods?.interestRatePerDay().call();
      return res;
    }
  } catch (error: any) {
    console.log("Status error", error);
    return 0;
  }
};

export const userTokenBalance = async (
  walletAddress: string,
  walletProvider: object | undefined | any
) => {
  try {
    const usdtContract: any = contractDetail.filter(
      (a: any) => a.symbol == "USDT"
    );
    const Contract = await web3Instance(
      usdtContract[0].abi,
      usdtContract[0].address,
      walletProvider
    );

    if (Contract) {
      const res = await Contract?.methods?.balanceOf(walletAddress).call();
      return usdtValueConvert(res);
    }
  } catch (error: any) {}
};

export const rewardManagementFromContract = async (
  amount: string | number | undefined | any,
  rewardKey: string,
  walletAddress: string,
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );

    if (contract) {
      let Function =
        rewardKey == "Daily Income"
          ? await contract?.methods?.setRateOfRewards
          : rewardKey == "Referral Income"
          ? await contract?.methods?.setInducedLevelIncomePercent
          : await contract?.methods?.setReferralIncomePercent;

      let gas: any = await Function(rewardManagement(amount)).estimateGas({
        from: walletAddress,
      });
      let gasLimit: any = gas?.toString();
      let res = await Function(rewardManagement(amount)).send({
        from: walletAddress,
        gas: gasLimit,
      });
      return res;
    }
  } catch (error) {
    store?.dispatch(setLoading(false));
    console.log("errorsasasa", error);
    let err = getError(error);
    toast?.error(err);
  }
};

export const DailyIncomePercentage = async (
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );
    if (contract) {
      const res: any = await contract?.methods.dailyReturnsGlobalNum().call();

      return res;
    }
  } catch (error) {
    console.log("error:dailyIncomePercentage", error);
    return 0;
  }
};

export const WeeklyIncomePercentage = async (
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );

    const contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );

    if (contract) {
      const res: any = await contract?.methods
        .inducedLevelIncomePercent()
        .call();

      return res;
    }
  } catch (error) {
    console.log("error:weeklyIncomePercentage", error);
    return 0;
  }
};

export const ReferralPercentage = async (
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );

    const contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );

    if (contract) {
      const res: any = await contract?.methods.referralIncomePercent().call();
      return res;
    }
  } catch (error) {
    console.log("error:referralPercentage", error);
    return 0;
  }
};

export const ROIPercentage = async (
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );

    const contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );

    if (contract) {
      const res: any = await contract?.methods.interestRatePerDay().call();
      return res;
    }
  } catch (error) {
    console.log("error:interestRatePerDay", error);
    return 0;
  }
};

export const levelPercentage = async (
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );

    const contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );

    if (contract) {
      const res: any = await contract?.methods
        .inducedLevelIncomePercent()
        .call();
      return res;
    }
  } catch (error) {
    console.log("error:inducedLevelIncomePercent", error);
    return 0;
  }
};

export const thresholdPercentage = async (
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );

    const contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );

    if (contract) {
      const res: any = await contract?.methods.thresholdLimit().call();
      return res;
    }
  } catch (error) {
    console.log("error:thresholdLimit", error);
    return 0;
  }
};

export const globalTimeWithdraw = async (
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );

    if (contract) {
      const res: any = await contract?.methods?.timeOfDeployment().call();

      return res;
    }
  } catch (error) {
    console.log("error:referralPercentage", error);
    return 0;
  }
};

export const dailyWithdrawRewards = async (
  walletProvider: object | undefined | any,
  walletAddress: string
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );
    if (contract) {
      const res: any = await contract?.methods
        ?.viewWithdrawDailyRewards(walletAddress)
        .call();
      return res;
    }
  } catch (error) {
    console.log("error:referralPercentage", error);
    return 0;
  }
};

export const weeklyWithdrawRewards = async (
  walletProvider: object | undefined | any,
  walletAddress: string
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );
    if (contract) {
      const res: any = await contract?.methods
        ?.viewWithdrawWeeklyRewards(walletAddress)
        .call();
      return res;
    }
  } catch (error) {
    console.log("error:viewEstimatedWeeklyReward", error);
    return 0;
  }
};

export const getROIPercent = async (
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );

    const contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );

    if (contract) {
      const res: any = await contract?.methods.interestRatePerDay().call();
      return res;
    }
  } catch (error) {
    console.log("error:interestRatePerDay", error);
    return 0;
  }
};

export const getFutureIncome = async (
  walletProvider: object | undefined | any,
  useraddress: string
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );
    if (contract) {
      const res: any = await contract?.methods
        ?.viewFutureIncome(useraddress)
        .call();
      return res;
    }
  } catch (error) {
    console.log("error:InCaseOfViewFutureInCome");
    return 0;
  }
};

export const initialSkyTotalSupplyFunction = async (
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );
    if (contract) {
      const res: any = await contract?.methods?.initialSkyTotalSupply().call();
      return res;
    }
  } catch (error) {
    console.log("error:InCaseOfViewFutureInCome");
    return 0;
  }
};

export const percentTillLockedFunction = async (
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );
    if (contract) {
      const res: any = await contract?.methods?.percentTillLocked().call();
      return res;
    }
  } catch (error) {
    console.log("error:InCaseOfViewFutureInCome");
    return 0;
  }
};

export const skyPricee = async (walletProvider: object | undefined | any) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const Contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );

    if (Contract) {
      const res = await Contract?.methods?.skyPrice().call();
      return res;
    }
  } catch (error: any) {
    console.log(error, "errorincaseofskyprice");
    return 0;
  }
};

export const freezeStatus = async (
  walletProvider: object | undefined | any,
  walletAddress: string
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const Contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );

    if (Contract) {
      const res = await Contract?.methods?.lockUser(walletAddress).call();
      return res;
    }
  } catch (error: any) {
    return 0;
  }
};

export const skyTokenTotalSupplyFunction = async (
  walletProvider: object | undefined | any
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY"
    );
    const Contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );

    if (Contract) {
      const res = await Contract?.methods?.totalSupply().call();
      return res;
    }
  } catch (error: any) {
    return 0;
  }
};

export const futureWithdrawFunction = async (
  walletProvider: object | undefined | any,
  walletAddress: string
) => {
  try {
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const contract = await web3Instance(
      skyContract[0].abi,
      skyContract[0].address,
      walletProvider
    );
    if (contract) {
      let gas: any = await contract?.methods
        ?.redeemLockedTokens()
        .estimateGas({ from: walletAddress });
      let gasLimit: any = gas?.toString();
      let res = await contract?.methods?.redeemLockedTokens().send({
        from: walletAddress,
        gas: gasLimit,
      });
      return res;
    }
  } catch (error) {
    store?.dispatch(setLoading(false));
    let err = getError(error);
    toast?.error(err);
  }
};

export const GetRewardLimit = async (
  walletProvider: object | undefined | any,
) => {
  let res;
    const skyContract: any = contractDetail.filter(
      (a: any) => a.symbol == "SKY_CONTRACT"
    );
    const Contract = await web3Instance(
    skyContract[0].abi,
    skyContract[0].address,
    walletProvider
    );
    try {
      if (Contract) {
        res = await Contract?.methods?.rewardLimit().call();
        return res;
      }
    } catch (error: any) {
       res = await Contract?.methods?.rewardLimit().call();
        if(res) return res
        else return 0
  }
};