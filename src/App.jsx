import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar      from './components/Navbar';
import Footer      from './components/Footer';
import Home        from './pages/Home';
import Products    from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart        from './pages/Cart';
import Login       from './pages/Login';
import Register    from './pages/Register';
import Checkout    from './pages/Checkout';
import './index.css';

function ScrollToTop() {
  if (typeof window !== 'undefined') window.scrollTo(0, 0);
  return null;
}

function Layout({ children, noFooter }) {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      {!noFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Auth pages - no footer */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main pages with Navbar + Footer */}
          <Route path="/" element={
            <Layout>
              <ScrollToTop />
              <Home />
            </Layout>
          } />
          <Route path="/products" element={
            <Layout>
              <ScrollToTop />
              <Products />
            </Layout>
          } />
          <Route path="/products/:id" element={
            <Layout>
              <ScrollToTop />
              <ProductDetail />
            </Layout>
          } />
          <Route path="/cart" element={
            <Layout>
              <ScrollToTop />
              <Cart />
            </Layout>
          } />
          <Route path="/checkout" element={
            <Layout>
              <ScrollToTop />
              <Checkout />
            </Layout>
          } />

          {/* 404 */}
          <Route path="*" element={
            <Layout>
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                minHeight: 'calc(100vh - 72px)', gap: 20, textAlign: 'center',
                padding: '40px 20px'
              }}>
                <div style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--primary-lighter)' }}>404</div>
                <h2 style={{ fontSize: '1.8rem' }}>الصفحة غير موجودة</h2>
                <p style={{ color: 'var(--text-secondary)' }}>يبدو أن الصفحة التي تبحث عنها غير موجودة</p>
                <a href="/" className="btn-primary-custom">
                  <i className="fas fa-home" /> العودة للرئيسية
                </a>
              </div>
            </Layout>
          } />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
