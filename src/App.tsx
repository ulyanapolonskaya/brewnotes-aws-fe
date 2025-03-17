import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import BeansList from './pages/BeansList';
// Import other pages as needed

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/beans',
          element: <BeansList />,
        },
        // Add other routes as needed
        // {
        //   path: '/beans',
        //   element: <NewBean />,
        // },
      ],
    },
  ],
  {
    basename: '/brewnotes-fe',
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
