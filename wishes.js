/* ============================================
   WISHES.JS — Family Flipbook Engine
   6 members, each on a right-hand page (front face)
   ============================================ */

(function () {
  'use strict';

  /* --------------------------------------------------
     1. FAMILY MEMBER DATA
        Customise names, relations, wishes & image URLs
     -------------------------------------------------- */
  const MEMBERS = [
    {
      name: 'Kushagra',
      
      wish: `Happy Birthday Love ❤️<br/>

Every day with you feels softer, brighter, and more beautiful.

No matter how many birthdays come and go, I promise to keep loving you a little more every single day.

<br/>Happy Birthday to the most wonderful woman, my best friend, and forever favorite person. ✨🌸
`,
      floral: '🌹',
      img: 'images/image13.png', // set to image path if available
    },
    {
      name: 'Sarla',
      
      wish: `जन्मदिन मुबारक हो, प्यारी बेटी ❤️<br/>

भगवान तुम्हें हमेशा खुशियाँ, अच्छा स्वास्थ्य, शांति और ढेर सारी मुस्कानें दें। <br/>तुमने हमारे परिवार में बहुत प्यार और खुशियाँ लाई हैं, और मैं प्रार्थना करती हूँ कि तुम्हारा जीवन हमेशा प्रेम और समृद्धि से भरा रहे।

<br/>हमेशा खुश रहो। 🌸✨
`,
      floral: '🌼',
      img: 'images/image14.png',
    },
    {
      name: 'Ashish',
      
      wish: `Happy Birthday beta 🎂✨<br/>
Hamesha khush raho, muskurati raho aur apni life me bahut tarakki karo ❤️<br/>
Bhagwan tumhe lambi umar, achi sehat aur har khushi de 🌸<br/>
Tumne hamare ghar ko pyar aur khushiyon se bhar diya hai 😊<br/>
Stay blessed always 💖
`,
      floral: '🌺',
      img: 'images/image15.png',
    },
    {
      name: 'Shilpi',
      
      wish: `Happy Birthday Bachcha ❤️😘<br/>
Tum hamesha khush raho, haste raho aur har sapna tumhara poora ho ✨<br/>
Bhagwan tumhe hamesha achhi health, sukoon aur bahut saari khushiyan de 🎂💖<br/>
Tum dono khoob pyaar se raho, khoob khaao, piyo, mast raho!<br/>😘😘
Jaldi jaldi Pilibhit aane ka plan karo!<br/>
Stay blessed beta 🤗
`,
      floral: '🌷',
      img: 'images/image16.png',
    },
    {
      name: 'Prakhar',
      
      wish: `Happy Birthday Bhabhi 🎂✨<br/>
You are truly one of the sweetest and most caring people in our family ❤️<br/>
Thank you for always bringing warmth, laughter, and happiness wherever you go 😊<br/>
May your life always be filled with love, success, beautiful moments, and endless smiles 🌸<br/>
Stay happy and keep shining always 💖
`,
      floral: '🌸',
      img: 'images/image18.png',
    },
    {
      name: 'Vrinda',
      
      wish: `Happyyyyyy Birthdayyyyyyy Bhabhiiiii 💖✨<br/>
In you, I found not just an elder sister, but also a true friend 🤗🌸<br/>
Life feels warmer and happier with you around 😊<br/>
May your days always be filled with love, laughter, success, and endless happiness 🎂✨<br/>
Stay beautiful! 💕
`,
      floral: '🌻',
      img: 'images/image19.png',},

       {name: 'Cheeku',
      
      wish: `Bhow bhowww 🐶🎂.........<br/> <br/>
      (Happy Birthday hooman 🐾🎂💖
Thank you for giving me cuddles, treats, belly rubs, and sooo much love 🐶✨
You are my favorite human in the whole world 🌸)`,
      floral: '🌻',
      img: 'images/image17.png',
    },
  ];

  /* --------------------------------------------------
     2. BUILD FLIPBOOK HTML
        Structure:
          Cover (dark) → 6 inner pages (one per member)
          → Back Cover (dark)

        Each "leaf" has a front face (right page, member)
        and a back face (left page, blank/lined paper).
        
        Pages stack so the right side always shows the
        current member's wish when that leaf is open.
     -------------------------------------------------- */

  function buildFlipbook() {
    const flipbook = document.getElementById('flipbook');
    if (!flipbook) return;

    /* Clear existing placeholder pages (keep cover shells) */
    flipbook.innerHTML = '';

    /* --- Cover --- */
    flipbook.appendChild(createCoverPage());

    /* --- Inner leaves: one per member --- */
    MEMBERS.forEach((member, i) => {
      flipbook.appendChild(createMemberPage(member, i));
    });

    /* --- Back Cover --- */
    flipbook.appendChild(createBackCoverPage());

    /* Update total indicator */
    const totalEl = document.querySelector('.flip-total');
    if (totalEl) totalEl.textContent = MEMBERS.length + 2; // cover + members + back cover
  }

  function createCoverPage() {
    const page = el('div', 'page page-cover');
    page.id = 'page-cover';
    page.innerHTML = `
      <div class="page-face page-front cover-front">
        <div class="cover-inner">
          <div class="cover-ornament top-left">❦</div>
          <div class="cover-ornament top-right">❦</div>
          <div class="cover-blossom-ring">🌸</div>
          <h2 class="cover-title">With Love</h2>
          <p class="cover-sub">from your family</p>
          <div class="cover-date">A Special Birthday</div>
          <div class="cover-ornament bottom-left">❦</div>
          <div class="cover-ornament bottom-right">❦</div>
          ${corners()}
        </div>
      </div>
      <div class="page-face page-back lined-back">
        ${linedPaper()}
      </div>`;
    return page;
  }

  function createMemberPage(member, index) {
    const page = el('div', 'page');
    page.id = `page-member-${index}`;
    page.dataset.index = index;

    const imgTag = member.img
      ? `<img src="${member.img}" alt="${member.name}" class="member-img" />`
      : `<div class="img-placeholder">${member.floral}</div>`;

    page.innerHTML = `
      <!-- Front face: member wish (right side when open) -->
      <div class="page-face page-front">
        <div class="page-content" data-member="${index}">
          <div class="page-sparkles" id="sparkle-${index}"></div>
          <div class="member-image-wrap">
            <div class="member-image-ring">
              ${imgTag}
            </div>
            <div class="img-glow-ring"></div>
          </div>
          <h3 class="member-name">${member.name}</h3>
          
          <p class="member-wish">${member.wish}</p>
          <div class="page-floral" aria-hidden="true">${member.floral}</div>
          ${corners()}
        </div>
      </div>
      <!-- Back face: lined paper (left side after flipped) -->
      <div class="page-face page-back lined-back">
        ${linedPaper()}
      </div>`;

    return page;
  }

  function createBackCoverPage() {
    const page = el('div', 'page page-back-cover');
    page.id = 'page-back-cover';
    page.innerHTML = `
      <div class="page-face page-front back-cover-face">
        <div class="cover-inner back-cover-inner">
          <div class="cover-ornament top-left">❦</div>
          <div class="cover-ornament top-right">❦</div>
          <div class="back-cover-quote">"Love is not what you say. It is what you do, what you feel, and how you make someone's whole world glow."</div>
          <div class="back-cover-petal">🌸</div>
          <div class="cover-ornament bottom-left">❦</div>
          <div class="cover-ornament bottom-right">❦</div>
          ${corners()}
        </div>
      </div>
      <div class="page-face page-back back-cover-outer"></div>`;
    return page;
  }

  /* Helper: golden corners markup */
  function corners() {
    return `<div class="golden-corner gc-tl"></div>
            <div class="golden-corner gc-tr"></div>
            <div class="golden-corner gc-bl"></div>
            <div class="golden-corner gc-br"></div>`;
  }

  /* Helper: lined paper for back faces */
  function linedPaper() {
    return `<div class="lined-paper-inner">
              <div class="lined-paper-margin"></div>
            </div>`;
  }

  /* Helper: create element with class */
  function el(tag, cls) {
    const e = document.createElement(tag);
    e.className = cls;
    return e;
  }

  /* --------------------------------------------------
     3. FLIPBOOK STATE & NAVIGATION
     -------------------------------------------------- */

  const state = {
    currentIndex: 0, // 0 = cover visible, N = Nth page flipped
    totalLeaves: 0,  // set after build
    isAnimating: false,
    soundEnabled: true,
  };

  /* Page labels for indicator */
  function pageLabel(index) {
    if (index === 0) return 'Cover';
    if (index <= MEMBERS.length) return `Wish ${index} / ${MEMBERS.length}`;
    return 'Closing';
  }

  function getAllLeaves() {
    return Array.from(document.querySelectorAll('#flipbook .page'));
  }

  function updateZIndices(leaves) {
    /* Unflipped pages stack front-to-back (higher z = on top) */
    leaves.forEach((leaf, i) => {
      const flipped = leaf.classList.contains('flipped');
      if (!flipped) {
        // unflipped: earlier pages on top
        leaf.style.zIndex = leaves.length - i;
      } else {
        // flipped: later-flipped pages on top (they moved to left)
        leaf.style.zIndex = i + 1;
      }
    });
  }

  function goToPage(targetIndex) {
    if (state.isAnimating) return;
    const leaves = getAllLeaves();
    if (targetIndex < 0 || targetIndex > leaves.length) return;
    if (targetIndex === state.currentIndex) return;

    state.isAnimating = true;
    const direction = targetIndex > state.currentIndex ? 'forward' : 'backward';

    /* Play page-turn sound */
    if (state.soundEnabled) playPageSound();

    /* Flip or unflip the appropriate leaves */
    if (direction === 'forward') {
      /* Flip leaf at currentIndex */
      const leafToFlip = leaves[state.currentIndex];
      if (leafToFlip) leafToFlip.classList.add('flipped');
      state.currentIndex++;

      /* If jumping multiple pages (shouldn't happen with buttons, but safety) */
      while (state.currentIndex < targetIndex) {
        const l = leaves[state.currentIndex];
        if (l) l.classList.add('flipped');
        state.currentIndex++;
      }
    } else {
      /* Un-flip leaf at currentIndex - 1 */
      state.currentIndex--;
      const leafToUnflip = leaves[state.currentIndex];
      if (leafToUnflip) leafToUnflip.classList.remove('flipped');

      while (state.currentIndex > targetIndex) {
        state.currentIndex--;
        const l = leaves[state.currentIndex];
        if (l) l.classList.remove('flipped');
      }
    }

    updateZIndices(leaves);
    updateControls(leaves);
    triggerSparkles();

    setTimeout(() => {
      state.isAnimating = false;
    }, 950);
  }

  function updateControls(leaves) {
    const prevBtn = document.getElementById('flip-prev');
    const nextBtn = document.getElementById('flip-next');
    const indicator = document.getElementById('current-page-num');

    if (prevBtn) prevBtn.disabled = state.currentIndex === 0;
    if (nextBtn) nextBtn.disabled = state.currentIndex >= leaves.length;
    if (indicator) indicator.textContent = pageLabel(state.currentIndex);
  }

  /* --------------------------------------------------
     4. SPARKLES
     -------------------------------------------------- */

  function triggerSparkles() {
    const sparkleContainers = document.querySelectorAll('.page-sparkles');
    sparkleContainers.forEach(container => {
      container.innerHTML = '';
      const count = 12;
      for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        dot.className = 'sparkle-dot';
        const size = Math.random() * 5 + 3;
        dot.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          top: ${Math.random() * 90}%;
          left: ${Math.random() * 90}%;
          --dur: ${Math.random() * 2 + 1.5}s;
          --dly: ${Math.random() * 1}s;
        `;
        container.appendChild(dot);
      }
      /* Remove sparkles after animation */
      setTimeout(() => { container.innerHTML = ''; }, 4000);
    });
  }

  /* --------------------------------------------------
     5. PAGE-TURN SOUND (Web Audio API)
     -------------------------------------------------- */

  let audioCtx = null;

  function getAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playPageSound() {
    try {
      const ctx = getAudioCtx();
      const duration = 0.18;

      /* White noise burst */
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      /* Bandpass filter to sound like paper */
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2200;
      filter.Q.value = 0.6;

      /* Gain envelope */
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start();
      source.stop(ctx.currentTime + duration);
    } catch (e) {
      /* Silently fail if audio not available */
    }
  }

  /* --------------------------------------------------
     6. BACKGROUND CANVAS — fireflies & particles
     -------------------------------------------------- */

  function initBgCanvas() {
    const canvas = document.getElementById('wishes-bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    /* Firefly particles */
    const fireflies = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random(),
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      alphaSpeed: Math.random() * 0.008 + 0.003,
      hue: Math.random() > 0.5 ? 45 : 340, // gold or pink
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fireflies.forEach(f => {
        f.x += f.vx;
        f.y += f.vy;
        f.alpha += f.alphaDir * f.alphaSpeed;
        if (f.alpha >= 1 || f.alpha <= 0) {
          f.alphaDir *= -1;
          f.alpha = Math.max(0, Math.min(1, f.alpha));
        }
        if (f.x < 0) f.x = canvas.width;
        if (f.x > canvas.width) f.x = 0;
        if (f.y < 0) f.y = canvas.height;
        if (f.y > canvas.height) f.y = 0;

        const grd = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 4);
        grd.addColorStop(0, `hsla(${f.hue}, 80%, 70%, ${f.alpha})`);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * 4, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* --------------------------------------------------
     7. TOUCH / SWIPE SUPPORT
     -------------------------------------------------- */

  function initSwipe() {
    const flipbook = document.getElementById('flipbook');
    if (!flipbook) return;

    let startX = 0;
    let startY = 0;

    flipbook.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    flipbook.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx < 0) {
          goToPage(state.currentIndex + 1); // swipe left → next
        } else {
          goToPage(state.currentIndex - 1); // swipe right → prev
        }
      }
    }, { passive: true });

    /* Click on flipbook also advances */
    flipbook.addEventListener('click', e => {
      const rect = flipbook.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      if (clickX > rect.width / 2) {
        goToPage(state.currentIndex + 1);
      } else {
        goToPage(state.currentIndex - 1);
      }
    });
  }

  /* --------------------------------------------------
     8. KEYBOARD NAVIGATION
     -------------------------------------------------- */

  function initKeyboard() {
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToPage(state.currentIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPage(state.currentIndex - 1);
      }
    });
  }

  /* --------------------------------------------------
     9. BUTTON CONTROLS
     -------------------------------------------------- */

  function initButtons() {
    const prevBtn = document.getElementById('flip-prev');
    const nextBtn = document.getElementById('flip-next');
    const soundBtn = document.getElementById('page-sound-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', e => {
        e.stopPropagation(); // prevent flipbook click handler
        goToPage(state.currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', e => {
        e.stopPropagation();
        goToPage(state.currentIndex + 1);
      });
    }

    if (soundBtn) {
      soundBtn.addEventListener('click', e => {
        e.stopPropagation();
        state.soundEnabled = !state.soundEnabled;
        soundBtn.innerHTML = state.soundEnabled
          ? '<span>📄</span> Page Sound'
          : '<span>🔇</span> Sound Off';
        soundBtn.style.opacity = state.soundEnabled ? '1' : '0.4';
      });
    }
  }

  /* --------------------------------------------------
     10. CSS ADDITIONS — lined paper back, z-indices
     -------------------------------------------------- */

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Lined paper back face */
      .lined-back {
        background:
          repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 27px,
            rgba(180,140,100,0.18) 28px,
            transparent 29px
          ),
          linear-gradient(160deg, #f7f0e6 0%, #ede5d5 100%);
        display: flex;
        align-items: stretch;
      }
      .lined-paper-inner {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
      }
      .lined-paper-margin {
        width: 32px;
        height: 100%;
        background: rgba(201,100,100,0.12);
        border-right: 1px solid rgba(201,100,100,0.3);
        flex-shrink: 0;
      }

      /* Back cover outer is just dark */
      .back-cover-outer {
        background: linear-gradient(145deg, #1a0e06 0%, #0a0805 100%);
      }

      /* Smooth perspective on wrapper */
      .flipbook-wrapper {
        perspective: 2000px;
      }
    `;
    document.head.appendChild(style);
  }

  /* --------------------------------------------------
     11. ENTRANCE ANIMATION
     -------------------------------------------------- */

  function initEntranceAnimation() {
    /* Stagger fade-in for hero and flipbook */
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.8s ease ${i * 0.2 + 0.3}s, transform 0.8s ease ${i * 0.2 + 0.3}s`;
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  }

  /* --------------------------------------------------
     12. INIT
     -------------------------------------------------- */

  function init() {
    injectStyles();
    buildFlipbook();

    const leaves = getAllLeaves();
    state.totalLeaves = leaves.length;

    /* Set initial z-indices */
    updateZIndices(leaves);
    updateControls(leaves);

    /* Interactions */
    initButtons();
    initSwipe();
    initKeyboard();

    /* Visuals */
    initBgCanvas();
    initEntranceAnimation();

    /* Trigger an initial sparkle burst on load */
    setTimeout(triggerSparkles, 1200);
  }

  /* Wait for DOM */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();