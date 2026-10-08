# Oliver's Christmas Missions (edição storybook) 🎄

Nova versão no estilo das referências: **ilustração de página dupla**, texto no canto superior esquerdo, moldura de foto no canto superior direito, e os mesmos personagens em todas as cenas.

## Personagens (consistência)
Model sheets em `references/`. Todo prompt repete a mesma descrição e anexa as 3 referências:
- **Oliver**: menino de 5 anos, cabelo castanho ondulado, suéter creme com faixa Fair Isle vermelha (renas, árvores, flocos), jeans cinza dobrado, botas marrons. Na rua: casaco azul-marinho aberto e gorro vermelho.
- **Biscuit**: filhote de beagle tricolor.
- **Pip**: elfo pequeno, gorro verde com pompom vinho, cachecol vinho, suéter creme com cinto verde. **Ele se esconde em todas as cenas** ("Can you find Pip?"), uma brincadeira de achar que deixa o livro mais interativo.

## História (cada página puxa a próxima)
Começa com a caixa do Pip na porta. São 12 missões, e cada uma termina com **"★ One more star on the list."** e um gancho em itálico para a próxima. Termina na manhã de Natal.
Textos em `storybook/story.js`; prompts de cada cena em `storybook/PROMPTS.md`.

| Págs. | Conteúdo |
|---|---|
| 1 | "This book belongs to" (Pip acenando) |
| 2–3 | Abertura "The Box on the Doorstep" + lista das 12 missões presa na parede |
| 4–27 | 12 missões: Deck the House, Dear Santa, The Perfect Tree, Made by Me, Lights on Our Street, Snow Day!, Cocoa and a Movie, The Gingerbread House, A Kind Heart, Sing Along, It's a Wrap, Cookies for Santa |
| 28–29 | Christmas Morning + foto |
| 30 | My Christmas Memories (Biscuit com as luzinhas) |

## Fotos
- 8×8: 1 foto 4×6 deitada
- 11×11: três versões do arquivo, `landscape` (1 deitada), `portrait` (1 em pé) e `two-portrait` (2 em pé)

A janela tem 1,5 mm de folga em volta de cada foto 4×6.

## Como gerar
1. Gere as ilustrações com os prompts de `storybook/PROMPTS.md` (sempre anexando as 3 imagens de `references/`). Salve em `storybook/illustrations/` com o nome indicado (`spread-00-intro.jpg`, `spread-01.jpg` … `spread-13-christmas-morning.jpg`, `cover.jpg`).
2. `npm install` e depois `node storybook/build.js --name "Oliver" --year 2026 --from "Grandma"`
3. Saída em `output/storybook/<nome>/`: miolos da Gelato (8×8 e 11×11 nas 3 variações), capas e PDF digital. Ilustração que ainda não existe aparece como placeholder com o nome do arquivo.
4. O build avisa quando uma imagem está com menos de 250 dpi. Para imprimir são precisos ~4800×2450 px por página dupla no 8×8 e ~6600×3350 px no 11×11. Use um upscaler (ex.: Upscayl) antes de imprimir.

---

# Versão 1 (vetorial, sem ilustração de cena)

# The Christmas Spirit Missions 🎄

Livro infantil interativo de Natal: **12 missões** para fazer junto com quem recebe o livro, com espaço para colar a foto de cada momento.
Feito para impressão na **Gelato** (capa dura 8×8 e 11×11) e também em **PDF digital**.

## A história

Pip, um elfo do Papai Noel, escreve para a criança: o trenó do Papai Noel voa com **Espírito de Natal**, e o "Spirit Meter" (medidor) está vazio.
Cada missão cumprida acende uma estrela. No fim de cada missão o Pip deixa uma **pista rimada** que leva à próxima missão, então a história segue de página em página até a manhã de Natal.

| # | Missão | Pista que leva à próxima |
|---|---|---|
| 1 | Write a Letter to Santa | algo alto e verde para brilhar → árvore |
| 2 | Decorate the Christmas Tree | falta algo feito por VOCÊ → enfeite |
| 3 | Make a Handmade Ornament | ver as luzes da cidade → luzes |
| 4 | Go See the Christmas Lights | algo fofo e branco → boneco de neve |
| 5 | Build a Snowman (ou flocos de papel) | bochechas geladas → chocolate quente |
| 6 | Hot Cocoa & a Christmas Movie | uma casinha que se come → gingerbread |
| 7 | Build a Gingerbread House | o presente mais doce é a gentileza → gentileza |
| 8 | Do a Kindness Mission | encher o ar de música → canções |
| 9 | Sing Christmas Carols | embrulhar presentes → embrulhos |
| 10 | Wrap the Presents | o Papai Noel precisa de um lanche → biscoitos |
| 11 | Bake Christmas Cookies | uma visita MUITO especial vem aí → véspera |
| 12 | Christmas Eve Treats for Santa | vire a página de manhã → final |

