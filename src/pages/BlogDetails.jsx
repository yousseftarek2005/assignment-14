import { Link, useParams, Navigate } from 'react-router-dom'
import {
  Home as HomeIcon,
  ChevronLeft,
  Clock,
  Calendar,
  List,
  Camera,
  Link2,
  Linkedin,
  Mail,
  Images,
} from 'lucide-react'
import siteData from '../data/posts.json'
import PostCard from '../components/PostCard'

function XIcon(props) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function WhatsAppIcon(props) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.017 2.003c-5.514 0-9.986 4.472-9.986 9.986 0 1.76.464 3.482 1.345 4.997L2 22l5.146-1.35a9.955 9.955 0 0 0 4.87 1.24h.004c5.513 0 9.985-4.472 9.985-9.987 0-2.669-1.04-5.176-2.927-7.062a9.926 9.926 0 0 0-7.061-2.838zm0 18.03h-.003a8.29 8.29 0 0 1-4.229-1.158l-.303-.18-3.053.8.815-2.977-.198-.306a8.267 8.267 0 0 1-1.267-4.407c0-4.573 3.72-8.293 8.294-8.293a8.24 8.24 0 0 1 5.865 2.43 8.238 8.238 0 0 1 2.428 5.868c0 4.573-3.72 8.293-8.293 8.293z" />
    </svg>
  )
}

export default function BlogDetails() {
  const { slug } = useParams()
  const { posts } = siteData
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return <Navigate to="/404" replace />
  }

  const related = posts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)
  const blocks = post.content.split(/\n\n+/)
  const headings = blocks.filter((b) => b.startsWith('## ')).map((b) => b.replace('## ', ''))
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  let headingIndex = 0

  return (
    <article className="post-details">
      <div className="post-details-hero">
        <img src={post.image} alt="" />
        <div className="post-details-scrim" />

        <div className="container post-details-hero-top">
          <nav className="breadcrumb" aria-label="مسار التصفح">
            <Link to={`/blog?category=${encodeURIComponent(post.category)}`}>{post.category}</Link>
            <ChevronLeft size={14} />
            <Link to="/blog">المدونة</Link>
            <ChevronLeft size={14} />
            <Link to="/" aria-label="الرئيسية">
              <HomeIcon size={14} />
            </Link>
          </nav>
        </div>

        <div className="container post-details-hero-content">
          <div className="post-details-meta">
            <span>
              <Clock size={14} /> {post.readTime}
            </span>
            <span>
              <Calendar size={14} /> {formatDate(post.date)}
            </span>
            <span className="post-details-badge">{post.category}</span>
          </div>

          <h1>{post.title}</h1>

          <div className="post-details-author-card">
            <div>
              <strong>{post.author.name}</strong>
              <span>{post.author.role}</span>
            </div>
            <img src={post.author.avatar} alt="" />
          </div>
        </div>
      </div>

      <div className="container post-details-layout">
        <aside className="post-details-sidebar">
          <div className="toc-card">
            <div className="toc-card-head">
              <span>محتويات المقال</span>
              <List size={16} />
            </div>
            <ul>
              {headings.map((h, i) => (
                <li key={h}>
                  <a href={`#section-${i + 1}`}>
                    {h}
                    <span>{i + 1}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href="#section-outro">
                  الخلاصة
                  <span>{headings.length + 1}</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="info-mini-cards">
            <div className="info-mini-card">
              <Calendar size={18} />
              <strong>{formatDateShort(post.date)}</strong>
              <span>تاريخ النشر</span>
            </div>
            <div className="info-mini-card">
              <Clock size={18} />
              <strong>{post.readTime.split(' ')[0]}</strong>
              <span>وقت القراءة</span>
            </div>
          </div>

          <div className="sidebar-newsletter">
            <span className="sidebar-newsletter-icon">
              <Mail size={20} />
            </span>
            <strong>لا تفوّت جديدنا</strong>
            <p>اشترك للحصول على أحدث المقالات</p>
            <Link to="/blog" className="btn btn-primary btn-block">
              تصفح المزيد
            </Link>
          </div>
        </aside>

        <div className="post-details-content-col">
          <blockquote className="pull-quote">{post.excerpt}</blockquote>

          {blocks.map((block, i) => {
            if (block.startsWith('## ')) {
              headingIndex += 1
              return (
                <h2 key={i} id={`section-${headingIndex}`} className="content-heading">
                  <span className="content-heading-icon">
                    <Camera size={16} />
                  </span>
                  {block.replace('## ', '')}
                </h2>
              )
            }
            return <p key={i}>{block}</p>
          })}
          <span id="section-outro" />

          <div className="share-row">
            <span>شارك المقال</span>
            <div className="share-icons">
              <a href={shareUrl} aria-label="نسخ الرابط">
                <Link2 size={15} />
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="مشاركة عبر واتساب"
              >
                <WhatsAppIcon />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="مشاركة عبر لينكدإن"
              >
                <Linkedin size={15} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="مشاركة عبر إكس"
              >
                <XIcon />
              </a>
            </div>
          </div>

          <div className="author-bio-card">
            <div>
              <span className="author-bio-label">كاتب المقال</span>
              <strong>{post.author.name}</strong>
              <span className="author-bio-role">{post.author.role}</span>
              <p>{post.author.name} {post.author.role.includes('محترف') ? 'شغوف' : 'خبير'} بمشاركة المعرفة والخبرات في عالم التصوير الفوتوغرافي.</p>
            </div>
            <img src={post.author.avatar} alt="" />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container related-section">
          <div className="section-heading">
            <div className="related-heading">
              <span className="related-icon">
                <Images size={18} />
              </span>
              <div>
                <h2>مقالات قد تعجبك</h2>
                <p>استكشف المزيد من المحتوى المميز</p>
              </div>
            </div>
            <Link to="/blog" className="link-more">
              عرض الكل
            </Link>
          </div>
          <div className="post-grid post-grid--3">
            {related.map((p) => (
              <PostCard key={p.id} post={p} variant="grid" />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

function formatDateShort(dateStr) {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('ar-EG', { day: 'numeric', month: 'long' }).format(date)
}
