"use client"
import React, { useState, useEffect } from 'react';
import Nav from '../../../components/Nav';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, editStaff, editStudent, updateSchool } from '@/redux/actions/userAction';
import { RiContactsBook2Line } from 'react-icons/ri';
import { FaRegAddressCard } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from '../../../../../axiosconfig';

const Editsatff = ({ params }) => {
  const [currSchool,setcurrschool] = useState()
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [husbandName, setHusbandName] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [qualification, setQualification] = useState("");
  const [designation, setDesignation] = useState("");
  const [staffType, setStaffType] = useState("");
  const [doj, setDoj] = useState("");
  const [uid, setUid] = useState("");
  const [staffID, setStaffID] = useState("");
  const [udiseCode, setUdiseCode] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [dispatchNo, setDispatchNo] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [ihrmsNo, setIhrmsNo] = useState("");
  const [beltNo, setBeltNo] = useState("");
  const [photoName, setPhotoName] = useState("")
  const [id , setID] = useState()

  

  const router = useRouter();
  const dispatch = useDispatch();
  const StudentlId  = params ? params?.id : null; // Assuming you have a route 


  // Assuming you have stored the school data in your Redux store
  const { user, schools, error } = useSelector((state) => state.user);

  useEffect(() => {
    const staffId  = params ? params.id : null;
    const factchstudent = async () =>{
        const config = () => {
            return {
              headers: {
                authorization: localStorage.getItem("token") || "", // Ensure token is always a string
              },
              withCredentials: true,
            };
          };
      const response = await axios.get(`/user/staff/${staffId}`, config())
      const staffData = response.data.staff;
      if(staffData){
        setName(staffData?.name);
        setFatherName(staffData?.fatherName);
        setHusbandName(staffData?.husbandName);
        setDob(staffData?.dob);
        setContact(staffData?.contact);
        setEmail(staffData?.email);
        setAddress(staffData?.address);
        setQualification(staffData?.qualification);
        setDesignation(staffData?.designation);
        setStaffType(staffData.staffType);
        setDoj(staffData?.doj);
        setUid(staffData?.uid);
        setStaffID(staffData?.staffID);
        setUdiseCode(staffData?.udiseCode);
        setSchoolName(staffData?.schoolName);
        setBloodGroup(staffData?.bloodGroup);
        setDispatchNo(staffData?.dispatchNo);
        setDateOfIssue(staffData?.dateOfIssue);
        setIhrmsNo(staffData?.ihrmsNo);
        setBeltNo(staffData?.beltNo);
        setPhotoName(staffData?.photoName);
        setID(staffData?._id)
      }
      if(user?.role == "school"){
        setcurrschool(user?.school);
      } else{
        let school = schools?.find((school) => school?._id == staffData?.school)
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
    console.log("call")
    try {
      const formData = {};
      
      // Add non-empty fields to formData
      if (name) formData.name = name.trim();
      if (fatherName) formData.fatherName = fatherName.trim();
      if (husbandName) formData.husbandName = husbandName.trim();
      if (dob) formData.dob = dob.trim();
      if (contact) formData.contact = contact.trim();
      if (email) formData.email = email.trim();
      if (address) formData.address = address.trim();
      if (qualification) formData.qualification = qualification.trim();
      if (designation) formData.designation = designation.trim();
      if (staffType) formData.staffType = staffType.trim();
      if (doj) formData.doj = doj.trim();
      if (uid) formData.uid = uid.trim();
      if (staffID) formData.staffID = staffID.trim();
      if (udiseCode) formData.udiseCode = udiseCode.trim();
      if (schoolName) formData.schoolName = schoolName.trim();
      if (bloodGroup) formData.bloodGroup = bloodGroup.trim();
      if (dispatchNo) formData.dispatchNo = dispatchNo.trim();
      if (dateOfIssue) formData.dateOfIssue = dateOfIssue.trim();
      if (ihrmsNo) formData.ihrmsNo = ihrmsNo.trim();
      if (beltNo) formData.beltNo = beltNo.trim();

      console.log(formData);
      console.log(id)
  
      const response = await dispatch(editStaff(formData, id));
      if (response == "Staff updated successfully") {
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
    } catch (error) {
      toast.error(error, {
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
            <form action="mt-3 w-[320px]" onSubmit={handleFormSubmit}>
              <h3 className="text-center text-xl py-3 border-b-2 mb-4 border-indigo-500">
                Edit Staff
              </h3>
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Staff Name"
                  className="mt-1 block h-10 px-3 border w-80 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              {currSchool?.requiredFieldsStaff?.includes("Father's Name") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="fatherName"
                    value={fatherName}
                    placeholder="Father's Name"
                    onChange={(e) => setFatherName(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Husband's Name") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="husbandName"
                    value={husbandName}
                    placeholder="Husband's Name"
                    onChange={(e) => setHusbandName(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Date of Birth") && (
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
              {currSchool?.requiredFieldsStaff?.includes("Contact No.") && (
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
              {currSchool?.requiredFieldsStaff?.includes("E-mail") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Address") && (
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
              {currSchool?.requiredFieldsStaff?.includes("Qualification") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="qualification"
                    value={qualification}
                    placeholder="Qualification"
                    onChange={(e) => setQualification(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Designation") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="designation"
                    value={designation}
                    placeholder="Designation"
                    onChange={(e) => setDesignation(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Staff Type") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="staffType"
                    value={staffType}
                    placeholder="Staff Type"
                    onChange={(e) => setStaffType(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Date of Joining") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="doj"
                    value={doj}
                    placeholder="Date of Joining"
                    onChange={(e) => setDoj(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("UID No.") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="uid"
                    value={uid}
                    placeholder="UID"
                    onChange={(e) => setUid(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}

              {/* Remanin */}

              {currSchool?.requiredFieldsStaff?.includes("Staff ID") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="uid"
                    value={staffID}
                    placeholder="Staff ID"
                    onChange={(e) => setStaffID(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("UDISE Code") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="uid"
                    value={udiseCode}
                    placeholder="UID Code"
                    onChange={(e) => setUdiseCode(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Office Name") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="uid"
                    value={schoolName}
                    placeholder="Office Name"
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Blood Group") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="bloodGroup"
                    value={bloodGroup}
                    placeholder="Blood Group"
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Dispatch No.") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="uid"
                    value={dispatchNo}
                    placeholder="Dispatch No."
                    onChange={(e) => setDispatchNo(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Date of Issue") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="uid"
                    value={dateOfIssue}
                    placeholder="Date of Issue"
                    onChange={(e) => setDateOfIssue(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("IHRMS No.") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="uid"
                    value={ihrmsNo}
                    placeholder=""
                    onChange={(e) => setIhrmsNo(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
              {currSchool?.requiredFieldsStaff?.includes("Belt No.") && (
                <div className="mb-4">
                  <input
                    type="text"
                    id="uid"
                    value={beltNo}
                    placeholder="Belt No."
                    onChange={(e) => setBeltNo(e.target.value)}
                    className="mt-1 block h-10 px-3 border w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}

              {/* Repeat above pattern for other fields */}
              {/* Add a submit button */}
              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Staff
              </button>
            </form>
            </div>
      </section>
    </>
  );
};

export default Editsatff;
