import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-[#1a1a1a] shadow-xl sticky top-0 z-50 border-b border-white/5">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4 h-20">
        
        {/* Logo Section */}
        <Link to="/">
          <h1 className="font-black text-2xl sm:text-3xl tracking-tighter flex items-center group">
            <span className="text-[#eee27d] transition-transform group-hover:-translate-y-1">Ar-</span>
            <span className="text-white">Bâti</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form className="hidden sm:flex bg-white/10 p-2 rounded-full border border-white/10 items-center px-4 transition-all focus-within:bg-white/20 focus-within:border-[#eee27d]/50">
          <input
            type="text"
            placeholder="Search projects..."
            className="bg-transparent focus:outline-none w-24 md:w-64 text-sm text-white placeholder:text-slate-400"
          />
          <button type="submit">
            <FaSearch className="text-[#eee27d] ml-2" />
          </button>
        </form>

        {/* Navigation Links */}
        <ul className="flex gap-8 items-center font-bold text-[11px] uppercase tracking-[0.2em]">
          <Link to="/">
            <li className="hidden lg:inline text-slate-300 hover:text-[#eee27d] transition-colors cursor-pointer">Home</li>
          </Link>
          <Link to="/services">
            <li className="hidden lg:inline text-slate-300 hover:text-[#eee27d] transition-colors cursor-pointer">Services</li>
          </Link>
          <Link to="/projects">
            <li className="hidden md:inline text-slate-300 hover:text-[#eee27d] transition-colors cursor-pointer">Projects</li>
          </Link>

          <div className="flex items-center gap-4 ml-2">
            {/* FIXED: Conditional Link Destination */}
            {currentUser ? (
              <>
                {/* Admin Dashboard Button - Only shows if logged in AND admin */}
                {currentUser.role === 'admin' && (
                  <Link 
                    to='/admin-dashboard' 
                    className='hidden sm:block bg-[#eee27d] text-[#1a1a1a] px-4 py-2 rounded-lg hover:bg-white transition-all text-[10px] font-black'
                  >
                    DASHBOARD
                  </Link>
                )}
                
                {/* Profile Image - Only shows if logged in */}
                <Link to="/profile">
                  <img
                    className="rounded-full h-10 w-10 object-cover border-2 border-[#eee27d] shadow-lg active:scale-90 transition-transform"
                    src={currentUser.avatar}
                    alt="profile"
                  />
                </Link>
              </>
            ) : (
              /* Sign In Button - Only shows if logged out */
              <Link to="/sign-in">
                <li className="text-[#1a1a1a] bg-[#eee27d] px-6 py-2 rounded-full hover:bg-white transition duration-300 font-black shadow-[0_0_15px_rgba(238,226,125,0.3)]">
                  Sign In
                </li>
              </Link>
            )}
          </div>
        </ul>
      </div>
    </header>
  );
}