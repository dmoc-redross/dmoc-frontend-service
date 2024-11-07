import { useSelector } from "react-redux";
import { InfoIcon, RefreshIcon } from "../../../assets/icons/svgicons";
import { RootState } from "../../../redux/types";
import {
  formatNumber,
  futureValueConvert,
  toCustomFixed,
  usdtValueConvert,
} from "../../Services/Helper";
import CustomTooltip from "../Tooltip/CustomTooltip";
import styles from "./WithdrawHeading.module.scss";

const WithdrawHeading = ({
  title,
  amount,
  tooltipMsg,
  handleRefresh
}: {
  title?: string;
  amount?: string | number;
  tooltipMsg?: string | number;
  handleRefresh: any;
}) => {
  
  const { globalSkyPrice } = useSelector((state: RootState) => state?.user);

  return (
    <div className={styles.withdraw_heading}>
      <div className={styles.withdraw_heading_head}>
        <h5>
          {title}{" "}
          {tooltipMsg && (
            <CustomTooltip content={tooltipMsg}>
              <InfoIcon />
            </CustomTooltip>
          )}
            <span className={styles.refresh_btn}
                  onClick={handleRefresh}><RefreshIcon /></span>
        </h5>
      </div>
      {title == "Future Golden Duck" && (
        <div className={styles.global_sky_price}>
          <>Sky per USDT:</>
          <p
            title={((globalSkyPrice) / 1000)?.toString()}
          >
            {globalSkyPrice
              ? toCustomFixed(Number(globalSkyPrice / 1000), 5)?.toString()
              : "0"}{" "}
            Sky
          </p>
        </div>
      )}
      <h5
        title={
          title == "Future Golden Duck"
            ? !amount || amount == "NaN" || amount == undefined
              ? "0"
              : 
                (Number(amount) * Number(globalSkyPrice / 1000))?.toString()
            : amount
              ? usdtValueConvert(amount)
              : "0"
        }
        className="text-secondary"
      >
        {title == "Future Golden Duck"
          ? amount != 0 && amount != "NaN" && amount != undefined
            ? `${toCustomFixed(
              // futureValueConvert(Number(amount) * Number(globalSkyPrice)),
              (Number(amount) * Number(globalSkyPrice / 1000)),
              2
            )} Sky`
            : "0 Sky"
          : `$${amount
            ? formatNumber(toCustomFixed(usdtValueConvert(amount), 2))
            : "0"
          }`}
      </h5>
    </div>
  );
};

export default WithdrawHeading;
