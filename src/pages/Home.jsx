import { Link } from 'react-router-dom'
import { Info, ArrowLeft, ChevronLeft, PenLine, FolderOpen, Users, Newspaper, Mail } from 'lucide-react'
import siteData from '../data/posts.json'
import PostCard from '../components/PostCard'
import FeaturedCard from '../components/FeaturedCard'

const STATS = [
  { icon: PenLine, value: "+50", label: "مقالة" },
  { icon: FolderOpen, value: "4", label: "تصنيفات" },
  { icon: Users, value: "10ألف+", label: "قارئ" },
  { icon: Newspaper, value: "50+", label: "مقالة" },
];

export default function Home() {
  const { posts } = siteData
  const featured = posts.filter((p) => p.featured).slice(0, 3)
  const latest = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <span className="eyebrow-pill">
            <span className="dot" />
            <span className="dot faint" />
            مرحباً بك في عدسة
          </span>

          <h1>
            اكتشف <span className="accent-word">فن</span> التصوير الفوتوغرافي
          </h1>

          <p className="hero-lead">
            انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير.
          </p>

          <div className="hero-actions">
            <Link to="/blog" className="btn btn-primary">
              <ArrowLeft size={16} /> استكشف المقالات
            </Link>
            <Link to="/blog" className="btn btn-ghost">
              <Info size={16} /> اعرف المزيد
            </Link>
          </div>

          <div className="hero-stats">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="hero-stat">
                <Icon size={20} />
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container featured-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow-pill">
              <span className="dot" />
              <span className="dot faint" />
              مميز
            </span>
            <h2>مقالات مختارة</h2>
            <p>محتوى منتقى لبدء رحلة تعلمك</p>
          </div>
          <Link to="/blog" className="btn btn-primary btn-sm">
            <ChevronLeft size={16} /> عرض الكل
          </Link>
        </div>

        <div className="featured-stack">
          {featured.map((post) => (
            <FeaturedCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="container latest-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow-pill">
              <span className="dot" />
              <span className="dot faint" />
              الأحدث
            </span>
            <h2>أحدث المقالات</h2>
            <p>محتوى جديد طازج من المطبعة</p>
          </div>
          <Link to="/blog" className="link-more">
            <ArrowLeft size={16} /> عرض جميع المقالات
          </Link>
        </div>
        <div className="post-grid post-grid--3">
          {latest.map((post) => (
            <PostCard key={post.id} post={post} variant="grid" />
          ))}
        </div>
      </section>

      <section className="container newsletter-strip">
        <div className="newsletter-card">
          <span className="newsletter-icon">
            <Mail size={22} />
          </span>
          <h2>اشترك في نشرتنا الإخبارية</h2>
          <p>احصل على أحدث المقالات ونصائح التصوير مباشرة في بريدك.</p>
          <NewsletterForm />
          <p className="newsletter-fineprint">
            إلغاء الاشتراك في أي وقت · بدون إزعاج · انضم لـ 10,000+ مصور
          </p>
        </div>
      </section>
    </>
  )
}

function NewsletterForm() {
  return (
    <form
      className="newsletter-form"
      onSubmit={(e) => e.preventDefault()}
    >
      <input type="email" required placeholder="أدخل بريدك الإلكتروني" aria-label="بريدك الإلكتروني" />
      <button type="submit" className="btn btn-primary">
        اشترك
      </button>
    </form>
  )
}
