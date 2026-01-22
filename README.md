# Cofre Secreto

Um mini-site narrativo interativo com temática de cofre/arquivos, focado em uma experiência romântica e investigativa.

## 🚀 Tecnologias

- **Next.js 14** (React)
- **TypeScript**
- **Tailwind CSS**
- **localStorage** para persistência

## 📦 Instalação

```bash
npm install
```

## 🏃 Executar em Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 🏗️ Build para Produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
cofre/
├── app/              # Páginas Next.js
├── components/       # Componentes React
│   └── UI/          # Componentes de interface reutilizáveis
├── lib/             # Utilitários e lógica
├── data/            # Dados e configuração
│   ├── poems.ts     # Poemas e respostas
│   └── config.ts    # Palavras destacadas (customizável)
├── types/           # Tipos TypeScript
└── public/          # Arquivos estáticos
```

## 🎨 Personalização

### Adicionar Poemas

Edite `data/poems.ts` e substitua os placeholders pelos poemas reais:

```typescript
export const poems = {
  file1: {
    content: "Seu poema aqui...",
    answer: "resposta_esperada",
    type: "highlighted_words"
  },
  // ...
}
```

### Configurar Palavras Destacadas

Edite `data/config.ts` para definir quais palavras aparecem em rosa no Arquivo 1:

```typescript
export const highlightedWords = {
  file1: ["palavra1", "palavra2", "palavra3"]
}
```

## 🌐 Deploy na Vercel

1. Conecte seu repositório à Vercel
2. A Vercel detectará automaticamente o Next.js
3. Deploy automático a cada push

Ou use a CLI:

```bash
npm i -g vercel
vercel
```

## 📝 Estados da Aplicação

- **LOCK**: Validação inicial (A1Z26)
- **SAFE**: Cofre fechado com 3 arquivos
- **FILE_1/2/3**: Visualização e resolução de cada arquivo
- **OPEN_SAFE**: Cofre aberto
- **FUTURE_FILE**: Arquivo futuro "planejado"

## 💾 Persistência

O progresso é salvo automaticamente no `localStorage`:
- `accessGranted`
- `file1Solved`, `file2Solved`, `file3Solved`
- `currentView`

## 🎯 Validação A1Z26

A resposta esperada é: **"26 de novembro"**

A validação é flexível (case-insensitive, aceita variações de acentos).

