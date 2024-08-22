import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "font-awesome/css/font-awesome.min.css";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

let query = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={query}>
      <App />
      <ReactQueryDevtools position='bottom-right'/>
    </QueryClientProvider>
  </React.StrictMode>
);
