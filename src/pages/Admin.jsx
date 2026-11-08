import { useState } from "react";
import { ADMIN_CODE, SUBJECTS, TOPICS } from "../data/mockData.js";

export default function Admin({ custom, setCustom }) {
  const [ok, sok] = useState(() => { try { return sessionStorage.getItem("adm") === "1" } catch (e) { return false } });
  const [code, sc] = useState("");
  const [err, se] = useState(false);
  const blank = { name: "", topic: TOPICS[0].id, subject: SUBJECTS[0].id, grade: 4, type: "Chọn đáp án", html: "", cover: "" };
  const [f, sf] = useState(blank);
  const [eid, seid] = useState(null);

  if (!ok)
    return (
      <div className="panel" style={{ maxWidth: 380, margin: "40px auto", textAlign: "center" }}>
        <div style={{ fontSize: "3rem" }}>🔐</div>
        <h2>Khu vực quản trị</h2>
        <form className="f" onSubmit={(e) => {
          e.preventDefault();
          if (code === ADMIN_CODE) { sok(true); try { sessionStorage.setItem("adm", "1") } catch (x) {} } else se(true);
        }}>
          <input type="password" inputMode="numeric" value={code} onChange={(e) => { sc(e.target.value); se(false); }} placeholder="Nhập mã quản trị" />
          {err && <small style={{ color: "#E5484D" }}>Mã chưa đúng, thử lại nhé.</small>}
          <button className="btn" type="submit">Vào quản trị</button>
        </form>
      </div>
    );

  const up = (k) => (e) => sf({ ...f, [k]: e.target.value });
  const pick = (e) => {
    const fl = e.target.files[0];
    if (!fl) return;
    const r = new FileReader();
    r.onload = () => sf((p) => ({ ...p, cover: r.result }));
    r.readAsDataURL(fl);
  };
  const save = (e) => {
    e.preventDefault();
    if (!f.name.trim() || !f.html.trim()) return;
    const g = { ...f, grade: +f.grade, emoji: "🎮" };
    setCustom(eid
      ? custom.map((c) => (c.id === eid ? { ...c, ...g } : c))
      : [...custom, { ...g, id: "c" + Date.now(), order: 100 + custom.length, featured: true }]);
    sf(blank); seid(null);
  };

  return (
    <>
      <div className="sec">
        <h2>🛠️ Quản trị trò chơi</h2>
        <button className="link" onClick={() => { try { sessionStorage.removeItem("adm") } catch (x) {} sok(false); }}>Đăng xuất</button>
      </div>
      <div className="panel">
        <form className="f" onSubmit={save}>
          <label>Tên trò chơi<input value={f.name} onChange={up("name")} required /></label>
          <label>Môn học<select value={f.subject} onChange={up("subject")}>{SUBJECTS.map((s) => <option key={s.id}>{s.id}</option>)}</select></label>
          <label>Bài học / chủ đề<select value={f.topic} onChange={up("topic")}>{TOPICS.map((t) => <option key={t.id}>{t.id}</option>)}</select></label>
          <label>Lớp<select value={f.grade} onChange={up("grade")}>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>Lớp {n}</option>)}</select></label>
          <label>Dạng chơi<select value={f.type} onChange={up("type")}>{["Chọn đáp án", "Kéo thả", "Ghép hình"].map((n) => <option key={n}>{n}</option>)}</select></label>
          <label>Ảnh bìa<input type="file" accept="image/*" onChange={pick} /></label>
          {f.cover && <img src={f.cover} alt="Ảnh bìa" style={{ width: 120, borderRadius: 16 }} />}
          <label>Mã HTML của trò chơi<textarea rows="6" value={f.html} onChange={up("html")} placeholder="Dán toàn bộ mã HTML vào đây…" required /></label>
          <div className="ctrl" style={{ margin: 0 }}>
            <button className="btn" type="submit">{eid ? "Lưu chỉnh sửa" : "Đăng trò chơi"}</button>
            {eid && <button type="button" className="btn ghost" onClick={() => { sf(blank); seid(null); }}>Hủy</button>}
          </div>
        </form>
      </div>
      <div className="sec"><h3>Trò chơi đã đăng ({custom.length})</h3></div>
      <div className="panel">
        {custom.length ? custom.map((c) => (
          <div className="row" key={c.id}>
            <span>{c.name} <small>· {c.subject} · Lớp {c.grade}</small></span>
            <button className="btn ghost" onClick={() => { sf({ ...c }); seid(c.id); window.scrollTo(0, 0); }}>Sửa</button>
            <button className="btn pink" onClick={() => confirm("Xóa trò chơi này?") && setCustom(custom.filter((x) => x.id !== c.id))}>Xóa</button>
          </div>
        )) : <p style={{ color: "var(--mute)" }}>Chưa có trò chơi nào.</p>}
      </div>
    </>
  );
}