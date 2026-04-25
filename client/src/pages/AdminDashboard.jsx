import React, { useEffect, useState } from 'react';
import { FaProjectDiagram, FaEnvelope, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 1. Fetch real quotes from the backend
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/quote/get');
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setQuotes(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);


const handleDeleteQuote = async (quoteId) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    try {
      const res = await fetch(`/api/quote/delete/${quoteId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) return;

      // This updates your table instantly
      setQuotes((prev) => prev.filter((quote) => quote._id !== quoteId));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='p-6 max-w-7xl mx-auto'>
      <h1 className='text-3xl font-black uppercase tracking-tighter mb-8'>
        Admin <span className='text-[#eee27d]'>Control Center</span>
      </h1>

      {/* STAT CARDS - Now Dynamic */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
        <div className='bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#eee27d]'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>Total Projects</p>
              <h2 className='text-3xl font-black mt-1'>12</h2> {/* Static for now */}
            </div>
            <FaProjectDiagram className='text-slate-200 text-3xl' />
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-400'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>New Inquiries</p>
              <h2 className='text-3xl font-black mt-1'>{quotes.length}</h2>
            </div>
            <FaEnvelope className='text-slate-200 text-3xl' />
          </div>
        </div>

        <div className='bg-[#1a1a1a] p-6 rounded-xl shadow-lg flex items-center justify-center'>
          <Link to='/create-project' className='flex items-center gap-3 text-[#eee27d] font-black uppercase text-sm tracking-widest hover:scale-105 transition-transform'>
            <FaPlusCircle /> Add New Project
          </Link>
        </div>
      </div>

      {/* QUOTES TABLE - The "Consultation" Area */}
      <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
        <div className='p-6 border-b border-slate-50 bg-slate-50/50'>
          <h3 className='font-black uppercase text-sm tracking-widest text-slate-500'>Recent Quote Requests</h3>
        </div>
        
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='text-[10px] uppercase tracking-widest text-slate-400 bg-slate-50/30'>
                <th className='p-4 font-black'>Client</th>
                <th className='p-4 font-black'>Project Type</th>
                <th className='p-4 font-black'>Location</th>
                <th className='p-4 font-black'>Budget (TND)</th>
                <th className='p-4 font-black text-right'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-50'>
              {quotes.length > 0 ? (
                quotes.map((quote) => (
                  <tr key={quote._id} className='hover:bg-slate-50 transition-colors'>
                    <td className='p-4'>
                      <div className='font-bold text-slate-800'>{quote.name} {quote.surname}</div>
                      <div className='text-xs text-slate-400'>{quote.email}</div>
                    </td>
                    <td className='p-4'>
                      <span className='px-2 py-1 bg-[#eee27d]/20 text-[#1a1a1a] text-[10px] font-bold rounded uppercase'>
                        {quote.siteType}
                      </span>
                    </td>
                    <td className='p-4 text-sm text-slate-600'>{quote.location}</td>
                    <td className='p-4 font-mono font-bold text-slate-700'>{quote.budget}</td>
                    <td className='p-4 text-right'>
                      <button 
                        className='text-red-400 hover:text-red-600 transition-colors'
                        onClick={() => handleDeleteQuote(quote._id)}
                      >
                        <FaTrash size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className='p-10 text-center text-slate-400 italic'>
                    {loading ? "Loading inquiries..." : "No quote requests found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}