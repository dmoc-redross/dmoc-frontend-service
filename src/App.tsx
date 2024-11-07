import { Toaster } from "react-hot-toast";
import Application from "./Application";
import Loader from "./components/common/Loader/Loader";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { DAPP_URL_METAMASK, NETWORKS, projectId } from "./utils/constants";

const BSC = {
  chainId: NETWORKS[0]?.chainId,
  name: NETWORKS[0]?.value,
  currency: NETWORKS[0]?.value,
  explorerUrl: NETWORKS[0]?.explorerUrl,
  rpcUrl: NETWORKS[0]?.rpc,
};

// 3. Create modal
const metadata: any = {
  name: "Sky Marvel",
  description: "Sky Marvel",
  url: DAPP_URL_METAMASK,
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  includeWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
  ],
  ethersConfig: defaultConfig({
    metadata,
    defaultChainId: NETWORKS[0]?.chainId,
    enableEIP6963: true,
    enableInjected: false,
  }),
  chains: [BSC],
  projectId,
});

function App() {
  return (
    <>
      <Loader />
      <Application />
      <Toaster containerClassName="toaster" />
    </>
  );
}

export default App;
