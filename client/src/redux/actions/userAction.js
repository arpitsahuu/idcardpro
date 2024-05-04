import axios from "../../../axiosconfig";
import {
  setUser,
  setSchools,
  setStudents,
  setStaff,
  setError,
  setLoading,
} from "../sclices/userSclice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const config = () => {
  return {
    headers: {
      authorization: localStorage.getItem("token") || "", // Ensure token is always a string
    },
    withCredentials: true,
  };
};

export const currentUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log("call current user")
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const response = await axios.post(`/user/curr`, {}, config());
    dispatch(setUser(response?.data?.user));
    dispatch(currentSchool());
  } catch (error) {
    dispatch(
      setError(error?.response?.data?.message || "Failed to get current user")
    );
  } finally {
    dispatch(setLoading(false));
  }
};

export const currentSchool = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const response = await axios.post(`/user/schools`, {}, config());
    console.log(response?.data?.schools)
    dispatch(setSchools(response?.data?.schools));
  } catch (error) {
    dispatch(
      setError(error?.response?.data?.message || "Failed to get current user")
    );
  } finally {
    dispatch(setLoading(false));
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log(userData)
    const response = await axios.post(`/user/login`, {
      ...userData,
    });
    console.log(response)
    localStorage.removeItem("token");
    localStorage.setItem("token", response.data.token);
    dispatch(currentUser());
  } catch (error) {
    let errorMessage = "Login failed"; // Default error message

    if (error?.response?.status === 500) {
      // 401 is the standard code for unauthorized
      errorMessage = "Wrong password provided. Please try again.";
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message; // Server-provided error message
    }

    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(setError(error?.response?.data?.message || "Login failed"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const loginSchool = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log(userData)
    const response = await axios.post(`/user/school/login`, {
      ...userData,
    });
    console.log(response)
    localStorage.removeItem("token");
    localStorage.setItem("token", response.data.token);
    dispatch(currentUser());
  } catch (error) {
    let errorMessage = "Login failed"; // Default error message

    if (error?.response?.status === 500) {
      // 401 is the standard code for unauthorized
      errorMessage = "Wrong password provided. Please try again.";
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message; // Server-provided error message
    }

    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(setError(error?.response?.data?.message || "Login failed"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    console.log(userData)
    dispatch(setLoading(true));
    const response = await axios.post(`/user/registration`, {
      ...userData,
    });
    dispatch(setLoading(false));
    console.log(response.data)
    localStorage.setItem("token", response.data.Token);
    if (response?.data?.succcess) {
      return response.data.message;
    } else {
      throw new Error(response?.data?.message);
    }
    
    // dispatch(setStudent(data.student))
  } catch (error) {
    dispatch(setLoading(false));
    let errorMessage = "Signin failed"; // Default error message

    if (error?.response?.status === 401) {
      // 401 is the standard code for unauthorized
      errorMessage = "User with this email already exists.";
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message; // Server-provided error message
    }

    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(
      setError(error?.response?.data?.message || "registerStudent failed")
    );
  }
};

export const submitOtpStudent = (otp) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      `/user/activate/user`,
      otp, config()
    );
    console.log(response?.data)
    if(response?.data?.succcess){
      console.log("enter")
      await localStorage.removeItem("token");
      await localStorage.setItem("token", response.data.token);
      const token = localStorage.getItem("token");
      console.log(token)
      dispatch(currentUser());
      return response.data.message;
    }
    else{
      console.log("out")
      toast.error(response?.data?.succcess,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error(error);
    dispatch(
      setError(error?.response?.data?.message || "get current user failed")
    );
  }
};



export const logoutUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setLoading(false));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    dispatch(setSchools([]));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(
      setError(error?.response?.data?.message || "registerStudent failed")
    );
  }
};

export const addSchool = (userData) => async (dispatch) => {
  try {
    console.log(userData)
    dispatch(setLoading(true));
    const response = await axios.post(`/user/registration/school`, {
      ...userData, 
    },config());
    dispatch(setLoading(false));
    dispatch(currentSchool())
    console.log(response.data)
    if (response?.data?.succcess) {
      return response.data.message;
    } 
    return response.data.message;
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(
      setError(error?.response?.data?.message || "registerStudent failed")
    );
  }
};

export const editStudent = (studntData,id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(`/user/edit/student/${id}`, {
      ...studntData, 
    },config());
    dispatch(setLoading(false));
    return response.data.message;
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(
      setError(error?.response?.data?.message || "registerStudent failed")
    );
  }
};

