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
