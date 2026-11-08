/* ===== DỮ LIỆU TẬP TRUNG – thêm môn/chủ đề/trò chơi tại đây ===== */
export const ADMIN_CODE = "112233"; // Chỉ dùng cho demo giao diện, không phải bảo mật thật

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

export const DEMO = [
  {
    id: "thien-the-3d", 
    name: "Mô phỏng Nhật - Nguyệt thực 3D",
    topic: "Mặt Trời, Trái Đất và Mặt Trăng",
    subject: "Khoa học",
    grade: 5,
    type: "Mô phỏng tương tác",
    emoji: "🪐",
    cover: "/1.jpg", // THAY TÊN ẢNH CỦA ÔNG VÀO ĐÂY (Giữ nguyên dấu / ở đầu)
    html: `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>Mô phỏng Nhật Thực và Nguyệt Thực 3D</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
        <style>
            body { margin: 0; padding: 0; overflow: hidden; background-color: #000; color: #fff; font-family: 'Inter', sans-serif; touch-action: none; }
            #canvas-container { display: block; width: 100vw; height: 100vh; }
            #ui-layer { position: absolute; top: 20px; left: 20px; pointer-events: none; z-index: 10; text-shadow: 0 2px 4px rgba(0,0,0,0.8); }
            .instruction { background: rgba(25, 25, 35, 0.6); backdrop-filter: blur(8px); padding: 15px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 10px 25px rgba(0,0,0,0.5); pointer-events: auto; }
        </style>
    </head>
    <body>
        <div id="ui-layer">
            <h1 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-3 drop-shadow-md">Hệ Mặt Trời 3D</h1>
            <div class="instruction inline-block text-sm md:text-base text-gray-200">
                <ul class="space-y-2">
                    <li>👆 <strong>Kéo thả</strong> trực tiếp Trái đất hoặc Mặt trăng để di chuyển chúng.</li>
                    <li>🔄 <strong>Nhấp & kéo nền</strong> (không gian trống) để xoay Camera.</li>
                    <li>🔍 <strong>Cuộn chuột</strong> (hoặc chụm 2 ngón tay) để Phóng to/Thu nhỏ.</li>
                    <li class="pt-2 border-t border-gray-600">🌑 Đặt Mặt trăng ở giữa để tạo <strong>Nhật thực</strong>.</li>
                    <li>🌎 Đặt Trái đất ở giữa để tạo <strong>Nguyệt thực</strong>.</li>
                </ul>
            </div>
        </div>
        <div id="canvas-container"></div>
        <script>
            let scene, camera, renderer, controls;
            let sun, earth, moon;
            let raycaster, mouse, dragPlane;
            let draggedMesh = null;
            let dragOffset = new THREE.Vector3();
            let intersectionPoint = new THREE.Vector3();

            function createEarthTexture() {
                const canvas = document.createElement('canvas');
                canvas.width = 1024; canvas.height = 512;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#0b3d91'; ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#228b22';
                for(let i = 0; i < 150; i++) {
                    ctx.beginPath(); ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*40+10, 0, Math.PI*2); ctx.fill();
                }
                ctx.fillStyle = '#c2b280';
                for(let i = 0; i < 60; i++) {
                    ctx.beginPath(); ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*25+5, 0, Math.PI*2); ctx.fill();
                }
                return new THREE.CanvasTexture(canvas);
            }

            function createMoonTexture() {
                const canvas = document.createElement('canvas');
                canvas.width = 512; canvas.height = 256;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#777777'; ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#444444';
                for(let i = 0; i < 300; i++) {
                    ctx.beginPath(); ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*6+1, 0, Math.PI*2); ctx.fill();
                }
                return new THREE.CanvasTexture(canvas);
            }

            function init() {
                const container = document.getElementById('canvas-container');
                scene = new THREE.Scene();
                scene.background = new THREE.Color(0x050510);
                camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
                camera.position.set(0, 80, 120);

                renderer = new THREE.WebGLRenderer({ antialias: true });
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                container.appendChild(renderer.domElement);

                controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true; controls.dampingFactor = 0.05;
                controls.maxDistance = 300; controls.minDistance = 30;

                scene.add(new THREE.AmbientLight(0xffffff, 0.03));
                const sunLight = new THREE.PointLight(0xffffff, 2.5, 500);
                sunLight.position.set(0, 0, 0); sunLight.castShadow = true;
                sunLight.shadow.mapSize.width = 2048; sunLight.shadow.mapSize.height = 2048;
                sunLight.shadow.bias = -0.001;
                scene.add(sunLight);

                const sunGeometry = new THREE.SphereGeometry(12, 64, 64);
                const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffdd00 });
                sun = new THREE.Mesh(sunGeometry, sunMaterial);
                scene.add(sun);

                const glowGeometry = new THREE.SphereGeometry(14, 32, 32);
                const glowMaterial = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending });
                sun.add(new THREE.Mesh(glowGeometry, glowMaterial));

                const earthGeometry = new THREE.SphereGeometry(6, 64, 64);
                const earthMaterial = new THREE.MeshStandardMaterial({ map: createEarthTexture(), roughness: 0.7, metalness: 0.2 });
                earth = new THREE.Mesh(earthGeometry, earthMaterial);
                earth.position.set(60, 0, 0); earth.rotation.z = 23.5 * Math.PI / 180;
                earth.castShadow = true; earth.receiveShadow = true;
                scene.add(earth);

                const moonGeometry = new THREE.SphereGeometry(2, 32, 32);
                const moonMaterial = new THREE.MeshStandardMaterial({ map: createMoonTexture(), roughness: 1.0, metalness: 0.0 });
                moon = new THREE.Mesh(moonGeometry, moonMaterial);
                moon.position.set(35, 0, 0);
                moon.castShadow = true; moon.receiveShadow = true;
                scene.add(moon);

                createStars();

                raycaster = new THREE.Raycaster();
                mouse = new THREE.Vector2();
                dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

                window.addEventListener('resize', onWindowResize, false);
                renderer.domElement.addEventListener('pointerdown', onPointerDown, false);
                renderer.domElement.addEventListener('pointermove', onPointerMove, false);
                window.addEventListener('pointerup', onPointerUp, false);

                animate();
            }

            function createStars() {
                const starGeometry = new THREE.BufferGeometry();
                const posArray = new Float32Array(1500 * 3);
                for(let i = 0; i < 1500 * 3; i+=3) {
                    const r = 150 + Math.random() * 250;
                    const theta = 2 * Math.PI * Math.random();
                    const phi = Math.acos(2 * Math.random() - 1);
                    posArray[i] = r * Math.sin(phi) * Math.cos(theta);
                    posArray[i+1] = r * Math.sin(phi) * Math.sin(theta);
                    posArray[i+2] = r * Math.cos(phi);
                }
                starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
                const starMaterial = new THREE.PointsMaterial({ size: 0.7, color: 0xffffff, transparent: true, opacity: 0.8 });
                scene.add(new THREE.Points(starGeometry, starMaterial));
            }

            function updateMousePos(event) {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            }

            function onPointerDown(event) {
                updateMousePos(event); raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects([earth, moon]);
                if (intersects.length > 0) {
                    draggedMesh = intersects[0].object; controls.enabled = false; document.body.style.cursor = 'grabbing';
                    raycaster.ray.intersectPlane(dragPlane, intersectionPoint);
                    dragOffset.copy(draggedMesh.position).sub(intersectionPoint);
                }
            }

            function onPointerMove(event) {
                if (!draggedMesh) {
                    updateMousePos(event); raycaster.setFromCamera(mouse, camera);
                    document.body.style.cursor = raycaster.intersectObjects([earth, moon]).length > 0 ? 'grab' : 'default';
                    return;
                }
                updateMousePos(event); raycaster.setFromCamera(mouse, camera);
                if (raycaster.ray.intersectPlane(dragPlane, intersectionPoint)) {
                    draggedMesh.position.copy(intersectionPoint.add(dragOffset));
                    draggedMesh.position.y = 0;
                }
            }

            function onPointerUp(event) {
                if (draggedMesh) { draggedMesh = null; controls.enabled = true; document.body.style.cursor = 'default'; }
            }

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight);
            }

            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                if (earth) earth.rotation.y += 0.005;
                if (moon) moon.rotation.y += 0.002;
                renderer.render(scene, camera);
            }

            window.onload = init;
        </script>
    </body>
    </html>
    `,
    featured: true, 
    order: 1 
  }
];

export const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d } catch (e) { return d } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch (e) {} },
};