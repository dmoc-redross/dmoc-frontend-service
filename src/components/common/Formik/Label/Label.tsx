import styles from "./Label.module.scss";

const Label = (props: any) => {
  return (
    <>
      <label
        htmlFor={props.name}
        className={`${styles.label} ${props.className || ""}`}
      >
        {props.label}
      </label>
    </>
  );
};

export default Label;
