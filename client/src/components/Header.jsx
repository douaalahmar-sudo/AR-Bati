import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-950 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 h-16">
        
        <Link to="/">
          <h1 className="font-bold text-xl sm:text-2xl flex flex-wrap cursor-pointer tracking-tight">
            <span className="text-amber-400">Ar-</span>
            <span className="text-slate-100">Bati</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-2 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-40 md:w-64 text-sm text-slate-900"
          />
          <button type="submit">
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        <ul className="flex gap-6 items-center font-medium text-xs uppercase tracking-widest">
          <Link to="/">
            <li className="hidden md:inline text-slate-200 hover:text-amber-400 transition">
              Home
            </li>
          </Link>
          
          <Link to="/services">
            <li className="hidden md:inline text-slate-200 hover:text-amber-400 transition">
              Our Services
            </li>
          </Link>

          <Link to="/projects">
            <li className="hidden md:inline text-slate-200 hover:text-amber-400 transition">
              Projects
            </li>
          </Link>

          <Link to="/about">
            <li className="hidden sm:inline text-slate-200 hover:text-amber-400 transition">
              About Us
            </li>
          </Link>

          <Link to="/contact">
            <li className="hidden sm:inline text-slate-200 hover:text-amber-400 transition">
              Contact
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-9 w-9 object-cover border-2 border-amber-400 shadow-sm"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-amber-400 border-2 border-amber-400 px-5 py-1.5 rounded-full hover:bg-amber-400 hover:text-slate-950 transition duration-300 font-bold">
                SIGN IN
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}