import { Link } from 'react-router-dom'
import { Clock, ArrowLeft } from 'lucide-react'

export default function PostCard({ post, variant = 'grid' }) {
  return (
    <article className={`post-card post-card--${variant}`}>
      <Link to={`/blog/${post.slug}`} className="post-card-media">
        <img src={post.image} alt="" loading="lazy" />
        <span className="post-card-badge">{post.category}</span>
      </Link>

      <div className="post-card-body">
        <div className="post-card-meta">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden="true">•</span>
          <span className="post-card-readtime">
            <Clock size={13} /> {post.readTime}
          </span>
        </div>

        <h3 className="post-card-title">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="post-card-excerpt">{post.excerpt}</p>

        <div className="post-card-footer">
          <div className="post-card-author">
            <img src={post.author.avatar} alt="" />
            <div>
              <strong>{post.author.name}</strong>
              <span>{post.author.role}</span>
            </div>
          </div>
          <Link to={`/blog/${post.slug}`} className="post-card-arrow" aria-label={`اقرأ ${post.title}`}>
            <ArrowLeft size={16} />
          </Link>
        </div>
      </div>
    </article>
  )
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}
