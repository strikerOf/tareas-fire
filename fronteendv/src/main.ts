// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Importa los estilos de Vuetify
import { registerPlugins } from '@/plugins';
import '@fortawesome/fontawesome-free/css/all.css' 

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light', 
    themes: {
      light: {
        colors: {
          primary: '#1976D2', 
        },
      },
      dark: {
        colors: {
          primary: '#BB86FC', 
        },
      },
    },
  },
});

const app = createApp(App);
registerPlugins(app);

app.use(vuetify);

app.mount('#app');
