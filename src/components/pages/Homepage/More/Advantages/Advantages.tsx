import Slider from "react-slick";
import styles from "./Advantages.module.scss";
import TitlteText from "../../../../common/TitleText/TitlteText";
import {
  AssetIcon,
  EmployementIcon,
  InvestmentIcon,
  WithdrawIcon,
} from "../../../../../assets/icons/svgicons";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

const activityData = [
  {
    title: "Self-Employment Opportunity",
    text: "Explore the potential for self-employment through your investment",
    icon: <EmployementIcon />,
    delay: 0.2,
  },
  {
    title: "Increasing Asset Value",
    text: "Witness a gradual increase in the value of your assets over time.",
    icon: <AssetIcon />,
    delay: 0.4,
  },
  {
    title: "Enhanced Return on Investments (ROI)",
    text: "Expect a minimum of a two-fold increase in return on investments compared to the initial investment.",
    icon: <InvestmentIcon />,
    delay: 0.6,
  },
  {
    title: "Flexible Withdrawal Options",
    text: "Enjoy the flexibility to withdraw your funds at any point in time.",
    icon: <WithdrawIcon />,
    delay: 0.8,
  },
];

const Advantages = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
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
    <section className={styles.advantage}>
      <Container>
        <TitlteText title="Advantages" />
        <Slider {...settings}>
          {activityData.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: item.delay }}
              viewport={{ once: true }}
              key={index}
            >
              <div className={styles.advantage__card}>
                <div className={styles.advantage__card__top}>
                  <span>{item.icon}</span>
                  <h5>{item.title}</h5>
                </div>
                <p>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default Advantages;
