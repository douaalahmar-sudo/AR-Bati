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
    try {
      setStatus('sending');
      const res = await fetch('/api/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setStatus('error');
        return;
      }
      setStatus('success');
      setFormData({ name: '', email: '', message: '' }); 
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-4xl font-bold mb-10 text-slate-800 text-center'>
        Get in <span className='text-amber-400'>Touch</span>
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
        <div className='flex flex-col gap-6'>
          <div className='bg-white p-6 rounded-lg shadow-md border-t-4 border-amber-400'>
            <h2 className='text-2xl font-semibold mb-4 text-slate-900'>Contact Details</h2>
            <div className='flex flex-col gap-4 text-slate-600'>
              <div className='flex items-center gap-3'>
                <FaPhone className='text-amber-400' />
                <span>+216 73 000 000</span> {/* Sousse Area Code */}
              </div>
              <div className='flex items-center gap-3'>
                <FaEnvelope className='text-amber-400' />
                <span>contact@arbati.tn</span>
              </div>
              <div className='flex items-center gap-3'>
                <FaMapMarkerAlt className='text-amber-400' />
                <span>Sousse, Tunisia</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type='text' placeholder='Full Name' id='name' value={formData.name} className='p-3 rounded-lg border focus:outline-amber-400' onChange={handleChange} required />
            <input type='email' placeholder='Email' id='email' value={formData.email} className='p-3 rounded-lg border focus:outline-amber-400' onChange={handleChange} required />
            <textarea placeholder='Your Message' id='message' value={formData.message} rows='4' className='p-3 rounded-lg border focus:outline-amber-400' onChange={handleChange} required></textarea>
            <button className='bg-slate-950 text-white p-3 rounded-lg uppercase font-bold hover:bg-amber-400 hover:text-slate-950 transition duration-300'>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <p className='text-green-600 font-medium'>Message sent successfully!</p>}
          </form>
        </div>

        <div className='h-100 rounded-lg overflow-hidden shadow-md border border-slate-300'>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51740.1604381273!2d10.584347572710344!3d35.82835287019842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130275759ac9d171%3A0x69377640578e6ad!2sSousse!5e0!3m2!1sen!2stn!4v1713800000000!5m2!1sen!2stn" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy">
          </iframe>
        </div>
      </div>
    </div>
  );
}