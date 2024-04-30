const env = require("dotenv");
env.config({ path: "./.env" });
const express = require("express");
const connectDb = require('./models/database');
const app = express();
const cors = require('cors');

// DataBase Conection
// require("./models/database.js").connectDatabase();

// Database Connection
connectDb.databaseConnect();

// body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser");

//loger
const logger = require("morgan");
app.use(logger("dev"));

app.use(cookieParser());

// CORS setup
const allowedOrigins = [
	'http://localhost:3000',
  'https://id-card-bvxf-8tw7c7o4g-arpits-projects-1c6b9bf9.vercel.app',
  'https://id-card-bvxf.vercel.app',
  'http://www.eagleart.in',
  'https://www.eagleart.in'
];

app.use(cors({
	origin: allowedOrigins,
	credentials: true,
	optionsSuccessStatus: 200 ,// Address potential preflight request issues
}));

const multer = require("multer");
// const cloudinary = require('cloudinary').v2; //new
// const { CloudinaryStorage } = require('multer-storage-cloudinary'); //new

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'uploads', // Change the folder name if needed
//     // You can add more parameters as needed
//   }
// });

// const fileUpload = require('express-fileupload');


// Use express-fileupload middleware
// app.use(fileUpload({
// 	useTempFiles: true
// }));

// const upload = multer({ dest: "uploads/" });
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const readXlsxFile = require("read-excel-file/node");
const Student = require("./models/studentModel.js");
const School = require("./models/schoolModel.js");
const upload = require("./middlewares/multer.js");
const isAuthenticated = require("./middlewares/auth.js");
const Staff = require("./models/staffModel.js");

//routed
app.get("/", (req, res) => {
  res.send("wellocm");
});

// app.post(
//   "/upload-excel/:id",
//   upload.single("file"),
//   isAuthenticated,
//   async (req, res) => {
//     const file = req.file;

//     if (!file) {
//       return res.status(400).send("No file uploaded.");
//     }
//     const files = req.file.path;

//     const schoolID = req.params.id;
//     const school = await School.findById(schoolID);

//     const rows = await readXlsxFile(req.file.buffer);

//     if (rows.length < 2) {
//       return res.status(400).send("Excel file does not contain data.");
//     }

//     const [headers, ...dataRows] = rows;
//     console.log(rows);
//     const newheader = headers.map((headers) => headers.toUpperCase());
//     console.log(newheader);

//     const columnIndex = {
//       name: newheader.indexOf("STUDENT NAME"),
//       fatherName: newheader.indexOf("FATHER'S NAME"),
//       motherName: newheader.indexOf("MOTHER'S NAME"),
//       class: newheader.indexOf("CLASS"),
//       section: newheader.indexOf("SECTION"),
//       contact: newheader.indexOf("CONTACT NO."),
//       address: newheader.indexOf("ADDRESS"),
//       dob: newheader.indexOf("DATE OF BIRTH"),
//       admissionNo: newheader.indexOf("ADMISSION NO."),
//       rollNo: newheader.indexOf("ROLL NO."),
//       studentId: newheader.indexOf("STUDENT ID"),
//       adharNo: newheader.indexOf("ADMISSION NO."),
//       routeNo: newheader.indexOf("ROUTE NO./TRANSPORT"),
//       address: newheader.indexOf("ADDRESS"),
//       riddionColor: newheader.indexOf("RIBBION COLOUR"),
//     };

//     if (columnIndex.dob === -1) {
//       columnIndex.dob = newheader.indexOf("DOB");
//     }
//     if (columnIndex.contact === -1) {
//       columnIndex.contact = newheader.indexOf("CONTACT NO");
//     }
//     if (columnIndex.admissionNo === -1) {
//       columnIndex.admissionNo = newheader.indexOf("ADMISSION NO");
//     }
//     if (columnIndex.routeNo === -1) {
//       columnIndex.routeNo = newheader.indexOf("ROLL NO");
//     }

//     // Map each row to student data object
//     const studentData = await dataRows.map((row) => ({
//       name: row[columnIndex.name],
//       fatherName: row[columnIndex.fatherName],
//       motherName: row[columnIndex.motherName],
//       class: row[columnIndex.class],
//       section: row[columnIndex.section],
//       contact: row[columnIndex.contact],
//       address: row[columnIndex.address],
//       dob: row[columnIndex.dob],
//       admissionNo: row[columnIndex.admissionNo],
//       rollNo: row[columnIndex.rollNo],
//       studentID: row[columnIndex.studentId],
//       aadharNo: row[columnIndex.adharNo],
//       routeNo: row[columnIndex.routeNo],
//       school: schoolID,
//     }));

//     console.log(studentData)

