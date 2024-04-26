const mongoose = require('mongoose');

const staffModel = mongoose.Schema(
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
		husbandName: {
			type: String,
			minLength: [3, 'Firstname should be atleast of 3 Character'],
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
		qualification: String,
		designation: String,
		staffType: String,
		doj: String,
		uid: String,
		staffID: String,
		udiseCode: String,
		schoolName: String,
		bloodGroup: String,
		dispatchNo: String,
		dateOfissue: String,
		ihrmsNo: String,
		beltNo: String,
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



const staff = mongoose.model('staff', staffModel);
module.exports = staff;
