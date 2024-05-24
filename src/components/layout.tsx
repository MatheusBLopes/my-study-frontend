import { Outlet } from 'react-router-dom';
import {NavBar} from './bar';
import { ThemeProvider } from "./theme-provider"


const Layout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavBar />
      <Outlet  />
    </ThemeProvider>
  );
};

export default Layout;