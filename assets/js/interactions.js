// Values observed in the supplied Dali reference: fadeIn and transition variants,
// and the exact tsParticles options used by its home page.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const baseRender = render;
let particleContainer;
let particleGeneration = 0;
let controller;
let navigationGeneration = 0;

const referenceParticles = {
  fullScreen: { enable: false }, background: { color: { value: '' } }, fpsLimit: 120,
  interactivity: { detectsOn: 'window',
    events: { onClick: { enable: false, mode: 'push' }, onHover: { enable: true, mode: 'repulse' }, resize: true },
    modes: { push: { quantity: 90 }, repulse: { distance: 200, duration: .4 } }
  },
  particles: {
    color: { value: '#e68e2e' },
    links: { color: '#f5d393', distance: 150, enable: true, opacity: .5, width: 1 },
    collisions: { enable: true },
    move: { direction: 'none', enable: true, outModes: { default: 'bounce' }, random: false, speed: 1, straight: false },
    number: { density: { enable: true, area: 800 }, value: 80 },
    opacity: { value: .5 }, shape: { type: 'circle' }, size: { value: { min: 1, max: 5 } }
  }, detectRetina: true
};

particles = function () {
  const generation = ++particleGeneration;
  const options = structuredClone(referenceParticles);
  if (motionPreference.matches) {
    options.particles.move.enable = false;
    options.interactivity.events.onHover.enable = false;
  }
  tsParticles.load('particles', options).then(container => {
    if (generation !== particleGeneration) { container?.destroy(); return; }
    particleContainer = container;
  }).catch(error => console.error('Particle background could not start', error));
};

function fade(element, direction, delay, duration = 1400) {
  if (!element || motionPreference.matches) return;
  const x = direction === 'left' ? 80 : direction === 'right' ? -80 : 0;
  const y = direction === 'up' ? 80 : direction === 'down' ? -80 : 0;
  element.animate([{ opacity: 0, transform: `translate(${x}px,${y}px)` }, { opacity: 1, transform: 'translate(0,0)' }], {
    duration, delay, easing: 'cubic-bezier(.25,.25,.25,.75)', fill: 'backwards'
  });
}

render = function(page) {
  controller?.abort();
  controller = new AbortController();
  ++particleGeneration;
  particleContainer?.destroy();
  particleContainer = null;
  baseRender(page);
  const main = document.querySelector('#main');
  if (page === 'home') {
    fade(main.querySelector('h1'), 'down', 200);
    fade(main.querySelector('.home-copy>p'), 'down', 300);
    fade(main.querySelector('.project-circle'), 'down', 400);
    fade(main.querySelector('.avatar'), 'up', 500, 1000);
  } else if (page === 'about') {
    fade(main.querySelector('.about-copy'), 'right', 200);
    fade(main.querySelector('.about-details'), 'left', 400);
  } else {
    fade(main.querySelector('h2'), 'down', 200);
    fade(main.querySelector('.page-copy>p,.contact>p'), 'down', 300);
    fade(main.querySelector('.work-area,.services-grid,.timeline,form'), 'left', 400);
  }
  if (page === 'work') {
    const grid = main.querySelector('.project-grid');
    const prev = main.querySelector('[aria-label="Previous projects"]');
    const next = main.querySelector('[aria-label="Next projects"]');
    const dots = document.createElement('div'); dots.className = 'gallery-dots';
    dots.setAttribute('role', 'group'); dots.setAttribute('aria-label', 'Project pages');
    const signal = controller.signal;
    const listen = (target, event, callback) => target.addEventListener(event, callback, { signal });
    const count = Math.ceil(grid.children.length / 4);
    const currentPosition = () => Number(main.querySelector('#work-position').textContent.split('/')[0]) - 1;
    function update() {
      [...dots.children].forEach((dot, index) => dot.setAttribute('aria-pressed', String(index === currentPosition())));
      fade(grid, 'left', 0, 450);
    }
    for (let index = 0; index < count; index++) {
      const dot = document.createElement('button'); dot.type = 'button'; dot.setAttribute('aria-label', `Project page ${index + 1}`);
      listen(dot, 'click', () => { let attempts = count; while (currentPosition() !== index && attempts-- > 0) next.click(); }); dots.append(dot);
    }
    main.querySelector('.pager').after(dots);
    listen(prev, 'click', update); listen(next, 'click', update); update();
    grid.tabIndex = 0; grid.setAttribute('aria-label', 'Projects. Left and right arrows change pages.');
    listen(grid, 'keydown', event => {
      if (event.target === grid && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault(); (event.key === 'ArrowRight' ? next : prev).click();
      }
    });
    let touch;
    listen(grid, 'pointerdown', event => { if (event.pointerType === 'touch') touch = [event.clientX, event.clientY]; });
    listen(grid, 'pointerup', event => {
      if (!touch) return;
      const dx = event.clientX - touch[0], dy = event.clientY - touch[1]; touch = null;
      if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? next : prev).click();
    });
    listen(grid, 'pointercancel', () => { touch = null; });
  }
};

function createCurtain() {
  const curtain = document.createElement('div'); curtain.className = 'reference-transition'; curtain.setAttribute('aria-hidden', 'true');
  for (let index = 0; index < 3; index++) curtain.append(document.createElement('span'));
  document.body.append(curtain);
  return curtain;
}

async function navigateReference(page, href, push = true) {
  const generation = ++navigationGeneration;
  document.querySelectorAll('.reference-transition').forEach(element => element.remove());
  if (push) history.pushState({}, '', href);
  if (motionPreference.matches) { render(page); return; }
  const curtain = createCurtain();
  const bars = [...curtain.children];
  // The reference sweeps horizontally with three purple layers, not vertical bars.
  await Promise.all(bars.map((bar, index) => bar.animate([
    { transform: 'translateX(-100%)' }, { transform: 'translateX(0)' }
  ], { duration: 600, delay: (index + 1) * 200, easing: 'ease-in-out', fill: 'forwards' }).finished.catch(() => {})));
  if (generation !== navigationGeneration) { curtain.remove(); return; }
  render(page);
  const main = document.querySelector('#main'); main.tabIndex = -1; main.focus({ preventScroll: true });
  await Promise.all(bars.map((bar, index) => bar.animate([
    { transform: 'translateX(0)' }, { transform: 'translateX(100%)' }
  ], { duration: 600, delay: (index + 1) * 200, easing: 'ease-in-out', fill: 'forwards' }).finished.catch(() => {})));
  curtain.remove();
}

document.addEventListener('click', event => {
  const link = event.target.closest('a[data-page]');
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault(); event.stopImmediatePropagation();
  if (link.dataset.page !== document.body.dataset.page) navigateReference(link.dataset.page, link.getAttribute('href'));
}, true);
window.addEventListener('popstate', event => {
  event.stopImmediatePropagation(); navigateReference(current(), location.pathname, false);
}, true);
motionPreference.addEventListener('change', () => render(current()));
render(current());

// Match the reference's initial layered reveal as well as page changes.
if (!motionPreference.matches) {
  const curtain = createCurtain();
  Promise.all([...curtain.children].map((bar, index) => bar.animate([
    { transform: 'translateX(0)' }, { transform: 'translateX(100%)' }
  ], { duration: 600, delay: (index + 1) * 200, easing: 'ease-in-out', fill: 'both' }).finished.catch(() => {}))).then(() => curtain.remove());
}
