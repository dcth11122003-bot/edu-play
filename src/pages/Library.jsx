import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import GameCard from '../components/GameCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { topics, subjects, grades } from '../data/topics.js'
import { useData } from '../data/DataContext.jsx'
const PAGE = 6
export default function Library() {
  const [sp, setSp] = useSearchParams()
  const { games } = useData()
  const [show, setShow] = useState(PAGE)
  const q = sp.get('q') || '', subject = sp.get('subject') || '', grade = sp.get('grade') || '', topic = sp.get('topic') || '', sort = sp.get('sort') || 'new'
  const set = (k, v) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }); setShow(PAGE) }
  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    const r = games.filter((g) => (!s || g.title.toLowerCase().includes(s)) && (!subject || g.subject === subject) && (!grade || g.grade === +grade) && (!topic || g.topic === topic))
    return r.sort((a, b) => (sort === 'name' ? a.title.localeCompare(b.title, 'vi') : b.createdAt.localeCompare(a.createdAt)))
  }, [games, q, subject, grade, topic, sort])
  return (
    <div className="wrap sec">
      <h1>Kho trò chơi</h1>
      <SearchBar value={q} onChange={(v) => set('q', v)} />
      <div className="filters">
        <select value={subject} onChange={(e) => set('subject', e.target.value)}><option value="">Tất cả môn</option>{subjects.map((s) => <option key={s}>{s}</option>)}</select>
        <select value={grade} onChange={(e) => set('grade', e.target.value)}><option value="">Tất cả lớp</option>{grades.map((g) => <option key={g} value={g}>Lớp {g}</option>)}</select>
        <select value={topic} onChange={(e) => set('topic', e.target.value)}><option value="">Tất cả chủ đề</option>{topics.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</select>
        <select value={sort} onChange={(e) => set('sort', e.target.value)}><option value="new">Mới nhất</option><option value="name">Theo tên A–Z</option></select>
        <button className="btn small ghost" onClick={() => { setSp({}); setShow(PAGE) }}>Xóa bộ lọc</button>
      </div>
      <p className="muted">{list.length} trò chơi</p>
      {list.length === 0 ? <div className="empty">Không tìm thấy trò chơi phù hợp. Hãy thử xóa bộ lọc.</div> : <div className="grid3">{list.slice(0, show).map((g) => <GameCard key={g.id} game={g} />)}</div>}
      {show < list.length && <div className="center"><button className="btn" onClick={() => setShow(show + PAGE)}>Xem thêm</button></div>}
    </div>
  )
}
