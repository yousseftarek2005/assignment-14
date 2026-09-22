import { ChevronRight, ChevronLeft } from 'lucide-react'

export default function Pagination({ current, total, onChange }) {
  if (total <= 1) return null

  const pages = Array.from({ length: total }, (_, i) => i + 1)

  return (
    <nav className="pagination" aria-label="تصفح صفحات المدونة">
      <button
        type="button"
        className="pagination-arrow"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        aria-label="الصفحة السابقة"
      >
        <ChevronRight size={18} />
      </button>

      <ul>
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={`pagination-dot ${page === current ? 'is-active' : ''}`}
              aria-current={page === current ? 'page' : undefined}
              onClick={() => onChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="pagination-arrow"
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        aria-label="الصفحة التالية"
      >
        <ChevronLeft size={18} />
      </button>
    </nav>
  )
}
