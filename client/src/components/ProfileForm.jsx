import { Loader2, SaveIcon, User2 } from 'lucide-react'
import React, { useState } from 'react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const ProfileForm = ({initialData, onSuccess}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        //backend connect
        setLoading(true)
        setError('')
        setMessage('')
        const formData = new FormData(e.currentTarget)
        try {
          await api.post('/profile', formData)
          setMessage('profile updated successfully')
          onSuccess?.()
        } catch (err) {
          toast.error(err.response?.data?.error || err.message)
        }finally {
          setLoading(false)
        }
    }


  return (
    <form onSubmit={handleSubmit} className='card p-4 sm:p-5 mb-4'>
        <h2 className='text-base font-medium text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2'><User2 className='w-5 h-5 text-slate-400'/>Public Profile</h2>

        {error && (
          <div className="bg-rose-50 text-rose-700 p-3 rounded-xl text-sm border border-rose-200 mb-4 flex items-start gap-3 ">
            <div className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0"/>
            {error}
          </div>
        )}

        {error && (
          <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl text-sm border border-emerald-200 mb-4 flex items-start gap-3 ">
            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0"/>
            {message}
          </div>
        )}

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="">
              <label className='block text-base font-medium text-slate-700 mb-2'>Name</label>
              <input disabled value={`${initialData.firstName}  ${initialData.lastName}`} className='bg-slate-50 text-slate-400 cursor-not-allowed' />
            </div>

            <div className="">
              <label className='block text-base font-medium text-slate-700 mb-2'>Email</label>
              <input disabled value={initialData.email} className='bg-slate-50 text-slate-400 cursor-not-allowed' />
            </div>

            <div className="sm:col-span-2">
              <label className='block text-base font-medium text-slate-700 mb-2'>Position</label>
              <input disabled value={initialData.position} className='bg-slate-50 text-slate-400 cursor-not-allowed' />
            </div>
          </div>
          <div className="">
            <label className='block text-base font-medium text-slate-700 mb-2'>Bio</label>
            <textarea name="bio" disabled={initialData.isDeleted} defaultValue={initialData.bio || ''} placeholder='Write a brief bio...' className={`resize-none ${initialData.isDeleted ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : ''}`}/>
            <p className='text-sm text-slate-400 mt-1'>This will be displayed on your profile</p>
          </div>
          {initialData.isDeleted ? (
            <div className="pt-2">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-center">
                <p className='text-rose-600 font-medium tracking-tighter'>Account Deactivated</p>
                <p className='text-base text-rose-500 mt-0.5'>You can nolonger update your profile</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-end pt-2" >
              <button className='btn-primary flex items-center gap-2 justify-center w-full sm:w-auto' type='submit' disabled={loading}>
                {loading ? <Loader2 className='w-5 h-5 animate-spin' /> : <SaveIcon className='w-5 h-5'/>}
                Save Changes</button>
            </div>
          )}
        </div>
    </form>
  )
}

export default ProfileForm