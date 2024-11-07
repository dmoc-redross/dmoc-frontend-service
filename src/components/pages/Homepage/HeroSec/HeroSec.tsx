import { Container, Row, Col } from "react-bootstrap";
import Lottie from "lottie-react";
import {
  DistributionIcon,
  IncomeIcon,
  MemberIcon,
  StarIcon,
} from "../../../../assets/icons/svgicons";
import Activity from "./Activity/Activity";
import { Sky } from "../../../../assets/animations/animations";
import { motion } from "framer-motion";
// @ts-ignore
import hero_sec_bg from "../../../../assets/video/hero_sec_bg.mp4";
import hero_bg from "../../../../assets/images/phone-view.jpg";
import { MainCard } from "../../../common";

import styles from "./HeroSec.module.scss";
import { Dispatch, useEffect, useState } from "react";
import { LandingPage } from "../../../Services/api.service";
import {
  saveActivityData,
  setGlobalSkyPrice,
  setPendingSupply,
  settotalBurn,
  settotalMembers,
} from "../../../../redux/features/reducers/user.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  getFixedValue,
  skyValueConvert,
  toCustomFixed,
} from "../../../Services/Helper";
import WalletCard from "./WalletCard/WalletCard";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import {
  initialSkyTotalSupplyFunction,
  skyPricee,
  skyTokenTotalSupplyFunction,
} from "../../../Services/CallContract";
import {
  BURNING_ADDRESS,
  SKY_CONTRACT,
  SKY_TOKEN_CONTRACT,
} from "../../../../utils/constants";
import { RootState } from "../../../../redux/types";

