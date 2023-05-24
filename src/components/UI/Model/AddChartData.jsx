import React from 'react';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Col, Modal, Row } from 'reactstrap';

const AddChartData = ({ close, handleSubmit, model }) => (
  <div>
    <Modal isOpen centered >
      <div className="modal-header">
        <div className="d-flex justify-content-left">
          <h5 className="modal-title mt-0" id="myModalLabel">
            Add Chart Data
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
            <Col lg="6">
              <AvField
                name="year"
                type="number"
                label="Enter year"
                className="form-control"
                id="basicpill-pancard-input5"
                required
              />
            </Col>
            <Col lg="6">
              <AvField
                name="rent"
                type="number"
                label="Enter rent amount($)"
                className="form-control"
                id="basicpill-pancard-input5"
                required
              />
            </Col>
            <Col lg="6" className="mt-2">
              <AvField
                name="appreciation"
                type="number"
                label="Enter appreciation($)"
                className="form-control"
                id="basicpill-pancard-input5"
                required
                row={5}
              />
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
            {model ? 'Update' : 'Add'}
          </button>
        </div>
      </AvForm>
    </Modal>
  </div>
);

export default AddChartData;
