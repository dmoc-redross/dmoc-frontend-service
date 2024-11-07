import { ReactNode } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

type propTypes = {
  loading?: boolean;
  text?: string;
  children?: ReactNode;
  className?: string;
  fluid?: boolean;
  onClick?: () => void;
  variant?: string;
  to?: any;
  type?: "button" | "submit" | "reset" | undefined;
  icon?: ReactNode;
  disabled?: any;
  role?: any;
};

const Button = (props: propTypes) => {
  return (
    <>
      {(() => {
        switch (props.role) {
          case "link":
            return (
              <Link
                to={props.to}
                className={`${styles.button} ${props.className || ""}`}
                data-variant={props.variant}
              >
                {props.icon && (
                  <>
                    <span className="buttonIcon">{props.icon}</span>
                  </>
                )}
                {props.loading ? <Spinner /> : props.text || props.children}
              </Link>
            );
          default:
            return (
              <button
                className={`${styles.button} ${props.className || ""}`}
                onClick={props.onClick}
                disabled={props.disabled}
                type={props.type ? props.type : "button"}
                data-variant={props.variant}
              >
                {props.icon && (
                  <>
                    <span className="buttonIcon">{props.icon}</span>
                  </>
                )}
                {props.loading ? <Spinner /> : props.text || props.children}
              </button>
            );
        }
      })()}
    </>
  );
};

export default Button;
