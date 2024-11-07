import { Container } from "react-bootstrap";
import Footer from "../Footer/Footer";
import Button from "../Button/Button";
import SocialLinks from "../SocialLinks/SocialLinks";
import styles from "./HomeFooter.module.scss";
import { WALLET_TYPE } from "../../../utils/constants";
import { walletType } from "../../../redux/features/reducers/user.slice";
import { useDispatch } from "react-redux";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { useState } from "react";

const HomeFooter = () => {
  const { open, close } = useWeb3Modal();

  const dispatch: any = useDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const walletsConnect = async (wallet: string) => {
    dispatch(walletType(wallet));
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 1000);
    try {
      await open();
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <section className={styles.home_footer}>
      <Container>
        <div className={styles.home_footer_layout}>
          <div className={styles.home_footer_left}>
            <h2>Get Started Today</h2>
            <p>
              Begin your journey today with a user-friendly platform and enjoy
              daily rewards.
            </p>
            <Button
              text="Invest Now"
              onClick={() => {
                walletsConnect(WALLET_TYPE.WALLET_CONNECT);
              }}
              className="invest-btn"
              disabled={isButtonDisabled}
            />
          </div>
          <div className={styles.home_footer_right}>
            <SocialLinks className={styles.footer_links} />
          </div>
        </div>
        <Footer />
      </Container>
    </section>
  );
};

export default HomeFooter;
