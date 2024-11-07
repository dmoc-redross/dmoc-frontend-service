import { Link, useNavigate } from "react-router-dom";
import { LogoutIcon } from "../../../assets/icons/svgicons";
import { ROUTES } from "../../../utils/constants";
import toast from "react-hot-toast";
import { reset } from "../../../redux/features/reducers/user.slice";
import { useDispatch } from "react-redux";
import { disconnectWallet } from "../../../redux/actions/user.action";
import { useDisconnect } from "@web3modal/ethers/react";
import { useState } from "react";

const Logout = (props: any) => {
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const LogoutUser = async () => {
    try {
      setIsDisabled(true);
      setTimeout(() => setIsDisabled(false), 3000);
      await disconnect();
      dispatch(disconnectWallet());
      dispatch(reset());
      navigate(ROUTES.HOME);
      toast.success("Logged out");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link to="/" className={props.className}>
      <span onClick={!isDisabled ? LogoutUser : undefined}>
        <LogoutIcon />
        Logout
      </span>
    </Link>
  );
};

export default Logout;
