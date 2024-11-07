import Deposit from "./Components/Deposit/Deposit";
import ReferAndEarn from "./Components/ReferAndEarn/ReferAndEarn";
import Withdraw from "./Components/Withdraw/Withdraw";
import nft_img from "../../../assets/images/nft_img.svg";
import styles from "./Funds.module.scss";

function Funds() {
  
  return (
    <>
      <div className={styles.funds}>
        <div className={styles.funds_top}>
          <div className={styles.funds_top_left}>
            <Deposit />
          </div>
          <div className={styles.funds_top_mid}>
            <ReferAndEarn />
          </div>
          {/* <div className={styles.funds_top_right}> */}
          <div className={styles.funds_nftImg}>
            <img src={nft_img} alt="nft-img" />
          </div>
          {/* </div> */}
        </div>
        <Withdraw />
      </div>
    </>
  );
}

export default Funds;
