"use client"
import React, { useEffect, useState } from "react";


import { FaRegUser } from "react-icons/fa";
import { LiaProductHunt } from "react-icons/lia";
import { FiShoppingCart } from "react-icons/fi";
import { FaSchool } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import Layout from "@/app/components/Admin/Layout";
import axios from "../../../../axiosconfig"
import Image from "next/image";

const sampleUsers = [
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      contact: "1234567890",
      city: "New York",
      district: "Manhattan",
      state: "New York",
      companyName: "ABC Inc.",
      password: "password123",
      isVerified: true,
      isAdmin: false,
      schoolLimit: 1,
      studentLimit: 2500,
      staffLimit: 500,
      exportExcel: true,
    },
    {
      name: "Bob Smith",
      email: "bob.smith@example.com",
      contact: "9876543210",
      city: "Los Angeles",
      district: "Downtown",
      state: "California",
      companyName: "XYZ Corp.",
      password: "password456",
      isVerified: true,
      isAdmin: false,
      schoolLimit: 2,
      studentLimit: 3000,
      staffLimit: 600,
      exportExcel: false,
    },
    {
      name: "Eva Martinez",
      email: "eva.martinez@example.com",
      contact: "5555555555",
      city: "Chicago",
      district: "Loop",
      state: "Illinois",
      companyName: "EFG Ltd.",
      password: "password789",
      isVerified: true,
      isAdmin: false,
      schoolLimit: 1,
      studentLimit: 2000,
      staffLimit: 400,
      exportExcel: true,
    },
    {
      name: "David Brown",
      email: "david.brown@example.com",
      contact: "4444444444",
      city: "Houston",
      district: "Downtown",
      state: "Texas",
      companyName: "LMN Corporation",
      password: "passwordabc",
      isVerified: true,
      isAdmin: false,
      schoolLimit: 3,
      studentLimit: 3500,
      staffLimit: 700,
      exportExcel: false,
    },
    {
      name: "Grace Lee",
      email: "grace.lee@example.com",
      contact: "7777777777",
      city: "San Francisco",
      district: "Financial District",
      state: "California",
      companyName: "PQR Enterprises",
      password: "passwordxyz",
      isVerified: true,
      isAdmin: false,
      schoolLimit: 2,
      studentLimit: 2800,
      staffLimit: 550,
      exportExcel: true,
    },
  ];

const data = [
  { date: "Day 1", users: 10, productsSold: 5 },
  { date: "Day 2", users: 15, productsSold: 8 },
  { date: "Day 3", users: 20, productsSold: 10 },
  { date: "Day 4", users: 18, productsSold: 7 },
  { date: "Day 5", users: 25, productsSold: 12 },
  { date: "Day 6", users: 22, productsSold: 9 },
];

function Schools() {
  const [schools,setschools] = useState();

  const config = () => {
    return {
        headers: {
            'authorization': localStorage.getItem('token') || '' // Ensure token is always a string
        },
        withCredentials: true
    };
};

useEffect(() => {
  const searchUsers = async () => {
      const response = await axios.post(`/admin/schools`, null, config()
      );
      setschools(response.data.schools);
      console.log(response.data.schools)
    };
   searchUsers();
}, []); 
  return (
    <Layout>
      <>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n        .admin-content .cart {\n            background: linear-gradient(to right, #007BFF 50%, #fff 50%);\n            background-size: 200% 100%;\n            background-position: right bottom;\n            transition: all 0.5s ease-out;\n        }\n\n        .admin-content .cart:hover {\n            background-position: left bottom;\n        }\n\n        .admin-content .cart h2 {\n            margin-top: 5px;\n        }\n\n        @media screen and (max-width: 854px) {\n            .admin-content .cart h2 {\n                font-size: 14px;\n            }\n        }\n\n        table {\n            width: 100%;\n            border-collapse: collapse;\n            margin-top: 20px;\n        }\n\n        table,\n        th,\n        td {\n            border: 1px solid #ddd;\n        }\n\n        th,\n        td {\n            text-align: left;\n            padding: 8px;\n        }\n\n        th {\n            background-color: #303956;\n            color: white;\n        }\n\n        tr:nth-child(even) {\n            background-color: #f2f2f2;\n        }\n    ",
          }}
        />
        <div className="main">
          <div className="dashboard">
            <div id="right-dashboard">
              <div className="nav flex items-center justify-between w-full py-4 px-6 border-b-2 border-gray-200 	">
                <div className="left flex items-center gap-3">
              
                  <h1 className="font-semibold"> Schools</h1>
                </div>
              </div>
            </div>
            <div className=" w-[70vw] h-[70vh] mt-8 overflow-x-auto overflow-y-auto ">
              <table className=" border rounded-lg overflow-hidden">
                <thead className=" bg-indigo-600 text-white">
                  <tr>
                    <th className="py-2 px-4 font-semibold">Name</th>
                    <th className="py-2 px-4 font-semibold">Email</th>
                    <th className="py-2 px-4 font-semibold">Contact</th>
                    <th className="py-2 px-4 font-semibold">Address</th>
                    <th className="py-2 px-4 font-semibold">exportExcel</th>
                  </tr>
                </thead>
                <tbody className="">
                  {schools &&
                    schools?.map((e, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0 ? "bg-indigo-100" : "bg-white"
                        }
                      >
                        <td className="py-2 px-4 text-center text-nowrap">{`${e?.name}`}</td>
                        <td className="py-2 px-4 text-center text-nowrap">{e?.email}</td>
                        <td className="py-2 px-4 text-center">{e?.contact}</td>
                        <td className="py-2 px-4 text-center text-nowrap">{e?.address}</td>
                        <td className="py-2 px-4 text-center">
                          {e?.exportExcel}
                        </td>
                        
                        {/* <td className="py-2 px-4 text-center">
                    {e?.studentId?.resumePdf?.fileId ? (
                      <a href={e?.studentId?.resumePdf?.url} target="_blank">
                        Doanload
                      </a>
                    ) : (
                      <Link href={`/WatchResumeEmploye/${e?.studentId?._id}`}>
                        Watch
                      </Link>
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <select
                      className="bg-white border rounded-md py-1 px-2"
                      value={statusMap[e?._id] || "pending"}
                      onChange={(event) => handleSelectChange(e?._id, event)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accept</option>
                      <option value="Rejected">Reject</option>
                    </select>
                  </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
              {/* <Bar data={data} /> */}
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
}

export default Schools;