//     const insertedStudents = await Student.insertMany(studentData);
//     res.status(200).json({
//       success: true,
//       message: `${insertedStudents.length} students inserted successfully.`,
//       data: insertedStudents,
//     });
//   }
// );



// app.post(
//   "/upload-excel/:id",
//   isAuthenticated,
//   async (req, res) => {
//     console.log(req.files)
//     const file = req.files.file; // Access file using req.files.file
    

//     if (!file) {
//         return res.status(400).send("No file uploaded.");
//     }

//     // Rest of your logic remains the same...

//     const rows = await readXlsxFile(file.data);

//     if (rows.length < 2) {
//       return res.status(400).send("Excel file does not contain data.");
//     }

//     const [headers, ...dataRows] = rows;
//     console.log(rows);
//     const newheader = headers.map((headers) => headers.toUpperCase());
//     console.log(newheader);

//     const columnIndex = {
//       name: newheader.indexOf("STUDENT NAME"),
//       fatherName: newheader.indexOf("FATHER'S NAME"),
//       motherName: newheader.indexOf("MOTHER'S NAME"),
//       class: newheader.indexOf("CLASS"),
//       section: newheader.indexOf("SECTION"),
//       contact: newheader.indexOf("CONTACT NO."),
//       address: newheader.indexOf("ADDRESS"),
//       dob: newheader.indexOf("DATE OF BIRTH"),
//       admissionNo: newheader.indexOf("ADMISSION NO."),
//       rollNo: newheader.indexOf("ROLL NO."),
//       studentId: newheader.indexOf("STUDENT ID"),
//       adharNo: newheader.indexOf("ADMISSION NO."),
//       routeNo: newheader.indexOf("ROUTE NO./TRANSPORT"),
//       address: newheader.indexOf("ADDRESS"),
//       riddionColor: newheader.indexOf("RIBBION COLOUR"),
//     };

//     if (columnIndex.dob === -1) {
//       columnIndex.dob = newheader.indexOf("DOB");
//     }
//     if (columnIndex.contact === -1) {
//       columnIndex.contact = newheader.indexOf("CONTACT NO");
//     }
//     if (columnIndex.admissionNo === -1) {
//       columnIndex.admissionNo = newheader.indexOf("ADMISSION NO");
//     }
//     if (columnIndex.routeNo === -1) {
//       columnIndex.routeNo = newheader.indexOf("ROLL NO");
//     }

//     // Map each row to student data object
//     const studentData = await dataRows.map((row) => ({
//       name: row[columnIndex.name],
//       fatherName: row[columnIndex.fatherName],
//       motherName: row[columnIndex.motherName],
//       class: row[columnIndex.class],
//       section: row[columnIndex.section],
//       contact: row[columnIndex.contact],
//       address: row[columnIndex.address],
//       dob: row[columnIndex.dob],
//       admissionNo: row[columnIndex.admissionNo],
//       rollNo: row[columnIndex.rollNo],
//       studentID: row[columnIndex.studentId],
//       aadharNo: row[columnIndex.adharNo],
//       routeNo: row[columnIndex.routeNo],
//       school: schoolID,
//     }));

//     console.log(studentData)

//     const insertedStudents = await Student.insertMany(studentData);
//     res.status(200).json({
//       success: true,
//       message: `${insertedStudents.length} students inserted successfully.`,
//       data: insertedStudents,
//     });
//   }
// );


// User routes

// app.post(
//   "/upload-excel/:id",
//   upload.single("file"),
//   isAuthenticated,
//   async (req, res) => {
//     const file = req.file;
//     console.log(file)

//     if (!file) {
//       return res.status(400).send("No file uploaded.");
//     }

//     const schoolID = req.params.id;
//     const school = await School.findById(schoolID);
//     console.log(school)

//     const rows = await readXlsxFile(req.file.buffer);
//     console.log(rows)

//     if (rows.length < 2) {
//       return res.status(400).send("Excel file does not contain data.");
//     }

//     const [headers, ...dataRows] = rows;
//     console.log(rows);
//     const newheader = headers.map((headers) => headers.toUpperCase());
//     console.log(newheader);

//     const columnIndex = {
//       name: newheader.indexOf("STUDENT NAME"),
//       fatherName: newheader.indexOf("FATHER'S NAME"),
//       motherName: newheader.indexOf("MOTHER'S NAME"),
//       class: newheader.indexOf("CLASS"),
//       section: newheader.indexOf("SECTION"),
//       contact: newheader.indexOf("CONTACT NO."),
//       address: newheader.indexOf("ADDRESS"),
//       dob: newheader.indexOf("DATE OF BIRTH"),
//       admissionNo: newheader.indexOf("ADMISSION NO."),
//       rollNo: newheader.indexOf("ROLL NO."),
//       studentId: newheader.indexOf("STUDENT ID"),
//       adharNo: newheader.indexOf("ADMISSION NO."),
//       routeNo: newheader.indexOf("ROUTE NO./TRANSPORT"),
//       address: newheader.indexOf("ADDRESS"),
//       riddionColor: newheader.indexOf("RIBBION COLOUR"),
//     };

