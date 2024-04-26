"use client"
import React, { useEffect, useState } from "react";
import Layout from "@/app/components/Admin/Layout";
import axios from "../../../../axiosconfig";
import Image from "next/image";

function Students() {
  const [students, setStudents] = useState([]);

  const config = () => {
    return {
      headers: {
        'authorization': localStorage.getItem('token') || ''
      },
      withCredentials: true
    };
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.post(`/admin/students`, null, config());
        setStudents(response.data.students);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchStudents();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <Layout>
      <div className="main">
        <div className="dashboard">
          <div id="right-dashboard">
            <div className="nav flex items-center justify-between w-full py-4 px-6 border-b-2 border-gray-200">
              <div className="left flex items-center gap-3">
                <h1 className="font-semibold"> Students</h1>
              </div>
            </div>
          </div>
          <div className="w-[70vw] h-[70vh] mt-8 overflow-x-auto overflow-y-auto">
            <table className="border rounded-lg overflow-hidden">
              <thead className="bg-indigo-600 text-white">
                <tr>
                <th className="py-2 px-4 font-semibold text-nowrap">Roll No</th>
                  <th className="py-2 px-4 font-semibold text-nowrap">Name</th>
                  <th className="py-2 px-4 font-semibold text-nowrap">Father Name</th>
                  <th className="py-2 px-4 font-semibold text-nowrap">Contact</th>
                  <th className="py-2 px-4 font-semibold text-nowrap">Class</th>
                  <th className="py-2 px-4 font-semibold text-nowrap">Email</th>
                  
                  <th className="py-2 px-4 font-semibold text-nowrap">Section</th>
                  <th className="py-2 px-4 font-semibold text-nowrap">Session</th>
                  <th className="py-2 px-4 font-semibold text-nowrap">Admission No</th>
                  <th className="py-2 px-4 font-semibold text-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="">
                { students && students?.map((student, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-indigo-100" : "bg-white"}>
                    <td className="py-2 px-4 text-center text-nowrap">{student?.rollNo}</td>
                    <td className="py-2 px-4 text-center text-nowrap">{student?.name}</td>
                    <td className="py-2 px-4 text-center text-nowrap">{student?.fatherName}</td>
                    <td className="py-2 px-4 text-center text-nowrap">{student?.contact}</td>
                    <td className="py-2 px-4 text-center text-nowrap">{student?.class}</td>
                    <td className="py-2 px-4 text-center text-nowrap">{student?.email}</td>
                    <td className="py-2 px-4 text-center text-nowrap">{student?.section}</td>
                    <td className="py-2 px-4 text-center text-nowrap">{student?.session}</td>
                    <td className="py-2 px-4 text-center text-nowrap">{student?.admissionNo}</td>
                    <td className="py-2 px-4 text-center text-nowrap">{student?.status}</td>
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

export default Students;
