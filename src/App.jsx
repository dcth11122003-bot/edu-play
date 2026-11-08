import { useState, useMemo, useEffect } from "react";
import { DEMO, store } from "./data/mockData.js";
import Home from "./pages/Home.jsx";
import Library from "./pages/Library.jsx";
import Lessons from "./pages/Lessons.jsx";
import About from "./pages/About.jsx";
import Admin from "./pages/Admin.jsx";
import GamePage from "./pages/GamePage.jsx";

const NAV = [["home", "Trang chủ"], ["library", "Kho trò chơi"], ["lessons", "Bài giảng"], ["about", "Giới thiệu"]];
const read = () => location.hash.slice(1) || "home";

export default function App() {
  const [r, sr] = useState(read);
  const [q, setQ] = useState("");
  const [custom, sc] = useState(() => store.get("customGames", []));

  useEffect(() => {
    const h = () => { sr(read()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);

  const go = (p) => { location.hash = p; };
  const setCustom = (v) => { sc(v); store.set("customGames", v); };
  const games = useMemo(() => [...DEMO, ...custom], [custom]);

  return (
    <>
      <header>
        <div className="wrap">
          <nav>
            <button className="logo" onClick={() => go("home")}><i>📚</i>Vui Học</button>
            {NAV.map((n) => (
              <button key={n[0]} className={"nl" + (r === n[0] ? " on" : "")} onClick={() => go(n[0])}>{n[1]}</button>
            ))}
          </nav>
        </div>
      </header>
      <main className="wrap">
        {r === "home" && <Home games={games} go={go} setQ={setQ} />}
        {r === "library" && <Library games={games} go={go} q={q} setQ={setQ} />}
        {r === "lessons" && <Lessons go={go} setQ={setQ} />}
        {r === "about" && <About />}
        {r === "admin" && <Admin custom={custom} setCustom={setCustom} />}
        {r.startsWith("game-") && <GamePage g={games.find((g) => "game-" + g.id === r)} go={go} />}
      </main>
      <footer>
        <div className="wrap">Made with 💜 cho các bạn nhỏ · <button className="link" onClick={() => go("admin")}>Quản trị</button></div>
      </footer>
    </>
  );
}