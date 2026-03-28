import { createContext, useContext, useState, useEffect } from 'react'

const CheckoutContext = createContext()

export const useCheckout = () => {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error('useCheckout must be used within CheckoutProvider')
  }
  return context
}

export const CheckoutProvider = ({ children }) => {
  const [checkoutSession, setCheckoutSession] = useState(() => {
    const saved = localStorage.getItem('checkout_session')
    return saved ? JSON.parse(saved) : {
      selectedAddress: null,
      selectedDeliveryMethod: null,
      deliveryCost: 0,
      cartItems: [],
      subtotal: 0,
      tax: 0,
      total: 0
    }
  })

  useEffect(() => {
    localStorage.setItem('checkout_session', JSON.stringify(checkoutSession))
  }, [checkoutSession])

  const updateCheckoutSession = (updates) => {
    setCheckoutSession(prev => ({
      ...prev,
      ...updates
    }))
  }

  const clearCheckoutSession = () => {
    setCheckoutSession({
      selectedAddress: null,
      selectedDeliveryMethod: null,
      deliveryCost: 0,
      cartItems: [],
      subtotal: 0,
      tax: 0,
      total: 0
    })
    localStorage.removeItem('checkout_session')
  }

  return (
    <CheckoutContext.Provider value={{
      checkoutSession,
      updateCheckoutSession,
      clearCheckoutSession
    }}>
      {children}
    </CheckoutContext.Provider>
  )
}
