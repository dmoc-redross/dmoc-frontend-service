import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setLoading } from "../../../redux/features/reducers/loading.slice";
import { Footer } from "../../common";
import Header from "../../common/Header/Header";
import Sidebar from "../../common/Sidebar/Sidebar";
import styles from "../AuthLayout/Authlayout.module.scss";

const AdminLayout = () => {
  const [active, setActive] = useState(false);
  const handleActive = () => {
    window.screen.availWidth < 1200 && setActive(!active);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1100);
  }, []);
  return (
    <main className={styles.layout}>
      <Sidebar active={active} handleActive={handleActive} />
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

export default AdminLayout;
