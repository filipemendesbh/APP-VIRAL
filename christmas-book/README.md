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
