import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { 
  updateUserStart, 
  updateUserSuccess, 
  updateUserFailure, 
  deleteUserStart, 
  deleteUserSuccess, 
  deleteUserFailure, 
  signOutUserStart,     
  signOutUserSuccess,
  signOutUserFailure
} from "../redux/user/userSlice";






export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser, loading: reduxLoading, error } = useSelector((state) => state.user);
  
  const [file, setFile] = useState(undefined);
  const [imageLoading, setImageLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  // FIXED: Separate local state so the Update button doesn't react to Sign Out
  const [isUpdating, setIsUpdating] = useState(false);

  // Handles Profile Image Preview
  useEffect(() => {
    if (file) {
      setImageLoading(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result }); 
        setImageLoading(false);
      };
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateSuccess(false);
    
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        setIsUpdating(false);
        return;
      }
      
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      setIsUpdating(false);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setIsUpdating(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm("Are you sure you want to permanently delete your account?")) return;
    
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

const handleSignOut = async () => {
  try {
    dispatch(signOutUserStart());
    const res = await fetch('/api/auth/signout');
    const data = await res.json();

    if (data.success === false) {
      dispatch(signOutUserFailure(data.message));
      return;
    }
    
    // THIS MUST RUN TO HIDE THE DASHBOARD
    dispatch(signOutUserSuccess(data));
    
  } catch (error) {
    // FALLBACK: If the server sends an HTML error, clear the state anyway
    console.log("Server error, but clearing local state...");
    dispatch(signOutUserSuccess()); 
    dispatch(signOutUserFailure(error.message));
  }
};
  return (
    <div className="bg-[#fcfcfc] min-h-screen py-20 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-black text-center mb-10 text-[#1a1a1a] uppercase tracking-tighter">
          Account <span className="text-[#eee27d]">Settings</span>
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
          <input 
            type="file" 
            ref={fileRef} 
            hidden 
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />  
          
          {/* Profile Image Section */}
          <div className="relative self-center mb-6">
            <img
              onClick={() => !imageLoading && fileRef.current.click()}
              src={formData.avatar || currentUser?.avatar}
              alt="profile"
              className={`rounded-full h-32 w-32 object-cover cursor-pointer border-4 border-[#eee27d] shadow-xl transition-all duration-300 ${imageLoading ? 'opacity-40' : 'hover:scale-105'}`}
            />
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a1a1a]"></div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Username</label>
            <input
              type="text"
              id="username"
              defaultValue={currentUser?.username}
              onChange={handleChange}
              className="bg-[#fcfcfc] border-2 border-slate-50 p-4 rounded-xl focus:outline-none focus:border-[#eee27d] font-bold text-[#1a1a1a] transition-all"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
            <input
              type="email"
              id="email"
              defaultValue={currentUser?.email}
              onChange={handleChange}
              className="bg-[#fcfcfc] border-2 border-slate-50 p-4 rounded-xl focus:outline-none focus:border-[#eee27d] font-bold text-[#1a1a1a] transition-all"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">New Password</label>
            <input
              type="password"
              id="password"
              placeholder="Leave empty to keep current"
              onChange={handleChange}
              className="bg-[#fcfcfc] border-2 border-slate-50 p-4 rounded-xl focus:outline-none focus:border-[#eee27d] font-bold text-[#1a1a1a] transition-all"
            />
          </div>

          <button 
            disabled={imageLoading || isUpdating}
            className="bg-[#1a1a1a] text-white p-5 rounded-2xl uppercase font-black tracking-[0.2em] text-xs transition-all duration-300 hover:bg-[#eee27d] hover:text-[#1a1a1a] hover:shadow-2xl disabled:opacity-50 mt-4 shadow-lg active:scale-95"
          >
            {isUpdating ? 'Saving Changes...' : 'Update Account'}
          </button>
        </form>

        {/* Action Links */}
        <div className="flex justify-between mt-10 px-4">
          <button 
            type="button"
            onClick={handleDeleteUser} 
            className="text-red-600 font-black uppercase text-[10px] tracking-widest hover:text-red-800 transition-all"
          >
            Delete Account
          </button>
          
          <button 
            type="button"
            onClick={handleSignOut} 
            className="text-[#1a1a1a] font-black uppercase text-[10px] tracking-widest bg-[#eee27d] px-6 py-2 rounded-full hover:bg-[#1a1a1a] hover:text-white transition-all shadow-md active:scale-95"
          >
            Sign Out
          </button>
        </div>

        {/* Success/Error Feedback */}
        {updateSuccess && (
          <div className="mt-8 p-4 bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm animate-fade-in">
            <p className="text-green-700 text-[11px] font-black uppercase tracking-widest text-center">
              Profile Updated Successfully
            </p>
          </div>
        )}
        
        {error && (
          <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl shadow-sm">
            <p className="text-red-600 text-[11px] font-black uppercase tracking-widest text-center">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}