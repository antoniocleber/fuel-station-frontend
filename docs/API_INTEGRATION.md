# Integração com o Backend

## Endpoints

### Tipos de Combustível
- `GET /api/v1/fuel-types` - Listar todos
- `GET /api/v1/fuel-types/:id` - Buscar por ID
- `POST /api/v1/fuel-types` - Criar
- `PUT /api/v1/fuel-types/:id` - Atualizar
- `DELETE /api/v1/fuel-types/:id` - Excluir

### Bombas
- `GET /api/v1/fuel-pumps` - Listar todas
- `GET /api/v1/fuel-pumps/:id` - Buscar por ID
- `POST /api/v1/fuel-pumps` - Criar
- `PUT /api/v1/fuel-pumps/:id` - Atualizar
- `DELETE /api/v1/fuel-pumps/:id` - Excluir

### Abastecimentos
- `GET /api/v1/fuelings` - Listar com paginação e filtros
- `GET /api/v1/fuelings/:id` - Buscar por ID
- `POST /api/v1/fuelings` - Criar
- `PUT /api/v1/fuelings/:id` - Atualizar
- `DELETE /api/v1/fuelings/:id` - Excluir

## Configuração

Configure a URL do backend no arquivo `.env`:

```env
VITE_API_URL=http://localhost:8080
```
