import {ArrowRightIcon, CalendarIcon, FileTextIcon,  PoundSterlingIcon} from 'lucide-react'
import {Link} from 'react-router-dom'

const EmployeeDashboard = ({data}) => {
    const emp = data.employee;

    /* 'N/A  = not applicable */
    const cards = [
        { icon: CalendarIcon,
            value: data.currentMonthAttendance,
            title: 'Days Present',
            subtitle : 'This month'
        },

        { icon: FileTextIcon,
            value: data.pendingLeaves,
            title: 'Pending Leaves',
            subtitle : 'Awaiting approval '
        },
        { icon: PoundSterlingIcon,
            value: data.latestPayslip ? `£${data.latestPayslip.netSalary?.toLocaleString()}` : 'N/A',
            title: 'latestPayslip',
            subtitle : 'Most recent payout ',
        },
    ]
  return (
    <div className='animate-fade-in'>
        {/* page-header from index.css */}
        <div className="page-header">
            <h1 className='page-title'>Welcome, {emp?.firstName}!</h1>
        <p className='page-subtitle'>
            {emp?.position} - {emp?.department || 'No Department'}
        </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-3">
            {cards.map((card, index)=>(
                <div key={index} className="card card-hover p-3 sm:p-4 relative overflow-hidden group flex items-center justify-between">
                    <div className="">
                        <div className='absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70'/>
                        <p className='text-sm font-medium text-slate-700'>{card.title}</p>
                        <p className='text-lg font-bold text-slate-900 mt-1'>{card.value}</p>
                    </div>
                    <card.icon  className='size-8 p-2 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-200'/>
                </div>
            ))}

        </div>
        <div className="flex flex-col sm:flex-row gap-2">
            <Link to='/attendance' className='btn-primary text-center inline-flex items-center justify-center gap-2'>
            Mark Attendance <ArrowRightIcon className='w-5 h-5'/>
            </Link>

            <Link to='/leave' className='btn-secondary text-center '>
            Apply for leave 
            </Link>

        </div>
        
    </div>
  )
}

export default EmployeeDashboard