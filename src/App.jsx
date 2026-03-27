import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Skincare from './pages/SkinCare'
import Makeup from './pages/Makeup'
import Fragrance from './pages/Fragrance'
import Technology from './pages/Technology'
import SkinAnalysis from './pages/SkinAnalysis'
import VirtualTryOn from './pages/VirtualTryOn'
import BeautyJourney from './pages/BeautyJourney'
import AdvancedFormulations from './pages/AdvancedFormulations'
import Search from './pages/Search'
import Profile from './pages/Profile'
import AccountDashboard from './pages/AccountDashboard'
import EditProfile from './pages/EditProfile'
import OrderTracking from './pages/OrderTracking'
import ProductDetail from './pages/ProductDetail'
import MakeupProductDetail from './pages/MakeupProductDetail'
import Wishlist from './pages/Wishlist'
import Explore from './components/Explore'
import Filter from './components/Filter'
import ShoppingBasket from './pages/ShoppingBasket'
import DeliveryInfo from './pages/DeliveryInfo'
import DeliveryMethods from './pages/DeliveryMethods'
import Payment from './pages/Payment'
import PaymentMethods from './pages/PaymentMethods'
import OrderConfirmation from './pages/OrderConfirmation'
import AISkinConsultant from './pages/AIskinConsultant'
import ShippingAddress from './pages/ShippingAddress'
import EditAddress from './pages/EditAddress'
import Notifications from './pages/Notifications'
import Privacy from './pages/Privacy'
import Password from './pages/Password'
import SplashScreen from './pages/SplashScreen'
import Login from './pages/Login'

export default function App() {
  return (
    <div>
      <Routes>
        {/* ── Splash — no Navbar/Footer ── */}
        <Route path="/splash" element={<SplashScreen />} />

        {/* ── Login — no Navbar/Footer ── */}
        <Route path="/login" element={<Login />} />

        {/* ── All other pages — with Navbar + Footer ── */}
        <Route path="/*" element={
          <>
            <Navbar />
            <Routes>
              {/* Main */}
              <Route path="/"                        element={<Home />} />
              <Route path="/collections"             element={<Collection />} />
              <Route path="/skincare"                element={<Skincare />} />
              <Route path="/makeup"                  element={<Makeup />} />
              <Route path="/fragrance"               element={<Fragrance />} />
              <Route path="/technology"              element={<Technology />} />
              <Route path="/explore"                 element={<Explore />} />
              <Route path="/search"                  element={<Search />} />
              <Route path="/filter"                  element={<Filter />} />

              {/* Products */}
              <Route path="/product/:id"             element={<ProductDetail />} />
              <Route path="/makeup-product/:id"      element={<MakeupProductDetail />} />

              {/* Technology */}
              <Route path="/skin-analysis"           element={<SkinAnalysis />} />
              <Route path="/virtual-tryon"           element={<VirtualTryOn />} />
              <Route path="/beauty-journey"          element={<BeautyJourney />} />
              <Route path="/advanced-formulations"   element={<AdvancedFormulations />} />
              <Route path="/ai-consultation"         element={<AISkinConsultant />} />

              {/* Account - Protected Routes */}
              <Route path="/account"                 element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/dashboard"               element={<ProtectedRoute><AccountDashboard /></ProtectedRoute>} />
              <Route path="/edit-profile"            element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
              <Route path="/order-tracking"          element={<OrderTracking />} />
              <Route path="/wishlist"                element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
              <Route path="/shipping-address"        element={<ProtectedRoute><ShippingAddress /></ProtectedRoute>} />
              <Route path="/edit-address"            element={<EditAddress />} />
              <Route path="/payment-methods"         element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
              <Route path="/notifications"           element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/privacy-settings"        element={<ProtectedRoute><Privacy /></ProtectedRoute>} />
              <Route path="/change-password"         element={<ProtectedRoute><Password /></ProtectedRoute>} />

              {/* Checkout Flow - Protected Routes */}
              <Route path="/cart"                    element={<ProtectedRoute><ShoppingBasket /></ProtectedRoute>} />
              <Route path="/checkout"                element={<DeliveryInfo />} />
              <Route path="/delivery-methods"        element={<DeliveryMethods />} />
              <Route path="/payment"                 element={<ProtectedRoute><Payment /></ProtectedRoute>} />
              <Route path="/order-confirmation"      element={<OrderConfirmation />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  )
}

