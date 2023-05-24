import React from 'react';
import { Spinner } from 'reactstrap';
import './Spinner.scss';
// import { LOGO_IMG } from 'assets/images';

const LogoLoader = ({ backdrop }) => (
  <>
    <div className="spinner-container">
      <div className="spinner-card">
        {/* <img className="spinner-body logo-spinner" src={LOGO_IMG} alt="logo" /> */}
        <Spinner className="spinner-body spin-content" />
      </div>
    </div>
    {backdrop && <div className="modal-backdrop show" />}
  </>
);

export default LogoLoader;