//     if (columnIndex.dob === -1) {
//       columnIndex.dob = newheader.indexOf("DOB");
//     }
//     if (columnIndex.contact === -1) {
//       columnIndex.contact = newheader.indexOf("CONTACT NO");
//     }
//     if (columnIndex.admissionNo === -1) {
//       columnIndex.admissionNo = newheader.indexOf("ADMISSION NO");
//     }
//     if (columnIndex.routeNo === -1) {
//       columnIndex.routeNo = newheader.indexOf("ROLL NO");
//     }

//     // Map each row to student data object
//     const studentData = await dataRows.map((row) => ({
//       name: row[columnIndex.name],
//       fatherName: row[columnIndex.fatherName],
//       motherName: row[columnIndex.motherName],
//       class: row[columnIndex.class],
//       section: row[columnIndex.section],
//       contact: row[columnIndex.contact],
//       address: row[columnIndex.address],
//       dob: row[columnIndex.dob],
//       admissionNo: row[columnIndex.admissionNo],
//       rollNo: row[columnIndex.rollNo],
//       studentID: row[columnIndex.studentId],
//       aadharNo: row[columnIndex.adharNo],
//       routeNo: row[columnIndex.routeNo],
//       school: schoolID,
//     }));

//     console.log(studentData)

//     const insertedStudents = await Student.insertMany(studentData);
//     res.status(200).json({
//       success: true,
//       message: `${insertedStudents.length} students inserted successfully.`,
//       data: insertedStudents,
//     });
//   }
// );
const errorHandler = require("./utils/errorHandler");

app.post(
  "/upload-excel/:id",
  upload,
  isAuthenticated,
  async (req, res) => {
    const file = req.files[0];

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }
    const files = req.files[0].path;

    const schoolID = req.params.id;
    const school = await School.findById(schoolID);

    const rows = await readXlsxFile(req.files[0].buffer);

    if (rows.length < 2) {
      return res.status(400).send("Excel file does not contain data.");
    }

    const [headers, ...dataRows] = rows;
    console.log(rows);
    // const newheader = headers.map((headers) => headers.toUpperCase());
    const newheader = headers.map((header) => {
      // Convert to uppercase only if header is not null
      if (header !== null) {
        return header.toUpperCase();
      } else {
        return header; // Return null as is
      }
    });
    console.log(newheader);

    const columnIndex = {
      name: newheader.indexOf("STUDENT NAME"),
      fatherName: newheader.indexOf("FATHER'S NAME"),
      motherName: newheader.indexOf("MOTHER'S NAME"),
      class: newheader.indexOf("CLASS"),
      section: newheader.indexOf("SECTION"),
      contact: newheader.indexOf("CONTACT NO."),
      address: newheader.indexOf("ADDRESS"),
      dob: newheader.indexOf("DATE OF BIRTH"),
      admissionNo: newheader.indexOf("ADMISSION NO."),
      rollNo: newheader.indexOf("ROLL NO."),
      studentId: newheader.indexOf("STUDENT ID"),
      adharNo: newheader.indexOf("ADHAR NO."),
      routeNo: newheader.indexOf("ROUTE NO./TRANSPORT"),
      address: newheader.indexOf("ADDRESS"),
      riddionColor: newheader.indexOf("RIBBION COLOUR"),
      photoName: newheader.indexOf("PHOTO NO."),
    };

    if (!columnIndex.name == -1) {
      return next(new errorHandler("Name is Required"))
    }

    if (columnIndex.dob === -1) {
      columnIndex.dob = newheader.indexOf("DOB");
    }
    if (columnIndex.contact === -1) {
      columnIndex.contact = newheader.indexOf("CONTACT NO");
    }
    if (columnIndex.admissionNo === -1) {
      columnIndex.admissionNo = newheader.indexOf("ADMISSION NO");
    }
    if (columnIndex.routeNo === -1) {
      columnIndex.routeNo = newheader.indexOf("ROLL NO");
    }

    // Map each row to student data object
    const studentData = await dataRows.map((row) => ({
      name: row[columnIndex.name],
      fatherName: row[columnIndex.fatherName],
      motherName: row[columnIndex.motherName],
      class: row[columnIndex.class],
      section: row[columnIndex.section],
      contact: row[columnIndex.contact],
      address: row[columnIndex.address],
      dob: row[columnIndex.dob],
      admissionNo: row[columnIndex.admissionNo],
      rollNo: row[columnIndex.rollNo],
      studentID: row[columnIndex.studentId],
      aadharNo: row[columnIndex.adharNo],
      routeNo: row[columnIndex.routeNo],
      photoName:row[columnIndex.photoName],
      school: schoolID,
      user: req.id,
    }));

    console.log(studentData)

    const insertedStudents = await Student.insertMany(studentData);
    res.status(200).json({
      success: true,
      message: `${insertedStudents.length} students inserted successfully.`,
      data: insertedStudents,
    });
  }
);

