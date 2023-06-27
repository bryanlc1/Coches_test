import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App.tsx'
import Home from './Pages/Home.tsx';
import Cars from './Pages/Cars.tsx';

import './global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
