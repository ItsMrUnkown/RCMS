import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/* ======bootstrap 5===== */
  import 'bootstrap/dist/css/bootstrap.min.css';
  import "bootstrap-icons/font/bootstrap-icons.css";

/* =====Bootstrap JavaScript */
    import 'bootstrap'; // Imports all Bootstrap JavaScript

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
