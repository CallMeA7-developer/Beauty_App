import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Skincare from './pages/Skincare'
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
import Filter from './components/Filter'
import ShoppingBasket from './pages/ShoppingBasket'
import DeliveryInfo from './pages/DeliveryInfo'
import DeliveryMethods from './pages/DeliveryMethods'
import Payment from './pages/Payment'
import OrderConfirmation from './pages/OrderConfirmation'
import Explore from './components/Explore'
import AISkinConsultant from './pages/AiSkinConsultant'
import PaymentMethods from './pages/PaymentMethods'
import ShippingAddress from './pages/ShippingAddress'
import EditAddress from './pages/EditAddress'
import Notifications from './pages/Notifications'
import Privacy from './pages/Privacy'
import Password from './pages/Password'
import SplashScreen from './pages/SplashScreen'

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collection />} />
        <Route path="/skincare" element={<Skincare />} />
        <Route path="/makeup" element={<Makeup />} />
        <Route path="/fragrance" element={<Fragrance />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/skin-analysis" element={<SkinAnalysis />} />
        <Route path='/virtual-try-on' element={<VirtualTryOn />} />
        <Route path='/your-beauty-journey' element={<BeautyJourney />} />
        <Route path='/advanced-formulations' element={<AdvancedFormulations />} />
        <Route path='/search-overlay' element={<Search />} />
        <Route path='/user-profile-dropdown' element={<Profile />} />
        <Route path='/account-dashboard' element={<AccountDashboard />} />
        <Route path='/edit-personal-info' element={<EditProfile />} />
        <Route path='/track-order' element={<OrderTracking />} />
        <Route path='/product-detail' element={<ProductDetail />} />
        <Route path='/makeup-product-detail' element={<MakeupProductDetail />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/filter-popup' element={<Filter />} />
        <Route path='/shopping-cart' element={<ShoppingBasket />} />
        <Route path='/delivery-info-checkout' element={<DeliveryInfo />} />
        <Route path='/delivery-methods' element={<DeliveryMethods />} />
        <Route path='payment-methods' element={<Payment />} />
        <Route path='/order-confirmation' element={<OrderConfirmation />} />
        <Route path='/explore-popup' element={<Explore />} />
        <Route path='/ai-skin-consultation' element={<AISkinConsultant />} />
        <Route path='/payment-methods' element={<PaymentMethods />} />
        <Route path='/shipping-addresses' element={<ShippingAddress />} />
        <Route path='/edit-address' element={<EditAddress />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/privacy-setting' element={<Privacy />} />
        <Route path='/change-password' element={<Password />} />
        <Route path='/fullscreen-splash' element={<SplashScreen />} />
      </Routes>
      <Footer />
    </div>
  )
}
// first finish the page structure
// connect it to github 
// try to ask the claude AI that i can use JSX and its manage the backend ?
// try to ask the claude AI that i can connect the domain to my website using JSX
// so far using JSX for the BOLT its fine for tha backend
