import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./style/index.css";
import ScrollTop from "./resources/components/ScrollTop.jsx";
import Navbar from "./resources/components/Navbar.jsx";
import NavbarAdmin from "./resources/components/NavbarAdmin.jsx";
import Footer from "./resources/components/Footer.jsx";
import Register from "./resources/pages/Register.jsx";
import Login from "./resources/pages/Login.jsx";
import HomeAdmin from "./resources/pages/HomeAdmin.jsx";
import HomeClient from "./resources/pages/HomeClient.jsx";
import Games from "./resources/pages/Games.jsx";
import Cart from "./resources/pages/Cart.jsx";
import Publisher from "./resources/pages/Publisher.jsx";
import CategoriesList from "./resources/pages/CategoriesList.jsx";
import Category from "./resources/pages/Category.jsx";
import Account from "./resources/pages/Account.jsx";
import AccountAdmin from "./resources/pages/AccountAdmin.jsx";
import { AuthContext } from "./resources/context/AuthContext.jsx";

// Layout component to wrap routes and apply ScrollTop
const Layout = ({ children }) => (
  <>
    <ScrollTop />
    {children}
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Navigate to="/login" />
    ),
  },
  {
    path: "/home",
    element: (
      <Layout>
        <Navbar />
        <HomeClient />
        <Footer />
      </Layout>
    ),
  },
  {
    path: "/admin",
    element: (
      <AuthContext.Consumer>
        {(context) =>
          context.currentUser &&
          context.currentUser.dataValues.priority === "admin" ? (
            <Layout>
              <NavbarAdmin />
              <HomeAdmin />
              <Footer />
            </Layout>
          ) : (
            <Navigate to="/home" />
          )
        }
      </AuthContext.Consumer>
    ),
  },
  {
    path: "/games/:id",
    element: (
      <Layout>
        <Navbar />
        <Games />
        <Footer />
      </Layout>
    ),
  },
  {
    path: "/cart/:id",
    element: (
      <AuthContext.Consumer>
        {(context) =>
          context.currentUser &&
          context.currentUser.dataValues.priority === "client" ? (
            <Layout>
              <Navbar />
              <Cart />
              <Footer />
            </Layout>
          ) : (
            <Navigate to="/home" />
          )
        }
      </AuthContext.Consumer>
    ),
  },
  {
    path: "/publisher/:id",
    element: (
      <Layout>
        <Navbar />
        <Publisher />
        <Footer />
      </Layout>
    ),
  },
  {
    path: "/category",
    element: (
      <Layout>
        <Navbar />
        <CategoriesList />
        <Footer />
      </Layout>
    ),
  },
  {
    path: "/category/:id",
    element: (
      <Layout>
        <Navbar />
        <Category />
        <Footer />
      </Layout>
    ),
  },
  {
    path: "/account/:id",
    element: (
      <Layout>
        <Navbar />
        <Account />
        <Footer />
      </Layout>
    ),
  },
  {
    path: "/admin_account/:id",
    element: (
      <Layout>
        <NavbarAdmin />
        <AccountAdmin />
        <Footer />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
