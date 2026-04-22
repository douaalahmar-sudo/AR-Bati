import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='bg-slate-950 text-slate-400 py-8 mt-auto border-t border-slate-800'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          {/* Brand and Tagline */}
          <div className='text-center md:text-left'>
            <h2 className='text-xl font-bold text-white tracking-tight'>
              <span className='text-amber-400'>Ar-</span>Bâti
            </h2>
            <p className='text-xs mt-1'>Construction & Renovation Experts | Sousse</p>
          </div>
          
          {/* Navigation Links */}
          <div className='flex gap-6 text-sm font-medium'>
            <Link to='/about' className='hover:text-amber-400 transition'>About</Link>
            <Link to='/contact' className='hover:text-amber-400 transition'>Contact</Link>
          </div>

          {/* Copyright */}
          <div className='text-xs text-slate-500'>
            <p>© 2026 AR Bâti Sousse. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}