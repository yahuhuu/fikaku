# Fikaku

Fikaku adalah starter **Personal Finance SaaS** berbasis **Next.js App Router + TypeScript + MySQL + Prisma 7**.

## Architecture

Project ini memakai **Feature-Driven Architecture**:

```txt
src/app        # routing Next.js
src/features   # fitur bisnis: auth, dashboard, transactions, etc.
src/shared     # shared UI/lib/utils/types
prisma         # schema MySQL dan migrations
```

Di dalam feature, pola yang dipakai:

```txt
components/    # UI milik feature
actions/       # server actions untuk mutation
queries/       # read operation
schemas/       # Zod validation
services/      # business logic/use case
repositories/  # Prisma/database access
types/         # type feature
```

## Setup database MySQL VPS

1. Buat database di Adminer/MySQL:

```sql
CREATE DATABASE fikaku;
CREATE USER 'fikaku_user'@'localhost' IDENTIFIED BY 'password-kuat';
GRANT ALL PRIVILEGES ON fikaku.* TO 'fikaku_user'@'localhost';
FLUSH PRIVILEGES;
```

2. Copy env:

```bash
cp .env.example .env
```

3. Isi:

```env
DATABASE_URL="mysql://fikaku_user:password-kuat@127.0.0.1:3306/fikaku"
AUTH_SECRET="hasil-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

4. Generate Prisma client dan migrate:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

## Development

```bash
npm run dev
npm test
npm run lint
npm run build
```

## MVP routes

- `/` landing page
- `/pricing`
- `/login`
- `/register`
- `/dashboard`
- `/transactions`
- `/categories`
- `/wallets`
- `/reports`
- `/settings`
- `/admin`
- `/admin/users`
