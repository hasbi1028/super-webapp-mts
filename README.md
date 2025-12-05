# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `pnpm install` (or `ppnpm install` or `yarn`), start a development server:

```sh
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```sh
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

generate keys.pem
```sh

# generate RS256 private key for JWT
openssl genrsa -out keys/access_private.pem 2048

# generate corresponding public key
openssl rsa -in keys/access_private.pem -pubout -out keys/access_public.pem

# generate RS256 refresh private key for JWT
openssl genrsa -out keys/refresh_private.pem 4096

# generate correcsponding public key
openssl rsa -in keys/refresh_private.pem -pubout -out keys/refresh_public.pem
```