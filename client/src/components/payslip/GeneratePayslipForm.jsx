import { Loader2, Plus, X } from "lucide-react"
import { useState } from "react"
import api from "../../api/axios"
import toast from "react-hot-toast"


const GeneratePayslipForm = ({employees, onSuccess}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    if(!isOpen){
        return(
            <button onClick={()=> setIsOpen(true)}
             className="btn-primary flex items-center gap-2"><Plus className="w-5 h-5"/>Generate Payslip</button>
        )
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //backend connection
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())
        try {
            await api.post('/payslips', data)
            setIsOpen(false)
            onSuccess()
        } catch (err) {
             toast.error(err.response?.data?.error || err.message)
        }
            setLoading(false)
        
    }
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-3">
        <div className="card max-w-lg w-full p-4 animate-slide-up">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-slate-900">Generate Monthly Payslip</h3>
                <button onClick={()=>setIsOpen(false)}
                 className="text-slate-400 hover:text-slate-600 p-1">
                    <X className="w-5 h-5"/>
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Select employee */}
                <div className="">
                    <label className="block text-sm font-medium text-slate-700 mb-2" >
                     Employee</label>
                     <select name="employeeId" required >
                        {employees.map((e)=>(
                            <option value={e.id} key={e.id}>
                                {e.firstName}  {e.lastName} ({e.position})
                            </option>
                        ))}
                     </select>
                </div>
                {/* select mont & year */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="">
                        <label className="block text-sm font-medium text-slate-700 mb-2" >
                     Month</label>
                     <select name="month" >
                        {/* m === month */}
                        {Array.from({length : 12}, (_,i)=>i + 1).map((m)=>(
                            <option value="m" key={m}>
                                {m}
                            </option>
                        )
                            )}

                     </select>
                    </div>
                    <div className="">
                        <label className="block text-sm font-medium text-slate-700 mb-2" >
                     Year</label>
                     <input type="number" defaultChecked={new Date().getFullYear()} name='year' />
                     
                    </div>
                </div>
                {/* select basice salary */}
                <div className="">
                        <label className="block text-sm font-medium text-slate-700 mb-2" >
                     Basic Salary</label>
                     <input type="number"  name='basicSalary' required placeholder="1500" />
                     
                    </div>
                {/* Allowances & deductions */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="">
                        <label className="block text-sm font-medium text-slate-700 mb-2" >
                     Allowances</label>
                     <input type="number"  name='allowances' defaultValue='0' /> 
                    </div>


                    <div className="">
                        <label className="block text-sm font-medium text-slate-700 mb-2" >
                     Deductions</label>
                     <input type="number"  name='deductions' defaultValue='0' />
                     
                    </div>

                </div>
                {/* buttons */}
                <div className="flex gap-3 justify-end pt-2">
                    <button onClick={()=> setIsOpen(false)}
                     className="btn-secondary"  type="button">
                        Cancel
                    </button>

                    <button 
                     className="btn-primary flex items-center" disabled={loading}  type="submit">
                        {loading && <Loader2 className="w-5 h-5 animate-spin mr-2"/>}Generate
                    </button>
                </div>

            </form>
        </div>
    </div>
  )
}

export default GeneratePayslipForm