import React from 'react';
import { FaProjectDiagram, FaEnvelope, FaPlusCircle, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold text-slate-800 mb-8'>Admin <span className='text-amber-500'>Control Center</span></h1>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* STAT CARD: Projects */}
        <div className='bg-white p-6 rounded-xl shadow-md border-l-4 border-amber-400'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-slate-500 text-sm uppercase font-bold'>Total Projects</p>
              <h2 className='text-2xl font-bold'>12</h2> 
            </div>
            <FaProjectDiagram className='text-3xl text-slate-300' />
          </div>
          <Link to='/manage-projects' className='text-amber-600 text-sm font-semibold mt-4 block hover:underline'>Manage Projects &rarr;</Link>
        </div>

        {/* STAT CARD: Messages */}
        <div className='bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-400'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-slate-500 text-sm uppercase font-bold'>New Inquiries</p>
              <h2 className='text-2xl font-bold'>5</h2>
            </div>
            <FaEnvelope className='text-3xl text-slate-300' />
          </div>
          <Link to='/admin-messages' className='text-blue-600 text-sm font-semibold mt-4 block hover:underline'>View Messages &rarr;</Link>
        </div>

        {/* ACTION CARD: Add Project */}
        <div className='bg-slate-800 p-6 rounded-xl shadow-md flex flex-col justify-between'>
          <p className='text-white font-bold'>Quick Actions</p>
          <Link 
            to='/create-project' 
            className='mt-4 flex items-center justify-center gap-2 bg-amber-400 text-slate-900 py-2 rounded-lg font-bold hover:bg-amber-500 transition-colors'
          >
            <FaPlusCircle /> Add New Project
          </Link>
        </div>
      </div>
    </div>
  );
}