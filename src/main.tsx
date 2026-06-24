import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { applyUserSettings } from './features/settings/applySettings';
import { loadUserSettings } from './features/settings/storage';

applyUserSettings(loadUserSettings());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
