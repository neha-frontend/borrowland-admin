import { AvField, AvForm } from 'availity-reactstrap-validation';
import React, { useState, useEffect } from 'react';
import { Button, Col, Modal, FormGroup, Input, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getServiceFees,
  getListOfBankAccount,
  getWalletBalance,
  withdrawCurrency,
} from 'store/actions';
import { IoIosArrowBack } from 'react-icons/io';

import './Model.scss';
// import WalletDepositConfirmModal from 'components/UI/Model/WalletDepositConfirmModal';
import CurrencyFormat from '../../CurrencyFormat/index';

const WalletWithdrawModal = ({
  isOpen,
  close,
  selectedOptionHandler,
  selectedOption,
  modal,
  withdrawModalHandler,
  withdrawModal2,
  backBtn,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [bankDetails, setBankDetails] = useState({});
  const [serviceFeeAmount, setServiceFeeAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(false);
  // const [isDeposit, setIsDeposit] = useState(false);
  const { serviceFees, walletBalance, isLoading, linkedBankAccounts } = useSelector(
    state => state.account,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWalletBalance());
    dispatch(getListOfBankAccount());
    dispatch(getServiceFees());
  }, []);

  const onClickCloseHandler = () => {
    close();
  };
  const handleChange = () => {
    setIsActive(true);
  };
  const onClickHandler = () => {
    modal();
    withdrawModalHandler();
  };

  const setBankDetailsHandler = bank => {
    setBankDetails(bank);
  };
  const withdrawHandlerSubmit = () => {
    // const { withdrawAccount } = values;
    const requestBody = {
      destination: {
        type: selectedOption.toLowerCase(),
        wireId: bankDetails,
      },
      amount: {
        amount: withdrawAmount.toString(),
        currency: 'USD',
      },
      // To be removed later once removed from backend
      metadata: {
        beneficiaryEmail: 'henishshah@yopmail.com',
      },
    };

    dispatch(withdrawCurrency({ requestBody }));
    close();
  };

  const updateServiceFeeAmount = val => {
    setWithdrawAmount(val);
    if (selectedOption === 'ACH') {
      if (val.length > 0) {
        const fees =
          Number(val) * (serviceFees[0]?.achPayoutFeePercentage / 100) +
          serviceFees[0]?.achPayoutFee;
        setServiceFeeAmount(Math.round(fees * 100) / 100);
      } else {
        setServiceFeeAmount(0);
      }
    }
  };

  // const walletClose = () => {
  //   setIsDeposit(false);
  // };

  const depositSuccess = () => {
    withdrawModalHandler();
    withdrawHandlerSubmit();
  };

  // const withdrawSuccess = () => {
  //   withdrawHandlerSubmit();
  //   // setIsDeposit(false);
  // };

  return (
    <>
      <Modal centered isOpen={isOpen} className="payment_modals">
        <div className="modal-header justify-content-center pb-0">
          <h5 className="modal-title mt-0 fw-bold " id="myModalLabel">
            Withdraw
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
                      checked={selectedOption === 'ACH'}
                      onClick={() => selectedOptionHandler('ACH')}
                      disabled
                    />{' '}
                    ACH
                  </Label>
                  <div>
                    {/* <spam>
                      {isLoading.serviceFees ? (
                        '$0'
                      ) : (
                        <CurrencyFormat prefix="$" value={serviceFees[0]?.withdrawACHLimit} />
                      )}
                      / day
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
                    Available limit -
                    <spam>
                      {isLoading.serviceFees ? (
                        '$0'
                      ) : (
                        <CurrencyFormat prefix="$" value={serviceFees[0]?.withdrawWireLimit} />
                      )}
                      / day
                    </spam>
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

      <Modal centered isOpen={withdrawModal2} className="payment_modals ">
        {/* <div className="modal-header justify-content-center pb-0">
          <h5 className="modal-title mt-0 fw-bold " id="myModalLabel">
            Withdraw
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
        </div> */}
        <div>
          <div className="modal-header justify-content-start pb-0">
            <div className="mb-2" onClick={backBtn}>
              <IoIosArrowBack />
              Back
            </div>
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
          <div className="deposit-modalheader">
            <h5 className="modal-title mt-0 fw-bold" id="myModalLabel">
              Withdraw
            </h5>
          </div>
        </div>
        <div className="modal-body">
          <div className="body-text mb-3 d-flex justify-content-between align-items-center">
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
          <AvForm onValidSubmit={depositSuccess}>
            <Col sm="12" className="mb-3 position-relative mx-auto">
              <AvField
                name="address"
                type="text"
                value="Mogul Wallet"
                label="From"
                disabled
                className="mb-3"
              />
            </Col>
            <Col sm="12" className="mb-3 position-relative mx-auto">
              <AvField
                name="Select Bank"
                label={<h6>To</h6>}
                type="select"
                className="form-select"
                onChange={event => {
                  setBankDetailsHandler(event.target.value);
                }}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                {linkedBankAccounts &&
                  linkedBankAccounts
                    ?.filter(item => item.type.toLowerCase() === selectedOption?.toLowerCase())
                    .map(bank => (
                      <option value={selectedOption === 'wire' ? bank.id : bank._id}>
                        {' '}
                        {bank.bankName}({bank.accountNumber})
                      </option>
                    ))}
              </AvField>
            </Col>

            <Col sm="12" className="mb-1 position-relative">
              <AvField
                name="amount"
                label={<h6>Amount</h6>}
                type="text"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={e => {
                  handleChange(e);
                  updateServiceFeeAmount(e.target.value);
                }}
                required
              />
              <p className="text-muted usd">
                <i>~USD</i>
              </p>
            </Col>
            <div className="d-flex fw-bold justify-content-between mt-4">
              <p className="small">
                <i>Fee</i>
              </p>
              <p className="small">
                {selectedOption !== 'ACH' ? (
                  serviceFees[0] ? (
                    <CurrencyFormat prefix="$" value={serviceFees[0]?.wirePayoutFee} zeroAllowed />
                  ) : (
                    '$ 0.00'
                  )
                ) : (
                  <CurrencyFormat prefix="$" value={serviceFeeAmount} zeroAllowed />
                )}
              </p>
            </div>

            <p className="small fw-bold">
              <span>
                {selectedOption !== 'ACH' ? (
                  Number(withdrawAmount) > 0 ? (
                    Math.round((Number(withdrawAmount) - serviceFees[0]?.wirePayoutFee) * 100) /
                      100 >
                    0 ? (
                      //     ? Math.round((Number(withdrawAmount) - serviceFees[0]?.wirePayoutFee) * 100) /
                      //       100
                      //     : 0
                      //   : 0
                      // : Math.round((Number(withdrawAmount) - serviceFeeAmount) * 100) / 100}{' '}

                      <CurrencyFormat
                        prefix="$"
                        value={
                          Math.round(
                            (Number(withdrawAmount) - serviceFees[0]?.wirePayoutFee) * 100,
                          ) / 100
                        }
                        zeroAllowed
                      />
                    ) : (
                      '$ 0.00'
                    )
                  ) : (
                    '$ 0.00'
                  )
                ) : (
                  <CurrencyFormat
                    prefix="$"
                    value={Math.round((Number(withdrawAmount) - serviceFeeAmount) * 100) / 100}
                    zeroAllowed
                  />
                )}{' '}
              </span>
              USD will be transferred out of your wallet
            </p>

            <div className="modal-footer justify-content-center pt-0">
              <Button type="submit" className="btn btn-continue">
                Confirm Transaction
              </Button>
            </div>
          </AvForm>
        </div>
      </Modal>

      {/* will remove the commented code in feture if not required for confirmModel */}
      {/* <WalletDepositConfirmModal
        isOpen={isDeposit}
        close={walletClose}
        success={withdrawSuccess}
        closeDep={close}
        depositAmount={withdrawAmount}
      /> */}
    </>
  );
};

export default WalletWithdrawModal;
