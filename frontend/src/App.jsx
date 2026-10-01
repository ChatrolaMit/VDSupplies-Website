import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import AboutUs from './pages/AboutUs/AboutUs';
import BeyondTheShelf from './pages/BeyondTheShelf/BeyondTheShelf';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import RequestQuote from './pages/RequestQuote/RequestQuote';
import Success from './pages/Success/Success';
import Cart from './pages/Cart/Cart';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import OrderHistory from './pages/Orders/OrderHistory';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'placeholder'}>
    <AuthProvider>
      <CartProvider>
      <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Catalog />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<OrderHistory />} />
        {/* <Route path="/categories" element={<Categories />} /> */}
        <Route path="/beyond-the-shelf" element={<BeyondTheShelf />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/request-quote" element={<RequestQuote />} />
        <Route path="/success" element={<Success />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </CartProvider>
    </AuthProvider>
    </GoogleOAuthProvider>
  );
}
