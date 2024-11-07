import { ReactNode } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import styles from "./CustomTooltip.module.scss";

const CustomTooltip = ({
  children,
  content,
  placement,
}: {
  children?: ReactNode;
  content?: ReactNode;
  placement?: any;
}) => {
  return (
    <OverlayTrigger
      key="top"
      placement={placement ? placement : "top"}
      overlay={<Tooltip className={styles.customTooltip}>{content}</Tooltip>}
      delay={{ show: 250, hide: 400 }}
    >
      <span>{children}</span>
    </OverlayTrigger>
  );
};

export default CustomTooltip;
