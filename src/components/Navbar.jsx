import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Search, Aperture, Menu, X } from 'lucide-react'
import siteData from '../data/posts.json'

const links = [
  { to: '/', label: 'الرئيسية' },
  { to: '/blog', label: 'المدونة' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-start">
          <Link to="/blog" className="btn btn-primary nav-cta">
            ابدأ القراءة
          </Link>
          <button className="icon-btn" aria-label="ابحث">
            <Search size={18} />
          </button>
        </div>

        <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="التنقل الرئيسي">
          <button className="nav-close" aria-label="إغلاق القائمة" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/blog" className="nav-link" onClick={() => setOpen(false)}>
            من نحن
          </NavLink>
        </nav>

        <Link to="/" className="brand">
          <span className="brand-text-group">
            <span className="brand-text">{siteData.siteInfo.name}</span>
            <span className="brand-tagline">{siteData.siteInfo.tagline}</span>
          </span>
          <span className="brand-mark" aria-hidden="true">
            <Aperture size={22} />
          </span>
        </Link>

        <button
          className="nav-toggle"
          aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Menu size={22} />
        </button>
      </div>
    </header>
  )
}
