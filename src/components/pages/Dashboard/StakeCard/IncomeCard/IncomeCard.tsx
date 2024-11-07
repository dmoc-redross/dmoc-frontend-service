import styles from "./IncomeCard.module.scss";
import {
  extractFirstAndLastDigit,
  formatNumber,
  formattNumber,
  toCustomFixed,
  usdtValueConvert,
} from "../../../../Services/Helper";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/types";

const IncomeCard: any = (props: any) => {
  const { globalSkyPrice } : {globalSkyPrice : number | string} = useSelector((state: RootState) => state?.user);
  const { icon, amount, income, title} = props;
  let dollarWorth = (1 / Number(globalSkyPrice)) * 1000;

  const formatTitle = () => {
    switch (income) {
      case "Future Golden Duck Income":
        return !amount
          ? "0"
          // : futureValueConvert(Number(amount) * Number(globalSkyPrice))?.toString();
          : amount
      case "My Team":
        return amount;
      case "Withdrawn":
      case "Deposit":
        return title ? title : "0";
      default:
        return usdtValueConvert(amount);
    }
  };

  const formatAmount = () => {
    switch (income) {
      case "Future Golden Duck Income":
        return !amount
          ? "0"
          // : toCustomFixed(
          //     futureValueConvert(Number(amount) * Number(globalSkyPrice)),
          //     2
          //   );
          : toCustomFixed(amount, 2)
      case "My Team":
        return amount;
      case "Withdrawn":
      case "Deposit":
        return `$${title ? toCustomFixed(title, 2) : "0"}`;
      default:
        return formatNumber(toCustomFixed(usdtValueConvert(amount), 2));
    }
  };

  return (
    <>
      <div className={styles.card_box}>
        <div className={styles.card_box_wrap}>
          <div className={styles.card_box_wrap_img}>
            <img src={icon} alt="icon-bg" />
          </div>
          <div className={styles.card_box_wrap_content}>
            <p>{income}</p>
            <h4 title={formatTitle()}>{formatAmount()}
            {props.income == "Future Golden Duck Income" && <span title={dollarWorth.toString() == 'Infinity' ? '0' : `$${dollarWorth?.toString()}`}>(${dollarWorth?.toString() == 'Infinity' ? '0' : extractFirstAndLastDigit(dollarWorth)})</span>}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default IncomeCard;
