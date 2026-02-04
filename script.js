/* Interaction & Particles */
document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. CARD SPOTLIGHT EFFECT --- */
    const cards = document.querySelectorAll('.card');
    document.addEventListener('mousemove', e => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    /* --- 2. BACKGROUND PARTICLE SYSTEM --- */
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    // Config
    const PARTICLE_COUNT = 60; // Not too crowded
    const CONNECTION_DIST = 150;
    const MOUSE_DIST = 250;
    const particles = [];

    // Mouse tracking
    const mouse = { x: null, y: null };
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Resize Handler
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // Slow, floaty movement
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 1.5 + 0.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; // Faint stars
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Init Particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw Vignette / Gradient Background via CSS (it's behind canvas)
        // But we can draw dynamic connections here

        particles.forEach(p => {
            p.update();
            p.draw();

            // Connect to nearby particles
            particles.forEach(other => {
                const dx = p.x - other.x;
                const dy = p.y - other.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DIST) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / CONNECTION_DIST)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            });

            // Interactive: Connect to Mouse
            if (mouse.x != null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_DIST) {
                    // Draw connection line
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 255, 136, ${0.15 * (1 - dist / MOUSE_DIST)})`; // Greenish tint near mouse
                    ctx.lineWidth = 1;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();

                    // Slightly attract particle (optional "magnetic" feel)
                    // p.vx -= dx * 0.0001; 
                    // p.vy -= dy * 0.0001;
                }
            }
        });

        requestAnimationFrame(animate);
    }
    animate();

    console.log('Interactive System Online.');
});
