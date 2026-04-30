import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHardHat, FaMapMarkerAlt, FaPaperPlane, FaUserAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function Devis() {
  const [formData, setFormData] = useState({
    type: 'quote', // Added to satisfy "Consultation of Quote Requests"
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

// ... (imports remain the same)
// Inside handleSubmit, change only the fetch block:

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch('/api/inquiry/create', { // Hit unified inquiry route
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: 'pending' // Set default status
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) return setError(data.message);
      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
      
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  if (success) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] text-center p-6'>
        <div className='bg-[#eee27d]/20 text-[#eee27d] p-8 rounded-full mb-4 animate-bounce'>
          <FaPaperPlane className='text-4xl' />
        </div>
        <h2 className='text-3xl font-black text-[#1a1a1a] uppercase tracking-tighter'>Request Sent!</h2>
        <p className='text-slate-500 mt-2 font-medium'>Our team in Sousse will review your project and contact you shortly.</p>
      </div>
    );
  }

  return (
    <div className='p-6 max-w-5xl mx-auto pt-24'>
      <div className='mb-10 text-center'>
        <h1 className='text-4xl md:text-6xl font-black text-[#1a1a1a] uppercase tracking-tighter'>
          Quote <span className='text-[#eee27d]'>Request</span>
        </h1>
        <p className='text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-3'>Expert Building Solutions for Sousse and the Sahel</p>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
        
        {/* --- SECTION 1: PROJECT SPECIFICATIONS --- */}
        <div className='bg-white p-8 rounded-3xl shadow-sm border border-slate-100'>
          <h2 className='text-xs font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-3'>
            <span className='bg-[#eee27d] text-[#1a1a1a] w-6 h-6 rounded-full flex items-center justify-center text-[10px]'>01</span> Project Details
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='flex flex-col gap-2'>
              <label className='text-[10px] font-black uppercase text-slate-500 ml-1'>Site Type</label>
              <select id='siteType' required onChange={handleChange} className='border-2 border-slate-50 p-3 rounded-xl bg-slate-50 focus:bg-white focus:border-[#eee27d] outline-none transition-all'>
                <option value="">Select Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>
            
            <div className='flex flex-col gap-2'>
              <label className='text-[10px] font-black uppercase text-slate-500 ml-1'>Property Type</label>
              <input type='text' id='propertyType' placeholder='e.g. Villa, Apartment' required onChange={handleChange} className='border-2 border-slate-50 p-3 rounded-xl focus:border-[#eee27d] outline-none transition-all' />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-[10px] font-black uppercase text-slate-500 ml-1'>Area (m²)</label>
              <input type='text' id='area' placeholder='e.g. 150' required onChange={handleChange} className='border-2 border-slate-50 p-3 rounded-xl focus:border-[#eee27d] outline-none transition-all' />
            </div>

            <div className='flex flex-col gap-2 lg:col-span-2'>
              <label className='text-[10px] font-black uppercase text-slate-500 ml-1'>Location</label>
              <div className='relative'>
                <FaMapMarkerAlt className='absolute top-4 left-4 text-slate-300' />
                <input type='text' id='location' placeholder='Project Address in Sousse/Sahel' required onChange={handleChange} className='w-full border-2 border-slate-50 p-3 pl-12 rounded-xl focus:border-[#eee27d] outline-none transition-all' />
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-[10px] font-black uppercase text-slate-500 ml-1'>Budget (TND)</label>
              <input type='number' id='budget' placeholder='Estimated Budget' required onChange={handleChange} className='border-2 border-slate-50 p-3 rounded-xl focus:border-[#eee27d] outline-none transition-all' />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
              <div className='flex flex-col gap-2'>
                <label className='text-[10px] font-black uppercase text-slate-500 ml-1'>Level of Finish</label>
                <select id='finishLevel' onChange={handleChange} className='border-2 border-slate-50 p-3 rounded-xl bg-slate-50 focus:bg-white focus:border-[#eee27d] outline-none transition-all'>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-[10px] font-black uppercase text-slate-500 ml-1'>Desired Deadline</label>
                <input type='date' id='deadline' onChange={handleChange} className='border-2 border-slate-50 p-3 rounded-xl focus:border-[#eee27d] outline-none transition-all' />
              </div>
          </div>
        </div>

        {/* --- SECTION 2: CONTACT DETAILS --- */}
        <div className='bg-[#1a1a1a] p-8 rounded-3xl shadow-2xl border border-white/5'>
          <h2 className='text-xs font-black uppercase tracking-widest text-[#eee27d] mb-8 flex items-center gap-3'>
            <span className='bg-[#eee27d] text-[#1a1a1a] w-6 h-6 rounded-full flex items-center justify-center text-[10px]'>02</span> Personal Contact
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <input type='text' id='name' placeholder='Name' required onChange={handleChange} className='bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#eee27d] transition-all' />
            <input type='text' id='surname' placeholder='Surname' required onChange={handleChange} className='bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#eee27d] transition-all' />
            
            <div className='relative'>
              <FaEnvelope className='absolute top-5 left-4 text-white/20' />
              <input type='email' id='email' placeholder='Email Address' required onChange={handleChange} className='w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#eee27d] transition-all' />
            </div>

            <div className='relative'>
              <FaPhoneAlt className='absolute top-5 left-4 text-white/20' />
              <input type='text' id='phone' placeholder='Phone Number' required onChange={handleChange} className='w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#eee27d] transition-all' />
            </div>
          </div>
          
          <div className='mt-6'>
            <label className='text-[10px] font-black uppercase text-white/40 ml-1 mb-3 block'>Additional Comments</label>
            <textarea id='comments' rows='4' placeholder='Tell us more about your vision...' onChange={handleChange} className='bg-white/5 border border-white/10 p-4 rounded-xl text-white w-full outline-none focus:ring-2 focus:ring-[#eee27d] transition-all'></textarea>
          </div>
        </div>

        {/* --- SUBMIT BUTTON --- */}
        <div className='flex flex-col gap-4'>
          <button 
            disabled={loading}
            className='bg-[#eee27d] text-[#1a1a1a] p-5 rounded-2xl uppercase font-black text-sm tracking-[0.2em] hover:bg-white transition-all transform active:scale-95 shadow-2xl shadow-[#eee27d]/20 flex items-center justify-center gap-4 disabled:opacity-50'
          >
            {loading ? (
              <span className='flex items-center gap-2'>
                <svg className="animate-spin h-5 w-5 text-[#1a1a1a]" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Project...
              </span>
            ) : (
              <><FaPaperPlane /> Submit Quote Request</>
            )}
          </button>
          {error && <p className='text-red-500 text-center font-bold text-xs bg-red-50/50 p-4 rounded-xl border border-red-100/20 backdrop-blur-sm'>{error}</p>}
        </div>

      </form>
    </div>
  );
}