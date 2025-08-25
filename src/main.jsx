import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './app/layout/index.css'
import App from './app/layout/App.jsx'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@mui/icons-material'

// 🔹 Import TanStack Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// (Optional) Devtools for debugging queries
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create a client instance (once per app)
// Create a client instance (once per app)
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
  {/* Provide QueryClient to the whole app */}
  <QueryClientProvider client={queryClient}>
    <App />
     {/* <ReactQueryDevtools initialIsOpen={false} /> */}
     </QueryClientProvider>
  </StrictMode>,
)
