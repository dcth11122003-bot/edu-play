export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Tìm trò chơi...' }) {
  return (
    <form className="search" onSubmit={(e) => { e.preventDefault(); onSubmit?.() }}>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} aria-label="Tìm kiếm" />
      <button className="btn" type="submit">Tìm</button>
    </form>
  )
}
