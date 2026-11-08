export const ADMIN_CODE = "112233"; 

export const SUBJECTS = [
  { id: "Lịch sử và Địa lí", icon: "🌏", c: "linear-gradient(135deg,#2EC4B6,#56CCF2)", d: "Khám phá bản đồ, khí hậu và hành tinh" },
  { id: "Khoa học", icon: "🔬", c: "linear-gradient(135deg,#FF9F6B,#FF7EB6)", d: "Mặt Trời, Mặt Trăng và hiện tượng tự nhiên" },
];

export const TOPICS = [
  { id: "Xác định các phương trong không gian", icon: "🧭" },
  { id: "Trái Đất và các đới khí hậu", icon: "🌍" },
  { id: "Mặt Trời, Trái Đất và Mặt Trăng", icon: "🌞" },
];

export const LESSONS = [
  { t: TOPICS[0].id, p: ["Bốn phương chính: Bắc, Nam, Đông, Tây", "Cách dùng la bàn và mặt trời để tìm hướng", "Đọc phương hướng trên bản đồ"] },
  { t: TOPICS[1].id, p: ["Trái Đất có hình cầu, quay quanh trục", "Nhiệt đới, ôn đới và hàn đới", "Vì sao mỗi nơi lại nóng lạnh khác nhau?"] },
  { t: TOPICS[2].id, p: ["Trái Đất quay quanh Mặt Trời", "Mặt Trăng quay quanh Trái Đất", "Ngày – đêm và các pha của Mặt Trăng"] },
];

// DỮ LIỆU GAME CHÍNH THỨC
export const DEMO = [
  {
    id: "thien-the-3d", 
    name: "Mô phỏng Nhật - Nguyệt thực 3D",
    title: "Mô phỏng Nhật - Nguyệt thực 3D",
    topic: "Mặt Trời, Trái Đất và Mặt Trăng",
    subject: "Khoa học",
    grade: 5,
    type: "Mô phỏng tương tác",
    emoji: "🪐",
    cover: "/1.jpeg", // Đường dẫn ảnh từ thư mục public
    html: `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Mô phỏng 3D</title><script src="https://cdn.tailwindcss.com"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script><script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script><style>body { margin: 0; padding: 0; overflow: hidden; background-color: #000; color: #fff; font-family: sans-serif; } #canvas-container { width: 100vw; height: 100vh; } #ui-layer { position: absolute; top: 20px; left: 20px; z-index: 10; pointer-events: none; } .instruction { background: rgba(25,25,35,0.6); padding: 15px; border-radius: 12px; pointer-events: auto; }</style></head><body><div id="ui-layer"><h1 class="text-2xl font-bold text-yellow-400 mb-2">Hệ Mặt Trời 3D</h1><div class="instruction text-sm"><ul><li>👆 <strong>Kéo thả</strong> Trái đất hoặc Mặt trăng để di chuyển.</li><li>🔄 <strong>Kéo nền</strong> để xoay Camera.</li><li>🔍 <strong>Cuộn chuột</strong> để Phóng to/Thu nhỏ.</li></ul></div></div><div id="canvas-container"></div><script>let scene, camera, renderer, controls, sun, earth, moon, raycaster, mouse, dragPlane, draggedMesh=null, dragOffset=new THREE.Vector3(), intersectionPoint=new THREE.Vector3(); function createEarthTexture() { const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = 512; const ctx = canvas.getContext('2d'); ctx.fillStyle = '#0b3d91'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#228b22'; for(let i=0; i<150; i++) { ctx.beginPath(); ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*40+10, 0, Math.PI*2); ctx.fill(); } return new THREE.CanvasTexture(canvas); } function createMoonTexture() { const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 256; const ctx = canvas.getContext('2d'); ctx.fillStyle = '#777777'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#444444'; for(let i=0; i<300; i++) { ctx.beginPath(); ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*6+1, 0, Math.PI*2); ctx.fill(); } return new THREE.CanvasTexture(canvas); } function init() { const container = document.getElementById('canvas-container'); scene = new THREE.Scene(); scene.background = new THREE.Color(0x050510); camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000); camera.position.set(0, 80, 120); renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setSize(window.innerWidth, window.innerHeight); renderer.shadowMap.enabled = true; container.appendChild(renderer.domElement); controls = new THREE.OrbitControls(camera, renderer.domElement); controls.enableDamping = true; scene.add(new THREE.AmbientLight(0xffffff, 0.03)); const sunLight = new THREE.PointLight(0xffffff, 2.5, 500); sunLight.castShadow = true; scene.add(sunLight); sun = new THREE.Mesh(new THREE.SphereGeometry(12, 64, 64), new THREE.MeshBasicMaterial({ color: 0xffdd00 })); scene.add(sun); earth = new THREE.Mesh(new THREE.SphereGeometry(6, 64, 64), new THREE.MeshStandardMaterial({ map: createEarthTexture() })); earth.position.set(60, 0, 0); earth.castShadow = true; earth.receiveShadow = true; scene.add(earth); moon = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshStandardMaterial({ map: createMoonTexture() })); moon.position.set(35, 0, 0); moon.castShadow = true; moon.receiveShadow = true; scene.add(moon); const starGeo = new THREE.BufferGeometry(); const pos = new Float32Array(4500); for(let i=0; i<4500; i+=3) { const r=150+Math.random()*250, theta=2*Math.PI*Math.random(), phi=Math.acos(2*Math.random()-1); pos[i]=r*Math.sin(phi)*Math.cos(theta); pos[i+1]=r*Math.sin(phi)*Math.sin(theta); pos[i+2]=r*Math.cos(phi); } starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({size: 0.7, color: 0xffffff}))); raycaster = new THREE.Raycaster(); mouse = new THREE.Vector2(); dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); renderer.domElement.addEventListener('pointerdown', e=>{ mouse.x=(e.clientX/window.innerWidth)*2-1; mouse.y=-(e.clientY/window.innerHeight)*2+1; raycaster.setFromCamera(mouse, camera); const intersects = raycaster.intersectObjects([earth, moon]); if(intersects.length>0) { draggedMesh=intersects[0].object; controls.enabled=false; raycaster.ray.intersectPlane(dragPlane, intersectionPoint); dragOffset.copy(draggedMesh.position).sub(intersectionPoint); }}); renderer.domElement.addEventListener('pointermove', e=>{ mouse.x=(e.clientX/window.innerWidth)*2-1; mouse.y=-(e.clientY/window.innerHeight)*2+1; raycaster.setFromCamera(mouse, camera); if(!draggedMesh) { document.body.style.cursor = raycaster.intersectObjects([earth, moon]).length>0 ? 'grab' : 'default'; return; } if(raycaster.ray.intersectPlane(dragPlane, intersectionPoint)) { draggedMesh.position.copy(intersectionPoint.add(dragOffset)); draggedMesh.position.y=0; }}); window.addEventListener('pointerup', ()=>{ if(draggedMesh){ draggedMesh=null; controls.enabled=true; document.body.style.cursor='default'; }}); animate(); } function animate() { requestAnimationFrame(animate); controls.update(); if(earth) earth.rotation.y += 0.005; if(moon) moon.rotation.y += 0.002; renderer.render(scene, camera); } window.onload = init; </script></body></html>`,
    featured: true, 
    order: 1 
  }
];

export const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d } catch (e) { return d } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch (e) {} },
};