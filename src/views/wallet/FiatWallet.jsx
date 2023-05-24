import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Col, Button, TabContent, NavItem, Nav, TabPane, NavLink } from 'reactstrap';

import { getListOfTransactions, getWalletBalance } from 'store/actions';

import { withdrawColumn, fiatColumn } from 'constants/tableColumn';
import Breadcrumb from 'components/BreadCrumb';
import classnames from 'classnames';
import DatatableTables from 'components/Table/Table';
import fiatwallet from '../../assets/images/fiatwallet.png';

import WalletWithdrawModal from '../../components/UI/Model/WalletWithdrawModal';
import WalletDepositModal from '../../components/UI/Model/WalletDepositModal';
import WalletDepositBankModal from '../../components/UI/Model/WalletDepositBankModal';
import CurrencyFormat from '../../components/CurrencyFormat/index';

import './wallet.css';

const WalletCard = () => {
  const [withdraw, setWithdraw] = useState(false);
  const [withdrawModal2, setWithdrawModal] = useState(false);
  const [depositBank, setDepositBank] = useState(false);
  const [deposit, setDeposit] = useState(false);
  const [depositConfirm, setDepositConfirm] = useState(false);
  // const [isDeposit, setIsDeposit] = useState(false);
  const [activeTabJustify2, setactiveTabJustify2] = useState('25');
  const [selectedOption, setSelectedOption] = useState('');
  const [usersData, setUserData] = useState([]);
  const [selectedButton, setSelectedButton] = useState('');

  const selectedOptionHandler = value => {
    setSelectedOption(value);
  };

  const withdrawModal = () => {
    setWithdraw(false);
  };
  const withdrawModalHandler = () => {
    setWithdrawModal(true);
  };

  const depositBankModal = () => {
    setDepositBank(true);
  };
  const depositConfirmModal = () => {
    setDepositConfirm(true);
  };

  // const depositSuccess = () => {
  //   setIsDeposit(true);
  // };

  const getDetails = list => {
    const sdetail = list.map(item => ({
      id: item.id,
      _id: item._id,
      registration_date: item.createdAt ? new Date(item.createdAt).toLocaleString() : '-',
      amount: `$${item.amount.amount}`,
      status: item.status,
      description: item.accountInfo.description
        ? item.accountInfo.description
        : item.accountInfo.cardNumber,
      to: 'Mogul Wallet',
    }));
    return sdetail;
  };

  const dispatch = useDispatch();
  const { transactions, loading, walletBalance, isLoading } = useSelector(state => state.account);
  useEffect(() => {
    dispatch(getWalletBalance());
  }, []);

  const depositData =
    transactions.data?.length > 0
      ? transactions.data?.filter(transaction => transaction.transactionType === 'Deposit')
      : [];

  const withdrawData =
    transactions.data?.length > 0
      ? transactions.data?.filter(transaction => transaction.transactionType === 'Withdrawal')
      : [];

  useEffect(() => {
    const sdetail = activeTabJustify2 === '25' ? getDetails(depositData) : getDetails(withdrawData);
    setUserData(sdetail);
  }, [transactions, activeTabJustify2]);

  function toggleCustomJustified2(tab) {
    if (activeTabJustify2 !== tab) {
      setactiveTabJustify2(tab);
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState('');
  // Todo: Pending field from backend

  const onClickMerchantHandler = () => {
    setSelectedButton('merchant');
    setDeposit(true);
  };

  const onClickWithdrawHandler = () => {
    setSelectedButton('');
    setWithdraw(true);
  };

  const onClickDepositHandler = () => {
    setSelectedButton('');
    setDeposit(true);
  };

  const maxCount = transactions.data?.totalCount
    ? Math.ceil(Number(transactions?.totalCount / 10))
    : 0;

  const updateCurrentPage = page => {
    setCurrentPage(page);
  };
  const updateCurrentCountPage = page => {
    setCount(page);
  };

  const paginationConfig = {
    currentPage,
    maxCount,
    count,
    handler: updateCurrentPage,
    updateCurrentCountPage,
  };

  const backBtnHandler = () => {
    setDepositBank(false);
    setDeposit(true);
  };
  const backBtnHandlerWithdraw = () => {
    setWithdrawModal(false);
    setWithdraw(true);
  };

  useEffect(() => {
    if (activeTabJustify2 === '25') {
      dispatch(getListOfTransactions({ type: 'Deposit', currentPage }));
    } else {
      dispatch(getListOfTransactions({ type: 'Withdrawal', currentPage }));
    }
  }, [activeTabJustify2]);
  return (
    <>
      <div className="page-content">
        <Breadcrumb name="Fiat Wallet" />
        <Col
          xl={12}
          md={12}
          sm={12}
          xs={12}
          className="wallet-card d-flex justify-content-between border-wallet p-3"
        >
          <div />
          <div>
            <div className="justify-content-center euro-mobile">
              <div className="euro">
                <img src={fiatwallet} alt="Euro" />
              </div>
              <div className="text-center euro-text">
                <div className="header f600 font-size-14">USD Available</div>
                <div className="primary f600 font-size-24">
                  {isLoading.walletBalance ? (
                    '$0'
                  ) : (
                    <CurrencyFormat prefix="$" value={walletBalance.availableBalance} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="fiat-wallet-button p-3">
              <Button
                type="button"
                className="button__secondary w-100 m-1"
                onClick={onClickWithdrawHandler}
              >
                Withdraw
              </Button>
              <Button
                type="button"
                className="button__primary w-100 m-1"
                onClick={onClickDepositHandler}
              >
                Deposit
              </Button>

              <Button
                type="button"
                className="button__primary w-100 m-1"
                onClick={onClickMerchantHandler}
              >
                Deposit Merchant
              </Button>
            </div>
          </div>

          {withdraw && (
            <WalletWithdrawModal
              isOpen={withdraw}
              close={() => setWithdraw(false)}
              modal={() => withdrawModal()}
              selectedOptionHandler={selectedOptionHandler}
              selectedOption={selectedOption}
              withdrawModalHandler={withdrawModalHandler}
              withdrawModal2={withdrawModal2}
            />
          )}

          {withdrawModal2 && (
            <WalletWithdrawModal
              isOpen={false}
              close={() => setWithdrawModal(false)}
              modal={() => withdrawModal()}
              selectedOptionHandler={selectedOptionHandler}
              selectedOption={selectedOption}
              withdrawModalHandler={withdrawModalHandler}
              withdrawModal2={withdrawModal2}
              backBtn={backBtnHandlerWithdraw}
            />
          )}

          {deposit && (
            <WalletDepositModal
              isOpen={deposit}
              close={() => setDeposit(false)}
              modal={() => depositBankModal()}
              selectedOptionHandler={selectedOptionHandler}
              selectedOption={selectedOption}
            />
          )}
          {depositBank && (
            <WalletDepositBankModal
              isOpen={depositBank}
              close={() => setDepositBank(false)}
              confirm={() => depositConfirmModal()}
              selectedOptionFiat={selectedOption}
              depositConfirm={depositConfirm}
              selectedButton={selectedButton}
              backBtn={backBtnHandler}
            />
          )}

          {/* {depositConfirm && (
            <WalletDepositConfirmModal
              isOpen={depositConfirm}
              close={() => setDepositConfirm(false)}
              success={() => depositSuccess()}
            />
          )} */}
          {/* {isDeposit && (
            <SweetAlert
              title={isDeposit}
              success
              confirmBtnBsStyle="success"
              onConfirm={() => setIsDeposit(false)}
            />
          )} */}
        </Col>
        <Container fluid>
          <div className="table-background">
            <Nav pills className="nav-justified bg-light p-2">
              <NavItem className="waves-effect waves-light">
                <NavLink
                  className={classnames({
                    active: activeTabJustify2 === '25',
                  })}
                  onClick={() => {
                    toggleCustomJustified2('25');
                  }}
                >
                  <span className="d-none d-sm-block">Deposit</span>
                </NavLink>
              </NavItem>
              <NavItem className="waves-effect waves-light">
                <NavLink
                  className={classnames({
                    active: activeTabJustify2 === '26',
                  })}
                  onClick={() => {
                    toggleCustomJustified2('26');
                  }}
                >
                  <span className="d-none d-sm-block">Withdraw</span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTabJustify2} className="p-3 text-muted">
              <TabPane tabId="25">
                <DatatableTables
                  column={fiatColumn}
                  row={loading ? 'loading' : usersData}
                  paginationConfig={paginationConfig}
                />
              </TabPane>
              <TabPane tabId="26">
                <DatatableTables
                  column={withdrawColumn}
                  row={loading ? 'loading' : usersData}
                  paginationConfig={paginationConfig}
                />
              </TabPane>
            </TabContent>
          </div>
        </Container>
      </div>
    </>
  );
};
export default WalletCard;
