import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeBackProvider } from './ThemeBack';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeBackProvider> 
    <App />
    </ThemeBackProvider>
  </StrictMode>,
)
