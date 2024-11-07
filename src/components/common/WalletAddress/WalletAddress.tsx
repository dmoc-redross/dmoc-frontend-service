import { useSelector } from "react-redux";
import wallet_icon from "../../../assets/icons/wallet_icon.png";
import styles from "./WalletAddress.module.scss";
import { RootState } from "../../../redux/types";
import { addresFormate } from "../../Services/Helper";
import { EXPLORER_ADDRESS } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import { useEffect } from "react";

const WalletAddress = ({
  inner,
  className,
  Adminkey,
}: {
  inner?: boolean;
  className?: string;
  Adminkey?: string | number;
}) => {
  const navigate = useNavigate();

  const walletAddress: string | null | undefined = useSelector(
    (state: RootState) => state?.user?.walletAddress
  );

  useEffect(() => {
    if (!walletAddress) navigate(ROUTES.HOME);
  }, [walletAddress]);
  
  return (
    <>
      <div
        className={`${styles.wallet_add} ${className ? className : ""} ${
          inner ? styles.wallet_add__inner : ""
        }`}
      >
        {inner && (
          <div className={`wallet-icon ${styles.wallet_add__icon}`}>
            <img src={wallet_icon} alt="wallet-icon" />
          </div>
        )}

        {Adminkey == "1" ? (
          <a>
            <div className={styles.wallet_add__addr}>
              <h6>
                <strong></strong>
              </h6>
            </div>
          </a>
        ) : (
          <a href={EXPLORER_ADDRESS + walletAddress} target="_blank">
            <div className={styles.wallet_add__addr}>
              <h6>
                Wallet Address{inner ? "" : ": "}
                <strong>
                  {walletAddress ? addresFormate(walletAddress) : null}
                </strong>
              </h6>
            </div>
          </a>
        )}
      </div>
    </>
  );
};

export default WalletAddress;
