import { AlertCircleIcon,  CalendarIcon, ClockIcon } from "lucide-react";


const AttendanceStats = ({history}) => {
    const totalPresent = history.filter((h)=>h.status === 'PRESENT' | h.status === 'LATE').length;

    const totalLate = history.filter((h)=> h.status === 'LATE').length;

    const stats = [
        {
            label: 'Days Present',
            value: totalPresent,
            icon: CalendarIcon
        },
        {
            label: 'Late Arrivals',
            value: totalLate,
            icon: AlertCircleIcon
        },
        {
            label: 'Avg. Work Hrs',
            value: '8.5hrs',
            icon: ClockIcon
        },
    ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 ">
        {stats.map((s)=>(
            <div className="card card-hover p-4 sm:p-5 flex items-center gap-3 relative overflow-hidden group " key={s.label}>
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70"/>
                <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-indigo-50 transition-colors duration-200">
                    <s.icon className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors duration-200"/>
                </div>
                <div className="">
                    <p className="text-base text-slate-500">{s.label}</p>
                    <p className="text-lg font-medium text-slate-900 tracking-tight">{s.value}</p>
                </div>
            </div>
        ))}</div>
  )
}

export default AttendanceStats