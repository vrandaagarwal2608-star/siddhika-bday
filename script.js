/* ============================================
   BHABHI BIRTHDAY — SHARED JAVASCRIPT
   Cursor, Petals, Stars, Music, Transitions
   Works across: index, gallery, wishes, surprise
   ============================================ */

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
});

function animateCursorRing() {
  if (cursorRing) {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top = ry + 'px';
  }
  requestAnimationFrame(animateCursorRing);
}
animateCursorRing();

document.querySelectorAll('a, button, [role="button"], [onclick]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) { cursor.style.width = '20px'; cursor.style.height = '20px'; }
    if (cursorRing) { cursorRing.style.width = '54px'; cursorRing.style.height = '54px'; }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) { cursor.style.width = '12px'; cursor.style.height = '12px'; }
    if (cursorRing) { cursorRing.style.width = '36px'; cursorRing.style.height = '36px'; }
  });
});

// ---- STARS ----
function createStars(count = 120) {
  const container = document.querySelector('.stars-layer');
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `
      left: ${Math.random()*100}%;
      top: ${Math.random()*100}%;
      --dur: ${2 + Math.random()*4}s;
      --delay: ${Math.random()*5}s;
      width: ${Math.random() < 0.85 ? 2 : 3}px;
      height: ${Math.random() < 0.85 ? 2 : 3}px;
      opacity: ${0.3 + Math.random()*0.7};
    `;
    container.appendChild(star);
  }
}
createStars();

// ---- CHERRY BLOSSOM PETALS CANVAS ----
(function initPetals() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, petals = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['#f4b8c8','#ffd6e0','#f9cdd7','#ffe4ec','#f0a0b8'];

  function createPetal() {
    return {
      x: Math.random() * W,
      y: -20,
      size: 4 + Math.random() * 8,
      speedX: -0.8 + Math.random() * 1.6,
      speedY: 0.6 + Math.random() * 1.2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (-0.02 + Math.random() * 0.04),
      opacity: 0.4 + Math.random() * 0.6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.01 + Math.random() * 0.02,
    };
  }

  for (let i = 0; i < 60; i++) {
    const p = createPetal();
    p.y = Math.random() * H;
    petals.push(p);
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    petals.forEach((p, i) => {
      p.sway += p.swaySpeed;
      p.x += p.speedX + Math.sin(p.sway) * 0.5;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;
      drawPetal(p);
      if (p.y > H + 20) petals[i] = createPetal();
    });
    if (petals.length < 80 && Math.random() < 0.04) petals.push(createPetal());
    requestAnimationFrame(tick);
  }
  tick();
})();

// ---- MUSIC TOGGLE ----
(function initMusic() {
  const btn = document.getElementById('music-btn');
  if (!btn) return;
  let playing = false;
  const audio = new Audio();
  audio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3';
  audio.loop = true;
  audio.volume = 0.3;

  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      btn.innerHTML = '🎵';
      btn.classList.remove('playing');
      btn.title = 'Play music';
    } else {
      audio.play().catch(() => {});
      btn.innerHTML = '🔊';
      btn.classList.add('playing');
      btn.title = 'Pause music';
    }
    playing = !playing;
  });
})();

// ---- LOADING SCREEN ----
(function initLoading() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;
  setTimeout(() => {
    screen.classList.add('hidden');
    document.body.style.overflow = '';
  }, 3200);
})();

// ---- SCROLL REVEAL ----
(function initReveal() {
  const elements = document.querySelectorAll('.fade-in-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0 0 -60px 0' });
  elements.forEach(el => observer.observe(el));
})();

// ---- PAGE TRANSITION ----
function navigateTo(url) {
  const overlay = document.getElementById('page-overlay');
  if (overlay) {
    overlay.classList.add('active');
    setTimeout(() => { window.location.href = url; }, 600);
  } else {
    window.location.href = url;
  }
}
window.addEventListener('load', () => {
  const overlay = document.getElementById('page-overlay');
  if (overlay) {
    setTimeout(() => overlay.classList.remove('active'), 100);
  }
});

// ---- PARALLAX ON MOUSE (index page) ----
document.addEventListener('mousemove', e => {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 10;
    el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

// ---- 3D CUBE MOUSE INTERACTION (wishes page) ----
(function initCubeInteraction() {
  const cube = document.querySelector('.cube');
  if (!cube) return;
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    cube.style.animationPlayState = 'paused';
    cube.style.transform = `rotateX(${-20 + y}deg) rotateY(${x * 3}deg)`;
    clearTimeout(cube._resumeTimer);
    cube._resumeTimer = setTimeout(() => {
      cube.style.animationPlayState = 'running';
      cube.style.transform = '';
    }, 2000);
  });
})();