export const editStaff = (staffData,id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(`/user/edit/staff/${id}`, {
      ...staffData, 
    },config());
    dispatch(setLoading(false));
    return response.data.message;
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(
      setError(error?.response?.data?.message || "registerStudent failed")
    );
  }
};
export const updateStudent = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(
      `${basePath}/student/update`,
      userData,
      config()
    );
    dispatch(currentStudent());
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error(error);
    dispatch(
      setError(error?.response?.data?.message || "get current user failed")
    );
  }
};

export const addStudent = (studntData,id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(`/user/registration/student/${id}`, {
      ...studntData, 
    },config());
    dispatch(setLoading(false));
    return response.data.message;
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(
      setError(error?.response?.data?.message || "registerStudent failed")
    );
  }
};

export const addStaff = (staffData,id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(`/user/registration/staff/${id}`, {
      ...staffData, 
    },config());
    dispatch(setLoading(false));
    return response.data.message;
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(
      setError(error?.response?.data?.message || "registerStudent failed")
    );
  }
};

export const AllJobs =
  (obj = {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.post(
        `${basePath}/student/AllJobs`,
        obj,
        config()
      );
      dispatch(setAllJobs(data.jobs));
      dispatch(
        setPage({
          totalPages: data.totalPages,
          currentPage: data.currentPage,
        })
      );
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      dispatch(
        setError(error?.response?.data?.message || "get current user failed")
      );
    }
  };

export const applicationSend = (dets) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(
      `${basePath}/student/apply`,
      dets,
      config()
    );
    dispatch(AllJobs());
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error(error);
    dispatch(
      setError(error?.response?.data?.message || "send Application failed")
    );
  }
};

export const getApplication = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get(
      `${basePath}/student/applications`,
      config()
    );
    dispatch(setApplication(data.applications));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error(error);
    dispatch(
      setError(error?.response?.data?.message || "get Application failed")
    );
  }
};

export const avatarStudent = (fileData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("avatar", fileData);
    const res = await axios.post(`${basePath}/student/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `${localStorage.getItem("token")}`,
      },
    });
    dispatch(setLoading(false));
    dispatch(currentStudent());
  } catch (error) {
    console.error(error);
    dispatch(setLoading(false));
    dispatch(
      setError(
        error?.response?.data?.message || "failed to upload a new avatar"
      )
    );
  }
};

export const deletUser = (user) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(`${basePath}/deletUser`, {
      ...user,
    });
    dispatch(setLoading(false));
    toast.success("Deleted User")
    
  } catch (error) {
    console.error(error);
    dispatch(setLoading(false));
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(
      setError(
        error?.response?.data?.message || "failed to upload a new avatar"
      )
    );
  }
};

export const aadExcel = (fileData,schooId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log("student")
    const formData = new FormData();
    formData.append("file", fileData);
    const response = await axios.post(
      `/upload-excel/${schooId}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(currentUser());
    dispatch(setLoading(false));
    return response.data.message;
  } catch (error) {
    dispatch(setLoading(false));
    console.error(error,);
    dispatch(
      setError(error?.response?.data?.message || "fail to upload Resume")
    );
  }
};

export const aadExcelstaff = (fileData,schooId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log("staff")
    console.log(fileData)
    const formData = new FormData();
    formData.append("file", fileData);
    console.log(formData)
    const response = await axios.post(
      `/upload-excel/staff/${schooId}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(currentUser());
    dispatch(setLoading(false));
    return response.data.message;
  } catch (error) {
    dispatch(setLoading(false));
    console.error(error,);
    dispatch(
      setError(error?.response?.data?.message || "fail to upload Resume")
    );
  }
};


export const submitStudentPhotos = (fileData,schooId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("file", fileData);
    const response = await axios.post(
      `/upload-excel/${schooId}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(currentUser());
    dispatch(setLoading(false));
    return response.data.message;
  } catch (error) {
    dispatch(setLoading(false));
    console.error(error,);
    dispatch(
      setError(error?.response?.data?.message || "fail to upload Resume")
    );
  }
};

export const updateSchool = (userData,id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      `/user/edit/school/${id}`,
      userData,
      config()
    );
    dispatch(currentSchool());
    dispatch(setLoading(false));
    return response.data.message;
  } catch (error) {
    dispatch(setLoading(false));
    console.error(error);
    dispatch(
      setError(error?.response?.data?.message || "get current user failed")
    );
  }
};


export const deletSchool = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(`user/delete/school/${id}`, null , config());
    dispatch(setLoading(false));
    dispatch(currentSchool())
    toast.success("Deleted School")
    
  } catch (error) {
    console.error(error);
    dispatch(setLoading(false));
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(
      setError(
        error?.response?.data?.message || "failed to upload a new avatar"
      )
    );
  }
};