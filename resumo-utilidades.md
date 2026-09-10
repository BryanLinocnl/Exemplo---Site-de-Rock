# Arquétipo Eventos — Resumo de Utilidades, Novas Ideias e Propostas de Melhoria

Documento analítico sobre o papel atual do portal do festival, oportunidades de expansão de recursos e melhorias para a infraestrutura digital existente.

---

## 1. Para Que Serve o Site Atual

* **Hub Digital Oficial do Festival:** Ponto central de credibilidade, identidade visual e autoridade digital da produtora e da marca Arquétipo.
* **Divulgação do Line-up Oficial:** Apresentação de atrações musicais organizadas por dias (04 a 07 de setembro), palcos (Palco Principal, Palco Sunset, Palco NDO) e gêneros (Rock, Indie, Eletrônico).
* **Funil de Venda de Ingressos:** Vitrine comercial para 4 tipos de acessos (Pista, Pista Premium, Comfort Zone e Passe Completo 4 Dias), com detalhamento comparativo de benefícios por setor.
* **Engajamento e Cultura da "Tribo":** Comunicação do manifesto da marca, linha do tempo histórica (2019–2026), depoimentos de edições anteriores e galeria imersiva com visualizador lightbox.
* **Assessoria e Central de Notícias:** Publicação de novidades, comunicados oficiais, expansão de palcos, entrevistas e cobertura de imprensa.
* **Central de Dúvidas (FAQ):** Resolução rápida de questões práticas e legais: meia-entrada, classificação etária, transferência de ingresso e itens proibidos/permitidos.
* **Vitrine Comercial B2B:** Espaço estruturado para exposição de patrocinadores, parceiros de mídia e fornecedores.
* **Captação de Leads:** Coleta de contatos via newsletter para avisos de lotes, pré-venda e campanhas de marketing.

---

## 2. Novas Utilidades Sugeridas

| Nova Utilidade | Objetivo de Negócio / Experiência |
| :--- | :--- |
| **"Minha Grade" (Agenda Personalizada)** | O usuário favorita artistas, monta seu próprio cronograma de shows para os 4 dias e recebe notificações/alertas antes de cada show começar. |
| **Mapa Interativo da "Cidade do Festival"** | Mapa digital interativo com rotas para palcos, postos médicos, praça de alimentação, banheiros, pontos de hidratação gratuitos e lockers. |
| **E-commerce de Merchandising Oficial** | Venda antecipada de camisas oficiais, copos colecionáveis e capas de chuva, com opção de retirada expressa no festival sem enfrentar fila. |
| **Recarga Antecipada Cashless** | Sistema para carregar saldo na pulseira de consumo (via PIX/Cartão) antes do festival, reduzindo filas nos caixas físicos. |
| **Rotas, Transfers e Hospedagem** | Hub com reserva de ônibus executivo oficial do festival, rotas de transporte público e hotéis parceiros credenciados com desconto. |
| **Portal de Credenciamento & Imprensa (B2B)** | Área exclusiva para jornalistas, fotógrafos, criadores de conteúdo e fornecedores solicitarem credenciais e baixarem press kit / fotos em alta. |
| **PWA com Modo Offline** | Instalação no celular permitindo consultar horários de shows, mapa e contatos de emergência mesmo quando o sinal 4G/5G estiver congestionado no local. |

---

## 3. Propostas de Modificações para o que Já Existe

### 1. Ingressos (`ingressos.html`)
* **Situação atual:** Cards estáticos com botões redirecionando para formulário ou simulador.
* **Proposta:**
  * Conexão com checkout real (Sympla, Eventim, Ingresse ou gateway Stripe).
  * Marcador de escassez em tempo real (*"Lote 2: 85% vendido"*).
  * Simulador interativo de parcelamento e cálculo automático de taxa de conveniência.

### 2. Line-up e Modal de Artista (`lineup.html` & `scripts.js`)
* **Situação atual:** Grade de cards com modal de bio e tags.
* **Proposta:**
  * Inclusão do **horário exato** de cada show (time slot).
  * Embed de áudio real (player mini Spotify / Deezer / YouTube Music) dentro do modal do artista.
  * Botão *"Adicionar ao Google Agenda / Apple Calendar"*.

### 3. Sistema de Busca Global (`scripts.js`)
* **Situação atual:** Índice hard-coded de 19 itens com correspondência simples.
* **Proposta:**
  * Migrar índice de busca para arquivo JSON externo.
  * Adicionar *fuzzy search* (tolerância a pequenos erros de digitação de nomes como "Foo Fighters" ou "Fatboy Slim").
  * Exibir resultados categorizados por abas: *Artistas*, *Setores*, *Dúvidas/FAQ* e *Notícias*.

### 4. Sistema de Notícias (`noticias.html` e `noticia.html`)
* **Situação atual:** Artigo único hard-coded; botão "Carregar mais" estático; player de áudio meramente decorativo.
* **Proposta:**
  * Carregamento dinâmico dos artigos a partir de arquivos Markdown ou JSON.
  * Integração de podcast oficial do festival com player HTML5 / Spotify embed funcional.
  * Botão "Carregar Mais" funcional que injeta os próximos artigos paginados.

### 5. Newsletter & Captura de Leads
* **Situação atual:** Feedback visual estático no botão (*"INSCRITO!"*), sem persistência de dados.
* **Proposta:**
  * Integração com serviço real (RD Station, Brevo, Mailchimp ou webhook n8n).
  * Gatilho de e-mail de boas-vindas com cupom exclusivo de 10% para merchandising ou pré-venda de ingressos.

### 6. FAQ & Atendimento
* **Situação atual:** Acordeão fixo com 6 perguntas.
* **Proposta:**
  * Campo de busca rápida com filtro instantâneo por tópicos (*Ingressos*, *Acessibilidade*, *Menores*, *Segurança*).
  * Botão de clique direto para WhatsApp com mensagem pré-formatada para suporte a pessoas com deficiência (PCD) ou dúvidas urgentes de compra.
