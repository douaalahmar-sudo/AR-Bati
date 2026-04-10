import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null); // To track errors
  const [loading, setLoading] = useState(false); // To track loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();// bsh ki tclicki ala submit ma trefreshish l page:)
    setLoading(true);
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false) {
          setLoading(false);    
          setError(data.message);
          return;
      }

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      // If success, navigate to sign-in or show success
      navigate('/sign-in'); 
      //setError(null)
      
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-slate-800'>
        Sign Up
      </h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg bg-white focus:outline-yellow-500 transition-all'
          id='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg bg-white focus:outline-yellow-500 transition-all'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg bg-white focus:outline-yellow-500 transition-all'
          id='password'
          onChange={handleChange}
        />

        <button 
          disabled={loading}
          className='bg-black text-yellow-500 p-3 rounded-lg uppercase font-bold mt-2 
                           transition-all duration-300 ease-in-out
                           hover:opacity-95 hover:-translate-y-1 hover:shadow-xl hover:text-yellow-400
                           disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign Up'}  
        </button>
      </form>
     

      <div className='flex gap-2 mt-5 justify-center'>
        <p className='text-slate-500'>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-slate-800 font-bold cursor-pointer transition-all duration-300 
                           inline-block hover:text-yellow-600 hover:scale-110 
                           border-b-2 border-transparent hover:border-yellow-600 pb-0.5'>
            Sign in
          </span>
        </Link>
      </div>
      
      {/* Show error message if something goes wrong */}
      {error && <p className='text-red-500 mt-5 text-center font-semibold'>{error}</p>}
    </div>
  );
}