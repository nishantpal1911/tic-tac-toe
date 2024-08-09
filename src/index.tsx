import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'src/App';
import { ToastProvider } from 'src/components/ui/Toast';
import 'src/styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
);
