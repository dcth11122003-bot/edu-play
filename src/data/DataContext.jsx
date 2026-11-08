import { createContext, useContext, useState } from 'react'
import { games as g0 } from './games.js'
import { lessons as l0 } from './lessons.js'
const Ctx = createContext(null)
export const useData = () => useContext(Ctx)
const nextId = (a) => Math.max(0, ...a.map((x) => x.id)) + 1
export function DataProvider({ children }) {
  const [games, setGames] = useState(g0)
  const [lessons, setLessons] = useState(l0)
  const mk = (set, list) => ({
    save: (item) => set(item.id ? list.map((x) => (x.id === item.id ? { ...x, ...item, thumbnail: item.topic } : x)) : [{ ...item, id: nextId(list), thumbnail: item.topic, featured: false, createdAt: new Date().toISOString().slice(0, 10) }, ...list]),
    remove: (id) => set(list.filter((x) => x.id !== id)),
  })
  return <Ctx.Provider value={{ games, lessons, gameOps: mk(setGames, games), lessonOps: mk(setLessons, lessons) }}>{children}</Ctx.Provider>
}
