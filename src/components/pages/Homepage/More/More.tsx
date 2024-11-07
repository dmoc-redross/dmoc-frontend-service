import Advantages from "./Advantages/Advantages";
import Faq from "./Faq/Faq";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import styles from "./More.module.scss";
import Token from "./Token/Token";

const More = () => {
  return (
    <div className={styles.moreSec}>
      <Token />
      <Advantages />
      <Faq />
      <LeaderBoard />
    </div>
  );
};

export default More;
