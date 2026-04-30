import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CreateProject() {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrls: [], // Matches your MongoDB array structure
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 1. REAL CLOUDINARY UPLOAD LOGIC
  const handleUploadImage = async () => {
    if (!file) return setError('Please select an image first');
    setUploading(true);
    setError(null);

    const data = new FormData();
    data.append("file", file);
    // Use the preset name and cloud name from your Cloudinary settings
    data.append("upload_preset", "du9ubzqky"); 
    data.append("cloud_name", "du9ubzqky");

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/du9ubzqky/image/upload`, {
        method: "POST",
        body: data,
      });

      const uploadedImageUrl = await res.json();
      
      if (uploadedImageUrl.secure_url) {
        // This saves the REAL URL into your state
        setFormData({
          ...formData,
          imageUrls: [uploadedImageUrl.secure_url],
        });
        setUploading(false);
      } else {
        console.error("Cloudinary Error:", uploadedImageUrl);
        setError("Upload failed. Make sure your preset is set to 'Unsigned'.");
        setUploading(false);
      }
    } catch (err) {
      setError('Connection to Cloudinary failed');
      setUploading(false);
    }
  };

  // 2. SAVE TO MONGODB
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.imageUrls.length === 0) {
      return setError('You must verify your image first!');
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/project/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id, // Now defined via Redux
          category: 'Construction', 
          location: 'Sousse',      
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
        return;
      }

      alert("Project Published Successfully!");
      navigate('/projects'); // Redirects to your portfolio

    } catch (err) {
      setLoading(false);
      setError("Connection failed. Is the backend running?");
    }
  };

  return (
    <div className='bg-[#fcfcfc] min-h-screen py-20 px-4'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-4xl font-black text-center mb-10 text-[#1a1a1a] uppercase tracking-tighter'>
          Add <span className='text-[#eee27d]'>New Work</span>
        </h1>
        
        <form onSubmit={handleSubmit} className='flex flex-col gap-8 bg-white p-10 rounded-3xl shadow-2xl border border-slate-100'>
          
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Project Title</label>
            <input 
              type='text' 
              placeholder='e.g. Modern Villa Design' 
              id='title' 
              required 
              className='border-2 border-slate-50 p-5 rounded-2xl focus:outline-none focus:border-[#eee27d] bg-[#fcfcfc] font-bold text-[#1a1a1a] transition-all' 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Project Visualization</label>
            <div className='flex flex-col md:flex-row gap-6 border-2 border-dashed border-[#eee27d]/30 p-8 rounded-3xl bg-[#eee27d]/5 items-center justify-between'>
              <input 
                type='file' 
                accept='image/*' 
                id="file-upload"
                className="hidden" 
                onChange={(e) => setFile(e.target.files[0])} 
              />
              <label 
                htmlFor="file-upload" 
                className="cursor-pointer bg-[#1a1a1a] text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#eee27d] hover:text-[#1a1a1a] transition-all"
              >
                {file ? 'Change Photo' : 'Choose Photo'}
              </label>
              <span className="text-slate-500 text-[10px] font-bold uppercase truncate max-w-[150px]">
                {file ? file.name : "No file selected"}
              </span>

              <button 
                type="button" 
                onClick={handleUploadImage}
                disabled={uploading}
                className='bg-[#eee27d] text-[#1a1a1a] px-6 py-3 rounded-xl uppercase font-black text-[10px] hover:shadow-lg disabled:opacity-50 transition-all'
              >
                {uploading ? 'Uploading...' : 'Verify Image'}
              </button>
            </div>
          </div>

          {/* REAL PREVIEW IMAGE FROM CLOUDINARY */}
          {formData.imageUrls.length > 0 && (
            <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-xl">
              <img src={formData.imageUrls[0]} alt='preview' className='w-full h-80 object-cover' />
              <div className="absolute top-4 left-4 bg-green-500 text-white text-[9px] px-4 py-1.5 rounded-full font-black uppercase tracking-tighter shadow-lg">
                Upload Verified
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Project Background</label>
            <textarea 
              placeholder='Tell the story behind this architecture...' 
              id='description' 
              required 
              className='border-2 border-slate-50 p-5 h-44 rounded-2xl focus:outline-none focus:border-[#eee27d] bg-[#fcfcfc] font-medium text-slate-700 transition-all resize-none'
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />
          </div>

          <button 
            type='submit' 
            disabled={loading || uploading}
            className='bg-[#1a1a1a] text-white p-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#eee27d] hover:text-[#1a1a1a] hover:shadow-2xl active:scale-95 transition-all mt-4 text-xs disabled:opacity-50'
          >
            {loading ? 'Publishing...' : 'Publish Project to Portfolio'}
          </button>
          
          {error && <p className='text-red-500 text-[10px] font-black uppercase text-center tracking-widest'>{error}</p>}
        </form>
      </div>
    </div>
  );
}