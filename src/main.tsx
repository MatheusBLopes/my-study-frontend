import React from 'react';
import ReactDOM from 'react-dom/client';
import { Root } from './routes/root';
import { DeckDetail } from './routes/deckDetail';
import { CreateDeck } from './routes/create-deck';
import { CreateCard } from './routes/create-card';
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
        path: '/deck/:id',
        element: <DeckDetail />,
      },
      {
        path: '/create-deck',
        element: <CreateDeck />
      },
      {
        path: '/deck/:deckId/create-card',
        element: <CreateCard />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);