import { useState } from "react";

export default function GamePage({ g, go }) {
  const [on, so] = useState(false);
  const [key, sk] = useState(0);
  const [help, sh] = useState(false);
  if (!g)
    return (
      <div className="empty">
        <h3>Không tìm thấy trò chơi</h3>
        <button className="btn" onClick={() => go("library")}>Về kho trò chơi</button>
      </div>
    );
  return (
    <>
      <button className="link" onClick={() => go("library")} style={{ marginTop: 14 }}>← Quay lại kho trò chơi</button>
      <div className="sec"><h2>{g.emoji} {g.name}</h2><small>{g.subject} · Lớp {g.grade}</small></div>
      <div className="stage">
        {on && g.html ? (
          <iframe key={key} title={g.name} srcDoc={g.html} sandbox="allow-scripts allow-pointer-lock" />
        ) : on ? (
          <div><div style={{ fontSize: "4rem" }}>🚧</div><h3>Trò chơi đang được chuẩn bị</h3><p>Đây là dữ liệu minh họa.</p></div>
        ) : (
          <div><div style={{ fontSize: "4.5rem" }}>{g.emoji}</div><h3>Sẵn sàng chưa nào?</h3></div>
        )}
      </div>
      <div className="ctrl">
        <button className="btn" onClick={() => so(true)}>▶ Bắt đầu</button>
        <button className="btn sun" onClick={() => sh(true)}>💡 Hướng dẫn</button>
        <button className="btn ghost" onClick={() => { sk((k) => k + 1); so(true); }}>🔄 Chơi lại</button>
      </div>
      <p style={{ color: "var(--mute)" }}>Chủ đề: {g.topic} · Dạng chơi: {g.type}</p>
      {help && (
        <div className="modal" onClick={() => sh(false)}>
          <div className="panel" onClick={(e) => e.stopPropagation()}>
            <h3>💡 Cách chơi</h3>
            <p>
              Bấm “Bắt đầu”, sau đó chạm hoặc nhấp chuột để{" "}
              {g.type === "Kéo thả" ? "kéo và thả" : g.type === "Ghép hình" ? "ghép các mảnh hình" : "chọn đáp án"} đúng.
              Muốn chơi lại từ đầu hãy bấm “Chơi lại”.
            </p>
            <button className="btn" onClick={() => sh(false)}>Đã hiểu!</button>
          </div>
        </div>
      )}
    </>
  );
}