import styles from "./Referral.module.scss";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  formatNumber,
  toCustomFixed,
  usdtValueConvert,
} from "../../../Services/Helper";
import src from "../../../../assets/images/circle-img.png";
import { Dispatch, useCallback, useEffect } from "react";
import Lottie from "lottie-react";
import dotAnimation from "../../../../assets/animations/animation.json";
import { motion } from "framer-motion";
import block_icon from "../../../../assets/images/block-icon.svg";
import { GetRewardLimit } from "../../../Services/CallContract";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { setRewardMutipler } from "../../../../redux/features/reducers/user.slice";
import { days } from "../../../../utils/constants";
import { RootState } from "../../../../redux/types";
import { RefUserState } from "../../../Services/Interfaces";

function Referral() {
  const {
    status,
    walletAddress,
    freezingStatus,
    RewardMutipler,
    userDetails,
    remainingDays,
  }: RefUserState = useSelector((state: RootState) => state?.user);

  const dispatch: Dispatch<any> = useDispatch();
  const { walletProvider } = useWeb3ModalProvider();

  const totalRewards: number =
    Number(status?.receivedDailyIncome) + Number(status?.receivedWeeklyIncome);

  const remainingRewards: Number =
    Number(status?.maxCap) - Number(totalRewards);

  const handleRewardLimit = async () => {
    try {
      const RewardMutipler = await GetRewardLimit(walletProvider);
      dispatch(setRewardMutipler(Number(RewardMutipler) / 100));
    } catch (error) {
      console.log(error, "reward limit");
    }
  };

  const memoizedHandleRewardLimit = useCallback(() => {
    handleRewardLimit();
  }, [walletAddress]);

  useEffect(() => {
    memoizedHandleRewardLimit();
  }, [memoizedHandleRewardLimit]);

  return (
    <>
      {(freezingStatus == false &&
        usdtValueConvert(status?.totalInvested) > 0 &&
        userDetails?.invested == true) ||
      (usdtValueConvert(status?.totalInvested) == 0 &&
        userDetails?.invested == false) ? (
        <div className={styles.referral_wrap}>
          <div className={styles.graph}>
            <div className="circle_in">
              <div className="circle_text">
                <CircularProgressbarWithChildren
                  value={
                    (100 -
                      Number(
                        usdtValueConvert(totalRewards) /
                          usdtValueConvert(Number(status?.maxCap))
                      ) *
                        100 ===
                    0
                      ? 100
                      : 100 -
                        Number(
                          usdtValueConvert(totalRewards) /
                            usdtValueConvert(Number(status?.maxCap))
                        ) *
                          100) || 0
                  }
                  maxValue={101}
                  styles={{
                    path: {
                      stroke:
                        100 -
                          Number(
                            usdtValueConvert(totalRewards) /
                              usdtValueConvert(Number(status?.maxCap))
                          ) *
                            100 <=
                          10 ||
                        100 -
                          Number(
                            usdtValueConvert(totalRewards) /
                              usdtValueConvert(Number(status?.maxCap))
                          ) *
                            100 ==
                          0
                          ? "red"
                          : 100 -
                              Number(
                                usdtValueConvert(totalRewards) /
                                  usdtValueConvert(Number(status?.maxCap))
                              ) *
                                100 <=
                            30
                          ? "#FF8C00"
                          : "#f5da76",
                    },
                  }}
                  strokeWidth={6}
                  backgroundPadding={5}
                >
                  <img src={src} alt="doge" className="circle" />

                  <div
                    className="progress_text"
                    title={
                      Number(status?.totalInvested) == 0 ||
                      status?.totalInvested == "NaN"
                        ? "0"
                        : usdtValueConvert(
                            Number(remainingRewards)
                            // -Number(totalRewards)
                          )
                    }
                  >
                    <strong>
                      {status?.totalInvested == undefined ||
                      Number(status?.totalInvested) == 0 ||
                      status?.totalInvested == "NaN"
                        ? "0"
                        : formatNumber(
                            toCustomFixed(
                              usdtValueConvert(Number(remainingRewards)),
                              2
                            )
                          ) == "NaN"
                        ? "0"
                        : formatNumber(
                            toCustomFixed(
                              usdtValueConvert(
                                Number(Number(remainingRewards))
                                // - Number(totalRewards)
                              ),
                              2
                            )
                          )}
                    </strong>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
              {100 -
                Number(
                  usdtValueConvert(totalRewards) /
                    usdtValueConvert(Number(status?.maxCap))
                ) *
                  100 <=
              30 ? (
                <p className="deposit_alert">
                  {!RewardMutipler? "0" : RewardMutipler}x of Deposit
                  <br />
                  <span>BEAWARE OF YOUR REWARDS!</span>
                </p>
              ) : 100 -
                  Number(
                    usdtValueConvert(totalRewards) /
                      usdtValueConvert(Number(status?.maxCap))
                  ) *
                    100 <=
                10 ? (
                <p className="deposit_alert">
                  {!RewardMutipler ? "0" : RewardMutipler}x of Deposit
                  <br />
                  <span>ALERT: YOU ARE IN RED ZONE!</span>
                </p>
              ) : (
                <p className="deposit_alert">
                  {!RewardMutipler ? "0" : RewardMutipler}x of Deposit
                </p>
              )}
              <p
                className={`text-center ${
                  100 -
                    Number(
                      usdtValueConvert(totalRewards) /
                        usdtValueConvert(Number(status?.maxCap))
                    ) *
                      100 <=
                    10 ||
                  100 -
                    Number(
                      usdtValueConvert(totalRewards) /
                        usdtValueConvert(Number(status?.maxCap))
                    ) *
                      100 ==
                    0
                    ? "text_red"
                    : 100 -
                        Number(
                          usdtValueConvert(totalRewards) /
                            usdtValueConvert(Number(status?.maxCap))
                        ) *
                          100 <=
                      30
                    ? "text_orange"
                    : "text_yellow"
                }`}
                title={
                  toCustomFixed(
                    100 -
                      Number(
                        usdtValueConvert(totalRewards) /
                          usdtValueConvert(Number(status?.maxCap))
                      ) *
                        100,
                    1
                  )?.toString() +
                    "%" ==
                    "NaN%" || undefined
                    ? "0%"
                    : toCustomFixed(
                        100 -
                          Number(
                            usdtValueConvert(totalRewards) /
                              usdtValueConvert(Number(status?.maxCap))
                          ) *
                            100,
                        90
                      )?.toString() + "%"
                }
              >
                {toCustomFixed(
                  100 -
                    Number(
                      usdtValueConvert(totalRewards) /
                        usdtValueConvert(Number(status?.maxCap))
                    ) *
                      100,
                  1
                )?.toString() +
                  "%" ==
                  "NaN%" || undefined
                  ? "0%"
                  : Number(
                      100 -
                        Number(
                          usdtValueConvert(totalRewards) /
                            usdtValueConvert(Number(status?.maxCap))
                        ) *
                          100
                    ) <= 0
                  ? "0" + "%"
                  : toCustomFixed(
                      100 -
                        Number(
                          usdtValueConvert(totalRewards) /
                            usdtValueConvert(Number(status?.maxCap))
                        ) *
                          100,
                      1
                    )?.toString() + "%"}
              </p>
            </div>

            <Lottie
              animationData={dotAnimation}
              loop={true}
              className="circle_loading"
            />
            <div className="circle_in">
              <div className="circle_text">
                <CircularProgressbarWithChildren
                  value={
                    usdtValueConvert(totalRewards) == 0
                      ? Number(0)
                      : Number(
                          usdtValueConvert(totalRewards) /
                            usdtValueConvert(Number(status?.maxCap))
                        ) * 100 || 0
                  }
                  maxValue={101}
                  strokeWidth={6}
                  backgroundPadding={5}
                  className="circle_sec"
                >
                  <img src={src} alt="doge" className="circle" />
                  <div
                    className="progress_text"
                    title={
                      usdtValueConvert(totalRewards) == 0 || undefined
                        ? "0"
                        : usdtValueConvert(totalRewards) == "NaN"
                        ? "0"
                        : usdtValueConvert(totalRewards)
                    }
                  >
                    <strong>
                      {usdtValueConvert(totalRewards) == undefined
                        ? "0"
                        : formatNumber(
                            toCustomFixed(
                              Number(usdtValueConvert(totalRewards)),
                              2
                            )
                          ) == "NaN"
                        ? "0"
                        : formatNumber(
                            toCustomFixed(
                              Number(usdtValueConvert(totalRewards)),
                              2
                            )
                          )}
                    </strong>
                  </div>
                </CircularProgressbarWithChildren>
                <p>Rewards claimed</p>
              </div>
              <p
                className="text-center text_yellow"
                title={
                  toCustomFixed(
                    100 -
                      (100 -
                        Number(
                          usdtValueConvert(totalRewards) /
                            usdtValueConvert(Number(status?.maxCap))
                        ) *
                          100),
                    1
                  )?.toString() +
                    "%" ==
                    "NaN%" ||
                  usdtValueConvert(totalRewards) == 0 ||
                  undefined
                    ? "0%"
                    : toCustomFixed(
                        100 -
                          (100 -
                            Number(
                              usdtValueConvert(totalRewards) /
                                usdtValueConvert(Number(status?.maxCap))
                            ) *
                              100),
                        90
                      )?.toString() + "%"
                }
              >
                {toCustomFixed(
                  100 -
                    (100 -
                      Number(
                        usdtValueConvert(totalRewards) /
                          usdtValueConvert(Number(status?.maxCap))
                      ) *
                        100),
                  1
                )?.toString() +
                  "%" ==
                  "NaN%" ||
                usdtValueConvert(totalRewards) == 0 ||
                undefined
                  ? "0%"
                  : Number(
                      100 -
                        (100 -
                          Number(
                            usdtValueConvert(totalRewards) /
                              usdtValueConvert(Number(status?.maxCap))
                          ) *
                            100)
                    ) >= 100
                  ? "100" + "%"
                  : toCustomFixed(
                      100 -
                        (100 -
                          Number(
                            usdtValueConvert(totalRewards) /
                              usdtValueConvert(Number(status?.maxCap))
                          ) *
                            100),
                      1
                    )?.toString() + "%"}
              </p>
            </div>
          </div>
        </div>
      ) : freezingStatus == false &&
        usdtValueConvert(status?.totalInvested) == 0 &&
        userDetails?.invested == true ? (
        <div
          className={`${styles.referral_wrap} ${styles.referral_wrap_content}`}
        >
          <div className={styles.block_content}>
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className={styles.block_img}
            >
              <img src={block_icon} alt="block-icon" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {Number(remainingDays) <= 0
                ? `You've successfully claimed your rewards, which were calculated based on your investment multiplier. 
                To maintain your Sky tokens, it's essential to reinvest within ${days} days. Failure to do so may result in forfeiture of your tokens.`
                : `You've successfully claimed your rewards, which were calculated based on your investment multiplier. 
                To maintain your Sky tokens, it's essential to reinvest within ${remainingDays} days. Failure to do so may result in forfeiture of your tokens.`}
              {}
            </motion.p>
          </div>
        </div>
      ) : freezingStatus == true ? (
        <div
          className={`${styles.referral_wrap} ${styles.referral_wrap_content}`}
        >
          <div className={styles.block_content}>
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className={styles.block_img}
            >
              <img src={block_icon} alt="block-icon" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              Your account is frozen by admin
            </motion.p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Referral;
