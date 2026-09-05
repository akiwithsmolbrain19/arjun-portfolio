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

/* ===== THEME TOGGLE (persisted, defaults to dark) ===== */
(function () {
  var root = document.documentElement;
  try {
    if (localStorage.getItem('aps-theme') === 'light') root.setAttribute('data-theme', 'light');
  } catch (e) {}
  function syncBtn() {
    var b = document.getElementById('theme-toggle');
    if (b) b.textContent = root.getAttribute('data-theme') === 'light' ? '◑' : '◐';
  }
  syncBtn();
  var btn = document.getElementById('theme-toggle');
  if (btn) btn.addEventListener('click', function () {
    var light = root.getAttribute('data-theme') !== 'light';
    if (light) root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    try { localStorage.setItem('aps-theme', light ? 'light' : 'dark'); } catch (e) {}
    syncBtn();
  });
})();

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
    var light = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.fillStyle = light ? 'rgba(242,242,242,0.09)' : 'rgba(5,5,5,0.09)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '13px monospace';
    for (var i = 0; i < cols; i++) {
      var ch = glyphs[Math.floor(Math.random() * glyphs.length)];
      ctx.fillStyle = light ? 'rgba(120,120,120,0.8)'
        : (Math.random() > 0.97 ? '#ffffff' : 'rgba(190,190,190,0.8)');
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
    '> whoami — Arjun P S, ECE Graduate turned Cybersecurity Analyst',
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
      if (e.isIntersecting) e.target.classList.add('visible');
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

/* ===== FAKE SOC TERMINAL (all output canned lab data — no live systems) ===== */
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
    inp.focus();
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
