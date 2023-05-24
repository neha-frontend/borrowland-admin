import React from 'react';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Col, Modal, Row, Spinner } from 'reactstrap';
import { useSelector } from 'react-redux';

const AddMarketModal = ({ close, addMarket }) => {
  const { createLoader } = useSelector(state => state.market);
  return (
    <div>
      <Modal isOpen centered style={{ maxWidth: '700px' }}>
        <div className="modal-header">
          <div className="d-flex justify-content-left">
            <h5 className="modal-title mt-0" id="myModalLabel">
              Add Market
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
        <AvForm onValidSubmit={addMarket}>
          <div className="modal-body">
            <Row>
              <Col lg="6" className="px-3 py-2 ">
                <AvField
                  name="marketName"
                  type="text"
                  label="Name"
                  className="form-control"
                  id="basicpill-pancard-input5"
                  required
                />
              </Col>
              <Col lg="6" className="px-3 py-2 ">
                <AvField
                  name="state"
                  type="text"
                  label="State"
                  className="form-control"
                  id="basicpill-pancard-input5"
                  required
                />
              </Col>
              <Col lg="6" className="px-3 py-2 ">
                <AvField
                  name="city"
                  type="text"
                  label="City"
                  className="form-control"
                  id="basicpill-pancard-input5"
                  required
                />
              </Col>
              <Col lg="6" className="px-3 py-2 ">
                <AvField
                  name="propertyGrowth"
                  type="number"
                  label="5-Year Historical Appreciation"
                  className="form-control"
                  id="basicpill-pancard-input5"
                  required
                />
              </Col>
              <Col lg="6" className="px-3 py-2 ">
                <AvField
                  name="rentGrowth"
                  type="number"
                  label="5-Year Historical Rent Growth"
                  className="form-control"
                  id="basicpill-pancard-input5"
                  required
                />
              </Col>
              <Col lg="6" className="px-3 py-2 ">
                <AvField
                  name="marketRating"
                  type="number"
                  label="Market rating"
                  className="form-control"
                  id="basicpill-pancard-input5"
                  required
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
              {createLoader ? <Spinner size="sm" /> : 'Add Market'}
            </button>
          </div>
        </AvForm>
      </Modal>
    </div>
  );
};

export default AddMarketModal;
