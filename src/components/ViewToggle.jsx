import { List, LayoutGrid } from 'lucide-react'

export default function ViewToggle({ view, onChange }) {
  return (
    <div className="view-toggle" role="group" aria-label="طريقة عرض المقالات">
      <button
        type="button"
        className={view === 'list' ? 'is-active' : ''}
        aria-pressed={view === 'list'}
        aria-label="عرض قائمة"
        onClick={() => onChange('list')}
      >
        <List size={18} />
      </button>
      <button
        type="button"
        className={view === 'grid' ? 'is-active' : ''}
        aria-pressed={view === 'grid'}
        aria-label="عرض شبكي"
        onClick={() => onChange('grid')}
      >
        <LayoutGrid size={18} />
      </button>
    </div>
  )
}
