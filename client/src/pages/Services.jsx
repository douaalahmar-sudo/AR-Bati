import React from 'react';
import { Link } from 'react-router-dom';
import { FaHardHat, FaPaintRoller, FaTools, FaDraftingCompass, FaBuilding, FaSolarPanel } from 'react-icons/fa';

export default function Services() {
  const services = [
    {
      title: 'General Construction',
      description: 'From foundation to roof, we build modern villas and commercial buildings in Sousse with the highest standards.',
      icon: <FaHardHat className='text-4xl text-amber-400' />,
      image: 'https://imgs.search.brave.com/jdHErj4vua69pZ_GT15TdSyQcpQUTlEU-QFoOhD_PdU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2V5aW50ZXJpb3Jz/LnVzL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIzLzA0L0Fkb2Jl/U3RvY2tfMTY2OTk1/NzQwLTE1MzZ4MTAy/NC5qcGVn'
    },
    {
      title: 'Home Renovation',
      description: 'Give your space a second life. We specialize in kitchen, bathroom, and full apartment remodeling.',
      icon: <FaPaintRoller className='text-4xl text-amber-400' />,
      image: 'https://imgs.search.brave.com/i9a3RxSEuly3gdcPoJAjhf3Pdf5JnbsVTAM5vnzoWIQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/MjgwMDE5MC9waG90/by9ob21lLXJlbm92/YXRpb24tY29uY2Vw/dC1iZWZvcmUtYW5k/LWFmdGVyLWludGVy/aW9yLWluLW1vZGVy/bi1zdHlsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9LVU0/MjZWZnlXblVpVzU2/N0xnX1RoQWRYVXM3/cV94TGN3OUs1d3pD/bjNWND0' 
    },
    {
      title: 'Interior Design',
      description: 'Modern and functional interior planning tailored to your lifestyle and aesthetic preferences.',
      icon: <FaDraftingCompass className='text-4xl text-amber-400' />,
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Property Maintenance',
      description: 'Reliable plumbing, electrical work, and general repairs to keep your property in perfect condition.',
      icon: <FaTools className='text-4xl text-amber-400' />,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Commercial Development',
      description: 'Customized construction solutions for shops, offices, and restaurants across the Sousse coast.',
      icon: <FaBuilding className='text-4xl text-amber-400' />,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Green Energy Solutions',
      description: 'Installation of solar panels and eco-friendly insulation to make your Tunisian home energy-efficient.',
      icon: <FaSolarPanel className='text-4xl text-amber-400' />,
      image: 'https://imgs.search.brave.com/QsD9r04N34w2_yrevGpr2jAwWINIZ_gyEH4egsAV0pw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjMv/MTI1Lzc4MS9zbWFs/bC9jbG9zZS11cC1v/Zi1yZW5ld2FibGUt/ZW5lcmd5LXNvbGFy/LXBhbmVscy1vbi1n/cmVlbi1ncmFzcy1m/b3ItY2xlYW4tZW5l/cmd5LXNvbHV0aW9u/cy1hbmQtc3VzdGFp/bmFiaWxpdHktZnJl/ZS1waG90by5qcGc'
    }
  ];

  return (
    <div className='py-16 px-4 max-w-6xl mx-auto'>
      <div className='text-center mb-16'>
        <h1 className='text-4xl font-bold text-slate-800'>
          Our <span className='text-amber-400'>Services</span>
        </h1>
        <p className='text-slate-600 mt-4'>Expert building solutions for Sousse and the Sahel.</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
        {services.map((service, index) => (
          <div key={index} className='group bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden border border-slate-100'>
            
            {/* Fail-safe Image Container */}
            <div className='h-52 overflow-hidden bg-slate-100 relative'>
              
              {/* FALLBACK: Hidden behind the image. Shows only if image fails or is slightly transparent */}
              <div className='absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-400 font-bold text-center p-4'>
                {service.title}
              </div>

              {/* IMAGE: Now positioned relatively on top. No more blank hover overlay! */}
              <img 
                src={service.image} 
                alt={service.title} 
                className='relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-10'
                onError={(e) => { 
                  e.target.style.display = 'none'; // Only hide the image if it actually breaks
                }}
              />
            </div>

            <div className='p-6 flex flex-grow flex-col'>
              <div className='mb-4 transition-transform duration-300 group-hover:rotate-6'>
                {service.icon}
              </div>
              <h3 className='text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-500 transition-colors'>
                {service.title}
              </h3>
              <p className='text-slate-600 text-sm mb-6 flex-grow leading-relaxed'>
                {service.description}
              </p>
              
              <Link 
                to={`/contact?service=${service.title.replace(/\s+/g, '-').toLowerCase()}`} 
                className='text-amber-500 font-bold flex items-center gap-1 group-hover:gap-3 transition-all'
              >
                Learn More <span className='transition-transform group-hover:translate-x-1'>&rarr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}