import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { dummyPayslipData } from "../assets/assets"
import Loading from "../components/Loading"
import {format, toDate} from 'date-fns'
import api from "../api/axios"





const PrintPayslip = () => {
  const [loading, setLoading] = useState(true)
  const [payslip, setPayslip] = useState(null)
  const {id} = useParams();

  useEffect(()=>{
    //backend connection
    //setPayslip(dummyPayslipData.find((slip)=>slip._id === id))
    //setTimeout(()=>{
      //setLoading(false)
    //},1000);
    api.get(`/payslips/${id}`).then((res)=>setPayslip(res.data)).catch(console.error).finally(()=>setLoading(false))

  },[id]);

  if(loading) return <Loading/>
  if(!payslip) return <p className="text-center py-4 text-slate-400">Payslip not found</p>
  return (
    <div className="animate-fade-in max-w-2xl mx-auto bg-white">
      <div className="text-center border-b border-slate-200 pb-4 mb-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">PAYSLIP</h2>
        <p className="text-base text-slate-500 mt-1">
          {format(new Date(payslip.year,  payslip.month - 1 ), "MMMM  yyyy")}</p>
       
       
       
      </div>
      <div className="grid grid-cols-2 gap=4 mb-2">
        <div className="">
          <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">Employee Name</p>
          <p className="font-semibold text-slate-900">{payslip.employee?.firstName}  {payslip.employee?.lastName}</p>
        </div>
        <div className="">
          <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">Position</p>
          <p className="font-semibold text-slate-900">{payslip.employee?.position} </p>
        </div>
        <div className="">
          <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">Email</p>
          <p className="font-semibold text-slate-900">{payslip.employee?.email} </p>
        </div>
        <div className="">
          <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">Period</p>
          <p className="font-semibold text-slate-900">{format(toDate(payslip.year, payslip.month-1) , 'MMMM  yyyy')} </p>
        </div>
      </div>
      <div className="rounded-lg border border-slate-200 overflow-hidden mb-4">
        <table className="w-full text-base">
          <thead>
            <tr className="bg-slate-50">
              <th className="text-left py-2 px-2 text-xs text-slate-500 uppercase tracking-wider">Description</th>
              <th className="text-left py-2 px-2 text-xs text-slate-500 uppercase tracking-wider">Amount</th>

            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-100">
              <td className="py-2 px-2 text-slate-700">Basic Salary</td>
              <td className="text-right px-2 py-2 text-slate-900 font-medium">£{payslip.basicSalary?.toLocaleString()}</td>

            </tr>
            <tr className="border-t border-slate-100">
              <td className="py-2 px-2 text-slate-700">Allowances</td>
              <td className="text-right px-2 py-2 text-slate-900 font-medium">+£{payslip.allowances?.toLocaleString()}</td>

            </tr>
            <tr className="border-t border-slate-100">
              <td className="py-2 px-2 text-slate-700">Deductions</td>
              <td className="text-right px-2 py-2 text-slate-900 font-medium">-£{payslip.deductions?.toLocaleString()}</td>

            </tr>
            <tr className="border-t-2 border-slate-200 bg-slate-50">
              <td className="py-2 px-2 font-bold text-slate-700">Net Salary</td>
              <td className="text-right px-2 py-2 text-slate-900 font-bold">£{payslip.netSalary?.toLocaleString()}</td>

            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <button className="btn-primary print:hidden"  onClick={()=> window.print()}>
          Print Payslip
        </button>
      </div>

    </div>
  )
}

export default PrintPayslip