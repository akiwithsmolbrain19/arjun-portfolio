document.documentElement.classList.add('js');

/* ===== THEME — paper by default, ink on toggle ===== */
(function () {
  var root = document.documentElement;
  try {
    if (localStorage.getItem('aps-theme') === 'dark') root.setAttribute('data-theme', 'dark');
  } catch (e) {}
  function sync() {
    var b = document.getElementById('theme-toggle');
    if (b) b.textContent = root.getAttribute('data-theme') === 'dark' ? '◑' : '◐';
  }
  sync();
  var btn = document.getElementById('theme-toggle');
  if (btn) btn.addEventListener('click', function () {
    var dark = root.getAttribute('data-theme') !== 'dark';
    if (dark) root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    try { localStorage.setItem('aps-theme', dark ? 'dark' : 'paper'); } catch (e) {}
    sync();
  });
})();

/* migrate legacy stored value */
try {
  if (localStorage.getItem('aps-theme') === 'light') localStorage.setItem('aps-theme', 'paper');
} catch (e) {}

/* ===== CLOCK ===== */
(function () {
  var el = document.getElementById('clock');
  if (!el) return;
  function tick() {
    var d = new Date();
    function p(n) { return (n < 10 ? '0' : '') + n; }
    el.textContent = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
  }
  tick(); setInterval(tick, 1000);
})();

/* ===== OVERLAY MENU ===== */
(function () {
  var btn = document.getElementById('menu-btn');
  var ov = document.getElementById('overlay');
  if (!btn || !ov) return;
  function set(open) {
    ov.classList.toggle('open', open);
    ov.setAttribute('aria-hidden', open ? 'false' : 'true');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.innerHTML = open ? 'CLOSE&nbsp;×' : 'MENU&nbsp;+';
    document.body.style.overflow = open ? 'hidden' : '';
  }
  btn.addEventListener('click', function () { set(!ov.classList.contains('open')); });
  ov.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { set(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') set(false);
  });
})();

/* ===== TYPEWRITER ===== */
(function () {
  var el = document.getElementById('typed');
  if (!el) return;
  var lines = [
    '> detection engineering — netwatch · sentinel-hound',
    '> soc labs · threat triage · mitre att&ck',
    '> open to soc / security analyst roles_'
  ];
  var li = 0, ci = 0;
  function type() {
    if (li >= lines.length) return;
    el.textContent = lines.slice(0, li).join(' ') + (li ? ' ' : '') + lines[li].slice(0, ci);
    if (ci < lines[li].length) { ci++; setTimeout(type, 20); }
    else { li++; ci = 0; setTimeout(type, 350); }
  }
  setTimeout(type, 700);
})();

/* ===== TICKER ===== */
(function () {
  var track = document.getElementById('marquee');
  if (!track) return;
  var items = ['THREAT DETECTION', 'PCAP ANALYSIS', 'SIEM MONITORING', 'INCIDENT RESPONSE', 'MITRE ATT&CK', 'WIRESHARK', 'WAZUH', 'PYTHON', 'CTF PLAYER', 'TRYHACKME'];
  track.innerHTML = (items.map(function (i) { return '<span>◆</span><b>' + i + '</b>'; }).join('')).repeat(2);
})();

/* ===== SCROLL REVEAL ===== */
if ('IntersectionObserver' in window) {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
} else {
  document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
}

/* ===== SCROLL PARALLAX — rAF, transform-only ===== */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  var els = Array.prototype.slice.call(document.querySelectorAll('[data-drift]'));
  if (!els.length) return;
  var ticking = false;
  function update() {
    ticking = false;
    var vh = window.innerHeight;
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var p = (r.top + r.height / 2 - vh / 2) / vh; // -0.5..0.5
      var d = parseFloat(el.getAttribute('data-drift')) || 0;
      el.style.transform = 'translate3d(0,' + (-p * d * vh).toFixed(1) + 'px,0)';
    });
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();

/* ===== MAGNETIC BUTTONS (desktop, subtle) ===== */
(function () {
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (!fine) return;
  document.querySelectorAll('.btn').forEach(function (b) {
    b.addEventListener('mousemove', function (e) {
      var r = b.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width / 2) / r.width;
      var y = (e.clientY - r.top - r.height / 2) / r.height;
      b.style.transform = 'translate(' + (x * 6).toFixed(1) + 'px,' + (y * 6).toFixed(1) + 'px)';
    });
    b.addEventListener('mouseleave', function () { b.style.transform = ''; });
  });
})();

