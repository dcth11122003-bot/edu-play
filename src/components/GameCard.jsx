import { useState } from 'react'
import Thumb from './Thumb.jsx'
import { topics } from '../data/topics.js'

export default function GameCard({ game }) {
  const [open, setOpen] = useState(false)
  const topic = topics.find((t) => t.id === game.topic)?.name

  return (
    <>
      <article className="card">
        {/* NÂNG CẤP 1: Kiểm tra nếu có ảnh cover thì hiện ảnh thật, không thì dùng màu mặc định */}
        {game.cover ? (
          <img 
            src={game.cover} 
            alt={game.title || game.name} 
            style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} 
          />
        ) : (
          <Thumb topic={game.thumbnail || game.topic} />
        )}
        
        <div className="card-b">
          <h3>{game.title || game.name}</h3>
          <div className="tags"><span>{game.subject}</span><span>Lớp {game.grade}</span></div>
          <p className="muted">{topic}</p>
          <button className="btn small" onClick={() => setOpen(true)}>Khám phá</button>
        </div>
      </article>

      {open && (
        <div className="modal" onClick={() => setOpen(false)}>
          <div className="modal-c" style={{ maxWidth: '900px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
            <h2>{game.title || game.name}</h2>
            <div className="tags"><span>{game.subject}</span><span>Lớp {game.grade}</span></div>
            <p>{game.description}</p>
            
            {/* NÂNG CẤP 2: Chạy trực tiếp mã HTML/3D của game ngay bên trong popup */}
            {game.html ? (
              <iframe 
                srcDoc={game.html} 
                style={{ width: '100%', height: '60vh', border: 'none', borderRadius: '8px', marginTop: '15px', backgroundColor: '#000' }}
                title={game.title || game.name}
              />
            ) : (
              <p className="note">Trò chơi HTML chưa được tích hợp ở phiên bản này.</p>
            )}

            <div style={{ marginTop: '15px', textAlign: 'right' }}>
              <button className="btn small" onClick={() => setOpen(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}