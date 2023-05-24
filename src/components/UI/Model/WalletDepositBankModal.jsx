import React, { useEffect, useState } from 'react';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Modal } from 'reactstrap';
import AddBillingDetails from 'components/UI/Model/AddBillingDetails';
import WalletDepositConfirmModal from 'components/UI/Model/WalletDepositConfirmModal';
import AddBank from 'components/UI/Model/AddBank';
import { getListOfBankAccount, getListOfCards, depositCurrency } from 'store/actions';
import axios from 'axios';

import './Model.scss';
import { IoIosArrowBack } from 'react-icons/io';
import CurrencyFormat from 'components/CurrencyFormat';
import AddCard from './AddCard';

const WalletDepositBankModal = ({
  isOpen,
  close,
  selectedOptionFiat,
  selectedButton,
  backBtn,
  type,
}) => {
  const dispatch = useDispatch();
  const [addAccount, setAddAccount] = useState(false);
  const [addBillingDetails, setAddBillingDetails] = useState(false);
  const [token, setToken] = useState('');
  const [accType, setAccType] = useState('');
  const [email, setEmail] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [serviceFeeAmount, setServiceFeeAmount] = useState(0);
  const [bankDetails, setBankDetails] = useState({});
  // const [depositConfirm, setDepositConfirm] = useState(false);
  const [isDeposit, setIsDeposit] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const { linkedCards } = useSelector(state => state.account);
  // const [selectedCard, setSelectedCard] = useState('');
  const [selectedWireOptions, setSelectedWireOptions] = useState({
    accountNumber: '',
    routingNumber: '',
    bankName: '',
    country: '',
    city: '',
    bankType: '',
  });
  console.log(bankDetails);
  const continueDepositModal = async () => {
    // Endpoint according to bank type
    const endpoint =
      selectedOptionFiat === 'ACH' || selectedOptionFiat === 'card'
        ? '/payment/create-payment'
        : '/payment/wire-payment';

    // const { DepositAmount, SelectCard } = values;
    const res = await axios.get('https://geolocation-db.com/json/');
    let requestBody;
    if (selectedButton === 'merchant') {
      requestBody =
        selectedOptionFiat === 'Wire'
          ? {
              amount: {
                amount: depositAmount,
                currency: 'USD',
              },
              wireId: bankDetails,
              type: 'merchant',
            }
          : {
              metadata: {
                ipAddress: res.data.IPv4,
                // hardcoded will update with unique identifer
                sessionId: 'DE6FA86F60BB47B379307F851E238617',
              },
              amount: {
                amount: depositAmount,
                currency: 'USD',
              },
              source: {
                id: bankDetails,
                type: selectedOptionFiat === 'ACH' ? 'ach' : 'card',
              },
              description: 'Payment',
              type: 'merchant',
            };
    } else {
      // Request body according to bank type
      requestBody =
        selectedOptionFiat === 'Wire'
          ? {
              amount: {
                amount: depositAmount,
                currency: 'USD',
              },
              wireId: bankDetails,
            }
          : {
              metadata: {
                ipAddress: res.data.IPv4,
                // hardcoded will update with unique identifer
                sessionId: 'DE6FA86F60BB47B379307F851E238617',
              },
              amount: {
                amount: depositAmount,
                currency: 'USD',
              },
              source: {
                id: bankDetails,
                type: selectedOptionFiat === 'ACH' ? 'ach' : 'card',
              },
              description: 'Payment',
            };
    }
    dispatch(depositCurrency({ endpoint, requestBody }));
  };

  const { serviceFees, linkedBankAccounts } = useSelector(state => state.account);
  useEffect(() => {
    dispatch(getListOfBankAccount());
    dispatch(getListOfCards());
  }, []);

  const hadelAddBillingDetailsClick = () => {
    setAddAccount(false);
    setAddBillingDetails(true);
  };
  const handleAddAccount = value => {
    setAddAccount(value);
  };
  const onClickHandler = () => {
    // confirm();
    // continueDepositModal();
    setIsDeposit(true);
    // close();
  };

  const depositSuccess = () => {
    continueDepositModal();
  };

  const onClickCloseHandler = () => {
    close();
  };

  const handelAddAccount = value => {
    setAddAccount(value);
  };

  const updatedSelectedWireValues = selectedValues => {
    setSelectedWireOptions({ ...selectedValues });
  };

  const updatedValues = (selectedToken, selectedAccType, selectedEmail) => {
    setToken(selectedToken);
    setAccType(selectedAccType);
    setEmail(selectedEmail);
  };

  const handelAddBillingDetails = value => {
    setAddBillingDetails(value);
  };

  const walletClose = () => {
    setIsDeposit(false);
  };

  const updateServiceFeeAmount = val => {
    setDepositAmount(val);
    if (type === 'Bank') {
      if (selectedOptionFiat !== 'Wire') {
        if (val.length > 0) {
          const fees =
            Number(val) * (serviceFees[0]?.achPaymentFeePercentage / 100) +
            serviceFees[0]?.achPaymentFee;
          setServiceFeeAmount(Math.round(fees * 100) / 100);
        } else {
          setServiceFeeAmount(0);
        }
      }
    } else {
      if (val.length > 0) {
        const fees =
          Number(val) * (serviceFees[0]?.cardFeesPercentage / 100) + serviceFees[0]?.cardFees;
        setServiceFeeAmount(Math.round(fees * 100) / 100);
      } else {
        setServiceFeeAmount(0);
      }
    }
  };

  const handelAddCard = value => {
    setAddCard(value);
  };

  const onClickBankCardHandler = () => {
    if (selectedOptionFiat === 'card') {
      handelAddCard(true);
    } else {
      handleAddAccount(true);
    }
  };

  return (
    <>
      <Modal centered isOpen={isOpen} className="payment_modals">
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
              Deposit
            </h5>
          </div>
        </div>

        <div className="modal-body">
          <AvForm className="mt-3" onValidSubmit={onClickHandler}>
            <div className="deposit-fees-main">
              <button
                type="button"
                className="deposite-buttons"
                color="secondary"
                onClick={onClickBankCardHandler}
              >
                <i className="fa fa-plus deposit-icon" />
                {selectedOptionFiat === 'card' ? 'Add Card' : 'Add Bank'}
              </button>
            </div>
            <Col sm="12" className="mb-3  position-relative">
              <AvField
                name="bank"
                className="form-select"
                label={<h6>Select Bank Account</h6>}
                type="select"
                onChange={event => {
                  setBankDetails(event.target.value);
                }}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                {linkedBankAccounts &&
                  selectedOptionFiat !== 'card' &&
                  linkedBankAccounts
                    ?.filter(item => item.type.toLowerCase() === selectedOptionFiat.toLowerCase())
                    .map(bank => (
                      <option value={selectedOptionFiat === 'wire' ? bank.id : bank._id}>
                        {' '}
                        {bank.bankName}({bank.accountNumber})
                      </option>
                    ))}
                {linkedCards &&
                  selectedOptionFiat === 'card' &&
                  linkedCards?.map(card => (
                    <option value={card.cardId}>{`**** **** **** ${card.lastFour}`}</option>
                  ))}
              </AvField>
              {/* <div>
                <i className="fas fa-angle-down drop-down" />
              </div> */}
            </Col>

            <Col sm="12" className="mb-3 position-relative">
              <AvField
                name="Amount"
                label={<h6>Enter Deposit Amount</h6>}
                type="text"
                placeholder="0.00"
                value={depositAmount}
                onChange={e => {
                  updateServiceFeeAmount(e.target.value);
                }}
                // onChange={e => {
                //   const formattedValue = e?.target?.value;
                //   const value = formattedValue.replaceAll(',', '');
                //   if (Number.isNaN(value)) return;
                //   setFieldValue('DepositAmount', value);
                //   updateServiceFeeAmount(e.target.value);
                // }}
                required
              />
              <p className="text-muted usd">
                <i>~USD</i>
              </p>
            </Col>

            <div className="deposit-fees">
              <p>Fees</p>
              <p>
                ${selectedOptionFiat === 'Wire' ? serviceFees[0]?.wirePaymentFee : serviceFeeAmount}
                .00
              </p>
            </div>
            <div className="deposit-fees">
              <p>Total</p>
              <p>
                {/* $
                {selectedOptionFiat === 'Wire' ? (
                  Number(depositAmount) > 0 ? (
                    Math.round((Number(depositAmount) - serviceFees[0]?.wirePaymentFee) * 100) /
                      100 >
                    0 ? (
                      Math.round((Number(depositAmount) - serviceFees[0]?.wirePaymentFee) * 100) /
                      100
                    ) : (
                      0
                    )
                  ) : (
                    0
                  )
                ) */}
                {selectedOptionFiat === 'Wire' ? (
                  Number(depositAmount) > 0 ? (
                    Math.round((Number(depositAmount) - serviceFees[0]?.wirePaymentFee) * 100) >
                    0 ? (
                      <CurrencyFormat
                        prefix="$"
                        value={Math.round(Number(depositAmount) - serviceFees[0]?.wirePaymentFee)}
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
                    value={Number(depositAmount) - serviceFeeAmount}
                    zeroAllowed
                  />
                )}
              </p>
            </div>
            <div className="modal-footer justify-content-center pt-0">
              <Button type="submit" className="btn btn-continue">
                Confirm Transaction
              </Button>
            </div>
          </AvForm>
        </div>
      </Modal>
      {selectedOptionFiat && (
        <AddBank
          handelAddAccount={handelAddAccount}
          modal={addAccount}
          updatedValues={updatedValues}
          hadelAddBillingDetailsClick={hadelAddBillingDetailsClick}
          selectedOptionFiat={selectedOptionFiat}
          displayRadio={selectedOptionFiat !== ''}
          updatedSelectedWireValues={updatedSelectedWireValues}
        />
      )}
      <AddBillingDetails
        modal={addBillingDetails}
        handelAddBilling={handelAddBillingDetails}
        selectedToken={token}
        selectedAccType={accType}
        selectedEmail={email}
        selectedOption={selectedOptionFiat}
        selectedWireOptions={selectedWireOptions}
      />
      <WalletDepositConfirmModal
        isOpen={isDeposit}
        close={walletClose}
        success={depositSuccess}
        closeDep={close}
        depositAmount={depositAmount}
        selectedWireOptions={selectedWireOptions}
        selectedOption={selectedOptionFiat}
        selectedCard={bankDetails}
      />
      <AddCard modal={addCard} handelAddCard={handelAddCard} close={() => setAddCard(false)} />
    </>
  );
};

export default WalletDepositBankModal;
