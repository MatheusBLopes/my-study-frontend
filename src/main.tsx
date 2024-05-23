import React from 'react';
import ReactDOM from 'react-dom/client';
import { Root } from './routes/root';
import { DeckDetail } from './routes/deckDetail';
import Layout from './components/layout'; // Ensure this path is correct
import './globals.css';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Use Layout as the main wrapper
    children: [
      {
        path: '/',
        element: <Root />,
      },
      {
        path: 'deck/:id',
        element: <DeckDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);