const miniCard = document.getElementById('miniCard');
const hero = document.querySelector('.hero');
const stack = document.getElementById('stack');

// ── Card stack dealing + navigation ──

if (stack) {
  const wrappers = Array.from(stack.querySelectorAll('.card-wrapper'));
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  function fanAll() { stack.classList.add('fanned'); }
  function restack() { stack.classList.remove('fanned'); }

  // Auto-fan on touch devices (no hover)
  if (isTouch) {
    fanAll();
    document.querySelector('.hero-hint')?.remove();
  }

  wrappers.forEach(w => {
    w.addEventListener('click', e => {
      e.stopPropagation();
      const link = w.dataset.link;
      if (link) {
        document.querySelector(link).scrollIntoView({ behavior: 'smooth' });
        restack();
      }
    });
  });

  document.addEventListener('click', e => {
    if (e.target.closest('.mini-card')) return;
    if (!e.target.closest('.hero')) return;
    if (stack.classList.contains('fanned')) {
      if (e.target.closest('.card-wrapper')) return;
      restack();
      return;
    }
    fanAll();
  });
}

// ── Mini card: scroll back to hero + section nav ──

const sectionNav = document.getElementById('sectionNav');

if (miniCard) {
  miniCard.addEventListener('click', () => {
    hero.scrollIntoView({ behavior: 'smooth' });
  });
}

function toggleOnScroll() {
  if (!hero) return;
  const rect = hero.getBoundingClientRect();
  const past = rect.bottom < 0;
  if (miniCard) miniCard.classList.toggle('visible', past);
  if (sectionNav) sectionNav.classList.toggle('visible', past);
}

document.addEventListener('scroll', toggleOnScroll);
toggleOnScroll();

// ── Theme toggle ──

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

if (themeToggle) {
  const saved = localStorage.getItem('theme');
  if (saved) html.setAttribute('data-theme', saved);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// ── Skill stack interaction ──

const skillStack = document.getElementById('skillStack');

if (skillStack) {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  function fanSkill() { skillStack.classList.add('fanned'); }
  function restackSkill() { skillStack.classList.remove('fanned'); }

  if (isTouch) { fanSkill(); }

  skillStack.addEventListener('click', e => {
    if (e.target.closest('.skill-card-wrapper')) {
      e.stopPropagation();
      return;
    }
    if (skillStack.classList.contains('fanned')) {
      restackSkill();
    } else {
      fanSkill();
    }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('#skills')) return;
    if (e.target.closest('.skill-card-wrapper') || e.target.closest('.skill-stack')) return;
    if (skillStack.classList.contains('fanned')) restackSkill();
  });
}
