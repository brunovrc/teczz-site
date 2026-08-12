import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import SiteGratis from './pages/SiteGratis.tsx';
import './index.css';

// Lê o pathname já restaurado pelo script de redirect do 404.html
const path = window.location.pathname;
const Root = path.startsWith('/site-gratis') ? SiteGratis : App;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
