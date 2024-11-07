import { ReactNode } from "react";
import styles from "./TitleText.module.scss";
import { motion } from "framer-motion";


type propTypes = {
  className?: string;
  title?: string | ReactNode;
  Icon?: string;
};

const TitlteText = (props: propTypes) => {
  return (
    <>
      <motion.h4
        initial={{ opacity: 0, y: -45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className={`${styles.title} ${props.className || ""}`}
      >
        {props.title}
        {props.Icon && <span><img src={props.Icon} alt="icon"/></span>}
      </motion.h4>
    </>
  );
};

export default TitlteText;
