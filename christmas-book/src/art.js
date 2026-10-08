// Flat vector illustrations (inline SVG) used across the book.

const C = {
  red: '#C8352E',
  redDark: '#8E1F1B',
  green: '#2F6B4F',
  greenDark: '#1E4A36',
  greenLight: '#6FA77B',
  gold: '#E9B44C',
  goldDark: '#C08A22',
  cream: '#FFF8EE',
  brown: '#8B5A3C',
  brownLight: '#C98B5B',
  pink: '#F2B5AE',
  navy: '#22345A',
  sky: '#CFE3EF',
  white: '#FFFFFF',
  ink: '#3B2A22',
};

function starPath(cx, cy, r1, r2, n = 5, rot = -90) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? r1 : r2;
    const a = ((rot + (i * 180) / n) * Math.PI) / 180;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join('L')}Z`;
}

const star = (cx, cy, r, fill = C.gold, stroke = 'none', sw = 0) =>
  `<path d="${starPath(cx, cy, r, r * 0.45)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`;

function snowflake(cx, cy, r, color = C.white, sw = 1.6) {
  let s = `<g stroke="${color}" stroke-width="${sw}" stroke-linecap="round" fill="none">`;
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    s += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(2)}" y2="${y.toFixed(2)}"/>`;
    const bx = cx + r * 0.6 * Math.cos(a);
    const by = cy + r * 0.6 * Math.sin(a);
    for (const d of [-0.6, 0.6]) {
      s += `<line x1="${bx.toFixed(2)}" y1="${by.toFixed(2)}" x2="${(bx + r * 0.32 * Math.cos(a + d)).toFixed(2)}" y2="${(by + r * 0.32 * Math.sin(a + d)).toFixed(2)}"/>`;
    }
  }
  return s + '</g>';
}

const sparkle = (x, y, r, c = C.gold) =>
  `<path d="M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z" fill="${c}"/>`;

function holly(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M0 0 C-8 -6 -18 -4 -26 -10 C-22 -2 -26 4 -22 10 C-14 6 -6 8 0 0Z" fill="${C.green}"/>
    <path d="M0 0 C8 -6 18 -4 26 -10 C22 -2 26 4 22 10 C14 6 6 8 0 0Z" fill="${C.greenLight}"/>
    <circle cx="-4" cy="-2" r="5" fill="${C.red}"/><circle cx="5" cy="-3" r="5" fill="${C.red}"/><circle cx="0" cy="5" r="5" fill="${C.redDark}"/>
  </g>`;
}

function present(x, y, w, h, box, ribbon) {
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${box}"/>
    <rect x="${x - 2}" y="${y}" width="${w + 4}" height="${h * 0.22}" rx="3" fill="${box}" opacity=".85"/>
    <rect x="${x + w / 2 - 4}" y="${y}" width="8" height="${h}" fill="${ribbon}"/>
    <path d="M${x + w / 2} ${y} C${x + w / 2 - 16} ${y - 16} ${x + w / 2 - 22} ${y - 2} ${x + w / 2} ${y}Z M${x + w / 2} ${y} C${x + w / 2 + 16} ${y - 16} ${x + w / 2 + 22} ${y - 2} ${x + w / 2} ${y}Z" fill="${ribbon}"/>
  </g>`;
}

