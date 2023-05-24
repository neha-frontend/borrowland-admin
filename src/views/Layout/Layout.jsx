import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCardData } from 'store/actions';
import Sidebar from './SideBar';
import Header from './header/Header';
import './layout.css';

const Layout = props => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(true);
  const { children } = props;
  const { adminsList } = useSelector(state => state.admins);
  useEffect(() => {
    dispatch(getCardData());
  }, [adminsList]);
  useEffect(() => {
    dispatch(getCardData());
  }, []);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <>
      <header
        id="page-topbar"
        style={{
          left: menuOpen ? '277px' : '90px',
          transition: 'all ease-in-out 0.4s',
        }}
      >
        <Header toggleMenu={toggleMenu} />
      </header>
      <Sidebar isMenuOpened={menuOpen} openLeftMenuCall={setMenuOpen} />
      {/* <Navbar
        path={window.location.pathname}
        openLeftMenuCall={setMenuOpen}
        isMenuOpened={menuOpen}
      /> */}
      <div className={`main-content ${menuOpen ? 'grow-menu' : 'shrink-menu'} `}>
        {children}
        <div className="text-center mb-3 fw-bold color-black">2023 © Borrowland</div>
      </div>
    </>
  );
};

export default Layout;
