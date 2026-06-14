import { CalendarDays, FileTextIcon, Loader2Icon, SendIcon, X } from "lucide-react";
import { useState } from "react"


const ApplyLeaveModal = ({onClose, onSuccess, open}) => {

    const [loading, setLoading]= useState(false);
    const today = new Date();
    const tomorrow = new Date(today)
    // then tomorrow's date is below
    tomorrow.setDate(today.getDate() + 1);

    const minDate = tomorrow.toISOString().split('T')[0]

    const handleSubmit = async (e) => {
        e.preventDefault()
    };

    if(!open){return null}
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-3"  onClick={onClose}>
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg animate-fade-in"
        Click={(e)=>e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 pb-0">
                <div className="">
                    <h2 className="text-lg font-bold text-slate-800">Apply for leave</h2>
                    <p className="text-base text-slate-400 mt-0.5">Submit your leave request for approval</p>
                </div>
                <button Click={onClose}
                 className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5"/>
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 space-y-5">
                {/* leave type */}
                <div className="">
                    <label className="flex items-center gap-2 text-base font-medium text-slate-700 mb-2">
                        <FileTextIcon className="w-5 h-5 text-slate-400"/>Leave Type
                        </label>
                        <select name="type" required>
                            <option value="SICK">Sick Leave</option>
                            <option value="CASUAL">Casual Leave</option>
                            <option value="ANNUAL">Annual Leave</option>
                        </select>
                </div>
                {/* Leave duration */}
                <div className="">
                    <label className="flex items-center gap-2 text-base font-medium text-slate-700 mb-2">
                        <CalendarDays className="w-5 h-5 text-slate-400"/>Duration
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="">
                                <span className="block text-xs text-slate-400 mb-1">From</span>
                                <input type="date" name="startDate" min={minDate} required />
                            </div>  

                            <div className="">
                                <span className="block text-xs text-slate-400 mb-1">To</span>
                                <input type="date" name="endDate" min={minDate} required />
                            </div>
                        </div>     
                        
                </div>
                {/* reason */}
                <div className="">
                    <label className="block text-base font-medium text-slate-700 mb-2">
                        Reason
                        </label>
                        <textarea name="reason" required rows={3} className="resize-none" placeholder="Reason for the leave"/>
                </div>
                {/* button */}
                <div className="flex gap-3 pt-2">
                    <button onClick={onClose} className="btn-secondary flex-1" type='button' >
                        Cancel
                    </button>

                    <button onClick={onClose} className="btn-primary flex items-center justify-center gap-2 flex-1" type='submit'  disabled={loading}>
                        {loading ? <Loader2Icon className="w-5 h-5 animate-spin"/> : <SendIcon className="w-5 h-5 "/>}
                        {loading? 'Submitting...' : 'Submit'}
                    </button>
                </div>

            </form>

        </div>

    </div>
  )
}

export default ApplyLeaveModal