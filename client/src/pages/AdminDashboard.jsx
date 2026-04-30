import { useEffect, useState } from 'react';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);

  const fetchInquiries = async () => {
    try {
      const res = await fetch(`/api/inquiry/all?t=${new Date().getTime()}`);
      const data = await res.json();
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-7xl mx-auto mt-28 mb-40 border border-slate-100">
      <h2 style={{ fontStyle: 'normal' }} className="text-3xl font-black mb-10 tracking-tighter uppercase">
        AR-BÂTI <span className="text-[#eee27d]">INQUIRY MANAGER</span>
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-black">
              <th className="p-4">Type</th>
              <th className="p-4">Client</th>
              <th className="p-4">Project / Message</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {inquiries.length > 0 ? inquiries.map((item) => (
              <tr key={item._id} className="bg-slate-50/50 hover:bg-slate-100 transition-all rounded-xl">
                <td className="p-4 first:rounded-l-xl uppercase font-black text-[10px]">
                  <span className={item.type === 'quote' ? 'text-blue-600' : 'text-slate-400'}>
                    {item.type || 'Contact'}
                  </span>
                </td>
                <td className="p-4">
                  {/* Matches 'name' and 'surname' from your Devis form */}
                  <div style={{ fontStyle: 'normal' }} className="font-bold text-slate-800">
                    {item.fullName || `${item.name || ''} ${item.surname || ''}` || 'Guest User'}
                  </div>
                  <div style={{ fontStyle: 'normal' }} className="text-[11px] text-slate-400 font-bold">{item.email}</div>
                </td>
                <td className="p-4 max-w-md">
                   <span style={{ fontStyle: 'normal' }} className="font-black text-[#1a1a1a] text-[10px] uppercase block mb-1">
                    {item.siteType ? `${item.siteType} - ${item.propertyType}` : 'General Inquiry'}
                  </span>
                  <p style={{ fontStyle: 'normal' }} className="text-slate-600 font-medium leading-relaxed">
                    {/* KEY FIX: Now correctly looking for 'comments' from your forms */}
                    {item.comments || item.message || "No content provided."}
                  </p>
                </td>
                <td className="p-4 text-center">
                  <span style={{ fontStyle: 'normal' }} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${
                    item.status === 'replied' 
                    ? 'bg-green-100 text-green-700 border-green-200' 
                    : 'bg-amber-100 text-amber-700 border-amber-200'
                  }`}>
                    {item.status || 'Pending'}
                  </span>
                </td>
                <td className="p-4 text-right last:rounded-r-xl">
                  <button className="bg-[#1a1a1a] text-white px-6 py-2 rounded-full font-black uppercase text-[10px] hover:bg-[#eee27d] hover:text-[#1a1a1a] transition-all shadow-md">
                    Reply
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="5" className="p-20 text-center font-black uppercase text-slate-300">No inquiries found in database</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}