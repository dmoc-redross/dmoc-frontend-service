export const ROUTES = {
  HOME: "/",
  HOME_REFERRAL: "/:id",
  DASHBOARD: "/auth/dashboard",
  DASHBOARD_REFERRAL: "/auth/dashboard/:id",
  AUCTIONS: "/auth/auctions",
  REFERRAL_LIST: "/auth/referral-list",
  FUNDS: "/auth/funds",
  REFERRAL: "/auth/funds/:id",
  TRANSACTION: "/auth/transaction",
  ADMIN: "/auth/admin",
  USERMANAGEMENT: "/auth/admin/user-management",
  PACKAGEMANAGEMENT: "/auth/admin/package-management",
  SOCIALMEDIA: "/auth/admin/social-media",
  REWARDS: "/auth/admin/rewards",
  LIQUIDITY: "/auth/admin/liquidity",
  REWARDSlIST: "/auth/rewards-tree",
  REWARDCHART: "/auth/reward-chart",
};

export const SKY_CONTRACT: string | undefined =
  process.env.REACT_APP_SKY_CONTRACT;
export const USDT_TOKEN_CONTRACT: string | undefined =
  process.env.REACT_APP_USDT_TOKEN_CONTRACT;
export const SKY_TOKEN_CONTRACT: string | undefined =
  process.env.REACT_APP_SKY_TOKEN_CONTRACT;

export const WALLET_TYPE = {
  METAMASK: "Metamask",
  WALLET_CONNECT: "Wallet Connect",
};

export const DAPP_URL_METAMASK: string | undefined =
  process.env.REACT_APP_DAPP_URL_METAMASK;
export const CHAIN_ID_DEFAULT: string | undefined | number =
  process.env.REACT_APP_CHAIN_ID;

export const projectId: string | undefined | any =
  "d37536d39542f641a2d91b0a68988af4";

export const metadata = {
  name: "skyMarvel",
  description: "skyMarvel WalletConnect",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const NETWORKS: any = [
  {
    symbol: process.env.REACT_APP_SYMBOL,
    value: process.env.REACT_APP_VALUE,
    label: process.env.REACT_APP_LABEL,
    chainId: process.env.REACT_APP_CHAIN_ID,
    chainidHex: process.env.REACT_APP_CHAIN_HEX,
    rpc: process.env.REACT_APP_RPC_URL,
    explorerUrl: process.env.REACT_APP_EXPLORER_URL,
    decimals: 18,
  },
];

export const RESPONSES: any = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NOCONTENT: 204,
  BADREQUEST: 400,
  UN_AUTHORIZED: 401,
  INVALID_REQ: 422,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  TIMEOUT: 408,
  TOOMANYREQ: 429,
  INTERNALSERVER: 500,
  BADGATEWAYS: 502,
  SERVICEUNAVILABLE: 503,
  GATEWAYTIMEOUT: 504,
};

export const API_HOST: string | undefined = process.env.REACT_APP_API_HOST;
// export const API_HOST = "http://172.16.15.228:8000/"

export const Explore_URL: string | undefined | any =
  process.env.REACT_APP_EXPLORER_URL;

export const EXPLORER_ADDRESS = process.env.REACT_APP_EXPLORER_ADDRESS;

export const APIURL = {
  GET_REFER_DETAIL: "profiles/checkUser",
  GET_REFER_LINK: "profiles/UserPortfolio",
  GET_PACKAGE: "profiles/package",
  GET_TRANSACTION_HISTORY: "profiles/transactionHistory",
  GET_REFERRAL_LIST: "profiles/referreeList",
  GET_SOCIAL_LINK: "admin/AddLink",
  GET_GOLBAL_LINK: "admin/getLink",
  GET_LANDING_PAGE: "dashboard/landingPageData",
  Get_LEADER_BOARD: "dashboard/leaderBoardData",
  LEVEL_BREAKDOWN: "profiles/levelBreakdown",
  GET_REWARD_MANGEMENT: "admin/rewardManagement",
};

export const MAX_LIMIT: string = "0xfffffffffffffffffffffffffffffffffffffffff";

export const ADMIN_WALLET_ADDRESS: string | any =
  process.env.REACT_APP_ADMIN_WALLET_ADDRESS;

export const BURNING_ADDRESS: string | any =
  process.env.REACT_APP_BURNING_ADDRESS;

export const itemsCountPerPage: any = process.env.REACT_APP_PAGE_LIMIT;

export const packageMangement_page_limit: any | string =
  process.env.REACT_APP_PACAKAGEMANAGEMAT_PAGE_LIMIT;
export const daily_timer: any = process.env.REACT_APP_DAILY_TIME;
export const weekly_timer: any = process.env.REACT_APP_WEEKLY_TIME;
export const days: any = process.env.REACT_APP_DAYS;
export const PROGRESS_BAR: any = process.env.REACT_APP_PROGRESS_BAR;
export const zeroAddress: any = process.env.REACT_APP_ZERO_ADDRESS;
export const whitePaperPdf: string =
  "https://document.skymarvel.io/Sky.pdf";
export const auditReportPdf: string =
  "https://document.skymarvel.io/Audit.pdf";

export const bussinessPlanPdf: string =
  "https://document.skymarvel.io/DOC-20240906-WA0003.pdf";

export const REF_LINK_REGEX = /^(https:\/\/)?(earn|stage|uat)\.skymarvel\.io\/auth\/funds\/[a-zA-Z0-9]{24}$/;