import { LESSONS, TOPICS } from "../data/mockData.js";

export default function Lessons({ go, setQ }) {
  return (
    <>
      <div className="sec"><h2>📖 Bài giảng lý thuyết</h2></div>
      <div className="lessons">
        {LESSONS.map((l, i) => (
          <div className="panel" key={i}>
            <div style={{ fontSize: "2.6rem" }}>{TOPICS[i].icon}</div>
            <h3>Bài {i + 1}. {l.t}</h3>
            <ul>{l.p.map((x) => <li key={x}>{x}</li>)}</ul>
            <button className="btn" onClick={() => { setQ(l.t); go("library"); }}>Chơi để ôn bài</button>
          </div>
        ))}
      </div>
    </>
  );
}