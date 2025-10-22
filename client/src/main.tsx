import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import{Provider} from "react-redux";

import { RouterProvider } from 'react-router';
import { store } from './store/index.js';
import router from './route/index.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)