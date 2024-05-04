const express = require("express");
const { ExcelUpload, 
    userRegistration, 
    userActivation, 
    userLogin, 
    addStudent, 
    addSchool, 
    deleteStudent,
    editStudent,
    deleteSchool,
    editSchool,
    getAllStudentsInSchool,
    updateStudentStatusToPrint,
    updateStudentStatusToPending,
    updateStudentStatusToPrinted,
    deleteStudents,
    studentListExcel,
    GraphData,
    EditUser,
    updatePassword,
    userAvatar,
    ChangeActive,
    SerchSchool,
    allSchool,
    userForgetPasswordVerify,
    userForgetPasswordsendMail,
    SchoolrequiredFields,
    userProfile,
    StudentsAvatars,
    addStaff,
    editStaff,
    updateStaffStatusToPrint,
    updateStaffStatusToPending,
    updateStaffStatusToPrinted,
    deleteStaff,
    StaffAvatars,
    getAllStaffInSchool,
    ExcelStudentData,
    StaffAvatarsDownload,
    ExcelData,
    SchooluserLogin,
    SerchStudent,
    ExcelDataStaff,
    StaffNewAvatarsDownload,
    currUser,
    deleteStaffcurr,
    getStudent,
    getStaff} = require("../controllers/userControllers");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();

const updated = require("../middlewares/multer");
const upload = require("../middlewares/multer");

// const isAuthenticated = require("../middlewares/auth");

router.post("/curr",isAuthenticated, currUser)

router.post("/registration",userRegistration);

router.post("/activate/user",userActivation);

router.post("/login",userLogin);

router.post("/school/login",SchooluserLogin);

router.get("/profile",isAuthenticated, userProfile);

router.post("/forgetpassword/email",userForgetPasswordsendMail);

router.post("/forgetpassword/code",userForgetPasswordVerify);

router.post("/edit", isAuthenticated, EditUser);

router.post("/avatar", isAuthenticated, userAvatar);

router.post("/updatepassword", isAuthenticated, updatePassword);

router.post("/isactive/school/:id", isAuthenticated, ChangeActive);

router.post("/registration/school",upload, isAuthenticated ,addSchool);

router.post("/schools", isAuthenticated ,allSchool);

router.get("/school/requiredfields/:id", isAuthenticated ,SchoolrequiredFields);

router.post("/avatar",upload, isAuthenticated ,userAvatar);

router.post("/edit/school/:id",upload, isAuthenticated ,editSchool);

router.post("/delete/school/:id", isAuthenticated ,deleteSchool);

router.post("/students/:id", isAuthenticated ,getAllStudentsInSchool);

router.post("/staffs/:id", isAuthenticated ,getAllStaffInSchool);

router.post("/registration/student/:id", upload, isAuthenticated ,addStudent);

router.post("/registration/staff/:id", upload, isAuthenticated ,addStaff);

router.get("/student/:id", upload, isAuthenticated ,getStudent);

router.get("/staff/:id", upload, isAuthenticated ,getStaff);

router.post("/edit/student/:id", upload, isAuthenticated ,editStudent);

router.post("/edit/staff/:id", upload, isAuthenticated ,editStaff);

router.post("/student/avatars/:id", upload, isAuthenticated , StudentsAvatars);

router.post("/staff/avatars/:id", upload, isAuthenticated , StaffAvatars);

router.post("/delete/student/:id", isAuthenticated ,deleteStudent);

router.post("/delete/staff/:id", isAuthenticated ,deleteStaffcurr);

router.post("/school/search", isAuthenticated ,SerchSchool);

router.post("/student/change-status/readyto/:id", isAuthenticated ,updateStudentStatusToPrint);

router.post("/student/change-status/pending/:id", isAuthenticated ,updateStudentStatusToPending);

router.post("/student/change-status/printed/:id", isAuthenticated ,updateStudentStatusToPrinted);

router.post("/staff/change-status/readyto/:id", isAuthenticated ,updateStaffStatusToPrint);

router.post("/staff/change-status/pending/:id", isAuthenticated ,updateStaffStatusToPending);

router.post("/staff/change-status/Printed/:id", isAuthenticated ,updateStaffStatusToPrinted);

router.post("/students/delete/:id", isAuthenticated ,deleteStudents);

router.post("/staffs/delete/:id", isAuthenticated ,deleteStaff);

router.post("/studentlist/excel/:id", isAuthenticated ,studentListExcel);

router.post("/bar-chart", isAuthenticated ,GraphData);

router.get("/excel/data/:id", isAuthenticated ,ExcelData);

router.get("/staff/excel/data/:id", isAuthenticated ,ExcelDataStaff);

router.post("/student/images/:id", isAuthenticated ,StaffAvatarsDownload);

router.post("/staff/images/:id", isAuthenticated ,StaffNewAvatarsDownload);

router.get("/search/student/:id", isAuthenticated ,SerchStudent);




// router.post("student/avatars", upload , isAuthenticated ,StudentsAvatars);

// router.get("/logout",isAuthenticated, userLongOut);

// router.put("/user",isAuthenticated,updateUserInfo)
// router.post("/uplaad/excel",ExcelUpload)



module.exports = router;