import React from 'react';
import { Link } from 'react-router-dom';
import { FaAward, FaBuilding, FaUsers, FaArrowRight } from 'react-icons/fa';

export default function About() {
  return (
    <div className='min-h-screen bg-white'>
      {/* 1. HERO SECTION - Cinematic Introduction */}
      <section className='py-24 px-6 max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row items-center gap-16'>
          <div className='flex-1 space-y-8'>
            <div className='inline-block px-4 py-1.5 bg-[#eee27d]/10 border border-[#eee27d]/20 rounded-full text-[#b3a62d] text-[10px] font-black uppercase tracking-[0.2em]'>
              Established 2026 | Sousse, Tunisia
            </div>
            <h1 className='text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-slate-900'>
              The New <br />
              <span className='text-[#eee27d]'>Standard</span> <br />
              of Build.
            </h1>
            <p className='text-slate-500 text-lg leading-relaxed max-w-lg'>
              Ar-Bâti isn't just a construction firm; we are architectural partners. 
              We blend technical precision with luxury aesthetics to redefine the 
              landscapes of <span className='text-slate-900 font-bold'>Sousse</span>.
            </p>
          </div>

          {/* THE TILTED IMAGE COMPONENT */}
          <div className='flex-1 relative group'>
            <div className='absolute -inset-4 bg-[#eee27d]/20 rounded-[2rem] blur-2xl group-hover:bg-[#eee27d]/30 transition-all duration-700'></div>
            <div className='relative aspect-square md:aspect-video lg:aspect-square bg-[#1a1a1a] rounded-[2.5rem] shadow-2xl overflow-hidden rotate-2 group-hover:rotate-0 transition-all duration-700 ease-out flex items-center justify-center border-8 border-white'>
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                alt="Ar-Bâti Excellence" 
                className='w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity'
              />
              <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                <span className='text-white/20 font-black text-4xl tracking-tighter uppercase group-hover:hidden transition-all'>
                  Ar-Bâti HQ
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENTO MISSION SECTION */}
      <section className='py-20 bg-slate-50'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Box 1: Values */}
            <div className='md:col-span-2 bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-[#eee27d]/50 transition-colors'>
              <FaBuilding className='text-4xl text-[#eee27d] mb-8' />
              <div>
                <h2 className='text-3xl font-black uppercase tracking-tighter mb-4'>Modernity by Design</h2>
                <p className='text-slate-500'>We integrate smart-home technology and sustainable materials into every build, ensuring your project is ready for the next century.</p>
              </div>
            </div>
            
            {/* Box 2: Call to Action - Now leads to /devis */}
            <div className='bg-[#1a1a1a] p-12 rounded-[2.5rem] text-white flex flex-col justify-between group hover:scale-[1.02] transition-transform shadow-xl'>
              <h3 className='text-2xl font-bold leading-tight'>Have a vision? Let’s map it out.</h3>
              <Link 
                to='/devis' 
                className='mt-8 w-12 h-12 bg-[#eee27d] rounded-full flex items-center justify-center text-[#1a1a1a] group-hover:w-full group-hover:rounded-xl transition-all duration-500 overflow-hidden'
              >
                <FaArrowRight className='group-hover:mr-2' />
                <span className='hidden group-hover:inline font-black uppercase text-xs tracking-widest whitespace-nowrap'>
                  Start Quote
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TEAM SECTION (Notre Équipe) */}
      <section className='py-24 max-w-7xl mx-auto px-6'>
        <div className='flex justify-between items-end mb-16'>
          <div>
            <h2 className='text-4xl font-black uppercase tracking-tighter'>Notre <span className='text-[#eee27d]'>équipe</span></h2>
            <p className='text-slate-400 text-sm uppercase tracking-widest mt-2'>The Minds Behind the Magic</p>
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6'>
          {/* Sofiene Mlouka & Team Members */}
          {["Sofiene Mlouka", "Sarah J.", "Ahmed B.", "Leila K.", "Omar D."].map((name, i) => (
            <div key={i} className='group'>
              <div className='relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-slate-100 mb-4 border border-slate-100'>
                <div className='w-full h-full bg-slate-200 group-hover:scale-110 transition-transform duration-700 ease-in-out' />
                
                {/* Hover Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6'>
                  <p className='text-[#eee27d] text-[10px] font-black uppercase tracking-widest mb-1'>Expert Architect</p>
                  <p className='text-white text-xs opacity-70'>Ar-Bâti Specialist</p>
                </div>
              </div>
              <h4 className='font-black uppercase text-sm tracking-tight text-slate-800'>{name}</h4>
              <p className='text-[10px] text-slate-400 uppercase font-bold tracking-widest'>
                {i === 0 ? "Président Directeur Général" : "Project Specialist"}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}