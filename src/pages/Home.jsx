import { useState } from "react";
import Card from "../components/Card.jsx";
import { SUBJECTS, TOPICS } from "../data/mockData.js";

export default function Home({ games, go, setQ }) {
  const [q, sq] = useState("");
  const submit = (e) => { e.preventDefault(); setQ(q); go("library"); };
  return (
    <>
      <section className="hero">
        <span className="fl" style={{ left: "6%", top: "14%" }}>⭐</span>
        <span className="fl" style={{ right: "8%", top: "10%", animationDelay: "1s" }}>🚀</span>
        <span className="fl" style={{ left: "12%", bottom: "10%", animationDelay: "2s" }}>🌈</span>
        <span className="fl" style={{ right: "12%", bottom: "12%", animationDelay: "1.5s" }}>🪐</span>
        <h1>Chơi vui – Học giỏi<br />cùng Vui Học Mỗi Ngày!</h1>
        <p>Kho trò chơi và bài giảng thú vị giúp các bạn nhỏ khám phá thế giới ngay trên trình duyệt.</p>
        <form className="search" onSubmit={submit}>
          <input value={q} onChange={(e) => sq(e.target.value)} placeholder="🔎 Tìm trò chơi, môn học hoặc chủ đề…" aria-label="Tìm kiếm" />
          <button className="btn sun" type="submit">Tìm</button>
        </form>
        <div className="chips">
          {TOPICS.map((t) => (
            <button key={t.id} className="chip" onClick={() => { setQ(t.id); go("library"); }}>{t.icon} {t.id}</button>
          ))}
        </div>
        <div className="ctrl" style={{ justifyContent: "center", marginBottom: 0 }}>
          <button className="btn pink" onClick={() => go("library")}>🎮 Kho trò chơi</button>
          <button className="btn ghost" onClick={() => go("lessons")}>📖 Bài giảng</button>
        </div>
      </section>

      <div className="sec"><h2>Chọn môn học</h2></div>
      <div className="cats">
        {SUBJECTS.map((s) => (
          <button key={s.id} className="cat" style={{ background: s.c }} onClick={() => { setQ(s.id); go("library"); }}>
            <b>{s.icon}</b><h3>{s.id}</h3>
            <span>{s.d} · {games.filter((g) => g.subject === s.id).length} trò chơi</span>
          </button>
        ))}
      </div>

      <div className="sec">
        <h2>⭐ Trò chơi nổi bật</h2>
        <button className="link" onClick={() => { setQ(""); go("library"); }}>Xem tất cả →</button>
      </div>
      <div className="grid">
        {games.filter((g) => g.featured).slice(0, 8).map((g) => <Card key={g.id} g={g} go={go} />)}
      </div>
    </>
  );
}