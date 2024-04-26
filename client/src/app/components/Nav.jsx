"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
// import Cart from "./Card";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaCartFlatbedSuitcase, FaCartShopping } from "react-icons/fa6";
import { CgLogOut } from "react-icons/cg";
import { FaInstagram } from "react-icons/fa";
import { SlSocialTwitter } from "react-icons/sl";
import { CiFacebook } from "react-icons/ci";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineRoundaboutLeft } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "@/redux/actions/userAction";
import Image from "next/image";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user, error } = useSelector((state) => state.user);
  const sidebarRef = useRef();
  const dispatch = useDispatch();

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const LogoutUser = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <nav>
        <style jsx>{`
          nav {
            position: fixed;
            z-index: 99;
            width: 100%;
            background: #fff;
          }
          nav .wrapper {
            position: relative;
            max-width: 1300px;
            padding: 0px 30px;
            height: 70px;
            line-height: 70px;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .wrapper .logo a {
            /* color: #f2f2f2; */
            color: #034363;
            font-size: 30px;
            font-weight: 800;
            text-decoration: none;
          }
          .wrapper .nav-links {
            display: flex;
          }
          .nav-links li {
            list-style: none;
          }
          .nav-links li a {
            /* color: #f2f2f2; */
            color: #034363;
            text-decoration: none;
            font-size: 18px;
            font-weight: 600;
            padding: 9px 15px;
            border-radius: 5px;
            transition: all 0.3s ease;
          }
          .nav-links li a:hover {
            /* background: #3A3B3C; */
            background: #034363;
            color: #fff;
          }

          .nav-links .mobile-item {
            display: none;
          }
          .nav-links .drop-menu {
            position: absolute;
            background: #fff;
            color: #034363;
            /* background: #C22F63; */
            width: 180px;
            line-height: 45px;
            top: 85px;
            opacity: 0;
            visibility: hidden;
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
          }
          .nav-links li:hover .drop-menu,
          .nav-links li:hover .mega-box {
            transition: all 0.3s ease;
            top: 70px;
            opacity: 1;
            visibility: visible;
          }
          .drop-menu li a {
            width: 100%;
            display: block;
            padding: 0 0 0 15px;
            font-weight: 400;
            border-radius: 0px;
          }
          .mega-box {
            position: absolute;
            right: 0;
            width: 50%;
            padding: 0 30px;
            top: 85px;
            opacity: 0;
            visibility: hidden;
          }
          .mega-box .content {
            background: #fff;
            padding: 25px 20px;
            display: flex;
            width: 100%;
            justify-content: space-between;
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
          }
          .mega-box .content .row {
            width: calc(25% - 30px);
            line-height: 45px;
          }
          .content .row img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .content .row header {
            color: #034363;
            font-size: 20px;
            font-weight: 700;
          }
          .content .row .mega-links {
            margin-left: -40px;
            border-left: 1px solid rgba(255, 255, 255, 0.09);
          }
          .row .mega-links li {
            padding: 0 20px;
          }
          .row .mega-links li a {
            padding: 0px;
            padding: 0 20px;
            color: #034363;
            font-weight: 500;
            font-size: 17px;
            display: block;
          }
          .row .mega-links li a:hover {
            color: #f2f2f2;
          }
          .wrapper .btn {
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            display: none;
          }

          @media screen and (max-width: 970px) {
            .wrapper .btn {
              display: block;
            }
            .wrapper .nav-links {
              position: fixed;
              height: 100vh;
              width: 100%;
              max-width: 350px;
              top: 0;
              left: -100%;
              background: #242526;
              display: block;
              padding: 50px 10px;
              line-height: 50px;
              overflow-y: auto;
              box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.18);
              transition: all 0.3s ease;
            }

            .nav-links li {
              margin: 15px 10px;
            }
            .nav-links li a {
              padding: 0 20px;
              display: block;
              font-size: 20px;
            }
            .nav-links .drop-menu {
              position: static;
              opacity: 1;
              top: 65px;
              visibility: visible;
              padding-left: 20px;
              width: 100%;
              max-height: 0px;
              overflow: hidden;
              box-shadow: none;
              transition: all 0.3s ease;
            }
            #showDrop:checked ~ .drop-menu,
            #showMega:checked ~ .mega-box {
              max-height: 100%;
            }
            .nav-links .desktop-item {
              display: none;
            }
            .nav-links .mobile-item {
              display: block;
              color: #f2f2f2;
              font-size: 20px;
              font-weight: 500;
              padding-left: 20px;
              cursor: pointer;
              border-radius: 5px;
              transition: all 0.3s ease;
            }
            .nav-links .mobile-item:hover {
              background: #3a3b3c;
            }
            .drop-menu li {
              margin: 0;
            }
            .drop-menu li a {
              border-radius: 5px;
              font-size: 18px;
            }
            .mega-box {
              position: static;
              top: 65px;
              opacity: 1;
              visibility: visible;
              padding: 0 20px;
              max-height: 0px;
              overflow: hidden;
              transition: all 0.3s ease;
            }
            .mega-box .content {
              box-shadow: none;
              flex-direction: column;
              padding: 20px 20px 0 20px;
            }
            .mega-box .content .row {
              width: 100%;
              margin-bottom: 15px;
              border-top: 1px solid rgba(255, 255, 255, 0.08);
            }
            .mega-box .content .row:nth-child(1),
            .mega-box .content .row:nth-child(2) {
              border-top: 0px;
            }
            .content .row .mega-links {
              border-left: 0px;
              padding-left: 15px;
            }
            .row .mega-links li {
              margin: 0;
            }
            .content .row header {
              font-size: 19px;
            }
          }
          nav input {
            display: none;
          }

          .body-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            text-align: center;
            padding: 0 30px;
          }
          .body-text div {
            font-size: 45px;
            font-weight: 600;
          }

          /* Mega menu css ends */

          @media screen and (max-width: 640px) {
            #menu-btn {
              display: block;
            }
          }
        `}</style>
        {/* <Cart open={open} setOpen={setOpen}></Cart> */}

        <>
          <div className="wrapper relative">
            <div className="logo">
              <Link href={"/"}>
                <Image  src={"/idcordlogo.jpg"} className="w-[100px]"
                height={50}
                width={50} alt="logo" />
              </Link>
            </div>
            <ul className="nav-links flex gap-4 ">
              <label htmlFor="close-btn" className="btn close-btn">
                <i className="fas fa-times" />
              </label>
              <li>
                <Link
                  href={"/"}
                  className="font-semibold hover:bg-blue-700 hover:text-white rounded-lg py-1.5 px-3 cursor-pointer"
                >
                  Home
                </Link>
              </li>
              {user?.isAdmin && (
                <li>
                  <Link
                    href={"/Admin/Dashbord"}
                    className="font-semibold hover:bg-blue-700 hover:text-white rounded-lg py-1.5 px-3 cursor-pointer"
                  >
                    Dashbord
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href={"/"}
                  className="font-semibold hover:bg-blue-700 hover:text-white rounded-lg py-1.5 px-3 cursor-pointer"
                >
                  About
                </Link>
              </li>

              {/* <li>
                <Link
                  href={"/profile"}
                  className="font-semibold hover:bg-blue-700 hover:text-white rounded-lg py-1.5 px-3 cursor-pointer "
                >
                  Profile
                </Link>
              </li> */}
              <li>
                { user && user?.role != "school" &&
                <Link
                  href="#"
                  className="desktop-item font-semibold hover:bg-blue-700 hover:text-white rounded-lg py-1.5 px-3 cursor-pointer"
                >
                  Features
                </Link>
                 }
                 { user && user?.role != "school" &&
                <input type="checkbox" id="showMega" />
                 }
                 { user && user?.role != "school" &&
                <label htmlFor="showMega" className="mobile-item ">
                  Features
                </label>
                 }
                <div className="mega-box">
                  <div className="content">
                    {/* <div className="row">
                      <img
                        src="/idcordlogo.jpg"
                        alt=""
                      />
                    </div> */}
                    <div className="row">
                      <header>School</header>
                      <ul className="mega-links pe-5">
                        <li>
                          <Link href="/Addschool">Add School</Link>
                        </li>
                        <li>
                          <Link href="/SchoolList">School List</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="row">
                      <header>Add Data</header>
                      <ul className="mega-links">
                        <li>
                          <Link href="/Adddata">Add Student</Link>
                        </li>
                        <li>
                          <Link href="Addexcel">Import Data</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="row">
                      <header>Other</header>
                      <ul className="mega-links">
                        <li>
                          <Link href="Viewdata">View Data</Link>
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              {user && (
                <li>
                  <span
                    className="font-semibold hover:bg-blue-700 hover:text-white rounded-lg py-1.5 px-3 cursor-pointer"
                    onClick={LogoutUser}
                    href="#"
                  >
                    Logout
                  </span>
                </li>
              )}
            </ul>
            <div className="md:hidden flex items-center gap-2">
              <GiHamburgerMenu
                className="text-xl"
                onClick={() => setSidebarOpen((e) => !e)}
              />
            </div>
          </div>
          <div className="md:hidden bg-[]">
            <aside
              ref={sidebarRef}
              id="sidebar-multi-level-sidebar"
              className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } sm:translate-x-0`}
              aria-label="Sidebar"
            >
              <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 bg-[#FEFAF6]">
                <Image
                alt="logo"
                height={50}
                width={50}
                  className="w-[120px] mx-auto"
                  src="/idcordlogo.jpg"
                ></Image>
                <ul className="space-y-2 font-medium  py-[20px]">
                  {user?.isAdmin && (
                    <li>
                      <Link
                        href={"/Admin/Dashbord"}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-200 group"
                      >
                        <MdOutlineDashboardCustomize />
                        <span className="ms-3">Dashboard</span>
                      </Link>
                    </li>
                  )}

                  {/* <li>
                    <a
                      href={"/profile"}
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-200 group"
                    >
                      <CgProfile />
                      <span className="ms-3">Profile</span>
                    </a>
                  </li> */}

                  <li>
                    <Link
                      href={"/"}
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-200 group"
                    >
                      <FaCartFlatbedSuitcase />
                      <span className="ms-3">About</span>
                    </Link>
                  </li>

                  {/* <li>
                    <a
                      href="/contractUs"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-200 group"
                    >
                      <MdOutlineLocalPhone />
                      <span className="ms-3">Contract Us</span>
                    </a>
                  </li> */}

                  {user &&
                  <li>
                  <div
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-200 group" onClick={LogoutUser}
                  >
                    <CgLogOut />
                    <span className="ms-3">Logout</span>
                  </div>
                </li>
                  }
                </ul>
                <div className="absolute bottom-3 flex justify-evenly w-full">
                  <FaInstagram className="text-lg" />
                  <SlSocialTwitter className="text-lg" />
                  <CiFacebook className="text-lg" />
                </div>
              </div>
            </aside>
          </div>
        </>
      </nav>
    </>
  );
};

export default Nav;
