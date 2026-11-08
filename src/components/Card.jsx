const bg = (g) =>
  g.cover 
    ? { 
        backgroundImage: `url("${g.cover}")`, // Có thêm dấu ngoặc kép bọc link ảnh cho an toàn
        backgroundSize: "cover",       // Ép ảnh thu nhỏ vừa khít thẻ
        backgroundPosition: "center",  // Canh ảnh ra chính giữa
        backgroundRepeat: "no-repeat"  // Không để ảnh bị lặp lại
      } 
    : { 
        background: `linear-gradient(135deg,${g.grad || "#A29BFE,#6C5CE7"})` 
      };

export default function Card({ g, go }) {
  return (
    <button className="gc" onClick={() => go("game-" + g.id)}>
      <div className="cov" style={bg(g)}>
        {!g.cover && g.emoji}
        <span className="tag">Lớp {g.grade}</span>
      </div>
      <div className="gi">
        <h3>{g.name}</h3>
        <small>{g.subject} · {g.type}</small>
      </div>
    </button>
  );
}