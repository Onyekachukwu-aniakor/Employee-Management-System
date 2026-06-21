import { Link, Navigate } from "react-router-dom"
import LoginLeftSide from "../components/LoginLeftSide"
import {ArrowRightIcon, ShieldIcon, UserIcon} from 'lucide-react'
import { useAuth } from "../context/AuthContext"
import Loading from "../components/Loading"


const LoginLanding = () => {
  const {user, loading}= useAuth()

  if(loading) return <Loading/>
  if(user) return <Navigate to='/'/>
  const portOptions = [
    {
      to: '/login/admin',
      title: 'Admin Portal',
      description : 'Manage employees, payroll, departments, and system configuration',
      icon: ShieldIcon
    },
    {
      to: '/login/employee',
      title: 'Employee Portal',
      description : 'View your profile,track attendance, request time off, and access payslips',
      icon: UserIcon
    }
  ]
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftSide/>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 sm:p-10 lg:p-12relative overflow-y-auto min-h-screen">
      <div className="w-full max-w-md relative animate-fade-in z-10">
        {/* Header */}
        <div className="mb-5 text-center md:text-left">
           <h2 className="text-3xl font-medium text-slate-600  tracking-tight mb-2">Welcome Back</h2>
           <p className="text-slate-500">Select your portal to securely access the system</p>
        </div>
        {/* Portal List */}
        <div className="space-y-4">
          {portOptions.map((portal)=>(
            <Link key={portal.to} to={portal.to} className="group block bg-slate-50 border border-slate-200 rounded-lg p-1 sm:p-2 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50 ">
              <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-3">
                <h3 className="text-lg text-slate-800 group-hover:text-indigo-600 mb-1 transition-colors">{portal.title} </h3><ArrowRightIcon className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-300"/>
              </div>


            </Link>
          ))}

        </div>
        {/* Footer */}
        <div className="mt-6 text-center md:text-left text-sm text-slate-600">
          <p className="">@{new Date().getFullYear()} Aniakor Onyekachukwu. All rights reserved</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default LoginLanding