import App from './components/App.svelte';

const app = new App({
  target: document.body,
  props: {
    maxLength: 12 // 89
  }
});

export default app;
