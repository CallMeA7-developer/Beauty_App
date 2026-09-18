export default function ComingSoon() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-6 py-16"
      style={{
        background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F0EB 100%)',
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap"
        rel="stylesheet"
      />

      <div className="flex flex-col items-center text-center max-w-[560px]">
        <p
          className="text-[11px] sm:text-[12px] tracking-[4px] uppercase mb-6"
          style={{ color: '#8B7355' }}
        >
          Beauty & Fragrance
        </p>

        <h1
          className="text-[40px] sm:text-[52px] md:text-[64px] font-semibold text-[#1A1A1A] leading-none"
          style={{ letterSpacing: '6px' }}
        >
          Shan Loray
        </h1>

        <div className="w-[56px] sm:w-[72px] h-px bg-[#C9A870] my-6 sm:my-8" />

        <p
          className="text-[16px] sm:text-[18px] md:text-[20px] italic font-light text-[#8B7355]"
          style={{ letterSpacing: '0.5px' }}
        >
          Something beautiful is coming soon
        </p>
      </div>
    </div>
  )
}
