"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "../../../../axiosconfig";
import { FaRegUser } from "react-icons/fa";
import { LiaProductHunt } from "react-icons/lia";
import { FiShoppingCart } from "react-icons/fi";
import { FaSchool } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import Layout from "@/app/components/Admin/Layout";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import Image from 'next/image'

const ChangeLimits = () => {
  const [users, setUsers] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const basePath = "/admin"; // Add this line to define basePath

  const config = () => {
    return {
      headers: {
        authorization: localStorage.getItem("token") || "" // Ensure token is always a string
      },
      withCredentials: true
    };
  };

  const searchUsers = async () => {
    const response = await axios.post(`/admin/users?q=${searchTerm}`, null, config());
    setUsers(response.data.users);
  };

  useEffect(() => {
    const searchUsers = async () => {
      const response = await axios.post(`/admin/users?q=${searchTerm}`, null, config());
      setUsers(response.data.users);
    };
    searchUsers();
  }, [searchTerm]);

  const DeletUser = async (id) => {
    const response = await axios.post(`${basePath}/admin/delete/user/${id}`, null, config());
    setUsers(response.data.user);
  };

  const ChageExcelfile = async (id) => {
    const response = await axios.post(`${basePath}/admin/set/user/exceldata/${id}`, null, config());
    searchUsers();
  };

  const changeLimitsPage = (id) => {
    if (id) {
      router.push(`/Admin/ChangeLimits/${id}`);
    }
  };

  return (
    <Layout>
      <>
        <div className="main ">
          <div className="dashboard flex flex-col px-10 w-full">
            <div id="right-dashboard">
              <div className="nav flex items-center justify-between w-full py-4 px-6 border-b-2 border-gray-200 	">
                <div className="left flex items-center gap-3">
                  <h1 className="font-semibold"> Distributers List</h1>
                </div>
              </div>
            </div>
            <div>
              <input
                className="w-[100%] h-8 border mt-5 rounded-md px-3"
                type="text"
                name="search" // Corrected the typo here
                id=""
                placeholder="Search User by Name or Email "
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className=" w-[70vw] h-[70vh] mt-8 overflow-x-auto overflow-y-auto ">
              <p className="text-sm text-gray-500 text-center">
                Click on Distributer to set Limits
              </p>
              <table className=" border rounded-lg overflow-hidden">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="py-2 px-4 font-semibold">Name</th>
                    <th className="py-2 px-4 font-semibold">Email</th>
                    <th className="py-2 px-4 font-semibold">
                      schoolLimit
                    </th>
                    <th className="py-2 px-4 font-semibold">
                      studentLimit
                    </th>
                    <th className="py-2 px-4 font-semibold">staffLimit</th>
                    <th className="py-2 px-4 font-semibold">Contact</th>
                    <th className="py-2 px-4 font-semibold">city</th>
                    <th className="py-2 px-4 font-semibold">
                      district
                    </th>
                    <th className="py-2 px-4 font-semibold">state</th>
                    <th className="py-2 px-4 font-semibold">
                      companyName
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-orange-100">
                  {users &&
                    users?.map((e, index) => (
                      <tr
                        key={index}
                        onClick={() => changeLimitsPage(e._id)}
                        className={
                          index % 2 === 0 ? "bg-indigo-100" : "bg-white"
                        }
                      >
                        <td className="py-2 px-4 text-center text-nowrap">
                          {`${e?.name}`}
                        </td>
                        <td className="py-2 px-4 text-center">{e?.email}</td>
                        <td className="py-2 px-4 text-center">
                          {e?.schoolLimit}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {e?.studentLimit}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {e?.staffLimit}
                        </td>
                        <td className="py-2 px-4 text-center">{e?.city}</td>
                        <td className="py-2 px-4 text-center">
                          {e?.contact}
                        </td>
                        <td className="py-2 px-4 text-center text-nowrap">
                          {e?.district}
                        </td>
                        <td className="py-2 px-4 text-center text-nowrap">
                          {e?.state}
                        </td>
                        <td className="py-2 px-4 text-center text-nowrap">
                          {e?.companyName}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default ChangeLimits;