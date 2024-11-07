import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../../../assets/icons/svgicons";
import Input from "./Input";
import styles from "./Input.module.scss";

const PasswordInput = (props: any) => {
  const { ...rest } = props;
  const [show, setShow] = useState(false);

  const pswdToggle = () => {
    setShow(!show);
  };
  return (
    <>
      <Input
        className={styles.passwordInput}
        {...rest}
        type={`${show ? "text" : "password"}`}
        icon={
          <button type="button" onClick={pswdToggle}>
            {show ? <EyeCloseIcon /> : <EyeIcon />}
          </button>
        }
      />
    </>
  );
};

export default PasswordInput;
