import MainLayout from '../layouts/MainLayout';
import MainLayoutProvider from '../providers/MainLayoutProvider';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import App from '../App';
import { BOOKLETS_PATH, CARDS_PATH, INDICES_PATH } from './paths';
import ShowBookletsList from '../apps/memory/views/booklet/ShowBookletsList';
import ShowBooklet from '../apps/memory/views/booklet/ShowBooklet';
import ShowIndicesList from '../apps/memory/views/index/ShowIndicesList';
import ShowCardsList from '../apps/memory/views/card/ShowCardsList';

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
                path: BOOKLETS_PATH + "/:bookletId",
                index: true,
                element: <ShowBooklet />
              },
              {
                path: BOOKLETS_PATH + "/:bookletId" + INDICES_PATH,
                index: true,
                element: <ShowIndicesList />
              },
              {
                path: BOOKLETS_PATH + "/:bookletId" + CARDS_PATH + "/:indexId",
                index: true,
                element: <ShowCardsList />
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