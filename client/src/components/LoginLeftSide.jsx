

const LoginLeftSide = () => {
  return (
    <div className="hidden md:flex w-1/2 bg-linear-to-r from-indigo-700   to-indigo-900 relative overflow-hidden border-r border-slate-200">
        {/* top left light css below */}
        <div className="absolute -top-30 -left-30 w-72 h-72 bg-indigo-500 rounded-full blur-3xl"/>
        
        <div className="relative flex flex-col z-10 items-start justify-center p-10 lg:p-12 w-full h-full">
             <h1 className="text-2xl lg:text-3xl font-medium text-white mb-4 leading-tight ">Employee <br /> Management System</h1>
             <p className="text-slate-400 text-lg max-w-md leading-relaxed">Streamline your work operations, track attendance, manage payroll and empower your team securely</p>
        </div>

    </div>
  )
}

export default LoginLeftSide