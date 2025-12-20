const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(10, 14, 20, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff41';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillStyle = drops[i] * fontSize > canvas.height * 0.9 ? '#00ff41' : '#004d1a';
            ctx.fillText(char, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    let lastTime = 0;
    const targetFPS = 60;
    const interval = 1000 / targetFPS;

    function animate(currentTime) {
        if (currentTime - lastTime >= interval) {
            draw();
            lastTime = currentTime;
        }
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

initMatrix();

const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = document.getElementById('menuIcon');

searchBtn.addEventListener('click', () => {
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
        setTimeout(() => searchInput.focus(), 100);
    }
});

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    if (mobileNav.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

document.querySelectorAll('.post-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.15}s`;
    card.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                });
            }
        });
    }, { threshold: 0.1 });

    observer.observe(card);

    // Check if this is an expandable post
    const isExpandable = card.classList.contains('expandable-post');
    
    if (isExpandable) {
        // Make entire card clickable to open modal
        card.addEventListener('click', function(e) {
            // Don't open if clicking on status dot
            if (e.target.closest('.status-dot')) {
                return;
            }
            
            openPostModal(card);
        });
    }

    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('expanded')) {
            requestAnimationFrame(() => {
                this.style.transform = 'translateX(10px) translateY(-3px)';
            });
        }
    });

    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('expanded')) {
            requestAnimationFrame(() => {
                this.style.transform = 'translateX(0) translateY(0)';
            });
        }
    });
});

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentPage = 1;

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updatePagination();
    }
});

nextBtn.addEventListener('click', () => {
    currentPage++;
    updatePagination();
});

function updatePagination() {
    const activeBtn = document.querySelector('.pagination-btn.active');
    if (activeBtn && !activeBtn.textContent.includes('1') && !activeBtn.textContent.includes('2')) {
        activeBtn.classList.remove('active');
        activeBtn.classList.add('ghost');
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

let lastScroll = 0;
const header = document.querySelector('.header');
if (header) {
    header.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
}

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (header) {
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScroll = currentScroll;
}, { passive: true });

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        document.body.style.opacity = '1';
    }, 100);
});

// Post Modal Functions
const postViewModal = document.getElementById('postViewModal');
const postViewContent = document.getElementById('postViewContent');
const postViewClose = document.getElementById('postViewClose');

function openPostModal(postCard) {
    if (!postViewModal || !postViewContent) return;
    
    const postTitle = postCard.querySelector('.post-title');
    const postDescription = postCard.querySelector('.post-description');
    const postIcon = postCard.querySelector('.post-icon');
    const fullContent = postCard.querySelector('.post-full-content');
    
    if (!postTitle || !postDescription || !postIcon || !fullContent) return;
    
    const articleContent = fullContent.querySelector('.article-content');
    if (!articleContent) return;
    
    // Build modal content
    postViewContent.innerHTML = `
        <div class="post-header">
            <div class="post-icon">${postIcon.innerHTML}</div>
            <h3 class="post-title">${postTitle.textContent}</h3>
        </div>
        <p class="post-description">${postDescription.textContent}</p>
        <div class="article-content">
            ${articleContent.innerHTML}
        </div>
    `;
    
    // Show modal
    postViewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Scroll to top
    setTimeout(() => {
        postViewModal.scrollTop = 0;
    }, 10);
}

function closePostModal() {
    if (!postViewModal) return;
    postViewModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal handlers
if (postViewClose) {
    postViewClose.addEventListener('click', closePostModal);
}

if (postViewModal) {
    postViewModal.addEventListener('click', function(e) {
        if (e.target === postViewModal) {
            closePostModal();
        }
    });
}

// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && postViewModal && postViewModal.classList.contains('active')) {
        closePostModal();
    }
});

console.log('%cInfoSec by Omar Alikhanov', 'color: #00ff41; font-size: 20px; font-weight: bold;');
console.log('%c@omars3c', 'color: #00ff41; font-size: 14px;');

