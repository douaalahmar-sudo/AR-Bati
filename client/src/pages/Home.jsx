import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <div className='relative h-[600px] flex items-center justify-center bg-dark text-white overflow-hidden'>
        {/* Background Image with Overlay */}
        <div 
          className='absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105'
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')` }}
        >
          <div className='absolute inset-0 bg-black/60'></div>
        </div>

        {/* Content */}
        <div className='relative z-10 text-center px-4 max-w-4xl'>
          <h1 className='text-5xl md:text-7xl font-extrabold mb-6 tracking-tight'>
            Build Your <span className='text-[#eee27d]'>Vision</span>
          </h1>
          <p className='text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto'>
            Expertise in construction, renovation and modern architecture in Sousse. 
            We turn your ideas into lasting realities.
          </p>
          
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link 
              to='/projects' 
              className='bg-[#eee27d] text-[#1a1a1a] px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-[#d6cc6a] transition-all shadow-lg active:scale-95'
            >
              View Projects
            </Link>
            <Link 
              to='/devis' 
              className='border-2 border-white text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-white hover:text-[#1a1a1a] transition-all active:scale-95'
            >
              Request a quote
            </Link>
          </div>
        </div>
      </div>

      {/* SHORT SERVICES PREVIEW */}
      <section className='py-20 bg-[#f5f5f5] px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4'>Nos Services</h2>
            <div className='w-20 h-1 bg-[#eee27d] mx-auto'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Simple Card 1 */}
            <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow'>
              <div className='text-4xl mb-4'>🏗️</div>
              <h3 className='text-xl font-bold mb-3'>Construction</h3>
              <p className='text-gray-600 text-sm'>Solid foundations for your residential and commercial projects.</p>
            </div>

            {/* Simple Card 2 */}
            <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow'>
              <div className='text-4xl mb-4'>🏠</div>
              <h3 className='text-xl font-bold mb-3'>Renovation</h3>
              <p className='text-gray-600 text-sm'>Give your spaces a new lease of life with our design experts.</p>
            </div>

            {/* Simple Card 3 */}
            <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow'>
              <div className='text-4xl mb-4'>📐</div>
              <h3 className='text-xl font-bold mb-3'>Architecture</h3>
              <p className='text-gray-600 text-sm'>Innovative plans and customized space optimization.</p>
            </div>
          </div>

          <div className='text-center mt-12'>
            <Link to='/services' className='text-[#1a1a1a] font-bold border-b-2 border-[#eee27d] pb-1 hover:text-[#d6cc6a] transition-colors'>
              Discover Our Services →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}