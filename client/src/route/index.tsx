import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../components/VerifyOtp";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";
import AdminPermission from "../pages/AdminPermission";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import AdminProducts from "../pages/AdminProducts";
import UploadProduct from "../pages/UploadProduct";
import AdminOrders from "../pages/AdminOrders";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword/>
      },
      {
        path: "verify-otp",
        element: <VerifyOtp/>
      },
      {
        path: "reset-password",
        element: <ResetPassword/>
      },
      {
        path: "user",
        element: <UserMenuMobile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "my-orders",
            element: <MyOrders/>,
          },
          {
            path: "address",
            element: <Address/>,
          },
          {
            path: "category",
            element: <AdminPermission ><CategoryPage/> </AdminPermission> ,
          },
          {
            path: "sub-category",
            element: <AdminPermission>  <SubCategoryPage/></AdminPermission>,
          },
          {
            path: "admin-products",
            element: <AdminPermission><AdminProducts/></AdminPermission>,
          },
          {
            path: "upload-product",
            element: <AdminPermission><UploadProduct/></AdminPermission>,
          },
          {
            path: "admin-orders",
            element: <AdminPermission><AdminOrders/> </AdminPermission>
          }
        ]
      },
      {
        path: ":category",
        children: [
          {
            path: ":subCategory",
            element: <ProductListPage/>
          }
        ]
      },
      {
        path: "product/:product",
        element: <ProductDetailsPage/>
      },
      {
        path: "cart",
        element: <MobileCartMenu/>
      },
      {
        path: "checkout",
        element: <CheckoutPage/>
      },
      {
        path: "success",
        element: <Success/>
      },
      {
        path:"failed",
        element: <Failed/>
      },
      {
        path: "canceled",
        element: <Cancel/>
      }
    ],
  },
]);

export default router;