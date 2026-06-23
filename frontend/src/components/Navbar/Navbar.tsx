import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, Home, LayoutGrid, CreditCard, User } from 'lucide-react';
import './Navbar.css';

export function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Início', icon: Home },
    { to: '/catalog', label: 'Catálogo', icon: LayoutGrid },
    { to: '/plans', label: 'Planos', icon: CreditCard },
    { to: '/profile', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="navbar glass" id="main-navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-brand" id="brand-link">
          <Gamepad2 size={28} className="brand-icon" />
          <span className="brand-text">
            Cloud<span className="brand-highlight">Play</span>
          </span>
        </Link>

        <ul className="navbar-links">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  id={`nav-${link.label.toLowerCase()}`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
