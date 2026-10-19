(function () {
  var TRIPS = [{"kind": "Campamento", "place": "Costa Brava", "year": "2027", "h1": "Aprende a bucear", "h2a": "en la ", "h2b": "Costa Brava", "meta": "4 días · Desde cero", "img": "ventana.jpg", "cta": "Vente con nosotros", "href": "ViajeCostaBrava.dc.html", "exp": false}, {"kind": "Expedición", "place": "Mar Rojo", "year": "2027", "h1": "Bucea entre arrecifes", "h2a": "en el ", "h2b": "Mar Rojo", "meta": "7 días · Open Water", "img": "snorkel.jpg", "cta": "Quiero seguir explorando", "href": "#viajes", "exp": true}, {"kind": "Campamento", "place": "Mallorca", "year": "2027", "h1": "Tu primer Open Water", "h2a": "en ", "h2b": "Mallorca", "meta": "4 días · Desde cero", "img": "palmeras.jpg", "cta": "Vente con nosotros", "href": "#viajes", "exp": false}, {"kind": "Expedición", "place": "Tenerife", "year": "2027", "h1": "Explora el Atlántico", "h2a": "en ", "h2b": "Tenerife", "meta": "6 días · Open Water", "img": "espuma.jpg", "cta": "Quiero seguir explorando", "href": "#viajes", "exp": true}, {"kind": "Expedición", "place": "Maldivas", "year": "2028", "h1": "Vive a bordo una semana", "h2a": "en ", "h2b": "Maldivas", "meta": "10 días · Avanzado", "img": "cala.jpg", "cta": "Quiero seguir explorando", "href": "#viajes", "exp": true}];
  var ALGO = [{"l1": "GASTRONOMÍA", "l2": "LOCAL", "img": "terraza.jpg", "alt": "Mesa con vistas al mar a la hora de comer"}, {"l1": "DORMIR", "l2": "CERCA DEL MAR", "img": "palmeras.jpg", "alt": "Casa con palmeras junto a la costa"}, {"l1": "GRUPOS", "l2": "PEQUEÑOS", "img": "snorkel.jpg", "alt": "Un grupo pequeño buceando en agua turquesa"}, {"l1": "SALIDAS", "l2": "EN BARCO", "img": "salto.jpg", "alt": "Un salto al agua desde el barco"}, {"l1": "EQUIPO", "l2": "INCLUIDO", "img": "equipo.jpg", "alt": "Equipos de buceo listos en la cubierta"}, {"l1": "VIDA", "l2": "MARINA", "img": "peces.jpg", "alt": "Un banco de peces en azul"}, {"l1": "APRENDER A", "l2": "RESPIRAR", "img": "superficie.jpg", "alt": "Una buceadora asoma en la superficie"}, {"l1": "PUEBLOS", "l2": "DE PESCADORES", "img": "barcas.jpg", "alt": "Barcas de pesca en un puerto"}, {"l1": "ATARDECERES", "l2": "SIN PRISA", "img": "atardecer.jpg", "alt": "Atardecer sobre la costa"}];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var canHover = function () { return window.innerWidth > 760 && (!window.matchMedia || window.matchMedia('(hover: hover)').matches); };

  /* Header: color según lo que tenga debajo */
  var hdr = $('.hdr'), iso = $('.hdr-iso');
  function tone() {
    var r = iso.getBoundingClientRect(), y = Math.round(r.top + r.height / 2);
    var el = document.elementFromPoint(Math.round(window.innerWidth / 2), y);
    var hit = el && el.closest ? el.closest('[data-hdr]') : null;
    hdr.classList.toggle('on-light', !!hit && hit.getAttribute('data-hdr') === 'light');
  }
  window.addEventListener('scroll', tone, { passive: true });
  window.addEventListener('resize', tone);
  tone();

  /* Cursor */
  var cur = $('.cur'), curL = $('.cur-l'), curOwner = null;
  function place(e) { cur.style.transform = 'translate3d(' + e.clientX + 'px,' + e.clientY + 'px,0)'; }
  function showCur(e, label, owner) {
    if (!canHover()) return;
    curL.firstChild.nodeValue = label;
    place(e); cur.classList.add('on');
    if (curOwner && curOwner !== owner) curOwner.classList.remove('is-cur');
    curOwner = owner; owner.classList.add('is-cur');
  }
  function hideCur() { cur.classList.remove('on'); if (curOwner) curOwner.classList.remove('is-cur'); curOwner = null; }

  /* Carrusel */
  var cards = $$('.card'), n = cards.length, active = 0, prev = 0;
  function off(i, c) { var k = ((i - c) % n + n) % n; if (k > n / 2) k -= n; return k; }
  function layout() {
    cards.forEach(function (card, i) {
      var k = off(i, active), pk = off(i, prev);
      var pos = k === 0 ? 'pos0' : (k < 0 ? 'posm' : 'posp') + Math.min(Math.abs(k), 2);
      card.className = 'card hov ' + pos + (Math.abs(k - pk) > 1 ? ' nt' : '');
      var t = TRIPS[i];
      card.setAttribute('aria-label', k === 0 ? t.kind + ' en ' + t.place + ', ' + t.year + '. ' + t.cta : 'Ver ' + t.place);
      card.setAttribute('tabindex', Math.abs(k) <= 1 ? '0' : '-1');
    });
  }
  function go(i) { var nx = ((i % n) + n) % n; if (nx === active) return; prev = active; active = nx; hideCur(); layout(); }
  cards.forEach(function (card, i) {
    card.addEventListener('click', function (e) { if (off(i, active) !== 0) { e.preventDefault(); go(i); } });
    card.addEventListener('mouseenter', function (e) { if (off(i, active) === 0) showCur(e, TRIPS[i].cta, card); });
    card.addEventListener('mousemove', function (e) { if (curOwner === card) place(e); else if (off(i, active) === 0) showCur(e, TRIPS[i].cta, card); });
    card.addEventListener('mouseleave', hideCur);
  });
  $('.arr-prev').addEventListener('click', function () { go(active - 1); });
  $('.arr-next').addEventListener('click', function () { go(active + 1); });
  $$('[data-go]').forEach(function (b) {
    b.addEventListener('click', function () {
      var exp = b.getAttribute('data-go') === 'exp';
      for (var i = 0; i < n; i++) if (!!TRIPS[i].exp === exp) { go(i); break; }
    });
  });
  var car = $('.car'), tx = null;
  car.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  car.addEventListener('touchend', function (e) {
    if (tx == null) return; var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
  });
  layout();

  /* Banner */
  var bn = $('.bn');
  bn.addEventListener('mouseenter', function (e) { showCur(e, 'Vente con nosotros', bn); });
  bn.addEventListener('mousemove', place);
  bn.addEventListener('mouseleave', hideCur);

  /* Algo más que inmersiones */
  var last = -1;
  function pick() { var k = Math.floor(Math.random() * ALGO.length); if (ALGO.length > 1 && k === last) k = (k + 1) % ALGO.length; last = k; return k; }
  function show(el) {
    var it = ALGO[pick()], img = $('.ell-img', el), sp = $$('.ell-t span', el);
    img.src = it.img; img.alt = it.alt; sp[0].textContent = it.l1; sp[1].textContent = it.l2;
    el.classList.add('is-on');
  }
  function hide(el) { var sp = $$('.ell-t span', el); sp[0].textContent = 'ALGO MÁS QUE'; sp[1].textContent = 'INMERSIONES'; el.classList.remove('is-on'); }
  $$('.ell').forEach(function (el) {
    el.addEventListener('mouseenter', function () { if (canHover()) show(el); });
    el.addEventListener('mouseleave', function () { if (canHover()) hide(el); });
    el.addEventListener('click', function () { show(el); });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(el); } });
  });

  /* Formularios */
  $$('form').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = $('.nl-ok', f.parentNode);
      if (ok) ok.hidden = false;
      var b = $('button', f); if (b && b.textContent.trim()) b.textContent = '¡Gracias!';
      f.reset();
    });
  });
})();
