const mongoose = require('mongoose')
const connectDB = async () =>{
    try{
            await mongoose.connect(process.env.MONGODB_URI)
            console.log('Database Successfully Connected..');
    }catch(error){
            console.log(`Connection Failed Due to ${error.message}`);
    }
}

module.exports = connectDB