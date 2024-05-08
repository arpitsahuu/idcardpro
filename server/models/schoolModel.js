const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schoolModel = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'School Name is Required'],
			minLength: [3, 'Firstname should be atleast of 3 Character'],
		},
		email: {
			type: String,
			required: true,
			unique: [true, "Email already exists"],
			index: { unique: true, sparse: true },
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please fill a valid email address',
			],
		},
		contact: {
			type: String,
			// required: [true, 'Contact is Required'],
			minLength: [10, 'Constact must not be exceed of 10 Numbers'],
			maxLength: [10, 'Constact must be atleast of 10 Numbers'],
		},
		address: {
			type: String,
			// required: [true, 'City is Required'],
		},		
		password: {
			type: String,
			required: [true, "password is required"],
			minLength: [6, 'Password should have atleast 6 Characters'],
		},
		logo: {
			type: Object,
			default: {
				publicId: '',
				url: 'https://plus.unsplash.com/premium_photo-1699534403319-978d740f9297?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			},
		},
		code:{
			type:String,
		},
		isActive: {
			type: Boolean,
			default: true
		},
		exportExcel:{
			type:Boolean,
			default:true
		},
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
		requiredFields:[],
		requiredFieldsStaff:[],
		

	},
	{ timestamps: true }
);


// schoolModel.pre("save", async function(next) {
//     if (!this.isModified('password')) {
//         next();
//     }
//     try {
//         this.password = await bcrypt.hash(this.password, 10);
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// schoolModel.methods.comparePassword = async function(password) {
//     try {
//         let match = await bcrypt.compare(password, this.password);
//         console.log("Password Match:", match);
//         return match;
//     } catch (error) {
//         console.error("Error comparing passwords:", error);
//         return false;
//     }
// }

schoolModel.pre('save', function () {
	if (!this.isModified('password')) {
		return;
	}
	let salt = bcrypt.genSaltSync(10);
	this.password = bcrypt.hashSync(this.password, salt);
});

schoolModel.methods.comparepassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

schoolModel.methods.generateAccesToken = function(){
    return jwt.sign({
        _id:this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
}



const school = mongoose.model('school', schoolModel);
module.exports = school;
