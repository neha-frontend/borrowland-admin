import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceFees, getWalletBalance } from 'store/actions';
import { Button, Modal, FormGroup, Input, Label } from 'reactstrap';
import CurrencyFormat from '../../CurrencyFormat/index';
// import toaster from '../../../../hoc/Toaster/Toaster';

import './Model.scss';

const WalletDepositModal = ({ isOpen, close, modal, selectedOptionHandler, selectedOption }) => {
  const [isActive, setIsActive] = useState(false);
  const { serviceFees, walletBalance, isLoading } = useSelector(state => state.account);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServiceFees());
    dispatch(getWalletBalance());
  }, []);
  const handleChange = () => {
    setIsActive(true);
  };
  const onClickCloseHandler = () => {
    close();
  };
  const onClickHandler = () => {
    modal();
    close(false);
  };

  return (
    <>
      <Modal centered isOpen={isOpen} className="payment_modals">
        <div className="modal-header justify-content-center pb-0">
          <h5 className="modal-title mt-0 fw-bold" id="myModalLabel">
            Deposit
          </h5>

          <button
            type="button"
            onClick={onClickCloseHandler}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="body-text d-flex justify-content-between align-items-center">
            <div>
              <i className="fas fa-dollar-sign" />
              <span className="fw-bold ms-2">USD</span>
            </div>
            <div className="text-end">
              <p className="m-0 fw-bold">
                {isLoading.walletBalance ? (
                  '$0'
                ) : (
                  <CurrencyFormat prefix="$" value={walletBalance.availableBalance} />
                )}
              </p>
              <p className="m-0">
                <i>Current balance</i>
              </p>
            </div>
          </div>
          <div>
            <FormGroup tag="fieldset" onChange={handleChange}>
              <span className="add-bank-select-method">Select Payment Method</span>
              <div className="add-deposit-radio-container">
                <FormGroup check className="me-2 deposit-modal-alinement">
                  <Label check>
                    <Input
                      type="radio"
                      value={selectedOption}
                      name="radio"
                      disabled
                      checked={selectedOption === 'ACH'}
                      onClick={() => selectedOptionHandler('ACH')}
                    />{' '}
                    ACH
                  </Label>
                  <div>
                    {/* <spam>
                      {isLoading.serviceFees ? (
                        '$0'
                      ) : (
                        <CurrencyFormat prefix="$" value={serviceFees[0]?.depositACHLimit} />
                      )}{' '}
                      /day
                    </spam> */}
                    <spam>ACH payment method will be available soon</spam>
                  </div>
                </FormGroup>
                <FormGroup check className="me-2 deposit-modal-alinement">
                  <Label check>
                    <Input
                      type="radio"
                      value={selectedOption}
                      name="radio"
                      checked={selectedOption === 'Wire'}
                      onClick={() => selectedOptionHandler('Wire')}
                    />{' '}
                    Wire
                  </Label>
                  <div>
                    Available limit -{' '}
                    <spam>
                      {isLoading.serviceFees ? (
                        '$0'
                      ) : (
                        <CurrencyFormat prefix="$" value={serviceFees[0]?.depositWireLimit} />
                      )}
                      / day
                    </spam>
                  </div>
                </FormGroup>
                <FormGroup check className="me-2 deposit-modal-alinement" display="flex">
                  <Label check>
                    <Input
                      type="radio"
                      value={selectedOption}
                      name="card"
                      checked={selectedOption === 'card'}
                      onClick={() => selectedOptionHandler('card')}
                    />{' '}
                    Credit Card
                  </Label>
                  <div>
                    Available limit - <spam>No Limit</spam>
                  </div>
                </FormGroup>
              </div>
            </FormGroup>
          </div>
        </div>

        <div className="modal-footer justify-content-center pt-0 ">
          <Button className="btn btn-continue" disabled={!isActive} onClick={onClickHandler}>
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default WalletDepositModal;
