# jmap-yacl

[![GitHub Actions](https://github.com/ilyhalight/jmap-yacl/workflows/CI/badge.svg)](https://github.com/ilyhalight/jmap-yacl/actions/workflows/ci.yml)
[![ru](https://img.shields.io/badge/%D1%8F%D0%B7%D1%8B%D0%BA-%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%F0%9F%87%B7%F0%9F%87%BA-white)](README-RU.md)
[![en](https://img.shields.io/badge/lang-English%20%F0%9F%87%AC%F0%9F%87%A7-white)](README.md)

Another client library for working with the JMAP protocol, which supports working with JavaScript, TypeScript, and also has built-in types for Typebox.

## Installation

Bun install:

```bash
bun add jmap-yacl
```

NPM install:

```bash
npm install jmap-yacl
```

## Information

The library was developed and tested using [stalwart mail-server](https://github.com/stalwartlabs/mail-server), work with other JMAP servers is not guaranteed (but in theory it should be due to RFC compliance). Only basic authentication (username + password) is supported.

Implemented:

- JMAP standard according to [RFC 8620](https://datatracker.ietf.org/doc/rfc8620/) (without Push and working with Blob)
- JMAP Mail standard according to [RFC 8621](https://datatracker.ietf.org/doc/rfc8621/)

Inspiration:

- [stalwartlabs/jmap-client](https://github.com/stalwartlabs/jmap-client)
- [htunnicliff/jmap-jam](https://github.com/htunnicliff/jmap-jam)

Compliance with standards:

- [RFC 8620 - The JSON Meta Application Protocol (JMAP)](https://datatracker.ietf.org/doc/rfc8620/)
- [RFC 8621 - The JSON Meta Application Protocol (JMAP) for Mail](https://datatracker.ietf.org/doc/html/rfc8621)
- [RFC 7807 - Problem Details in HTTP APIs](https://datatracker.ietf.org/doc/rfc7807/)

## Getting started

To start working with the API, you need to create a JMAP Client and authorize it. This can be done using a few lines below:

```ts
const client = new JMAPClient({
  username: process.env.JMAP_USERNAME,
  password: process.env.JMAP_PASSWORD,
});

await client.connect("https://YOURDOMAIN/.well-known/jmap");
```

In order to make a request to JMAP, you can use two types of requests::

1. Ready-made methods for simple single requests to the server
2. Raw requests, if you want to make a complex request to the server

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

## Building

1. Install [Bun](https://bun.sh/)

2. Install dependencies:

```bash
bun install
```

3. Run the build:

   3.0. Full build:

   ```bash
   bun build:bun
   ```

   3.1. If you want to build only typescript types:

   ```bash
   bun build:declaration
   ```

   3.2. If you want to build only type box types:

   ```bash
   bun build:typebox
   ```

4. Install the pre-commit hook:
   ```bash
   bun prepare
   ```

## Tests

The library has minimal test coverage to check its performance.

Run the tests:

```bash
bun test
```
