import React from 'react';
import { FaProjectDiagram, FaEnvelope, FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className='p-6 max-w-6xl mx-auto'>
      {/* FIXED: 'Admin' changed from text-white to text-[#1a1a1a] for better contrast against light background */}
      <h1 className='text-3xl font-black text-[#1a1a1a] mb-8 uppercase tracking-tighter'>
        Admin <span className='text-[#eee27d]'>Control Center</span>
      </h1>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* STAT CARD: Projects */}
        {/* Unifying with Ar-Bâti Gold border [#eee27d] */}
        <div className='bg-white p-6 rounded-xl shadow-md border-l-4 border-[#eee27d]'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-slate-500 text-sm uppercase font-black tracking-widest'>Total Projects</p>
              <h2 className='text-2xl font-bold text-slate-800'>12</h2> 
            </div>
            <FaProjectDiagram className='text-3xl text-slate-200' />
          </div>
          <Link to='/manage-projects' className='text-[#d6cc6a] text-sm font-bold mt-4 block hover:text-[#eee27d] transition-colors'>
            Manage Projects &rarr;
          </Link>
        </div>

        {/* STAT CARD: Messages */}
        {/* Using standard dark grey border for sober contrast */}
        <div className='bg-white p-6 rounded-xl shadow-md border-l-4 border-slate-800'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-slate-500 text-sm uppercase font-black tracking-widest'>New Inquiries</p>
              <h2 className='text-2xl font-bold text-slate-800'>5</h2>
            </div>
            <FaEnvelope className='text-3xl text-slate-200' />
          </div>
          <Link to='/admin-messages' className='text-slate-600 text-sm font-bold mt-4 block hover:underline'>
            View Messages &rarr;
          </Link>
        </div>

        {/* ACTION CARD: Add Project */}
        {/* Anchored with Ar-Bâti dark tone [#1a1a1a] */}
        <div className='bg-[#1a1a1a] p-6 rounded-xl shadow-xl flex flex-col justify-between border border-white/5'>
          <p className='text-white font-black uppercase text-xs tracking-widest'>Quick Actions</p>
          <Link 
            to='/create-project' 
            className='mt-4 flex items-center justify-center gap-2 bg-[#eee27d] text-[#1a1a1a] py-3 rounded-lg font-black uppercase text-xs hover:bg-white transition-all transform active:scale-95 shadow-lg shadow-yellow-500/10'
          >
            <FaPlusCircle /> Add New Project
          </Link>
        </div>
      </div>
    </div>
  );
}