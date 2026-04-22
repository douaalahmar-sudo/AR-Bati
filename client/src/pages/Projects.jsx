import React, { useState } from 'react';

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const projectData = [
    { title: 'Villa Mediterranean', category: 'Villas', location: 'Port El Kantaoui', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop' },
    { title: 'Modern Office Hub', category: 'Commercial', location: 'Sousse Center', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop' },
    { title: 'Luxury Penthouse', category: 'Renovations', location: 'Hammam Sousse', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop' },
    { title: 'The Grand Mall', category: 'Commercial', location: 'Kalaâ Sghira', image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=800&auto=format&fit=crop' },
    { title: 'Seaside Villa', category: 'Villas', location: 'Chott Meriem', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop' },
    { title: 'Old City Restoration', category: 'Renovations', location: 'Sousse Medina', image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=800&auto=format&fit=crop' },
  ];

  const filteredProjects = filter === 'All' ? projectData : projectData.filter(p => p.category === filter);

  return (
    <div className='bg-[#fcfcfc] py-20 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-black text-[#1a1a1a] uppercase tracking-tighter'>
            Our <span className='text-[#eee27d]'>Projects</span>
          </h1>
          <p className='text-slate-500 mt-4 uppercase tracking-widest text-[10px] font-bold'>Proven excellence across the Sousse coastline</p>
        </div>

        {/* Minimalist Filter */}
        <div className='flex flex-wrap justify-center gap-4 mb-16'>
          {['All', 'Villas', 'Commercial', 'Renovations'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${filter === cat ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-xl' : 'bg-transparent text-slate-400 border-slate-100 hover:border-[#eee27d] hover:text-[#1a1a1a]'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredProjects.map((project, index) => (
            <div key={index} className='group relative overflow-hidden rounded-3xl shadow-xl bg-slate-900 aspect-[4/5]'>
              <img 
                src={project.image} 
                alt={project.title} 
                className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-80' />
              <div className='absolute inset-0 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
                <span className='text-[#eee27d] font-black text-[10px] uppercase tracking-[0.3em] mb-2'>{project.category}</span>
                <h3 className='text-white text-3xl font-black leading-none mb-2'>{project.title}</h3>
                <p className='text-slate-400 text-xs font-bold uppercase tracking-widest'>{project.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}