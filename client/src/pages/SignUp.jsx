import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // bsh ki tclicki ala submit ma trefreshish l page:)
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {
          setLoading(false);    
          setError(data.message);
          return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in'); 
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-black my-7 text-[#1a1a1a] uppercase tracking-tighter'>
        Sign <span className='text-[#eee27d]'>Up</span>
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border border-slate-200 p-3 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#eee27d] transition-all'
          id='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border border-slate-200 p-3 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#eee27d] transition-all'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border border-slate-200 p-3 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#eee27d] transition-all'
          id='password'
          onChange={handleChange}
        />
        <button 
          disabled={loading}
          className='bg-[#eee27d] text-[#1a1a1a] p-3 rounded-lg uppercase font-black mt-2 transition-all duration-300 ease-in-out hover:bg-[#1a1a1a] hover:text-[#eee27d] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(238,226,125,0.3)] disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}  
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5 justify-center'>
        <p className='text-slate-500'>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-[#eee27d] font-bold cursor-pointer transition-all duration-300 inline-block hover:text-[#1a1a1a] hover:scale-110 border-b-2 border-transparent hover:border-[#1a1a1a] pb-0.5'>
            Sign in
          </span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5 text-center font-semibold'>{error}</p>}
    </div>
  );
}