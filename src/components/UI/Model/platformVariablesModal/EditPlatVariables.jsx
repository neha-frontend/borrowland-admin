// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { Col, Label, Modal, Spinner } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import { platVariableUpdate } from 'store/actions';
// import PhoneInput from 'react-phone-input-2';

const EditPlatformvariables = ({ isOpen, close, model }) => {
  const dispatch = useDispatch();
  const { platVariableSingleData, isLoading, isPlatLoading } = useSelector(
    state => state.platformVariable,
  );
  console.log(isLoading, isPlatLoading, platVariableSingleData, 'isLoading');
  const submit = (event, values) => {
    const param = {
      tenure: values.tenure,
      value: values.value,
    };
    dispatch(platVariableUpdate({ id: platVariableSingleData?._id, param }));
    // if (!phone) {
    //   setError('phone number is required');
    // } else if (adminObj?.name && adminObj?.email) {
    //   const objToPost = adminObj;
    //   if (isOpen === 'edit') {
    //     objToPost.status = adminDetails.status;
    //     delete objToPost.email;
    //   }
    // onSubmit();
    // }
  };
  return (
    <>
      <div>
        <div>
          <Modal centered isOpen={!!isOpen}>
            <div className="modal-header">
              <h5 className="modal-title mt-0 text-center w-100" id="myModalLabel">
                Edit Platform Variables
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
                    Variable Name
                  </Label>
                  <Col sm={12}>
                    {isPlatLoading ? (
                      <div className="skel" />
                    ) : (
                      <AvField
                        type="text"
                        className="form-control"
                        id="horizontal-firstname-Input"
                        name="name"
                        disabled
                        value={platVariableSingleData?.displayName}
                        placeholder="Name"
                      />
                    )}
                  </Col>
                </div>
                {platVariableSingleData?.values && platVariableSingleData?.values[0]?.tenure && (
                  <div className="row mb-4">
                    <Label for="horizontal-email-Input" className="col-sm-3 col-form-Label">
                      Tenure
                    </Label>
                    <Col sm={12}>
                      {isPlatLoading ? (
                        <div className="skel" />
                      ) : (
                        <AvField
                          name="tenure"
                          type="select"
                          className="form-control form-select"
                          id="tenure"
                        >
                          <option value="" disabled>
                            Select tenure
                          </option>
                          {platVariableSingleData?.values?.map(item => (
                            <option value={item.tenure}>{item.tenure} Months</option>
                          ))}
                          {/* <option value="daily">Daily</option> */}
                          {/* <option value="15">15 Days</option> */}
                          {/* <option value="1">1 Month</option>
                      <option value="3">3 Months</option>
                      <option value="6">6 Months</option> */}
                        </AvField>
                      )}
                    </Col>
                  </div>
                )}
                <div className="row">
                  <Label for="horizontal-password-Input" className="col-sm-3 col-form-Label">
                    Value (%)
                  </Label>
                  <Col sm={12}>
                    {isPlatLoading ? (
                      <div className="skel" />
                    ) : (
                      <AvField
                        type="number"
                        className="form-control"
                        id="horizontal-firstname-Input"
                        name="value"
                        validate={{
                          required: {
                            value: true,
                            errorMessage: 'Please enter some value',
                          },
                          min: {
                            value: 0,
                            errorMessage: 'Value should be greater than 0 and equal to 100.',
                          },
                          max: {
                            value: 100,
                            errorMessage: 'Value should be greater than 0 and equal to 100.',
                          },
                        }}
                        // disabled
                        // value={platVariableSingleData?.variableName}

                        placeholder="Enter value (%)"
                      />
                    )}

                    {/* <AvField
                      name="value"
                      type="select"
                      className="form-control form-select"
                      id="value"
                    >
                      {platVariableSingleData?.values?.map((item)=>
                       <option value={item.rate}>{item.rate} %</option> 
                      
                      )}
                    
                    </AvField> */}
                  </Col>
                </div>
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
                      <button
                        type="submit"
                        className="btn btn-success waves-effect waves-light w-100"
                        disabled={isPlatLoading || isLoading}
                      >
                        {isLoading ? (
                          <Spinner className="" style={{ height: 20, width: 20 }} />
                        ) : (
                          'Update'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </AvForm>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default EditPlatformvariables;
