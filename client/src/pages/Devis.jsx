import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHardHat, FaMapMarkerAlt, FaPaperPlane, FaUserAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function Devis() {
  const [formData, setFormData] = useState({
    siteType: '',
    area: '',
    propertyType: '',
    location: '',
    budget: '',
    finishLevel: 'standard',
    deadline: '',
    name: '',
    surname: '',
    email: '',
    phone: '',
    comments: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch('/api/quote/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
        return;
      }

      setSuccess(true);
      // Optional: Redirect to home or show success message for 3 seconds
      setTimeout(() => navigate('/'), 3000);
      
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  if (success) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] text-center p-6'>
        <div className='bg-green-100 text-green-700 p-8 rounded-full mb-4'>
          <FaPaperPlane className='text-4xl' />
        </div>
        <h2 className='text-3xl font-black text-[#1a1a1a] uppercase tracking-tighter'>Request Sent!</h2>
        <p className='text-slate-500 mt-2'>Our team will review your project and contact you shortly.</p>
      </div>
    );
  }

  return (
    <div className='p-6 max-w-5xl mx-auto'>
      <div className='mb-10 text-center'>
        <h1 className='text-4xl font-black text-[#1a1a1a] uppercase tracking-tighter'>
          Quote <span className='text-[#eee27d]'>Request</span>
        </h1>
        <p className='text-slate-500 font-medium uppercase text-xs tracking-[0.2em] mt-2'>Your Project Takes Shape</p>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
        
        {/* --- SECTION 1: PROJECT SPECIFICATIONS --- */}
        <div className='bg-white p-8 rounded-2xl shadow-sm border border-slate-100'>
          <h2 className='text-sm font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2'>
            <FaHardHat className='text-[#eee27d]' /> 01. Project Details
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='flex flex-col gap-2'>
              <label className='text-[10px] font-black uppercase text-slate-400 ml-1'>Site Type</label>
              <select id='siteType' required onChange={handleChange} className='border border-slate-200 p-3 rounded-lg bg-slate-50 focus:ring-2 focus:ring-[#eee27d] outline-none'>
                <option value="">Select Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>
            
            <div className='flex flex-col gap-2'>
              <label className='text-[10px] font-black uppercase text-slate-400 ml-1'>Property Type</label>
              <input type='text' id='propertyType' placeholder='e.g. Villa, Apartment' required onChange={handleChange} className='border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-[#eee27d] outline-none' />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-[10px] font-black uppercase text-slate-400 ml-1'>Area (m²)</label>
              <input type='text' id='area' placeholder='e.g. 150' required onChange={handleChange} className='border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-[#eee27d] outline-none' />
            </div>

            <div className='flex flex-col gap-2 lg:col-span-2'>
              <label className='text-[10px] font-black uppercase text-slate-400 ml-1'>Location</label>
              <div className='relative'>
                <FaMapMarkerAlt className='absolute top-4 left-3 text-slate-300' />
                <input type='text' id='location' placeholder='Project Address' required onChange={handleChange} className='w-full border border-slate-200 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-[#eee27d] outline-none' />
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-[10px] font-black uppercase text-slate-400 ml-1'>Budget (TND)</label>
              <input type='number' id='budget' placeholder='Estimated Budget' required onChange={handleChange} className='border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-[#eee27d] outline-none' />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
             <div className='flex flex-col gap-2'>
                <label className='text-[10px] font-black uppercase text-slate-400 ml-1'>Level of Finish</label>
                <select id='finishLevel' onChange={handleChange} className='border border-slate-200 p-3 rounded-lg bg-slate-50 focus:ring-2 focus:ring-[#eee27d] outline-none'>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-[10px] font-black uppercase text-slate-400 ml-1'>Desired Deadline</label>
                <input type='date' id='deadline' onChange={handleChange} className='border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-[#eee27d] outline-none' />
              </div>
          </div>
        </div>

        {/* --- SECTION 2: CONTACT DETAILS --- */}
        <div className='bg-[#1a1a1a] p-8 rounded-2xl shadow-xl border border-white/5'>
          <h2 className='text-sm font-black uppercase tracking-widest text-[#eee27d] mb-8 flex items-center gap-2'>
            <FaUserAlt /> 02. Personal Contact
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <input type='text' id='name' placeholder='Name' required onChange={handleChange} className='bg-white/5 border border-white/10 p-3 rounded-lg text-white outline-none focus:ring-2 focus:ring-[#eee27d]' />
            <input type='text' id='surname' placeholder='Surname' required onChange={handleChange} className='bg-white/5 border border-white/10 p-3 rounded-lg text-white outline-none focus:ring-2 focus:ring-[#eee27d]' />
            
            <div className='relative'>
              <FaEnvelope className='absolute top-4 left-3 text-white/20' />
              <input type='email' id='email' placeholder='Email Address' required onChange={handleChange} className='w-full bg-white/5 border border-white/10 p-3 pl-10 rounded-lg text-white outline-none focus:ring-2 focus:ring-[#eee27d]' />
            </div>

            <div className='relative'>
              <FaPhoneAlt className='absolute top-4 left-3 text-white/20' />
              <input type='text' id='phone' placeholder='Phone Number' required onChange={handleChange} className='w-full bg-white/5 border border-white/10 p-3 pl-10 rounded-lg text-white outline-none focus:ring-2 focus:ring-[#eee27d]' />
            </div>
          </div>
          
          <div className='mt-6'>
            <label className='text-[10px] font-black uppercase text-white/40 ml-1 mb-2 block'>Additional Comments</label>
            <textarea id='comments' rows='3' placeholder='Tell us more about your vision...' onChange={handleChange} className='bg-white/5 border border-white/10 p-3 rounded-lg text-white w-full outline-none focus:ring-2 focus:ring-[#eee27d]'></textarea>
          </div>
        </div>

        {/* --- SUBMIT BUTTON --- */}
        <div className='flex flex-col gap-4'>
          <button 
            disabled={loading}
            className='bg-[#eee27d] text-[#1a1a1a] p-4 rounded-xl uppercase font-black text-sm tracking-widest hover:bg-white transition-all transform active:scale-95 shadow-xl shadow-yellow-500/10 flex items-center justify-center gap-3 disabled:opacity-50'
          >
            {loading ? 'Processing...' : <><FaPaperPlane /> Submit Quote Request</>}
          </button>
          {error && <p className='text-red-500 text-center font-bold text-sm bg-red-50 p-3 rounded-lg border border-red-100'>{error}</p>}
        </div>

      </form>
    </div>
  );
}