require('dotenv').config({ path: '/' + './.env' });
const mongoose = require("mongoose")


// exports.connectDatabase = async () =>{
//     try{
//         await mongoose.connect(process.env.MONGODB_URL)
//         console.log("batabase connection Established");
//     } catch(error){
//         console.log(error)
//     }
// } 

exports.databaseConnect = async () => {
	// console.log(require('dotenv').config());
	mongoose
		.connect(process.env.MONGO_URL)
		.then(() => console.log('Database connection successfully !'))
		.catch(err => (err.message));
};