const svg = (vb, body, cls = '') => `<svg class="${cls}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

// Soft round backdrop shared by the mission illustrations
const backdrop = (fill = '#F6E7D2') =>
  `<ellipse cx="120" cy="88" rx="104" ry="74" fill="${fill}"/>` +
  snowflake(30, 30, 9, '#E2CFB4', 1.4) + snowflake(212, 40, 7, '#E2CFB4', 1.4) + snowflake(204, 140, 8, '#E2CFB4', 1.4) +
  sparkle(40, 136, 6) + sparkle(214, 96, 5);

const illos = {
  letter: () => svg('0 0 240 170', backdrop() + `
    <g transform="rotate(-6 120 95)">
      <rect x="62" y="56" width="116" height="80" rx="6" fill="${C.white}" stroke="${C.ink}" stroke-width="2.5"/>
      <path d="M62 62 L120 104 L178 62" fill="none" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M62 132 L104 96 M178 132 L136 96" stroke="${C.ink}" stroke-width="2" opacity=".35"/>
      <circle cx="120" cy="104" r="11" fill="${C.red}"/>
      <path d="M120 109 l-5 -5 a3.2 3.2 0 0 1 5 -4 a3.2 3.2 0 0 1 5 4z" fill="${C.white}"/>
      <rect x="152" y="66" width="18" height="22" rx="2" fill="${C.green}" stroke="${C.white}" stroke-width="2" stroke-dasharray="2 2"/>
      ${star(161, 77, 6, C.gold)}
    </g>
    <text x="78" y="50" font-family="Patrick Hand" font-size="15" fill="${C.redDark}" transform="rotate(-8 78 50)">To: Santa Claus, North Pole</text>
    <g transform="rotate(35 190 120)">
      <rect x="150" y="114" width="70" height="12" rx="2" fill="${C.gold}"/>
      <rect x="208" y="114" width="12" height="12" fill="${C.pink}"/>
      <rect x="203" y="114" width="5" height="12" fill="#BFBFBF"/>
      <path d="M150 114 L136 120 L150 126Z" fill="${C.brownLight}"/><path d="M140 118.3 L136 120 L140 121.7Z" fill="${C.ink}"/>
    </g>`),

  tree: () => svg('0 0 240 170', backdrop() + `
    <rect x="112" y="136" width="16" height="16" fill="${C.brown}"/>
    <path d="M120 26 L66 140 H174Z" fill="${C.green}"/>
    <path d="M120 26 L84 102 H156Z" fill="${C.greenLight}" opacity=".35"/>
    <path d="M78 116 Q120 132 162 112 M92 84 Q120 98 148 80 M102 58 Q120 66 136 54" stroke="${C.gold}" stroke-width="2.5" fill="none"/>
    <circle cx="96" cy="120" r="6" fill="${C.red}"/><circle cx="140" cy="124" r="6" fill="${C.gold}"/>
    <circle cx="120" cy="104" r="6" fill="${C.white}"/><circle cx="106" cy="88" r="5" fill="${C.gold}"/>
    <circle cx="136" cy="86" r="5" fill="${C.red}"/><circle cx="118" cy="66" r="4.5" fill="${C.red}"/>
    <circle cx="154" cy="128" r="4" fill="${C.white}"/><circle cx="82" cy="130" r="4" fill="${C.white}"/>
    ${star(120, 24, 13, C.gold, C.goldDark, 1.5)}
    ${present(40, 128, 30, 24, C.red, C.gold)}${present(170, 122, 34, 30, C.gold, C.red)}${present(146, 138, 22, 14, C.greenLight, C.white)}`),

  ornament: () => svg('0 0 240 170', backdrop() + `
    <path d="M120 10 V44" stroke="${C.ink}" stroke-width="2"/>
    <rect x="110" y="40" width="20" height="12" rx="2" fill="${C.goldDark}"/>
    <circle cx="120" cy="96" r="46" fill="${C.red}"/>
    <path d="M76 84 Q120 100 164 84 L166 98 Q120 114 74 98Z" fill="${C.white}"/>
    ${star(100, 91, 5, C.red)}${star(120, 95, 5, C.green)}${star(140, 91, 5, C.red)}
    <path d="M84 120 Q120 134 156 120" stroke="${C.gold}" stroke-width="4" fill="none" stroke-dasharray="1 7" stroke-linecap="round"/>
    <ellipse cx="102" cy="70" rx="10" ry="6" fill="${C.white}" opacity=".45" transform="rotate(-30 102 70)"/>
    <text x="120" y="78" text-anchor="middle" font-family="Patrick Hand" font-size="12" fill="${C.white}">20__</text>
    <g transform="translate(176 104)"><rect x="0" y="0" width="22" height="40" rx="4" fill="${C.white}" stroke="${C.ink}" stroke-width="2"/><rect x="5" y="-10" width="12" height="11" rx="2" fill="${C.gold}"/><text x="11" y="25" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="8" fill="${C.ink}">GLUE</text></g>
    <g transform="translate(38 110)">${sparkle(6, 6, 7, C.gold)}${sparkle(22, 20, 5, C.red)}${sparkle(4, 30, 4, C.green)}</g>`),

  lights: () => svg('0 0 240 170', `
    <rect x="12" y="10" width="216" height="150" rx="74" fill="${C.navy}"/>
    ${star(54, 40, 4, C.gold)}${star(182, 30, 3, C.gold)}${star(200, 64, 3, C.gold)}${star(36, 80, 3, C.gold)}
    <circle cx="180" cy="44" r="12" fill="#F6E7B0"/><circle cx="186" cy="40" r="11" fill="${C.navy}"/>
    <path d="M12 140 Q120 120 228 140 V150 Q120 172 12 150Z" fill="${C.white}"/>
    <rect x="72" y="78" width="96" height="60" fill="${C.redDark}"/>
    <path d="M62 82 L120 44 L178 82Z" fill="${C.greenDark}"/>
    <path d="M62 82 L120 44 L178 82" fill="none" stroke="${C.white}" stroke-width="5" stroke-linejoin="round"/>
    <rect x="110" y="104" width="20" height="34" rx="2" fill="${C.gold}"/>
    <rect x="82" y="92" width="18" height="18" fill="#F6E7B0"/><rect x="140" y="92" width="18" height="18" fill="#F6E7B0"/>
    <path d="M82 101 H100 M91 92 V110 M140 101 H158 M149 92 V110" stroke="${C.redDark}" stroke-width="2"/>
    <circle cx="120" cy="114" r="5" fill="none" stroke="${C.green}" stroke-width="3"/>
    <path d="M66 84 Q80 96 94 74 Q107 66 120 52 Q133 66 146 74 Q160 96 174 84" fill="none" stroke="${C.ink}" stroke-width="1.2"/>
    ${[[72, 88, C.gold], [86, 85, C.red], [98, 72, C.greenLight], [110, 61, C.gold], [130, 61, C.red], [142, 72, C.gold], [154, 85, C.greenLight], [168, 88, C.red]]
      .map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="7" fill="${c}" opacity=".3"/><ellipse cx="${x}" cy="${y + 2}" rx="3" ry="4" fill="${c}"/>`).join('')}
    <path d="M40 138 L40 120 M40 120 Q40 110 48 110 Q56 110 56 118" stroke="${C.red}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M40 132 l0 -6 M40 122 l0 -4" stroke="${C.white}" stroke-width="5"/>
    <path d="M196 138 L196 120 M196 120 Q196 110 188 110 Q180 110 180 118" stroke="${C.red}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M196 132 l0 -6 M196 122 l0 -4" stroke="${C.white}" stroke-width="5"/>`),

  snowman: () => svg('0 0 240 170', `
    <ellipse cx="120" cy="88" rx="104" ry="74" fill="${C.sky}"/>
    ${snowflake(40, 40, 9)}${snowflake(204, 52, 7)}${snowflake(58, 104, 6)}${snowflake(190, 110, 8)}
    <path d="M24 140 Q120 118 216 140 Q200 160 120 162 Q40 160 24 140Z" fill="${C.white}"/>
    <circle cx="120" cy="124" r="32" fill="${C.white}" stroke="#B7CFDD" stroke-width="2"/>
    <circle cx="120" cy="78" r="23" fill="${C.white}" stroke="#B7CFDD" stroke-width="2"/>
    <rect x="102" y="38" width="36" height="22" rx="2" fill="${C.ink}"/><rect x="94" y="56" width="52" height="7" rx="3" fill="${C.ink}"/>
    <rect x="102" y="50" width="36" height="5" fill="${C.red}"/>
    <circle cx="112" cy="74" r="2.6" fill="${C.ink}"/><circle cx="128" cy="74" r="2.6" fill="${C.ink}"/>
    <path d="M120 80 L140 84 L120 86Z" fill="#EE8A33"/>
    <path d="M110 90 Q120 96 130 90" stroke="${C.ink}" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="0.5 4"/>
    <path d="M98 98 Q120 106 142 98 L142 106 Q120 114 98 106Z" fill="${C.red}"/>
    <path d="M132 104 L138 132 L128 132 L124 106Z" fill="${C.red}"/>
    <path d="M128 126 h10 M129 130 h9" stroke="${C.white}" stroke-width="1.5"/>
    <circle cx="120" cy="118" r="3" fill="${C.ink}"/><circle cx="120" cy="132" r="3" fill="${C.ink}"/>
    <path d="M90 116 L62 98 M70 103 L64 92 M150 116 L178 98 M170 103 L180 94" stroke="${C.brown}" stroke-width="3" stroke-linecap="round"/>`),

  cocoa: () => svg('0 0 240 170', backdrop() + `
    <path d="M86 44 q-8 -10 0 -20 q8 -10 0 -20 M106 44 q-8 -10 0 -20 q8 -10 0 -20" stroke="#D8C2A6" stroke-width="3.5" fill="none" stroke-linecap="round" transform="translate(2 8)"/>
    <path d="M134 98 h12 a16 16 0 0 1 0 32 h-12" stroke="${C.red}" stroke-width="9" fill="none"/>
    <path d="M60 60 H140 L134 136 Q132 148 120 148 H80 Q68 148 66 136Z" fill="${C.red}"/>
    <path d="M66 96 H136 L135 108 H67Z" fill="${C.white}"/>
    ${[78, 94, 110, 126].map((x, i) => star(x, 102, 4, i % 2 ? C.green : C.red)).join('')}
    <ellipse cx="100" cy="60" rx="40" ry="8" fill="#6B3E26"/>
    <rect x="76" y="50" width="13" height="11" rx="3" fill="${C.white}"/><rect x="96" y="48" width="13" height="11" rx="3" fill="#FCE4E1"/><rect x="113" y="52" width="13" height="10" rx="3" fill="${C.white}"/>
    <g transform="translate(160 86)">
      <path d="M0 18 H52 L46 66 H6Z" fill="${C.white}"/>
      <path d="M4 18 h8 l2 48 h-8z M24 18 h8 v48 h-8z M44 18 h8 l-6 48 h-4z" fill="${C.red}"/>
      ${[[6, 14], [18, 8], [30, 12], [42, 8], [50, 15], [12, 2], [26, 0], [38, 2]].map(([x, y]) => `<circle cx="${x}" cy="${y + 6}" r="7" fill="#FFF3D2" stroke="#E8D3A0" stroke-width="1"/>`).join('')}
    </g>`),

  gingerbread: () => svg('0 0 240 170', backdrop() + `
    <rect x="66" y="74" width="100" height="72" fill="${C.brownLight}"/>
    <path d="M54 80 L116 30 L178 80Z" fill="${C.brown}"/>
    <path d="M54 80 L116 30 L178 80" fill="none" stroke="${C.white}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M60 80 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0" fill="none" stroke="${C.white}" stroke-width="4" stroke-linecap="round"/>
    <rect x="104" y="108" width="24" height="38" rx="12" fill="${C.red}"/>
    <rect x="76" y="94" width="20" height="18" rx="2" fill="#F6E7B0" stroke="${C.white}" stroke-width="3"/>
    <rect x="136" y="94" width="20" height="18" rx="2" fill="#F6E7B0" stroke="${C.white}" stroke-width="3"/>
    ${[[96, 58, C.red], [116, 46, C.green], [136, 58, C.gold], [80, 132, C.green], [152, 132, C.red]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="5" fill="${c}"/>`).join('')}
    <g transform="translate(186 92)">
      <circle cx="0" cy="0" r="12" fill="${C.brownLight}"/>
      <path d="M-10 12 h20 l14 6 q4 6 -2 8 l-12 -4 l4 22 q0 6 -6 6 l-8 -16 l-8 16 q-6 0 -6 -6 l4 -22 l-12 4 q-6 -2 -2 -8z" fill="${C.brownLight}"/>
      <circle cx="-4" cy="-2" r="1.8" fill="${C.ink}"/><circle cx="4" cy="-2" r="1.8" fill="${C.ink}"/>
      <path d="M-4 4 q4 3 8 0" stroke="${C.white}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <circle cx="0" cy="22" r="2" fill="${C.red}"/><circle cx="0" cy="30" r="2" fill="${C.green}"/>
    </g>
    <g transform="translate(36 98) rotate(-15)"><path d="M0 50 V12 a10 10 0 0 1 20 0" stroke="${C.red}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M0 46 v-6 M0 32 v-6 M0 18 l4 -8 M12 3 l6 2" stroke="${C.white}" stroke-width="7"/></g>`),

  kindness: () => svg('0 0 240 170', backdrop() + `
    <path d="M120 72 C120 72 96 42 76 52 C56 62 62 92 120 132 C178 92 184 62 164 52 C144 42 120 72 120 72Z" fill="${C.red}" transform="translate(0 -26)"/>
    <ellipse cx="102" cy="36" rx="8" ry="5" fill="${C.white}" opacity=".45" transform="rotate(-30 102 36)"/>
    <g transform="translate(70 100)">
      <rect x="0" y="0" width="100" height="56" rx="4" fill="${C.brownLight}"/>
      <rect x="-4" y="-6" width="108" height="12" rx="3" fill="${C.brown}"/>
      <text x="50" y="36" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="15" fill="${C.white}">FOR YOU</text>
    </g>
    <g transform="translate(92 80)"><circle cx="0" cy="0" r="13" fill="#B07A52"/><circle cx="-10" cy="-10" r="5" fill="#B07A52"/><circle cx="10" cy="-10" r="5" fill="#B07A52"/><circle cx="-4" cy="-2" r="1.8" fill="${C.ink}"/><circle cx="4" cy="-2" r="1.8" fill="${C.ink}"/><ellipse cx="0" cy="4" rx="4" ry="3" fill="#E5C3A0"/></g>
    <g transform="translate(140 74)"><rect x="-10" y="0" width="20" height="22" rx="2" fill="${C.green}"/><rect x="-12" y="-4" width="24" height="6" rx="2" fill="${C.greenDark}"/><rect x="-2" y="-4" width="4" height="26" fill="${C.gold}"/></g>
    ${sparkle(58, 32, 7)}${sparkle(186, 30, 6, C.red)}`),

  carols: () => svg('0 0 240 170', backdrop() + `
    <g transform="translate(120 104)">
      <path d="M-70 -34 Q-36 -46 0 -34 Q36 -46 70 -34 V40 Q36 28 0 40 Q-36 28 -70 40Z" fill="${C.green}"/>
      <path d="M-64 -36 Q-32 -46 0 -34 V36 Q-32 24 -64 34Z" fill="${C.white}"/>
      <path d="M64 -36 Q32 -46 0 -34 V36 Q32 24 64 34Z" fill="${C.cream}"/>
      <path d="M-56 -18 H-8 M-56 -8 H-8 M-56 2 H-8 M-56 12 H-8 M-56 22 H-8 M8 -18 H56 M8 -8 H56 M8 2 H56 M8 12 H56 M8 22 H56" stroke="#D9C9B6" stroke-width="1.3"/>
      <circle cx="-44" cy="-4" r="3.5" fill="${C.ink}"/><path d="M-40.5 -4 V-20" stroke="${C.ink}" stroke-width="1.5"/>
      <circle cx="-24" cy="2" r="3.5" fill="${C.ink}"/><path d="M-20.5 2 V-14" stroke="${C.ink}" stroke-width="1.5"/>
      <circle cx="24" cy="-8" r="3.5" fill="${C.ink}"/><path d="M27.5 -8 V-24 L46 -20 V-2" stroke="${C.ink}" stroke-width="1.5" fill="none"/><circle cx="42.5" cy="-2" r="3.5" fill="${C.ink}"/>
    </g>
    <g fill="${C.red}">
      <circle cx="60" cy="46" r="6"/><path d="M65 46 V20 l10 4" stroke="${C.red}" stroke-width="3" fill="none"/>
      <circle cx="176" cy="40" r="6"/><circle cx="196" cy="34" r="6"/><path d="M181 40 V14 L201 8 V34" stroke="${C.red}" stroke-width="3" fill="none"/>
    </g>
    <g transform="translate(120 38)"><path d="M-14 12 Q-14 -10 0 -12 Q14 -10 14 12 L18 16 H-18Z" fill="${C.gold}"/><circle cx="0" cy="19" r="4" fill="${C.goldDark}"/><path d="M-6 -14 q6 -8 12 0" stroke="${C.red}" stroke-width="3" fill="none"/></g>`),

  wrap: () => svg('0 0 240 170', backdrop() + `
    ${present(62, 92, 66, 56, C.red, C.gold)}
    ${present(136, 104, 52, 44, C.green, C.white)}
    ${present(84, 52, 40, 36, C.gold, C.red)}
    <g transform="translate(160 84) rotate(12)"><rect x="0" y="0" width="22" height="14" rx="2" fill="${C.white}" stroke="${C.ink}" stroke-width="1.5"/><text x="11" y="10" text-anchor="middle" font-family="Patrick Hand" font-size="7" fill="${C.redDark}">To: ♥</text></g>
    <g transform="translate(46 140)"><circle cx="0" cy="0" r="14" fill="#D8E6EE" stroke="${C.ink}" stroke-width="1.5"/><circle cx="0" cy="0" r="6" fill="${C.cream}" stroke="${C.ink}" stroke-width="1.5"/><path d="M12 -7 L34 -16 L34 -6 L14 2" fill="#D8E6EE" opacity=".8"/></g>
    <g transform="translate(196 64)"><path d="M0 0 C-14 -14 -18 0 0 0 C14 -14 18 0 0 0Z" fill="${C.red}"/><circle cx="0" cy="0" r="3.5" fill="${C.redDark}"/></g>`),

  cookies: () => svg('0 0 240 170', backdrop() + `
    <rect x="42" y="64" width="156" height="86" rx="8" fill="#A9B4BC"/>
    <rect x="48" y="70" width="144" height="74" rx="5" fill="#C9D2D8"/>
    <path d="${starPath(82, 96, 20, 10)}" fill="#E7B87A" stroke="${C.white}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M136 76 L154 104 H146 L158 124 H114 L126 104 H118Z" fill="#E7B87A" stroke="${C.green}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="96" cy="126" r="14" fill="#E7B87A" stroke="${C.red}" stroke-width="3"/>
    ${snowflake(96, 126, 8, C.white, 1.6)}
    <g transform="translate(176 118)"><circle cx="0" cy="-10" r="8" fill="#E7B87A"/><path d="M-8 -2 h16 l8 4 q2 4 -2 5 l-6 -2 l2 14 l-5 4 l-5 -10 l-5 10 l-5 -4 l2 -14 l-6 2 q-4 -1 -2 -5z" fill="#E7B87A"/><circle cx="-3" cy="-11" r="1.4" fill="${C.ink}"/><circle cx="3" cy="-11" r="1.4" fill="${C.ink}"/></g>
    ${[[66, 140, C.red], [120, 140, C.green], [150, 86, C.red], [112, 90, C.gold]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="2.5" fill="${c}"/>`).join('')}
    <g transform="translate(126 34) rotate(-12)"><rect x="-44" y="-9" width="88" height="18" rx="9" fill="${C.brownLight}"/><rect x="-62" y="-4" width="20" height="8" rx="4" fill="${C.brown}"/><rect x="42" y="-4" width="20" height="8" rx="4" fill="${C.brown}"/></g>`),

  eve: () => svg('0 0 240 170', backdrop() + `
    <ellipse cx="100" cy="132" rx="66" ry="16" fill="${C.white}" stroke="#D9C9B6" stroke-width="2"/>
    <ellipse cx="100" cy="129" rx="48" ry="9" fill="${C.cream}"/>
    ${[[78, 118], [100, 114], [122, 118], [90, 106]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="15" ry="7" fill="#D99A5B"/><circle cx="${x - 5}" cy="${y - 1}" r="1.8" fill="#5A3420"/><circle cx="${x + 4}" cy="${y + 1}" r="1.8" fill="#5A3420"/>`).join('')}
    <path d="M54 50 H82 L78 124 Q78 130 72 130 H64 Q58 130 58 124Z" fill="${C.white}" stroke="#C9D2D8" stroke-width="2"/>
    <path d="M56 66 H80" stroke="#E7EEF2" stroke-width="2"/>
    <path d="M138 122 L148 108 L176 100 L178 106 L150 124Z" fill="#EE8A33"/><path d="M174 98 l12 -8 M176 102 l14 -2 M174 104 l10 6" stroke="${C.green}" stroke-width="3" stroke-linecap="round"/>
    <g transform="translate(176 22)">
      <path d="M0 0 H26 V40 Q26 60 6 60 H-14 Q-24 60 -24 50 Q-24 40 -12 40 H0Z" fill="${C.red}"/>
      <rect x="-4" y="-6" width="34" height="14" rx="4" fill="${C.white}"/>
      ${star(10, 30, 6, C.gold)}
    </g>
    ${sparkle(40, 96, 5)}${sparkle(150, 70, 4)}${sparkle(196, 140, 6)}`),
};

function pip(extra = '') {
  // Pip the elf (waving)
  return svg('0 0 200 220', `
    <path d="M58 72 Q100 -20 150 40 Q164 56 172 46" fill="none"/>
    <path d="M52 86 Q70 10 128 18 Q160 22 176 6 Q170 40 146 60 L150 86Z" fill="${C.green}"/>
    <circle cx="178" cy="6" r="10" fill="${C.white}"/>
    <ellipse cx="100" cy="112" rx="44" ry="42" fill="#F6D2B8"/>
    <path d="M58 102 L30 86 L54 124Z M142 102 L170 86 L146 124Z" fill="#F6D2B8"/>
    <rect x="48" y="78" width="104" height="18" rx="9" fill="${C.red}"/>
    ${[60, 80, 100, 120, 140].map((x) => `<circle cx="${x}" cy="87" r="2.5" fill="${C.gold}"/>`).join('')}
    <ellipse cx="84" cy="114" rx="5" ry="6.5" fill="${C.ink}"/><ellipse cx="116" cy="114" rx="5" ry="6.5" fill="${C.ink}"/>
    <circle cx="86" cy="111" r="1.8" fill="${C.white}"/><circle cx="118" cy="111" r="1.8" fill="${C.white}"/>
    <ellipse cx="72" cy="128" rx="8" ry="5" fill="${C.pink}"/><ellipse cx="128" cy="128" rx="8" ry="5" fill="${C.pink}"/>
    <path d="M88 134 Q100 146 112 134" stroke="${C.ink}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M60 154 H140 L150 214 H50Z" fill="${C.green}"/>
    <path d="M60 154 L100 176 L140 154" fill="${C.red}"/>
    <rect x="52" y="190" width="96" height="10" fill="${C.ink}"/><rect x="92" y="188" width="16" height="14" rx="2" fill="${C.gold}"/>
    <path d="M140 162 Q170 150 176 120" stroke="${C.green}" stroke-width="14" fill="none" stroke-linecap="round"/>
    <circle cx="177" cy="114" r="9" fill="#F6D2B8"/>
    <path d="M60 162 Q42 182 52 200" stroke="${C.green}" stroke-width="14" fill="none" stroke-linecap="round"/>
    ${extra}`, 'pip');
}

function sleigh() {
  return svg('0 0 300 170', `
    <ellipse cx="150" cy="88" rx="146" ry="80" fill="${C.cream}"/>
    ${snowflake(40, 40, 8, '#E2CFB4', 1.4)}${snowflake(268, 128, 7, '#E2CFB4', 1.4)}${snowflake(30, 120, 5, '#E2CFB4', 1.2)}
    <path d="M20 150 Q150 128 280 150 Q240 168 150 168 Q60 168 20 150Z" fill="${C.white}"/>
    <g transform="translate(18 14)">
    <path d="M30 118 H220 Q250 118 256 96" stroke="${C.goldDark}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M60 118 V104 M190 118 V104" stroke="${C.goldDark}" stroke-width="5"/>
    <path d="M40 56 H190 Q214 56 214 80 V96 Q214 106 204 106 H64 Q40 106 36 82Z" fill="${C.red}"/>
    <path d="M40 56 Q24 56 22 40 Q34 44 44 40" fill="${C.red}"/>
    <path d="M56 74 H194" stroke="${C.gold}" stroke-width="4"/>
    ${present(78, 26, 34, 30, C.green, C.gold)}${present(120, 34, 28, 22, C.gold, C.red)}${present(154, 20, 30, 36, C.white, C.red)}
    ${star(250, 40, 10)}${star(276, 70, 7)}${star(228, 18, 6)}
    <path d="M256 96 Q262 60 290 50" stroke="${C.gold}" stroke-width="2" fill="none" stroke-dasharray="2 5"/></g>`, 'sleigh');
}

const icons = {
  letter: illos.letter, tree: illos.tree, ornament: illos.ornament, lights: illos.lights,
  snowman: illos.snowman, cocoa: illos.cocoa, gingerbread: illos.gingerbread, kindness: illos.kindness,
  carols: illos.carols, wrap: illos.wrap, cookies: illos.cookies, eve: illos.eve,
};

module.exports = { C, star, starPath, snowflake, sparkle, holly, present, svg, illos: icons, pip, sleigh };
