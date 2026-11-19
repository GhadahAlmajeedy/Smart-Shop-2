import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { cartCount } = useCart();
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [searchQuery,  setSearchQuery]  = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close menu on route change */
  const closeMenu = () => setMenuOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { to: '/',            label: 'الرئيسية' },
    { to: '/products',    label: 'المنتجات' },
    { to: '/products?category=men',    label: 'رجالي' },
    { to: '/products?category=women',  label: 'نسائي' },
    { to: '/products?category=kids',   label: 'أطفال' },
  ];

  return (
    <>
      <nav className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">

          {/* Logo */}
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <div className="logo-icon">
              <i className="fas fa-store" />
            </div>
            <div className="logo-text">
              <span className="logo-main">سمارت</span>
              <span className="logo-sub">شوب</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links">
            {navLinks.map(l => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => isActive ? 'active' : ''}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="nav-actions">
            {/* Search */}
            <button className="nav-icon-btn" onClick={() => setSearchOpen(s => !s)} aria-label="بحث">
              <i className="fas fa-search" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="nav-icon-btn cart-btn" aria-label="السلة">
              <i className="fas fa-shopping-cart" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            {/* Login */}
            <Link to="/login" className="nav-login-btn">
              <i className="fas fa-user" />
              <span>دخول</span>
            </Link>

            {/* Hamburger */}
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="القائمة"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`search-bar ${searchOpen ? 'open' : ''}`}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus={searchOpen}
            />
            <button type="submit"><i className="fas fa-search" /></button>
          </form>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === '/'} onClick={closeMenu}
                className={({ isActive }) => isActive ? 'active' : ''}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li><Link to="/cart"  onClick={closeMenu}><i className="fas fa-shopping-cart" /> السلة ({cartCount})</Link></li>
          <li><Link to="/login" onClick={closeMenu}><i className="fas fa-user" /> تسجيل الدخول</Link></li>
        </ul>
      </div>
      {menuOpen && <div className="mobile-overlay" onClick={closeMenu} />}
    </>
  );
}
