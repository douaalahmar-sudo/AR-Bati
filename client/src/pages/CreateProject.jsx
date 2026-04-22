import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateProject() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    if (!file) return setError('Please select an image first');
    setUploading(true);
    setError(null);
    // Cloudinary Logic ... (keep your existing try/catch)
    setTimeout(() => { setUploading(false); setFormData({...formData, image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e"}); }, 1000); // Dummy for styling test
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return setError('Please upload an image first');
    // Database logic ...
    navigate('/projects');
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
              <span className="text-slate-500 text-[10px] font-bold uppercase truncate max-w-[200px]">
                {file ? file.name : "No file selected"}
              </span>

              <button 
                type='button' 
                onClick={handleUploadImage} 
                disabled={uploading || !file}
                className='w-full md:w-auto bg-[#eee27d] text-[#1a1a1a] px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-30 shadow-lg'
              >
                {uploading ? 'Processing...' : 'Confirm Upload'}
              </button>
            </div>
          </div>

          {formData.image && (
            <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-xl">
              <img src={formData.image} alt='preview' className='w-full h-80 object-cover' />
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
            className='bg-[#1a1a1a] text-white p-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#eee27d] hover:text-[#1a1a1a] hover:shadow-2xl active:scale-95 transition-all mt-4 text-xs'
          >
            Publish Project to Portfolio
          </button>
          
          {error && <p className='text-red-500 text-[10px] font-black uppercase text-center tracking-widest'>{error}</p>}
        </form>
      </div>
    </div>
  );
}