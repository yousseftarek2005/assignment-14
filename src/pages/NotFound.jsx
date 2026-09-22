import { Link } from 'react-router-dom'
import { Aperture, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="container not-found">
      <span className="not-found-icon" aria-hidden="true">
        <Aperture size={38} />
      </span>
      <span className="eyebrow-pill">
        <span className="dot" />
        <span className="dot faint" />
        خارج نطاق التركيز
      </span>
      <h1>404 — الصورة اللي بتدوّر عليها مش موجودة</h1>
      <p className="not-found-copy">
        يمكن الرابط اتغيّر أو المقال اتشال. جرب ترجع للمدونة وتدوّر تاني.
      </p>
      <div className="hero-actions">
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} /> الرجوع للرئيسية
        </Link>
        <Link to="/blog" className="btn btn-ghost">
          تصفح المدونة
        </Link>
      </div>
    </section>
  )
}
