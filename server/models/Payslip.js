import mongoose from "mongoose";


const payslipSchema = new mongoose.Schema({
    employeeId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Employee",
        required : true,
    },
    month : {type : Number, required : true},
    year : {type : Number, required : true},
    basicSalary : {type : Number, required : true},
    allowances : {type : Number, default : 0},
    deductions : {type : Number, default : 0},
    netSalary : {type : Number, required : true},
    
}, {timestamps: true});

const Payslip = mongoose.models.Payslip || mongoose.model('Payslip', payslipSchema)

// mongoose.models.User: so that mongoose will check if User models is available so it can be used else it will create a new model using mongoose

export default Payslip;