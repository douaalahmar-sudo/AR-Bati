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
    <div className='py-16 px-4 max-w-7xl mx-auto'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-slate-800'>Our <span className='text-amber-400'>Projects</span></h1>
        <p className='text-slate-600 mt-4'>Proven excellence across the Sousse coastline.</p>
      </div>

      {/* Filter Buttons */}
      <div className='flex flex-wrap justify-center gap-4 mb-12'>
        {['All', 'Villas', 'Commercial', 'Renovations'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${filter === cat ? 'bg-amber-400 text-slate-900 shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {filteredProjects.map((project, index) => (
          <div key={index} className='group relative overflow-hidden rounded-2xl shadow-lg bg-slate-200 aspect-[4/3]'>
            <img 
              src={project.image} 
              alt={project.title} 
              className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
            />
            {/* Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6'>
              <span className='text-amber-400 font-bold text-sm mb-1'>{project.category}</span>
              <h3 className='text-white text-2xl font-bold'>{project.title}</h3>
              <p className='text-slate-300 text-sm'>{project.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}