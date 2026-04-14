import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7 uppercase tracking-wider">
        My Profile
      </h1>
      
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 border-2 border-[#eee27d]"
        />
        
        <input
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={currentUser.username}
          className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:border-black"
        />
        
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:border-black"
        />
        
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:border-black"
        />

        <button className="bg-black text-white p-3 rounded-lg uppercase font-bold transition-all duration-300 ease-in-out hover:opacity-95 hover:-translate-y-1 hover:shadow-xl disabled:opacity-80">
          Update
        </button>

        <button 
          type="button" 
          className="bg-[#eee27d] text-black p-3 rounded-lg uppercase font-bold transition-all duration-300 ease-in-out hover:opacity-95 hover:-translate-y-1 hover:shadow-xl"
        >
          New Project
        </button>
      </form>

      <div className="flex justify-between mt-5 font-medium">
        <span className="text-red-700 cursor-pointer hover:underline">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer hover:underline">
          Sign Out
        </span>
      </div>
    </div>
  );
}