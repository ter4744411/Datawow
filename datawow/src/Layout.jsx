import React from 'react';
import Header from './assets/Components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const showHeader = location.pathname !== '/signin';
  return (
    <>
     {showHeader && <Header />}
     <Outlet/> 
    </>
  )
}

export default Layout
