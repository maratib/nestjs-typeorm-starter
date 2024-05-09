# Nest.js TypeORM Starter

#### Nest.js, TypeORM, JWT Auth, Postgres

```bash
# DB Commands
yarn db:sync
yarn db:drop
yarn db:log
```

## Open SSL

[Certificate Commands](https://github.com/officialcomputerbaba/amazing-nestjs/blob/main/Fundamentals/lecture-38/cert/README.md)

```bash
openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem
```

```javascript
const httpsOptions = {
  key: readFileSync(resolve(__dirname, '../cert/key.pem')),
  cert: readFileSync(resolve(__dirname, '../cert/certificate.pem')),
};
```

## TypeORM seeding

```bash
yarn add -D  typeorm-seeding typeorm-extension
```

## Auth

```bash
yarn add @nestjs/passport passport passport-local passport-jwt @nestjs/jwt bcrypt

yarn add -D @types/passport-jwt
```

### Issues :

1. Fix Service Testings

```

```
