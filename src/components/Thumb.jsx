import { topics } from '../data/topics.js'
const icons = { phuong: '✦', khihau: '◐', mattroi: '☀' }
export default function Thumb({ topic }) {
  const t = topics.find((x) => x.id === topic)
  return <div className={`thumb ${t?.color || 'sky'}`}><span>{icons[topic] || '★'}</span></div>
}
