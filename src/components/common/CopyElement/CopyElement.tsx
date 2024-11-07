import { useState } from "react";
import { CopyIcon } from "../../../assets/icons/svgicons";
import styles from "./CopyElement.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/types";
import toast from "react-hot-toast";
import { addresFormate } from "../../Services/Helper";

const CopyElement = ({
  text,
  className,
  value
}: {
  text?: string | number | any;
  className?: string;
  value?: string;
}) => {
  const [referralCopy, setReferralCopy] = useState<boolean>(false);
  const { userPortfolio }: any = useSelector(
    (state: RootState) => state?.user
  );

  const referralCopyClipBoard = () => {
    setTimeout(() => {
      setReferralCopy(true);
      toast.success("Copied");
    }, 100);
    setTimeout(() => {
      setReferralCopy(false);
    }, 3000);
  };

  return (
    <div className={`${styles.copy_element} ${className ? className : ""}`}>
      {text ? addresFormate(text) : ""}

      {userPortfolio?.referralLink && (value == "My Referral Link" || value == "Refer and Earn") ? (
        <CopyToClipboard text={text} onCopy={referralCopyClipBoard}>
          <button disabled={referralCopy}>            
            <span className={styles.copy_element_btn}>
              <CopyIcon />
            </span>
          </button>
        </CopyToClipboard>
      ) : (value == "My Referral Link" || value == "Refer and Earn") ? (
        <button disabled={true}>
          <span className={`${styles.copy_element_btndisabled} ${styles.copy_element_btn}`}>
            <CopyIcon />
          </span>
        </button>
      ) : null }
    </div>
  );
};

export default CopyElement;