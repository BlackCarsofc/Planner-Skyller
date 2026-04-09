# Planner Premium Fullstack

Projeto completo em **Next.js + Prisma + PostgreSQL** com:

- cadastro e login real
- sessão com cookie JWT
- banco de dados real via Prisma
- painel do usuário
- painel administrativo
- pagamentos preparados para Pix, PayPal e Stripe
- aprovação manual do premium pelo admin
- planner baseado nas seções principais do PDF

## Base funcional já incluída

O projeto já salva usuários, pagamentos, status premium e entradas do planner no banco de dados.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- bcryptjs
- jsonwebtoken

## Como rodar

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o arquivo `.env`

Copie o exemplo:

```bash
cp .env.example .env
```

Depois ajuste principalmente:

- `DATABASE_URL`
- `JWT_SECRET`
- `NEXT_PUBLIC_APP_URL`

### 3. Suba o PostgreSQL

Você pode usar Docker:

```bash
docker run --name planner-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=planner_premium -p 5432:5432 -d postgres:16
```

### 4. Rode as migrations

```bash
npm run prisma:migrate -- --name init
```

### 5. Gere o client do Prisma

```bash
npm run prisma:generate
```

### 6. Popule com dados iniciais

```bash
npm run db:seed
```

### 7. Rode o projeto

```bash
npm run dev
```

## Usuários iniciais

Depois do seed:

### Admin
- email: `admin@planner.com`
- senha: `123456`

### Usuário
- email: `user@planner.com`
- senha: `123456`

## Integrações de pagamento

Atualmente o projeto já registra pagamentos reais no banco, mas os gateways externos estão com estrutura pronta para você conectar depois:

- Pix: configurar provedor, payload EMV, QR e webhook
- PayPal: configurar SDK/API oficial e client credentials
- Stripe: configurar Checkout/Elements e webhook

## Fluxo premium

1. Usuário faz o pagamento
2. Pagamento é salvo no banco com status `PENDING`
3. Admin entra no painel `/admin`
4. Admin aprova manualmente
5. O usuário recebe premium ativo por 30 dias

## Próximos upgrades recomendados

- NextAuth/Auth.js
- recuperação de senha
- upload de imagens no quadro dos sonhos
- editor visual das páginas do planner
- webhook real para Pix, PayPal e Stripe
- renovação automática
- painel de métricas mais completo

