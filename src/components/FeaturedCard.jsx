import { Link } from "react-router-dom";
import { Clock, ArrowLeft, Star } from "lucide-react";

export default function FeaturedCard({ post }) {
  return (
    <article className="featured-card">
      <div className="featured-card-body">
        <div className="featured-card-meta">
          <span className="featured-card-readtime">
            <Clock size={14} /> {post.readTime}
          </span>
          <span className="featured-card-badge">{post.category}</span>
        </div>

        <h3>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>

        <div className="featured-card-footer">
          <Link to={`/blog/${post.slug}`} className="featured-card-link">
            <ArrowLeft size={16} /> اقرأ المقال
          </Link>
          <div className="featured-card-author">
            <div>
              <strong>{post.author.name}</strong>
              <span>{formatDate(post.date)}</span>
            </div>
            <span className="featured-card-avatar">
              <img src={post.author.avatar} alt="" />
              <span className="avatar-dot" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>

      <Link to={`/blog/${post.slug}`} className="featured-card-media">
        <img src={post.image} alt="" loading="lazy" />
        {post.featured && (
          <span className="featured-card-star">
            <Star size={13} fill="currentColor" /> مميز
          </span>
        )}
      </Link>
    </article>
  );
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
