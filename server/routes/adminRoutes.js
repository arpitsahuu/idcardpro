const express = require("express");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();

const updated = require("../middlewares/multer");
const upload = require("../middlewares/multer");
const { setSchoolLimit,
     allUsers, 
     allStudents,
     allSaffs,
     allSchoolStaff,
     allSchoolStudents,
     changeSchooLimit,
     allSchoolsadmin,
     setExcelData,
     FindUser,
     updateUserLimit} = require("../controllers/adminController");

const { isAdmin } = require("../middlewares/adminAuth");

router.get("/",(req,res)=>{
    res.send("welcomeuser")
})

// All Users
router.post("/users",isAuthenticated,isAdmin,allUsers);

// All School
router.post("/schools",isAuthenticated,isAdmin,allSchoolsadmin);

// All Students
router.post("/students",isAuthenticated,isAdmin,allStudents);

// All Staff
router.post("/staffs",isAuthenticated,isAdmin,allSaffs);

// All student in school
router.get("/school/students/:id",isAuthenticated,isAdmin,allSchoolStudents);

// All staff in school
router.get("/school/staffs/:id",isAuthenticated,isAdmin,allSchoolStaff);

// set school limit 
router.get("/set/school/limit/:id",isAuthenticated,isAdmin,changeSchooLimit);

// set Export student data false 
router.get("/set/student/exceldata",isAuthenticated,isAdmin,setSchoolLimit);

// set user exportExcel
router.post("/set/user/exceldata/:id",isAuthenticated,isAdmin,setExcelData);

// set school exportExcel
router.get("/set/school/exceldata",isAuthenticated,isAdmin,setSchoolLimit);

// set school exportExcel
router.get("/set/school/exceldata",isAuthenticated,isAdmin,setSchoolLimit);

// set school exportExcel
router.post("/get/user/:id",isAuthenticated,isAdmin,FindUser);

//undate user
router.post("/update/user/:id",isAuthenticated,isAdmin,updateUserLimit);


module.exports = router;