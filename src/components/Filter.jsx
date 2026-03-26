import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  IoCloseOutline,
  IoCheckmarkCircle,
  IoStarSharp,
  IoSearchOutline,
} from 'react-icons/io5'

export default function Filter() {
  const navigate = useNavigate()

  const productTypes = ['Skincare', 'Makeup', 'Fragrance', 'Haircare', 'Body Care', 'Tools & Devices']
  const skinTypes = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive']
  const skinConcerns = ['Anti-Aging', 'Hydration', 'Brightening', 'Acne', 'Dark Spots', 'Fine Lines', 'Dullness', 'Redness']
  const brands = ['LA MER', 'ESTÉE LAUDER', 'DIOR', 'TOM FORD', 'CHARLOTTE TILBURY', 'CHANEL', 'GUERLAIN', 'SISLEY', 'LA PRAIRIE']
  const benefits = ['Moisturizing', 'Firming', 'Soothing', 'Exfoliating', 'Protecting', 'Nourishing']

  const [selectedTypes, setSelectedTypes] = useState(['Skincare'])
  const [selectedConcerns, setSelectedConcerns] = useState(['Anti-Aging', 'Hydration'])
  const [selectedBrands, setSelectedBrands] = useState(['LA MER', 'CHARLOTTE TILBURY'])
  const [selectedBenefits, setSelectedBenefits] = useState(['Moisturizing'])
  const [selectedSkinTypes, setSelectedSkinTypes] = useState(['Dry'])
  const [minRating, setMinRating] = useState(4)
  const [inStockOnly, setInStockOnly] = useState(true)

  const toggle = (list, setList, value) => {
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value])
  }

  const isSelected = (list, value) => list.includes(value)

  const Checkbox = ({ checked, onClick }) => (
    <div onClick={onClick} className="cursor-pointer flex-shrink-0">
      {checked
        ? <IoCheckmarkCircle className="w-[20px] h-[20px] text-[#8B7355]" />
        : <div className="w-[20px] h-[20px] rounded-[4px] border-[1.5px] border-[#E8E3D9] hover:border-[#8B7355] transition-colors" />
      }
    </div>
  )

  const Radio = ({ checked, onClick }) => (
    <div onClick={onClick} className="w-[20px] h-[20px] rounded-full border-[1.5px] border-[#E8E3D9] flex items-center justify-center cursor-pointer flex-shrink-0 hover:border-[#8B7355] transition-colors">
      {checked && <div className="w-[10px] h-[10px] rounded-full bg-[#8B7355]" />}
    </div>
  )

  const Pill = ({ label, selected, onClick }) => (
    <button
      onClick={onClick}
      className={`min-h-[44px] px-[20px] rounded-[24px] border-[1.5px] text-[15px] cursor-pointer transition-all ${
        selected
          ? 'bg-[#FDFBF7] border-[#C9A870] text-[#8B7355]'
          : 'bg-white border-[#E8E3D9] text-[#666666] hover:border-[#C9A870] hover:text-[#8B7355]'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-[#1A1A1A]/40 flex items-end sm:items-center justify-center font-['Cormorant_Garamond'] sm:py-[40px]">
      <div className="w-full sm:w-[560px] bg-white sm:rounded-[16px] rounded-t-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.15)] flex flex-col max-h-[92vh] sm:max-h-[90vh]">

        {/* ── Header ── */}
        <div className="min-h-[60px] sm:min-h-[72px] px-5 sm:px-[24px] flex items-center justify-between border-b-[1.5px] border-[#E8E3D9] flex-shrink-0">
          <h1 className="text-[22px] sm:text-[28px] font-semibold text-[#1A1A1A]">Filter Products</h1>
          <button onClick={() => navigate(-1)}>
            <IoCloseOutline className="w-[26px] h-[26px] sm:w-[28px] sm:h-[28px] text-[#666666] cursor-pointer hover:text-[#1A1A1A] transition-colors" />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-[32px] py-6 sm:py-[32px]">

          {/* Product Type */}
          <div className="mb-6 sm:mb-[28px]">
            <h3 className="text-[15px] sm:text-[17px] font-medium text-[#1A1A1A] mb-3 sm:mb-[16px]">Product Type</h3>
            <div className="grid grid-cols-2 gap-[10px] sm:gap-[12px]">
              {productTypes.map((type) => (
                <Pill
                  key={type}
                  label={type}
                  selected={isSelected(selectedTypes, type)}
                  onClick={() => toggle(selectedTypes, setSelectedTypes, type)}
                />
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6 sm:mb-[28px]">
            <h3 className="text-[15px] sm:text-[17px] font-medium text-[#1A1A1A] mb-3 sm:mb-[16px]">Price Range</h3>
            <div className="relative mb-[16px]">
              <div className="w-full h-[4px] bg-[#E8E3D9] rounded-full">
                <div className="w-[60%] h-full bg-[#C9A870] rounded-full" />
              </div>
              <div className="absolute top-[-8px] left-0 w-[20px] h-[20px] rounded-full bg-white border-[2px] border-[#C9A870] shadow-sm cursor-pointer" />
              <div className="absolute top-[-8px] left-[60%] w-[20px] h-[20px] rounded-full bg-white border-[2px] border-[#C9A870] shadow-sm cursor-pointer" />
            </div>
            <div className="text-center">
              <span className="text-[14px] sm:text-[15px] font-normal text-[#666666]">$0 — $500</span>
            </div>
          </div>

          {/* Skin Type */}
          <div className="mb-6 sm:mb-[28px]">
            <h3 className="text-[15px] sm:text-[17px] font-medium text-[#1A1A1A] mb-3 sm:mb-[16px]">Skin Type</h3>
            <div className="space-y-[10px] sm:space-y-[12px]">
              {skinTypes.map((type) => (
                <div key={type} className="flex items-center gap-[12px]" onClick={() => toggle(selectedSkinTypes, setSelectedSkinTypes, type)}>
                  <Checkbox checked={isSelected(selectedSkinTypes, type)} />
                  <span className="text-[14px] sm:text-[15px] font-normal text-[#2B2B2B] cursor-pointer select-none">{type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skin Concerns */}
          <div className="mb-6 sm:mb-[28px]">
            <h3 className="text-[15px] sm:text-[17px] font-medium text-[#1A1A1A] mb-3 sm:mb-[16px]">Skin Concerns</h3>
            <div className="flex flex-wrap gap-[8px]">
              {skinConcerns.map((concern) => (
                <Pill
                  key={concern}
                  label={concern}
                  selected={isSelected(selectedConcerns, concern)}
                  onClick={() => toggle(selectedConcerns, setSelectedConcerns, concern)}
                />
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="mb-6 sm:mb-[28px]">
            <h3 className="text-[15px] sm:text-[17px] font-medium text-[#1A1A1A] mb-3 sm:mb-[12px]">Brand</h3>
            <div className="relative mb-[12px]">
              <input
                type="text"
                placeholder="Search brands..."
                className="w-full h-[44px] sm:h-[48px] px-[16px] pr-[44px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[14px] sm:text-[15px] font-light italic text-[#999999] outline-none focus:border-[#8B7355] transition-colors"
              />
              <IoSearchOutline className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] text-[#999999]" />
            </div>
            <div className="max-h-[180px] overflow-y-auto space-y-[8px] pr-1">
              {brands.map((brand) => (
                <div key={brand} className="h-[40px] flex items-center gap-[12px]" onClick={() => toggle(selectedBrands, setSelectedBrands, brand)}>
                  <Checkbox checked={isSelected(selectedBrands, brand)} />
                  <span className="text-[14px] sm:text-[15px] font-normal text-[#2B2B2B] cursor-pointer select-none">{brand}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Benefits */}
          <div className="mb-6 sm:mb-[28px]">
            <h3 className="text-[15px] sm:text-[17px] font-medium text-[#1A1A1A] mb-3 sm:mb-[16px]">Product Benefits</h3>
            <div className="flex flex-wrap gap-[8px]">
              {benefits.map((benefit) => (
                <Pill
                  key={benefit}
                  label={benefit}
                  selected={isSelected(selectedBenefits, benefit)}
                  onClick={() => toggle(selectedBenefits, setSelectedBenefits, benefit)}
                />
              ))}
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="mb-6 sm:mb-[28px]">
            <h3 className="text-[15px] sm:text-[17px] font-medium text-[#1A1A1A] mb-3 sm:mb-[16px]">Minimum Rating</h3>
            <div className="flex items-center gap-[12px]">
              <div className="flex items-center gap-[4px] sm:gap-[6px]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <IoStarSharp
                    key={star}
                    onClick={() => setMinRating(star)}
                    className={`w-[26px] h-[26px] sm:w-[28px] sm:h-[28px] cursor-pointer transition-colors ${star <= minRating ? 'text-[#C9A870]' : 'text-[#E8E3D9]'}`}
                  />
                ))}
              </div>
              <span className="text-[14px] sm:text-[15px] font-normal text-[#666666]">{minRating}.0 & Up</span>
            </div>
          </div>

          {/* Availability */}
          <div className="mb-6 sm:mb-[32px]">
            <h3 className="text-[15px] sm:text-[17px] font-medium text-[#1A1A1A] mb-3 sm:mb-[16px]">Availability</h3>
            <div className="space-y-[10px] sm:space-y-[12px]">
              <div className="flex items-center gap-[12px]" onClick={() => setInStockOnly(true)}>
                <Radio checked={inStockOnly} />
                <span className="text-[14px] sm:text-[15px] font-normal text-[#2B2B2B] cursor-pointer select-none">In Stock</span>
              </div>
              <div className="flex items-center gap-[12px]" onClick={() => setInStockOnly(false)}>
                <Radio checked={!inStockOnly} />
                <span className="text-[14px] sm:text-[15px] font-normal text-[#2B2B2B] cursor-pointer select-none">Include Out of Stock</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="bg-[#FDFBF7] px-5 sm:px-[32px] py-4 sm:py-[24px] border-t-[1.5px] border-[#E8E3D9] flex items-center gap-3 sm:gap-[16px] flex-shrink-0 rounded-b-[16px]">
          <button
            onClick={() => {
              setSelectedTypes([])
              setSelectedConcerns([])
              setSelectedBrands([])
              setSelectedBenefits([])
              setSelectedSkinTypes([])
              setMinRating(1)
              setInStockOnly(true)
            }}
            className="flex-1 h-[48px] sm:h-[52px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[14px] sm:text-[16px] font-medium rounded-[8px] cursor-pointer hover:border-[#8B7355] hover:text-[#8B7355] transition-all"
          >
            Clear Filters
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 h-[48px] sm:h-[52px] bg-[#8B7355] text-white text-[14px] sm:text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors"
          >
            Apply Filters
          </button>
        </div>

      </div>
    </div>
  )
}