## Estrutura (30 páginas internas, a página 1 fica à direita)

| Página | Conteúdo |
|---|---|
| 1 (dir.) | "This book belongs to", "A Christmas gift from", ano |
| 2 (esq.) | Carta do Pip vinda do Polo Norte (início da história) |
| 3 (dir.) | Checklist com as 12 missões |
| 4–27 | 12 missões: **esquerda** = título + ilustração + poema + pista + medidor de estrelas; **direita** = moldura da foto + "Date / With / My favorite part" + caixinha "Mission complete!" |
| 28 (esq.) | "You Did It!" + certificado de Official Christmas Spirit Helper |
| 29 (dir.) | Foto da manhã de Natal |
| 30 (esq.) | "My Christmas Memories" (perguntas para escrever) |

Capa: frente personalizável (**"Emma's Christmas Spirit Missions"**, ano) e verso com Pip e a descrição.

### Fotos
- **8×8**: moldura de 6,3×4,3 in, cabe **1 foto 4×6 deitada** (com folga).
- **11×11**: moldura de 8,6×6,5 in, cabe **1 foto 4×6 deitada** ou **2 fotos 4×6 em pé** lado a lado.
- O texto "Stick your photo here" fica dentro da moldura e some quando a foto é colada. O cliente pode colar a foto que couber, do jeito que quiser.

## Arquivos prontos (`output/generic/`)

| Arquivo | Uso |
|---|---|
| `gelato-8x8-interior-30p.pdf` | Miolo 8×8, 30 páginas, sangria de 4 mm (211,2 mm quadrado) |
| `gelato-8x8-cover-front-back.pdf` | Capa 8×8: página 1 = frente, página 2 = verso |
| `gelato-11x11-interior-30p.pdf` | Miolo 11×11, 30 páginas, sangria de 4 mm (287,4 mm quadrado) |
| `gelato-11x11-cover-front-back.pdf` | Capa 11×11 |
| `digital-christmas-spirit-missions.pdf` | Versão digital 8×8 sem sangria (capa + 30 páginas + verso) |

A versão genérica deixa o nome em branco ("My Christmas Spirit Missions" e linhas para escrever). Prévia de todas as páginas: `preview/`.

## Personalizar a capa (nome do cliente)

```bash
cd christmas-book
npm install          # instala o Playwright (só na primeira vez)
node build.js --name "Emma" --year 2026 --from "Grandma & Grandpa"
# saída: output/emma/
```

Opções:
- `--name`: nome da criança (capa, página 1, carta do Pip, poema final e certificado)
- `--year`: ano (capa, página 1, certificado)
- `--from`: quem está dando o presente (página 1)
- `--only 8x8 | 11x11 | digital`: gera só um formato
- `--cover-bleed 15`: aumenta a sangria da capa em mm, se o template de capa dura da Gelato pedir mais área de dobra

Os textos ficam em `src/content.js`, as ilustrações em `src/art.js` e o layout em `src/styles.js`.

## Antes de enviar para a Gelato
1. Baixe o template do photo book de capa dura (8×8 e 11×11) no painel da Gelato e confira:
   - se o produto aceita **30 páginas** internas;
   - a **área de dobra e lombada da capa dura**. A capa aqui é frente e verso separados com 4 mm de sangria, e o conteúdo importante fica a ~13 mm da borda. Se o template pedir mais dobra, gere de novo com `--cover-bleed` ou monte frente e verso no template.
2. A Gelato recomenda PDF/X-4. Estes PDFs são PDFs comuns com as fontes embutidas (cores RGB). Se o upload reclamar, abra no Acrobat ou Affinity e exporte como PDF/X-4.
3. Faça um pedido de amostra de cada tamanho para conferir cores e o tamanho da moldura com uma foto 4×6 de verdade.

Fontes: Mountains of Christmas, Fredoka, Patrick Hand e Sniglet (Google Fonts, licença OFL, uso comercial permitido).
