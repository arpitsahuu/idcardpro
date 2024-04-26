"use client"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../components/Nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { aadExcel, aadExcelstaff, submitStudentPhotos } from "@/redux/actions/userAction";
import { useRouter } from "next/navigation";
import axios from "../../../axiosconfig";


const Addexcel = () => {
  const { schools, error } = useSelector((state) => state.user);
  const [currSchool, setCurrSchool] = useState("");
  let [currRole, setCurrRole] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  let currentExcel = {};
  let selectedPhotos = [];

  const handleRoleSelect = (e) => {
    setCurrRole(e.target.value);
  };

  const handleSchoolSelect = (e) => {
    setCurrSchool(e.target.value);
  };

  const handleExcelFileSelect = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file)
    currentExcel = file;
    // Your file handling logic here
  };

  const handleSubmitExcel = async (event) => {
    event.preventDefault();
    // if (resumetem) {
    //   dispatch(uploadResuma(resumetem));
    // } else {
    //   console.warn("No Resuma selected");
    // }
    console.log(currentExcel)
    console.log(currRole)
    if (currentExcel && currRole == "student") {
      const response = await dispatch(aadExcel(currentExcel,currSchool));
      toast.success(response)
    } 
    else if(currentExcel && currRole == "staff"){
      const response = await dispatch(aadExcelstaff(currentExcel,currSchool));
      toast.success(response)
    }
    else {
      toast.error("NO File or School Selected", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handlePhotoFileSelect = (e) => {
    e.preventDefault();
    const files = e.target.files;
    selectedPhotos = [...selectedPhotos, ...files];
    console.log(selectedPhotos)
  };

  const handleSubmitPhotos = async (event) => {
    event.preventDefault();
    if (selectedPhotos.length > 0) {
      // Create a FormData object to store the selected photos
      const formData = new FormData();
      // Append each selected photo to the FormData object
      for (let i = 0; i < selectedPhotos.length; i++) {
        formData.append("file", selectedPhotos[i]);
      }
      // Dispatch an action to handle the submission of the FormData containing the photos
      const response = await dispatch(submitStudentPhotos(formData, currSchool));
      // Reset selected photos
      selectedPhotos=[];
    } else {
      toast.error("No Photos Selected", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // const handleSubmitnowfuntiion = async (event) => {
  //   event.preventDefault();

  //   const formData = new FormData();
  //   selectedPhotos.forEach((file) => {
  //     formData.append('file', file);
  //   });
  //   console.log(formData)

  //   try {
  //     // setLoading(true);
  //     // setError(null);
  //     const response = await axios.post(`/user/student/avatars/${currSchool}`, formData, {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         authorization: `${localStorage.getItem("token")}`,
  //       },
  //     });
  //     console.log(response.data);
  //     // Handle success response
  //   } catch (error) {
  //     console.error('Error uploading photos:', error);
  //   }
  // };

  // const handleSubmitnowfuntiion = async (event) => {
  //   event.preventDefault();
  
  //   const formData = new FormData();
  //   console.log("Selected photos:", selectedPhotos); // Log selectedPhotos array
  //   selectedPhotos.forEach((file, index) => {
  //     // Append each file with a unique key based on its index
  //     formData.append(`file${index}`, file);
  //   });
  //   console.log("FormData:", formData); // Log FormData object after appending files
  
  //   try {
  //     // Your axios post request code...
  //   } catch (error) {
  //     console.error('Error uploading photos:', error);
  //   }
  // };

  const handleSubmitnowfuntiion = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    console.log("Selected photos:", selectedPhotos); // Log selectedPhotos array
    selectedPhotos.forEach((file, index) => {
      // Append each file with a unique key based on its index
      formData.append(`file`, file);
    });
  
    // Log FormData entries
    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    if( currRole = "student"){
      try {
            const response = await axios.post(`/user/student/avatars/${currSchool}`, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
        toast.success(response.data.message)
        selectedPhotos = [];
  
      } catch (error) {
        console.error('Error uploading photos:', error);
      }
    }

  
  };
  


  return (
    <>
      <Nav />
      <section className="bg-white dark:bg-gray-900 py-10 h-[100vh]">
        <div className="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
          <div className="flex items-center justify-center mt-6">
            <a
              href="#"
              className="pb-4 font-medium text-center text-2xl text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
            >
              Add Students With Excel
            </a>
          </div>
          {schools?.length !== 0 && (
            <form className="mt-6 w-full max-w-md">
              <div className="mb-4">
                <label
                  htmlFor="school"
                  className="block text-md text-center font-medium text-gray-700"
                >
                  Select School
                </label>
                <select
                  id="school"
                  onChange={handleSchoolSelect}
                  value={currSchool}
                  className="mt-1 h-10 px-3 border block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select School</option>
                  {schools?.map((school) => (
                    <option key={school._id} value={school._id}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          )}
          {schools?.length === 0 && (
            <h4 className="text-center text-2xl py-2 px-5 text-red-500">
              Please add a School
            </h4>
          )}
          <form className="mt-3 w-full max-w-md">
            <div className="mb-4">
              <label
                htmlFor="Role"
                className="block text-md text-center font-medium text-gray-700"
              >
                Select Role
              </label>
              <select
                id="Role"
                onChange={handleRoleSelect}
                value={currRole}
                className="mt-1 block h-10 border px-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </form>
          {currRole && currSchool &&
          <form className="mt-6 w-full max-w-md" onSubmit={handleSubmitExcel}>
            <label
              htmlFor="excelFile"
              className="flex items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <h2 className="mx-3 text-gray-400">Excel File</h2>
              <input
                id="excelFile"
                type="file"
                className="hidden"
                accept=".xls, .xlsx"
                onChange={handleExcelFileSelect}
              />
            </label>
            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Add Excel
              </button>
            </div>
          </form>
          }
          {currRole && currSchool &&
          <form className="mt-6 w-full max-w-md" onSubmit={handleSubmitnowfuntiion}>
            <label
              htmlFor="dropzone-file"
              className="flex items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <h2 className="mx-3 text-gray-400">Student Profile Photos</h2>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple
                onChange={handlePhotoFileSelect}
              />
            </label>
            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Add Photos
              </button>
            </div>
          </form>
          }
          
        </div>
      </section>
    </>
  );
};

export default Addexcel;
