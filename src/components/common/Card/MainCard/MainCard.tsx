import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./MainCard.module.scss";

const MainCard = ({
  icon,
  title,
  className,
  subTitle,
  pendingtitle,
  pendingsubTitle,
  titletext,
  billion,
  BurnIcon,
}: {
  icon?: ReactNode;
  BurnIcon?: ReactNode;
  title?: string;
  className?: string;
  titletext?: string;
  pendingtitle?: string;
  pendingsubTitle?: string;
  subTitle?: string | number | ReactNode;
  billion: number | string | any;
}) => {
  const { totalburn, pendingSupply, totalMembers }: any = useSelector(
    (state: any) => state?.user
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pendingSupply) setLoading(true);
    else setLoading(false);
  }, [pendingSupply]);

  return (
    <div className={`${styles.mainCard} ${className || ""}`}>
      <span className={styles.mainCard__icon}>{icon}</span>
      <div className={styles.mainCard__content}>
          {pendingtitle && <div className={styles.cardtotal_pending}>
            <p>{pendingtitle}</p>
            {loading ? (
              <div>Loading...</div> // Replace with a loading spinner if needed
            ) : (
              <h3
                title={
                  title == "Total Members"
                    ? totalMembers
                    : title == "Total Burn 🔥"
                    ? totalburn
                    : pendingtitle == "Pending Supply"
                    ? pendingSupply && pendingSupply.toString()
                    : "0"
                }
                className="text-secondary"
              >
                {pendingsubTitle}
              </h3>
            )}
          </div>}
      
        {(
           <div className={styles.cardtotal_text}>
           <p>
             {title}
             {BurnIcon && <span>{BurnIcon}</span>}
           </p>
           <h3
             title={
               title == "Total Members"
                 ? totalMembers
                 : title == "Total Burn 🔥"
                 ? totalburn
                 : title == "Total Supply"
                 ? billion
                 : ""
             }
             className={`text-secnondary ${titletext || ""}`}
           >
             {subTitle}
           </h3>
         </div>
        )}
      </div>
    </div>
  );
};

export default MainCard;
