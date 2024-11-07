import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import logo from "../../../assets/logo/logo.svg";
import { ROUTES } from "../../../utils/constants";
import ConnectWallet from "../../common/ConnectWallet/ConnectWallet";
import styles from "./Homelayout.module.scss";
import { HomeFooter } from "../../common";

const Homelayout = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 10);
    });
  }, []);
  return (
    <>
      <main className={styles.home_layout}>
        <header
          className={`${styles.header} ${
            scroll ? styles.header__scrolled : ""
          }`}
        >
          <Container>
            <div className={styles.header_in}>
              <Link className="logo" to={ROUTES.HOME}>
                <img src={logo} alt="logo" />
              </Link>
              <ConnectWallet />
            </div>
          </Container>
        </header>
        <Outlet />
      </main>
      <HomeFooter />
    </>
  );
};

export default Homelayout;
