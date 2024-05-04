"use client"
import React, { useState, useEffect } from 'react';
import Nav from '../../../components/Nav';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, editStudent, updateSchool } from '@/redux/actions/userAction';
import { RiContactsBook2Line } from 'react-icons/ri';
import { FaRegAddressCard } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from '../../../../../axiosconfig';

const EditStudent = ({ params }) => {
  const [currSchool,setcurrschool] = useState()
  const [currRole, setCurrRole] = useState("");
  const [husbandName, setHusbandName] = useState("");
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [session, setSession] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [busNo, setBusNo] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [studentID, setStudentID] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [ribbionColour, setRibbionColour] = useState("");
  const [routeNo, setRouteNo] = useState("");
  const [modeOfTransport, setmodeOfTransport] = useState("");
  const [ID, setID] = useState("");

  

  const router = useRouter();
  const dispatch = useDispatch();
  const StudentlId  = params ? params?.id : null; // Assuming you have a route 


  // Assuming you have stored the school data in your Redux store
  const { user, schools, error } = useSelector((state) => state.user);

  useEffect(() => {
    const studentId  = params ? params.id : null;
    const factchstudent = async () =>{
        const config = () => {
            return {
              headers: {
                authorization: localStorage.getItem("token") || "", // Ensure token is always a string
              },
              withCredentials: true,
            };
          };
      const response = await axios.get(`/user/student/${studentId}`, config())
      const temuser = response.data.student;
      console.log(temuser)
      if(temuser){
          setID(temuser?._id)
          setName(temuser?.name);
          setFatherName(temuser?.fatherName);
          setMotherName(temuser?.motherName);
          setDob(temuser?.dob);
          setContact(temuser?.contact);
          setEmail(temuser?.email);
          setAddress(temuser?.address);
          setRollNo(temuser?.rollNo);
          setStudentClass(temuser?.class);
          setSection(temuser?.section);
          setSession(temuser?.session);
          setAdmissionNo(temuser?.admissionNo);
          setBusNo(temuser?.busNo);
          setBloodGroup(temuser?.bloodGroup);
          setStudentID(temuser?.studentID);
          setAadharNo(temuser?.aadharNo);
          setRibbionColour(temuser?.ribbionColour);
          setRouteNo(temuser?.routeNo);
      }
      if(user?.role == "school"){
        setcurrschool(user?.school);
      } else{
        let school = schools?.find((school) => school?._id == temuser?.school)
        console.log(school)
        setcurrschool(school) ;
      }
    }
    factchstudent();

    

  }, [user]);

  // if (currSchool) {
  //   setName(currSchool.name);
  //   setEmail(currSchool.email);
  //   setContact(currSchool.contact);
  //   address(currSchool.address);
  //   setCode(currSchool.code);
  //   setRequiredFields(currSchool.requiredFields);
  //   setrequiredFieldsStaff(currSchool.requiredFieldsStaff);
  // }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("sumit")

    // Create an empty object to store form data
    const formData = {
      name,
    };

    // Add values to formData only if they are not empty
    if (fatherName) formData.fatherName = fatherName;
    if (motherName) formData.motherName = motherName;
    if (dob) formData.dob = dob;
    if (contact) formData.contact = contact;
    if (email) formData.email = email;
    if (address) formData.address = address;
    if (rollNo) formData.rollNo = rollNo;
    if (studentClass) formData.class = studentClass;
    if (section) formData.section = section;
    if (session) formData.session = session;
    if (admissionNo) formData.admissionNo = admissionNo;
    if (busNo) formData.busNo = busNo;
    if (bloodGroup) formData.bloodGroup = bloodGroup;
    if (studentID) formData.studentID = studentID;
    if (aadharNo) formData.aadharNo = aadharNo;
    if (ribbionColour) formData.ribbionColour = ribbionColour;
    if (routeNo) formData.routeNo = routeNo;
    // Add other student schema fields here

    // Log formData
    console.log(formData);
    console.log(ID)
    console.log(StudentlId,"param")

    // Dispatch action to add student with formData
    const response = await dispatch(editStudent(formData, ID));
    console.log(response);

    if (response == "Student updated successfully") {
      toast.success(response, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Clear all form values after dispatching the form
      router.push("/")
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Here you can use the state variables (name, email, etc.) to update the school data
//     const updatedSchoolData = {
//       name,
//       email,
//       contact,
//       address,
//       code,
//       requiredFields,
//       requiredFieldsStaff,
//     };
//     // Dispatch action to update school data
//     const response = await dispatch(updateSchool(updatedSchoolData,ID));
//     if(response == "School updated successfully"){
//       toast.success(response, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//       router.push("/SchoolList");
//     } else{
//       toast.error(response, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   };

// const submit = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior
//     console.log("submit");
  
//     // Here you can perform any form validation or data processing before submitting
  
//     // For now, you can log the form data
//     console.log({
//       name,
//       fatherName,
//       motherName,
//       dob,
//       contact,
//       email,
//       address,
//       rollNo,
//       studentClass,
//       section,
//       session,
//       admissionNo,
//       busNo,
//       bloodGroup,
//       studentID,
//       aadharNo,
//       ribbionColour,
//       routeNo,
//       modeOfTransport,
//     });
  
//     // If you need to dispatch any actions or make API requests, you can do that here
  
//     // For example:
//     // const response = await dispatch(editStudent(formData, ID));
//     // console.log(response);
  
//     // After form submission, you might want to navigate to another page
//     // For example:
//     // router.push("/");
  
//     // Ensure to handle any errors or success messages accordingly
//   };
  
  

  return (
    <>
      <Nav />
      <section className="bg-white dark:bg-gray-900 py-10 w-full flex justify-center items-center pt-16 ">
     
            <div className="w-[320px]">
              <form action="mt-3 w-[320px] " onSubmit={handleFormSubmit}>
                <h3 className="text-center text-xl py-3 border-b-2 mb-4 border-indigo-500">
                  Edit Student
                </h3>

                <div className="mb-4 w-[320px]">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Student Name"
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                {currSchool?.requiredFields?.includes("Father's Name") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="fatherName"
                      value={fatherName}
                      placeholder="Father Name"
                      onChange={(e) => setFatherName(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Mother's Name") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="motherName"
                      value={motherName}
                      placeholder="Mother's Name"
                      onChange={(e) => setMotherName(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Date of Birth") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="dob"
                      value={dob}
                      placeholder="Date of Birth"
                      onChange={(e) => setDob(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Contact No.") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="contact"
                      value={contact}
                      placeholder="Contact"
                      onChange={(e) => setContact(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Address") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="address"
                      value={address}
                      placeholder="Address"
                      onChange={(e) => setAddress(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Class") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="class"
                      value={studentClass}
                      placeholder="Class"
                      onChange={(e) => setStudentClass(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Section") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="section"
                      value={section}
                      placeholder="Section"
                      onChange={(e) => setSection(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Roll No.") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="rollNo"
                      value={rollNo}
                      placeholder="Roll No."
                      onChange={(e) => setRollNo(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Admission No.") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="admissionNo"
                      value={address}
                      placeholder="Admission No."
                      onChange={(e) => setAddress(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Aadhar No.") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="aadharNo"
                      value={aadharNo}
                      placeholder="Aadhar No."
                      onChange={(e) => setAadharNo(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {/* Blood Group */}
                {currSchool?.requiredFields?.includes("Blood Group") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="bloodGroup"
                      value={bloodGroup}
                      placeholder="Ribbon Colour"
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Ribbon Colour") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="ribbonColour"
                      value={ribbionColour}
                      placeholder="Ribbon Colour"
                      onChange={(e) => setRibbionColour(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Route No.") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="routeNo"
                      value={routeNo}
                      placeholder="Route No."
                      onChange={(e) => setRouteNo(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {currSchool?.requiredFields?.includes("Mode of Transport") && (
                  <div className="mb-4">
                    <input
                      type="text"
                      id="modeOfTransport"
                      value={modeOfTransport}
                      placeholder="Mode Of Transport"
                      onChange={(e) => setmodeOfTransport(e.target.value)}
                      className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}

                {/* Repeat above pattern for other fields */}
                {/* Add input fields for other student schema fields */}
                {/* Add a submit button */}
                <div className='w-full flex justify-center items-center'>


                <div className='w-full flex justify-center items-center'>
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit Student
                </button>
                </div> 
                </div>
              </form>
            </div>
      </section>
    </>
  );
};

export default EditStudent;
