import { EXPLORER_ADDRESS } from "../../../../../utils/constants";
import { addresFormate } from "../../../../Services/Helper";
import styles from "./WalletCard.module.scss";

const WalletCard = ({ heading, address }: any) => {
  return (
    <div className={styles.walletCard}>
      <h3>{heading}</h3>
      <div className={styles.wallet_address}>
        {address ? (
          <a href={EXPLORER_ADDRESS + address} target="_blank">
            {addresFormate(address)}
          </a>
        ) : (
          "Admin wallet address not found"
        )}
        {/* <span>
          <WalletIcon />
        </span> */}
      </div>
    </div>
  );
};

export default WalletCard;
