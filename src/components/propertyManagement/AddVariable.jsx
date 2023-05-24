import React from 'react';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Col, Modal, Row } from 'reactstrap';

export const AddVariable = ({ close, handleSubmit, model }) => (
  <Modal isOpen centered style={{ maxWidth: '600px' }}>
    <div className="modal-header">
      <div className="d-flex justify-content-left">
        <h5 className="modal-title mt-0" id="myModalLabel">
          Add Variable
        </h5>
      </div>
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
    <AvForm onValidSubmit={handleSubmit} model={model}>
      <div className="modal-body">
        <Row>
          <Col lg="6" className="px-3 py-2 ">
            <AvField
              name="name"
              type="text"
              label="Enter Name"
              className="form-control"
              id="basicpill-pancard-input5"
              required
            />
          </Col>
          <Col lg="6" className="px-3 py-2 ">
            <AvField
              name="value"
              type="number"
              label="Enter Value"
              className="form-control"
              id="basicpill-pancard-input5"
              required
            />
          </Col>
          <Col lg="6" className="px-3 py-2 mt-2">
            <AvField
              name="applicable"
              type="select"
              label="Select Applicable"
              className="form-control form-select"
              id="basicpill-pancard-input5"
              required
            >
              <option value="">Select Applicable</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </AvField>
          </Col>
        </Row>
      </div>
      <div className="modal-footer d-flex justify-content-center">
        <button
          type="submit"
          // onClick={addToTable}
          className="btn btn-primary waves-effect dropdownColor w-50"
          data-dismiss="modal"
        >
          Add
        </button>
      </div>
    </AvForm>
  </Modal>
);
