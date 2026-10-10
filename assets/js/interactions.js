// Page-specific listeners are aborted on navigation to avoid accumulating handlers.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const baseRender = render;
let pageController;
let stopParticles = () => {};
let transitionId = 0;

render = function (page) {
  pageController?.abort();
  stopParticles();
  pageController = new AbortController();
  baseRender(page);
  const main = document.querySelector('#main');
  const listen = (target, event, callback) => target.addEventListener(event, callback, { signal: pageController.signal });
  if (!motionPreference.matches) {
    main.querySelectorAll('h1,h2,.home-copy>p,.project-circle,.avatar,.about-copy>p,.about-details,.services-grid article,.timeline article,.contact form').forEach((element, index) => {
      element.animate([{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'translateY(0)' }], {
        duration: 650, delay: Math.min(index * 75, 400), easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards'
      });
    });
  }
  if (page === 'home' && !motionPreference.matches && matchMedia('(pointer:fine)').matches) {
    const scene = main.querySelector('.home');
    const portrait = main.querySelector('.avatar');
    const background = main.querySelector('.explosion');
    listen(scene, 'pointermove', event => {
      const rect = scene.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      portrait.style.translate = `${x * 20}px ${y * 12}px`;
      background.style.translate = `${-x * 8}px ${-y * 6}px`;
    });
    listen(scene, 'pointerleave', () => { portrait.style.translate = background.style.translate = '0px 0px'; });
    const circle = main.querySelector('.project-circle');
    listen(circle, 'pointermove', event => {
      const rect = circle.getBoundingClientRect();
      circle.style.translate = `${(event.clientX - rect.left - rect.width / 2) * .12}px ${(event.clientY - rect.top - rect.height / 2) * .12}px`;
    });
    listen(circle, 'pointerleave', () => { circle.style.translate = '0px 0px'; });
  }
  if (page === 'work') enhanceGallery(main, listen);
  if (page === 'about') {
    main.querySelectorAll('[role=tab]').forEach(tab => listen(tab, 'click', () => {
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (!motionPreference.matches) panel.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 350 });
    }));
  }
};

