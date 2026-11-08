import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import GameCard from '../components/GameCard.jsx'
import LessonCard from '../components/LessonCard.jsx'
import { topics } from '../data/topics.js'
import { useData } from '../data/DataContext.jsx'
const perks = [['Học mà chơi', 'Kiến thức được lồng vào trò chơi tương tác.'], ['Không cần tài khoản', 'Vào là chơi ngay trên trình duyệt.'], ['Bám sát chương trình', 'Chủ đề rõ ràng theo môn và lớp.']]
export default function Home() {
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const { games, lessons } = useData()
  return (
    <>
      <section className="hero"><div className="wrap hero-in">
        <div>
          <h1>HỌC VUI MỖI NGÀY – KHÁM PHÁ TRI THỨC</h1>
          <p>Hàng loạt trò chơi và bài giảng giúp em yêu thích Địa lí và Khoa học mỗi ngày.</p>
          <SearchBar value={q} onChange={setQ} onSubmit={() => nav(`/kho-tro-choi?q=${encodeURIComponent(q)}`)} />
          <Link to="/kho-tro-choi" className="btn big">Khám phá kho trò chơi</Link>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="planet">🌍</div><div className="orb o1" /><div className="orb o2" /><div className="orb o3" /></div>
      </div></section>
      <section className="wrap sec"><h2>Chủ đề học tập</h2>
        <div className="grid3">{topics.map((t) => (
          <Link key={t.id} to={`/kho-tro-choi?topic=${t.id}`} className={`topic ${t.color}`}>
            <h3>{t.name}</h3><p>{t.desc}</p>
            <small>{games.filter((g) => g.topic === t.id).length} trò chơi · {lessons.filter((l) => l.topic === t.id).length} bài giảng</small>
          </Link>))}</div></section>
      <section className="wrap sec"><h2>Trò chơi nổi bật</h2><div className="grid3">{games.filter((g) => g.featured).map((g) => <GameCard key={g.id} game={g} />)}</div></section>
      <section className="wrap sec"><div className="row"><h2>Bài giảng mới</h2><Link to="/bai-giang">Xem tất cả →</Link></div><div className="grid3">{lessons.slice(0, 3).map((l) => <LessonCard key={l.id} lesson={l} />)}</div></section>
      <section className="wrap sec"><h2>Vì sao chọn EDU PLAY?</h2><div className="grid3">{perks.map(([t, d]) => <div className="perk" key={t}><h3>{t}</h3><p>{d}</p></div>)}</div></section>
    </>
  )
}
