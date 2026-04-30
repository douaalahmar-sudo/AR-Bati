import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#121212] py-4 border-b border-white/10">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
        <Link to="/" onClick={() => setDropdownOpen(false)}>
          <h1 className="font-black text-2xl tracking-tighter">
            <span className="text-[#eee27d]">Ar-</span><span className="text-white">Bâti</span>
          </h1>
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex gap-8 font-bold text-[11px] uppercase tracking-[0.2em] text-slate-400">
            <Link to="/"><li className="hover:text-white transition-all">Home</li></Link>
            <Link to="/services"><li className="hover:text-white transition-all">Services</li></Link>
            <Link to="/projects"><li className="hover:text-white transition-all">Projects</li></Link>
            <Link to="/about"><li className="hover:text-white transition-all">About</li></Link>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/admin-inquiries">
            <button className="w-[110px] bg-[#eee27d] text-[#1a1a1a] py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-lg">
              Inbox
            </button>
          </Link>
          
          <Link to="/contact">
            <button className="w-[110px] border border-[#eee27d] text-[#eee27d] py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#eee27d] hover:text-[#1a1a1a] transition-all">
              Contact
            </button>
          </Link>

          {currentUser ? (
            <div className="relative">
              <img
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="rounded-full h-10 w-10 object-cover cursor-pointer border-2 border-transparent hover:border-[#eee27d] transition-all"
                src={currentUser.avatar}
                alt="profile"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-2xl py-2 border border-slate-100 z-[100]">
                  <Link to="/admin-inquiries" onClick={() => setDropdownOpen(false)}>
                    <div className="px-4 py-3 text-[11px] font-black uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-[#eee27d]">
                      Inquiry Manager
                    </div>
                  </Link>
                  <Link to="/dashboard" onClick={() => setDropdownOpen(false)}>
                    <div className="px-4 py-3 text-[11px] font-black uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-[#eee27d]">
                      Dashboard
                    </div>
                  </Link>
                  <div className="border-t border-slate-100 my-1"></div>
                  <div className="px-4 py-3 text-[11px] font-black uppercase tracking-wider text-red-500 hover:bg-red-50 cursor-pointer">
                    Sign Out
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/sign-in" className="text-white font-bold text-[11px] uppercase tracking-widest hover:text-[#eee27d]">Sign In</Link>
          )}
        </div>
      </div>
    </header>
  );
}