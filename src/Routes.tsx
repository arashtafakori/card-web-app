import MainLayout from './layouts/MainLayout';
import MainLayoutProvider from './providers/MainLayoutProvider';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import App from './App';
import { BOOKLETS_PATH } from './paths';
import ShowBookletsList from './apps/memory/views/booklet/ShowBookletsList';
import ShowBooklet from './apps/memory/views/booklet/ShowBooklet';

const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <MainLayoutProvider>
            <MainLayout />
          </MainLayoutProvider>
        ),
        children: [
          {
            path: '',
            children: [
              {
                path: BOOKLETS_PATH,
                index: true,
                element: <ShowBookletsList />
              },
              {
                path: BOOKLETS_PATH + "/:id",
                index: true,
                element: <ShowBooklet />
              }
            ]
          }
        ]
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
];

export const router = createBrowserRouter(routes);

export default routes;
