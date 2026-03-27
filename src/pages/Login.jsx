import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { IoVolumeHighOutline, IoVolumeMuteOutline } from 'react-icons/io5'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, signUp } = useAuth()
  const [soundOn, setSoundOn] = useState(true)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password)

      if (error) {
        setError(error.message)
      } else {
        navigate(from, { replace: true })
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen relative font-['Cormorant_Garamond'] overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1440&h=900&fit=crop"
          alt="Luxury skincare background"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="absolute inset-0 w-full h-full"
        style={{ background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)' }}
      />

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

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full px-6 max-w-[440px]">
        <h1
          className="text-[36px] sm:text-[48px] md:text-[56px] font-semibold text-white mb-[16px] sm:mb-[20px] text-center whitespace-nowrap"
          style={{ letterSpacing: '6px' }}
        >
          SHAN LORAY
        </h1>

        <div className="w-[60px] sm:w-[70px] md:w-[80px] h-[1px] bg-[#C9A870] mb-[12px] sm:mb-[14px] md:mb-[16px]" />

        <p className="text-[12px] sm:text-[13px] md:text-[14px] font-light italic text-white text-center mb-8" style={{ opacity: 0.85 }}>
          {isSignUp ? 'Create Your Account' : 'Welcome Back'}
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full h-[52px] sm:h-[56px] px-4 bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-[2px] focus:outline-none focus:border-[#C9A870] transition-colors"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full h-[52px] sm:h-[56px] px-4 bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-[2px] focus:outline-none focus:border-[#C9A870] transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-300 text-[13px] text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[52px] sm:h-[56px] bg-[#C9A870] text-white text-[14px] sm:text-[15px] md:text-[16px] font-medium transition-all duration-300 hover:bg-[#b8974f] rounded-[2px] disabled:opacity-50"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
          >
            {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
            }}
            className="w-full h-[52px] sm:h-[56px] border-[2px] border-white text-white text-[14px] sm:text-[15px] md:text-[16px] font-medium transition-all duration-300 hover:bg-white/25 rounded-[2px]"
            style={{ background: 'rgba(255,255,255,0.15)', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full text-white/70 text-[13px] font-light hover:text-white transition-colors"
          >
            Continue as Guest
          </button>
        </form>
      </div>
    </div>
  )
}
