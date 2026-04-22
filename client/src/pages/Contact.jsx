import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Your actual API call would go here
    setTimeout(() => setStatus('success'), 1500); 
  };

  return (
    <div className='bg-[#f5f5f5] min-h-screen py-20 px-4'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-5xl font-black mb-4 text-[#1a1a1a] text-center uppercase tracking-tighter'>
          Contact <span className='text-[#eee27d]'>Our Experts</span>
        </h1>
        <p className='text-center text-slate-600 mb-16 max-w-xl mx-auto font-medium'>
          Have a project in mind? Our team in Sousse is ready to turn your vision into reality.
        </p>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Contact Details Card */}
          <div className='lg:col-span-1 flex flex-col gap-6'>
            <div className='bg-[#1a1a1a] p-8 rounded-3xl shadow-2xl text-white'>
              <h2 className='text-xl font-bold mb-8 border-b border-white/10 pb-4 text-[#eee27d]'>Contact Info</h2>
              <div className='flex flex-col gap-8'>
                <div className='flex items-start gap-4'>
                  <div className='bg-[#eee27d]/20 p-3 rounded-xl text-[#eee27d]'><FaPhone /></div>
                  <div>
                    <p className='text-[10px] uppercase font-black text-slate-400 tracking-widest'>Phone</p>
                    <p className='font-bold'>+216 73 000 000</p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <div className='bg-[#eee27d]/20 p-3 rounded-xl text-[#eee27d]'><FaEnvelope /></div>
                  <div>
                    <p className='text-[10px] uppercase font-black text-slate-400 tracking-widest'>Email</p>
                    <p className='font-bold'>contact@arbati.tn</p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <div className='bg-[#eee27d]/20 p-3 rounded-xl text-[#eee27d]'><FaMapMarkerAlt /></div>
                  <div>
                    <p className='text-[10px] uppercase font-black text-slate-400 tracking-widest'>Location</p>
                    <p className='font-bold'>Sousse, Tunisia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className='lg:col-span-2 bg-white p-10 rounded-3xl shadow-lg border border-slate-200'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label className='text-[11px] font-black uppercase ml-1 text-[#1a1a1a] tracking-wider'>Full Name</label>
                  <input 
                    type='text' 
                    id='name' 
                    placeholder='John Doe' 
                    className='p-4 rounded-xl border-2 border-slate-100 focus:border-[#eee27d] transition-all outline-none bg-slate-50 text-[#1a1a1a] font-medium' 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-[11px] font-black uppercase ml-1 text-[#1a1a1a] tracking-wider'>Email</label>
                  <input 
                    type='email' 
                    id='email' 
                    placeholder='john@example.com' 
                    className='p-4 rounded-xl border-2 border-slate-100 focus:border-[#eee27d] transition-all outline-none bg-slate-50 text-[#1a1a1a] font-medium' 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-[11px] font-black uppercase ml-1 text-[#1a1a1a] tracking-wider'>Your Message</label>
                <textarea 
                  id='message' 
                  placeholder='Describe your project...' 
                  rows='5' 
                  className='p-4 rounded-xl border-2 border-slate-100 focus:border-[#eee27d] transition-all outline-none bg-slate-50 text-[#1a1a1a] font-medium resize-none' 
                  onChange={handleChange} 
                  required
                ></textarea>
              </div>
              <button className='bg-[#1a1a1a] text-white p-5 rounded-xl uppercase font-black tracking-widest hover:bg-[#eee27d] hover:text-[#1a1a1a] transition-all shadow-lg active:scale-95'>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && <div className='bg-green-100 text-green-800 p-4 rounded-xl text-center font-bold'>Message sent successfully!</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}