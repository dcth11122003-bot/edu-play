import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
const links = [['/', 'Trang chủ'], ['/kho-tro-choi', 'Kho trò chơi'], ['/bai-giang', 'Bài giảng'], ['/gioi-thieu', 'Giới thiệu']]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link to="/" className="logo"><span className="logo-dot">★</span>EDU PLAY</Link>
        <button className="burger" aria-label="Mở menu" onClick={() => setOpen(!open)}>☰</button>
        <nav className={open ? 'links open' : 'links'} onClick={() => setOpen(false)}>
          {links.map(([to, t]) => <NavLink key={to} to={to} end={to === '/'}>{t}</NavLink>)}
          <Link to="/quan-tri" className="btn small ghost">Quản trị</Link>
        </nav>
      </div>
    </header>
  )
}
