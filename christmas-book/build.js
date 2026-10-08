#!/usr/bin/env node
// Builds "The Christmas Spirit Missions" print + digital PDFs.
//
//   node build.js                                   generic book (blank name lines)
//   node build.js --name "Emma" --year 2026 --from "Grandma & Grandpa"
//
// Output goes to output/<slug>/.

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { intro, missions, ending, memories } = require('./src/content');
const { C, star, starPath, holly, illos, pip, sleigh, svg, snowflake } = require('./src/art');
const { css } = require('./src/styles');

// ---------- options ----------
const args = process.argv.slice(2);
const opt = (k, d = '') => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1] : d;
};
const NAME = opt('name');
const YEAR = opt('year');
const FROM = opt('from');
const ONLY = opt('only'); // e.g. --only 8x8
const COVER_BLEED = parseFloat(opt('cover-bleed', '4'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const nameOr = (fallback) => (NAME ? esc(NAME) : fallback);
const fillName = (s) => s.replace(/\{NAME\}/g, nameOr('Christmas Helper'));
const possessive = (n) => (/s$/i.test(n) ? `${n}’` : `${n}’s`);

const FORMATS = {
  '8x8': { id: '8x8', trimIn: 8, bleedMm: 4, frame: { wIn: 6.3, hIn: 4.3 }, hint: 'Stick your 4×6 photo here' },
  '11x11': {
    id: '11x11', trimIn: 11, bleedMm: 4, frame: { wIn: 8.6, hIn: 6.5 },
    hint: 'Stick your photos here', hintSmall: '1 landscape 4×6 · or 2 portrait 4×6',
  },
};

// ---------- small parts ----------
const meterStars = (filledUpTo, current) =>
  Array.from({ length: 12 }, (_, i) => {
    const n = i + 1;
    if (n <= filledUpTo) return svg('0 0 40 40', star(20, 21, 18, C.gold, C.goldDark, 1.5));
    if (n === current) return svg('0 0 40 40', `<path d="${starPath(20, 21, 18, 8.1)}" fill="#fff" stroke="${C.red}" stroke-width="2.2" stroke-dasharray="3 2.5" stroke-linejoin="round"/>`);
    return svg('0 0 40 40', `<path d="${starPath(20, 21, 18, 8.1)}" fill="none" stroke="#D9C6A8" stroke-width="2" stroke-linejoin="round"/>`);
  }).join('');

const meter = (filled, current, hint) => `
  <div class="meter">
    <div class="lbl">Christmas<br>Spirit Meter</div>
    <div class="stars">${meterStars(filled, current)}</div>
    ${hint ? `<div class="hint">${hint}</div>` : ''}
  </div>`;

const corners = () => `<div class="corner tl">${svg('-30 -16 60 32', holly(0, 0, 1))}</div><div class="corner br">${svg('-30 -16 60 32', holly(0, 0, 1))}</div>`;
const photoCorner = svg('0 0 40 40', `<path d="M0 0 H40 L0 40Z" fill="${C.red}"/><path d="M6 6 H26 L6 26Z" fill="${C.redDark}" opacity=".35"/>`);
const cameraIcon = svg('0 0 60 60', `<rect x="6" y="18" width="48" height="32" rx="6" fill="none" stroke="#D9C6A8" stroke-width="3"/><path d="M20 18 l4 -7 h12 l4 7" fill="none" stroke="#D9C6A8" stroke-width="3" stroke-linejoin="round"/><circle cx="30" cy="34" r="9" fill="none" stroke="#D9C6A8" stroke-width="3"/>`);
const elfHatTag = svg('0 0 50 50', `<circle cx="25" cy="25" r="24" fill="${C.green}"/><path d="M12 34 Q18 8 34 10 Q40 10 42 6 Q42 18 34 22 L36 34Z" fill="${C.red}"/><rect x="10" y="32" width="28" height="6" rx="3" fill="#fff"/><circle cx="42" cy="6" r="3.5" fill="#fff"/>`);

function page(side, cls, inner, extra = '') {
  return `<section class="page ${side} ${cls}"><div class="trim">${extra}<div class="safe">${inner}</div></div></section>`;
}

// ---------- pages ----------
function titlePage() {
  return page('right', 'snow', `
    <div class="belongs">This book<br>belongs to</div>
    <div class="name-line">${NAME ? esc(NAME) : ''}</div>
    <div class="from">
      <div class="line">A Christmas gift from:<span class="fill" style="font-family:'Patrick Hand';color:${C.redDark};font-size:3rem;line-height:2.6rem">${FROM ? esc(FROM) : ''}</span></div>
      <div class="line">Christmas<span class="fill" style="font-family:'Patrick Hand';color:${C.redDark};font-size:3rem;line-height:2.6rem">${YEAR ? esc(YEAR) : ''}</span></div>
    </div>
    <div class="ttl-pip">${pip()}</div>`, `<div class="border"></div>${corners()}`);
}

function introPage() {
  return page('left', 'snow', `
    <div class="ribbon">FROM THE NORTH POLE</div>
    <h1 class="title">${intro.title}</h1>
    <div class="letter">
      <div class="stamp">TOP SECRET</div>
      <div class="greet">${fillName(intro.greeting)}</div>
      ${intro.paragraphs.map((p) => `<p>${p}</p>`).join('')}
      <div class="sig">${intro.signoff}<br><b>${intro.signature}</b></div>
      <div class="ps">${intro.ps}</div>
      <div class="pip">${pip()}</div>
    </div>
    ${meter(0, 0, 'Let’s fill it up!')}`, `<div class="border"></div>`);
}

function checklistPage() {
  const rows = missions.map((m, i) => `
    <div class="row"><div class="num">${i + 1}</div><div class="ic">${illos[m.key]()}</div><div class="name">${m.title}</div><div class="ck"></div></div>`).join('');
  return page('right', 'snow', `
    <div class="ribbon">MY MISSION LIST</div>
    <div class="check">${rows}</div>`, `<div class="border"></div>`);
}

function missionPage(m, i) {
  const n = i + 1;
  return page('left', 'snow', `
    <div class="ribbon">MISSION ${n} <span class="of">OF 12</span></div>
    <h1 class="title">${m.title}</h1>
    <div class="illo">${illos[m.key]()}</div>
    <div class="poem">${m.poem.map((l) => `<span class="l2">${l}</span>`).join('')}</div>
    <div class="clue"><div class="tag">${elfHatTag}</div><b>Pip’s clue for the next mission</b>${m.clue}</div>
    ${meter(i, n, n === 12 ? 'Color the last star!' : 'Color your star when you’re done!')}`, `<div class="border"></div>`);
}

function photoPage(fmt, kicker, title, withLines = true) {
  return page('right', 'snow', `
    <div class="ph-head"><div class="kicker">${kicker}</div><div class="t">${title}</div></div>
    <div class="frame-wrap"><div class="frame">
      <div class="tape"></div>
      <div class="pc a">${photoCorner}</div><div class="pc b">${photoCorner}</div><div class="pc c">${photoCorner}</div><div class="pc d">${photoCorner}</div>
      <div class="hint">${cameraIcon}${fmt.hint}${fmt.hintSmall ? `<small>${fmt.hintSmall}</small>` : ''}</div>
    </div></div>
    ${withLines ? `<div class="ph-foot">
      <div class="lines">
        <div class="line"><div class="split"><div>Date:<span class="fill"></span></div><div>With:<span class="fill"></span></div></div></div>
        <div class="line">My favorite part:<span class="fill"></span></div>
      </div>
      <div class="done"><div class="box"></div>Mission<br>complete!</div>
    </div>` : ''}`, `<div class="border"></div>`);
}

function endingPage() {
  const medal = svg('0 0 60 60', `<circle cx="30" cy="30" r="28" fill="${C.gold}" stroke="${C.goldDark}" stroke-width="3"/>${star(30, 31, 17, '#fff')}`);
  return page('left', 'snow', `
    <div class="ribbon">MISSION ACCOMPLISHED</div>
    <h1 class="title big">${ending.title}</h1>
    <div class="poem">${ending.poem.map((l) => `<span class="l2">${fillName(l)}</span>`).join('')}</div>
    <div class="cert">
      <div class="medal">${medal}</div>
      <div class="ct" style="margin-top:4.4rem">This certifies that</div>
      <div class="cn">${NAME ? esc(NAME) : ''}</div>
      <div class="ch">${ending.certTitle}</div>
      <div class="ct" style="font-size:1.8rem;margin-top:.8rem">Christmas ${YEAR ? esc(YEAR) : '20____'}</div>
      <div class="sigs"><div>Pip the Elf<small>Head Elf</small></div><div>Santa Claus<small>North Pole</small></div></div>
    </div>
    ${meter(12, 0, 'FULL!')}`, `<div class="border"></div>`);
}

function memoriesPage() {
  return page('left', 'snow', `
    <div class="ribbon">KEEP FOREVER</div>
    <h1 class="title">${memories.title}</h1>
    <div class="mem">${memories.prompts.map((q) => `<div><div class="q">${q}</div><div class="ln"></div><div class="ln"></div></div>`).join('')}</div>
    <div class="bye">${memories.closing}<div style="width:13rem">${pip()}</div></div>`, `<div class="border"></div>${corners()}`);
}

function frontCover() {
  const titleName = NAME ? `${possessive(esc(NAME))}` : 'My';
  return page('right', 'cover snow-dark', `
    <div class="cv-name">${titleName}</div>
    <div class="cv-title">Christmas<span>Spirit Missions</span></div>
    <div class="cv-art">${sleigh()}</div>
    <div class="cv-sub">12 magical missions to do together</div>
    ${YEAR ? `<div class="cv-year">Christmas ${esc(YEAR)}</div>` : ''}`, `<div class="cv-frame"></div>`);
}

function backCover() {
  return page('left', 'cover back snow-dark', `
    <div class="cv-pip">${pip()}</div>
    <div class="cv-blurb">Santa’s sleigh flies on <b>Christmas Spirit</b>, and this year it needs a special helper!<br><br>
    Complete <b>12 magical missions</b> with the people you love, stick a photo of each moment, and fill the Spirit Meter before Christmas Eve.</div>
    <div class="cv-year" style="margin-top:3rem">${YEAR ? `Made with love · Christmas ${esc(YEAR)}` : 'Made with love'}</div>`, `<div class="cv-frame"></div>`);
}

// Interior: 30 pages. Page 1 is a right-hand page, so text sits on even (left)
// pages and photos on odd (right) pages.
function interiorPages(fmt) {
  const pages = [titlePage(), introPage(), checklistPage()];
  missions.forEach((m, i) => {
    pages.push(missionPage(m, i));
    pages.push(photoPage(fmt, `Mission ${i + 1} · Our photo`, m.title));
  });
  pages.push(endingPage());
  pages.push(photoPage(fmt, 'The big day!', 'Christmas Morning'));
  pages.push(memoriesPage());
  if (pages.length !== 30) throw new Error(`expected 30 interior pages, got ${pages.length}`);
  return pages;
}

function html(fmt, pages) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Christmas Spirit Missions</title><style>${css(fmt)}</style></head><body>${pages.join('\n')}</body></html>`;
}

// ---------- render ----------
async function render(browser, fmt, pages, outFile) {
  const htmlFile = path.join(__dirname, `.tmp-${path.basename(outFile, '.pdf')}.html`);
  fs.writeFileSync(htmlFile, html(fmt, pages));
  const pg = await browser.newPage();
  await pg.goto('file://' + htmlFile);
  await pg.evaluate(() => document.fonts.ready);
  const sizeMm = fmt.trimIn * 25.4 + 2 * fmt.bleedMm;
  await pg.pdf({ path: outFile, width: `${sizeMm}mm`, height: `${sizeMm}mm`, printBackground: true, preferCSSPageSize: true });
  await pg.close();
  fs.unlinkSync(htmlFile);
  console.log('  ✓', path.relative(__dirname, outFile));
}

(async () => {
  const slug = NAME ? NAME.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : 'generic';
  const outDir = path.join(__dirname, 'output', slug);
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();

  for (const fmt of Object.values(FORMATS)) {
    if (ONLY && ONLY !== fmt.id && ONLY !== 'digital') continue;
    if (ONLY === 'digital') break;
    console.log(`Gelato ${fmt.id} hardcover`);
    await render(browser, fmt, interiorPages(fmt), path.join(outDir, `gelato-${fmt.id}-interior-30p.pdf`));
    const coverFmt = { ...fmt, bleedMm: COVER_BLEED };
    await render(browser, coverFmt, [frontCover(), backCover()], path.join(outDir, `gelato-${fmt.id}-cover-front-back.pdf`));
  }

  if (!ONLY || ONLY === 'digital') {
    // Digital PDF: 8x8 without bleed, cover + 30 pages + back cover.
    console.log('Digital');
    const fmt = { ...FORMATS['8x8'], bleedMm: 0 };
    await render(browser, fmt, [frontCover(), ...interiorPages(fmt), backCover()], path.join(outDir, 'digital-christmas-spirit-missions.pdf'));
  }
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
