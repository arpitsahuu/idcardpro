"use client";

import React, { useState } from "react";
import { RiContactsBook2Line } from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa";
import Nav from "../components/Nav";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addSchool } from "@/redux/actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSchool = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [requiredFields, setRequiredFields] = useState(["Student Name"]);
  const [requiredFieldsStaff, setrequiredFieldsStaff] = useState(["Name"]);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setRequiredFields((prevFields) => [...prevFields, name]);
    } else {
      setRequiredFields((prevFields) =>
        prevFields.filter((field) => field !== name)
      );
    }
  };

  const handleStaffChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setrequiredFieldsStaff((prevFields) => [...prevFields, name]);
    } else {
      setrequiredFieldsStaff((prevFields) =>
        prevFields.filter((field) => field !== name)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can use the state variables (name, email, etc.) to submit the form data
    console.log(requiredFields);
    console.log(requiredFieldsStaff);
    const data = {
      name,
      email,
      contact,
      address,
      code,
      password,
      confirmPassword,
      requiredFields,
      requiredFieldsStaff,
    };
    console.log(data);
    // Add your form submission logic here
    const response = await dispatch(addSchool(data));
    console.log(response);
    if (response == "successfully Register") {
      toast.success(response, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push("/");
    } else {
      toast.error(response, {
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

  return (
    <>
      <Nav />
      <section className="bg-white dark:bg-gray-900 py-10">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center mt-6">
              <a
                href="#"
                className="w-1/3 pb-4 font-medium text-center text-2xl text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
              >
                Add School
              </a>
            </div>
            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="School Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative flex items-center mt-6">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                type="email"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <RiContactsBook2Line className="text-gray-300 ms-3 text-xl" />
              </span>
              <input
                type="text"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <FaRegAddressCard className="text-gray-300 ms-3 text-xl" />
              </span>
              <input
                type="text"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                type="password"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                type="password"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <h2 className="mt-5 font-semibold text-xl ">
              Student Required Fields
            </h2>
            <div className="mt-1 flex flex-col space-x-4">
              <label
                htmlFor="studentName"
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="studentName"
                  name="Student Name"
                  checked={requiredFields.includes("Student Name")}
                />
                <span className="text-gray-600">Student Name</span>
              </label>
              <label htmlFor="email" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="email"
                  name="Email"
                  checked={requiredFields.includes("Email")}
                  onChange={handleChange}
                />
                <span className="text-gray-600">Email</span>
              </label>
              <label htmlFor="contact" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="contact"
                  name="Contact No."
                  checked={requiredFields.includes("Contact No.")}
                  onChange={handleChange}
                />
                <span className="text-gray-600">Contact No.</span>
              </label>
              <label
                htmlFor="fatherName"
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="fatherName"
                  name="Father&apos;s Name"
                  checked={requiredFields.includes("Father's Name")}
                  onChange={handleChange}
                />
                <span className="text-gray-600">Father&apos;s Name</span>
              </label>
              <label
                htmlFor="motherName"
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="motherName"
                  name="Mother&apos;s Name"
                  checked={requiredFields.includes("Mother's Name")}
                  onChange={handleChange}
                />
                <span className="text-gray-600">Mother&apos;s Name</span>
              </label>
              <label htmlFor="dob" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="dob"
                  name="Date of Birth"
                  checked={requiredFields.includes("Date of Birth")}
                  onChange={handleChange}
                />
                <span className="text-gray-600">Date of Birth</span>
              </label>
              <label htmlFor="address" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="address"
                  name="Address"
                  checked={requiredFields.includes("Address")}
                  onChange={handleChange}
                />
                <span className="text-gray-600">Address</span>
              </label>
              <label htmlFor="class" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="class"
                  name="Class"
                  checked={requiredFields.includes("Class")}
                  onChange={handleChange}
                />
                <span className="text-gray-600">Class</span>
              </label>
              <label htmlFor="rollNo" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rollNo"
                  name="Roll No."
                  checked={requiredFields.includes("Roll No.")}
                  onChange={handleChange}
                />
                <span className="text-gray-600">Roll No.</span>
              </label>
              <label
                htmlFor="admissionNo"
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="admissionNo"
                  name="Admission No."
                  checked={requiredFields.includes("Admission No.")}
                  onChange={handleChange}
                />
                <span className="text-gray-600">Admission No.</span>
              </label>
              <label
                htmlFor="studentID"
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="studentID"
                  name="Student ID"
                  checked={requiredFields.includes("Student ID")}
                  onChange={handleChange}
                />
                <span className="text-gray-600">Student ID</span>
              </label>
              <label htmlFor="aadharNo" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="aadharNo"
                  name="Aadhar No."
                  checked={requiredFields.includes("Aadhar No.")}
                  onChange={handleChange}
                />
                <span className="text-gray-600">Aadhar No.</span>
              </label>
              <label
                htmlFor="ribbonColour"
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="ribbonColour"
                  name="Ribbon Colour"
                  checked={requiredFields.includes("Ribbon Colour")}
                  onChange={handleChange}
                />
                <span className="text-gray-600">Ribbon Colour</span>
              </label>
              <label htmlFor="routeNo" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="routeNo"
                  name="Route No."
                  checked={requiredFields.includes("Route No.")}
                  onChange={handleChange}
                />
                <span className="text-gray-600">Route No.</span>
              </label>
              <label
                htmlFor="modeOfTransport"
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="modeOfTransport"
                  name="Mode of Transport"
                  checked={requiredFields.includes("Mode of Transport")}
                  onChange={handleChange}
                />
                <span className="text-gray-600">Mode of Transport</span>
              </label>
              {/* Add more checkboxes for additional fields here */}
            </div>

            <h2 className="mt-5 font-semibold text-xl">
              Staff Required Fields
            </h2>
            <div className="mt-1 flex flex-col space-x-4">
              <label htmlFor="name" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="name"
                  name="Name"
                  checked={requiredFieldsStaff.includes("Name")}
                />
                <span className="text-gray-600">Name</span>
              </label>
              <label htmlFor="email" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="email"
                  name="E-mail"
                  checked={requiredFieldsStaff.includes("E-mail")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">Email</span>
              </label>
              <label htmlFor="contact" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="contact"
                  name="Contact No."
                  checked={requiredFieldsStaff.includes("Contact No.")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">Contact</span>
              </label>
              <label
                htmlFor="fatherName"
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="fatherName"
                  name="Father&apos;s Name"
                  checked={requiredFieldsStaff.includes("Father's Name")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">Father&apos;s Name</span>
              </label>
              <label
                htmlFor="husbandName"
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="husbandName"
                  name="Husband&apos;s Name"
                  checked={requiredFieldsStaff.includes("Husband's Name")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">Husband&apos;s Name</span>
              </label>
              <label htmlFor="dob" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="dob"
                  name="Date of Birth"
                  checked={requiredFieldsStaff.includes("Date of Birth")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">Date of Birth</span>
              </label>
              <label
                htmlFor="qualification"
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="qualification"
                  name="Qualification"
                  checked={requiredFieldsStaff.includes("Qualification")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">Qualification</span>
              </label>
              <label
                htmlFor="designation"
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="designation"
                  name="Designation"
                  checked={requiredFieldsStaff.includes("Designation")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">Designation</span>
              </label>
              <label htmlFor="doj" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="doj"
                  name="Date of Joining"
                  checked={requiredFieldsStaff.includes("Date of Joining")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">Date of Joining</span>
              </label>
              <label
                htmlFor="staffType"
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="staffType"
                  name="Staff Type"
                  checked={requiredFieldsStaff.includes("Staff Type")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">Staff Type</span>
              </label>
              <label htmlFor="address" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="address"
                  name="Address"
                  checked={requiredFieldsStaff.includes("Address")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">Address</span>
              </label>
              <label htmlFor="UIDNo" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="UIDNo"
                  name="UID No."
                  checked={requiredFieldsStaff.includes("UID No.")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">UID No.</span>
              </label>
              <label htmlFor="staffID" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="staffID"
                  name="Staff ID"
                  checked={requiredFieldsStaff.includes("Staff ID")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">Staff ID</span>
              </label>
              <label
                htmlFor="UDISECode"
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="UDISECode"
                  name="UDISE Code"
                  checked={requiredFieldsStaff.includes("UDISE Code")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">UDISE Code</span>
              </label>
              <label
                htmlFor="officeName"
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="officeName"
                  name="Office Name"
                  checked={requiredFieldsStaff.includes("Office Name")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">Office Name</span>
              </label>
              <label
                htmlFor="bloodGroup"
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="bloodGroup"
                  name="Blood Group"
                  checked={requiredFieldsStaff.includes("Blood Group")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">Blood Group</span>
              </label>
              <label
                htmlFor="dispatchNo"
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="dispatchNo"
                  name="Dispatch No."
                  checked={requiredFieldsStaff.includes("Dispatch No.")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">Dispatch No.</span>
              </label>
              <label htmlFor="doi" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="doi"
                  name="Date of Issue"
                  checked={requiredFieldsStaff.includes("Date of Issue")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">Date of Issue</span>
              </label>
              <label htmlFor="IHRMSNo" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="IHRMSNo"
                  name="IHRMS No."
                  checked={requiredFieldsStaff.includes("IHRMS No.")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">IHRMS No.</span>
              </label>
              <label htmlFor="beltNo" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="beltNo"
                  name="Belt No."
                  checked={requiredFieldsStaff.includes("Belt No.")}
                  onChange={handleStaffChange}
                />
                <span className="text-gray-600">Belt No.</span>
              </label>

              {/* Add more checkboxes for additional fields here */}
            </div>

            <button className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Add School
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddSchool;
``