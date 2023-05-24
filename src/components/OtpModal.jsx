import React, { useState, useEffect } from 'react';
import { Modal } from 'reactstrap';
import Otpmodal from 'react-otp-input';

const OtpModal = ({ close, next }) => {
  const [modalEdit, setModalEdit] = useState(false);
  const [otp, setOtp] = useState('');
  const [error] = useState('');
  const [time, setTime] = useState(30);
  const [timer, setTimer] = useState('');
  const handleChange = e => setOtp(e);
  // const str = `${data.countryCode}${data.mobileNumber}`.replace(/.(?=.{4})/g, 'X');
  function togEdit() {
    setModalEdit(!modalEdit);
  }
  const verfiyOtp = () => {
    close();
    next();
    // verify otp
  };
  useEffect(() => {
    if (time) {
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          setTime(time - 1);
        }, 1000),
      );
    }
  }, [time]);
  return (
    <>
      <div>
        <div>
          <Modal
            isOpen
            centered
            toggle={() => {
              togEdit();
            }}
          >
            <div className="modal-header justify-content-center">
              <h5 className="modal-title mt-0" id="myModalLabel">
                Enter OTP
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
              <div className="">
                <div className="text-center">
                  <p className="text-muted mt-3">
                    Verify the code sent to your mobile <br />
                    number +XXXXXX8909 to Login.
                  </p>
                </div>
                <div className="d-flex flex-row mt-4 justify-content-center">
                  <Otpmodal
                    numInputs={6}
                    value={otp}
                    onChange={handleChange}
                    isInputNum
                    // inputStyle={{
                    //   padding: 10,
                    //   marginRight: 20,
                    //   border: '1px solid #828A9C',
                    //   borderRadius: 3,
                    //   width: 40,
                    //   height: 50,
                    // }}
                    inputStyle={{
                      padding: 10,
                      marginRight: 20,
                      border: '1px solid #828A9C',
                      borderRadius: 3,
                      width: 50,
                      height: 50,
                      textAlign:"center"
                    }}
                  />
                </div>
              </div>
              <div className="mt-4 d-flex justify-content-center">
                <span className="d-block mobile-text">Don&apos;t receive the code?</span>{' '}
                &nbsp;&nbsp;
                {time ? (
                  <span className="font-weight-bold">
                    <p className="cursor-pointer">Resend code in {time} seconds</p>
                  </span>
                ) : (
                  <span className="font-weight-bold" style={{ cursor: 'pointer' }}>
                    <a className="cursor-pointer">Resend code</a>
                  </span>
                )}
              </div>
            </div>
            <p>{error}</p>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light dropdownColor"
                onClick={verfiyOtp}
              >
                Verify OTP
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default OtpModal;
