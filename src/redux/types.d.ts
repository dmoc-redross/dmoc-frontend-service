type DispatchType = (args: Action) => Action;
export interface UserState {
  walletAddress: string;
  walletType: string | null;
  blockchainChainId: string | number;
  referLink: string | number | null;
  referrerData: any | object;
  userDetails: object | undefined | any;
  user_Mangement: string | any | undefined | object;
  Transaction: string | any | number | undefined | object;
  Referrallisting: string | any | number | object | undefined;
  SocialMedia: string | any | number | object | undefined;
  userPortfolio: object | any;
  user_Mangement: string | any | undefined | object;
  Transaction: string | any | number | undefined | object;
  Referrallisting: string | any | number | object | undefined;
  SocialMedia: string | any | number | object | undefined;
  myTeam: string | any | number | object | undefined;
  linkId: string;
  facebook: string | any | number | object;
  Whatapps: string | any | number | object;
  Twitter: string | any | number | object;
  Telegarm: string | any | number | object;
  totalburn: string | any | number | object | undefined;
  totalInvestment: string | any | number | object | undefined;
  totalRevenue: string | any | number | object | undefined;
  totalMembers: string | any | number | object | undefined;
  status: any | object;
  freezingStatus: boolean;
  globalSkyPrice: string | any | number | object | undefined;
  duckIncome: string | any | number | object | undefined;
  perdayRewardGenerated: string | any | number | object | undefined;
  weekRewardGenerated: string | any | number | object | undefined;
  RewardMutipler: string | any | number | object | undefined;
  after14days: string | any | number | object | undefined;
  currentTime: string | any | number | object | undefined;
  remainingDays: any;
  progress: any;
  roi: number | string;
  pendingSupply: any;
  withdrawPercent: any;
  recentActivity: any;
  refDone: string | any;
  userBalance: string | number | any;
}

export interface RootState {
  user: UserState;
  loader: LoaderState;
}
