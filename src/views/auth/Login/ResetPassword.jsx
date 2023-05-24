import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, CardBody, Card, Container, Alert, Spinner } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import SweetAlert from 'react-bootstrap-sweetalert';
import './login.css';
import { clearAuth, passwordReset } from 'store/actions';

const ResetPassword = ({ value }) => {
  console.log('value', value);
  const [show, setShow] = useState({ password: false, conpassword: false });
  const { errorMsg, isResetPassword, isLoading } = useSelector(state => state.auth);
  const [submit, setSubmit] = useState(false);
  const [pass, setPass] = useState('');
  const { state } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const matchObj = {
    1: pass.length >= 10 && pass.match(/[A-Z]/) && pass.match(/[a-z]/),
    2: pass.match(/[A-Za-z]/) && pass.match(/[0-9]/),
    3: pass.match(/[*@!#%&()^~{}]+/),
  };
  // Finding query [otp and email]
  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }
  const Query = useQuery();
  const otp = Query.get('otp');
  const email = Query.get('email');

  useEffect(() => {
    if (!state);
    return () => dispatch(clearAuth());
  }, []);
  const handleShow = val => {
    setShow(prev => ({ ...prev, [val]: !prev[val] }));
  };
  const resetPassword = (err, val) => {
    dispatch(passwordReset({ password: val.conpassword, email, otp }));
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
      <div className="account-pages my-5 pt-sm-5 login__hero">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col md={8} lg={6} xl={6}>
              <Card>
                <CardBody className="p-4">
                  <div className="text-center mt-4 mb-2">
                    <h5 className="Reset__header">Reset Password</h5>
                  </div>
                  <div className="p-2 mt-4">
                    {errorMsg && (
                      <div>
                        <Alert color="danger">{errorMsg}</Alert>
                      </div>
                    )}
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={resetPassword}
                      onInvalidSubmit={handleInvalid}
                    >
                      <div className="mb-5 position-relative">
                        <div>
                          <AvField
                            name="password"
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
                        <div className="password-eye">
                          <i
                            onClick={() => handleShow('password')}
                            className={
                              !show.password
                                ? 'fas fa-eye-slash position-absolute mx-3'
                                : 'fas fa-eye position-absolute mx-3'
                            }
                          />
                        </div>
                        {/* <div className="d-flex justify-content-end reset__icon">
                        </div> */}
                      </div>

                      <div className="mb-5 position-relative">
                        <div>
                          <AvField
                            name="conpassword"
                            value=""
                            type={show.conpassword ? 'text' : 'password'}
                            errorMessage="Password is required"
                            required
                            placeholder="Retype New Password"
                            validate={{
                              required: { value: true, errorMessage: 'This field is required' },
                              match: {
                                value: 'password',
                                errorMessage: 'Password does not match with new password',
                              },
                            }}
                          />
                        </div>

                        <div className="password-eye">
                          <i
                            onClick={() => handleShow('conpassword')}
                            className={
                              !show.conpassword
                                ? 'fas fa-eye-slash position-absolute mx-3'
                                : 'fas fa-eye position-absolute mx-3'
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
                          {isLoading ? <Spinner size="sm" /> : 'Reset Password'}
                        </button>
                      </div>
                    </AvForm>
                  </div>
                  <div className="Reset_Para mt-3">
                    <p className={isMatch(1)}>
                      1. At least 10 characters with atleast 1 uppercase and 1 lowercase letters.
                    </p>
                    <p className={isMatch(2)}>2. A mixture of letters and Numbers.</p>
                    <p className={isMatch(3)}>3.Inclusion of at least one special character</p>
                    {/* <p>4. Change password in every 90 Days to increase security.</p> */}
                  </div>
                  <Alert color="info">
                    NOTE : Change password in every 90 Days to increase security
                  </Alert>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        {isResetPassword && (
          <SweetAlert
            title="Password reset successfully please login"
            success
            confirmBtnBsStyle="success"
            onConfirm={() => history.push('/signin')}
          />
        )}
      </div>
    </>
  );
};

export default ResetPassword;
