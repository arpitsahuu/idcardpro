// Import necessary dependencies
"use client";
import React from "react";
import Nav from "../components/Nav";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { deletSchool } from "@/redux/actions/userAction";
import Image from "next/image";

const SchoolList = () => {
  // Fetch schools data from Redux store
  const { schools, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const currdeletSchool = (id) =>{
    dispatch(deletSchool(id))
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Nav />
      <div className="max-w-4xl mx-auto ">
        <h1 className="text-3xl font-bold text-gray-800  pt-20">School List</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-16">
          {/* Loop through schools and display each */}
          {schools?.map((school) => (
            <div key={school._id} className="bg-white rounded-lg shadow-md p-4">
              <Image
                height={50}
                width={50}
                src={school?.logo?.url}
                alt={school?.name}
                className="w-full h-32 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-xl font-semibold mb-2 text-gray-800 truncate">
                {school?.name}
              </h2>
              {school?.contact && (
                <p className="text-sm text-gray-600 mb-2">
                  Contact: {school.contact}
                </p>
              )}
              {school?.code && (
                <p className="text-sm text-gray-600 mb-2">
                  Code: {school.code}
                </p>
              )}
              {school?.address && (
                <p className="text-sm text-gray-600 mb-2">
                  Address: {school.address}
                </p>
              )}
              {school?.requiredFields?.length != 0 && (
                <div>
                  <h6>Required Student Fields</h6>
                  {school?.requiredFields?.map((field, index) => (
                    <p
                      key={index}
                      className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm mr-2 mb-2 inline-block"
                    >
                      {field}
                    </p>
                  ))}
                </div>
              )}

              {school?.requiredFieldsStaff?.length != 0 && (
                <div>
                  <h6>Required Staff Fields</h6>
                  {school?.requiredFieldsStaff?.map((field, index) => (
                    <p
                      key={index}
                      className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm mr-2 mb-2 inline-block"
                    >
                      {field}
                    </p>
                  ))}
                </div>
              )}

              {/* <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                View Details
              </button> */}
              <div className="flex gap-2  ">
                <Link href={`/SchoolList/${school._id}`} className="bg-blue-500 text-xs text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Edit School
                </Link>
                <button className="bg-red-500 text-xs text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={() => currdeletSchool(school._id)}>
                  Delet School
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolList;
