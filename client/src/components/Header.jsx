import { FaSearch } from "react-icons/fa"; // Capital S
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-950 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to ="/" >
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer">
          <span className="text-amber-400">Ar-</span>
          <span className="text-slate-100">Bati</span>
        </h1>
        </Link>
        <form className="bg-slate-100 p-2 rounded-lg flex items-center">
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent focus:outline-none w-24 sm:w-64 text-sm text-slate-900" 
          />
          <button type="submit">
            <FaSearch className="text-slate-600" /> {/* Capital S */}
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
          <li className="hidden sm:inline text-slate-200 hover:underline">Home</li>
          </Link>
          <Link to="/about">

          <li className="hidden sm:inline text-slate-200 hover:underline">About</li>
          </Link>
          <Link to="/sign-in">
          <li className=" text-slate-200 hover:underline">Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}