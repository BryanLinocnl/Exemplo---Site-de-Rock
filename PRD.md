# Arquétipo Eventos — Product Requirements Document (PRD)

> Última atualização: 2026-02-26 — v2.0 (Redesign Underground)
> Status: Redesign completo entregue — HTML/CSS/JS estático, 5 páginas

---

## 1. Visão Geral do Produto

### 1.1 Nome e Identidade
- **Nome:** Arquétipo Eventos
- **Slogan:** "A tribo vai se reunir." / "Por um mundo melhor através da música."
- **Setor:** Produtora de eventos, shows e festivais de grande porte.
- **Proposta de valor:** Produzir experiências sonoras e culturais imersivas, combinando grandes atrações musicais com ambientes temáticos, tecnologia de palco, gastronomia, arte e bem-estar.

### 1.2 Ideia Central
O site é o **ponto de contato digital oficial do festival Arquétipo Eventos**, inspirado estruturalmente no Rock In Rio, porém com uma estética **underground rock profissional**: pretos profundos, vermelho sangue (#E10600), verde ácido (#00E676), tipografia industrial (Bebas Neue + Space Mono + Montserrat), cantos vivos (sem border-radius), textura de grão/grain overlay, efeitos glitch e marquee tickers.

A marca "Arquétipo" remete a modelos simbólicos universais — o modelo original, o molde. O design reflete isso visualmente: o raio do logo, tipografia bold condensada, contrastes extremos de preto e vermelho, e a noção de "tribo" que permeia toda a comunicação.

---

## 2. Objetivos do Projeto

### 2.1 Objetivos de Negócio
1. Vender ingressos e setores premium (Pista, Pista Premium, Comfort Zone, Passe Completo 4 dias).
2. Divulgar o line-up e atrações por dia, palco e gênero.
3. Capturar leads através da newsletter.
4. Consolidar a credibilidade da marca através de patrocinadores, história e comunicação institucional.
5. Servir de vitrine para futuros patrocinadores, fornecedores e parceiros.

### 2.2 Objetivos de Usuário
1. Saber rapidamente **quando, onde e quem vai se apresentar**.
2. Comprar ingressos com clareza de benefícios por setor.
3. Encontrar informações práticas (meia entrada, menores, segurança, transferência).
4. Ficar por dentro das novidades, mapas e experiências do evento.
5. **Buscar** artistas, palcos, setores e notícias no site.
6. **Ver detalhes de cada artista** clicando no card (modal com bio, tags e CTA).

### 2.3 Objetivos Técnicos
1. Manter o site como **HTML/CSS/JS estático**, leve e rápido (sem build step).
2. Ser totalmente responsivo (320px a 1920px+).
3. Suportar expansão futura para framework SPA/React sem quebrar a identidade visual.
4. Facilitar a troca de conteúdo (imagens, artistas, patrocinadores) sem alterar estrutura.

---

## 3. Público-Alvo

| Segmento | Perfil | Necessidade no site |
|----------|--------|---------------------|
| Fãs de música (18–40 anos) | Buscam artistas e datas | Line-up, datas, ingressos e novidades |
| Compradores premium | Buscam conforto e status | Comfort Zone, Passe Completo, benefícios exclusivos |
| Patrocinadores/Parceiros B2B | Avaliam visibilidade da marca | Área de patrocinadores, imprensa e contato |
| Mídia/Imprensa | Precisam de releases e credenciais | Sala de imprensa, contatos e notícias |
| Público casual | Quer saber se vale ir | Experiências, galeria, depoimentos, FAQ |

---

## 4. Design System v2.0 (Underground Rock)

### 4.1 Paleta de Cores
```css
--bg: #0A0A0A          /* preto profundo */
--bg-2: #121212        /* preto alternativo */
--bg-3: #1A1A1A        /* cards */
--red: #E10600         /* vermelho sangue (cor primária) */
--red-dark: #9B0000    /* vermelho escuro hover */
--green: #00E676       /* verde ácido (acento) */
--gold: #FFB800        /* dourado (destaque) */
--white: #F5F5F5       /* branco texto */
--gray: #8A8A8A        /* texto secundário */
```

### 4.2 Tipografia
- **Display:** Bebas Neue (títulos, hero, números)
- **Body:** Montserrat (corpo de texto, botões)
- **Mono:** Space Mono (labels, metadados, eyebrows, countdown labels)

### 4.3 Princípios de Design
- **Cantos vivos:** border-radius: 0 em quase todos os elementos (industrial)
- **Grão/Grain overlay:** textura SVG sutil fixa sobre todo o site (3.5% opacity)
- **Monocromático + acentos:** imagens em grayscale no estado normal, coloridas no hover
- **Bordas 1px solid:** cards e imagens sempre com borda sutil `rgba(245,245,245,0.12)`
- **Efeito glitch:** no título do hero ao passar o mouse
- **Marquee tickers:** faixas rolantes com nomes de artistas e datas
- **Eyebrows:** rótulos mono prefixados com `//` antes de cada título de seção
- **Clip-path:** logo em formato de raio pentagonal

### 4.4 Componentes Compartilhados
- **Loader screen:** logo ARQUÉTIPO com barra de progresso (1.4s)
- **Header fixo** com transparência dinâmica, navegação Space Mono, bordas ao scrollar
- **Search modal** full-screen com busca em tempo real (index de artistas, palcos, setores, páginas)
- **Artist modal** com imagem, bio, tags e CTA (abre ao clicar nos cards de line-up)
- **Marquee ticker** vermelho e verde (nomes de artistas / datas)
- **Stats section** com contadores animados (IntersectionObserver)
- **Newsletter** com feedback "INSCRITO!" em verde
- **Footer institucional** com 9 redes sociais e 4 colunas de links
- **Floating buttons:** Ingressos + WhatsApp + Voltar ao Topo
- **Lightbox** para galeria de fotos

---

## 5. Estrutura do Site (v2.0)

### 5.1 Páginas

| Página | Arquivo | Função Principal |
|--------|---------|------------------|
| Home | `index.html` | Loader, hero slider, marquee, stats, notícias, sobre/timeline, quote, galeria com lightbox, depoimentos, FAQ, patrocinadores, newsletter |
| Line-up | `lineup.html` | Grade de 12 atrações, filtros por palco E por dia, modal de artista, contagem regressiva |
| Ingressos | `ingressos.html` | 3 setores + passe completo 4 dias, informações, experiências, contagem regressiva |
| Notícias | `noticias.html` | **NOVA** — listagem de 6 notícias em cards com data, tag e resumo |
| Notícia | `noticia.html` | Artigo individual com player de áudio, drop cap, tags, share social, notícias relacionadas |

### 5.2 Navegação (Menu)
- Home / Line-up / Ingressos / Info / Notícias / Experiências
- Links de âncora (`#informacoes`, `#experiencias`) corrigidos para apontar para `ingressos.html#...`

---

## 6. Funcionalidades Implementadas (v2.0)

1. **Loading screen** com logo e barra de progresso animada.
2. **Hero slider** automático (2 slides, 6s) com dots, setas, e scroll hint animado.
3. **Menu mobile** com overlay full-screen.
4. **Header com transparência dinâmica** ao rolar + borda que aparece.
5. **Marquee tickers** (vermelho e verde) com animação CSS infinita.
6. **Stats section** com contadores animados via IntersectionObserver.
7. **Filtros de line-up** por palco (Todos/Principal/Sunset/NDO) E por dia (04/05/06/07).
8. **Modal de artista** ao clicar nos cards de line-up — exibe imagem, dia, palco, tags, bio e CTA.
9. **Search modal funcional** com busca em tempo real sobre um índice de 19 itens (artistas, palcos, setores, páginas, novidades). Atalho: tecla `/`.
10. **FAQ accordion** com 6 perguntas frequentes (apenas uma aberta por vez).
11. **Galeria de fotos** com lightbox ao clicar (grid masonry com itens wide e tall).
12. **Contagem regressiva** para 04/09/2026 às 12h.
13. **Newsletter** com simulação de envio (botão vira "INSCRITO!" em verde por 3s).
14. **Player de áudio simulado** na página de notícia.
15. **Botão "Voltar ao Topo"** que aparece após 500px de scroll.
16. **Fade-in on scroll** (IntersectionObserver) em cards, timeline, FAQ, galeria.
17. **Animação de glitch** no título do hero ao hover.
18. **Drop cap** (capitular) na primeira letra do artigo.
19. **Tags de artigo** e botões de **share social** na página de notícia.
20. **Scrollbar customizada** (preto com thumb vermelho).
21. **Grão/grain overlay** global via SVG inline.

---

## 7. Conteúdo Atual (Resumo)

### 7.1 Home
- Hero: Foo Fighters + Rise Against (04.set) / Fatboy Slim Live (07.set)
- Marquee com nomes de todos os artistas
- Stats: 4 dias, 3 palcos, 40+ atrações, 100K+ pessoas/dia
- 4 cards de notícia
- Seção "Sobre" com texto da marca + Timeline (2019 → 2026)
- Marquee verde com datas
- Citação (Manifesto Arquétipo)
- Galeria com 8 fotos de edições anteriores + lightbox
- 3 depoimentos de frequentadores
- FAQ com 6 perguntas
- Patrocinadores (master: Arquétipo Bank — fictício)
- Newsletter

### 7.2 Line-up
- 12 cards de artistas em 3 palcos e 4 dias
- Filtros combinados por palco + dia
- Modal de artista com 12 bios escritas
- Contagem regressiva
- Newsletter e patrocinadores

### 7.3 Ingressos
- 3 setores: Pista (R$ 450), Pista Premium (R$ 780), Comfort Zone (R$ 1.250)
- Passe Completo 4 Dias (R$ 1.800) — **NOVO**
- Botões por dia
- Informações Importantes (4 cards)
- Experiências Exclusivas (4 cards)
- Contagem regressiva

### 7.4 Notícias (NOVA)
- 6 cards de notícia com imagem, tag, título, resumo, data e "Ler mais"
- Newsletter e patrocinadores

### 7.5 Notícia
- Matéria sobre o New Dance Order com Fatboy Slim
- Player de áudio
- Drop cap, tags, share social
- 3 notícias relacionadas

---

## 8. Pontos Fortes (v2.0)

1. Identidade visual **underground rock profissional** madura e coesa.
2. Cantos vivos, grain overlay e monocromatismo com acentos criam estética única.
3. Estrutura semântica, responsiva e acessível.
4. Componentes reutilizáveis consistentes em todas as 5 páginas.
5. Busca funcional em tempo real (sem backend).
6. Modal de artista com bios curadas.
7. FAQ accordion resolve dúvidas comuns sem sair da página.
8. Galeria com lightbox traz memória de edições anteriores.
9. Performance mantida (estático, sem dependências além de Font Awesome e Google Fonts).
10. Navegação corrigida (âncoras apontam para páginas corretas).
11. Nova página de listagem de notícias resolve o botão "Todas as Notícias".

---

## 9. Problemas e Inconsistências Restantes

1. CNPJ, endereço e dados empresariais ainda fictícios.
2. Patrocinadores fictícios (Arquétipo Bank, Cerveja Local etc.) — placeholders neutros.
3. Nomes de artistas reais (Foo Fighters, Beyoncé etc.) como placeholders — só publicar com confirmação.
4. Imagens do Unsplash com IDs fixos — algumas podem não ser ideais.
5. Não há integração com plataforma de vendas de ingressos.
6. Newsletter não conectada a back-end/CRM.
7. Página de notícia é única e hard-coded; não é template dinâmico.
8. "Carregar Mais" na página de notícias é placeholder.

---

## 10. Roadmap de Melhorias

### 10.1 Curto Prazo
- Substituir imagens placeholder por imagens reais da marca/evento.
- Conectar newsletter a Mailchimp/RD Station.
- Adicionar página/Política de Privacidade real.
- Gerar logotipos vetoriais oficiais.

### 10.2 Médio Prazo
- **Integração com plataforma de ingressos** (iframe, botão com query params ou API).
- **Player de áudio real** (Spotify embed ou HTML5 hospedado).
- **Mapa interativo da Cidade do Rock** (SVG clicável ou Google Maps custom).
- **Programação detalhada por horário** (timeline de shows).
- **Sistema de notícias dinâmico** via JSON/markdown.
- **Galeria de vídeo** (YouTube embed).

### 10.3 Longo Prazo
- Migrar para **Next.js/React** com SSG para SEO e performance.
- **Internacionalização** (pt/en/es).
- **Área logada** para imprensa, fornecedores e loja oficial.
- **PWA** (notificações push, cache offline, instalação).
- SEO avançado: schema.org `Event`, `Organization`, `NewsArticle`, sitemap.
- **Design Tokens** formais em Figma.

### 10.4 Qualidade e Performance
- Lazy-loading nativo em todas as imagens (parcialmente implementado na galeria).
- Converter imagens para WebP/AVIF com fallbacks.
- Core Web Vitals (LCP, CLS, INP).
- Testes visuais (screenshots) e E2E básicos.

---

## 11. Requisitos Não-Funcionais

| Critério | Meta |
|----------|------|
| Performance (PageSpeed Mobile) | > 75 |
| Acessibilidade (Lighthouse) | > 90 |
| Responsividade | 320px até 1920px+ |
| SEO básico | Meta tags, títulos, descrições, headings hierárquicos |
| Tempo de carregamento inicial | < 3s em 3G |
| Compatibilidade | Últimas 2 versões de Chrome, Firefox, Safari, Edge |

---

## 12. Restrições e Considerações Legais

- Dados empresariais (CNPJ, endereço) fictícios.
- Patrocinadores fictícios neutros (Arquétipo Bank, Cerveja Local, Brand X etc.).
- Citação substituída por "Manifesto Arquétipo" (autoria própria), evitando atribuição a terceiros.
- Nomes de artistas reais são placeholders — só publicar com contrato/confirmção.

---

## 13. Notas para a Próxima IA / Desenvolvedor

- O site usa **HTML semântico puro**, CSS custom properties e JS vanilla. Não há build step.
- `styles.css` centraliza todo o visual; `scripts.js` contém toda a lógica.
- Para novas páginas, seguir o padrão: Loader → Header → Conteúdo → Newsletter → Patrocinadores → Footer → Floating Buttons → Modals (Search + Artist + Lightbox).
- Sempre que adicionar uma nova seção, garantir que ela funcione em mobile e tenha animação `fade-in` consistente.
- O `scripts.js` usa um único `DOMContentLoaded` listener com seções comentadas — fácil de estender.
- O índice de busca (`searchIndex`) está hard-coded em `scripts.js`; ao adicionar artistas/páginas, atualizar o array.
- As bios de artistas (`artistBios`) estão em `scripts.js`; ao adicionar artistas, adicionar a bio correspondente.
- Patrocinadores usam nomes fictícios neutros — substituir por parceiros reais quando disponíveis.

---

## 14. Glossário

- **Cidade do Rock:** nome do complexo/venue do festival.
- **New Dance Order:** palco/experiência de música eletrônica e dance.
- **Comfort Zone:** setor premium com assentos, lounge e open bar.
- **Headliner:** atração principal de um dia/palco.
- **Tribo:** termo de comunicação da marca para se referir ao público/comunidade.

---

## 15. Conclusão

O site da **Arquétipo Eventos v2.0** entrega uma experiência visual **underground rock profissional** madura, com 5 páginas completas, busca funcional, modal de artista, FAQ, galeria com lightbox, stats animados, marquee tickers e uma identidade coesa de preto + vermelho + verde ácido. O trabalho seguinte deve focar em **(1) conteúdo real e autorizado**, **(2) integrações comerciais** (venda de ingressos e captura de leads) e **(3) escalabilidade técnica** (migração para framework, CMS, PWA).
