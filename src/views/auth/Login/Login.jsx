import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, CardBody, Card, Container, Alert } from 'reactstrap';
import './login.css';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { useSelector, useDispatch } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import * as actions from 'store/actions';
import Scan2FAModal from 'components/UI/Model/authenticationmodals/scan2FAmodal';
import Select2faModal from 'components/UI/Model/authenticationmodals/select2FA';
import ForgotPasswordModal from 'components/UI/Model/authenticationmodals/forgotPasswordModal';
import { LOGO_IMG } from 'assets/images';
import LogoLoader from 'components/UI/Spinner/LogoSpinner';

// const TOKEN =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzczM2RkNTE4NDUyODNjMjYwYzYxNWUiLCJlbWFpbCI6InBhcnRoLmdhZ2dhckBzb2x1bGFiLmNvIiwiY291bnRyeUNvZGUiOiIrOTEiLCJtb2JpbGVOdW1iZXIiOjk5NTIzNzk2NzgsInR3b0ZBIjp7ImF1dGhlbnRpY2F0b3IiOmZhbHNlLCJzbXMiOmZhbHNlLCJub25lIjp0cnVlfSwiZGV2aWNlSWQiOiI2Mzk3NDZhMTc2YWI3NTllNTNmOThjNWIiLCJpYXQiOjE2NzEwMTI4MDQsImV4cCI6MTY3MTA5OTIwNH0.1-KQpe35zaUWcfYcJD-dSchfdqlvQlrIPXM8cu4yWwk';
const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [remember, setRemember] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [show, setShow] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [selct2fa, setSelect2fa] = useState(false);
  const [scan2fa, setScan2fa] = useState(false);
  const { isLogin, errorMsg, isLoading, userData } = useSelector(state => state.auth);

  useEffect(
    () => () => {
      dispatch(actions.clearAuth());
    },
    [],
  );

  const handleSubmit = (err, val) => {
    console.log(err, val);
    if (isLoading) return;
    dispatch(actions.login(val));
    // localStorage.setItem('authToken', TOKEN);
    // localStorage.setItem('email', 'parth.gaggar@solulab.co');
    // history.push('/dashboard');
    // window.location.reload();
  };
  useEffect(() => {
    if (isLogin) {
      if (userData.forceUpdatePassword) {
        history.push({ pathname: '/reset-password', state: userData._id });
        return;
      }
      console.log('MOBILE', userData);
      history.push({ pathname: '/otp', state: userData });
    }
  }, [isLogin]);
  return (
    <>
      <div className="account-pages my-5 pt-sm-5 login__hero">
        {isLoading && <LogoLoader />}
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <div className="text-center mt-4">
                  <div className="d-block auth-logo">
                    <img src={LOGO_IMG} alt="" height="45" className="logo logo-dark" />
                  </div>
                </div>

                <CardBody className="p-4">
                  <div className="text-center">
                    <h5 className="login__header">Login</h5>
                  </div>
                  <div className="p-2 mt-4">
                    {errorMsg && (
                      <div>
                        <Alert color="danger">{errorMsg}</Alert>
                      </div>
                    )}
                    <AvForm className="form-horizontal" onValidSubmit={handleSubmit}>
                      <div className="mb-3">
                        <AvField
                          name="email"
                          label="Email"
                          value=""
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                          errorMessage="Invalid email."
                        />
                      </div>

                      <div className="mb-3">
                        <Col sm={12} className="d-flex justify-content-end">
                          <AvField
                            name="password"
                            label="Password"
                            value=""
                            type={show ? 'text' : 'password'}
                            errorMessage="Password is required."
                            required
                            placeholder="Enter password"
                          />
                          <i
                            onClick={() => setShow(prev => !prev)}
                            className={
                              show
                                ? 'fas fa-eye-slash position-absolute mx-3'
                                : 'fas fa-eye position-absolute mx-3'
                            }
                            style={{ marginTop: '42px' }}
                          />
                        </Col>
                        <div className="float-end forgot_link">
                          <a onClick={() => setForgot(true)}>Forgot password?</a>
                        </div>
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                          checked={remember}
                          onChange={() => setRemember(i => !i)}
                        />
                        <label className="form-check-label" htmlFor="customControlInline">
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3 text-end">
                        <button
                          className="btn btn-primary w-sm waves-effect waves-light w-100 py-2"
                          type="submit"
                        >
                          Log In
                          {/* {isLoading ? <Spinner size="sm" /> : 'Log In'} */}
                        </button>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Select2faModal isOpen={selct2fa} onClose={setSelect2fa} next={setScan2fa} />
        <Scan2FAModal isOpen={scan2fa} onClose={setScan2fa} />
        {successAlert && (
          <SweetAlert
            title="Request for forgot password sent successfully, super admin will send the temporary password on your email."
            success
            confirmBtnBsStyle="success"
            onConfirm={() => setSuccessAlert(false)}
          />
        )}
        {forgot && (
          <ForgotPasswordModal
            open
            close={setForgot}
            success={() => {
              setSuccessAlert(true);
              setForgot(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Login;
