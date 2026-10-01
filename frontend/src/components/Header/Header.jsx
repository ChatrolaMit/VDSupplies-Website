import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import logoImg from '../../assets/logo.png';
import './Header.css';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header__inner container">
        <Link to="/" className="header__logo">
          <img src={logoImg} alt="Victoria Diagnostic Supplies" className="header__logo-img" />
          <span className="header__logo-text">Victoria Diagnostic Supplies</span>
        </Link>

        <nav className={`header__nav ${mobileOpen ? 'header__nav--open' : ''}`}>
          <NavLink to="/" className="header__link" onClick={() => setMobileOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" className="header__link" onClick={() => setMobileOpen(false)}>
            Products
          </NavLink>
          <NavLink to="/about" className="header__link" onClick={() => setMobileOpen(false)}>
            About Us
          </NavLink>
          <NavLink to="/request-quote" className="header__link header__link--cta" onClick={() => setMobileOpen(false)}>
            Request Quote
          </NavLink>
        </nav>

        <div className="header__actions" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {user ? (
            <div className="header__user-menu" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
              <Link to="/orders" className="header__link" style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }} onClick={() => setMobileOpen(false)}>
                Orders
              </Link>
              <button 
                onClick={() => { logout(); setMobileOpen(false); }} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--color-text-light)', fontFamily: 'inherit' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="header__link" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.95rem' }} onClick={() => setMobileOpen(false)}>
              <User size={18} /> Sign In
            </Link>
          )}

          <Link to="/cart" className="header__cart-icon" aria-label="View cart" style={{ position: 'relative', color: 'var(--color-text)', display: 'flex', alignItems: 'center' }}>
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: 'var(--cyan)',
                color: 'white',
                fontSize: '11px',
                fontWeight: 'bold',
                height: '18px',
                width: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="header__icon-btn header__menu-btn"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
