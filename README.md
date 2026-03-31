# ⛽ Fuel Station Frontend

Frontend React + TypeScript para a API Fuel Station, desenvolvido com Vite, Material UI e TanStack Query.

## 🚀 Quick Start

```bash
# 1. Instalar dependências
npm install

# 2. Criar .env
cp .env.example .env

# 3. Iniciar desenvolvimento
npm run dev

# 4. Acessar
# http://localhost:5173
```

## 📦 Stack Tecnológico

- **React 18** + TypeScript
- **Vite 5** - Build ultrarrápido
- **Material UI 5** - Design profissional
- **TanStack Query** - Cache inteligente
- **Zustand** - State management
- **React Hook Form + Zod** - Validação
- **Recharts** - Gráficos
- **Axios** - HTTP client

## 📋 Funcionalidades

✅ Dashboard com KPIs e gráficos
✅ CRUD Tipos de Combustível
✅ CRUD Bombas (múltiplos tipos)
✅ CRUD Abastecimentos (com filtros)
✅ Página de Relatórios
✅ Responsivo (mobile/tablet/desktop)
✅ Testes automatizados
✅ Type-safe 100%

## 📁 Estrutura

```
src/
├── api/          # Chamadas REST
├── components/   # Componentes React
├── pages/        # Páginas da app
├── hooks/        # Custom hooks
├── stores/       # Zustand stores
├── types/        # Tipos TypeScript
├── utils/        # Funções auxiliares
└── styles/       # Temas e CSS
```

## 📚 Documentação

- [Arquitetura](docs/ARCHITECTURE.md)
- [Setup](docs/SETUP.md)
- [Integração API](docs/API_INTEGRATION.md)
- [Contributing](docs/CONTRIBUTING.md)
- [Deploy](docs/DEPLOYMENT.md)

## 🧪 Testes

```bash
npm run test           # Rodar testes
npm run test:ui        # Vitest UI
npm run test:coverage  # Coverage report
```

## 📝 Scripts

```bash
npm run dev            # Desenvolvimento com HMR
npm run build          # Build production
npm run preview        # Pré-visualizar build
npm run lint           # Verificar linting
npm run format         # Formatar código
npm run type-check     # Verificar tipos
```

## 🔌 Integração Backend

A aplicação se conecta ao backend em `http://localhost:8080` (configurável via `.env`).

Endpoints integrados:
- `GET /api/v1/fuel-types` - Listar combustíveis
- `GET /api/v1/fuel-pumps` - Listar bombas
- `GET /api/v1/fuelings` - Listar abastecimentos

## 📄 Licença

MIT License - veja LICENSE

## 👤 Autor

Antonio Cleber

---

Desenvolvido com ❤️ usando GitHub Copilot
