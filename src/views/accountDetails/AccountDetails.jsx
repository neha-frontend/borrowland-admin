import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

import DatatableTables from 'components/Table/Table';
import AddBillingDetails from 'components/UI/Model/AddBillingDetails';
import AddBank from 'components/UI/Model/AddBank';
import AddCard from 'components/UI/Model/AddCard';
import ShowBankDetails from 'components/UI/Model/ShowBankDetail';
import DeleteCard from 'components/UI/Model/DeleteCard';

import { accountDetailsData } from 'constants/accountDetailsData';
import { cardDetailsData } from 'constants/cardDetailsData';
import { cardDetailsColumn, accountDetailsColumn } from 'constants/columnUtility';

import { getListOfBankAccount, getListOfCards } from 'store/actions';

import img from '../../assets/images/payment card/image64.png';
import './AccountDetauls.css';

function AccountDetails() {
  const [accountData, setAccountData] = useState(accountDetailsData);
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState(cardDetailsData);
  const [addAccount, setAddAccount] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [addBillingDetails, setAddBillingDetails] = useState(false);
  const [token, setToken] = useState('');
  const [accType, setAccType] = useState('');
  const [email, setEmail] = useState('');
  const [usersData, setUserData] = useState([]);
  const [usersCardData, setUserCardData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Wire');
  const [bankDetails, setBankDetails] = useState(false);
  const [id, setId] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [deleteCardModal, setDeleteCardModal] = useState(false);
  const [deleteCardId, setDeleteCardId] = useState('');
  const [selectedWireOptions, setSelectedWireOptions] = useState({
    accountNumber: '',
    routingNumber: '',
    bankName: '',
    country: '',
    city: '',
    bankType: '',
  });
  const { linkedBankAccounts, deleteCardData, linkedCards } = useSelector(state => state.account);
  const handelAddAccount = value => {
    setAddAccount(value);
  };
  const handelAddCard = value => {
    setAddCard(value);
  };
  const handelAddBillingDetails = value => {
    setAddBillingDetails(value);
  };
  const hadelAddBillingDetailsClick = () => {
    setAddAccount(false);
    setAddBillingDetails(true);
  };
  const hadelBackBtnBillingModal = () => {
    setAddBillingDetails(false);
    setAddAccount(true);
  };

  const updatedValues = (selectedToken, selectedAccType, selectedEmail) => {
    setToken(selectedToken);
    setAccType(selectedAccType);
    setEmail(selectedEmail);
  };

  const updatedSelectedWireValues = selectedValues => {
    setSelectedWireOptions({ ...selectedValues });
  };

  const showBankDetails = bankId => {
    setBankDetails(true);
    setId(bankId);
  };

  const deleteBankDetail = deletedId => {
    setDeleteModal(true);
    setDeleteId(deletedId);
  };

  const deleteCardDetail = deletedCardId => {
    setDeleteCardModal(true);
    setDeleteCardId(deletedCardId);
  };

  const handelDelete = () => {
    setDeleteModal(false);
  };

  const handleCardDelete = () => {
    setDeleteCardModal(false);
  };

  const handelShowDetails = () => {
    setBankDetails(false);
  };

  const getDetails = list => {
    const sdetail = list.map(item => ({
      _id: item._id,
      accountHolder: item.accountHolder,
      status: item.status,
      bankName: item.bankName,
      accountNumber: item.accountNumber,
      action: (
        <div className="d-flex justify-content-evenly " key={item._id}>
          <i className="fa fa-eye" role="button" onClick={() => showBankDetails(item.id)} />
          <i className="fa fa-trash" role="button" onClick={() => deleteBankDetail(item.id)} />
        </div>
      ),
    }));
    return sdetail;
  };

  const cardDetails = list => {
    const sdetail = list.map(item => ({
      _id: item._id,
      cardId: item.cardId,
      accountHolder: item.accountHolder,
      status: item.status,
      bankName: item.bankName,
      expiry: `${item.expMonth}/${item.expYear}`,
      lastFour: `**** **** **** ${item.lastFour}`,
      action: (
        <div className="d-flex justify-content-center" key={item._id}>
          <i className="fa fa-trash" role="button" onClick={() => deleteCardDetail(item.cardId)} />
        </div>
      ),
      cardType: (
        <>
          <img src={img} alt="" />
        </>
      ),
    }));
    return sdetail;
  };

  useEffect(() => {
    dispatch(getListOfBankAccount());
    dispatch(getListOfCards());
  }, [deleteCardData]);

  useEffect(() => {
    const sdetail = getDetails(linkedBankAccounts);
    setUserData(sdetail);
  }, [linkedBankAccounts]);

  useEffect(() => {
    const sdetail = cardDetails(linkedCards);
    setUserCardData(sdetail);
  }, [linkedCards]);

  useEffect(() => {
    const accountDetails = accountData.map(item => ({
      accountHolder: item.accountHolder,
      bankName: item.bankName,
      accountNumber: item.accountNumber,
      action: (
        <div className="d-flex justify-content-evenly " key={item._id}>
          <i className="fa fa-eye" role="button" />
          <i className="fa fa-trash" role="button" />
        </div>
      ),
    }));
    setAccountData(accountDetails);

    const cardDetail = cardData.map(item => ({
      cardNumber: item.cardNumber,
      expiry: item.expiry,
      action: (
        <div className="d-flex justify-content-center" key={item._id}>
          <i className="fa fa-trash" role="button" />
        </div>
      ),
      cardType: (
        <>
          <img src={img} alt="" />
        </>
      ),
    }));
    setCardData(cardDetail);
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <Card>
          <Row>
            <CardBody>
              <Row>
                <Col>
                  <h2 className="ps-4">Account Details</h2>
                  <div className="d-flex align-items-center justify-content-between ps-4 pe-4">
                    <span>Bank Details</span>
                    <button
                      type="button"
                      className="mogul-electric-blue-btn"
                      onClick={() => handelAddAccount(true)}
                    >
                      <i className="fa fa-plus" />
                      Add Account
                    </button>
                  </div>
                  <DatatableTables className="mt-2" column={accountDetailsColumn} row={usersData} />

                  <div className="d-flex align-items-center justify-content-between ps-4 pe-4">
                    <span>Card Details</span>
                    <button
                      type="button"
                      className="mogul-electric-blue-btn"
                      onClick={() => handelAddCard(true)}
                    >
                      <i className="fa  fa-plus" />
                      Add Card
                    </button>
                  </div>
                  <DatatableTables
                    className="mt-2"
                    column={cardDetailsColumn}
                    row={usersCardData}
                  />
                </Col>
                <AddBank
                  handelAddAccount={handelAddAccount}
                  modal={addAccount}
                  hadelAddBillingDetailsClick={hadelAddBillingDetailsClick}
                  updatedValues={updatedValues}
                  selctedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  updatedSelectedWireValues={updatedSelectedWireValues}
                />
                <AddCard
                  modal={addCard}
                  handelAddCard={handelAddCard}
                  close={() => setAddCard(false)}
                />

                <AddBillingDetails
                  modal={addBillingDetails}
                  handelAddBilling={handelAddBillingDetails}
                  backBtn={hadelBackBtnBillingModal}
                  selectedToken={token}
                  selectedAccType={accType}
                  selectedEmail={email}
                  selectedOption={selectedOption}
                  selectedWireOptions={selectedWireOptions}
                />
              </Row>
            </CardBody>
          </Row>
        </Card>
        <ShowBankDetails modal={bankDetails} handelShowDetails={handelShowDetails} id={id} />
        <DeleteCard isOpen={deleteModal} onClose={handelDelete} id={deleteId} medium="bank" />
        <DeleteCard
          isOpen={deleteCardModal}
          onClose={handleCardDelete}
          id={deleteCardId}
          medium="card"
        />
      </Container>
    </div>
  );
}

export default AccountDetails;