// Capture internal navigation before the original router, then reveal the new page.
document.addEventListener('click', async event => {
  const link = event.target.closest('a[data-page]');
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  if (link.dataset.page === document.body.dataset.page) return;
  history.pushState({}, '', link.getAttribute('href'));
  const id = ++transitionId;
  if (motionPreference.matches) { render(link.dataset.page); return; }
  const overlay = document.createElement('div');
  overlay.className = 'page-transition';
  overlay.setAttribute('aria-hidden', 'true');
  for (let index = 0; index < 3; index++) overlay.append(document.createElement('span'));
  document.body.append(overlay);
  const bars = [...overlay.children];
  await Promise.all(bars.map((bar, index) => bar.animate([{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }], { duration: 280, delay: index * 45, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' }).finished));
  if (id === transitionId) {
    render(link.dataset.page);
    const main = document.querySelector('#main'); main.tabIndex = -1; main.focus({ preventScroll: true });
  }
  await Promise.all(bars.map((bar, index) => bar.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }], { duration: 340, delay: index * 45, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' }).finished));
  overlay.remove();
}, true);
window.addEventListener('popstate', () => { transitionId++; });
motionPreference.addEventListener('change', () => render(current()));

function enhanceGallery(main, listen) {
  const grid = main.querySelector('.project-grid');
  const cards = [...grid.querySelectorAll('.project')];
  const previous = main.querySelector('[aria-label="Previous projects"]');
  const next = main.querySelector('[aria-label="Next projects"]');
  const total = Math.ceil(cards.length / 4);
  const dots = document.createElement('div'); dots.className = 'gallery-dots';
  dots.setAttribute('role', 'group'); dots.setAttribute('aria-label', 'Project pages');
  function position() { return Number(main.querySelector('#work-position').textContent.split('/')[0]) - 1; }
  function animate() {
    [...dots.children].forEach((dot, index) => dot.setAttribute('aria-pressed', String(index === position())));
    cards.filter(card => !card.hidden).forEach((card, index) => {
      if (!motionPreference.matches) card.animate([{ opacity: 0, transform: 'translateX(25px)' }, { opacity: 1, transform: 'translateX(0)' }], { duration: 400, delay: index * 65, fill: 'backwards' });
    });
  }
  for (let index = 0; index < total; index++) {
    const dot = document.createElement('button'); dot.type = 'button'; dot.setAttribute('aria-label', `Project page ${index + 1}`);
    listen(dot, 'click', () => { if (position() !== index) next.click(); }); dots.append(dot);
  }
  main.querySelector('.pager').after(dots);
  listen(previous, 'click', animate); listen(next, 'click', animate);
  grid.tabIndex = 0; grid.setAttribute('aria-label', 'Projects. Use left and right arrow keys to change pages.');
  listen(grid, 'keydown', event => {
    if (event.target !== grid || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault(); (event.key === 'ArrowRight' ? next : previous).click();
  });
  let touch;
  listen(grid, 'pointerdown', event => { if (event.pointerType === 'touch') touch = { x: event.clientX, y: event.clientY }; });
  listen(grid, 'pointerup', event => {
    if (!touch) return;
    const dx = event.clientX - touch.x, dy = event.clientY - touch.y; touch = null;
    if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? next : previous).click();
  });
  listen(grid, 'pointercancel', () => { touch = null; });
  cards.forEach((card, index) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'details-toggle'; button.textContent = '+';
    button.setAttribute('aria-label', 'Details: ' + card.querySelector('h3').textContent); button.setAttribute('aria-expanded', 'false');
    const details = card.querySelector('.project-body'); details.id = `project-details-${index}`; button.setAttribute('aria-controls', details.id); card.append(button);
    listen(button, 'click', () => {
      const open = card.classList.toggle('details-open'); button.setAttribute('aria-expanded', String(open)); button.textContent = open ? '−' : '+';
    });
    listen(card, 'keydown', event => { if (event.key === 'Escape') { card.classList.remove('details-open'); button.setAttribute('aria-expanded', 'false'); button.textContent = '+'; button.focus(); } });
    if (!motionPreference.matches && matchMedia('(pointer:fine)').matches) {
      listen(card, 'pointermove', event => {
        const rect = card.getBoundingClientRect();
        card.style.transform = `perspective(900px) rotateX(${-(event.clientY - rect.top - rect.height / 2) / rect.height * 5}deg) rotateY(${(event.clientX - rect.left - rect.width / 2) / rect.width * 5}deg)`;
      });
      listen(card, 'pointerleave', () => { card.style.transform = ''; });
    }
  });
  animate();
}

particles = function () {
  const canvas = document.querySelector('#particles'), context = canvas.getContext('2d');
  let width, height, nodes = [], animation, running = false;
  const pointer = { x: -1000, y: -1000 };
  function draw() {
    context.clearRect(0, 0, width, height);
    nodes.forEach((node, index) => {
      if (!motionPreference.matches) {
        const dx = node.x - pointer.x, dy = node.y - pointer.y, distance = Math.hypot(dx, dy);
        if (distance > 0 && distance < 100) { node.x += dx / distance * (1 - distance / 100) * 1.5; node.y += dy / distance * (1 - distance / 100) * 1.5; }
        node.x += node.vx; node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x)); node.y = Math.max(0, Math.min(height, node.y));
      }
      context.beginPath(); context.arc(node.x, node.y, node.radius, 0, Math.PI * 2); context.fillStyle = '#c28a42aa'; context.fill();
      for (let next = index + 1; next < nodes.length; next++) {
        const other = nodes[next], distance = Math.hypot(node.x - other.x, node.y - other.y);
        if (distance < 145) { context.beginPath(); context.moveTo(node.x, node.y); context.lineTo(other.x, other.y); context.strokeStyle = `rgba(180,175,205,${(1 - distance / 145) * .3})`; context.lineWidth = .7; context.stroke(); }
      }
      const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
      if (distance < 160 && !motionPreference.matches) { context.beginPath(); context.moveTo(node.x, node.y); context.lineTo(pointer.x, pointer.y); context.strokeStyle = `rgba(241,48,36,${(1 - distance / 160) * .5})`; context.stroke(); }
    });
  }
  function resize() {
    width = canvas.clientWidth; height = canvas.clientHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2); canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio); context.setTransform(ratio, 0, 0, ratio, 0, 0);
    nodes = Array.from({ length: width < 700 ? 48 : 95 }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - .5) * .45, vy: (Math.random() - .5) * .45, radius: Math.random() * 3 + 1 }));
    if (motionPreference.matches) draw();
  }
  function tick() { if (!running) return; draw(); animation = requestAnimationFrame(tick); }
  function visibility() { running = !document.hidden && !motionPreference.matches; cancelAnimationFrame(animation); if (running) tick(); }
  const signal = pageController.signal;
  window.addEventListener('resize', resize, { signal }); document.addEventListener('visibilitychange', visibility, { signal });
  canvas.parentElement.addEventListener('pointermove', event => { const rect = canvas.getBoundingClientRect(); pointer.x = event.clientX - rect.left; pointer.y = event.clientY - rect.top; }, { signal });
  canvas.parentElement.addEventListener('pointerleave', () => { pointer.x = pointer.y = -1000; }, { signal });
  resize(); visibility();
  stopParticles = () => { running = false; cancelAnimationFrame(animation); };
};

render(current());
