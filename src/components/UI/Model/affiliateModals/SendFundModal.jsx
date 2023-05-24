import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { Col, Label, Modal, Row } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';

import RenderIf from 'components/RenderIf';

import 'react-phone-input-2/lib/style.css';
import './sendFundModal.css';

const SendFundModal = ({ isOpen, close, model, onSubmit }) => {
  //   const [number, setNumber] = useState('');
  //   const [phone, setPhone] = useState('');
  //   const [error, setError] = useState('');
  //   const [, setCountryCode] = useState('1');
  const [adminObj, setAdminObj] = useState({
    wallet: '',
    comment: '',
  });
  //   const { generatingTempPass } = useSelector(state => state.admins);
  //   useEffect(() => {
  //     const { mobileNumber, countryCode } = adminDetails;
  //     if (isOpen !== 'create') {
  //       setAdminObj({
  //         name: adminDetails.name || '',
  //         email: adminDetails.email || '',
  //         mobileNumber: adminDetails.mobileNumber || '',
  //         countryCode: adminDetails.countryCode || '',
  //       });

  //       if (adminDetails?.mobileNumber) {
  //         const phoneNumber = `${countryCode || ''}${mobileNumber || ''}`;
  //         setNumber(phoneNumber);
  //         setPhone(adminDetails?.mobileNumber.toString());
  //       }
  //     }
  //     return () => {
  //       setAdminObj({
  //         wallet: '',
  //         commnet: '',

  //       });
  //     };
  //   }, []);

  //   const handleChange = (x, num) => {
  //     const l = num.dialCode.length;
  //     const mobile = x.slice(l);
  //     setNumber(x);
  //     setPhone(mobile);
  //     setCountryCode(num.dialCode);
  //     if (mobile) {
  //       setError('');
  //       setAdminObj({ ...adminObj, mobileNumber: mobile, countryCode: `+${num.dialCode}` });
  //     } else {
  //       setError('Phone number is required');
  //     }
  //   };

  // function togCreate() {
  //   close(false);
  // }

  const submit = () => {
    setAdminObj('');
    // if (!phone) {
    //   setError('phone number is required');
    // } else if (adminObj?.name && adminObj?.email) {
    //   const objToPost = adminObj;
    //   if (isOpen === 'edit') {
    //     objToPost.status = adminDetails.status;
    //     delete objToPost.email;
    //   }
    //   onSubmit(objToPost);
    // }
  };

  return (
    <>
      <div>
        <div>
          <Modal centered isOpen={!!isOpen}>
            <div className="modal-header justify-content-center">
              <h5 className="modal-title mt-0" id="myModalLabel">
                Send Funds
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
                <div className="p-4 d-flex">
                  <div className="user-title left_title"> Wallet Address</div>
                  <div>0x3213...900dww</div>
                </div>
                <div className="p-4 d-flex">
                  <div className="user-title left_title">Transfer</div>
                  <div className="d-flex">
                    <Col lg={4} xs={4}>
                      <AvField
                        name="currency"
                        type="select"
                        className="form-control form-select"
                        id="basicpill-pancard-input5"
                      >
                        <option value="btc">BTC</option>
                        <option value="eth">ETH</option>
                        <option value="usdc">USDC</option>
                        <option value="usdt">USDT</option>
                      </AvField>
                    </Col>

                    <AvField
                      name="text"
                      id="horizontal-comment-Input"
                      value={adminObj?.comment}
                      className="form-control"
                      placeholder="Enter Amount"
                      type="text"
                      //   onChange={e => (adminObj.email = e?.target?.value)}
                    />
                  </div>
                </div>

                <div className="row mb-4 p-2">
                  <Label for="horizontal-comment-Input" className="col-sm-3 col-form-Label">
                    Comments
                  </Label>
                  <Col sm={12}>
                    <AvField
                      name="text"
                      id="horizontal-comment-Input"
                      value={adminObj?.comment}
                      className="form-control"
                      placeholder="Enter comment here"
                      type="textarea"
                      //   onChange={e => (adminObj.email = e?.target?.value)}
                    />
                  </Col>
                </div>
              </AvForm>
            </div>
            <RenderIf render>
              <div className="modal-footer">
                {/* <button
                  type="button"
                  onClick={() => {
                    togCreate();
                  }}
                  className="btn btn-primary waves-effect w-50"
                  data-dismiss="modal"
                >
                  Close
                </button> */}
                <Row className="w-100">
                  <Col xs={6}>
                    <button
                      type="button"
                      onClick={() => {
                        onSubmit();
                      }}
                      // disabled={generatingTempPass}
                      className="btn btn-success waves-effect waves-light w-100"
                    >
                      {/* {generatingTempPass ? <Spinner size="sm" /> : 'Update'} */}
                      Confirm
                    </button>
                  </Col>
                  <Col xs={6}>
                    <button
                      type="button"
                      onClick={() => {
                        onSubmit();
                      }}
                      // disabled={generatingTempPass}
                      className="btn btn-danger waves-effect waves-light w-100"
                    >
                      {/* {generatingTempPass ? <Spinner size="sm" /> : 'Update'} */}
                      Cancel
                    </button>
                  </Col>
                </Row>
              </div>
            </RenderIf>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default SendFundModal;