app.post(
  "/upload-excel/staff/:id",
  upload,
  isAuthenticated,
  async (req, res) => {
    const file = req.files[0];

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }
    const files = req.files[0].path;

    const schoolID = req.params.id;
    const school = await School.findById(schoolID);

    const rows = await readXlsxFile(req.files[0].buffer);

    if (rows.length < 2) {
      return res.status(400).send("Excel file does not contain data.");
    }

    const [headers, ...dataRows] = rows;
    console.log(rows);
    const newheader = headers.map((header) => {
      // Convert to uppercase only if header is not null
      if (header !== null) {
        return header.toUpperCase();
      } else {
        return header; // Return null as is
      }
    });
    console.log(newheader);

    const columnIndex = {
      name: newheader.indexOf('NAME'),
      fatherName: newheader.indexOf('FATHER NAME'),
      husbandName: newheader.indexOf('HUSBAND NAME'),
      qualification: newheader.indexOf('QUALIFICATION'),
      doj: newheader.indexOf('DATE OF JOINING'),
      contact: newheader.indexOf("CONTACT NO."),
      address: newheader.indexOf("ADDRESS"),
      dob: newheader.indexOf("DATE OF BIRTH"),
      staffID: newheader.indexOf('STAFF ID'),
      schoolName: newheader.indexOf('SCHOOL/OFFICE NAME'),
      dispatchNo: newheader.indexOf('DISPATCH NO.',),
      ihrmsNo: newheader.indexOf('IHRMS NO.'),
      designation: newheader.indexOf('DESIGNATION'),
      uid: newheader.indexOf('UID'),
      email: newheader.indexOf('EMAIL ID'),
      udiseCode: newheader.indexOf('UDISE CODE'),
      bloodGroup: newheader.indexOf('BLOOD GROUP'),
      beltNo: newheader.indexOf('BELT NO.'),
      dateOfissue: newheader.indexOf('DATE OF ISSUE'),
      photoName: newheader.indexOf("PHOTO NO."),
    };

    if (!columnIndex.name == -1) {
      return next(new errorHandler("Name is Required"))
    }

    if (columnIndex.dob === -1) {
      columnIndex.dob = newheader.indexOf("DOB");
    }
    if (columnIndex.contact === -1) {
      columnIndex.contact = newheader.indexOf("CONTACT NO");
    }
    if (columnIndex.routeNo === -1) {
      columnIndex.routeNo = newheader.indexOf("ROLL NO");
    }

    // Map each row to student data object
    const staffData = await dataRows.map((row) => ({
      name: row[columnIndex.name],
      fatherName: row[columnIndex.fatherName],
      husbandName: row[columnIndex.husbandName],
      qualification: row[columnIndex.qualification],
      doj: row[columnIndex.doj],
      contact: row[columnIndex.contact],
      address: row[columnIndex.address],
      dob: row[columnIndex.dob],
      staffID: row[columnIndex.staffID],
      schoolName: row[columnIndex.schoolName],
      dispatchNo: row[columnIndex.dispatchNo],
      ihrmsNo: row[columnIndex.ihrmsNo],
      designation: row[columnIndex.designation],
      uid: row[columnIndex.uid],
      udiseCode: row[columnIndex.udiseCode],
      bloodGroup: row[columnIndex.bloodGroup],
      dateOfissue: row[columnIndex.dateOfissue],
      photoName:row[columnIndex.photoName],
      school: schoolID,
      user: req.id,
    }));

    console.log(staffData)

    const insertedStaff = await Staff.insertMany(staffData);
    res.status(200).json({
      success: true,
      message: `${insertedStaff.length} staff members inserted successfully.`,
      data: staffData,
    });
  }
);


// const adminroute = require("./routes/adminRoutes.js")



// User Routes
app.use("/user", require("./routes/userRoutes.js"));

// Admin Routes
app.use("/admin", require("./routes/adminRoutes.js"));


//error handling

const { generatedErrors } = require("./middlewares/error");


app.get("*", (req, res, next) => {
  next(new errorHandler(`request url not found ${req.url}`));
});
app.use(generatedErrors);

app.listen(process.env.PORT, () => {
  console.log(`server is runing on port ${process.env.PORT}`);
});
