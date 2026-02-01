const initialMinMs = 0;
const initialMaxMs = 1000;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function showLoader() {
  const el = document.getElementById('loader');
  if (!el) return;
  el.classList.remove('is-hidden');
}

function hideLoader() {
  const el = document.getElementById('loader');
  if (!el) return;
  el.classList.add('is-hidden');
}

async function withLoaderDelay(minMs, maxMs, fn) {
  showLoader();
  const delay = randInt(minMs, maxMs);
  await sleep(delay);
  await fn();
}

function setupPlayNow() {
  const a = document.getElementById('playNow');
  if (!a) return;

  a.addEventListener('click', async (e) => {
    e.preventDefault();

    const href = a.getAttribute('href') || 'https://redjgames.base44.app/Games';
    const max = Number(a.dataset.delayMaxMs || 2000);

    await withLoaderDelay(0, Math.max(0, max), async () => {
      window.location.href = href;
    });
  });
}

function setupParticles() {
  const canvas = document.getElementById('particles');
  if (!(canvas instanceof HTMLCanvasElement)) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  let w = 0;
  let h = 0;

  const count = 35;
  const particles = Array.from({ length: count }).map(() => ({
    x: Math.random(),
    y: Math.random(),
    r: 0,
    a: 0,
    vx: 0,
    vy: 0,
  }));

  function reset(p, randomY = true) {
    p.x = Math.random();
    p.y = randomY ? Math.random() : 1.05;
    p.r = randInt(1, 2) + Math.random();
    p.a = 0.25 + Math.random() * 0.45;
    p.vx = (Math.random() - 0.5) * 0.00012;
    p.vy = -(0.00012 + Math.random() * 0.00025);
  }

  for (const p of particles) reset(p);

  function resize() {
    w = Math.floor(window.innerWidth);
    h = Math.floor(window.innerHeight);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw(time) {
    ctx.clearRect(0, 0, w, h);

    const t = time * 0.00006;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      const drift = Math.sin((p.y * 8 + t) * Math.PI * 2) * 0.00015;
      p.x += drift;

      if (p.y < -0.05 || p.x < -0.05 || p.x > 1.05) reset(p, false);

      const x = p.x * w;
      const y = p.y * h;

      const g = ctx.createRadialGradient(x, y, 0, x, y, p.r * 10);
      g.addColorStop(0, `rgba(255,69,0,${p.a})`);
      g.addColorStop(1, 'rgba(255,69,0,0)');

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, p.r * 10, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
}

(async function main() {
  setupParticles();
  setupPlayNow();

  await sleep(randInt(initialMinMs, initialMaxMs));
  hideLoader();
})();
