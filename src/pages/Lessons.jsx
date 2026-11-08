import { useState } from 'react'
import LessonCard from '../components/LessonCard.jsx'
import { topics } from '../data/topics.js'
import { useData } from '../data/DataContext.jsx'
export default function Lessons() {
  const { lessons } = useData()
  const [topic, setTopic] = useState('')
  const list = lessons.filter((l) => !topic || l.topic === topic)
  return (
    <div className="wrap sec"><h1>Bài giảng lý thuyết</h1>
      <div className="filters"><select value={topic} onChange={(e) => setTopic(e.target.value)}><option value="">Tất cả chủ đề</option>{topics.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
      {list.length ? <div className="grid3">{list.map((l) => <LessonCard key={l.id} lesson={l} />)}</div> : <div className="empty">Chưa có bài giảng.</div>}
    </div>
  )
}
