import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='bg-[#1a1a1a] text-slate-400 py-12 mt-auto border-t border-white/5'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-10'>
          
          {/* Brand and Tagline */}
          <div className='text-center md:text-left'>
            <h2 className='text-2xl font-black text-white tracking-tighter'>
              <span className='text-[#eee27d]'>Ar-</span>Bâti
            </h2>
            <p className='text-[10px] uppercase font-black tracking-[0.3em] mt-2 text-slate-500'>
              Construction & Renovation Experts | Sousse
            </p>
          </div>
          
          {/* Main Navigation Links */}
          <div className='flex flex-wrap justify-center gap-8 text-[11px] font-black uppercase tracking-widest'>
            <Link to='/' className='hover:text-[#eee27d] transition-colors'>Home</Link>
            <Link to='/services' className='hover:text-[#eee27d] transition-colors'>Services</Link>
            <Link to='/projects' className='hover:text-[#eee27d] transition-colors'>Projects</Link>
            <Link to='/about' className='hover:text-[#eee27d] transition-colors'>About</Link>
            <Link to='/contact' className='hover:text-[#eee27d] transition-colors'>Contact</Link>
          </div>

          {/* Copyright Section */}
          <div className='text-[10px] text-slate-600 font-bold text-center md:text-right uppercase tracking-wider'>
            <p>© 2026 AR BÂTI TUNISIE.</p>
            <p className='mt-1 opacity-50'>Built for Excellence.</p>
          </div>

        </div>
      </div>
    </footer>
  );
}