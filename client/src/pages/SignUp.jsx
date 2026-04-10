import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-slate-800'>
        Sign Up
      </h1>
      
      <form className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg bg-white focus:outline-yellow-500 transition-all'
          id='username'
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg bg-white focus:outline-yellow-500 transition-all'
          id='email'
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg bg-white focus:outline-yellow-500 transition-all'
          id='password'
        />

        {/* UPDATED BUTTON:
            - hover:-translate-y-1: Makes the button "lift" up slightly.
            - hover:shadow-lg: Adds a deep shadow underneath when lifted.
            - hover:text-yellow-400: Brightens the gold text on hover.
            - transition-all duration-300: Makes the movement smooth.
        */}
        <button className='bg-black text-yellow-500 p-3 rounded-lg uppercase font-bold mt-2 
                           transition-all duration-300 ease-in-out
                           hover:opacity-95 hover:-translate-y-1 hover:shadow-xl hover:text-yellow-400
                           disabled:opacity-80'>
          Sign Up
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
    </div>
  );
}