/* ===== FAKE SOC TERMINAL (canned lab data — no live systems) ===== */
(function () {
  var body = document.getElementById('term-body');
  if (!body) return;
  var PROMPT = 'arjun@soc-lab:~$ ';
  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function print(html) {
    var d = document.createElement('div');
    d.innerHTML = html;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }
  function inputRow() {
    var row = document.createElement('div');
    row.className = 'term-input-row';
    row.innerHTML = '<span class="term-prompt">' + PROMPT + '</span>';
    var inp = document.createElement('input');
    inp.id = 'term-input';
    inp.setAttribute('autocomplete', 'off');
    inp.setAttribute('spellcheck', 'false');
    inp.setAttribute('aria-label', 'Terminal input');
    row.appendChild(inp);
    body.appendChild(row);
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var cmd = inp.value.trim();
        row.replaceWith(echoRow(cmd));
        run(cmd);
        inputRow();
        body.scrollTop = body.scrollHeight;
      }
    });
  }
  function echoRow(cmd) {
    var d = document.createElement('div');
    d.innerHTML = '<span class="term-prompt">' + PROMPT + '</span>' + esc(cmd);
    return d;
  }
  var CMDS = {
    help: function () {
      print('<span class="dim">commands: whoami · skills · projects · netwatch [scan|benign|dns] · sentinel · nmap · contact · clear</span>');
    },
    whoami: function () {
      print('arjun p s — ece graduate turned cybersecurity analyst. soc / detection engineering. thrissur, in.');
    },
    skills: function () {
      print('siem (wazuh) · threat detection · vapt · wireshark/tcpdump · python · mitre att&amp;ck');
    },
    projects: function () {
      print('<span class="ok">netwatch</span> — 8-rule pcap threat detector (32 tests)');
      print('<span class="ok">sentinel-hound</span> — 6-rule log triage toolkit (37 tests)');
      print('<span class="ok">senti-sign</span> — sign language + emotion translator (patent pub. 202541127307)');
    },
    sentinel: function () {
      print('<span class="dim">$ sentinel-hound analyze --log sample_data/auth.log</span>');
      print('<span class="bad">[CRITICAL]</span> SH-101 possible ssh brute-force | 198.51.100.7 · 24 fails / 5min');
      print('<span class="warn">[MEDIUM]</span> SH-103 web scanner pattern | nikto ua · /.git/config');
      print('<span class="dim">2 findings · see github.com/akiwithsmolbrain19/sentinel-hound</span>');
    },
    nmap: function () {
      print('<span class="dim">$ nmap -sV 192.0.2.10  # lab target (TEST-NET-1, synthetic)</span>');
      print('PORT&nbsp;&nbsp;&nbsp;&nbsp;STATE SERVICE<br>22/tcp&nbsp;&nbsp;open&nbsp;&nbsp;ssh<br>80/tcp&nbsp;&nbsp;open&nbsp;&nbsp;http<br>445/tcp&nbsp;&nbsp;open&nbsp;&nbsp;smb');
    },
    contact: function () {
      print('peringhatarjun@gmail.com · linkedin.com/in/p-s-arjun · +91 80788 92743');
    },
    clear: function () { body.innerHTML = ''; }
  };
  function netwatch(arg) {
    if (arg === 'benign') {
      print('<span class="dim">$ netwatch analyze --pcap sample_data/benign.pcap</span>');
      print('<span class="ok">No findings. Traffic did not cross any detection thresholds.</span>');
      return;
    }
    if (arg === 'dns') {
      print('<span class="dim">$ netwatch analyze --pcap sample_data/dns_anomaly.pcap</span>');
      print('<span class="warn">[MEDIUM]</span> NW-104 suspicious dns behavior | 25 unique queries');
      print('<span class="warn">[MEDIUM]</span> NW-106 possible beaconing | cv=0.000 — triage lead, not proof of c2');
      return;
    }
    print('<span class="dim">$ netwatch analyze --pcap sample_data/scan.pcap</span>');
    print('<span class="bad">[HIGH]</span> NW-101 possible port scan | 198.51.100.7 · 25 ports / 60s');
    print('<span class="dim">correlated: 198.51.100.7 → 1 finding · github.com/akiwithsmolbrain19/netwatch</span>');
  }
  function run(raw) {
    if (!raw) return;
    var parts = raw.split(/\s+/);
    var c = parts[0].toLowerCase(), arg = (parts[1] || '').toLowerCase();
    if (c === 'netwatch') { netwatch(arg); return; }
    if (c === 'sudo') { print('<span class="bad">permission denied: this is a portfolio, not a shell.</span>'); return; }
    if (CMDS[c]) { CMDS[c](); return; }
    print('<span class="dim">unknown: ' + esc(c) + ' — try: help</span>');
  }
  print('<span class="dim">soc-lab terminal · canned lab output · type</span> help');
  inputRow();
  body.addEventListener('click', function () {
    var inp = document.getElementById('term-input');
    if (inp) inp.focus();
  });
})();
