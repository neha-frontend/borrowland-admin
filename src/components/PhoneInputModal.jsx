import React, { useState } from 'react';

import { Col, Label, Form, Modal } from 'reactstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// import './modal.css';

const PhoneInputModal = ({ close, next }) => {
  const [number, setNumber] = useState('');
  const [, setCountryCode] = useState('1');
  const [mobileNumber, setPhone] = useState('');
  const [error, setError] = useState('');
  const handleChange = (num, data) => {
    const countryCode = data.dialCode;
    const phone = num.slice(countryCode.length);
    setPhone(phone);
    setCountryCode(countryCode);
    setNumber(num);
  };
  const sendOtp = async () => {
    close();
    next();
    if (mobileNumber) {
      // api request
      return;
    }
    setError('phone number is required');
  };
  return (
    <>
      <div>
        <div>
          <Modal isOpen centered>
            <div className="modal-header justify-content-center">
              <h5 className="modal-title mt-0" id="myModalLabel">
                Change Mobile Number
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
              <Form>
                <div className="row mb-4">
                  <Label for="horizontal-firstname-Input">Mobile Number</Label>
                  <Col sm={12}>
                    <PhoneInput
                      inputClass="w-100 h-4"
                      country="us"
                      enableSearch
                      value={number}
                      onChange={handleChange}
                      autoFormat={false}
                      countryCodeEditable={false}
                    />
                    {/* <Input
                      type="number"
                      className="form-control"
                      id="horizontal-oldpassword-Input"
                    /> */}
                  </Col>
                </div>
              </Form>
              <p style={{ color: 'red' }}>{error}</p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light dropdownColor"
                onClick={sendOtp}
              >
                Send OTP
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default PhoneInputModal;
