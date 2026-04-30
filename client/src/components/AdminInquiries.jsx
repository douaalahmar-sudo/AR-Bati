import { useEffect, useState } from 'react';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null); // Logic for selecting an inquiry
  const [replyBody, setReplyBody] = useState("");
  const [sending, setSending] = useState(false);

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

const handleSendReply = async (e) => {
  e.preventDefault();
  setSending(true);
  try {
    const res = await fetch(`/api/inquiry/reply/${selectedInquiry._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Ensure 'email' is explicitly passed from the selected inquiry
      body: JSON.stringify({ 
        message: replyBody, 
        email: selectedInquiry.email 
      }),
    });
    
    const data = await res.json();
    if (data.success) {
      alert("Email delivered successfully!"); // This shows the success feedback
      setSelectedInquiry(null);
      setReplyBody("");
      fetchInquiries(); // Refresh the table to show the green 'REPLIED' badge
    } else {
      alert("Server error: " + data.message);
    }
  } catch (err) {
    alert("Failed to reach the server. Check your internet or backend terminal.");
  } finally {
    setSending(false);
  }
};

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
                  <span className={item.type === 'quote' ? 'text-blue-600' : 'text-slate-400'}>{item.type || 'Contact'}</span>
                </td>
                <td className="p-4">
                  <div style={{ fontStyle: 'normal' }} className="font-bold text-slate-800">
                    {item.fullName || `${item.name || ''} ${item.surname || ''}`.trim() || 'Guest'}
                  </div>
                  <div style={{ fontStyle: 'normal' }} className="text-[11px] text-slate-400 font-bold">{item.email}</div>
                </td>
                <td className="p-4 max-w-md">
                   <span style={{ fontStyle: 'normal' }} className="font-black text-[#1a1a1a] text-[10px] uppercase block mb-1">
                    {item.siteType ? `${item.siteType} - ${item.propertyType}` : 'General Inquiry'}
                  </span>
                  <p style={{ fontStyle: 'normal' }} className="text-slate-600 font-medium leading-relaxed">{item.comments || item.message}</p>
                </td>
                <td className="p-4 text-center">
                  <span style={{ fontStyle: 'normal' }} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${
                    item.status === 'replied' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-amber-100 text-amber-700 border-amber-200'
                  }`}>
                    {item.status || 'Pending'}
                  </span>
                </td>
                <td className="p-4 text-right last:rounded-r-xl">
                  {/* KEY FIX: Added onClick logic to open the modal */}
                  <button 
                    onClick={() => setSelectedInquiry(item)}
                    className="bg-[#1a1a1a] text-white px-6 py-2 rounded-full font-black uppercase text-[10px] hover:bg-[#eee27d] hover:text-[#1a1a1a] transition-all shadow-md"
                  >
                    Reply
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="5" className="p-20 text-center font-black uppercase text-slate-300">No data found in database</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- REPLY MODAL --- */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-200">
            <div className="bg-[#1a1a1a] p-6 flex justify-between items-center">
              <h3 className="text-[#eee27d] font-black uppercase text-sm tracking-widest">
                Reply to: {selectedInquiry.email}
              </h3>
              <button onClick={() => setSelectedInquiry(null)} className="text-white/40 hover:text-white transition-all">
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSendReply} className="p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Your Response</label>
                <textarea 
                  required
                  rows="6"
                  placeholder="Type your reply here..."
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 focus:border-[#eee27d] outline-none transition-all font-medium text-slate-700"
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                ></textarea>
              </div>
              
              <button 
                disabled={sending}
                className="bg-[#eee27d] text-[#1a1a1a] p-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#1a1a1a] hover:text-white transition-all disabled:opacity-50"
              >
                {sending ? "Sending..." : <><FaPaperPlane /> Send Email Response</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}