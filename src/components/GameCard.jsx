import { useState } from 'react'
import Thumb from './Thumb.jsx'
import { topics } from '../data/topics.js'
export default function GameCard({ game }) {
  const [open, setOpen] = useState(false)
  const topic = topics.find((t) => t.id === game.topic)?.name
  return (
    <>
      <article className="card">
        <Thumb topic={game.thumbnail} />
        <div className="card-b">
          <h3>{game.title}</h3>
          <div className="tags"><span>{game.subject}</span><span>Lớp {game.grade}</span></div>
          <p className="muted">{topic}</p>
          <button className="btn small" onClick={() => setOpen(true)}>Khám phá</button>
        </div>
      </article>
      {open && (
        <div className="modal" onClick={() => setOpen(false)}>
          <div className="modal-c" onClick={(e) => e.stopPropagation()}>
            <h2>{game.title}</h2>
            <div className="tags"><span>{game.subject}</span><span>Lớp {game.grade}</span></div>
            <p>{game.description}</p>
            <p className="muted"><b>Chủ đề:</b> {topic}</p>
            <p className="note">Trò chơi HTML chưa được tích hợp ở phiên bản này.</p>
            <button className="btn small" onClick={() => setOpen(false)}>Đóng</button>
          </div>
        </div>
      )}
    </>
  )
}
