import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./apps/memory/redux/store";
import { BOOKLETS_PATH } from './route/paths';

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(BOOKLETS_PATH);
  }, []);

  return (
    <Provider store={store}>
      <>
        <Outlet />
      </>
    </Provider>
  );
};

export default App;
