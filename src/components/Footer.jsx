import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <footer className="footer"><div className="wrap foot-in">
      <div><div className="logo"><span className="logo-dot">★</span>EDU PLAY</div><p>Thư viện trò chơi giáo dục dành cho học sinh tiểu học.</p></div>
      <div><h4>Khám phá</h4><Link to="/kho-tro-choi">Kho trò chơi</Link><Link to="/bai-giang">Bài giảng</Link></div>
      <div><h4>Thông tin</h4><Link to="/gioi-thieu">Giới thiệu</Link><Link to="/quan-tri">Quản trị</Link></div>
      <p className="copy">© 2026 EDU PLAY. Phiên bản giao diện demo.</p>
    </div></footer>
  )
}
