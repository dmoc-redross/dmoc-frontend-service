import styles from "./Footer.module.scss";

const Footer = ({ inner }: { inner?: boolean }) => {
  return (
    <footer className={`${styles.footer} ${inner ? styles.footer__inner : ""}`}>
      <p> &#169;{new Date().getFullYear()} SKY MARVEL - All rights reserved.</p>
    </footer>
  );
};

export default Footer;
