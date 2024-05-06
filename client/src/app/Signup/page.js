"use client"
import React from 'react'
import { useEffect, useState } from "react"
import { LiaCitySolid } from "react-icons/lia";
import { FaRegBuilding } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { redirect, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '@/redux/actions/userAction';
import Link from 'next/link';
import Image from 'next/image';

const Signup = () => {

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setcontact] = useState("");
  const [city, setcity] = useState("");
  const [district, setdistrict] = useState("");
  const [state, setstate] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, error } = useSelector((state) => state.user);


  useEffect(() => {
    if (user) {
      if(user?.isAdmin){
        redirect("/") 
      }
      redirect('/')
    }
  }, [user]);  

  const SubmitForm = async (e) =>{
    e.preventDefault();
    if(password == confirmpassword) {
      const User = {
        name,
        email,
        city,
        contact,
        district,
        state,
        companyName,
        password,
        confirmpassword,
      };
      const response = await dispatch(registerUser(User));
      if(response == "successfully send mail pleas check your Mail"){
        router.push("/Code")
      }
    } else{

    }
    
    

  }



  return (
    <section className="bg-white dark:bg-gray-900 py-10">
    <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
      <form className="w-full max-w-md " onSubmit={SubmitForm}>
        <div className="flex justify-center mx-auto">
          <Image
            className="w-auto h-16 sm:h-8"
            src="/idcordlogo.jpg"
            alt=""
            height={50}
            width={50}
          />
        </div>
        <div className="flex items-center justify-center mt-6">
          
          <a
            href="#"
            className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-indigo-600 dark:border-blue-400 dark:text-white"
          >
            sign up
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
            placeholder="Name"
            required
            onChange={(e) => setname(e.target.value)}
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
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />
        </div>
        <div className="relative flex items-center mt-8">
          <span className="absolute">
          <IoIosContact className='  text-gray-300 ms-3 text-xl' />
          </span>
          <input
            type="number"
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            required
            onChange={(e) => setcontact(e.target.value)}
            maxlength="10" 
            placeholder="Contact"
          />
        </div>
        <div className="relative flex items-center mt-8">
          <span className="absolute">
          <FaRegBuilding className='  text-gray-300 ms-3 text-xl' />
          </span>
          <input
            type="text"
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            required
            onChange={(e) => setcompanyName(e.target.value)}
            placeholder="companyName"
          />
        </div>
        <div className="relative flex items-center mt-8">
          <span className="absolute">
          <LiaCitySolid  className='  text-gray-300 ms-3 text-xl' />
          </span>
          <input
            type="text"
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="City"
            required
            onChange={(e) => setcity(e.target.value)}
          />
        </div>
        <div className="relative flex items-center mt-8">
          <span className="absolute">
          <LiaCitySolid  className='  text-gray-300 ms-3 text-xl' />
          </span>
          <input
            type="text"
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            required
            onChange={(e) => setdistrict(e.target.value)}
            placeholder="District"
          />
        </div>
        <div className="relative flex items-center mt-8">
          <span className="absolute">
          <LiaCitySolid  className='  text-gray-300 ms-3 text-xl' />
          </span>
          <input
            type="text"
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            required
            onChange={(e) => setstate(e.target.value)}
            placeholder="State"
          />
        </div>
        {/* <label
          htmlFor="dropzone-file"
          className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-300 dark:text-gray-500"
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
          <h2 className="mx-3 text-gray-400">Profile Photo</h2>
          <input id="dropzone-file" type="file" className="hidden" />
        </label> */}
        
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
            required
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Password"
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
            required
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-600 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"  type='Submit'>
            Sign Up
          </button>
          <div className="mt-6 text-center ">
            <Link
              href="/Signin"
              className="text-sm text-indigo-600 hover:underline dark:text-blue-400"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </form>
    </div>
  </section>
  


  )
}

export default Signup