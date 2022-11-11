import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/router_error';
import Signin from './components/signin';
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



// const queryClient = new QueryClient();

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element:     <QueryClientProvider client={queryClient}><App/></QueryClientProvider>,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/signin",
//     element: <QueryClientProvider client={queryClient}><Signin/></QueryClientProvider>,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/register",
//     element: <QueryClientProvider client={queryClient}><App/></QueryClientProvider>,
//     errorElement: <ErrorPage />,
//   }
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

