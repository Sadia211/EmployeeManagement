
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
import {Helmet} from "react-helmet";
import {HelmetProvider} from 'react-helmet-async';
import {router} from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider>
   <QueryClientProvider client={queryClient}>
    
    <HelmetProvider>
    <div className='max-w-screen-xl mx-auto'>
    < RouterProvider router={router}></RouterProvider>
    </div>
    </HelmetProvider>
    
    </QueryClientProvider>
    </AuthProvider>
    
  </React.StrictMode>,
)
