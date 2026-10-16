import { Route, Routes, useLocation } from 'react-router-dom'
import AnnouncementBar from './components/AnnouncementBar.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import Collections from './pages/Collections.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import ShoppingBag from './pages/ShoppingBag.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Checkout from './pages/Checkout.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import FAQ from './pages/FAQ.jsx'
import Policies from './pages/Policies.jsx'
import SearchResults from './pages/SearchResults.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const { pathname } = useLocation()
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <CartDrawer />
      <main id="main" key={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/bag" element={<ShoppingBag />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/shipping" element={<Policies type="shipping" />} />
          <Route path="/returns" element={<Policies type="returns" />} />
          <Route path="/privacy" element={<Policies type="privacy" />} />
          <Route path="/terms" element={<Policies type="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
