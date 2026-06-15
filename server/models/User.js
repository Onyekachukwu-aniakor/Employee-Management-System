import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true,   
    },
    role: {
        type : String,
        enum: ['ADMIN', 'EMPLOYEE'],
        default: 'EMPLOYEE'   
    },
}, {timestamps: true});

const User = mongoose.models.User || mongoose.model('User', userSchema)

// mongoose.models.User: so that mongoose will check if User models is available so it can be used

export default User;