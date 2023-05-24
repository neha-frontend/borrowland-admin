import React from 'react';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Col, Modal, Row } from 'reactstrap';

const AddStepModal = ({ close, handleSubmit, model }) => (
  <div>
    <Modal isOpen centered style={{ maxWidth: '600px' }}>
      <div className="modal-header">
        <div className="d-flex justify-content-left">
          <h5 className="modal-title mt-0" id="myModalLabel">
            Add Step
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
                label="Enter step name"
                className="form-control"
                id="basicpill-pancard-input5"
                required
              />
            </Col>
            <Col lg="6" className="px-3 py-2 ">
              <AvField
                name="date"
                type="date"
                label="Enter date"
                className="form-control"
                id="basicpill-pancard-input5"
                required
              />
            </Col>
            <Col lg="12" className="px-3 py-2 mt-2">
              <AvField
                name="description"
                type="textarea"
                label="Enter step description"
                className="form-control"
                id="basicpill-pancard-input5"
                required
                rows={5}
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
            {model ? 'Update Step' : 'Add Step'}
          </button>
        </div>
      </AvForm>
    </Modal>
  </div>
);

export default AddStepModal;
