import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App/App'
import 'modern-normalize/modern-normalize.css';
import './index.css'

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  </StrictMode>,
)
