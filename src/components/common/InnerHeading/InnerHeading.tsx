import { ReactNode } from "react";
import Button from "../Button/Button";
import Datepicker from "../Datepicker/Datepicker";
import styles from "./InnerHeading.module.scss";

type propTypes = {
  className?: string;
  title?: string | ReactNode;
  datepicker?: string | ReactNode;
  BtnText?: string;
  onClick?: () => void;
};

const InnerHeading = (props: propTypes) => {
  return (
    <div className={`${styles.main_heading}`}>
      <h4 className={`${styles.title} ${props.className || ""}`}>
        {props.title}
      </h4>
      <div className={styles.main_heading_right}>
        {props.datepicker && <Datepicker />}
        {props.BtnText && (
          <Button
            text={props.BtnText}
            className={styles.right_btn}
            onClick={props.onClick}
          />
        )}
      </div>
    </div>
  );
};

export default InnerHeading;
