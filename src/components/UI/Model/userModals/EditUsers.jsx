import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { Col, Label, Modal, Spinner } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import PhoneInput from 'react-phone-input-2';

import RenderIf from 'components/RenderIf';

import 'react-phone-input-2/lib/style.css';
import { useSelector } from 'react-redux';

const EditUsers = ({ isOpen, close, model, onSubmit }) => {
  const [number, setNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [, setCountryCode] = useState('1');
  const [adminObj, setAdminObj] = useState({
    name: '',
    email: '',
    mobile: '',
    countryCode: '',
  });
  const { userDetails, isLoading, isSubmitted } = useSelector(state => state.user);
  useEffect(() => {
    if (userDetails) {
      const { mobile, countryCode } = userDetails;
      if (isOpen !== 'create') {
        setAdminObj({
          fullName: userDetails.fullName || '',
          email: userDetails?.email || '',
          mobile: userDetails?.mobile || '',
          countryCode: userDetails.countryCode || '',
        });

        if (userDetails?.mobile) {
          const phoneNumber = `${countryCode || ''}${mobile || ''}`;
          setNumber(phoneNumber);
          setPhone(userDetails?.mobile.toString());
        }
      }
    }

    return () => {
      setAdminObj({
        fullName: '',
        email: '',
        mobile: '',
        countryCode: '',
      });
    };
  }, [userDetails]);

  const handleChange = (x, num) => {
    const l = num.dialCode.length;
    const mobile = x.slice(l);
    setNumber(x);
    setPhone(mobile);
    setCountryCode(num.dialCode);
    if (mobile) {
      setError('');
      setAdminObj({ ...adminObj, mobile, countryCode: `+${num.dialCode}` });
    } else {
      setError('Phone number is required');
    }
  };

  function togCreate() {
    close(false);
  }

  const submit = () => {
    console.log('DATA', adminObj, phone);
    if (!phone) {
      setError('phone number is required');
    } else if (adminObj?.fullName && adminObj?.email) {
      const objToPost = adminObj;
      // if (isOpen === 'edit') {
      //   objToPost.status = adminDetails.status;
      //   delete objToPost.email;
      // }

      onSubmit(objToPost);
    }
  };

  return (
    <>
      <div>
        <div>
          <Modal centered isOpen={!!isOpen}>
            <div className="modal-header">
              <h5 className="modal-title mt-0 text-center w-100" id="myModalLabel">
                {isOpen === 'view' ? 'View' : isOpen === 'edit' ? 'Edit' : 'Create'} User
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
              <AvForm onValidSubmit={submit} model={model}>
                <div className="row mb-4">
                  <Label for="horizontal-firstname-Input" className="col-sm-3 col-form-Label">
                    Name
                  </Label>
                  <Col sm={12}>
                    {isLoading ? (
                      <div className="skel" />
                    ) : (
                      <AvField
                        type="text"
                        className="form-control"
                        id="horizontal-firstname-Input"
                        name="fullName"
                        value={adminObj?.fullName}
                        required
                        validate={{
                          pattern: {
                            value: /^([a-zA-Z ]{1,})$/i,
                            errorMessage: 'Enter valid User name',
                          },
                        }}
                        onChange={e => (adminObj.fullName = e?.target?.value)}
                        placeholder="Name"
                      />
                    )}
                  </Col>
                </div>
                <div className="row mb-4">
                  <Label for="horizontal-email-Input" className="col-sm-3 col-form-Label">
                    Email
                  </Label>
                  <Col sm={12}>
                    {isLoading ? (
                      <div className="skel" />
                    ) : (
                      <AvField
                        name="email"
                        value={adminObj?.email}
                        className="form-control"
                        placeholder="Enter email"
                        type="email"
                        required
                        errorMessage="Email is required"
                        validate={{
                          required: { value: true },
                          pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                            errorMessage: 'Enter valid email',
                          },
                        }}
                        onChange={e => (adminObj.email = e?.target?.value)}
                      />
                    )}
                  </Col>
                </div>
                <div className="row">
                  <Label for="horizontal-password-Input" className="col-sm-3 col-form-Label">
                    Mobile Number
                  </Label>
                  <Col sm={12}>
                    {isLoading ? (
                      <div className="skel" />
                    ) : (
                      <PhoneInput
                        inputStyle={{ width: '100%', paddingLeft: '50px', height: '50px' }}
                        country="us"
                        enableSearch
                        value={number}
                        onChange={handleChange}
                        autoFormat={false}
                        name="mobileno"
                        inputProps={{
                          name: 'mobile',
                          required: true,
                          autoFocus: true,
                        }}
                        countryCodeEditable={false}
                      />
                    )}
                  </Col>
                  <p
                    style={{
                      width: '100%',
                      marginTop: '0.25rem',
                      fontSize: '87.5%',
                      color: '#f46a6a',
                    }}
                  >
                    {error}
                  </p>
                </div>
                <RenderIf render={isOpen === 'edit' || isOpen === 'create'}>
                  <div className="modal-footer px-0">
                    <div className="row w-100">
                      <div className="col ps-0">
                        <button
                          type="button"
                          onClick={() => {
                            close(false);
                          }}
                          className="btn btn-danger waves-effect w-100"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="col pe-0">
                        {isOpen === 'edit' && (
                          <button
                            type="submit"
                            // onClick={() => {
                            //   onSubmit();
                            // }}
                            disabled={isSubmitted}
                            className="btn btn-success waves-effect waves-light w-100"
                          >
                            {isSubmitted ? (
                              <Spinner className="" style={{ height: 20, width: 20 }} />
                            ) : (
                              'Update'
                            )}
                            {/* {generatingTempPass ? <Spinner size="sm" /> : 'Update'} */}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </RenderIf>
              </AvForm>
            </div>

            <RenderIf render={isOpen === 'view'}>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => {
                    togCreate();
                  }}
                  className="btn btn-primary waves-effect w-50 mx-auto"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </RenderIf>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default EditUsers;
