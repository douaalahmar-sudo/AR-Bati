import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));

      // Role-based navigation logic added here
      if (data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }
      
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      {/* FIXED: 'Sign' changed from text-white to text-[#1a1a1a] for contrast against light background */}
      <h1 className='text-3xl text-center font-black my-7 text-[#1a1a1a] uppercase tracking-tighter'>
        Sign <span className='text-[#eee27d]'>In</span>
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
          className='bg-[#eee27d] text-[#1a1a1a] p-3 rounded-lg uppercase font-black mt-2 
                     transition-all duration-300 ease-in-out
                     hover:bg-[#1a1a1a] hover:text-[#eee27d] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(238,226,125,0.3)]
                     disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5 justify-center'>
        <p className='text-slate-500'>Don't have an account?</p>
        <Link to={'/sign-up'}>
          {/* Using Ar-Bâti Gold for links instead of slate-800 for consistent accenting */}
          <span className='text-[#eee27d] font-bold cursor-pointer transition-all duration-300 
                           inline-block hover:text-[#1a1a1a] hover:scale-110 
                           border-b-2 border-transparent hover:border-[#1a1a1a] pb-0.5'>
            Sign up
          </span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5 text-center font-semibold'>{error}</p>}
    </div>
  );
}