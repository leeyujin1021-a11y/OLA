// 1. Ocean Canvas - 잔잔한 물결 효과 (Quiet Luxury 느낌)
const canvas = document.getElementById('ocean-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class WaterParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 31, 63, 0.1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 50; i++) {
        particles.push(new WaterParticle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

init();
animate();

// 2. Firebase 데이터 연동 예시 (나중에 연동 시 사용)
/*
async function loadPosts() {
    const postContainer = document.getElementById('post-container');
    // const querySnapshot = await getDocs(collection(db, "posts"));
    // ... 데이터 바인딩 로직
}
*/

console.log("OLA: Beyond the surface.");