import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Newspaper } from 'lucide-react'
import siteData from '../data/posts.json'
import PostCard from '../components/PostCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import ViewToggle from '../components/ViewToggle'
import Pagination from '../components/Pagination'

const PAGE_SIZE = 6

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { posts, categories } = siteData

  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || 'all'
  const view = searchParams.get('view') || 'grid'
  const page = Number(searchParams.get('page') || 1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts
      .filter((post) => (category === 'all' ? true : post.category === category))
      .filter((post) => {
        if (!q) return true
        const haystack = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase()
        return haystack.includes(q)
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [posts, query, category])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const visiblePosts = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  useEffect(() => {
    if (page !== safePage) {
      updateParams({ page: safePage })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safePage])

  function updateParams(patch) {
    const next = new URLSearchParams(searchParams)
    Object.entries(patch).forEach(([key, value]) => {
      if (!value || value === 'all' || value === '' || (key === 'page' && value === 1)) {
        next.delete(key)
      } else {
        next.set(key, value)
      }
    })
    setSearchParams(next, { replace: true })
  }

  return (
    <section className="container blog-page">
      <div className="blog-header">
        <span className="eyebrow-pill">
          <Newspaper size={14} /> مدونتنا
        </span>
        <h1>
          <span className="accent-word">استكشف</span> مقالاتنا
        </h1>
        <p>اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث</p>
      </div>

      <div className="blog-toolbar">
        <CategoryFilter
          categories={categories}
          active={category}
          onChange={(value) => updateParams({ category: value, page: 1 })}
        />
        <SearchBar value={query} onChange={(value) => updateParams({ q: value, page: 1 })} />
      </div>

      <div className="blog-toolbar-secondary">
        <ViewToggle view={view} onChange={(value) => updateParams({ view: value })} />
        <span className="blog-count">عرض {filtered.length} مقالات</span>
      </div>

      {visiblePosts.length > 0 ? (
        <div className={`post-grid post-grid--${view === 'grid' ? '3' : 'list'}`}>
          {visiblePosts.map((post) => (
            <PostCard key={post.id} post={post} variant={view} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span aria-hidden="true">📷</span>
          <h2>مفيش مقالات تطابق البحث</h2>
          <p>جرب كلمة بحث مختلفة أو اختار قسم تاني.</p>
        </div>
      )}

      <Pagination current={safePage} total={totalPages} onChange={(value) => updateParams({ page: value })} />
    </section>
  )
}
