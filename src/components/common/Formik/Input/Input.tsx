import { ErrorMessage, Field } from "formik";
import Form from "react-bootstrap/Form";
import Label from "../Label/Label";
import { ReactNode } from "react";
import styles from "./Input.module.scss";

const Input = (props: {
  label?: string;
  name?: any;
  formik?: any;
  children?: ReactNode;
  className?: string;
  type?: string;
  icon?: ReactNode;
  placeholder?: string;
  onChange?: any;
  onBlur?: any;
  value?: any;
  rightAction?: boolean;
  btntext?: string;
  inputMode?: string;
  autoComplete?: string;
  maxLength?:string|number;
  onKeyDown?: (e: React.KeyboardEvent<any>) => void;
  onKeyPress?: (e: React.KeyboardEvent<any>) => void;
  error?: any;

}) => {
  const { ...rest } = props;

  return (
    <>
      <Form.Group
        className={`${styles.input} ${props.className || ""} ${
          props.formik.values[props.name] ? styles.input_field : ""
        } ${
          props.formik.touched[props.name] && props.formik.errors[props.name]
            ? styles.input_error
            : ""
        }`}
        controlId={props.name}
      >
        {props.label && <Label htmlFor={props.name} label={props.label} />}
        <div className="inner">
          <Field onChange={props.onChange} name={props.name} {...rest} />
          {props.icon && <span className="icon">{props.icon}</span>}
          {props.rightAction && (
            <button className="inner-btn">{props.btntext}</button>
          )}
        </div>
        {props.children}
        {props.name && <ErrorMessage name={props.name} component={TextError} />}
        {props.error}
      </Form.Group>
    </>
  );
};
const TextError = (props: any) => {
  return <div className={styles.error_message}>{props.children}</div>;
};
export default Input;
