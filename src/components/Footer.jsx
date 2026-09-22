import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Youtube, Linkedin, Github } from 'lucide-react'
import siteData from '../data/posts.json'

function XIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const socialIcons = {
  youtube: Youtube,
  linkedin: Linkedin,
  github: Github,
  twitter: XIcon,
}

export default function Footer() {
  const { siteInfo, categories } = siteData
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col footer-col--newsletter">
          <h3>
            ابقى على اطلاع<span className="heading-rule" aria-hidden="true" />
          </h3>
          <p>اشترك للحصول على أحدث المقالات والتحديثات.</p>
          <form className="footer-subscribe" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="أدخل بريدك الإلكتروني"
              aria-label="بريدك الإلكتروني"
            />
            <button type="submit" className="btn btn-primary">
              اشترك
            </button>
          </form>
          {sent && <p className="footer-subscribed">تم الاشتراك، شكراً لك 🎉</p>}
        </div>

        <div className="footer-col">
          <h3>
            التصنيفات<span className="heading-rule" aria-hidden="true" />
          </h3>
          <ul>
            {categories.map((cat) => (
              <li key={cat.name}>
                <Link to={`/blog?category=${encodeURIComponent(cat.name)}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>
            استكشف<span className="heading-rule" aria-hidden="true" />
          </h3>
          <ul>
            <li><Link to="/">الرئيسية</Link></li>
            <li><Link to="/blog">المدونة</Link></li>
            <li><Link to="/blog">من نحن</Link></li>
          </ul>
        </div>

        <div className="footer-col footer-col--brand">
          <div className="footer-brand-row">
            <span className="brand-text">{siteInfo.name}</span>
            <span className="footer-mark" aria-hidden="true">
              {siteInfo.name.charAt(0)}
            </span>
          </div>
          <p>{siteInfo.description}</p>
          <div className="footer-social">
            {Object.entries(siteInfo.social).map(([key, url]) => {
              const Icon = socialIcons[key]
              return (
                <a key={key} href={url} target="_blank" rel="noreferrer" aria-label={key}>
                  {Icon ? <Icon size={16} /> : key}
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {siteInfo.name}. جميع الحقوق محفوظة. صنع بكل ❤️</span>
        <span className="footer-legal">
          <a href="#">شروط الخدمة</a>
          <a href="#">سياسة الخصوصية</a>
        </span>
      </div>
    </footer>
  )
}
