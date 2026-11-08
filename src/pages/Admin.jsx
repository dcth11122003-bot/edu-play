import { useState } from 'react'
import { topics, subjects, grades } from '../data/topics.js'
import { useData } from '../data/DataContext.jsx'
const DEMO_CODE = '112233' // Chỉ phục vụ demo giao diện, KHÔNG phải bảo mật thật
const empty = { title: '', subject: subjects[0], grade: 4, topic: topics[0].id, description: '', html: '' }
function Form({ kind, item, onSave, onCancel }) {
  const [f, setF] = useState(item || empty)
  const set = (k) => (e) => setF({ ...f, [k]: k === 'grade' ? +e.target.value : e.target.value })
  return (
    <form className="form" onSubmit={(e) => { e.preventDefault(); onSave(f) }}>
      <h3>{f.id ? 'Chỉnh sửa' : 'Thêm'} {kind}</h3>
      <label>Tên<input required value={f.title} onChange={set('title')} /></label>
      <label>Môn học<select value={f.subject} onChange={set('subject')}>{subjects.map((s) => <option key={s}>{s}</option>)}</select></label>
      <label>Lớp<select value={f.grade} onChange={set('grade')}>{grades.map((g) => <option key={g} value={g}>Lớp {g}</option>)}</select></label>
      <label>Chủ đề / bài học<select value={f.topic} onChange={set('topic')}>{topics.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</select></label>
      <label>Mô tả<textarea required value={f.description} onChange={set('description')} /></label>
      {kind === 'trò chơi' && <><label>Ảnh bìa (mô phỏng)<input type="file" accept="image/*" /></label><label>Mã HTML trò chơi (mô phỏng, chưa lưu)<textarea value={f.html || ''} onChange={set('html')} /></label></>}
      <div className="row"><button className="btn small" type="submit">Lưu</button><button type="button" className="btn small ghost" onClick={onCancel}>Hủy</button></div>
    </form>
  )
}
function Table({ rows, onEdit, onDelete }) {
  return <div className="list">{rows.map((r) => <div className="li" key={r.id}><span>{r.title}</span><span className="tags"><span>{r.subject}</span><span>Lớp {r.grade}</span></span><span><button className="btn small ghost" onClick={() => onEdit(r)}>Sửa</button> <button className="btn small danger" onClick={() => window.confirm(`Xóa "${r.title}"?`) && onDelete(r.id)}>Xóa</button></span></div>)}</div>
}
export default function Admin() {
  const [ok, setOk] = useState(false), [code, setCode] = useState(''), [err, setErr] = useState('')
  const [edit, setEdit] = useState(null) // {kind, item}
  const { games, lessons, gameOps, lessonOps } = useData()
  if (!ok) return (
    <div className="wrap sec narrow"><form className="form" onSubmit={(e) => { e.preventDefault(); code === DEMO_CODE ? setOk(true) : setErr('Mã truy cập không đúng.') }}>
      <h1>Đăng nhập quản trị</h1><label>Mã truy cập<input type="password" value={code} onChange={(e) => { setCode(e.target.value); setErr('') }} /></label>
      {err && <p className="err">{err}</p>}<button className="btn">Đăng nhập</button><p className="muted">Demo giao diện: không phải cơ chế bảo mật thật.</p>
    </form></div>)
  const ops = edit?.kind === 'trò chơi' ? gameOps : lessonOps
  return (
    <div className="wrap sec"><div className="row"><h1>Bảng điều khiển</h1><button className="btn small ghost" onClick={() => { setOk(false); setCode('') }}>Đăng xuất</button></div>
      <p className="note">Thao tác chỉ mô phỏng, dữ liệu mất khi tải lại trang.</p>
      <div className="grid3"><div className="perk"><h3>{games.length}</h3><p>Tổng trò chơi</p></div><div className="perk"><h3>{lessons.length}</h3><p>Tổng bài giảng</p></div></div>
      {edit && <Form kind={edit.kind} item={edit.item} onCancel={() => setEdit(null)} onSave={(f) => { ops.save(f); setEdit(null) }} />}
      <div className="row"><h2>Trò chơi</h2><button className="btn small" onClick={() => setEdit({ kind: 'trò chơi' })}>Thêm trò chơi</button></div>
      <Table rows={games} onEdit={(item) => setEdit({ kind: 'trò chơi', item })} onDelete={gameOps.remove} />
      <div className="row"><h2>Bài giảng</h2><button className="btn small" onClick={() => setEdit({ kind: 'bài giảng' })}>Thêm bài giảng</button></div>
      <Table rows={lessons} onEdit={(item) => setEdit({ kind: 'bài giảng', item })} onDelete={lessonOps.remove} />
    </div>
  )
}
