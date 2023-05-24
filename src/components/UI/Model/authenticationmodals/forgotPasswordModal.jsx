import { axiosMain } from 'http/axios/axios_main';
import React, { useState } from 'react';
import { Col, Label, Form, Input, Modal, Spinner } from 'reactstrap';
// import * as actions from '../../../store/actions';

import './authenticationModal.css';

const ForgotPasswordModal = ({ open, close, success }) => {
  const [error, setError] = useState('');
  const [values, setValues] = useState('');
  const [loader, setLoader] = useState('');

  const handleChange = event => {
    setValues(event.target.value);
    if (error && event.target.value) {
      setError('');
    }
  };
  const handleSubmit = async event => {
    event.preventDefault();
    if (!values.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setError('Enter valid email');
      return;
    }
    try {
      setLoader(true);
      await axiosMain.post('/admin/forgotPassword', { email: values });
      setLoader(false);
      success();
    } catch (err) {
      setLoader(false);
      setError(err.response?.data?.message);
    }
  };
  return (
    <>
      <div>
        <div>
          <Modal isOpen={open} centered>
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myModalLabel">
                Forgot password
              </h5>
              <button
                type="button"
                onClick={() => {
                  close(false);
                }}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form onSubmit={handleSubmit}>
                <div className="row mb-4">
                  <Label for="horizontal-email-Input" className="col-sm-3 col-form-Label">
                    Enter email
                  </Label>
                  <Col sm={12} className="d-flex justify-content-end">
                    <Input
                      type="text"
                      placeholder=" Enter Email"
                      className="form-control"
                      onChange={handleChange}
                      id="horizontal-newpassword-Input"
                      value={values}
                      name="email"
                      bsSize="lg"
                    />
                  </Col>
                </div>
                {error && (
                  <p className="text-center mb-4" style={{ color: 'red' }}>
                    {error}
                  </p>
                )}
                <Col className="text-center my-2">
                  <button
                    type="submit"
                    className="btn btn-primary waves-effect w-25 py-2"
                    data-dismiss="modal"
                  >
                    {loader ? <Spinner /> : 'Send Link'}
                  </button>
                </Col>
              </Form>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordModal;
