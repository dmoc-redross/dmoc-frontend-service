import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../types";
const initialState = {
  walletAddress: "",
  walletType: "",
  blockchainChainId: "",
  referLink: "",
  referrerData: {},
  userDetails: {},
  user_Mangement: [],
  Transaction: [],
  Referrallisting: [],
  userPortfolio: {},
  SocialMedia: [],
  myTeam: "",
  linkId: "",
  facebook: "",
  Whatapps: "",
  Twitter: "",
  Telegarm: "",
  totalburn: "",
  totalInvestment: "",
  totalMembers: "",
  status: {},
  freezingStatus: false,
  globalSkyPrice: "",
  duckIncome: "",
  perdayRewardGenerated: "",
  weekRewardGenerated: "",
  RewardMutipler: "",
  currentTime: "",
  after14days: "",
  progress: "",
  roi: "",
  pendingSupply: "",
  remainingDays: 0,
  refDone: "",
  recentActivity: [],
  withdrawPercent: "",
  userBalance: 0
} as UserState;

// Create the UserSlice

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    walletAddress: (state, action: PayloadAction<string | any>) => {
      state.walletAddress = action.payload;
    },
    walletType: (state, action: PayloadAction<string | any>) => {
      state.walletType = action.payload;
    },
    logoutUser: (state) => {
      state.walletAddress = "";
      state.walletType = "";
    },
    setReferLink: (state, action: PayloadAction<string>) => {
      state.referLink = action.payload;
    },
    setReferrerData: (state, action: PayloadAction<string>) => {
      state.referrerData = action.payload;
    },
    saveUserDetails: (
      state,
      action: PayloadAction<object | undefined | any>
    ) => {
      state.userDetails = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    saveBlockchainChainid: (state, action: PayloadAction<string | any>) => {
      state.blockchainChainId = action.payload;
    },
    setTransactionHistory: (state, action: PayloadAction<string | any>) => {
      state.Transaction = action.payload;
    },
    setReferralList: (state, action: PayloadAction<string | any>) => {
      state.Referrallisting = action.payload;
    },
    setSocialMedia: (state, action: PayloadAction<string | any>) => {
      state.SocialMedia = action.payload;
    },
    saveUserPortfolio: (state, action: PayloadAction<string | any>) => {
      state.userPortfolio = action.payload;
    },
    setLinkId: (state, action: PayloadAction<string | any>) => {
      state.linkId = action.payload;
    },
    setfacebook: (state, action: PayloadAction<string | any>) => {
      state.facebook = action.payload;
    },
    setWhatapps: (state, action: PayloadAction<string | any>) => {
      state.Whatapps = action.payload;
    },
    setTwitter: (state, action: PayloadAction<string | any>) => {
      state.Twitter = action.payload;
    },
    setTelegarm: (state, action: PayloadAction<string | any>) => {
      state.Telegarm = action.payload;
    },
    settotalBurn: (state, action: PayloadAction<string | any>) => {
      state.totalburn = action.payload;
    },
    settotalInvestment: (state, action: PayloadAction<string | any>) => {
      state.totalInvestment = action.payload;
    },
    settotalMembers: (state, action: PayloadAction<string | any>) => {
      state.totalMembers = action.payload;
    },
    setFreezingStatus: (state, action: PayloadAction<string | any>) => {
      state.freezingStatus = action.payload;
    },
    setGlobalSkyPrice: (state, action: PayloadAction<string | any>) => {
      state.globalSkyPrice = action.payload;
    },
    setDuckIncome: (state, action: PayloadAction<string | any>) => {
      state.duckIncome = action.payload;
    },
    setperDayRewardGenerated: (state, action: PayloadAction<string | any>) => {
      state.perdayRewardGenerated = action.payload;
    },
    setweekRewardGenerated: (state, action: PayloadAction<string | any>) => {
      state.weekRewardGenerated = action.payload;
    },
    setRewardMutipler: (state, action: PayloadAction<string | any>) => {
      state.RewardMutipler = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<string | any>) => {
      state.currentTime = action.payload;
    },
    setAfter14Days: (state, action: PayloadAction<string | any>) => {
      state.after14days = action.payload;
    },
    setProgress: (state, action: PayloadAction<string | any>) => {
      state.progress = action.payload;
    },
    setUpdatedROI: (state, action: PayloadAction<string | any>) => {
      state.roi = action.payload;
    },
    setRemainingDays: (state, action: PayloadAction<string | any>) => {
      state.remainingDays = action.payload;
    },
    setPendingSupply: (state, action: PayloadAction<string | any>) => {
      state.pendingSupply = action.payload;
    },
    saveActivityData: (state, action: PayloadAction<string | any>) => {
      state.recentActivity = action.payload;
    },
    setWithdrawPercent: (state, action: PayloadAction<string | any>) => {
      state.withdrawPercent = action.payload;
    },
    setRefDone: (state, action: PayloadAction<string | any>) => {
      state.refDone = action.payload;
    },
    setUserBalance: (state, action: PayloadAction<string | any>) => {
      state.userBalance = action.payload;
    },
    reset: () => initialState,
  },
});

// Export the action creators
export const {
  walletAddress,
  logoutUser,
  walletType,
  setReferLink,
  setReferrerData,
  saveUserDetails,
  saveBlockchainChainid,
  setTransactionHistory,
  setSocialMedia,
  reset,
  setReferralList,
  setLinkId,
  setfacebook,
  setWhatapps,
  setTwitter,
  setTelegarm,
  settotalBurn,
  settotalInvestment,
  settotalMembers,
  setStatus,
  setFreezingStatus,
  setGlobalSkyPrice,
  setDuckIncome,
  setperDayRewardGenerated,
  setweekRewardGenerated,
  saveUserPortfolio,
  setRewardMutipler,
  setCurrentTime,
  setAfter14Days,
  setProgress,
  setRemainingDays,
  setUpdatedROI,
  setRefDone,
  setPendingSupply,
  setWithdrawPercent,
  saveActivityData,
  setUserBalance
} = UserSlice.actions;
