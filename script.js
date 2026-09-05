

/* ===== CUSTOM CURSOR ===== */
var cDot = document.getElementById('cDot');
var cRing = document.getElementById('cRing');
var mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', function (e) {
  mx = e.clientX; my = e.clientY;
  cDot.style.left = mx + 'px';
  cDot.style.top = my + 'px';
});
(function follow() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  cRing.style.left = rx + 'px';
  cRing.style.top = ry + 'px';
  requestAnimationFrame(follow);
})();
document.querySelectorAll('a, .btn, .proj, .skill').forEach(function (el) {
  el.addEventListener('mouseenter', function () { cRing.classList.add('hovering'); });
  el.addEventListener('mouseleave', function () { cRing.classList.remove('hovering'); });
});

/* ===== MATRIX RAIN (silver) ===== */
var canvas = document.getElementById('matrix');
var ctx = canvas.getContext('2d');
var glyphs = 'アイウエオカキクケコサシスセソ0123456789ABCDEF#$%&*+-<>';
var cols, drops;
function sizeMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cols = Math.floor(canvas.width / 16);
  drops = [];
  for (var i = 0; i < cols; i++) drops.push(1);
}
sizeMatrix();
window.addEventListener('resize', sizeMatrix);
setInterval(function () {
  ctx.fillStyle = 'rgba(5,5,5,0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '13px monospace';
  for (var i 0; i < cols; i++) {
    var ch = glyphs[Math.floor(Math.random() * glyphs.length)];
    ctx.fillStyle = Math.random() > 0.975 ? '#ffffff' : 'rgba(200,200,200,0.85)';
    ctx.fillText(ch, i * 16, drops[i] * 16);
    if (drops[i] * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}, 60);

/* ===== TYPEWRITER ===== */
var lines = [
  '> whoami — Arjun P S, ECE Graduate turned Cybersecurity Analyst',
  '> skills — SIEM · Threat Detection · VAPT · Network Analysis',
  '> status — Open to SOC / Security Analyst roles_'
];
var typedEl = document.getElementById('typed');
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
type();

/* ===== MARQUEE ===== */
var items = ['SIEM MONITORING','THREAT DETECTION','VAPT','INCIDENT RESPONSE','MITRE ATT&CK','WIRESHARK','WAZUH','KALI LINUX','BURP SUITE','PYTHON','CTF PLAYER','TRYHACKME'];
var track = document.getElementById('marquee');
track.innerHTML = (items.map(function (i) { return '<span>◆</span><b>' + i + '</b>'; }).join('')).repeat(2);

/* ===== SCROLL REVEAL ===== */
var obs = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });

/* ===== HEADING DECRYPT SCRAMBLE ===== */
var scrambleChars = '!<>-_\\/[]{}=+*^?#';
function scramble(el) {
  var original = el.textContent;
  var frame = 0, total = 24;
  var iv = setInterval(function () {
    var out = '';
    for (var i = 0; i < original.length; i++) {
      if (original[i] === ' ') { out += ' '; continue; }
      out += (frame / total * original.length > i) ? original[i] : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
    }
    el.textContent = out;
    frame++;
    if (frame > total) { clearInterval(iv); el.textContent = original; }
  }, 30);
}
var obs2 = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      var h = e.target.querySelector('h2');
      if (h) scramble(h);
      obs2.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.sec-head').forEach(function (el) { obs2.observe(el); });
