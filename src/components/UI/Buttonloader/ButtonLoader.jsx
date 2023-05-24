import React from 'react';
import { Spinner } from 'reactstrap';
import './buttonloader.css';

const ButtonLoader = ({ text, loading, onClick, success }) => (
  <button
    type="button"
    onClick={onClick}
    className={success ? 'button-success-loader' : 'button-loader'}
  >
    {loading ? (
      <Spinner size="sm" />
    ) : success ? (
      <span>
        <i className="fas fa-check success-icon" />
        {text}
      </span>
    ) : (
      text
    )}
  </button>
);

export default ButtonLoader;
