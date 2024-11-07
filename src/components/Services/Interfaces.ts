export interface Package {
    amount: number;
    [key: string]: any;
}

export interface State {
    isUserPortMounted: boolean;
    packageAmount: string | number;
    packagesmangement: Package[];
    isButtonDisabled: boolean;
}

export interface Status {
    totalInvested: string;
}
  
export interface UserDetails {
resetTime: string | number;
}

export interface Action {
type: string;
payload: any;
}

export interface WithdrawState {
disable: boolean;
progressValue: number;
totalSupply: string;
}

export interface WeeklyProps {
    setWithdrawButtonDisable: (value: boolean) => void;
    withdrawButtonDisable: boolean;
    handleRefresh: () => void;
}

export interface UserPortfolio {
    referralLink?: string;
    referrerAddress?: string;
}

export interface SkyCardLink {
    icon: string;
    value: string;
    website: string;
}

export interface DashUserState {
    walletAddress: string | null;
    userPortfolio: UserPortfolio | null;
    linkId: string | null;
  }
  
export interface Status {
    receivedDailyIncome: string;
    receivedWeeklyIncome: string;
    maxCap: string;
    totalInvested: string;
}

export interface UserDetails {
    invested: boolean;
}

export interface RefUserState {
    status?: Status;
    walletAddress: string;
    freezingStatus: boolean;
    RewardMutipler: number;
    userDetails?: UserDetails;
    remainingDays: number;
}

export interface IncomeCardProps {
    icon: string;
    income: string;
    amount: number | string;
    title: string | number;
}

export interface StakeIncomeCardProps {
    icon: string;
    income?: string;
    amount?: number | string;
    info?: string;
    website?: string;
    value?: string;
    copyClass?: string;
    className?: string;
}
  
export interface RefListUserState {
    walletAddress: string;
    Referrallisting: Referral[];
}

export  interface Pagination {
    activePage: number;
    totalItemsCount: number;
    transactionLimit: number;
}

export  interface Referral {
    referree: string;
    partners: number;
    revenue: number;
}

export interface TransactionData {
    transactionHash: string;
    timestamp: string;
    amt: string;
    amount: number;
    event: string;
}

export interface TxState {
    transactionData: TransactionData[];
    txCopyState: boolean;
    startDate: Date | string | null;
    endDate: Date | string | null;
    isTxMounted: boolean;
    pagination: {
        activePage: number;
        totalItemsCount: number;
        transactionLimit: number;
    };
}

export interface TransactionData {
    transactionHash: string;
    timestamp: string;
    amt: string;
    amount: number;
    event: string;
}
  
export type LinkType = {
    icon: JSX.Element;
    text: string;
    link: string;
    disabled?: boolean;
};
  
export type propTypes = {
    active?: boolean;
    handleActive?: any;
};
  
export type SidebarState = {
    showRefModal: boolean;
    isSideMounted: boolean;
};
export interface RewardData {
    level: number | string;
    percent: number | string;
    timestamp: string | number;
    event: string;
}

export  interface RewardChartState {
    isMounted: boolean;
    referralLimits: RewardData[];
    levelLimits: RewardData[];
}

export interface WalletData {
    walletAddress: string;
    depositedAmt: string | number;
    timestamp: string;
    rewardMutipler: string | number;
    withdrawAmt: string | number;
    withdrawPercent: string | number;
  }
export interface OptionType {
    label: string;
    value: number | string;
  }
export interface RewardState {
    selectedLevel: OptionType;
    totalDepositedAmt: string | number;
    totalWithdrawl: string | number;
    allRecord: WalletData[];
    isRewardMounted: boolean;
    pagination: {
      activePage: number | string;
      totalItemsCount: number | string;
      transactionLimit: number | string;
    };
    addressCopyState: boolean;
  }

export interface LevelBreakdownResponse {
    status: number | string;
    data: string[] | [];
    count: number | string;
    error: boolean;
    message: string;
  }

export interface CardData {
    icon: string;
    income: string;
    title: string | number;
  }
export interface StatusResponse {
    totalInvested: string;
    totalRedeemed: string;
  }

export interface UserDetails {
    depositTime?: string;
  }

export interface Wallet {
    walletAddress: string;
  }