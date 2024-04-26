const mongoose = require('mongoose');

const studentModel = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'School Name is Required'],
			minLength: [3, 'Firstname should be atleast of 3 Character'],
		},
		fatherName: {
			type: String,
			minLength: [3, 'Firstname should be atleast of 3 Character'],
		},
		motherName: {
			type: String,
			minLength: [3, 'Firstname should be atleast of 3 Character'],
		},
		gender:{
			type:String,
			emum:["Male","Female","Others"],
		},
		dob:{
			type: String,
		},
		contact: {
			type: String,
		},
		email: {
			type: String,
		},
		address: {
			type: String,

		},		
		avatar: {
			type: Object,
			default: {
				publicId: '',
				url: 'https://plus.unsplash.com/premium_photo-1699534403319-978d740f9297?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			},
		},
		rollNo: String,
		class: String,
		section: String,
		session: String,
		admissionNo: String,
		busNo: String,
		bloodGroup: String,
		studentID: String,
		aadharNo: String,
		ribbionColour: String,
		routeNo: String,
		photoName: String,
		school: { type: mongoose.Schema.Types.ObjectId, ref: 'school' },
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
		status:{
			type:String,
			emum:["Panding","Ready to print","Printed"],
			default: "Panding"
		}
	},
	{ timestamps: true }
);



const student = mongoose.model('student', studentModel);
module.exports = student;
