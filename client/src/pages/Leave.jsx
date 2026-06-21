import { useCallback, useEffect, useState} from "react"
//import { dummyLeaveData } from "../assets/assets";
import Loading from "../components/Loading";
import { PalmtreeIcon, PlusIcon, ThermometerIcon, UmbrellaIcon } from "lucide-react";
import LeaveHistory from "../components/leave/LeaveHistory";
import ApplyLeaveModal from "../components/leave/ApplyLeaveModal";
import { useAuth } from '../context/AuthContext'
import api from "../api/axios";
import toast from "react-hot-toast";


const Leave = () => {
  // backend connect
  const {user} = useAuth()
  //backend end
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading]= useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false)
  //const isAdmin = false;
  // backend connect
  const isAdmin = user?.role === 'ADMIN'
  
  const fetchLeaves = useCallback(async()=>{
    //setLeaves(dummyLeaveData);
    //setTimeout(()=>{
    //  setLoading(false)
   // },1000)
   try {
    const res = await api.get('/leave')
    setLeaves(res.data.data  || [])
    if(res.data.employee?.isDeleted)
      setIsDeleted(true)
   } catch (err) {
    toast.error(err.response?.data?.error || err.message)
   }finally{
            setLoading(false)
        }
  },[]);
  //backend end

  useEffect(()=>{
    fetchLeaves()
  },[fetchLeaves]);

  if(loading) return <Loading/>
// 'l' === leave below
  const approvedLeaves = leaves.filter((l)=>l.status === 'APPROVED');
  const sickCount = approvedLeaves.filter((l)=>l.type === 'SICK').length;
  const casualCount = approvedLeaves.filter((l)=>l.type === 'CASUAL').length;
  const annualCount = approvedLeaves.filter((l)=>l.type === 'ANNUAL').length;

  const leaveStats = [
    {
      label: 'Sick Leave',
      value:sickCount,
      icon: ThermometerIcon
    },
    {
      label: 'Casual Leave',
      value:casualCount,
      icon: UmbrellaIcon
    },
    {
      label: 'Annual Leave',
      value:annualCount,
      icon: PalmtreeIcon
    },
  ]
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
         <div className="">
          <h2 className="page-title">Leave Management</h2>
          <p className="page-subtitle">{isAdmin ? 'Manage leave applications' : 'Your leave history and request'}</p>
        </div>
        {!isAdmin && !isDeleted && (
          <button onClick={()=> setShowModal(true)}
           className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"> <PlusIcon className="w-5 h-5"/> Apply for leave</button>
        )}
      </div>
      {!isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4">
          {leaveStats.map((s)=>(
            <div className="card card-hover p-4 sm:p-5  flex items-center gap-3 relative overflow-hidden group" key={s.label}>
              <div className="absolute top-0 left-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70"/>
              <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-indigo-50  transition-colors duration-200">
                <s.icon className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors duration-200"/>
              </div>
              <div className="">
                <p className="text-sm font-semibold text-slate-500">{s.label}</p>
                <p className="text-lg font-bold text-slate-900 tracking-tight">{s.value} <span className="text-sm font-base text-green-800">taken</span></p>
              </div>

            </div>
          ))}
        </div>
      )}
      <LeaveHistory  leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaves}/>
      <ApplyLeaveModal open={showModal}  onClose={()=>setShowModal(false)}  onSuccess={fetchLeaves}/>
       
        
    </div>
  )
}

export default Leave