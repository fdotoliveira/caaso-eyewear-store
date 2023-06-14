import { Children } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import ScrolltoTop from "./components/ScrolltoTop/ScrolltoTop";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import "./app.scss"

import {Content_PData} from './pages/Profile/Personal Data/Perfil';

import {Content_PMethod} from './pages/Profile/Pay Methods/Pay_Method';
import {Content_PMethod_Create, CreditCard, DebitCard} from "./pages/Profile/Pay Methods/Pay_Method_Create";
import {Content_Pay_Data, Content_CreditData, Content_DebitData} from "./pages/Profile/Pay Methods/Pay_Generic";

import {Content_Address} from "./pages/Profile/Address/Address";
import {Content_Address_Create} from "./pages/Profile/Address/Address_Create";
import {Content_AddressData} from "./pages/Profile/Address/Address_Generic";

import {Content_Orders} from "./pages/Profile/Orders/Orders";

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <ScrolltoTop />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "perfil/p-data",
        element: <Content_PData />
      },
      {
        path: "perfil/pay-methods",
        element: <Content_PMethod />,
      },
      {
        path: "perfil/pay-methods/create",
        element: <Content_PMethod_Create/>,
        children: [
          {
            path: "credit",
            element: <CreditCard />
          },
          {
            path: "debit",
            element: <DebitCard />
          }
        ]
      },
      {
        path: "perfil/pay-methods/:payId",
        element: <Content_Pay_Data />,
        children: [
          {
            path: "credit",
            element: <Content_CreditData />
          },
          {
            path: "debit",
            element: <Content_DebitData />
          }
        ]
      },
      {
        path: "perfil/address",
        element: <Content_Address />
      },
      {
        path: "perfil/address/create",
        element: <Content_Address_Create />
      },
      {
        path: "perfil/address/:addressId",
        element: <Content_AddressData />
      },
      {
        path: "perfil/orders",
        element: <Content_Orders />
      },
    ]
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;