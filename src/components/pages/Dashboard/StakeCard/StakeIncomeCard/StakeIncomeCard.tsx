import styles from "./StakeIncomeCard.module.scss";
import { CopyElement } from "../../../../common";
import {
  formatNumber,
  toCustomFixed,
  usdtValueConvert,
} from "../../../../Services/Helper";
import { StakeIncomeCardProps } from "../../../../Services/Interfaces";

const StakeIncomeCard : React.FC<StakeIncomeCardProps> = (props: StakeIncomeCardProps) => {
  const { icon,income, amount, info, website, value, copyClass, className} = props;
  return (
    <div className={`${styles.skymarvel_inner} ${className || ""}`}>
      <div className={styles.skymarvel_inner_img}>
        <img src={icon} alt="icon-bg" />
      </div>
      {income && (
        <div className={styles.skymarvel_inner_content}>
          <p>{income}</p>
          <h4
            title={
              amount == undefined ? "0" : usdtValueConvert(amount)
            }
          >
            {amount == undefined
              ? "0"
              : formatNumber(
                toCustomFixed(usdtValueConvert(amount), 2)
              ) == "NaN"
                ? "0"
                : formatNumber(toCustomFixed(usdtValueConvert(amount), 2))}
            <span> {info}</span>
          </h4>
        </div>
      )}

      {value && (
        <div className={styles.skymarvel_inner_webinfo}>
          <p>{value} </p>
          <CopyElement text={website} className={copyClass} value={value}/>
        </div>
      )}
    </div>
  );
};

export default StakeIncomeCard;
