# React compound pattern (with react-compiler)

React Compiler is now stable and has been tested extensively in production. 

Previously without the compiler, you would need to manually memoize components and values to optimize re-renders (useMemo). This was the case especially in components that used the compound pattern.

This repo includes an example with a Modal component that uses the compound pattern. 

This pattern is very handy if:
- You have a component that is re-used for different scenario's.
- You are building an advanced component which will have a lot of conditions and elements.
- You need the freedom to extend the component in an easy way without impacting or combining different states.

```ts
const UserModal = () => {
  const [user, setUser] = useState({ value: '', open: false });

  return (
    <Modal.Provider state={user} actions={{ update: setUser }}>
      <Modal.Trigger />
      <Modal.Content>
        <Modal.Header title={'Add user'} description={'In this modal you can add users'} />
        <Modal.InputField />
        <Modal.Footer>
          <Modal.Submit />
        </Modal.Footer>
      </Modal.Content>
    </Modal.Provider>
  );
};
```

- React (ts + compiler)
- Vite
- Shadcn for UI components

**Good reads/talks**
- https://react.dev/learn/react-compiler/introduction
- https://www.patterns.dev/react/compound-pattern/
- https://www.youtube.com/watch?v=4KvbVq3Eg5w @nandorojo

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
