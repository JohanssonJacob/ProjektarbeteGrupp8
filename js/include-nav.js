document.addEventListener('DOMContentLoaded', async () => {
  const el = document.getElementById('navbar-container');
  if (!el) return;

  // Hitta projektroten utifrån var skriptet ligger (t.ex. /ProjektarbeteGrupp8/js/)
  const script = document.currentScript || document.querySelector('script[src*="include-nav"]');
  const scriptDir = new URL('.', script.src);      // .../js/
  const projectRoot = new URL('..', scriptDir);    // .../

  // Bygg url till nav.html relativt till projektroten
  const navURL = new URL('nav.html', projectRoot).pathname;

  let html = null;
  try {
    const res = await fetch(navURL, { cache: 'no-store' });
    if (res.ok) html = await res.text();
  } catch {}

  if (!html) {
    console.error('Hittar inte', navURL);
    return;
  }

  el.innerHTML = html;

  // Markera aktiv länk
  const curPath = new URL(location.href).pathname.replace(/\/+$/, '') || '/index.html';
  el.querySelectorAll('.navbar a').forEach(a => {
    const p = new URL(a.getAttribute('href'), location.origin).pathname.replace(/\/+$/, '') || '/index.html';
    if (p === curPath) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }
  });
});
