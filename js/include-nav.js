document.addEventListener('DOMContentLoaded', async () => {
  const el = document.getElementById('navbar-container');
  if (!el) return;

  // Ladda partialen
  const script = document.currentScript || document.querySelector('script[src*="include-nav"]');
  const scriptDir = new URL('.', script.src);
  const projectRoot = new URL('..', scriptDir);
  const navURL = new URL('components/nav.html', projectRoot).pathname;

  try {
    const res = await fetch(navURL, { cache: 'no-store' });
    if (!res.ok) throw new Error('404');
    const html = await res.text();
    el.innerHTML = html;
  } catch {
    console.error('Kunde inte ladda nav:', navURL);
    return;
  }

  // Markera aktiv sida
  const curPath = new URL(location.href).pathname.replace(/\/+$/, '') || '/index.html';
  el.querySelectorAll('nav a[href]').forEach(a => {
    const p = new URL(a.getAttribute('href'), location.origin).pathname.replace(/\/+$/, '') || '/index.html';
    if (p === curPath) a.classList.add('is-active');
  });

  // Hamburgerfunktion
  const btn = el.querySelector('#hamburger-btn');
  const links = el.querySelector('#mobile-links');
  if (btn && links) {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      links.toggleAttribute('hidden');
    });
  }
});
