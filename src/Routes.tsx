import MainLayout from './layouts/MainLayout';
import MainLayoutProvider from './providers/MainLayoutProvider';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import App from './App';
import { BOOKLETS_PATH, BOOKLETS_DEFINE_NEW_PATH } from './paths';
import BookletListPage from './apps/memory/views/booklet/BookletListPage';
import BookletDetailPage from './apps/memory/views/booklet/BookletDetailPage';
import DefineNewBookletPage from './apps/memory/views/booklet/DefineNewBookletPage';

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
                element: <BookletListPage />
              },
              {
                path: BOOKLETS_PATH + "/:id",
                index: true,
                element: <BookletDetailPage />
              },
              {
                path: BOOKLETS_DEFINE_NEW_PATH,
                index: true,
                element: <DefineNewBookletPage />
              },
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
