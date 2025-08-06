import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './route/index.jsx';
import{Provider} from "react-redux";
import { store } from './store/store.js';
import { RouterProvider } from 'react-router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} /></Provider>
  </StrictMode>,
)