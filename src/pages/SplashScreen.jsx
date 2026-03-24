import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoVolumeHighOutline, IoVolumeMuteOutline } from 'react-icons/io5'

export default function SplashScreen() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(8)
  const [soundOn, setSoundOn] = useState(true)

  // Auto-countdown and redirect
  useEffect(() => {
    if (countdown <= 0) {
      navigate('/')
      return
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, navigate])

  const progress = ((8 - countdown) / 8) * 100

  return (
    <div className="w-full min-h-screen relative font-['Cormorant_Garamond'] overflow-hidden">

      {/* ── Full-Screen Background Image ── */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1440&h=900&fit=crop"
          alt="Luxury skincare background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── Gradient Overlay ── */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)' }}
      />

      {/* ── Sound Control — Top Right ── */}
      <button
        onClick={() => setSoundOn(!soundOn)}
        className="absolute top-[24px] right-[20px] sm:top-[32px] sm:right-[32px] md:top-[40px] md:right-[40px] flex items-center gap-[8px] cursor-pointer group z-10"
      >
        {soundOn
          ? <IoVolumeHighOutline className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] text-white opacity-70 group-hover:opacity-100 transition-opacity" />
          : <IoVolumeMuteOutline className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] text-white opacity-70 group-hover:opacity-100 transition-opacity" />
        }
        <span className="text-[11px] sm:text-[12px] font-light text-white opacity-70 group-hover:opacity-100 transition-opacity">
          {soundOn ? 'Sound On' : 'Sound Off'}
        </span>
      </button>

      {/* ── Centered Brand Identity ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full px-6">
        <h1
          className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-semibold text-white mb-[16px] sm:mb-[20px] md:mb-[24px] text-center whitespace-nowrap"
          style={{ letterSpacing: '6px' }}
        >
          SHAN LORAY
        </h1>

        {/* Decorative line */}
        <div className="w-[60px] sm:w-[70px] md:w-[80px] h-[1px] bg-[#C9A870] mb-[12px] sm:mb-[14px] md:mb-[16px]" />

        {/* Tagline */}
        <p className="text-[12px] sm:text-[13px] md:text-[14px] font-light italic text-white text-center" style={{ opacity: 0.85 }}>
          Luxury Beauty &amp; Skincare Since 2024
        </p>
      </div>

      {/* ── CTA Buttons — Lower Center ── */}
      <div className="absolute bottom-[100px] sm:bottom-[110px] md:bottom-[120px] left-1/2 -translate-x-1/2 flex flex-col gap-[14px] sm:gap-[16px] md:gap-[20px] w-full px-8 sm:px-0">
        <button
          onClick={() => navigate('/collections')}
          className="w-full sm:w-[240px] mx-auto h-[52px] sm:h-[56px] md:h-[64px] bg-[#C9A870] text-white text-[14px] sm:text-[15px] md:text-[16px] font-medium transition-all duration-300 hover:bg-[#b8974f] rounded-[2px]"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
        >
          Learn More
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full sm:w-[240px] mx-auto h-[52px] sm:h-[56px] md:h-[64px] border-[2px] border-white text-white text-[14px] sm:text-[15px] md:text-[16px] font-medium transition-all duration-300 hover:bg-white/25 rounded-[2px]"
          style={{ background: 'rgba(255,255,255,0.15)', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
        >
          Skip to Homepage
        </button>
      </div>

      {/* ── Auto-Play Progress — Bottom ── */}
      <div className="absolute bottom-[28px] sm:bottom-[32px] md:bottom-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-8 sm:px-0">
        <p className="text-[11px] sm:text-[12px] md:text-[13px] font-light italic text-white mb-[12px] sm:mb-[14px] md:mb-[16px] text-center" style={{ opacity: 0.8 }}>
          Continuing in {countdown} second{countdown !== 1 ? 's' : ''}
        </p>

        {/* Progress bar */}
        <div
          className="w-full sm:w-[280px] max-w-[280px] h-[2px] rounded-full relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.2)' }}
        >
          <div
            className="h-full bg-[#C9A870] absolute left-0 top-0 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
          <div
            className="w-[8px] h-[8px] bg-[#C9A870] rounded-full absolute top-1/2 -translate-y-1/2 transition-all duration-1000"
            style={{ left: `calc(${progress}% - 4px)` }}
          />
        </div>
      </div>

    </div>
  )
}