const HeroSec = () => {
  const { totalburn, pendingSupply, totalMembers }: any = useSelector(
    (state: RootState) => state?.user
  );
  const [isTxMounted, setIsTxMounted] = useState(false);
  const { walletProvider } = useWeb3ModalProvider();
  const [initialPrice, setInitialPrice] = useState<string | undefined>("");
  const [skyPrice, setSkyPrice] = useState<string | number>();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const billion: any = 2300000000;

  const mainData = [
    {
      icon: <MemberIcon />,
      title: "Total Members",
      subTitle: totalMembers ? totalMembers : "0",
      delay: 0.5,
    },
    {
      icon: <IncomeIcon />,
      title: "Total Supply",
      // subTitle: PlatformTotalSuppy,
      subTitle: billion && getFixedValue(billion),
      pendingtitle: "Pending Supply",
      pendingsubTitle: pendingSupply ? getFixedValue(pendingSupply) : "0",
        // pendingSupply && pendingFormatNumber(Number(pendingSupply))?.toString(),
      delay: 1.4,
    },
    {
      icon: <DistributionIcon />,
      title: "Total Burn 🔥",
      titletext: "textcolor",
      subTitle: totalburn ? getFixedValue(totalburn) : "0",
      // totalburn ? formatNumber(Number(totalburn)) : "0",
      delay: 1,
    },
  ];

  const dispatch: Dispatch<any> = useDispatch();

  const handleLandingPage = async () => {
    try {
      const res = await LandingPage();
      dispatch(saveActivityData(res?.data));
      const initialSkyTotalSupply = await initialSkyTotalSupplyFunction(
        walletProvider
      );
      const convertedInitialSkyTotalSupply: any = skyValueConvert(
        initialSkyTotalSupply
      );

      const tokenTotalSupply = await skyTokenTotalSupplyFunction(
        walletProvider
      );
      const convertedTokenTotalSupply = skyValueConvert(tokenTotalSupply);

      const totalBurn =
        Number(convertedInitialSkyTotalSupply) -
        Number(convertedTokenTotalSupply);

      dispatch(setPendingSupply(convertedTokenTotalSupply));
      dispatch(settotalBurn(totalBurn));

      if (res) {
        // dispatch(settotalInvestment(data?.totalInvestment));
        dispatch(settotalMembers(res?.count));
      }
    } catch (error) {
      console.log(error, "errorInCaseOfLandingPage");
    }
  };

  const getSkyPrice = async () => {
    let initialprice = "0.00280112";
    setInitialPrice(initialprice);
    setIsFetching(true);

    try {
      const skyPrice = await skyPricee(walletProvider);
      let price = (1 / Number(skyPrice)) * 1000;
      if (price) {
        dispatch(setGlobalSkyPrice(skyPrice));
        setSkyPrice(price);
      }
    } catch (error) {
      console.error("Error fetching SkyPrice:", error);
      setSkyPrice("Error fetching price");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const cleanup = () => {
      isMounted = false;
    };

    if (!isTxMounted) {
      setIsTxMounted(true);
      return cleanup;
    }
    if (isMounted) {
      handleLandingPage();
      getSkyPrice();
    }
    return cleanup;
  }, [isTxMounted]);

  const walletData = [
    {
      heading: "Token Address",
      address: SKY_TOKEN_CONTRACT,
      delay: 0.5,
      addre: SKY_TOKEN_CONTRACT,
    },
    {
      heading: "Contract Address",
      address: SKY_CONTRACT,
      delay: 1,
      addre: SKY_CONTRACT,
    },
    {
      heading: "Burning Address",
      address: BURNING_ADDRESS,
      delay: 1,
      addre: BURNING_ADDRESS,
    },
  ];

  return (
    <section className={styles.homepage}>
      <video
        loop={true}
        autoPlay
        playsInline={true}
        muted
        preload="none"
        className={styles.homepage__video}
        poster={hero_bg}
      >
        <source src={hero_sec_bg} type="video/mp4" />
        {/* <source src="https://firebasestorage.googleapis.com/v0/b/learn-auth-eef07.appspot.com/o/video%2Fhero_sec_bg.mp4?alt=media&token=23eabda6-3d97-485d-a7b4-691d12bf3fd6" type="video/mp4" /> */}
      </video>
      <div className={styles.homepage__rocket}>
        <Lottie animationData={Sky} loop={false} />
      </div>
      <Container className={styles.homepage__cont}>
        <Row>
          <Col lg={7}>
            <div className={styles.heroContent}>
              <div className={styles.heroContent__top}>
                <motion.h4
                  initial={{ opacity: 0, y: -45 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  We started at{" "}
                  <span
                    className="text-secondary"
                    title={toCustomFixed(initialPrice, 8)}
                  >
                    {" "}
                    ${initialPrice ? toCustomFixed(initialPrice, 5) : "0"}
                  </span>{" "}
                  sky and now we are at{" "}
                  {isFetching ? (
                    <span>loading...</span>
                  ) : (
                    <span
                      className="text-secondary"
                      title={toCustomFixed(skyPrice?.toString(), 8)}
                    >
                      ${skyPrice ? toCustomFixed(skyPrice, 5) : 0}
                    </span>
                  )}{" "}
                  sky
                </motion.h4>
              </div>
              <div className={styles.heroContent__middle}>
                <div className={styles.heroContent__middle__heading}>
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    Welcome to{" "}
                    <span className="text-secondary">SKY MARVEL</span>{" "}
                    <small>
                      <StarIcon />
                    </small>
                  </motion.h1>
                </div>
              </div>
              <Row className="justify-content-center">
                {mainData &&
                  mainData?.map((item, index) => (
                    <Col xs={12} sm={6} xl={4} key={index}>
                      <motion.div
                        initial={{ opacity: 0, y: -45 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: item.delay }}
                      >
                        <MainCard
                          icon={item.icon}
                          className="h-100"
                          title={item.title}
                          subTitle={item.subTitle}
                          pendingtitle={item.pendingtitle}
                          pendingsubTitle={item.pendingsubTitle}
                          billion={billion}
                          titletext={item.titletext}
                        />
                      </motion.div>
                    </Col>
                  ))}
              </Row>
              <Row className={styles.walletadd_card}>
                {walletData.map((item, index) => (
                  <Col sm={4} xl={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: -45 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: item.delay }}
                      className="h-100"
                    >
                      <WalletCard
                        heading={item?.heading}
                        address={item?.address}
                      />
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Activity />
      </Container>
    </section>
  );
};

export default HeroSec;
