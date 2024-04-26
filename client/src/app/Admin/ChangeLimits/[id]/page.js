"use client"
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../../../../axiosconfig";

const Limit = ({ params }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [schoolLimit, setSchoolLimit] = useState(1);
  const [studentLimit, setStudentLimit] = useState(2500);
  const [staffLimit, setStaffLimit] = useState(500);

  const config = () => {
    return {
      headers: {
        authorization: localStorage.getItem("token") || "",
      },
      withCredentials: true,
    };
  };

  const searchUser = async () => {
    const id = params ? params.id : null;
    if (id) {
      const response = await axios.post(`/admin/get/user/${id}`, null, config());
      setUser(response.data.user);
      setSchoolLimit(response.data.user.schoolLimit);
      setStudentLimit(response.data.user.studentLimit);
      setStaffLimit(response.data.user.staffLimit);
    }
  };

  useEffect(() => {
    const searchUser = async () => {
      const id = params ? params.id : null;
      if (id) {
        const response = await axios.post(`/admin/get/user/${id}`, null, config());
        setUser(response.data.user);
        setSchoolLimit(response.data.user.schoolLimit);
        setStudentLimit(response.data.user.studentLimit);
        setStaffLimit(response.data.user.staffLimit);
      }
    };
    searchUser();
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = params ? params.id : null;
    if (id) {
      await axios.post(`/admin/update/user/${id}`, { schoolLimit, studentLimit, staffLimit }, config());
      // Optionally, you can update the local state or show a success message upon successful submission
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-semibold py-4 text-gray-800">Edit User Limit</h1>
      {user &&
        <div>
          <h4 className="text-center text-gray-600">{user?.name}</h4>
          <h4 className="text-center text-gray-600">{user?.email}</h4>
        </div>
      }
      {user && (
        <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center">
          <div className="mt-5">
            <label htmlFor="schoolLimit">School Limit:</label>
            <input
              type="number"
              id="schoolLimit"
              value={schoolLimit}
              className="block w-[320px] py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setSchoolLimit(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="studentLimit">Student Limit:</label>
            <input
              type="number"
              id="studentLimit"
              value={studentLimit}
              className="block w-[320px] py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setStudentLimit(e.target.value)}
            />
          </div>
          <div className="mt-5" >
            <label htmlFor="staffLimit" >Staff Limit</label>
            <input
              type="number"
              id="staffLimit"
              value={staffLimit}
              className="block w-[320px] py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setStaffLimit(e.target.value)}
            />
          </div>
          <button type="submit" className="w-[320px] mt-5 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">Save Limits</button>
        </form>
      )}
    </div>
  );
};

export default Limit;
