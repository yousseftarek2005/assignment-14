export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="category-filter" role="group" aria-label="فلترة حسب القسم">
      <button
        type="button"
        className={`category-chip ${active === 'all' ? 'is-active' : ''}`}
        aria-pressed={active === 'all'}
        onClick={() => onChange('all')}
      >
        جميع المقالات
      </button>
      {categories.map((cat) => {
        const isActive = active === cat.name
        return (
          <button
            key={cat.name}
            type="button"
            className={`category-chip ${isActive ? 'is-active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onChange(cat.name)}
          >
            {cat.name}
          </button>
        )
      })}
    </div>
  )
}
