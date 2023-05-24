/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

// import SweetAlert from "react-bootstrap-sweetalert";

import { Row, Col, Container, Card, CardBody, Label } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PhoneInput from 'react-phone-input-2';
import { useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import Breadcrumb from 'components/UI/Common/Breadcrumb';
import avatar from 'assets/images/avatar.jpg';
import 'react-phone-input-2/lib/style.css';
import ChangePassword from 'views/auth/Login/ChangePassword';
import PhoneInputModal from 'components/PhoneInputModal';
import OtpModal from 'components/OtpModal';

const MyProfile = () => {
  const [isOtpModal, setOtpModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);
  const [data, setData] = useState({});
  const [successAlert, setSuccessAlert] = useState(false);
  const [copied, setCopied] = useState(false);
  const [successAlertOtp, setSuccessAlertOtp] = useState(false);
  const { name, countryCode, email, mobileNumber } = useSelector(state => state.auth);
  // const handleChange = num => setNumber(num);
  const openOtpModal = value => {
    setOtpModal(!isOtpModal);
    setData({
      ...data,
      ...value,
    });
  };
  const success = () => {
    setOtpModal(!isOtpModal);
    setSuccessAlertOtp(true);
  };
  const handlePassword = () => setPasswordModal(prev => !prev);
  const handlePhone = () => setPhoneModal(prev => !prev);
  const handleOtpModal = () => setOtpModal(prev => !prev);
  function copyToCLipBoard(value) {
    try {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
      // toaster(`Address Copied`, {
      //   type: 'success',
      //   className: 'toaster-success',
      // });
    } catch (err) {
      // toaster(`Something went wrong`, {
      //   type: 'success',
      //   className: 'toaster-success',
      // });
    }
  }
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb
            title="UI Elements"
            breadcrumbItem="Tabs & Accordions"
            items={[{ name: 'Profile' }]}
          />
          <Card>
            <CardBody className="w-75 m-auto">
              <Row style={{ padding: '20px 0px' }}>
                <Col sm="12" md={{ size: 8, offset: 2 }}>
                  {/* <h5 className="text-center">Enter Your Details</h5> */}
                  <div style={{ padding: '20px 80px' }}>
                    <>
                      <AvForm>
                        <div className="text-center">
                          {/* <i
                            className="fas fa-user mx-2"
                            style={{ fontSize: '60px', marginBottom: '30px' }}
                          /> */}
                          <img
                            src={avatar}
                            alt=""
                            className="avatar-md rounded-circle img-thumbnail"
                          />
                          <div className="d-flex align-items-center justify-content-center py-2">
                            <div>
                              {'0x9824A513fcb4321a170f421fD3Fbf071A16af515'.replace(
                                /.(?<=\w{7})\w(?=\w{6})/g,
                                '.',
                              )}
                            </div>
                            {copied ? (
                              <div className="color-green">
                                <i className="fas fa-check ms-3 me-1" />
                                Copied
                              </div>
                            ) : (
                              <i
                                className="fas fa-clone mb-0 cursor-pointer ms-3"
                                onClick={() =>
                                  copyToCLipBoard('0x9824A513fcb4321a170f421fD3Fbf071A16af515')
                                }
                              />
                            )}
                            {/* <i className="fas fa-clone mx-2 mt-3" /> */}
                          </div>
                        </div>
                        <div className="mb-3">
                          <AvField
                            name="name"
                            label="Full Name"
                            id="YourName"
                            className="py-2"
                            type="text"
                            errorMessage="Name is required"
                            value={name}
                            disabled
                          />
                        </div>
                        <div className="mb-3">
                          <AvField
                            name="email"
                            label="Email"
                            id="YourName"
                            type="Email"
                            className="py-2"
                            errorMessage="Email is required"
                            value={email}
                            disabled
                          />
                        </div>
                        <div className="mb-3">
                          <Label for="horizontal-firstname-Input" className="col-form-Label">
                            Mobile Number
                          </Label>
                          <PhoneInput
                            inputClass="w-100 p-4"
                            country="us"
                            value={`${countryCode}${mobileNumber}`}
                            // onChange={handleChange}
                            name="mobileno"
                            autoFormat={false}
                            countryCodeEditable={false}
                            disabled
                          />
                        </div>
                        <div className=" mt-5">
                          <Col sm="12">
                            <div className="d-flex flex-wrap justify-content-evenly">
                              <div>
                                <button
                                  type="button"
                                  onClick={handlePassword}
                                  className="btn btn-primary waves-effect waves-light dropdownColor"
                                  data-toggle="modal"
                                  data-target="#myModal"
                                >
                                  Change Password
                                </button>
                                {/* {passwordModal && (
                                  <UpdatedPassword
                                    close={setPasswordModal}
                                    next={setSuccessAlert}
                                  />
                                )} */}
                              </div>
                              <div>
                                <button
                                  type="button"
                                  onClick={handlePhone}
                                  className="btn btn-primary waves-effect waves-light dropdownColor"
                                  data-toggle="modal"
                                  data-target="#myModal"
                                >
                                  Change Phone Number
                                </button>
                                {passwordModal && <ChangePassword close={handlePassword} />}
                                {phoneModal && (
                                  <PhoneInputModal close={handlePhone} next={handleOtpModal} />
                                )}
                                {successAlert && (
                                  <SweetAlert
                                    title="Password updated successfully"
                                    success
                                    confirmBtnBsStyle="success"
                                    onConfirm={() => setSuccessAlert(false)}
                                    // showCloseButton
                                  />
                                )}
                                {successAlertOtp && (
                                  <SweetAlert
                                    title="Mobile number updated successfully"
                                    success
                                    confirmBtnBsStyle="success"
                                    onConfirm={() => setSuccessAlertOtp(false)}
                                    // showCloseButton
                                  />
                                )}
                                {isOtpModal && (
                                  <OtpModal
                                    close={handleOtpModal}
                                    next={() => setSuccessAlertOtp(true)}
                                  />
                                )}
                              </div>
                            </div>
                          </Col>
                        </div>
                      </AvForm>
                    </>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default MyProfile;
