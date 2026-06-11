import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import { hydrateStorage } from './services/storage';
import './index.css';

const root = createRoot(document.getElementById('root')!);

// Restore native-persisted state (no-op on web) before first render so the
// initial useState readers see hydrated localStorage.
hydrateStorage().finally(() => {
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
});
