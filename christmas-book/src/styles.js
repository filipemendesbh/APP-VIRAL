// CSS for the book. 1rem = 1% of the trim width, so every size scales between
// 8x8 and 11x11. Photo frames are the exception: they use real inches.

const { C, snowflake, svg } = require('./art');

const snowTile = (color, opacity) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    svg(
      '0 0 120 120',
      `<g opacity="${opacity}">${snowflake(20, 24, 7, color, 1.3)}${snowflake(84, 70, 9, color, 1.3)}${snowflake(40, 98, 4, color, 1.2)}<circle cx="96" cy="18" r="2" fill="${color}"/><circle cx="62" cy="40" r="1.5" fill="${color}"/><circle cx="10" cy="66" r="1.5" fill="${color}"/></g>`,
    ).replace('<svg class=""', '<svg'),
  );

function css(fmt) {
  const { trimIn, bleedMm, frame } = fmt;
  const trimMm = trimIn * 25.4;
  const pageMm = trimMm + 2 * bleedMm;
  return `
@font-face{font-family:'Mountains of Christmas';font-weight:400;src:url(fonts/MountainsOfChristmas-Regular.ttf)}
@font-face{font-family:'Mountains of Christmas';font-weight:700;src:url(fonts/MountainsOfChristmas-Bold.ttf)}
@font-face{font-family:'Fredoka';font-weight:400;src:url(fonts/Fredoka-Regular.ttf)}
@font-face{font-family:'Fredoka';font-weight:600;src:url(fonts/Fredoka-SemiBold.ttf)}
@font-face{font-family:'Fredoka';font-weight:700;src:url(fonts/Fredoka-Bold.ttf)}
@font-face{font-family:'Patrick Hand';font-weight:400;src:url(fonts/PatrickHand-Regular.ttf)}
@font-face{font-family:'Sniglet';font-weight:800;src:url(fonts/Sniglet-ExtraBold.ttf)}

@page{size:${pageMm}mm ${pageMm}mm;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html{font-size:${(trimMm / 100).toFixed(4)}mm;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:'Fredoka',sans-serif;color:${C.ink};background:#888}
svg{display:block}

.page{position:relative;width:${pageMm}mm;height:${pageMm}mm;overflow:hidden;page-break-after:always;break-after:page;background:${C.cream}}
.page:last-child{page-break-after:auto;break-after:auto}
.trim{position:absolute;left:${bleedMm}mm;top:${bleedMm}mm;width:${trimMm}mm;height:${trimMm}mm}
.snow{background-image:url("${snowTile('#D9C2A0', 0.55)}");background-size:24rem 24rem}
.snow-dark{background-image:url("${snowTile('#FFFFFF', 0.18)}");background-size:24rem 24rem}

/* safe content box: 6rem outer, 8rem gutter */
.safe{position:absolute;top:6rem;bottom:6rem;display:flex;flex-direction:column;align-items:center}
.left .safe{left:6rem;right:8rem}
.right .safe{left:8rem;right:6rem}
.border{position:absolute;inset:3.2rem;border:0.45rem solid ${C.red};border-radius:3rem;pointer-events:none}
.border::after{content:'';position:absolute;inset:0.9rem;border:0.18rem dashed ${C.green};border-radius:2.2rem}
.left .border{right:4.4rem}
.right .border{left:4.4rem}
.corner{position:absolute;width:13rem}
.corner.tl{top:0.6rem;left:0.6rem;transform:rotate(-20deg)}
.corner.br{bottom:0.6rem;right:0.6rem;transform:rotate(160deg)}
.left .corner.tl{left:0.6rem}
.right .corner.br{right:0.6rem}

.ribbon{position:relative;display:inline-block;background:${C.red};color:#fff;font-family:'Sniglet',sans-serif;font-weight:800;font-size:2.5rem;letter-spacing:.25rem;padding:.9rem 3.4rem .7rem;margin-top:1rem}
.ribbon::before,.ribbon::after{content:'';position:absolute;top:.8rem;border:2.2rem solid ${C.redDark};z-index:-1}
.ribbon::before{left:-2.6rem;border-left-color:transparent}
.ribbon::after{right:-2.6rem;border-right-color:transparent}
.ribbon .of{opacity:.8;font-size:1.9rem}

h1.title{font-family:'Mountains of Christmas',cursive;font-weight:700;color:${C.green};font-size:6.6rem;line-height:1;text-align:center;margin:1.6rem 0 .4rem;letter-spacing:-.05rem}
h1.title.big{font-size:9rem}
.illo{width:44rem;height:31rem;margin:.2rem 0}
.illo svg{width:100%;height:100%}

.poem{font-size:2.95rem;line-height:1.36;text-align:center;font-weight:400}
.poem .l2{display:block}
.clue{margin-top:1.8rem;background:#fff;border:.25rem dashed ${C.gold};border-radius:2rem;padding:1.2rem 2.4rem 1.2rem 7.6rem;position:relative;font-family:'Patrick Hand',cursive;font-size:2.65rem;line-height:1.2;color:${C.redDark};width:100%}
.clue .tag{position:absolute;left:1.4rem;top:50%;transform:translateY(-50%);width:5rem;height:5rem}
.clue b{font-family:'Fredoka';font-weight:700;color:${C.green};font-size:1.9rem;letter-spacing:.15rem;display:block;text-transform:uppercase}

.meter{margin-top:auto;display:flex;align-items:center;gap:1.4rem;padding-top:1.2rem}
.meter .lbl{font-family:'Fredoka';font-weight:700;font-size:1.65rem;color:${C.green};letter-spacing:.12rem;text-transform:uppercase;line-height:1.1;text-align:right}
.meter .stars{display:flex;gap:.45rem}
.meter .stars svg{width:3.6rem;height:3.6rem}
.meter .hint{font-family:'Patrick Hand';font-size:1.9rem;color:${C.redDark};line-height:1.05;max-width:13rem}

/* photo page */
.ph-head{text-align:center;margin-top:1rem}
.ph-head .kicker{font-family:'Fredoka';font-weight:700;font-size:1.9rem;letter-spacing:.3rem;color:${C.red};text-transform:uppercase}
.ph-head .t{font-family:'Mountains of Christmas',cursive;font-weight:700;font-size:5rem;color:${C.green};line-height:1.05}
.frame-wrap{margin:auto 0;position:relative}
.frame{position:relative;width:${frame.wIn}in;height:${frame.hIn}in;background:#fff;border-radius:1rem;box-shadow:0 0 0 .5rem #fff,0 0 0 .75rem ${C.gold};display:flex;align-items:center;justify-content:center}
.frame::before{content:'';position:absolute;inset:1.4rem;border:.3rem dashed #E3D3BC;border-radius:.6rem}
.frame .hint{text-align:center;color:#C8B596;font-family:'Patrick Hand';font-size:2.6rem;line-height:1.15;position:relative}
.frame .hint svg{width:9rem;height:9rem;margin:0 auto 1rem}
.frame .hint small{display:block;font-family:'Fredoka';font-size:1.7rem;letter-spacing:.08rem;margin-top:.8rem}
.pc{position:absolute;width:5.5rem;height:5.5rem}
.pc.a{top:-1.2rem;left:-1.2rem}.pc.b{top:-1.2rem;right:-1.2rem;transform:rotate(90deg)}
.pc.c{bottom:-1.2rem;right:-1.2rem;transform:rotate(180deg)}.pc.d{bottom:-1.2rem;left:-1.2rem;transform:rotate(270deg)}
.tape{position:absolute;width:13rem;height:4rem;background:rgba(233,180,76,.55);top:-2.4rem;left:50%;transform:translateX(-50%) rotate(-3deg)}
.ph-foot{width:100%;display:flex;gap:2.4rem;align-items:flex-end;margin-bottom:.6rem}
.lines{flex:1;display:flex;flex-direction:column;gap:2.2rem}
.line{display:flex;align-items:flex-end;gap:1rem;font-family:'Patrick Hand';font-size:2.6rem;color:${C.green};white-space:nowrap}
.line span.fill{flex:1;border-bottom:.22rem solid #CDB89A;height:2.6rem}
.line .split{display:flex;gap:2rem;flex:1}
.line .split>div{display:flex;gap:1rem;flex:1;align-items:flex-end}
.done{display:flex;flex-direction:column;align-items:center;gap:.6rem;font-family:'Fredoka';font-weight:700;font-size:1.6rem;color:${C.red};letter-spacing:.1rem;text-transform:uppercase;text-align:center;line-height:1.1}
.box{width:6rem;height:6rem;border:.45rem solid ${C.red};border-radius:1.2rem;background:#fff}

/* intro letter */
.letter{background:#fff;border-radius:2rem;padding:3.2rem 4rem;box-shadow:0 0 0 .3rem ${C.gold};font-size:2.45rem;line-height:1.38;position:relative;width:100%;margin-top:1rem}
.letter p{margin-bottom:1.2rem}
.letter .greet{font-family:'Patrick Hand';font-size:3.4rem;color:${C.redDark};margin-bottom:.8rem}
.letter .sig{font-family:'Patrick Hand';font-size:2.9rem;color:${C.redDark};line-height:1.1}
.letter .ps{font-family:'Patrick Hand';font-size:2.5rem;color:${C.green};margin:1.2rem 0 0}
.letter .pip{position:absolute;right:-3rem;bottom:-3rem;width:17rem}
.stamp{position:absolute;top:2.4rem;right:3rem;transform:rotate(8deg);background:${C.red};color:#fff;font-family:'Sniglet';font-weight:800;font-size:1.6rem;padding:.8rem 1.6rem;border-radius:.6rem;letter-spacing:.1rem;outline:.25rem dashed #fff;outline-offset:-.8rem}

/* checklist */
.check{width:100%;margin-top:2rem;display:flex;flex-direction:column;gap:.85rem}
.row{display:flex;align-items:center;gap:1.6rem;background:#fff;border-radius:1.6rem;padding:.7rem 1.8rem;box-shadow:0 0 0 .2rem #EADBC6}
.row .num{width:4.2rem;height:4.2rem;border-radius:50%;background:${C.green};color:#fff;font-family:'Sniglet';font-weight:800;font-size:2.2rem;display:flex;align-items:center;justify-content:center;flex:none}
.row:nth-child(even) .num{background:${C.red}}
.row .name{flex:1;font-size:2.4rem;font-weight:600}
.row .ck{width:3.8rem;height:3.8rem;border:.35rem solid ${C.green};border-radius:.8rem;flex:none}
.row .ic{width:6rem;height:4.25rem;flex:none}
.row .ic svg{width:100%;height:100%}

/* title page */
.belongs{font-family:'Mountains of Christmas';font-weight:700;font-size:6.4rem;color:${C.green};text-align:center;line-height:1;margin-top:4rem}
.name-line{font-family:'Patrick Hand';font-size:7rem;color:${C.redDark};text-align:center;border-bottom:.3rem solid #CDB89A;width:72%;min-height:9rem;line-height:9rem;margin:1rem auto 0}
.from{width:80%;margin-top:4rem;display:flex;flex-direction:column;gap:3rem}
.ttl-pip{width:28rem;margin-top:auto}

/* ending */
.cert{width:100%;margin-top:5.2rem;background:#fff;border-radius:2rem;padding:1.6rem 3rem 1.8rem;box-shadow:0 0 0 .5rem ${C.gold},0 0 0 1.1rem #fff,0 0 0 1.35rem ${C.red};text-align:center;position:relative}
.cert .ct{font-family:'Sniglet';font-weight:800;font-size:2.2rem;letter-spacing:.3rem;color:${C.red};text-transform:uppercase}
.cert .cn{font-family:'Patrick Hand';font-size:5rem;color:${C.redDark};border-bottom:.25rem solid #CDB89A;width:80%;margin:.4rem auto 1.2rem;min-height:6.4rem;line-height:6.4rem}
.cert .ch{font-family:'Mountains of Christmas';font-weight:700;font-size:4.4rem;color:${C.green};line-height:1}
.cert .sigs{display:flex;justify-content:space-around;margin-top:2rem;font-family:'Patrick Hand';font-size:3.2rem;color:${C.navy}}
.cert .sigs div{border-top:.2rem solid #CDB89A;padding-top:.4rem;min-width:18rem;font-size:3rem}
.cert .sigs small{display:block;font-family:'Fredoka';font-size:1.5rem;color:#9C8A74;letter-spacing:.1rem;text-transform:uppercase}
.cert .medal{position:absolute;top:-4rem;left:50%;transform:translateX(-50%);width:9rem}

/* memories */
.mem{width:100%;display:flex;flex-direction:column;gap:2.4rem;margin-top:2.4rem}
.mem .q{font-family:'Fredoka';font-weight:600;font-size:2.7rem;color:${C.green}}
.mem .ln{border-bottom:.22rem solid #CDB89A;height:4.8rem}
.bye{font-family:'Mountains of Christmas';font-weight:700;font-size:5.4rem;color:${C.red};margin-top:auto;display:flex;align-items:center;gap:2rem}
.bye svg{width:13rem}

/* covers */
.cover{background:${C.red}}
.cover.back{background:${C.green}}
.cover .safe{left:10rem;right:10rem;top:10rem;bottom:10rem;justify-content:center;color:#fff;text-align:center}
.cv-frame{position:absolute;inset:6.5rem;border:.5rem solid ${C.gold};border-radius:4rem}
.cv-frame::after{content:'';position:absolute;inset:1.2rem;border:.2rem dashed rgba(255,255,255,.6);border-radius:3rem}
.cv-name{font-family:'Mountains of Christmas';font-weight:700;font-size:8.6rem;line-height:1;color:#FFF3D6}
.cv-title{font-family:'Sniglet';font-weight:800;font-size:9.4rem;line-height:.95;color:#fff;text-shadow:0 .7rem 0 ${C.redDark};letter-spacing:-.1rem}
.cv-title span{display:block;color:${C.gold}}
.cv-sub{margin-top:2.4rem;display:inline-block;background:${C.cream};color:${C.green};font-weight:700;font-size:2.7rem;padding:1.2rem 3.4rem;border-radius:5rem}
.cv-art{width:56rem;margin:1rem auto 0}
.cv-year{font-family:'Mountains of Christmas';font-weight:700;font-size:4.6rem;color:${C.gold};margin-top:.8rem}
.cv-pip{width:30rem;height:30rem;border-radius:50%;background:${C.cream};margin:0 auto 3rem;padding:3rem 4rem 0;overflow:hidden}
.cv-blurb{font-size:2.8rem;line-height:1.4;max-width:62rem;margin:0 auto}
.cv-blurb b{color:${C.gold}}
`;
}

module.exports = { css };
