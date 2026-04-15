import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  
  const [file, setFile] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    setLoading(true);
    
    const previewUrl = URL.createObjectURL(file);
    
    setTimeout(() => {
      setFormData({ ...formData, avatar: previewUrl });
      setLoading(false);
    }, 1500); 
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7 uppercase tracking-wider">
        My Profile
      </h1>
      
      <form className="flex flex-col gap-4">
        <input 
          type="file" 
          ref={fileRef} 
          hidden 
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />  
        
        <div className="relative self-center group">
          <img
            onClick={() => !loading && fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className={`rounded-full h-24 w-24 object-cover cursor-pointer mt-2 border-2 border-[#eee27d] transition-all duration-300 ${loading ? 'opacity-40' : 'hover:opacity-90'}`}
          />
          
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center mt-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
          )}
        </div>
        
        {loading && <p className="text-sm text-center text-slate-500">Processing image...</p>}
        
        <input
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:border-black"
        />
        
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:border-black"
        />
        
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:border-black"
        />

        <button 
          disabled={loading}
          className="bg-black text-white p-3 rounded-lg uppercase font-bold transition-all duration-300 ease-in-out hover:opacity-95 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:translate-y-0"
        >
          {loading ? 'Uploading...' : 'Update'}
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