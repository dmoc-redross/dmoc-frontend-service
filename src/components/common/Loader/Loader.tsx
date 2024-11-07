import styles from "./Loader.module.scss";
import { useSelector } from "react-redux";
import token from '../../../assets/animations/token.json'
import Lottie from "lottie-react";

const Loader = () => {
  const { loading } = useSelector((state: any) => state.loading);
  if (loading) {
    return (
      <>
        <div className={styles.loader}>
          {/* <div className={styles.loader__spinner}> */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            {/* <img src={logo_loder} alt="loader"/> */}
            <Lottie animationData={token} loop={true} data-testid='lottie-loader'/>
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default Loader;
