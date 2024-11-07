import styles from "../PageNotFound/PagenotFound.module.scss";
import sampleImg from "../../../assets/images/page-not-found.png";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const err: any = useRouteError();
  return (
    <>
      <div className={styles.content}>
        <img src={sampleImg} alt="error" />
        <h2>{err.message}</h2>
      </div>
    </>
  );
};

export default ErrorPage;
