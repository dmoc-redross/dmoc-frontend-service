import styles from "./ReferAndEarn.module.scss";
import refer_earn_img from "../../../../../assets/images/refer_earn_img.png";
import { CopyElement } from "../../../../common";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/types";

const ReferAndEarn = () => {
  const { userPortfolio } = useSelector((state: RootState) => state?.user);

  return (
    <div className={`common-card ${styles.refer}`}>
      <div className={styles.refer__img}>
        <img src={refer_earn_img} alt="refer-earn-img" />
      </div>
      <div className={styles.refer__content}>
        <h4>Refer and Earn</h4>
        <CopyElement text={userPortfolio?.referralLink == undefined ? "" : userPortfolio?.referralLink} value="Refer and Earn"/>
      </div>
    </div>
  );
};

export default ReferAndEarn;
