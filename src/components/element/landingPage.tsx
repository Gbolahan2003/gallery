'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Iconify from './icon';
import Link from 'next/link';
import shuffle from 'lodash.shuffle'
import data from '../utils/data';
import useMeasure from 'react-use-measure'
import { useTransition, a } from '@react-spring/web'
import useMedia from './useMedia';
import styles from '@/styles.module.css'

const LandingPage = () => {
    const images = [
        // Landscapes
        'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        'https://images.unsplash.com/ph-1464550883968-cec281c19761?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        'https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        
        // People
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        'https://images.unsplash.com/photo-1484101403633-562f891dc89a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',

        'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    ];
    
      
    
function Masonry() {
  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'], [5, 4, 3], 2)
  // Hook2: Measure the width of the container element
  const [ref, { width }] = useMeasure()
  // Hook3: Hold items
  const [items, set] = useState(data)
  // Hook4: shuffle data every 2 seconds
  useEffect(() => {
    const t = setInterval(() => set(shuffle), 2000)
    return () => clearInterval(t)
  }, [])
  // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0) // Each column gets a height starting with zero
    let gridItems = items.map((child, i) => {
      const column = heights.indexOf(Math.min(...heights)) // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const x = (width / columns) * column // x = container width / number of columns * column index,
      const y = (heights[column] += child.height / 2) - child.height / 2 // y = it's just the height of the current column
      return { ...child, x, y, width: width / columns, height: child.height / 2 }
    })
    return [heights, gridItems]
  }, [columns, items, width])
  // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, {
    key: (item: { css: string; height: number }) => item.css,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  })
  // Render the grid
  return (
    <div ref={ref} className={styles.list} style={{ height: Math.max(...heights) }}>
      {transitions((style, item) => (
        <a.div style={style}>
          <div style={{ backgroundImage: `url(${item.css}?auto=compress&dpr=2&h=500&w=500)` }} />
        </a.div>
      ))}
    </div>
  )
}

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
       
            <Masonry/>
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
