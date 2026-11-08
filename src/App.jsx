import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import Library from './pages/Library.jsx'
import Lessons from './pages/Lessons.jsx'
import About from './pages/About.jsx'
import Admin from './pages/Admin.jsx'
export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/kho-tro-choi" element={<Library />} />
        <Route path="/bai-giang" element={<Lessons />} />
        <Route path="/gioi-thieu" element={<About />} />
        <Route path="/quan-tri" element={<Admin />} />
        <Route path="*" element={<div className="wrap empty">Không tìm thấy trang.</div>} />
      </Route>
    </Routes>
  )
}
