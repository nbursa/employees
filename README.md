# My React App with Vite

This application is initialized with the Vite build tool,
leveraging React and TypeScript. It provides a minimal setup
to get React working in Vite with Hot Module Replacement (
HMR) and some ESLint rules for code quality.

### Key Features

- Fast Refresh: The application uses either Babel or SWC for
  Fast Refresh, ensuring that the UI updates instantly
  without
  a full page reload.

- TypeScript Support: The app is built with TypeScript,
  providing static type checking and other advanced
  JavaScript
  features.
- Enhanced ESLint Configuration: The ESLint configuration is
  set up to be type-aware, ensuring better code quality and
  adherence to best practices.

## Plugins Used

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)
  uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend
updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like
  this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
        sourceType
:
    'module',
        project
:
    ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir
:
    __dirname,
}
,
```

- Replace `plugin:@typescript-eslint/recommended`
  to `plugin:@typescript-eslint/recommended-type-checked`
  or `plugin:@typescript-eslint/strict-type-checked`
- Optionally
  add `plugin:@typescript-eslint/stylistic-type-checked`
-

Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
and
add `plugin:react/recommended` & `plugin:react/jsx-runtime`
to the `extends` list