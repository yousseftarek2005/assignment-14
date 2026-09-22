import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <Search size={17} />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ابحث في المقالات..."
        aria-label="ابحث في المدونة"
      />
    </div>
  )
}
