import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { DEPARTMENTS } from "../assets/assets";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";


const EmployeeForm = ({initialData, onSuccess, onCancel}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    /* !!initialData the 2 !! converts string data to boolean */
    const isEditMode = !!initialData 
    const handleSubmit = async (e) => {
        e.preventDefault()
        //backend connect below. pwd===password
        setLoading(true)
        const formData = new FormData(e.currentTarget);
        if(isEditMode){
            const pwd = formData.get("password")
            if(!pwd) formData.delete("password")
        }
        try {
            const url = isEditMode ? `/employees/${initialData.id}` : "/employees";
            const method = isEditMode ? "put" : "post";
            await api[method](url, formData)
            onSuccess ? onSuccess() : navigate("/employees")
        } catch (err) {
            toast.error(err.response?.data?.error || err.message)
        }finally{
            setLoading(false)
        }
    }
  return (
   <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl animate-fade-in">
    {/* personal information */}
    <div className="card p-4 sm:p-5">
        <h3 className="font-medium mb-4 pb-3  border-b border-slate-100">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-slate-700">
            <div className="">
                <label className="block mb-2">First Name</label>
                <input name="firstName" required defaultValue={initialData?.firstName} />
            </div>
            <div className="">
                <label className="block mb-2">Last Name</label>
                <input name="lastName" required defaultValue={initialData?.lastName} />
            </div>
            <div className="">
                <label className="block mb-2">Phone Number</label>
                <input name="phone" required defaultValue={initialData?.phone} />
            </div>
            <div className="">
                <label className="block mb-2">Join Date</label>
                <input type="date" name="joinDate" required defaultValue={initialData?.joinDate ? new Date(initialData.joinDate).toISOString().split('T')[0] : ''} />
            </div>
            <div className="sm:col-span-2">
                <label className="block mb-2">Bio (Optional)</label>
                <textarea name="bio" required defaultValue={initialData?.bio} rows={3} className="resize-none"  placeholder="Brief description"/>
            </div>
        </div>
    </div>
    {/* employment details */}
    <div className="card p-4 sm:p-5">
        <h3 className="text-base font-medium text-slate-900 mb-4 pb-3 border-b border-slate-100">Employment Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-slate-700">
            <div className="">
                <label className="block mb-2" >Department</label>
                <select name="department" defaultValue={initialData?.department || ''}>
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((deptName)=>(
                        <option key={deptName}  value={deptName}> {deptName}</option>
                    ))}
                </select>
            </div>
            <div className="">
                <label className="block mb-2">Position</label>
                <input name="position" required defaultValue={initialData?.position} />
            </div>
            <div className="">
                <label className="block mb-2">Basic Salary</label>
                {/* step=0.01 helps you get floating digits */}
                <input type="number" name="basicSalary" required defaultValue={initialData?.basiceSalary || 0} min='0'  step='0.01' />
            </div>
            <div className="">
                <label className="block mb-2">Allowances</label>
                <input name="allowances" required defaultValue={initialData?.allowances || 0} type="number"  min='0'  step='0.01'/>
            </div>
            <div className="">
                <label className="block mb-2">Deductions</label>
                <input name="deductions" required defaultValue={initialData?.deductions || 0} type="number"  min='0'  step='0.01'/>
            </div>
            {isEditMode  && (
                <div className="">
                <label className="block mb-2">Status</label>
                <select name="employmentStatus" defaultValue={initialData?.employmentStatus}  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                </select>
            </div>
            )}
            
        </div>
    </div>

    {/* account set up */}
     <div className="card p-4 sm:p-5">
        <h3 className="text-base font-medium mb-4 pb-3 text-slate-900  border-b border-slate-100">Account Setup</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-slate-700">
            <div className="sm:col-span-2">
                <label className="block mb-2">Work Email</label>
                <input name="email" type="email" required defaultValue={initialData?.email} />
            </div>
            {!isEditMode && (
                <div className="">
                <label className="block mb-2">Temporary Password</label>
                <input name="password" type="password" required  />
            </div>
            )}
            {isEditMode && (
                <div className="">
                <label className="block mb-2">Change Password (Optional)</label>
                <input name="password" type="password" placeholder="Leave blank to keep current"  />
            </div>
            )}
            <div className="">
                <label className="block mb-2">System Role</label>
                <select name="role" defaultValue={initialData?.user?.role || 'EMPLOYEE'} >
                    <option value="EMPLOYEE">Employee</option>
                    <option value="ADMIN">Admin</option>


                </select>
            </div>
        </div>
    </div>
    {/* buttons */}
    <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2">
        <button className="btn-secondary" type="button" onClick={()=>(onCancel ? onCancel(): navigate(-1))}>
           Cancel
        </button>
        <button 
        className="btn-primary flex items-center justify-center" disabled={loading} type="submit">
           {loading && <Loader2Icon className="w-5 h-5 mr-2 animate-spin" />}
           {isEditMode ? 'Update Employee' : 'Create Employee'}
        </button>
    </div>

   </form>
  )
}

export default EmployeeForm