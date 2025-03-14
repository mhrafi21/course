import { createBrowserRouter } from "react-router";
import DashboardRoot from "../DashboardLayout/DashboardRoot";
import Dashboard from "../pages/DahboardPages/Dashboard/Dashboard";
import Products from "../pages/DahboardPages/Products/Products";
import RoutesError from "../RoutesError";
import Users from "../pages/DahboardPages/Users/Users";
import Orders from "../pages/DahboardPages/Orders/Orders";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/frontendPages/Home/Home";
import Settings from "../pages/DahboardPages/Settings/Settings";
import Reports from "../pages/DahboardPages/Reports/Reports";
import Cart from "@/pages/frontendPages/Cart/Cart";
import Course from "@/pages/frontendPages/Course/Course";
import SingleCourse from "@/pages/frontendPages/Course/SingleCourse/SingleCourse";
import Registration from "@/components/Registration/Registration";
import Login from "@/components/Login/Login";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import ForgotPassword from "@/pages/frontendPages/ForgotPassword/ForgotPassword";
import ResetPassword from "@/pages/frontendPages/ResetPassword/ResetPassword";
import CheckoutPage from "@/components/paymentForm/Checkout";
import SearchingCourse from "@/pages/frontendPages/SearchingCourse/SearchingCourse";

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <RootLayout />,
    errorElement: <RoutesError />,
    children: [
      {
        index: true,
        path: "/",
        Component: () => <Home />,
      },
      {
        path: "/courses/",
        Component: () => <Course />,
      },

      {
        path: "/course/:slug/",
        Component: () => <SingleCourse />,
      },
      {
        path: "/search", 
        Component: () => <SearchingCourse />
      },
      {
        path: "/order-confirmation",
        Component: () => <h1>Order Confirmation</h1>,
      },
      {
        path: "/checkout",
        Component: () => (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/sign-up/",
        Component: () => <Registration />,
      },
      {
        path: "/forgot-password/",
        Component: () => <ForgotPassword />,
      },
      {
        path: "/reset-password",
        Component: () => <ResetPassword />,
      },
      {
        path: "/login/",
        Component: () => <Login />,
      },
      {
        path: "/cart/",
        Component: () => (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    Component: () => <DashboardRoot />,
    errorElement: <RoutesError />,
    children: [
      {
        index: true,
        path: "/dashboard",
        Component: () => <Dashboard />,
      },
      {
        path: "/dashboard/manage/products",
        Component: () => <Products />,
      },
      {
        path: "/dashboard/manage/users",
        Component: () => <Users />,
      },
      {
        path: "/dashboard/manage/orders",
        Component: () => <Orders />,
      },
      {
        path: "/dashboard/reports",
        Component: () => <Reports />,
      },
      {
        path: "/dashboard/settings",
        Component: () => <Settings />,
      },
    ],
  },
]);

export default router;
