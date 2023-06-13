import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import ScrolltoTop from "./components/ScrolltoTop/ScrolltoTop";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import ProductList from "./pages/CRUD/Products/manage-products";
import UserList from "./pages/CRUD/Users/manage-users";
import AdminList from "./pages/CRUD/Admins/manage-admins";
import "./app.scss"

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
        path: "/product-list/",
        element: <ProductList />,
      },
      {
        path: "/user-list/",
        element: <UserList />,
      },
      {
        path: "/admin-list/",
        element: <AdminList />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;