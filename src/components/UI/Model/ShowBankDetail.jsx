import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Col, Modal, ModalBody, Row } from 'reactstrap';

import { getBankDetails } from 'store/actions';

// static imports
import './addCard.css';

const ShowBankDetails = ({ modal, handelShowDetails, id }) => {
  const toggle = () => {
    handelShowDetails(false);
  };

  const dispatch = useDispatch();
  const { getBankDetailsData } = useSelector(state => state.account);

  useEffect(() => {
    if (id) dispatch(getBankDetails(id));
  }, [id]);

  return (
    <Modal isOpen={modal} toggle={toggle} scrollable>
      <ModalBody className="add-card-modal-body">
        <div>
          <div className="add-card-modal-header-class">
            <button
              type="button"
              onClick={toggle}
              className="modal-colse-btn-black"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>{' '}
          </div>
          <div>
            <h2 className="add-card-modal-title">Bank Account Details</h2>
          </div>
          <div>
            <div className="bill-details-subtitle">
              <h4>Bank Details</h4>
            </div>
            <Row>
              <Col className="" xs="6">
                <div className="show-bank-detail">
                  <div>
                    <h6>Bank Name</h6>
                  </div>
                  <div>
                    {getBankDetailsData && (
                      <p>
                        {getBankDetailsData?.bankAddress?.bankName
                          ? getBankDetailsData?.bankAddress?.bankName
                          : '--'}
                      </p>
                    )}
                  </div>
                </div>
                <div className="show-bank-detail">
                  <h6>Account Number</h6>
                  {getBankDetailsData && (
                    <p>
                      {getBankDetailsData?.accountNumber ? getBankDetailsData?.accountNumber : '--'}
                    </p>
                  )}
                </div>
                <div className="show-bank-detail">
                  <h6>Account Holder</h6>
                  {getBankDetailsData && (
                    <p>
                      {getBankDetailsData?.billingDetails?.name
                        ? getBankDetailsData?.billingDetails?.name
                        : '--'}
                    </p>
                  )}
                </div>
                <div className="show-bank-detail">
                  <h6>Bank Country</h6>
                  {getBankDetailsData && (
                    <p>
                      {getBankDetailsData?.billingDetails?.country
                        ? getBankDetailsData?.billingDetails?.country
                        : '--'}
                    </p>
                  )}
                </div>
              </Col>

              <Col className="" xs="6">
                <div className="show-bank-detail">
                  <h6>Plaid Token</h6>
                  {getBankDetailsData && (
                    <p>{getBankDetailsData?.plaidtoken ? getBankDetailsData?.plaidtoken : '--'}</p>
                  )}
                </div>
                <div className="show-bank-detail">
                  <h6>Account Type</h6>
                  {getBankDetailsData && (
                    <p>{getBankDetailsData?.type ? getBankDetailsData?.type : '--'}</p>
                  )}
                </div>
                <div className="show-bank-detail">
                  <h6>Email</h6>
                  {getBankDetailsData && (
                    <p>{getBankDetailsData?.email ? getBankDetailsData?.email : '--'}</p>
                  )}
                </div>
                <div className="show-bank-detail">
                  <h6>Phone Num</h6>
                  {getBankDetailsData && (
                    <p>
                      {getBankDetailsData?.mobileNumber ? getBankDetailsData?.mobileNumber : '--'}
                    </p>
                  )}
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <div className="bill-details-subtitle">
              <h4>Billing Details</h4>
            </div>
            <Row>
              <Col className="" xs="6">
                <div className="show-bank-detail">
                  <h6>Acc.Holder Name</h6>
                  {getBankDetailsData && (
                    <p>
                      {getBankDetailsData?.billingDetails?.name
                        ? getBankDetailsData?.billingDetails?.name
                        : '--'}
                    </p>
                  )}
                </div>
                <div className="show-bank-detail">
                  <h6>Account Number</h6>
                  {getBankDetailsData && (
                    <p>
                      {getBankDetailsData?.accountNumber ? getBankDetailsData?.accountNumber : '--'}
                    </p>
                  )}
                </div>
                {/* <div className="show-bank-detail">
                  <h6>Account Holder</h6>
                  {getBankDetailsData && (
                    <p>
                      {getBankDetailsData?.billingDetails?.name
                        ? getBankDetailsData?.billingDetails?.name
                        : '--'}
                    </p>
                  )}
                </div> */}
                <div className="show-bank-detail">
                  <h6>Street Address 1</h6>
                  {getBankDetailsData && (
                    <p>
                      {getBankDetailsData?.billingDetails?.line1
                        ? getBankDetailsData?.billingDetails?.line1
                        : '--'}
                    </p>
                  )}
                </div>
              </Col>
              <Col className="" xs="6">
                <div className="show-bank-detail">
                  <h6>Street Address 2</h6>
                  {getBankDetailsData && (
                    <p>{getBankDetailsData?.line2 ? getBankDetailsData?.line2 : '--'}</p>
                  )}
                </div>
                <div className="show-bank-detail">
                  <h6>District</h6>
                  {getBankDetailsData && (
                    <p>
                      {getBankDetailsData?.billingDetails?.district
                        ? getBankDetailsData?.billingDetails?.district
                        : '--'}
                    </p>
                  )}
                </div>
                <div className="show-bank-detail">
                  <h6>Country</h6>
                  {getBankDetailsData && (
                    <p>
                      {getBankDetailsData?.billingDetails?.country
                        ? getBankDetailsData?.billingDetails?.country
                        : '--'}
                    </p>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ShowBankDetails;
