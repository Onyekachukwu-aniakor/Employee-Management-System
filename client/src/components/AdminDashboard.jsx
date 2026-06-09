import { Building2Icon, CalendarIcon, FileTextIcon, UserIcon } from "lucide-react"


const AdminDashboard = ({data}) => {
    const stats = [
        { icon: UserIcon,
            value: data.totalEmployees,
            label: 'Total Employees',
            description : 'Active Workforce'
        },
        { icon: Building2Icon,
            value: data.totalDepartments,
            label: 'Departments',
            description : 'Organisation units'
        },
        { icon: CalendarIcon,
            value: data.todayAttendance,
            label: "Today's Attendance",
            description : 'Checked in today'
        },
        { icon: FileTextIcon,
            value: data.pendingLeaves,
            label: "Pending Leaves",
            description : 'Awaiting Approval'
        },
    ]
  return (
     <div className='animate-fade-in'>
        {/* page-header from index.css */}
        <div className="page-header">
            <h1 className='page-title'>Dashboard</h1>
        <p className='page-subtitle'>
            Welcome back, Admin- here's your overview
        </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-3">
            {stats.map((s)=>(
                <div key={s.label} className="card card-hover p-3 sm:p-4 relative overflow-hidden group flex items-center justify-between">
                    <div className="">
                        <div className='absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70'/>
                        <p className='text-sm font-medium text-slate-700'>{s.label}</p>
                        <p className='text-lg font-bold text-slate-900 mt-1'>{s.value}</p>
                    </div>
                    <s.icon  className='size-8 p-2 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-200'/>
                </div>
            ))}

        </div>
        
        
    </div>
  )
}

export default AdminDashboard
