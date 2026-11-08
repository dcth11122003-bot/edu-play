import { useState } from 'react'
import Thumb from './Thumb.jsx'
import { topics } from '../data/topics.js'
export default function LessonCard({ lesson }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="card">
      <Thumb topic={lesson.thumbnail} />
      <div className="card-b">
        <h3>{lesson.title}</h3>
        <div className="tags"><span>{lesson.subject}</span><span>Lớp {lesson.grade}</span></div>
        <p className="muted">{topics.find((t) => t.id === lesson.topic)?.name}</p>
        <p>{lesson.description}</p>
        {open && <p className="note">{lesson.content || 'Nội dung đang được cập nhật.'}</p>}
        <button className="btn small" onClick={() => setOpen(!open)}>{open ? 'Thu gọn' : 'Đọc bài học'}</button>
      </div>
    </article>
  )
}
