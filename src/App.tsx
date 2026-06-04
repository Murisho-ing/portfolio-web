import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Hero from './sections/Hero/Hero'
import WhatIDoBest from './sections/WhatIDoBest/WhatIDoBest'
import Services from './sections/Services/Services'
import Projects from './sections/Projects/Projects'
import CTA from './sections/CTA/CTA'

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position as a percentage of the viewport
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  return (
    <>
      {/* Background dynamic blobs (Global) */}
      <div className="dynamicGlobalBg">
        <div 
          className="blobCyan" 
          style={{ transform: `translate(${mousePos.x * 0.5}vw, ${mousePos.y * 0.5}vh)` }}
        />
        <div 
          className="blobPurple" 
          style={{ transform: `translate(${(100 - mousePos.x) * 0.4}vw, ${(100 - mousePos.y) * 0.6}vh)` }}
        />
        <div 
          className="blobPeach" 
          style={{ transform: `translate(${mousePos.x * 0.3}vw, ${(100 - mousePos.y) * 0.4}vh)` }}
        />
      </div>

      <Header />
      <main>
        <Hero />
        <WhatIDoBest />
        <Services />
        <Projects />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
