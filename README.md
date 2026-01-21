# 🌟 Site Gedisa - Documentação Técnica

> **Versão:** 1.0.0  
> **Última Atualização:** Janeiro 2025  
> **Status:** ✅ Pronto para Deploy

---

## ⚠️ IMPORTANTE: Migração de Imagens

**Se você está rodando o projeto FORA do Figma Make:**

O código usa imports `figma:asset/` que funcionam apenas no ambiente Figma Make. Para rodar localmente:

1. ✅ **Já está configurado:** Plugin Vite resolve placeholders automaticamente
2. 📸 **Para usar imagens reais:** Consulte **[GUIA-MIGRACAO-IMAGENS.md](./GUIA-MIGRACAO-IMAGENS.md)**

```bash
# Rodar com placeholders (funciona imediatamente)
npm install
npm run dev
```

---

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Estrutura do Projeto](#-estrutura-do-projeto)
3. [Instalação e Configuração](#-instalação-e-configuração)
4. [Bibliotecas e Dependências](#-bibliotecas-e-dependências)
5. [Guia de Desenvolvimento](#-guia-de-desenvolvimento)
6. [Biblioteca de Classes e IDs](#-biblioteca-de-classes-e-ids)
7. [Variáveis CSS](#-variáveis-css)
8. [Build e Deploy](#-build-e-deploy)
9. [Estrutura de Componentes](#-estrutura-de-componentes)
10. [Troubleshooting](#-troubleshooting)

---

## 🎯 Visão Geral

Site institucional completo e responsivo da **Gedisa** (Geração Distribuída SA), desenvolvido com React, TypeScript e Tailwind CSS v4. O projeto foi criado a partir de um design do Figma e implementa as melhores práticas de desenvolvimento web moderno.

### ✨ Características Principais

- ✅ **Totalmente Responsivo** - Adaptado para desktop, tablet e mobile
- ✅ **Performance Otimizada** - Build otimizado com Vite
- ✅ **TypeScript** - Tipagem estática para maior segurança
- ✅ **Tailwind CSS v4** - Sistema de design moderno e escalável
- ✅ **Componentes Reutilizáveis** - Arquitetura modular e manutenível
- ✅ **SEO-Ready** - Estrutura semântica e otimizada
- ✅ **Acessibilidade** - Seguindo padrões WCAG

### 🎨 Seções do Site

1. **Hero Section** - Banner principal com navegação
2. **Soluções** - Cards de soluções para empresas e comercializadoras
3. **Parcerias** - Seção com accordion de tecnologias (API, Sistema Embarcado, App)
4. **Clientes** - Carousel infinito de logos de parceiros
5. **Comercializadoras** - Carousel de 4 slides com benefícios
6. **Formulário de Agendamento** - Form funcional pronto para integração
7. **Vídeo CTA** - Seção de chamada para ação
8. **Footer** - Rodapé completo com newsletter e links

---

## 📁 Estrutura do Projeto

```
gedisa-site/
│
├── 📄 package.json                    # Configuração npm e dependências
├── 📄 vite.config.ts                  # Configuração do Vite
├── 📄 postcss.config.mjs              # Configuração PostCSS/Tailwind
├── 📄 README.md                       # Esta documentação
├── 📄 ATTRIBUTIONS.md                 # Créditos e atribuições
│
├── 📁 guidelines/
│   └── Guidelines.md                  # Guias de estilo e padrões
│
└── 📁 src/
    │
    ├── 📁 app/
    │   ├── App.tsx                    # 🔥 Componente principal (Landing Page)
    │   │
    │   └── 📁 components/
    │       ├── video-section.tsx      # Componente da seção de vídeo
    │       │
    │       ├── 📁 figma/
    │       │   └── ImageWithFallback.tsx  # 🔒 Componente protegido (sistema)
    │       │
    │       └── 📁 ui/                 # 🔒 Biblioteca UI (protegida - não deletar)
    │           ├── accordion.tsx
    │           ├── alert-dialog.tsx
    │           ├── alert.tsx
    │           ├── aspect-ratio.tsx
    │           ├── avatar.tsx
    │           ├── badge.tsx
    │           ├── breadcrumb.tsx
    │           ├── button.tsx
    │           ├── calendar.tsx
    │           ├── card.tsx
    │           ├── carousel.tsx
    │           ├── chart.tsx
    │           ├── checkbox.tsx
    │           ├── collapsible.tsx
    │           ├── command.tsx
    │           ├── context-menu.tsx
    │           ├── dialog.tsx
    │           ├── drawer.tsx
    │           ├── dropdown-menu.tsx
    │           ├── form.tsx
    │           ├── hover-card.tsx
    │           ├── input-otp.tsx
    │           ├── input.tsx
    │           ├── label.tsx
    │           ├── menubar.tsx
    │           ├── navigation-menu.tsx
    │           ├── pagination.tsx
    │           ├── popover.tsx
    │           ├── progress.tsx
    │           ├── radio-group.tsx
    │           ├── resizable.tsx
    │           ├── scroll-area.tsx
    │           ├── select.tsx
    │           ├── separator.tsx
    │           ├── sheet.tsx
    │           ├── sidebar.tsx
    │           ├── skeleton.tsx
    │           ├── slider.tsx
    │           ├── sonner.tsx
    │           ├── switch.tsx
    │           ├── table.tsx
    │           ├── tabs.tsx
    │           ├── textarea.tsx
    │           ├── toggle-group.tsx
    │           ├── toggle.tsx
    │           ├── tooltip.tsx
    │           ├── use-mobile.ts
    │           └── utils.ts
    │
    ├── 📁 imports/
    │   ├── svg-jfs3qpcatf.ts          # SVG paths (logos, ícones)
    │   └── svg-ped65.tsx              # SVG components (ilustrações)
    │
    └── 📁 styles/
        ├── fonts.css                  # Importação de fontes Google
        ├── index.css                  # Ponto de entrada dos estilos
        ├── tailwind.css               # Configuração Tailwind v4
        └── theme.css                  # Variáveis CSS e tema customizado
```

### 📊 Estatísticas do Projeto

| Categoria | Quantidade |
|-----------|------------|
| **Componentes Ativos** | 2 arquivos |
| **SVG Assets** | 2 arquivos |
| **Estilos CSS** | 4 arquivos |
| **Componentes UI (Biblioteca)** | 50+ arquivos |
| **Total de Linhas (App.tsx)** | ~1.336 linhas |

---

## 🚀 Instalação e Configuração

### Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 ou **pnpm** >= 8.0.0 (recomendado)

### Passo a Passo

```bash
# 1. Clone o repositório (ou extraia o ZIP)
cd gedisa-site

# 2. Instale as dependências
npm install
# OU com pnpm (recomendado para melhor performance)
pnpm install

# 3. Execute o servidor de desenvolvimento
npm run dev
# OU
pnpm dev

# 4. Acesse no navegador
# http://localhost:5173
```

### Scripts Disponíveis

```json
{
  "build": "vite build"      // Gera build de produção
}
```

**Nota:** O comando `dev` não está explicitamente no package.json, mas o Vite já provê por padrão. Para adicionar:

```bash
# Adicione ao package.json manualmente:
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

---

## 📦 Bibliotecas e Dependências

### 🎨 UI & Estilo

| Biblioteca | Versão | Uso no Projeto |
|------------|--------|----------------|
| `tailwindcss` | 4.1.12 | Sistema de design principal |
| `@tailwindcss/vite` | 4.1.12 | Plugin Vite para Tailwind |
| `tailwind-merge` | 3.2.0 | Merge de classes Tailwind |
| `class-variance-authority` | 0.7.1 | Variantes de componentes |
| `clsx` | 2.1.1 | Conditional classes |

### ⚛️ React & Componentes

| Biblioteca | Versão | Uso no Projeto |
|------------|--------|----------------|
| `react` | 18.3.1 | Framework principal |
| `react-dom` | 18.3.1 | Renderização DOM |
| `@radix-ui/*` | ~1.x-2.x | Componentes UI acessíveis (50+ pacotes) |
| `motion` | 12.23.24 | Animações (Motion/Framer Motion) |
| `lucide-react` | 0.487.0 | Ícones |

### 🛠️ Ferramentas de Formulário

| Biblioteca | Versão | Uso no Projeto |
|------------|--------|----------------|
| `react-hook-form` | 7.55.0 | Gerenciamento de formulários |
| `input-otp` | 1.4.2 | Input de código OTP |

### 📊 Visualização de Dados

| Biblioteca | Versão | Uso no Projeto |
|------------|--------|----------------|
| `recharts` | 2.15.2 | Gráficos e charts |

### 🎡 Carousels & Interações

| Biblioteca | Versão | Uso no Projeto |
|------------|--------|----------------|
| `embla-carousel-react` | 8.6.0 | Carousels modernos |
| `react-slick` | 0.31.0 | Carousel de logos |
| `react-dnd` | 16.0.1 | Drag and Drop |
| `react-dnd-html5-backend` | 16.0.1 | Backend HTML5 para DnD |

### 🎭 UI Adicional

| Biblioteca | Versão | Uso no Projeto |
|------------|--------|----------------|
| `@mui/material` | 7.3.5 | Material UI (disponível) |
| `@mui/icons-material` | 7.3.5 | Ícones Material |
| `@emotion/react` | 11.14.0 | CSS-in-JS (peer do MUI) |
| `@emotion/styled` | 11.14.1 | Styled components (peer do MUI) |
| `sonner` | 2.0.3 | Toast notifications |
| `vaul` | 1.1.2 | Drawer component |
| `next-themes` | 0.4.6 | Gerenciamento de temas |

### 🗓️ Datas & Utilitários

| Biblioteca | Versão | Uso no Projeto |
|------------|--------|----------------|
| `date-fns` | 3.6.0 | Manipulação de datas |
| `react-day-picker` | 8.10.1 | Seletor de datas |

### 🔧 Build & Dev

| Biblioteca | Versão | Uso no Projeto |
|------------|--------|----------------|
| `vite` | 6.3.5 | Build tool e dev server |
| `@vitejs/plugin-react` | 4.7.0 | Plugin React para Vite |
| `postcss` | (implícito) | Processamento CSS |

### 📦 Dependências Instaladas (Não Utilizadas Atualmente)

As seguintes bibliotecas estão instaladas mas **não são usadas no código atual**. Podem ser removidas ou mantidas para futuras expansões:

- `react-responsive-masonry`
- `react-resizable-panels`
- `react-popper` / `@popperjs/core`
- `cmdk`
- `tw-animate-css`

---

## 👨‍💻 Guia de Desenvolvimento

### 🎨 Sistema de Design

O projeto utiliza **Tailwind CSS v4** com sistema de design customizado.

#### Paleta de Cores Principal

```css
/* Cores da Marca */
--primary-orange: #ff5c00    /* Laranja Gedisa */
--primary-dark: #080808      /* Preto Gedisa */
--white: #ffffff             /* Branco */
--gray-light: #868686        /* Cinza claro */
--gray-dark: #5a5a5a         /* Cinza escuro */
--gray-border: #616161       /* Bordas */
```

#### Fontes

```css
/* Fontes Principais */
font-family: 'Plus Jakarta Sans'  /* Títulos principais */
font-family: 'Manrope'           /* Navegação, labels, botões */
font-family: 'Roboto'            /* Textos corridos, footer */
```

### 📐 Breakpoints Responsivos

```css
/* Tailwind Breakpoints Padrão */
sm: 640px      /* Tablets pequenos */
md: 768px      /* Tablets */
lg: 1024px     /* Desktop pequeno */
xl: 1280px     /* Desktop */
2xl: 1536px    /* Desktop grande */
```

### 🧩 Como Criar Novos Componentes

```tsx
// 1. Crie o arquivo em /src/app/components/
// Exemplo: /src/app/components/my-section.tsx

import svgPaths from '@/imports/svg-jfs3qpcatf';

export function MySection() {
  return (
    <section className="w-full bg-[#080808] py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seu conteúdo aqui */}
      </div>
    </section>
  );
}

// 2. Importe no App.tsx
import { MySection } from '@/app/components/my-section';

// 3. Use no componente
<MySection />
```

### 🖼️ Como Usar Imagens

```tsx
// Imagens do Figma (assets)
import myImage from 'figma:asset/[hash].png';
<img src={myImage} alt="Descrição" />

// SVG Paths
import svgPaths from '@/imports/svg-jfs3qpcatf';
<path d={svgPaths.p233a6a00} fill="white" />

// Componentes SVG
import { imgName } from '@/imports/svg-ped65';
<div>{imgName}</div>
```

### 🔗 Alias de Importação

O projeto usa `@` como alias para `/src`:

```tsx
// ✅ Correto
import { VideoSection } from '@/app/components/video-section';
import svgPaths from '@/imports/svg-jfs3qpcatf';

// ❌ Evite caminhos relativos
import { VideoSection } from '../components/video-section';
```

---

## 🏷️ Biblioteca de Classes e IDs

### IDs de Navegação (Âncoras)

```html
<!-- Navegação Principal -->
<a href="#solucoes">Soluções</a>
<a href="#comercializadoras">Comercializadoras</a>
<a href="#parceiro">Parceiro</a>
<a href="#contato">Contato</a>
```

### Classes CSS Customizadas

#### 🎯 Container Principal

```css
.max-w-\[1280px\]    /* Container máximo do site */
.mx-auto             /* Centraliza horizontalmente */
.px-4.sm:px-6.lg:px-8  /* Padding responsivo */
```

#### 🎨 Efeitos Especiais

```css
/* Gradient de Título (Laranja Gedisa) */
background: linear-gradient(90.77deg, #ff5c00 27.88%, #ffa800 101.47%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* Gradient de Background (Formulário) */
background-image: linear-gradient(
  151.344deg, 
  rgba(0, 0, 0, 0.6) 14.786%, 
  rgba(178, 178, 178, 0.6) 114.71%
);
```

#### 🎭 Animações

```css
/* Carousel Infinito de Logos */
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
  width: max-content;
}

.animate-scroll:hover {
  animation-play-state: paused;
}
```

### Estados Interativos

```css
/* Hover States */
.hover:bg-[#e55200]         /* Botão laranja hover */
.hover:text-[#ff5c00]       /* Link hover */
.hover:opacity-70           /* Ícone hover */

/* Transitions */
.transition-colors          /* Transição de cores */
.transition-opacity         /* Transição de opacidade */
.transition-all             /* Transição geral */
.duration-300              /* Duração 300ms */
```

---

## 🎨 Variáveis CSS

### Variáveis Customizadas (theme.css)

```css
/* Cores */
--background: #ffffff
--foreground: oklch(0.145 0 0)
--primary: #030213
--primary-foreground: oklch(1 0 0)
--secondary: oklch(0.95 0.0058 264.53)
--muted: #ececf0
--muted-foreground: #717182
--accent: #e9ebef
--destructive: #d4183d
--border: rgba(0, 0, 0, 0.1)
--input-background: #f3f3f5
--switch-background: #cbced4

/* Tipografia */
--font-size: 16px
--font-weight-medium: 500
--font-weight-normal: 400

/* Border Radius */
--radius: 0.625rem          /* 10px */
--radius-sm: 0.375rem       /* 6px */
--radius-md: 0.475rem       /* 7.6px */
--radius-lg: 0.625rem       /* 10px */
--radius-xl: 0.875rem       /* 14px */

/* Charts */
--chart-1: oklch(0.646 0.222 41.116)
--chart-2: oklch(0.6 0.118 184.704)
--chart-3: oklch(0.398 0.07 227.392)
--chart-4: oklch(0.828 0.189 84.429)
--chart-5: oklch(0.769 0.188 70.08)
```

### Modo Escuro (Dark Mode)

```css
/* Variáveis disponíveis para modo escuro */
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --border: oklch(0.269 0 0);
  /* ... todas as variáveis adaptadas */
}
```

**Nota:** O site atual não implementa dark mode, mas as variáveis estão prontas para uso futuro.

---

## 🏗️ Build e Deploy

### Build de Produção

```bash
# Gerar build otimizado
npm run build
# OU
pnpm build

# Saída: /dist
# - index.html
# - assets/
#   - index-[hash].js
#   - index-[hash].css
#   - imagens otimizadas
```

### Preview do Build

```bash
# Visualizar build localmente
npm run preview
# OU
pnpm preview

# Acesse: http://localhost:4173
```

### Configurações do Vite

O arquivo `vite.config.ts` está configurado com:

```typescript
{
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'  // Alias @ aponta para /src
    }
  }
}
```

### Deploy - Plataformas Recomendadas

#### ☁️ Vercel (Recomendado)

```bash
# 1. Instale Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# Configuração automática para Vite!
```

#### ☁️ Netlify

```bash
# netlify.toml (criar na raiz)
[build]
  command = "npm run build"
  publish = "dist"
```

#### ☁️ AWS S3 + CloudFront

```bash
# 1. Build
npm run build

# 2. Upload para S3
aws s3 sync dist/ s3://seu-bucket --delete

# 3. Invalidar CloudFront
aws cloudfront create-invalidation --distribution-id XXX --paths "/*"
```

#### 🐳 Docker

```dockerfile
# Dockerfile (criar na raiz)
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Checklist de Deploy

- [ ] Testar build localmente (`npm run build && npm run preview`)
- [ ] Verificar todas as imagens carregam corretamente
- [ ] Testar responsividade em diferentes dispositivos
- [ ] Validar formulários funcionam
- [ ] Testar todos os links (internos e externos)
- [ ] Verificar performance (Lighthouse)
- [ ] Configurar domínio customizado
- [ ] Configurar HTTPS/SSL
- [ ] Configurar redirects (se necessário)
- [ ] Adicionar Google Analytics (opcional)

---

## 🧱 Estrutura de Componentes

### Componente Principal: App.tsx

```tsx
export default function App() {
  // Estados
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState('api');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({ ... });
  const [emailNewsletter, setEmailNewsletter] = useState('');

  return (
    <div>
      {/* 1. Hero + Navbar */}
      <section>...</section>
      
      {/* 2. Soluções */}
      <section>...</section>
      
      {/* 3. Parcerias (Accordion) */}
      <section>...</section>
      
      {/* 4. Clientes (Logo Carousel) */}
      <section>...</section>
      
      {/* 5. Comercializadoras (4 Slides) */}
      <section>...</section>
      
      {/* 6. Formulário de Agendamento */}
      <section>...</section>
      
      {/* 7. Vídeo CTA */}
      <VideoSection />
      
      {/* 8. Footer */}
      <footer>...</footer>
    </div>
  );
}
```

### Estados e Funcionalidades

| Estado | Tipo | Uso |
|--------|------|-----|
| `mobileMenuOpen` | boolean | Controla menu mobile |
| `dropdownOpen` | boolean | Controla dropdown "Soluções" |
| `activeAccordion` | string | Controla accordion ativo |
| `currentSlide` | number | Slide atual do carousel |
| `formData` | object | Dados do formulário |
| `emailNewsletter` | string | Email da newsletter |

### Handlers Principais

```tsx
// Submissão de formulário
const handleFormSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // TODO: Integrar com backend
  console.log('Form submitted:', formData);
  alert('Agendamento enviado!');
};

// Newsletter
const handleNewsletterSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // TODO: Integrar com serviço de newsletter
  console.log('Newsletter signup:', emailNewsletter);
  alert('Obrigado por assinar!');
  setEmailNewsletter('');
};
```

---

## 🔍 Troubleshooting

### Problemas Comuns

#### 1. Erro: "Cannot find module '@/...'"

**Solução:** Verifique se o `vite.config.ts` tem o alias configurado:

```typescript
resolve: {
  alias: {
    '@': '/src'
  }
}
```

#### 2. Imagens não carregam no build

**Solução:** Verifique se está usando `figma:asset/` corretamente:

```tsx
// ✅ Correto
import img from 'figma:asset/hash.png';

// ❌ Errado
import img from '../assets/image.png';
```

#### 3. Tailwind classes não funcionam

**Solução:** 
1. Verifique se `tailwind.css` está importado no `index.css`
2. Confirme que `postcss.config.mjs` existe
3. Limpe o cache: `rm -rf node_modules/.vite && npm run dev`

#### 4. Erro de compilação TypeScript

**Solução:**
```bash
# Reinstale as dependências
rm -rf node_modules package-lock.json
npm install
```

#### 5. Build muito lento

**Solução:** Use pnpm ao invés de npm:

```bash
npm i -g pnpm
pnpm install
pnpm build
```

---

## 📞 Integração com Backend

### Formulário de Agendamento

O formulário está pronto para integração. Exemplo de integração:

```tsx
const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/agendamento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      alert('Agendamento enviado com sucesso!');
      // Resetar formulário
      setFormData({
        nome: '',
        empresa: '',
        cargo: '',
        telefone: '',
        email: '',
        solucao: 'Minha Empresa'
      });
    }
  } catch (error) {
    console.error('Erro ao enviar:', error);
    alert('Erro ao enviar. Tente novamente.');
  }
};
```

### Newsletter

```tsx
const handleNewsletterSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailNewsletter }),
    });
    
    alert('Obrigado por assinar nossa newsletter!');
    setEmailNewsletter('');
  } catch (error) {
    console.error('Erro:', error);
  }
};
```

---

## 📊 Métricas e Performance

### Tamanho do Build (Estimado)

```
dist/
├── index.html                    ~2 KB
├── assets/
│   ├── index-[hash].js          ~150 KB (gzipped: ~50 KB)
│   ├── index-[hash].css         ~15 KB (gzipped: ~3 KB)
│   └── images/                  ~2-5 MB (dependendo das imagens)
```

### Performance Targets

- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Time to Interactive (TTI):** < 3.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Lighthouse Score:** > 90

---

## 🔐 Segurança

### Boas Práticas Implementadas

✅ Todos os links externos usam `rel="noopener noreferrer"`  
✅ Formulários com validação client-side  
✅ TypeScript para prevenir erros de tipo  
✅ Sem dependências com vulnerabilidades conhecidas  

### Recomendações para Produção

- [ ] Configurar Content Security Policy (CSP)
- [ ] Adicionar rate limiting nos endpoints de API
- [ ] Implementar CAPTCHA no formulário
- [ ] Validar dados no backend
- [ ] Sanitizar inputs antes de salvar
- [ ] Configurar CORS adequadamente

---

## 📝 Notas Adicionais

### Arquivos Protegidos (Não Deletar)

Os seguintes arquivos são protegidos pelo sistema e **NÃO DEVEM** ser deletados:

- `/src/app/components/figma/ImageWithFallback.tsx`
- `/src/app/components/ui/*` (toda a pasta UI)

Estes arquivos fazem parte da infraestrutura do Figma Make.

### Componentes UI Disponíveis (Não Utilizados)

Embora não estejam em uso no momento, 50+ componentes UI estão disponíveis na pasta `/src/app/components/ui/` para futuras expansões:

- Accordion, Alert, Avatar, Badge, Button, Card, Carousel
- Checkbox, Dialog, Drawer, Dropdown, Form, Input, Select
- Table, Tabs, Toast (Sonner), Tooltip, e muito mais

Consulte cada arquivo para ver a API e exemplos de uso.

---

## 🤝 Suporte e Manutenção

### Contatos do Projeto

- **Empresa:** Gedisa - Geração Distribuída SA
- **CNPJ:** 32.060.301/0001-05
- **Site:** (em produção)

### Atualizações Futuras

Possíveis melhorias sugeridas:

1. **Performance:** Lazy loading de imagens
2. **SEO:** Adicionar meta tags dinâmicas
3. **Analytics:** Integrar Google Analytics / Tag Manager
4. **A11y:** Melhorar navegação por teclado
5. **PWA:** Transformar em Progressive Web App
6. **Backend:** Integrar formulários com API real
7. **CMS:** Integrar com headless CMS (Strapi, Contentful)
8. **I18n:** Adicionar suporte multi-idioma

---

## 📄 Licença

Copyright © 2025 Gedisa - Todos os direitos reservados.

---

**Última Revisão:** Janeiro 2025  
**Versão da Documentação:** 1.0.0  
**Status:** ✅ Completo e Pronto para Deploy