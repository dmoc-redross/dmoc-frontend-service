import { useEffect, useState } from "react";
import {
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "../../../assets/icons/svgicons";

import styles from "./SocialLinks.module.scss";
import { GobalLink } from "../../Services/api.service";
import {
  setfacebook,
  setWhatapps,
  setTwitter,
  setTelegarm,
} from "../../../redux/features/reducers/user.slice";
import { useDispatch, useSelector } from "react-redux";

type propTypes = {
  className?: string;
};

const SocialLinks = (props: propTypes) => {
  const dispatch: any = useDispatch();
  const [isTxMounted, setIsTxMounted] = useState(false);

  const { facebook, Whatapps, Twitter, Telegarm }: any = useSelector(
    (state: any) => state?.user
  );

  const handleGolbalLink = async () => {
    try {
      const res :any= await GobalLink();

      const data:any = res?.data?.data[0];
      if (data) {
        dispatch(setfacebook(data?.facebookLink));
        dispatch(setWhatapps(data?.whatsAppLink));
        dispatch(setTwitter(data?.twitterLink));
        dispatch(setTelegarm(data?.telegramLink));
      } else {
        console.error("No data received from GobalLink");
      }
    } catch (error) {
      console.error("Error in :", error);
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
      handleGolbalLink();
    }
    return cleanup;
  }, [facebook, Whatapps, Twitter, Telegarm, isTxMounted]);
  
  return (
    <>
      <div className={`${styles.links} ${props.className || ""}`}>
        <p>Join Our Community</p>
        <ul>
          {facebook != "" ? (
            <li>
              <a href={facebook} target="_blank">
                <FacebookIcon />
              </a>
            </li>
          ) : (
            <li>
              <a>
                <FacebookIcon />
              </a>
            </li>
          )}
          {Twitter != "" ? (
            <li>
              <a href={Twitter} target="_blank">
                <TwitterIcon />
              </a>
            </li>
          ) : (
            <li>
              <a>
                <TwitterIcon />
              </a>
            </li>
          )}
          {Telegarm != "" ? (
            <li>
              <a href={Telegarm} target="_blank">
                <TelegramIcon />
              </a>
            </li>
          ) : (
            <li>
              <a>
                <TelegramIcon />
              </a>
            </li>
          )}
          {Whatapps != "" ? (
            <li>
              <a href={Whatapps} target="_blank">
                <WhatsappIcon />
              </a>
            </li>
          ) : (
            <li>
              <a>
                <WhatsappIcon />
              </a>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default SocialLinks;
