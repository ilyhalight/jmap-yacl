# jmap-yacl

[![GitHub Actions](https://github.com/ilyhalight/jmap-yacl/actions/workflows/build.yml/badge.svg)](https://github.com/ilyhalight/jmap-yacl/actions/workflows/build.yml)
[![npm](https://img.shields.io/bundlejs/size/jmap-yacl)](https://www.npmjs.com/package/jmap-yacl)
[![en](https://img.shields.io/badge/lang-English%20%F0%9F%87%AC%F0%9F%87%A7-white)](README.md)
[![ru](https://img.shields.io/badge/%D1%8F%D0%B7%D1%8B%D0%BA-%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%F0%9F%87%B7%F0%9F%87%BA-white)](README-RU.md)

Еще одна легковестная клиентская библиотека для работы с JMAP, которая поддерживает работу с JavaScript, TypeScript, а так же имеет встроенные типы для Typebox.

## Установка

Установка через Bun:

```bash
bun install jmap-yacl
```

Установка через NPM:

```bash
npm install jmap-yacl
```

## Информация

Библиотека разрабатывалась и тестировалась с использованием [stalwart mail-server](https://github.com/stalwartlabs/mail-server), работа с другими JMAP серверами не гарантирована (в теории должна быть из-за соответствия RFC). Поддерживается только базовая аутентификация (username + password).

Реализовано:

- стандарт JMAP согласно [RFC 8620](https://datatracker.ietf.org/doc/rfc8620/) (без Push)
- стандарт JMAP Mail согласно [RFC 8621](https://datatracker.ietf.org/doc/rfc8621/)

Вдохновение:

- [stalwartlabs/jmap-client](https://github.com/stalwartlabs/jmap-client)
- [htunnicliff/jmap-jam](https://github.com/htunnicliff/jmap-jam)

Соответствие стандартам:

- [RFC 8620 - The JSON Meta Application Protocol (JMAP)](https://datatracker.ietf.org/doc/rfc8620/)
- [RFC 8621 - The JSON Meta Application Protocol (JMAP) for Mail](https://datatracker.ietf.org/doc/html/rfc8621)
- [RFC 7807 - Problem Details in HTTP APIs](https://datatracker.ietf.org/doc/rfc7807/)

## Начало работы

Для начала работы с API необходимо создать JMAP Client и авторизовать его. Это можно сделать с помощью нескольких строчек представленных ниже:

```ts
const client = new JMAPClient({
  username: process.env.JMAP_USERNAME,
  password: process.env.JMAP_PASSWORD,
});

await client.connect("https://YOURDOMAIN/.well-known/jmap");
```

Для того, чтобы сделать запрос к JMAP вы можете использовать два вида запросов:

1. Готовые методы для простых одиночных запросов к серверу
2. "Сырые" запросы, если хотите сделать сложный запрос к серверу

```ts
  const client = ...

  // ready methods
  const identityResponse = await client.identity.get({
    accountId: "abc",
  });

  // raw requests
  const identityResponse = await client.request<
    JMAP.GetResponse<JMAPMail.Identity[]>
  >("/jmap", {
    using: [JMAP.Using.mail],
    invocation: [
      "Identity/get",
      {
        accountId: "abc",
      },
      "a",
    ],
  });
```

## Сборка

1. Установите [Bun](https://bun.sh/)

2. Установите зависимости:

```bash
bun install
```

3. Запустите сборку:

```bash
bun build:all
```

## Тесты

Библиотека имеет минимальное покрытие тестами для проверки ее работоспособности.

Запустить тесты:

```bash
bun test
```
