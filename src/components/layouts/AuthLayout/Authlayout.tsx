import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../common/Sidebar/Sidebar";
import Header from "../../common/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/features/reducers/loading.slice";
import { Footer } from "../../common";
import styles from "./Authlayout.module.scss";
import { RootState } from "../../../redux/types";
const Authlayout = () => {
  const [active, setActive] = useState(false);
  const handleActive = () => {
    (window.innerWidth  < 1200 || document.body.clientWidth < 1200) && setActive(!active);
  };
  const { walletAddress } : { walletAddress: string } = useSelector((state: RootState) => state?.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1100);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : ""
  }, [active])

  return (
    <main className={styles.layout}>
      {walletAddress ? (
        <Sidebar active={active} handleActive={handleActive} />
      ) : null}
      <Header active={active} handleActive={handleActive} />
      <div className={styles.layout_outer}>
        <div className={styles.layout_in}>
          <Outlet />
        </div>
        <Footer inner />
      </div>
    </main>
  );
};

export default Authlayout;
