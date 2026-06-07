import { Outlet } from "react-router-dom"


const Layout = () => {
  return (
    <div className="flex h-screen bg-linear-br from-slate-50 via-white to-indigo-50/30">
      <p className="">Sidebar</p>
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 pt-6 sm:p-4 sm:pt-6 lg:p-7 max-w-400 mx-auto">
      <Outlet/>
      </div>
      </main>
    </div>
  )
}

export default Layout