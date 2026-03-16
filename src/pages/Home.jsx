import { useState, useEffect } from 'react'
import HomeDesktop from './HomeDesktop'
import HomeMobile from './HomeMobile'

export default function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? <HomeMobile /> : <HomeDesktop />
}