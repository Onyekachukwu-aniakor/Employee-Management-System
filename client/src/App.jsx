import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import LoginLanding from './pages/LoginLanding';
import Layout from './pages/Layout'
import Dashboard from './pages/Layout'
import Employees from './pages/Layout'
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Payslips from "./pages/Payslips";
import Settings from "./pages/Settings";
import PrintPayslips from './pages/PrintPayslip'
import LoginForm from "./components/LoginForm";


const App = () => {
  return (
    <>
    <Toaster toastOptions={{duration:3000,style:{background:'#1b3022', color:'#fff', borderRadius:'12px', fontSize:'14px' }}}/>
    <Routes>
     <Route path="/login" element={<LoginLanding/>}/>
     <Route path="/login/admin" element={<LoginForm  role='admin' title='Admin Portal' subtitle='Sign in to manage the organisation'/>}/>
     <Route path="/login/employee" element={<LoginForm  role='employee' title='Employee Portal' subtitle='Sign in to access your account'/>}/>


     <Route  element={<Layout/>}>
     <Route path="/dashboard" element={<Dashboard/>}/>
     <Route path="/employees" element={<Employees/>}/>
     <Route path="/attendance" element={<Attendance/>}/>
     <Route path="/leave" element={<Leave/>}/>
     <Route path="/payslips" element={<Payslips/>}/>
     <Route path="/settings" element={<Settings/>}/>

     </Route>
     <Route path="/print/payslips/:id" element={<PrintPayslips/>}/>
     {/* below '*' means you can navigate to path mounted  on it and other than other paths  wrapped in Layout above */}
     <Route path="*" element={<Navigate to='/dashboard' replace/>}/>
    </Routes>
    </>
  )
}

export default App