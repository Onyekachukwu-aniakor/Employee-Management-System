import React, { useCallback, useEffect, useState } from "react"
//import { dummyEmployeeData, dummyPayslipData } from "../assets/assets";
import Loading from "../components/Loading";
import PayslipList from "../components/payslip/PayslipList";
import GeneratePayslipForm from "../components/payslip/GeneratePayslipForm";
import {useAuth} from '../context/AuthContext'
import toast from "react-hot-toast";
import api from "../api/axios";


const Payslips = () => {
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong loading payslips.</h1>;
    }
    return this.props.children;
  }
}

  // above



  
  const [payslips, setPayslips]= useState([])
  const [employees, setEmployees]= useState([])
  const [loading, setLoading]= useState(true);
  //backend start
  const {user}= useAuth()
  //const isAdmin = true;
  const  isAdmin = user?.role === 'ADMIN'

  const fetchPayslips = useCallback(async () => {
    //Backend connection
    //setPayslips(dummyPayslipData);
    //setTimeout(()=>{
     // setLoading(false)
    //},1000)
    try {
      const res = await api.get('/payslips')
      setPayslips(res.data.data || [])
    } catch (err) {
      toast.error(err.response?.data?.error || err.message)
    }finally{
            setLoading(false)
        }
  },[]);

  useEffect(()=>{
    fetchPayslips()
  },[fetchPayslips]);


  useEffect(()=>{
    if(isAdmin){
      //Backend
     // setEmployees(dummyEmployeeData)
     api.get('/employees').then((res)=> setEmployees(res.data.filter((e)=>!e.isDeleted))).catch(()=>{})
    }
  },[isAdmin]);

  if(loading) return <Loading />
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-3 mb-2">
        <div className="">
          <h1 className="page-title">Payslips</h1>
          <p className="page-subtitle">{isAdmin ? 'Generate and manage employee payslips' : 'Your payslips history'}</p>
        </div>
        {isAdmin && (
          <GeneratePayslipForm employees={employees} onSuccess={fetchPayslips}/>
        )}
      </div>
      <ErrorBoundary>
      <PayslipList isAdmin={isAdmin}  payslips={payslips}/> </ErrorBoundary>

    </div>
  )
}

export default Payslips
