# NestJS Bookmarks app from Freecodecamp

## [Video Link](https://www.youtube.com/watch?v=GHTA143_b-s)

### Commands

- Run Prisma Studio

```bash
npx prisma studio
```

- Run Prisma Studio Test Environment

```bash
npx dotenv -e .env.test -- prisma studio
```

### Environment Variables

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/my_db?schema=public"
PORT=5000
JWT_SECRET='SuperSecret'
```
