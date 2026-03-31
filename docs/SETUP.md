# Setup Local

## Pré-requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0
- Backend rodando em http://localhost:8080

## Instalação

```bash
# Clone o repositório
git clone https://github.com/antoniocleber/fuel-station-frontend.git
cd fuel-station-frontend

# Instalar dependências
npm install

# Criar arquivo de ambiente
cp .env.example .env

# Iniciar desenvolvimento
npm run dev
```

## Variáveis de Ambiente

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `VITE_API_URL` | `http://localhost:8080` | URL do backend |
| `VITE_APP_NAME` | `Fuel Station Frontend` | Nome da aplicação |
| `VITE_APP_VERSION` | `1.0.0` | Versão da aplicação |

## Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run test         # Executar testes
npm run lint         # Verificar linting
npm run format       # Formatar código
npm run type-check   # Verificar tipos TypeScript
```
