import React, { useState } from 'react';
import { AvField, AvForm, AvGroup } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Label, Modal, ModalBody, Row } from 'reactstrap';
import { addCardSaga } from 'store/actions';
import AddBillingDetails from './AddBillingDetails';

// static imports
import './addCard.css';

const AddCard = ({ modal, handelAddCard }) => {
  const [cardDetails, setCardDetails] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    email: '',
  });

  const { addCardData } = useSelector(state => state.account);
  const dispatch = useDispatch();

  const [cardBillingModal, setCardBillingModal] = useState(false);

  const handleChange = event => {
    setCardDetails({ ...cardDetails, [event.target.name]: event.target.value });
  };

  console.log(addCardData, '>>>>>>>>>>>>>>>>>>>>>>');

  const toggle = () => {
    handelAddCard(false);
  };

  const handleAddCard = value => {
    handelAddCard(value);
    setCardBillingModal(false);
  };

  const toggleBack = () => {
    handelAddCard(true);
    setCardBillingModal(false);
  };
  const submitBillDetails = () => {
    handelAddCard(false);
    setCardBillingModal(true);
  };

  const addCardHandler = cardData => {
    dispatch(addCardSaga(cardData));
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle} scrollable model={cardDetails}>
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
              <h2 className="add-card-modal-title">Add Card Details</h2>
            </div>
            <div>
              <AvForm onValidSubmit={submitBillDetails}>
                <Row>
                  <Col lg="12">
                    <AvGroup className="add-bank-modal-form-label-container">
                      <Label>Card Number</Label>
                      <AvField
                        type="string"
                        name="cardNumber"
                        value={cardDetails.cardNumber
                          ?.replace(/\W/gi, '')
                          .replace(/(.{4})/g, '$1 ')
                          .trim()}
                        validate={{
                          maxLength: {
                            value: 19,
                            errorMessage: 'Your name must be between 6 and 16 characters',
                          },
                        }}
                        onChange={handleChange}
                        required
                      />
                    </AvGroup>
                  </Col>
                  <Col md="6">
                    <AvGroup className="add-bank-modal-form-label-container">
                      <Label>Expiry Date</Label>
                      <AvField
                        type="string"
                        name="expiryDate"
                        placeholder="mm/yy"
                        onChange={handleChange}
                        required
                        validate={{
                          maxLength: {
                            value: 5,
                          },
                        }}
                        value={cardDetails.expiryDate
                          .replace(
                            /[^0-9]/g,
                            '', // To allow only numbers
                          )
                          .replace(
                            /^([2-9])$/g,
                            '0$1', // To handle 3 > 03
                          )
                          .replace(
                            /^(1{1})([3-9]{1})$/g,
                            '0$1/$2', // 13 > 01/3
                          )
                          .replace(
                            /^0{1,}/g,
                            '0', // To handle 00 > 0
                          )
                          .replace(
                            /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
                            '$1/$2', // To handle 113 > 11/3
                          )}
                      />
                    </AvGroup>
                  </Col>
                  <Col md="6">
                    <AvGroup className="add-bank-modal-form-label-container">
                      <Label>CVV</Label>
                      <AvField
                        type="string"
                        name="cvv"
                        validate={{
                          maxLength: {
                            value: 3,
                          },
                        }}
                        value={cardDetails.cvv.slice(0, 3)}
                        onChange={handleChange}
                        required
                      />
                    </AvGroup>
                  </Col>
                  <Col lg="12">
                    <AvGroup className="add-bank-modal-form-label-container">
                      <Label>Email</Label>
                      <AvField
                        type="email"
                        name="email"
                        value={cardDetails.email}
                        onChange={handleChange}
                        required
                      />
                    </AvGroup>
                  </Col>

                  <div className="add-card-modal-bottom-btn-container">
                    <button type="button" className="add-card-modal-bottom-btn" onClick={toggle}>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="add-card-modal-bottom-btn add-card-electric-blue"
                    >
                      Add Billing Details
                    </button>
                  </div>
                </Row>
              </AvForm>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <AddBillingDetails
        modal={cardBillingModal}
        selectedWireOptions={{ country: 'United States' }}
        addCardHandler={addCardHandler}
        cardDetails={cardDetails}
        addCard="addCard"
        backBtn={toggleBack}
        handelAddBilling={handleAddCard}
      />
    </>
  );
};

export default AddCard;
