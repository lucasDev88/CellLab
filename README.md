# CellLab

Laboratório educativo de Citologia: monte células, descubra organelas e teste seus conhecimentos. Aplicação inteiramente frontend, em português, com representações SVG próprias.

## Tecnologias

React, Vite, TypeScript, Tailwind CSS e Lucide React. Sem backend ou serviços externos. Apenas o melhor resultado é salvo no `localStorage`.

## Executar

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Estrutura

- `src/App.tsx`: navegação, montagem, desafios, quiz e páginas educativas.
- `src/components/CellVisual.tsx`: células e organelas em SVG.
- `src/data/content.ts`: tipos de células, organelas, desafios, quiz e integrantes.
- `src/styles.css`: identidade visual, responsividade e animações.

Edite `team` e `teacher` em `src/data/content.ts` para preencher os integrantes. Clique ou arraste os cards para montar a célula; clique nas estruturas adicionadas para ler suas funções. Acertos valem 100 pontos e erros descontam 25, sem saldo negativo. Cada partida tem três desafios e cinco perguntas. Estruturas já tentadas e questões respondidas ficam bloqueadas para evitar pontuação repetida.

Os desenhos são esquemáticos e sem escala. O modelo procarionte representa uma bactéria com parede celular, plasmídeos e flagelo; esses componentes não são universais. Navegação interna simples, sem biblioteca de rotas.

## Deploy

O projeto está preparado para deploy na Vercel. Envie os arquivos para o GitHub, incluindo `package-lock.json`, e importe o repositório na Vercel.

```sh
npm install
npm run build
```

- **Framework Preset:** Vite
- **Install Command:** `npm install`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Root Directory:** a pasta que contém `package.json` (raiz deste projeto).

Não são necessárias variáveis de ambiente. Os assets e as fontes não dependem de serviços externos. Para conferir a versão de produção localmente, execute `npm run preview` após o build.

A navegação atual usa estado React e mantém a URL `/`; não existem rotas `/play`, `/atlas` ou `/compare`. Por isso, não é necessário `vercel.json` com rewrites. Atualizar a página retorna ao início e preserva o recorde local, mas não a partida em andamento.
