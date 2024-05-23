import { Outlet } from 'react-router-dom';
import {NavBar} from './bar';

const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;