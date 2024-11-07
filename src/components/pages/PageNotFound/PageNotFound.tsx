import styles from "./PagenotFound.module.scss";
import sampleImg from "../../../assets/images/page-not-found.png";

const PageNotFound = () => {
  return (
    <div className={styles.content}>
      <img src={sampleImg} alt="error" />
      <h2>Page Not Found</h2>
    </div>
  );
};

export default PageNotFound;
