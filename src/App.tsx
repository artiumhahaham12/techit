import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import { ToastContainer, toast } from "react-toastify";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Profile";
import Product from "./interfaces/Product";
import Products from "./components/Products";
import { getAllProducts } from "./services/productsService";


import { checkAdmin } from "./services/userService";
function App() {
  let [isAdmin, setIsAdmin] = useState<boolean>(false);
  function changeIsAdmin(isAdmin: boolean) {
    setIsAdmin(isAdmin);
  }
  useEffect(() => {
    checkAdmin().then((res: any) => {
      setIsAdmin(res);
      console.log(res);
    });
  }, []);
  useEffect(() => {
    console.log(isAdmin);
  }, [isAdmin]);
  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Routes>
          <Route
            path={"/"}
            element={<Login changeIsAdmin={changeIsAdmin}></Login>}
          ></Route>
          <Route path={"/home"} element={<Home></Home>}></Route>
          <Route
            path={"/signUp"}
            element={<Register changeIsAdmin={changeIsAdmin}></Register>}
          ></Route>
          <Route path={"/profile"} element={<Profile></Profile>}></Route>
          <Route
            path={"/products"}
            element={<Products isAdmin={isAdmin}></Products>}
          ></Route>
          
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
