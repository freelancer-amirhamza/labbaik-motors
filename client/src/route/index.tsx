import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import VerifyOtp from "../pages/VerifyOtp.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import UserMenuMobile from "../pages/UserMenuMobile.jsx";
import Dashboard from "../layout/Dashboard.jsx";
import Profile from "../pages/Profile.jsx";
import MyOrders from "../pages/MyOrders.jsx";
import Address from "../pages/Address.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";
import SubCategoryPage from "../pages/SubCategoryPage.jsx";
import UploadProduct from "../pages/UploadProduct.jsx";
import AdminProducts from "../pages/AdminProducts.jsx";
import AdminPermission from "../pages/AdminPermission.jsx";
import ProductListPage from "../pages/ProductListPage.jsx";
import ProductDetailsPage from "../components/ProductDetailsPage.jsx";
import MobileCartMenu from "../pages/MobileCartMenu.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import Success from "../pages/Success.jsx";
import Cancel from "../pages/Cancel.jsx";
import AdminOrders from "../pages/AdminOrders.jsx";
import Failed from "../pages/Failed.jsx";

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