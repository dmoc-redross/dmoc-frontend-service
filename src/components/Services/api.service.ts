import { APIURL } from "../../utils/constants";
import { apiCallGet, apiCallPost } from "./axios.service";
import store from "../../redux/app/store";
import { setLoading } from "../../redux/features/reducers/loading.slice";

export const getRefererLink = async (data: any) => {
  try {
    const result: any = await apiCallPost(
      APIURL.GET_REFER_LINK,
      data,
      {},
      false
    );

    if (result) {
      return result;
    }
  } catch (error: any) {
    console.error("Error in getRefererLink:", error?.message);
  }
};

export const getCheckUser = async (data: any) => {
  try {
    const result: any = await apiCallPost(
      APIURL.GET_REFER_DETAIL,
      data,
      // {},
      false
    );


    if (result) {
      return result;
    }
  } catch (error: any) {
    console.error("Error in getCheckUser:", error?.message);
  }
};

export const getPackages = async (data: any) => {
  try {
    const response: any = await apiCallPost(
      APIURL.GET_PACKAGE,
      data,
      {},
      false
    );
    if (response?.status == 200) {
      return response;
    }
  } catch (error) {
    store?.dispatch(setLoading(false));
  }
};

export const TransactionHistory = async (data: any) => {
  try {
    const resTransactionHistory: any = await apiCallPost(
      APIURL.GET_TRANSACTION_HISTORY,
      data,
      {},
      false
    );

    if (resTransactionHistory?.status == 200) {
      return resTransactionHistory;
    }
  } catch (error) {
    console.log(error, "notGettingData");
  }
};

export const referralsListing = async (data: any) => {

  try {
    const resReferralsListing: any = await apiCallPost(
      APIURL.GET_REFERRAL_LIST,
      data,
      {},
      false
    );


    if (resReferralsListing?.status == 200) {
      return resReferralsListing?.data;
    }
  } catch (error) {
    console.log(error, "errorInCaseOfReferrallist_Api");
  }
};

export const socialMedia = async (data: any) => {
  try {
    const ressocialMedia: any = await apiCallPost(APIURL.GET_SOCIAL_LINK, data, {}, false);
    if (ressocialMedia?.status == 200) {
      return ressocialMedia;
    }
  } catch (error) {
    console.log(error, "errorInCaseOfApiSocailMedia");
  }
};

export const GobalLink = async () => {
  try {
    const resGobalLink: any = await apiCallGet(APIURL.GET_GOLBAL_LINK, {}, false);
    if (resGobalLink?.status === 200) {
      return resGobalLink;
    }
  } catch (error) {
    console.log(error, "errorIncaseOfGolobalLink");
  }
};

export const LandingPage = async () => {
  try {
    const reslanding: any = await apiCallGet(APIURL.GET_LANDING_PAGE, {}, false);
    if (reslanding?.status === 200) {
      return reslanding;
    }
  } catch (error) {
    console.log(error, "errorIncaseOfLandingPage");
  }
};

export const LeaderBoardapi = async () => {
  try {
    const resLeader: any = await apiCallGet(APIURL.Get_LEADER_BOARD, {}, false);
    if (resLeader?.status == 200) {
      return resLeader;
    }
  } catch (error) {
    console.log(error, "errorINCaseOfLeaderBoard");
  }
};

export const LevelBreakdown = async (data: any) => {
  try {
    const resLevel: any = await apiCallPost(APIURL.LEVEL_BREAKDOWN, data, {}, false);
    if (resLevel?.status == 200) {
      return resLevel;
    }else{
      console.error(`Unexpected status code: ${resLevel?.status}`, resLevel);
      throw new Error(`Unexpected status code: ${resLevel?.status}`);
    }
  } catch (error) {
    console.error("Error in API call to LEVEL_BREAKDOWN:", error);
    throw error;
  }
};

export const RewardMangementapi = async () => {
  try {
    const res: any = await apiCallGet(APIURL.GET_REWARD_MANGEMENT, {}, false);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error, "errorRewardMangementapi");
  }
};