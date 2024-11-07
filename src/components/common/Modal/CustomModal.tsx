import { ReactNode } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./CustomModal.module.scss";

const CustomModal = ({
  show,
  onHide,
  children,
  className,
  title,
  closeButton,
  backdrop,
  keyboard
}: {
  show?: boolean;
  onHide?: any;
  children?: ReactNode;
  className?: string;
  title?: string;
  closeButton?: any;
  backdrop: any;
  keyboard: any;
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className={`${styles.customModal} ${className ? className : ""}`}
      backdrop={backdrop}
      keyboard={keyboard}
    >
      {title ? (
        <Modal.Header closeButton={closeButton ? closeButton : ""}>
          <Modal.Title className="text-gradient">{title}</Modal.Title>
        </Modal.Header>
      ) : (
        ""
      )}
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
