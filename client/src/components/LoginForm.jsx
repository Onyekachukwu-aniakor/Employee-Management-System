import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react"
import LoginLeftSide from "./LoginLeftSide"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"


const LoginForm = ({role, title, subtitle}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await login(email, password, role)
            navigate('/dashboard')
        } catch (error) {
            toast.error(error.response?.data?.error  || error.message || 'Login failed')
        }finally {
            setLoading(false)
        }


    }
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
        <LoginLeftSide/>
        <div className="flex flex-1 items-center justify-center p-4 bg-white sm:p-10
        ">
            <div className="w-full max-w-md animate-fade-in">
            <Link to='/login' className="inline-flex items-center  gap-2 text-slate-400 hover:text-slate-700 text-sm mb-10 transition-colors">
             <ArrowLeftIcon size={16}/> Back to portals</Link>
             <div className="mb-5">
                <h1 className="text-lg sm:text-2xl font-medium text-zinc-800">{title}</h1>
                <p className="">{subtitle}</p>
             </div>
             {error && (
                <div className="mb-4 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0 "/>
                    {error}
                </div>
             )}

             <form action="" className="space-y-5" onSubmit={handleSubmit}>
                <div className="">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Addrees</label>
                    <input type="email" placeholder="Enter your email" required className="" 
                    onChange={(e)=> setEmail(e.target.value)} value={email}/>
                </div>
                <div className="">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                    <div className="relative">
                        <input type={showPassword? 'text' : 'password'} placeholder="......" required className="pr-8" 
                    onChange={(e)=> setPassword(e.target.value)} />
                    <button className="absolute right-3 top-1/2  -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors" type="button"
                    onClick={()=> setShowPassword(!showPassword)}>
                        {showPassword? <EyeOffIcon size={18}/> : <EyeIcon size={18}/> }

                    </button>

                    </div>
                    
                </div>
                <button className="w-full py-2 bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-md text-sm font-semibold hover:from-indigo-700 hover:to-indigo-600 disabled:opacity-50 transition-all shadow-lg duration-300 shadow-indigo-500/20 active:scale-105 flex items-center justify-center " type="submit"  disabled={loading}>
                {loading && <Loader2Icon className="animate-spin h-6 w-6 mr-2"/>} Sign in</button>

             </form>
           
        </div>
        </div>
        

    </div>
  )
}

export default LoginForm