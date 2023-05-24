import React, { useState, useEffect } from 'react';
import { Alert, Spinner, Modal } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import './login.css';
import { clearAuth, passwordChange } from 'store/actions';

const ChangePassword = ({ close }) => {
  const [show, setShow] = useState({ password: false, oldpassword: false, conpassword: false });
  const { isLoading } = useSelector(state => state.auth);
  const [submit, setSubmit] = useState(false);
  const [pass, setPass] = useState('');
  const [oldPass, setOldPass] = useState('');
  const { state } = useLocation();
  const dispatch = useDispatch();
  //   const history = useHistory();
  const matchObj = {
    1: pass.length >= 10 && pass.match(/[A-Z]/) && pass.match(/[a-z]/),
    2: pass.match(/[A-Za-z]/) && pass.match(/[0-9]/),
    3: pass.match(/[*@!#%&()^~{}]+/),
  };
  useEffect(() => {
    if (!state);
    return () => dispatch(clearAuth());
  }, []);
  const handleShow = val => {
    setShow(prev => ({ ...prev, [val]: !prev[val] }));
  };
  const changePassword = (e, value) => {
    dispatch(passwordChange({ value, close }));
  };
  const handleInvalid = () => {
    if (!submit) setSubmit(true);
  };
  const isMatch = num => {
    if (matchObj[num]) {
      return 'color-green';
    }
    if (submit) {
      return 'color-red';
    }
    return '';
  };
  return (
    <>
      <Modal isOpen centered>
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            Change Password
          </h5>
          <button
            type="button"
            onClick={close}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <AvForm
            className="form-horizontal"
            onValidSubmit={changePassword}
            onInvalidSubmit={handleInvalid}
          >
            <div className="mb-5 position-relative">
              <div>
                <AvField
                  name="oldPassword"
                  value={oldPass}
                  type={show.oldpassword ? 'text' : 'password'}
                  errorMessage="Old password is required"
                  required
                  placeholder="Enter Old Password"
                  onChange={e => setOldPass(e.target.value.trim())}
                />
              </div>
              <div className={`${show.oldpassword ? 'password-eye-view' : 'password-eye'}`}>
                <i
                  onClick={() => handleShow('oldpassword')}
                  className={
                    !show.oldpassword
                      ? 'fas fa-eye-slash position-absolute ml-5'
                      : 'fas fa-eye position-absolute ml-5'
                  }
                />
              </div>
              {/* <div className="d-flex justify-content-end reset__icon">
                        </div> */}
            </div>
            <div className="mb-5 position-relative">
              <div>
                <AvField
                  name="newPassword"
                  value={pass}
                  type={show.password ? 'text' : 'password'}
                  errorMessage="Password is required"
                  required
                  placeholder="Enter New Password"
                  onChange={e => setPass(e.target.value.trim())}
                  validate={{
                    required: { value: true },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d("!#$%&'()*+,-.:;<=>?@^_`{|}~)*]{10,}$/,
                      errorMessage: 'Enter valid password match with below conditions',
                    },
                  }}
                />
              </div>
              <div className={`${show.password ? 'password-eye-view' : 'password-eye'}`}>
                <i
                  onClick={() => handleShow('password')}
                  className={
                    !show.password
                      ? 'fas fa-eye-slash position-absolute ml-5'
                      : 'fas fa-eye position-absolute ml-5'
                  }
                />
              </div>
              {/* <div className="d-flex justify-content-end reset__icon">
                        </div> */}
            </div>

            <div className="mb-5 position-relative">
              <div>
                <AvField
                  name="confirmPassword"
                  value=""
                  type={show.conpassword ? 'text' : 'password'}
                  errorMessage="Password is required"
                  required
                  placeholder="Retype New Password"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required' },
                    match: {
                      value: 'newPassword',
                      errorMessage: 'Password does not match with new password',
                    },
                  }}
                />
              </div>

              <div className={`${show.conpassword ? 'password-eye-view' : 'password-eye'}`}>
                <i
                  onClick={() => handleShow('conpassword')}
                  className={
                    !show.conpassword
                      ? 'fas fa-eye-slash position-absolute ml-5'
                      : 'fas fa-eye position-absolute ml-5'
                  }
                />
              </div>
              {/* <div className="d-flex justify-content-end reset__icon">
                        </div> */}
            </div>

            <div className="mt-4 text-end">
              <button
                className="btn btn-primary w-sm waves-effect waves-light w-100 py-2"
                type="submit"
              >
                {isLoading ? <Spinner size="sm" /> : 'Change Password'}
              </button>
            </div>
          </AvForm>

          <div className="Reset_Para mt-3">
            <p className={isMatch(1)}>
              1. At least 10 characters with atleast 1 uppercase and 1 lowercase letters.
            </p>
            <p className={isMatch(2)}>2. A mixture of letters and Numbers.</p>
            <p className={isMatch(3)}>3.Inclusion of at least one special character</p>
            {/* <p>4. Change password in every 90 Days to increase security.</p> */}
          </div>
          <Alert color="info">NOTE : Change password in every 90 Days to increase security</Alert>
        </div>
      </Modal>
    </>
  );
};

export default ChangePassword;
