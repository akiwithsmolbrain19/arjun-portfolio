/* FORCE START AT TOP */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
window.addEventListener('load', function () {
  window.scrollTo(0, 0);
});
window.addEventListener('beforeunload', function () {
  window.scrollTo(0, 0);
});

document.documentElement.classList.add('js');

var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

/* ===== MATRIX RAIN ===== */
var canvas = document.getElementById('matrix');
if (canvas) {
  var ctx = canvas.getContext('2d');
  var glyphs = 'アイウエオカキクケコサシスセソ0123456789ABCDEF#$%&*+';
  var cols, drops;
  function sizeMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 18);
    drops = [];
    for (var i = 0; i < cols; i++) drops.push(1);
  }
  sizeMatrix();
  window.addEventListener('resize', sizeMatrix);
  setInterval(function () {
    ctx.fillStyle = 'rgba(5,5,5,0.09)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '13px monospace';
    for (var i = 0; i < cols; i++) {
      var ch = glyphs[Math.floor(Math.random() * glyphs.length)];
      ctx.fillStyle = Math.random() > 0.97 ? '#ffffff' : 'rgba(190,190,190,0.8)';
      ctx.fillText(ch, i * 18, drops[i] * 18);
      if (drops[i] * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }, 70);
}

/* ===== TYPEWRITER ===== */
var typedEl = document.getElementById('typed');
if (typedEl) {
  var lines = [
    '> whoami — Arjun P S, ECE Graduate turnedsecurity Analyst',
    '> skills — SIEM · Threat Detection · VAPT · Network Analysis',
    '> status — Open to SOC / Security Analyst roles_'
  ];
  var li = 0, ci = 0;
  function type() {
    if (li >= lines.length) {
      typedEl.innerHTML += ' <span class="caret"></span>';
      return;
    }
    typedEl.innerHTML = lines.slice(0, li).join('<br>') + (li ? '<br>' : '') + lines[li].slice(0, ci);
    if (ci < lines[li].length) { ci++; setTimeout(type, 22); }
    else { li++; ci = 0; setTimeout(type, 320); }
  }
  setTimeout(type, 900);
}

/* ===== MARQUEE ===== */
var track = document.getElementById('marquee');
if (track) {
  var items = ['SIEM MONITORING','THREAT DETECTION','VAPT','INCIDENT RESPONSE','MITRE ATT&CK','WIRESHARK','WAZUH','KALI LINUX','BURP SUITE','PYTHON','CTF PLAYER','TRYHACKME'];
  track.innerHTML = (items.map(function (i) { return '<span>◆</span><b>' + i + '</b>'; }).join('')).repeat(2);
}

/* ===== SCROLL REVEAL ===== */
if ('IntersectionObserver' in window) {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntering) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
} else {
  document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
}

/* ===== SIGIL PARALLAX (desktop only) ===== */
if (!isTouch) {
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    var s1 = document.querySelector('.s1');
    var s2 = document.querySelector('.s2');
    if (s1) s1.style.marginTop = (y * 0.08) + 'px';
    if (s2) s2.style.marginTop = (y * -0.06) + 'px';
  }, { passive: true });
}

/* ===== RANDOM GLITCH FLASH ON NAME ===== */
var nameEl = document.querySelector('.name');
setInterval(function () {
  if (!nameEl) return;
  nameEl.style.textShadow = '2px 0 rgba(158,255,240,.6), -2px 0 rgba(255,100,100,.4)';
  setTimeout(function () { nameEl.style.textShadow = ''; }, 90);
  setTimeout(function () {
    nameEl.style.textShadow = '-3px 0 rgba(158,255,240,.5), 3px 0 rgba(255,100,100,.5)';
    setTimeout(function () { nameEl.style.textShadow = ''; }, 70);
  }, 140);
}, 6000);

/* ===== MOBILE BURGER MENU ===== */
var burger = document.getElementById('burger');
var navmenu = document.getElementById('navmenu');
if (burger && navmenu) {
  burger.addEventListener('click', function () {
    burger.classList.toggle('open');
    navmenu.classList.toggle('open');
  });
  navmenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      burger.classList.remove('open');
      navmenu.classList.remove('open');
    });
  });
}
