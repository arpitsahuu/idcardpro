"use client"
import React, { useEffect, useState } from "react";
import Layout from "@/app/components/Admin/Layout";
import axios from "../../../../axiosconfig";

function Staff() {
  const [staff, setStaff] = useState([]);

  const config = () => {
    return {
      headers: {
        'authorization': localStorage.getItem('token') || ''
      },
      withCredentials: true
    };
  };

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.post(`/admin/staffs`, null, config());
        setStaff(response.data.staffs);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };
    fetchStaff();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <Layout>
      <div className="main">
        <div className="dashboard">
          <div id="right-dashboard">
            <div className="nav flex items-center justify-between w-full py-4 px-6 border-b-2 border-gray-200">
              <div className="left flex items-center gap-3">
                
                <h1 className="font-semibold"> Staffs</h1>
              </div>
            </div>
          </div>
          <div className="w-[70vw] h-[70vh] mt-8 overflow-x-auto overflow-y-auto">
            <table className="border rounded-lg overflow-hidden">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="py-2 px-4 font-semibold">Name</th>
                  <th className="py-2 px-4 font-semibold">Email</th>
                  <th className="py-2 px-4 font-semibold">Contact</th>
                  
                  <th className="py-2 px-4 font-semibold">Qualification</th>
                  <th className="py-2 px-4 font-semibold text-nowrap">Designation</th>
                  <th className="py-2 px-4 font-semibold text-nowrap">Staff Type</th>
                  <th className="py-2 px-4 font-semibold text-nowrap">Date of Joining</th>
                  <th className="py-2 px-4 font-semibold">Address</th>
                </tr>
              </thead>
              <tbody className="b">
                {staff && staff?.map((staffMember, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-indigo-100" : "bg-white"}>
                    <td className="py-2 px-4 text-center text-nowrap">{staffMember?.name}</td>
                    <td className="py-2 px-4 text-center text-nowrap">{staffMember?.email}</td>
                    <td className="py-2 px-4 text-center text-nowrap">{staffMember?.contact}</td>
                    <td className="py-2 px-4 text-center text-nowrap">{staffMember?.qualification}</td>
                    <td className="py-2 px-4 text-center text-nowrap">{staffMember?.designation}</td>
                    <td className="py-2 px-4 text-center text-nowrap">{staffMember?.staffType}</td>
                    <td className="py-2 px-4 text-center text-nowrap">{staffMember?.doj}</td>
                    <td className="py-2 px-4 text-center">{staffMember?.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Staff;
