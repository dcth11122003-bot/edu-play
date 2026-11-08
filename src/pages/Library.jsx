import { useState, useMemo } from "react";
import Card from "../components/Card.jsx";
import { SUBJECTS, TOPICS } from "../data/mockData.js";

export default function Library({ games, go, q, setQ }) {
  const [sub, ss] = useState("");
  const [gr, sg] = useState("");
  const [tp, st] = useState("");
  const [so, sso] = useState("new");
  const list = useMemo(() => {
    const k = q.trim().toLowerCase();
    const r = games.filter((g) =>
      (!k || [g.name, g.subject, g.topic].join(" ").toLowerCase().includes(k)) &&
      (!sub || g.subject === sub) &&
      (!gr || String(g.grade) === gr) &&
      (!tp || g.topic === tp));
    return [...r].sort((a, b) => (so === "az" ? a.name.localeCompare(b.name, "vi") : b.order - a.order));
  }, [games, q, sub, gr, tp, so]);

  return (
    <>
      <div className="sec"><h2>🎮 Kho trò chơi</h2><small>{list.length} trò chơi</small></div>
      <div className="bar">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔎 Tìm theo tên, môn, chủ đề…" />
        <select value={sub} onChange={(e) => ss(e.target.value)}>
          <option value="">Tất cả môn học</option>{SUBJECTS.map((s) => <option key={s.id}>{s.id}</option>)}
        </select>
        <select value={gr} onChange={(e) => sg(e.target.value)}>
          <option value="">Tất cả lớp</option>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>Lớp {n}</option>)}
        </select>
        <select value={tp} onChange={(e) => st(e.target.value)}>
          <option value="">Tất cả chủ đề</option>{TOPICS.map((t) => <option key={t.id}>{t.id}</option>)}
        </select>
        <select value={so} onChange={(e) => sso(e.target.value)}>
          <option value="new">Mới nhất</option><option value="az">Tên A → Z</option>
        </select>
      </div>
      {list.length ? (
        <div className="grid">{list.map((g) => <Card key={g.id} g={g} go={go} />)}</div>
      ) : (
        <div className="empty">
          <div style={{ fontSize: "3.5rem" }}>🔍</div>
          <h3>Chưa tìm thấy trò chơi nào</h3><p>Thử từ khóa khác nhé!</p>
        </div>
      )}
    </>
  );
}