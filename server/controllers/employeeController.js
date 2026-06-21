import Employee from "../models/Employee.js";
import bcrypt from 'bcrypt'
import User from "../models/User.js";


//Get Employees
//GET/api/employees



export const getEmployees = async (req, res) => {
    try {
        const {department}= req.query;
        const where = {};
        if(department) {
            where.department = department;
        };
    /* 'toSorted'
     Returns a copy of an array with its elements sorted.
@param compareFn
Function used to determine the order of the elements. It is expected to return a negative value if the first argument is less than the second argument, zero if they're equal, and a positive value otherwise. If omitted, the elements are sorted in ascending, UTF-16 code unit order.
[11, 2, 22, 1].toSorted((a, b) => a - b) // [1, 2, 11, 22] */
        const employees = await Employee.find(where).sort({createdAt : -1}).populate('userId', 'email  role').lean()

        //get employees' list
        const result = employees.map((emp)=>({
            ...emp,
            id : emp._id.toString(),
            user : emp.userId ? {email : emp.userId.email, role : emp.userId.role} : null
        }))
        return res.json(result)
    } catch (error) {
        return res.status(500).json({error:'Failed to fetch employee'})
        
    }
};

//Create employee
//Post/api/employees
export const createEmployee = async (req, res) => {
    try {
        const {firstName, lastName, email, phone, position, allowances, deductions,department, basicSalary, joinDate, role, bio, password} = req.body;

        if(!email || !firstName || !lastName || !password){
            res.status(400).json({error:'Missing required fields'})
        };
        //bcrypt is used to encrypt user's password
        const hashed = await bcrypt.hash(password, 12)
        //create user data in db
        const user = await User.create({
            email,
            password : hashed,
            role : role || 'EMPLOYEE'
        });

        //create employee data in db
        const employee = await Employee.create({
            userId : user._id,
            firstName,
            lastName,
            email,
            position,
            phone,
            department : department || 'Engineering',
            // 'Number' converts BasicSalary into numbers
            basicSalary : Number(basicSalary) || 0,
            allowances : Number(allowances) || 0,
            deductions : Number(deductions) || 0,
            joinDate : new Date(joinDate),
            bio : bio || '',

        })
        return res.status(201).json({success:true, employee})
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({error:'Email already exist'})
        }
        console.log('Create employee error :', error)
        return res.status(500).json({error:'Failed to fetch employee'})
         
    }
}
//Update employee
//Put/api/employee/:id
export const updateEmployee = async (req, res) => {
     try {
        const {id} = req.params;
        const {firstName, lastName, email, phone, position, allowances, deductions,department, basicSalary,  role, bio, password, employmentStatus} = req.body;

        const employee = await Employee.findById(id);
        if(!employee){
            return res.status(404).json({error : 'Employee not found'})
        }
        
        
         await Employee.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            position,
            phone,
            department : department || 'Engineering',
            // 'Number' converts BasicSalary into numbers
            basicSalary : Number(basicSalary) || 0,
            allowances : Number(allowances) || 0,
            deductions : Number(deductions) || 0,
            employmentStatus: employmentStatus || 'ACTIVE',
            bio : bio || '',
        })
        //UPDATE USER RECORD
        const userUpdate = {email}
        if(role)  userUpdate.role = role;
        if(password) userUpdate.password = await bcrypt.hash(password, 12);

        await User.findByIdAndUpdate(employee.userId, userUpdate)
    
        return res.json({success:true})
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({error:'Email already exist'})
        }
        return res.status(500).json({error:'Failed to update employee'})
         
    }
    
}

//Update employee
//Delete/api/employee/:id
export const deleteEmployee = async (req, res) => {
    try {
        const {id} = req.params;
        const employee = await Employee.findById(id);
        if(!employee) return res.status(404).json({error : 'Employee not found'});

        employee.isDeleted = true;
        employee.employmentStatus = 'INACTIVE'

        await employee.save()
        return res.json({success : true});
    } catch (error) {
         return res.status(500).json({error:'Failed to delete employee'})
    }
}
