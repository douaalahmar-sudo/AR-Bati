import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* HERO SECTION - Now set to full screen height */}
      <div className='relative h-screen flex items-center justify-center bg-[#1a1a1a] text-white overflow-hidden'>
        {/* Background Image with Overlay */}
        <div 
          className='absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105'
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')` }}
        >
          {/* Darker overlay to match your professional aesthetic */}
          <div className='absolute inset-0 bg-black/50'></div>
        </div>

        {/* Content - Elevated z-index to stay above background */}
        <div className='relative z-10 text-center px-4 max-w-4xl'>
          <h1 className='text-5xl md:text-8xl font-black mb-6 tracking-tighter'>
            Build Your <span className='text-[#eee27d]'>Vision</span>
          </h1>
          <p className='text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-medium'>
            Expertise in construction, renovation and modern architecture in Sousse. 
            We turn your ideas into lasting realities.
          </p>
          
          <div className='flex flex-col sm:flex-row gap-5 justify-center'>
            <Link 
              to='/projects' 
              className='bg-[#eee27d] text-[#1a1a1a] px-10 py-4 rounded-full font-black uppercase tracking-wider hover:bg-[#d6cc6a] transition-all shadow-xl active:scale-95'
            >
              View Projects
            </Link>
            <Link 
              to='/devis' 
              className='border-2 border-white text-white px-10 py-4 rounded-full font-black uppercase tracking-wider hover:bg-white hover:text-[#1a1a1a] transition-all active:scale-95'
            >
              Request a quote
            </Link>
          </div>
        </div>
      </div>

      {/* SHORT SERVICES PREVIEW - Balanced spacing */}
      <section className='py-24 bg-white px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-20'>
            <h2 className='text-4xl md:text-5xl font-black text-[#1a1a1a] mb-6 uppercase tracking-tighter'>
              Nos <span className='text-[#eee27d]'>Services</span>
            </h2>
            <div className='w-24 h-1.5 bg-[#eee27d] mx-auto rounded-full'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            {/* Construction Card */}
            <div className='group bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:border-[#eee27d]/30 transition-all hover:-translate-y-2'>
              <div className='text-5xl mb-6'>🏗️</div>
              <h3 className='text-2xl font-black mb-4 uppercase tracking-tight'>Construction</h3>
              <p className='text-gray-500 leading-relaxed font-medium'>
                Solid foundations for your residential and commercial projects across the Sousse coastline.
              </p>
            </div>

            {/* Renovation Card */}
            <div className='group bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:border-[#eee27d]/30 transition-all hover:-translate-y-2'>
              <div className='text-5xl mb-6'>🏠</div>
              <h3 className='text-2xl font-black mb-4 uppercase tracking-tight'>Renovation</h3>
              <p className='text-gray-500 leading-relaxed font-medium'>
                Give your spaces a new lease of life with our expert designers and modern materials.
              </p>
            </div>

            {/* Architecture Card */}
            <div className='group bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:border-[#eee27d]/30 transition-all hover:-translate-y-2'>
              <div className='text-5xl mb-6'>📐</div>
              <h3 className='text-2xl font-black mb-4 uppercase tracking-tight'>Architecture</h3>
              <p className='text-gray-500 leading-relaxed font-medium'>
                Innovative plans and customized space optimization to redefine luxury aesthetics.
              </p>
            </div>
          </div>

          <div className='text-center mt-16'>
            <Link to='/services' className='inline-block text-[#1a1a1a] font-black text-sm uppercase tracking-widest border-b-4 border-[#eee27d] pb-2 hover:text-[#d6cc6a] transition-all'>
              Discover Our Services &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}