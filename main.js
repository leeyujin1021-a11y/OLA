// 1. Ocean Canvas - 잔잔한 물결 효과
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

// 2. Web Component: Ola Post Card
class OlaPostCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title') || 'Untitled';
        const category = this.getAttribute('category') || 'General';
        const image = this.getAttribute('image') || '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    cursor: pointer;
                    overflow: hidden;
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                :host(:hover) {
                    transform: translateY(-12px);
                }
                .card-image {
                    width: 100%;
                    aspect-ratio: 4/5;
                    object-fit: cover;
                    background-color: #eee;
                    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }
                :host(:hover) .card-image {
                    transform: scale(1.05);
                }
                .content {
                    padding: 1.5rem 0;
                }
                .category {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: #C5A059;
                    margin-bottom: 0.5rem;
                    display: block;
                }
                .title {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.5rem;
                    color: #001F3F;
                    line-height: 1.3;
                }
            </style>
            <img src="${image}" alt="${title}" class="card-image">
            <div class="content">
                <span class="category">${category}</span>
                <div class="title">${title}</div>
            </div>
        `;
    }
}
customElements.define('ola-post-card', OlaPostCard);

console.log("OLA: Beyond the surface.");