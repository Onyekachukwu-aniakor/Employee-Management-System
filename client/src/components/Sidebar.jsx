import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
//import {dummyProfileData} from '../assets/assets'
import { CalendarIcon, ChevronRightIcon, FileTextIcon, LayoutGridIcon, Loader2, LogOutIcon, MenuIcon, PoundSterlingIcon, SettingsIcon, UserIcon, XIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";


const Sidebar = () => {
    
    //get path details
    const {pathname} = useLocation();
    const [userName, setUserName] = useState('');
    const [mobileMenu, setMobileMenu] = useState(false);

    //useAuth backend
    const {user, loading, logout}= useAuth()


    useEffect(()=>{
        //get userName use useEffect above
    

        api.get('/profile').then(({data})=>{
        if(data.firstName){
             setUserName(`${data.firstName}  ${data.lastName  || ' '}`.trim());}
       }).catch((error)=>{
        console.error('An error occurred:', error.message)
       })
    },[]);

    /* useEffect(()=>{
        //get userName use useEffect above
        setUserName(dummyProfileData.firstName   + ''   +    dummyProfileData.lastName)
    },[]); */
    //close mobile sidebar on route change
    useEffect(()=>{
        //this closes mobile menu when pathname changes
        setMobileMenu(false)
    },[pathname]);

    //const role = "" || 'EMPLOYEE';
    const role = user?.role;
    const navItems = [
        {name: 'Dashboard', href:'/dashboard', icon: LayoutGridIcon},
        role === 'ADMIN'? {name: 'Employees', href:'/employees', icon: UserIcon} 
        : {name: 'Attendance', href:'/attendance', icon: CalendarIcon},
        {name: 'Leave', href:'/leave', icon: FileTextIcon},
        {name: 'Payslips', href:'/payslips', icon: PoundSterlingIcon},
        {name: 'Settings', href:'/settings', icon: SettingsIcon},
    ];

    const handleLogout = ()=> {
        logout()
        window.location.href = '/login'
    }

    const sidebarContent = (
        <>
        {/* brand header */}
        <div className="px-4 pt-4 pb-4 border-b border-white/50">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <UserIcon className="text-white size-7"/>
                <div className="">
                <p className="font-semibold text-lg text-white tracking-wide "> Employee MS</p>
                <p className="text-base text-slate-500 font-medium">Management System</p>
                </div>
            </div>
            {/* Close menu on mobile */}
            <button className="lg:hidden text-slate-400 hover:text-white p-1"  
            onClick={()=>setMobileMenu(false)}>
                <XIcon className="" size={18} />
                </button>
            
        </div>
        </div>
        {/* User profile card */}
        {userName && (
            <div className="mx-2 mt-2 mb-1 p-2 rounded-lg bg-white/3 border border-white/4 ">
                <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center ring-1 ring-white/10 shrink-0">
                        <span className="text-slate-400 text-xs font-semibold">{userName.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="min-w-0">
                        <p className="text-lg font-medium text-slate-200 truncate ">{userName}</p>
                        <p className="text-base text-slate-500">{role === 'ADMIN' ? 'Administrator' : 'Employee'}</p>
                    </div>
                </div>
            </div>
        )}
        {/* Section level */}
        <div className="px-4 pt-2 pb-2 ">
            <p className="text-base font-semibold uppercase tracking-tight text-slate-500 ">Navigation</p>
        </div>
        {/* navigation list */}
        <div className="flex-1 px-2 space-y-0.5 overflow-y-auto">
            {loading ? (
                <div className="px-3 py-2 flex items-center gap-2 text-slate-500"><Loader2 className="w-5 h-5 animate-spin"/>
                <span className="text-sm">Loading...</span></div>
            ) : (
              navItems.map((item)=>{
                /* if the pathname is starting with same href below, then the item will be active  */
                const isActive = pathname.startsWith(item.href)
                return (
                    <Link key={item.name} to={item.href} className={`group flex items-center gap-2 px-2 py-2 rounded-md text-base font-medium transition-all duration-150 relative ${isActive ? 'bg-indigo-500/12 text-indigo-300' : 'text-slate-300 hover:text-white hover:bg-white/4'} `} >
                    { isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 rounded-r-full bg-indigo-500"/>}
                    <item.icon className={`w-4.25 h-4.25 shrink-0 ${isActive ? 'text-indigo-300' : 'text-slate-400 group-hover:text-slate-300'}`}/>
                    <span className="flex-1">{item.name}</span>
                    {isActive && <ChevronRightIcon className="w-3.5 h-3.5 text-indigo-500/50"/>}
                    </Link>
                )
            })  
            )}
            

        </div>
        {/* Logout link */}
        <div className="p-3 border-t border-white/6">
        <button className="flex items-center gap-2 w-full py-2 px-2 rounded-md text-base font-medium text-slate-400  hover:text-rose-400 hover:bg-rose-400/8 transition-all duration-150"
        onClick={handleLogout}> <LogOutIcon className="w-4.25 h-4.25"/>
        <span className="">Logout</span>
            </button>
            </div>
        </>
    )


  return (
    <>
    {/* Display Hamburger icon/button */}
    <button className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg border border-white/20" 
    onClick={()=>setMobileMenu(true)}>
        <MenuIcon size={20}/>
    </button>

    {/* Mobile overlay. ie when menu is open it will display semitransparent layer in the screen */}
    {mobileMenu && (
        <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" 
        onClick={()=>setMobileMenu(false)}/> )}
    

    {/* Display desktop sidebar */}
    <aside className="hidden lg:flex flex-col h-full w-65  bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white shrink-0 border-r border-white/4">
       {sidebarContent}
    </aside>

    {/* Sidebar mobile */}
    <aside className={`lg:hidden fixed inset-y-0  left-0 w-72  bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white flex flex-col transform transition-transform duration-300 z-50 ${mobileMenu? 'translate-x-0 ' : '-translate-x-full'}`}>
        {sidebarContent}

    </aside>
    </>

  )
}

export default Sidebar