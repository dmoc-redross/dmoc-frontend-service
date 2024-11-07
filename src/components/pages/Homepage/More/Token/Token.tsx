import { Col, Container, Row } from "react-bootstrap";
// import token_img from "../../../../../assets/images/token_img.png";
// @ts-ignore
import token from "../../../../../assets/animations/token.json";
import styles from "./Token.module.scss";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Button } from "../../../../common";
import {
  auditReportPdf,
  bussinessPlanPdf,
  whitePaperPdf,
} from "../../../../../utils/constants";

const Token = () => {
  const handleClick = (type: number) => {
    const urlMap: { [key: number]: string } = {
      1: whitePaperPdf,
      2: bussinessPlanPdf,
      3: auditReportPdf,
    };
    const url = urlMap[type];
    if (url) {
      window.open(url, "_blank");
    }
  };
  return (
    <section className={styles.token_sec}>
      <Container>
        <Row>
          <Col md={5}>
            <div className={styles.token_sec_left}>
              <Lottie animationData={token} loop={true} />
              {/* <img src={token_img} alt="token-img" /> */}
            </div>
          </Col>
          <Col md={7}>
            <div className={styles.token_sec_right}>
              <motion.h2
                initial={{ opacity: 0, y: -45 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className={styles.token_sec_left}
              >
                Sky Marvel Token
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -45 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              >
                The Sky Marvel token is a BEP-20 crypto token that serves not
                only as a medium of exchange but also as an innovative solution
                to overcome challenges within the affiliate marketing industry.
                Adhering to the BEP-20 token standard, the Sky Marvel token
                incorporates advanced features to address transparency concerns,
                instill trust, and facilitate efficient transactions. The
                token's inclusivity extends globally, with a key objective of
                creating employment opportunities for all. As the marketing
                landscape continues to evolve, the Sky Marvel token will emerge
                as a promising force, reshaping the future of transactions in
                the marketing industry.
              </motion.p>
              <div className={styles.token_btns}>
                <Button text="Whitepaper" onClick={() => handleClick(1)} />
                <Button
                  text="Business plan"
                  className={`ms-4 ${styles.borderbtn}`}
                  onClick={() => handleClick(2)}
                />
                <Button
                  text="Security audit report"
                  className={styles.borderbtn}
                  onClick={() => handleClick(3)}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Token;
