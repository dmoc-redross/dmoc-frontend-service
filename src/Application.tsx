import { Dispatch, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./components/pages/Homepage/Homepage";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage";
import { ROUTES } from "./utils/constants";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Authlayout from "./components/layouts/AuthLayout/Authlayout";
import ReferralList from "./components/pages/ReferralList/ReferralList";
import Homelayout from "./components/layouts/Homelayout/Homelayout";
import PageNotFound from "./components/pages/PageNotFound/PageNotFound";
import Funds from "./components/pages/Funds/Funds";
import Transaction from "./components/pages/Transaction/Transaction";
import AuthGuard from "./components/common/Guard/AuthGuard";
import packageJson from "../package.json";
import { useDispatch } from "react-redux";
import { setLoading } from "./redux/features/reducers/loading.slice";
import { reset } from "./redux/features/reducers/user.slice";
import { removeStorage } from "./components/Services/Helper";
import { useDisconnect } from "@web3modal/ethers/react";
import Rewards from "./components/pages/Rewards/Rewards";
import RewardChart from "./components/pages/RewardChart/RewardChart";

const Application: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const { disconnect } = useDisconnect();

  const manageCache = async () => {
    try {
      const latest_version: any = packageJson.version;

      const old_sky_version = localStorage.getItem("sky_version");
      if (!old_sky_version) {
        localStorage.setItem("sky_version", latest_version);
      }
      if (old_sky_version && latest_version != old_sky_version) {
        dispatch(setLoading(false));
        dispatch(reset());
        removeStorage();
        await disconnect();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    manageCache();
  }, []);

  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <ComingSoonPage />,
    //   ErrorBoundary: ComingSoonPage,
    //   children: [
    //     {
    //       path: "/",
    //       element: <ComingSoonPage />,
    //     },
    //   ],
    // },

    {
      path: "/",
      element: <Homelayout />,
      ErrorBoundary: ErrorPage,
      children: [
        {
          path: "/",
          element: <Homepage />,
          children: [
            {
              path: ROUTES.HOME_REFERRAL,
            },
          ],
        },
      ],
    },
    {
      path: "/auth",
      element: <Authlayout />,
      ErrorBoundary: ErrorPage,
      children: [
        {
          path: ROUTES.DASHBOARD,
          element: (
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          ),
          children: [
            {
              path: ROUTES.DASHBOARD_REFERRAL,
            },
          ],
        },
        {
          path: ROUTES.FUNDS,
          element: (
            <AuthGuard>
              <Funds />
            </AuthGuard>
          ),
          children: [
            {
              path: ROUTES.REFERRAL,
            },
          ],
        },
        // {
        //   path: ROUTES.REFERRAL_LIST,
        //   element: (
        //     <AuthGuard>
        //       <ReferralList />
        //     </AuthGuard>
        //   ),
        // },
        {
          path: ROUTES.REWARDSlIST,
          element: (
            <AuthGuard>
              <Rewards />
            </AuthGuard>
          ),
        },
        {
          path: ROUTES.REWARDCHART,
          element: (
            <AuthGuard>
              <RewardChart />
            </AuthGuard>
          ),
        },
        {
          path: ROUTES.TRANSACTION,
          element: (
            <AuthGuard>
              <Transaction />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      path: "*",
      element: (
        <AuthGuard>
          <PageNotFound />
        </AuthGuard>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Application;
