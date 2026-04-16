import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { 
  updateUserStart, 
  updateUserSuccess, 
  updateUserFailure, 
  deleteUserStart, 
  deleteUserSuccess, 
  deleteUserFailure 
} from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser, loading: userLoading } = useSelector((state) => state.user);
  
  const [file, setFile] = useState(undefined);
  const [imageLoading, setImageLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // 1. Handles the Image Selection
  useEffect(() => {
    if (file) {
      setImageLoading(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result }); // Saves Base64 string
        setImageLoading(false);
      };
    }
  }, [file]);

  // 2. Handles the Text Inputs (Username, Email, Password)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 3. Handles the Update Button Click
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Sends everything to the backend
      });
      const data = await res.json();
      
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true); // Show success message
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
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
      alert("Account has been successfully deleted."); 
      dispatch(deleteUserSuccess());

    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7 uppercase tracking-wider">
        My Profile
      </h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="file" 
          ref={fileRef} 
          hidden 
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />  
        
        <div className="relative self-center group">
          <img
            onClick={() => !imageLoading && fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className={`rounded-full h-24 w-24 object-cover cursor-pointer mt-2 border-2 border-[#eee27d] transition-all duration-300 ${imageLoading ? 'opacity-40' : 'hover:opacity-90'}`}
          />
          
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center mt-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
          )}
        </div>
        
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
          disabled={imageLoading || userLoading}
          className="bg-black text-white p-3 rounded-lg uppercase font-bold transition-all duration-300 ease-in-out hover:opacity-95 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:translate-y-0"
        >
          {userLoading ? 'Updating...' : 'Update'}
        </button>
        
        <button 
          type="button" 
          className="bg-[#eee27d] text-black p-3 rounded-lg uppercase font-bold transition-all duration-300 ease-in-out hover:opacity-95 hover:-translate-y-1 hover:shadow-xl"
        >
          New Project
        </button>
      </form>

      <div className="flex justify-between mt-5 font-medium">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer hover:underline">Delete Account</span>
        <span className="text-red-700 cursor-pointer hover:underline">Sign Out</span>
      </div>

      {updateSuccess && (
        <p className="text-green-700 mt-5 text-center font-medium">User is updated successfully!</p>
      )}
    </div>
  );
}