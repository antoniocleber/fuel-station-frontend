# Arquitetura do Frontend

## Visão Geral

O projeto utiliza uma arquitetura baseada em componentes React com separação clara de responsabilidades:

- **API Layer** (`src/api/`): Comunicação com o backend via Axios
- **Hooks Layer** (`src/hooks/`): Lógica de negócio e estado do servidor (React Query)
- **Store Layer** (`src/stores/`): Estado global da UI (Zustand)
- **Components Layer** (`src/components/`): Componentes reutilizáveis
- **Pages Layer** (`src/pages/`): Composição de páginas

## Fluxo de Dados

```
User Action → Page Component → Custom Hook → API Layer → Backend
                                    ↓
                            React Query Cache
                                    ↓
                            Component Re-render
```

## Decisões de Design

- **TanStack Query**: Cache automático, revalidação, loading states
- **Zustand**: Estado global simples sem boilerplate
- **React Hook Form + Zod**: Validação type-safe
- **Material UI**: Design consistente e acessível
