import React, { useState, useEffect } from 'react';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]); // Database projects
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from your backend API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/project/get');
        const data = await res.json();
        
        // If your API returns an object with a success field, handle it:
        if (data.success === false) {
          console.log(data.message);
          setLoading(false);
          return;
        }

        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.log("Fetch error:", error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // 2. Apply filtering logic to the database results
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className='bg-[#fcfcfc] py-20 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-black text-[#1a1a1a] uppercase tracking-tighter'>
            Our <span className='text-[#eee27d]'>Projects</span>
          </h1>
          <p className='text-slate-500 mt-4 uppercase tracking-widest text-[10px] font-bold'>
            Proven excellence across the Sousse coastline
          </p>
        </div>

        {/* Minimalist Filter */}
        <div className='flex flex-wrap justify-center gap-4 mb-16'>
          {['All', 'Villas', 'Commercial', 'Renovations'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                filter === cat 
                  ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-xl' 
                  : 'bg-transparent text-slate-400 border-slate-100 hover:border-[#eee27d] hover:text-[#1a1a1a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {loading ? (
             <div className="col-span-full text-center py-20">
                <p className="text-slate-400 font-black uppercase tracking-widest animate-pulse">Synchronizing Portfolio...</p>
             </div>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div key={project._id} className='group relative overflow-hidden rounded-3xl shadow-xl bg-slate-900 aspect-[4/5]'>
                <img 
                    // Use imageUrls[0] because we are sending it as an array
                    src={project.imageUrls && project.imageUrls[0]} 
                    alt={project.title} 
                    className='w-full h-full object-cover...'
/>
                <div className='absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-80' />
                <div className='absolute inset-0 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
                  <span className='text-[#eee27d] font-black text-[10px] uppercase tracking-[0.3em] mb-2'>
                    {project.category}
                  </span>
                  <h3 className='text-white text-3xl font-black leading-none mb-2'>
                    {project.title}
                  </h3>
                  <p className='text-slate-400 text-xs font-bold uppercase tracking-widest'>
                    {project.location}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl">
               <p className="text-slate-400 font-bold uppercase tracking-widest">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}