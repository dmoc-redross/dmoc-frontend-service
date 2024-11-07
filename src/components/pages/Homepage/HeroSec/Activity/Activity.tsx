import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon } from "../../../../../assets/icons/svgicons";
import styles from "./Activity.module.scss";
import { LandingPage } from "../../../../Services/api.service";
import { useEffect, useState } from "react";
import { addresFormate, formatNumber } from "../../../../Services/Helper";
import moment from "moment";
import { Explore_URL } from "../../../../../utils/constants";
import { useSelector } from "react-redux";

const Activity = () => {
  // const [activityLevel, setActivityLevel] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [isTxMounted, setIsTxMounted] = useState(false);
  const { recentActivity } = useSelector((state: any) => state?.user);
  const handleLandingPageRecentActivity = async () => {
    try {
      // const res = await LandingPage();
      if (true) {
        // const data = res?.data?.recentDeposits;
        // setActivityLevel(data);
        setIsFetching(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "errorInCaseOfLandingPage");
    } finally {
      setIsFetching(false);
      setLoading(false);
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
      handleLandingPageRecentActivity();
    }
    return cleanup;
  }, [isTxMounted]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style }} onClick={onClick}>
        <StarIcon />
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style }} onClick={onClick}>
        <StarIcon />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    arrows: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          infinite: true,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          infinite: true,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className={styles.activity}>
      <motion.h3
        initial={{ opacity: 0, y: -45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        viewport={{ once: true }}
      >
        Platform Recent Activity
      </motion.h3>
      <AnimatePresence mode="wait">
        {isFetching ||
        recentActivity == undefined ||
        recentActivity == null ||
        recentActivity.length < 0 ||
        recentActivity.length === 0 ? (
          <p className="no_record">No record found</p>
        ) : (
          <Slider {...settings}>
            {recentActivity.map((item: any, index: any) => (
              <div key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={styles.activity__card}
                >
                  <h6>
                    <a
                      href={Explore_URL + item.transactionHash}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p>Txn ID: {addresFormate(item.transactionHash)}</p>
                    </a>
                  </h6>
                  <div
                    className={styles.active_text}
                    title={item.amt ? `${item.amt}` : "0"}
                  >
                    <p>{item.amt ? `${formatNumber(item.amt)} USDT` : "0"}</p>
                    <p className={styles.date}>
                      Active:
                      <span>
                        {item.timestamp
                          ? moment(Number(item.timestamp) * 1000).format(
                              "DD-MM-YYYY"
                            )
                          : ""}
                      </span>
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Activity;
