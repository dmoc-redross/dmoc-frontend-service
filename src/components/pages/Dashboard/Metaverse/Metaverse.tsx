import styles from "./Metaverse.module.scss";
import metaverseImg from "../../../../assets/images/Issuer-Dashboard.png";

const Metaverse = () => {
  return (
    <>
      <div className={styles.metaverse_wrap}>
        <img src={metaverseImg} alt="mataverse-img" />
      </div>
    </>
  );
};

export default Metaverse;
