"use client";
import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import axios from "../../../axiosconfig";
import JSZip from "jszip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";

const Viewdata = () => {
  const { user, schools, error } = useSelector((state) => state.user);
  const [currSchool, setCurrSchool] = useState("");
  const [currRole, setCurrRole] = useState("");
  const [status, setstatus] = useState("");
  const [submitted, setsubmited] = useState(false);
  const [students, setstudents] = useState(null);
  const [staffs, setstaffs] = useState(null);
  const [showChatBox, setShowChatBox] = useState(false);
  const [studentIds, setStudentIds] = useState([]);
  const [staffIds, setStaffIds] = useState([]);
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [loginSchool, setloginSchool] = useState(false);
  const [classValue, setClassValue] = useState("");
  const [sectionValue, setSectionValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      redirect("/");
    }
    if (user?.role == "school") {
      console.log(user?.school);
      setCurrSchool(user?.school?._id);
      setloginSchool(true);
    }
  }, [user]);

  // Function to handle selection of a student
  const handleStudentSelect = (studentId) => {
    // Check if the studentId is already in the array
    if (studentIds.includes(studentId)) {
      // If yes, remove it from the array
      setStudentIds(studentIds.filter((id) => id !== studentId));
    } else {
      // If not, add it to the array
      setStudentIds([...studentIds, studentId]);
    }
  };

  const handleStaffSelect = (staffId) => {
    // Check if the studentId is already in the array
    if (staffIds.includes(staffId)) {
      // If yes, remove it from the array
      setStaffIds(staffIds.filter((id) => id !== staffId));
    } else {
      // If not, add it to the array
      setStaffIds([...staffIds, staffId]);
    }
  };

  const config = () => {
    return {
      headers: {
        authorization: localStorage.getItem("token") || "", // Ensure token is always a string
      },
      withCredentials: true,
    };
  };

  const modeToPending = async (e) => {
    e.preventDefault();
    if (currRole == "student") {
      const response = await axios.post(
        `/user/student/change-status/pending/${currSchool}?`,
        { studentIds },
        config()
      );
      fatchStudent(e);
    }
    if (currRole == "staff") {
      const response = await axios.post(
        `/user/staff/change-status/pending/${currSchool}?`,
        { staffIds },
        config()
      );
      fatchStaff(e);
    }
  };

  const modeToReadytoprint = async (e) => {
    e.preventDefault();
    if (currRole == "student") {
      const response = await axios.post(
        `/user/student/change-status/readyto/${currSchool}?`,
        { studentIds },
        config()
      );
      fatchStudent(e);
    }
    if (currRole == "staff") {
      const response = await axios.post(
        `/user/staff/change-status/readyto/${currSchool}?`,
        { staffIds },
        config()
      );
      fatchStaff(e);
    }
  };

  const modeToPrinted = async (e) => {
    e.preventDefault();
    if (currRole == "student") {
      const response = await axios.post(
        `/user/student/change-status/printed/${currSchool}?`,
        { studentIds },
        config()
      );
      fatchStudent(e);
    }
    if (currRole == "staff") {
      const response = await axios.post(
        `/user/staff/change-status/printed/${currSchool}?`,
        { staffIds },
        config()
      );
      fatchStaff(e);
    }
  };

  const searchUsers = async () => {
    const response = await axios.post(`/admin/users`, null, config());
    setUsers(response?.data?.users);
    console.log(response?.data?.users);
  };

  const handleRoleSelect = (e) => {
    setCurrRole(e.target.value);
  };

  const handleStatusSelect = (e) => {
    setstatus(e.target.value);
  };

  const handleSchoolSelect = (e) => {
    setCurrSchool(e.target.value);
  };

  // Function to toggle chat box visibility
  const toggleChatBox = () => {
    setShowChatBox(!showChatBox);
  };

  const fatchStudent = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `/user/students/${currSchool}?status=${status}`,
      null,
      config()
    );
    setstudents(response?.data?.students);
    if (response?.data?.students?.length < 0) {
      toast.error("No Students Added", {
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

  const fatchStaff = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `/user/staffs/${currSchool}?status=${status}`,
      null,
      config()
    );
    setstaffs(response?.data?.staff);
    console.log(response?.data?.staff);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (currRole == "student") {
      const response = await axios.post(
        `/user/students/${currSchool}?status=${status}`,
        null,
        config()
      );
      if (
        response?.data?.message ==
        "No students found for the provided school ID"
      ) {
        toast.error("No Students Added In This School", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      setstudents(response?.data?.students);
      console.log(response?.data?.students);
      setsubmited(true);
    }
    if (currRole == "staff") {
      const response = await axios.post(
        `/user/staffs/${currSchool}?status=${status}`,
        null,
        config()
      );
      if (
        response?.data?.message == "No staff found for the provided school ID"
      ) {
        toast.error("No Staff Member Added In This School", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      setstaffs(response?.data?.staff);
      console.log(response?.data?.staff);
      setsubmited(true);
    }
  };

  const downloadExcel = async () => {
    try {
      if (currRole == "student") {
        try {
          const response = await axios.get(
            `/user/excel/data/${currSchool}?status=${status}`,
            {
              headers: {
                authorization: `${localStorage.getItem("token")}`,
              },
              responseType: "blob", // Set response type to blob for file download
            }
          );

          const url =
            window.URL.createObjectURL(new Blob([response.data])) || null;
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Student_Data.xlsx");
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          toast.error("Error downloading Excel file:", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
      if (currRole == "staff") {
        try {
          const response = await axios.get(
            `/user/staff/excel/data/${currSchool}?status=${status}`,
            {
              headers: {
                authorization: `${localStorage.getItem("token")}`,
              },
              responseType: "blob", // Set response type to blob for file download
            }
          );

          const url =
            window.URL.createObjectURL(new Blob([response.data])) || null;
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Student_Data.xlsx");
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          toast.error("Error downloading Excel file:", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  // const downloadStudentAvatars = async () => {
  //   try {
  //     console.log("downlod image");
  //     // Make a POST request to the backend route that fetches student avatars
  //     const response = await axios.post(
  //       `/user/student/images/${currSchool}`,
  //       { status },
  //       config()
  //     );
  //     const { studentImages } = response.data;
  //     const zip = new JSZip();

  //     // Iterate over each image URL
  //     studentImages.forEach((imageUrl, index) => {
  //       // Fetch each image
  //       fetch(imageUrl)
  //         .then((response) => response.blob())
  //         .then((blob) => {
  //           // Add each image to the zip file
  //           zip.file(`image_${index}.jpg`, blob);
  //         });
  //     });

  //     // Generate the zip file asynchronously
  //     zip.generateAsync({ type: "blob" }).then((blob) => {
  //       // Trigger the download of the zip file
  //       const link = document.createElement("a");
  //       link.href = URL.createObjectURL(blob);
  //       link.download = "student_images.zip";
  //       link.click();
  //     });
  //   } catch (error) {
  //     console.error("Error downloading student avatars:", error);
  //     // Handle error
  //   }
  // };

  const downloadImages = async () => {
    try {
      console.log("call");
      const response = await axios.post(
        `/user/student/images/${currSchool}`,
        { status },
        config()
      );

      const responseData = response?.data;
      const studentImages = responseData?.studentImages;
      console.log(studentImages);

      studentImages.forEach(async (imageUrl) => {
        const folderName = "Pending Student Images";
        await downloadImage(imageUrl, folderName);
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const downloadImage = async (imageUrl) => {
    try {
      // const response = await axios.get(imageUrl, {
      //   responseType: "blob",
      // });

      // const blob = new Blob([response?.data], {
      //   type: response.headers["content-type"],
      // });
      const url = window.URL.createObjectURL(new Blob([imageUrl])) || null;
      const a = document.createElement("a");
      a.href = url;
      a.download = imageUrl.split("/").pop();
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const redirectToStudentEdit = (id) => {
    router.push(`/Viewdata/edit/${id}`);
  };

  const redirectToStaffEdit = (id) => {
    router.push(`/Viewdata/staffedit/${id}`);
  };

  return (
    <div>
      <Nav />
      <section className="bg-white dark:bg-gray-900 py-10 ">
        {!submitted && (
          <div className="container flex flex-col items-center justify-center px-6 mx-auto">
            <div className="flex items-center justify-center mt-6">
              <a
                href="#"
                className="pb-4 font-medium text-center text-2xl text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
              >
                View Data
              </a>
            </div>
            {user && (
              <form
                className="mt-6 w-full max-w-md"
                onSubmit={handleFormSubmit}
              >
                {!loginSchool && schools?.length !== 0 && (
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
                )}
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
                <div className="mb-4">
                  <label
                    htmlFor="Role"
                    className="block text-md text-center font-medium text-gray-700"
                  >
                    Select Status
                  </label>
                  <select
                    id="Role"
                    onChange={handleStatusSelect}
                    value={status}
                    className="mt-1 block h-10 border px-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select Status</option>
                    <option value="Panding">Pending</option>
                    <option value="Ready to print">Ready to print</option>
                    <option value="Printed">Printed</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 text-white bg-primary-600 bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  View Data
                </button>
              </form>
            )}
            {!loginSchool && schools?.length === 0 && (
              <h4 className="text-center text-2xl py-2 px-5 text-red-500">
                Please add a School
              </h4>
            )}
            <form
              className="mt-3 w-full max-w-md"
              onSubmit={handleFormSubmit}
            ></form>
            <form className="mt-3 w-full max-w-md"></form>
          </div>
        )}
        {submitted && students?.length > 0 && (
          <div className="container mx-auto px-16 ">
            <h1 className="text-center text-2xl py-10 font-semibold text-gray-800">
              Students
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {students?.map((student) => (
                <div
                  key={student?._id}
                  className={`shadow-md p-4 rounded-md border w-full bg-indigo-50 ${
                    studentIds.includes(student._id)
                      ? "border-blue-500"
                      : "border-indigo-50"
                  }`}
                  onClick={() => handleStudentSelect(student._id)}
                >
                  <div className="flex justify-center mb-2">
                    {/* Display student avatar */}
                    {/* <Image
                    height={80}
                    width={80}
                    src={student?.avatar?.url}
                    alt={student?.name}
                    className="w-20 h-20 rounded-full"
                    ></Image> */}
                    <Image
                      height={50}
                      width={50}
                      src={student?.avatar?.url}
                      alt={student?.name}
                      className="w-20 h-20 "
                    />
                    {/* <Image
                      
                    /> */}
                  </div>
                  {/* Render student card resembling ID card */}
                  <h2 className="text-lg font-medium text-gray-700 text-center py-2">
                    {student?.name}
                  </h2>
                  {student?.fatherName && (
                    <h6 className="text-gray-700">
                      Father&apos;s Name: {student?.fatherName}
                    </h6>
                  )}
                  {student?.motherName && (
                    <p className="text-gray-700">
                      Mother&apos;s Name: {student?.motherName}
                    </p>
                  )}
                  {student?.dob && (
                    <p className="text-gray-700">
                      Date of Birth: {student?.dob}
                    </p>
                  )}
                  {student?.contact && (
                    <p className="text-gray-700">Contact: {student?.contact}</p>
                  )}
                  {student?.email && (
                    <p className="text-gray-700">Email: {student?.email}</p>
                  )}
                  {student?.address && (
                    <p className="text-gray-700">Address: {student?.address}</p>
                  )}
                  {student?.rollNo && (
                    <p className="text-gray-700">Roll No.: {student?.rollNo}</p>
                  )}
                  {student?.class && (
                    <p className="text-gray-700">Class: {student?.class}</p>
                  )}
                  {student?.section && (
                    <p className="text-gray-700">Section: {student?.section}</p>
                  )}
                  {student?.session && (
                    <p className="text-gray-700">Session: {student?.session}</p>
                  )}
                  {student?.admissionNo && (
                    <p className="text-gray-700">
                      Admission No.: {student?.admissionNo}
                    </p>
                  )}
                  {student?.busNo && (
                    <p className="text-gray-700">Bus No.: {student?.busNo}</p>
                  )}
                  {student?.bloodGroup && (
                    <p className="text-gray-700">
                      Blood Group: {student?.bloodGroup}
                    </p>
                  )}
                  {student?.studentID && (
                    <p className="text-gray-700">
                      Student ID: {student?.studentID}
                    </p>
                  )}
                  {student?.aadharNo && (
                    <p className="text-gray-700">
                      Aadhar No.: {student?.aadharNo}
                    </p>
                  )}
                  {student?.ribbionColour && (
                    <p className="text-gray-700">
                      Ribbon Colour: {student?.ribbionColour}
                    </p>
                  )}
                  {student?.routeNo && (
                    <p className="text-gray-700">
                      Route No.: {student?.routeNo}
                    </p>
                  )}
                   <div className="w-full flex justify-center items-center mt-2">
                    {status == "Panding" && (
                      <button
                        onClick={() => redirectToStudentEdit(student._id)}
                        className="px-5 py-1 bg-indigo-600 text-white m-auto rounded-md"
                      >
                        edit
                      </button>
                    )}
                    <button onClick={() => downloadImage(student?.avatar?.url)}>download</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {submitted && staffs?.length > 0 && (
          <div className="container mx-auto">
            <h1 className="text-center text-2xl py-10 font-semibold text-gray-800">
              Staff
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {staffs?.map((staff) => (
                <div
                  key={staff?._id}
                  className={`shadow-md p-4 rounded-md border w-full bg-indigo-50 ${
                    staffIds.includes(staff._id)
                      ? "border-blue-500"
                      : "border-indigo-50"
                  }`}
                  onClick={() => handleStaffSelect(staff._id)}
                  // onClick={() => console.log("hello")}
                >
                  <div className="flex justify-center mb-2">
                    <Image
                      height={50}
                      width={50}
                      src={staff?.avatar?.url}
                      alt={staff?.name}
                      className="w-20 h-20"
                    />
                  </div>
                  <h2 className="text-lg font-medium text-gray-700 text-center py-2">
                    {staff?.name}
                  </h2>
                  {staff?.fatherName && (
                    <p className="text-gray-700">
                      Father&apos;s Name: {staff?.fatherName}
                    </p>
                  )}
                  {staff?.husbandName && (
                    <p className="text-gray-700">
                      Husband&apos;s Name: {staff?.husbandName}
                    </p>
                  )}
                  {staff?.dob && (
                    <p className="text-gray-700">Date of Birth: {staff?.dob}</p>
                  )}
                  {staff?.contact && (
                    <p className="text-gray-700">Contact: {staff?.contact}</p>
                  )}
                  {staff?.email && (
                    <p className="text-gray-700">Email: {staff?.email}</p>
                  )}
                  {staff?.address && (
                    <p className="text-gray-700">Address: {staff?.address}</p>
                  )}
                  {staff?.qualification && (
                    <p className="text-gray-700">
                      Qualification: {staff?.qualification}
                    </p>
                  )}
                  {staff?.designation && (
                    <p className="text-gray-700">
                      Designation: {staff?.designation}
                    </p>
                  )}
                  {staff?.staffType && (
                    <p className="text-gray-700">
                      Staff Type: {staff?.staffType}
                    </p>
                  )}
                  {staff?.doj && (
                    <p className="text-gray-700">
                      Date of Joining: {staff?.doj}
                    </p>
                  )}
                  {staff?.uid && (
                    <p className="text-gray-700">UID: {staff?.uid}</p>
                  )}
                  {staff?.staffID && (
                    <p className="text-gray-700">Staff ID: {staff?.staffID}</p>
                  )}
                  {staff?.udiseCode && (
                    <p className="text-gray-700">
                      UDISE Code: {staff?.udiseCode}
                    </p>
                  )}
                  {staff?.schoolName && (
                    <p className="text-gray-700">
                      School Name: {staff?.schoolName}
                    </p>
                  )}
                  {staff?.bloodGroup && (
                    <p className="text-gray-700">
                      Blood Group: {staff?.bloodGroup}
                    </p>
                  )}
                  {staff?.dispatchNo && (
                    <p className="text-gray-700">
                      Dispatch No.: {staff?.dispatchNo}
                    </p>
                  )}
                  {staff?.dateOfissue && (
                    <p className="text-gray-700">
                      Date of Issue: {staff?.dateOfissue}
                    </p>
                  )}
                  {staff?.ihrmsNo && (
                    <p className="text-gray-700">IHRMS No.: {staff?.ihrmsNo}</p>
                  )}
                  {staff?.beltNo && (
                    <p className="text-gray-700">Belt No.: {staff?.beltNo}</p>
                  )}
                  {staff?.photoName && (
                    <p className="text-gray-700">
                      Photo Name: {staff?.photoName}
                    </p>
                  )}

                  {/* Add more staff details as required */}
                  <div className="w-full flex justify-center items-center mt-2">
                    {status == "Panding" && (
                      <button
                        onClick={() => redirectToStaffEdit(staff._id)}
                        className="px-5 py-1 bg-indigo-600 text-white m-auto rounded-md"
                      >
                        edit
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      <div>
        {/* Chat Box Button */}
        {submitted && (
          <button
            className="fixed bottom-4 left-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg"
            onClick={toggleChatBox}
          >
            More
          </button>
        )}

        {/* List of Buttons in Chat Box */}
        {showChatBox && (
          <div className="fixed bottom-16 left-4 flex flex-col gap-2">
            {status != "Printed" && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                onClick={modeToPrinted}
              >
                More to Printed
              </button>
            )}
            {status != "Ready to print" && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                onClick={modeToReadytoprint}
              >
                More to Ready to Print
              </button>
            )}
            {status != "Panding" && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                onClick={modeToPending}
              >
                More to Pending
              </button>
            )}
            {user?.exportExcel && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                onClick={downloadExcel}
              >
                Export Excel
              </button>
            )}
            {user?.exportImage && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg"
                onClick={downloadImages}
              >
                Export Images
              </button>
            )}
          </div>
        )}
        { submitted && currRole == "student" && 
        <button
          className="px-5 py-2 bg-gray-500 text-white rounded-full fixed right-20 bottom-5  "
          onClick={() => setShowFilterBox(!showFilterBox)}
        >
          Filter
        </button>}
        {/* <button
          className="bg-green-500 text-white py-2 px-4 rounded-full shadow-lg"
          onClick={() => setShowFilterBox(!showFilterBox)}
        >
          Filter
        </button> */}
        {/* { submitted &&  (
          <button
          className="bg-green-500 text-white py-2 px-4 rounded-full shadow-lg"
          onClick={() => setShowFilterBox(!showFilterBox)}
        >
          Filter
        </button>
        )} */}
        {showFilterBox && (
          <div className="flex flex-col fixed right-[55px] bottom-20 z-10 px-5 py-5 rounded-md ">
            <form>
              <input
                type="text"
                placeholder="Class"
                className=" w-20 block border py-1 px-3 my-1 border-gray-400 rounded-md"
                value={classValue}
                onChange={(e) => setClassValue(e.target.value)}
              />
              <input
                type="text"
                placeholder="Section"
                value={sectionValue}
                className=" w-20 block border py-1 px-3 my-1 border-gray-400 rounded-md"
                onChange={(e) => setSectionValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-5 py-1 rounded-full m-auto mt-2 "
              >
                Filter
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewdata;
