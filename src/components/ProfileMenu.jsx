import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import user4 from 'assets/images/avatar.jpg';
// import { Link } from 'react-router-dom';
import ChangePassword from 'views/auth/Login/ChangePassword';
import RenderIf from './RenderIf';
import DeleteModal from './UI/Model/DeleteModal';

const ProfileMenu = () => {
  const { fullName } = useSelector(state => state.auth);

  const [menu, setMenu] = useState(false);
  const [logout, setLogout] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  const [username, setUserName] = useState('Admin');

  useEffect(() => {
    if (fullName) {
      setUserName(fullName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const handlePassword = () => setPasswordModal(prev => !prev);

  return (
    <div>
      <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-inline-block">
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img className="rounded-circle header-profile-user" src={user4} alt="Header Avatar" />
          <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">
            {username}
          </span>{' '}
          <i className="uil-angle-down d-none d-xl-inline-block font-size-15" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          {/* <Link to="/portfolio">
            <DropdownItem tag="a">
              <i className="uil uil-user-circle font-size-18 align-middle text-muted me-1" />
              Portfolio
            </DropdownItem>
          </Link> */}
          {/* <Link> */}
          <DropdownItem tag="a" onClick={handlePassword} data-toggle="modal" data-target="#myModal">
            <i className="uil uil-user-circle font-size-18 align-middle text-muted me-1" />
            Change Password
          </DropdownItem>
          {/* </Link> */}
          <div className="dropdown-divider" />
          <button type="button" className="dropdown-item" onClick={() => setLogout(true)}>
            <i className="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted" />
            Logout
          </button>
        </DropdownMenu>
      </Dropdown>
      <RenderIf render={logout}>
        <DeleteModal
          title="Are you sure you want to logout?"
          close={() => setLogout(false)}
          confirm={handleLogout}
        />
      </RenderIf>
      {passwordModal && <ChangePassword close={handlePassword} />}
      {/* <AlertModal setLogout={setLogout} isOpen={logout} /> */}
    </div>
  );
};

// ProfileMenu.propTypes = {
//   success: PropTypes.any,
//   t: PropTypes.any
// }

// const mapStatetoProps = state => {
//   const { error, success } = state.Profile
//   return { error, success }
// }

// export default withRouter(
//   connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
// )
export default ProfileMenu;
