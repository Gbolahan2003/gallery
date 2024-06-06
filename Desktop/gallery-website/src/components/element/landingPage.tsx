'use client';
import React from 'react';
import Image from 'next/image';
import Iconify from './icon';
import Link from 'next/link';

const LandingPage = () => {
    const images = [
        // Landscapes
        'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        'https://images.unsplash.com/photo-1464550883968-cec281c19761?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        'https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        
        // People
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        'https://images.unsplash.com/photo-1484101403633-562f891dc89a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',

        'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    ];
    
      

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-md px-10">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold"><Iconify icon='fluent:camera-sparkles-20-filled'/></h1>
          <nav>
            <Link  href={'/login'}  className="mt-4 p-2 bg-primary-accent text-primary-text rounded-lg"

>
Create your gallery</Link>
            {/* <a href="#gallery" className="text-gray-400 hover:text-white mx-4">Gallery</a>
            <a href="#about" className="text-gray-400 hover:text-white mx-4">About</a> */}
            <a href="https://matthew-portfolio-vert.vercel.app/" className="text-gray-400 hover:text-white mx-4">Contact</a>
          </nav>
        </div>
      </header>
      
      <main>
        <section className="bg-gray-700 py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold">Welcome to the Gallery</h2>
            <p className="text-gray-300 mt-4">Discover a world of stunning images curated just for you.</p>
          </div>
        </section>

        <section id="gallery" className="py-12">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-8">Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                 {images.map((src, index) => (
                <div key={index} className={`relative group ${index % 5 === 0 ? 'col-span-2 row-span-2' : ''}`}>
                  <Image
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    width={400}
                    height={400}
                    layout="responsive"
                    objectFit="cover"
                    className="rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity overflow-hidden duration-300">
                    <p className="text-white text-lg font-semibold">Image {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-gray-700 py-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold">About Us</h3>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Our gallery app showcases a variety of beautiful images from various categories. Whether {`you're `}a photography enthusiast or just love looking at beautiful pictures, our gallery has something for everyone. Our collection is curated with the highest quality images that will captivate and inspire you.
            </p>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Each image in our gallery is carefully selected to ensure it meets our standards of excellence. We believe in the power of visual storytelling and strive to provide a platform where you can immerse yourself in the beauty of photography.
            </p>
          </div>
        </section>

        <section id="contact" className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold">Contact Us</h3>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">For inquiries, please contact us at <a href="mailto:matthewarowosegbe4@gmail.com" className="text-blue-400 hover:underline">matthewarowosegbe4@gmail.com</a>.</p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 shadow-md py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2024 Gallery App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
