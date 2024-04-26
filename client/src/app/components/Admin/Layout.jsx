import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Slidebar";


const Layout = ({ children }) => {
  return (
    <div className="">
      <Navbar></Navbar>
      <div className="flex">
        <Sidebar></Sidebar>
        <div className="mx-auto py-[20px]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;