import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
// import { getRefererDetail } from "../Services/api.service";
// import { setLinkId } from "../../redux/features/reducers/user.slice";
import { reset, setLinkId } from "../../../redux/features/reducers/user.slice";
import { getCheckUser } from "../../Services/api.service";
// import { useIdleTimer } from 'react-idle-timer'
// import Swal from 'sweetalert2';
import { useDisconnect } from "@web3modal/ethers/react";
import { disconnectWallet } from "../../../redux/actions/user.action";


const AuthGuard = (props: any) => {
  const dispatch:any = useDispatch();
  let { id } = useParams();

  const { walletAddress, linkId } = useSelector((state: any) => state.user);

  const [isTxMounted, setIsTxMounted] = useState(false);
  const [state, setState] = useState<string>("Active");
  const [count, setCount] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);
  const { disconnect } = useDisconnect();


  useEffect(() => {
    let isMounted = true;

    const cleanup = () => {
      isMounted = false;
    };

    if (!isTxMounted) {
      setIsTxMounted(true);
      return cleanup;
    }

    if (walletAddress)
      getId();
    return cleanup;
  }, [id, isTxMounted, ]);

  const getId = async () => {
    if (id) {
      const res: any = await getCheckUser({ docIdReferrer: id });

      if (res?.status == 200) {
        dispatch(setLinkId(res?.data._id));
      }
    }
  };

  // const onIdle = () => {
  //   setState("Idle");
  //   // dispatch(resetUser());
  // };
  // const onActive = () => {
  //   setState("Active");
  // };
  // const onAction = () => {
  //   setCount(count + 1);
  // };

  // const { getRemainingTime } = useIdleTimer({
  //   onIdle,
  //   onActive,
  //   onAction,
  //   // timeout: 1 * 60 * 1000,
  //   timeout: 10000,
  //   throttle: 500,
  //   stopOnIdle: true,
  // });
  // const willLogout = async () => {
  //   if (remaining == 1) {
  //     const res: any = await Swal.fire({
  //       icon: "info",
  //       title: "Session Expired",
  //       text: "Your session is expired, You have to connect again to continue",
  //       showCancelButton: false,
  //       confirmButtonText: "Ok",
  //       customClass: {
  //         loader: "true",
  //       },
  //     });
  //     console.log("resres@!3323", res);
  //     setRemaining(0);

  //     if (res?.isConfirmed || res?.dismiss == "backdrop") {
  //       await disconnect();
  //       dispatch(disconnectWallet());
  //       dispatch(reset());
  //       navigate(ROUTES.HOME)
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (state == "Active") {
  //       setRemaining(Math.ceil(getRemainingTime() / 1000));
  //     }
  //   }, 1000);
  //   if (remaining == 1) {
  //     willLogout();
  //   }
  //   return () => {
  //     clearInterval(interval);
  //   };
  // },[remaining, state, getRemainingTime]);


  return walletAddress ? (
    props.children
  ) : linkId || id ? (
    <Navigate to={ROUTES?.HOME + id} />
  ) : (
    <Navigate to="/" />
  );
};

export default AuthGuard;
