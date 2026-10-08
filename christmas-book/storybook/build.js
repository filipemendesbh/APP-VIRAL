#!/usr/bin/env node
// Storybook edition: full-spread illustrations with text top-left and a photo frame top-right.
//
//   node storybook/build.js                         (name defaults to Oliver)
//   node storybook/build.js --name "Emma" --year 2026 --from "Grandma & Grandpa"
//   node storybook/build.js --prompts               (writes storybook/PROMPTS.md only)
//
// Illustrations go in storybook/illustrations/<file>.jpg|png (2:1 spreads, cover is 1:1).
// Missing ones are drawn as labelled placeholders so the layout can be checked.

const fs = require('fs');
const path = require('path');
const { CHARACTERS, STYLE, LAYOUT, intro, missions, ending, cover } = require('./story');

const ROOT = __dirname;
const ILL = path.join(ROOT, 'illustrations');
const args = process.argv.slice(2);
const opt = (k, d = '') => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1] : d;
};
const NAME = opt('name', 'Oliver');
const YEAR = opt('year');
const FROM = opt('from');
const COVER_BLEED = parseFloat(opt('cover-bleed', '4'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const withName = (s) => s.replace(/\{NAME\}/g, `<span class="nm">${esc(NAME)}</span>`);
const possessive = (n) => (/s$/i.test(n) ? `${n}’` : `${n}’s`);

// ---------- prompts ----------
function writePrompts() {
  const block = (title, file, scene, ratio) =>
    `## ${title}\nFile: \`illustrations/${file}.jpg\` · aspect ${ratio}\n\n\`\`\`\n${ratio === '1:1' ? scene : `${STYLE}\nSCENE: ${scene}\n${CHARACTERS}\n${LAYOUT}`}${ratio === '1:1' ? `\n${CHARACTERS}` : ''}\n\`\`\`\n`;
  const parts = [
    '# Illustration prompts\n',
    'Always attach the 3 references: `references/style-spread-deck-the-house.jpg`, `references/character-oliver.jpg`, `references/characters-biscuit-elf.jpg`.',
    'Print needs at least 4800×2450 px per spread for 8×8 and 6600×3350 px for 11×11 (300 dpi). Upscale smaller images before printing.\n',
    block('Cover', cover.file, cover.scene, '1:1'),
    block(`Intro: ${intro.title}`, intro.file, intro.scene, '2:1'),
    ...missions.map((m, i) => block(`Mission ${i + 1}: ${m.title}`, m.file, m.scene, '2:1')),
    block(`Ending: ${ending.title}`, ending.file, ending.scene, '2:1'),
  ];
  fs.writeFileSync(path.join(ROOT, 'PROMPTS.md'), parts.join('\n'));
  console.log('  ✓ storybook/PROMPTS.md');
}

function findArt(file) {
  for (const ext of ['.jpg', '.jpeg', '.png', '.webp']) {
    const p = path.join(ILL, file + ext);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// ---------- formats ----------
const PHOTO = {
  landscape: [{ w: 6, h: 4 }],
  portrait: [{ w: 4, h: 6 }],
  'two-portrait': [{ w: 4, h: 6 }, { w: 4, h: 6 }],
};
const FORMATS = [
  { id: '8x8', trimIn: 8, bleedMm: 4, photo: 'landscape' },
  { id: '11x11-landscape', trimIn: 11, bleedMm: 4, photo: 'landscape' },
  { id: '11x11-portrait', trimIn: 11, bleedMm: 4, photo: 'portrait' },
  { id: '11x11-two-portrait', trimIn: 11, bleedMm: 4, photo: 'two-portrait' },
];

// ---------- css ----------
function css(fmt) {
  const T = fmt.trimIn * 25.4;
  const b = fmt.bleedMm;
  const P = T + 2 * b;
  const font = (fam, file, w, st = 'normal') => `@font-face{font-family:'${fam}';font-weight:${w};font-style:${st};src:url(../fonts/${file})}`;
  return `
${font('Lora', 'Lora-Regular.ttf', 400)}${font('Lora', 'Lora-Italic.ttf', 400, 'italic')}${font('Lora', 'Lora-SemiBold.ttf', 600)}${font('Lora', 'Lora-Bold.ttf', 700)}
${font('Patrick Hand', 'PatrickHand-Regular.ttf', 400)}
@page{size:${P}mm ${P}mm;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html{font-size:${(T / 100).toFixed(4)}mm;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{background:#777;font-family:'Lora',serif;color:#4A3426}
.page{position:relative;width:${P}mm;height:${P}mm;overflow:hidden;break-after:page;background:#F6EDDD}
.page:last-child{break-after:auto}
.art{position:absolute;top:0;height:${P}mm;width:${2 * T + 2 * b}mm;object-fit:cover}
.left .art{left:0}.right .art{left:${-T}mm}
.trim{position:absolute;left:${b}mm;top:${b}mm;width:${T}mm;height:${T}mm}

/* placeholder spread */
.ph{position:absolute;top:0;height:${P}mm;width:${2 * T + 2 * b}mm;background:#F3E8D3}
.ph .wall{position:absolute;inset:0 0 34% 0;background:repeating-linear-gradient(90deg,#F4EAD8 0 4rem,#EFE3CD 4rem 8rem)}
.ph .wain{position:absolute;left:0;right:0;top:66%;height:12%;background:#FBF8F1;border-top:.6rem solid #fff}
.ph .floor{position:absolute;left:0;right:0;bottom:0;height:22%;background:#B57849}
.left .ph{left:0}.right .ph{left:${-T}mm}
.ph .lbl{position:absolute;bottom:6rem;width:${T}mm;text-align:center;font:600 2.4rem 'Lora';color:#fff;letter-spacing:.1rem;text-shadow:0 0 .6rem #0006}
.left .ph .lbl{left:${b}mm}.right .ph .lbl{left:${T + b}mm}

/* story text, top-left of the left page */
.story{position:absolute;left:6.5rem;top:9rem;width:50rem;text-align:center;text-shadow:0 0 1.2rem #F6EDDD,0 0 .6rem #F6EDDD}
.story h1{font-weight:700;font-size:4.9rem;line-height:1.1;color:#A51C24;letter-spacing:-.05rem}
.story .rule{display:flex;align-items:center;justify-content:center;gap:1rem;margin:1rem 0 1.8rem;color:#C9A36B;font-size:1.5rem}
.story .rule::before,.story .rule::after{content:'';width:5rem;height:.15rem;background:#C9A36B}
.story p{font-size:2.55rem;line-height:1.48;margin-bottom:1.3rem}
.story .star{color:#A51C24;font-size:2.55rem;margin-top:.6rem}
.story .star b{font-size:2rem;vertical-align:.15rem}
.story .teaser{font-style:italic;font-size:2.4rem;line-height:1.42}
.nm{color:#A51C24}

/* photo frame, top-right of the right page */
.photos{position:absolute;top:6rem;left:0;right:0;display:flex;justify-content:center;gap:0.3in}
.frame{position:relative;background:#FFFDF8;padding:2.5mm;box-shadow:0 .4rem 1.4rem #0003;outline:.25mm solid #9B7B5B;outline-offset:-1.2mm}
.frame .win{width:var(--w);height:var(--h);background:rgba(255,253,248,.55);border:.3mm dashed #CDB79A;display:flex;align-items:center;justify-content:center;
  font-style:italic;font-size:2rem;color:#B9A283;text-align:center;line-height:1.3}

/* intro checklist card */
.card{position:absolute;top:7rem;left:16rem;right:12rem;background:#FFFCF4;padding:3.4rem 4rem 3rem;transform:rotate(1.2deg);box-shadow:0 .6rem 1.8rem #0003}
.card::before{content:'';position:absolute;top:-1.8rem;left:50%;width:14rem;height:4rem;transform:translateX(-50%) rotate(-2deg);background:rgba(214,180,120,.6)}
.card h2{font-weight:700;color:#A51C24;font-size:3.6rem;text-align:center;line-height:1.1}
.card .sub{font-style:italic;text-align:center;font-size:2rem;margin:.6rem 0 1.6rem;color:#7A6048}
.card ol{list-style:none;display:grid;grid-template-columns:1fr;gap:.85rem}
.card li{display:flex;align-items:center;gap:1.4rem;font-size:2.15rem;border-bottom:.12rem dotted #D9C6A8;padding-bottom:.55rem}
.card li .n{font-weight:700;color:#A51C24;width:2.8rem;text-align:right}
.card li .t{flex:1}
.card li .bx{width:2.8rem;height:2.8rem;border:.3rem solid #2F5D46;border-radius:.5rem}

/* plain pages */
.paper{background:radial-gradient(ellipse at 50% 40%,#FBF5E9 0%,#F4E9D5 100%)}
.content{position:absolute;inset:9rem 10rem;display:flex;flex-direction:column;align-items:center;text-align:center}
.belongs{font-weight:700;color:#A51C24;font-size:6rem;line-height:1.1;margin-top:3rem}
.nameline{font-family:'Patrick Hand';font-size:7rem;color:#2F5D46;border-bottom:.25rem solid #C9A36B;width:80%;min-height:9.5rem;line-height:9.5rem;margin-top:2rem}
.small{font-size:2.6rem;margin-top:4.5rem;width:85%;display:flex;gap:1.2rem;align-items:flex-end;white-space:nowrap}
.small span{flex:1;border-bottom:.2rem solid #C9A36B;font-family:'Patrick Hand';font-size:3.2rem;color:#2F5D46;min-height:3.6rem;text-align:left;padding-left:1rem}
.char{margin-top:auto}
.mem h1{font-weight:700;color:#A51C24;font-size:5.4rem}
.mem .q{font-weight:600;font-size:2.6rem;text-align:left;width:100%;margin-top:3rem;color:#2F5D46}
.mem .ln{width:100%;border-bottom:.2rem solid #C9A36B;height:4.8rem}

/* covers */
.cv .t{position:absolute;top:8rem;left:8rem;right:8rem;text-align:center;text-shadow:0 0 2rem #F6EDDD,0 0 1rem #F6EDDD}
.cv .t .n{font-weight:700;color:#A51C24;font-size:7.6rem;line-height:1}
.cv .t .m{font-weight:700;color:#2F5D46;font-size:9rem;line-height:1}
.cv .t .s{font-style:italic;font-size:3rem;margin-top:1.4rem}
.cv .y{position:absolute;bottom:7rem;left:0;right:0;text-align:center;font-weight:700;color:#A51C24;font-size:3.4rem;text-shadow:0 0 1.2rem #F6EDDD}
.back .blurb{position:absolute;top:12rem;left:12rem;right:12rem;text-align:center;font-size:3rem;line-height:1.5}
.back .blurb b{color:#A51C24}
`;
}

// ---------- page parts ----------
const fileUrl = (p) => 'file://' + p;
function artLayer(file, side, label) {
  const p = findArt(file);
  if (p) return `<img class="art" src="${fileUrl(p)}">`;
  return `<div class="ph"><div class="wall"></div><div class="wain"></div><div class="floor"></div><div class="lbl">${side === 'left' ? `ILLUSTRATION · ${esc(file)}` : esc(label)}</div></div>`;
}

const page = (side, cls, inner) => `<section class="page ${side} ${cls}">${inner}</section>`;

function storyBlock(title, paragraphs, star, teaser) {
  return `<div class="story"><h1>${title}</h1><div class="rule">★</div>
    ${paragraphs.map((p) => `<p>${withName(p)}</p>`).join('')}
    ${star ? `<div class="star"><b>★</b> ${withName(star)}</div>` : ''}
    ${teaser ? `<div class="teaser">${withName(teaser)}</div>` : ''}</div>`;
}

function photoFrames(fmt) {
  const slots = PHOTO[fmt.photo];
  const pad = 0.06; // 1.5 mm tolerance around the photo on each side
  return `<div class="photos">${slots
    .map((s) => `<div class="frame"><div class="win" style="--w:${s.w + 2 * pad}in;--h:${s.h + 2 * pad}in">your photo here</div></div>`)
    .join('')}</div>`;
}

function spread(fmt, file, label, leftInner, rightInner) {
  return [
    page('left', '', artLayer(file, 'left') + `<div class="trim">${leftInner}</div>`),
    page('right', '', artLayer(file, 'right', label) + `<div class="trim">${rightInner}</div>`),
  ];
}

function titlePage() {
  return page('right', 'paper', `<div class="trim"><div class="content">
    <div class="belongs">This book<br>belongs to</div>
    <div class="nameline">${esc(NAME)}</div>
    <div class="small">A Christmas gift from<span>${FROM ? esc(FROM) : ''}</span></div>
    <div class="small" style="margin-top:2.6rem">Christmas<span>${YEAR ? esc(YEAR) : ''}</span></div>
    <img class="char" style="width:30rem" src="${fileUrl(path.join(ROOT, 'characters/pip-waving.png'))}">
  </div></div>`);
}

function memoriesPage() {
  const qs = ['My favorite mission was…', 'The funniest moment was…', 'This Christmas I am thankful for…', 'Next Christmas I want to…'];
  return page('left', 'paper mem', `<div class="trim"><div class="content" style="inset:8rem 9rem">
    <h1>My Christmas Memories</h1>
    ${qs.map((q) => `<div class="q">${q}</div><div class="ln"></div><div class="ln"></div>`).join('')}
    <img class="char" style="width:28rem;align-self:flex-end;margin-right:-4rem" src="${fileUrl(path.join(ROOT, 'characters/biscuit-lights.png'))}">
  </div></div>`);
}

function checklistCard() {
  return `<div class="card"><h2>${possessive(esc(NAME))} Mission List</h2><div class="sub">Draw a star when each mission is done</div>
    <ol>${missions.map((m, i) => `<li><span class="n">${i + 1}</span><span class="t">${m.list}</span><span class="bx"></span></li>`).join('')}</ol></div>`;
}

function interior(fmt) {
  const pages = [titlePage()];
  pages.push(...spread(fmt, intro.file, 'Mission list', storyBlock(intro.title, intro.text, intro.star, intro.teaser), checklistCard()));
  missions.forEach((m) => {
    pages.push(...spread(fmt, m.file, 'photo', storyBlock(m.title, [m.text], 'One more star on the list.', m.teaser), photoFrames(fmt)));
  });
  pages.push(...spread(fmt, ending.file, 'photo', storyBlock(ending.title, ending.text, ending.star), photoFrames(fmt)));
  pages.push(memoriesPage());
  if (pages.length !== 30) throw new Error(`expected 30 pages, got ${pages.length}`);
  return pages;
}

function covers() {
  const art = findArt(cover.file);
  const bg = art
    ? `<img class="art" style="left:0;width:100%" src="${fileUrl(art)}">`
    : `<div class="trim" style="display:flex;align-items:flex-end;justify-content:center;gap:2rem;padding-bottom:12rem">
         <img class="char" style="width:26rem" src="${fileUrl(path.join(ROOT, 'characters/biscuit-sitting.png'))}">
         <img class="char" style="width:28rem" src="${fileUrl(path.join(ROOT, 'characters/pip-waving.png'))}"></div>`;
  const front = page('right', 'paper cv', `${bg}<div class="trim">
    <div class="t"><div class="n">${possessive(esc(NAME))}</div><div class="m">Christmas Missions</div><div class="s">12 magical things to do together</div></div>
    ${YEAR ? `<div class="y">Christmas ${esc(YEAR)}</div>` : ''}</div>`);
  const back = page('left', 'paper back', `<div class="trim"><div class="blurb">
    Santa’s sleigh runs on <b>Christmas Spirit</b>, and this year it needs a special helper.<br><br>
    Join ${esc(NAME)}, Biscuit and Pip the Elf on <b>12 Christmas missions</b>. Do each one together, stick in a photo of the moment, and fill the list with stars before Christmas Eve.</div>
    <div class="content" style="inset:auto 0 9rem 0"><img class="char" style="width:26rem" src="${fileUrl(path.join(ROOT, 'characters/biscuit-standing.png'))}"></div></div>`);
  return [front, back];
}

// ---------- render ----------
async function render(browser, fmt, pages, out) {
  const tmp = path.join(ROOT, `.tmp-${path.basename(out, '.pdf')}.html`);
  fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${css(fmt)}</style></head><body>${pages.join('\n')}</body></html>`);
  const pg = await browser.newPage();
  await pg.goto(fileUrl(tmp));
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForFunction(() => [...document.images].every((i) => i.complete));
  const low = await pg.evaluate((spreadIn) => {
    const seen = {};
    for (const i of document.querySelectorAll('img.art')) {
      const dpi = Math.round(i.naturalWidth / spreadIn);
      if (dpi < 250) seen[decodeURIComponent(i.src.split('/').pop())] = dpi;
    }
    return seen;
  }, 2 * fmt.trimIn);
  const P = fmt.trimIn * 25.4 + 2 * fmt.bleedMm;
  await pg.pdf({ path: out, width: `${P}mm`, height: `${P}mm`, printBackground: true, preferCSSPageSize: true });
  await pg.close();
  fs.unlinkSync(tmp);
  console.log('  ✓', path.relative(path.dirname(ROOT), out));
  for (const [f, dpi] of Object.entries(low)) console.log(`    ! ${f}: ~${dpi} dpi at ${fmt.trimIn}in (upscale for print)`);
}

(async () => {
  writePrompts();
  if (args.includes('--prompts')) return;
  const { chromium } = require('playwright');
  const slug = NAME.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const outDir = path.join(path.dirname(ROOT), 'output', 'storybook', slug);
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  for (const fmt of FORMATS) {
    await render(browser, fmt, interior(fmt), path.join(outDir, `gelato-${fmt.id}-interior-30p.pdf`));
  }
  for (const size of [8, 11]) {
    await render(browser, { trimIn: size, bleedMm: COVER_BLEED }, covers(), path.join(outDir, `gelato-${size}x${size}-cover-front-back.pdf`));
  }
  const dig = { id: 'digital', trimIn: 8, bleedMm: 0, photo: 'landscape' };
  const [front, back] = covers();
  await render(browser, dig, [front, ...interior(dig), back], path.join(outDir, `digital-${slug}-christmas-missions.pdf`));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
