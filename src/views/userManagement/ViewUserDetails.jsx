/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Button,
  Container,
  Card,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';

import {
  walletHistoryColumn,
  loanHistoryColumn,
  lendingHistoryColumn,
  earningHistoryColumn,
  swappingHistoryColumn,
} from 'constants/tableColumn';
import DatatableTables from 'components/Table/Table';
import RenderIf from 'components/RenderIf';
import LogoLoader from 'components/UI/Spinner/LogoSpinner';
import Breadcrumb from 'components/BreadCrumb';
import EditUsers from 'components/UI/Model/userModals/EditUsers';

import user4 from 'assets/images/avatar.jpg';

import '../viewcommon.css';
import SendEmail from 'components/UI/Model/userModals/sendEmail';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, walletList, loanList, lendingList, updateUser } from 'store/actions';
import { toast } from 'react-toastify';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import ResetPassword from 'components/UI/Model/userModals/ResetPassword';

const TabsHeader = [
  { name: 'Wallet History', position: 1 },
  { name: 'Loan History', position: 2 },
  { name: 'Lending History', position: 3 },
  { name: 'Earning History', position: 4 },
  { name: 'Swapping History', position: 5 },
];

const ViewUserDetails = () => {
  const history = useHistory();
  const location = useLocation();
  const isUser = location?.pathname.includes('/user-management');

  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [currentTab, setCurrentTab] = useState(1);
  const [event, setEvent] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(10);
  const [chain, setChain] = useState('eth');

  const [paginationConfig, setPaginationConfig] = useState({});

  const {
    isLoading,
    userDetails,
    walletListData,
    loanListData,
    lendingListData,
    isUserUpdated,
    isEmailSend,
  } = useSelector(state => state.user);

  // console.log('DATA', loanListData);

  // console.log('DATA', lendingListData);

  const handleEdit = () => {
    //  setSelectedAdmin(id);
    /* dispatch(getAdminDetails({id})); */
    // const selectedAdminObj = adminsList?.items.find(ele => ele._id === id);
    // setSelectedAdmin(selectedAdminObj);
    setEvent('edit');
  };
  const handleSendEmail = () => {
    setEvent('sendEmail');
  };
  const handelResetPassword = () => {
    setEvent('resetPassword');
  };
  const onUpdate = data => {
    if (event === 'edit') {
      const obj = data;
      obj.id = location?.state;
      dispatch(updateUser(obj));
    }
    setSelectedAdmin('');
  };
  /* Pagination Config */
  // const onPageChange = page => {
  //   setCurrentPage(page);
  //   dispatch(walletList(`${location.state}?page=${page}&limit=${count}`));
  //   dispatch(loanList(`${location.state}?page=${page}&limit=${count}`));
  //   dispatch(lendingList(`${location.state}?page=${page}&limit=${count}`));
  //   // setFilter(prev => ({ ...prev, startIndex: (page*10)+1 }));
  // };
  const onPageChangeWallet = page => {
    setCurrentPage(page);
    dispatch(walletList(`${location.state}?page=${page}&limit=${count}`));
    // setFilter(prev => ({ ...prev, startIndex: (page*10)+1 }));
  };
  const onPageChangeLoan = page => {
    setCurrentPage(page);
    dispatch(loanList(`${location.state}?page=${page}&limit=${count}`));
    // setFilter(prev => ({ ...prev, startIndex: (page*10)+1 }));
  };
  const onPageChangeLend = page => {
    setCurrentPage(page);
    dispatch(lendingList(`${location.state}?page=${page}&limit=${count}`));
    // setFilter(prev => ({ ...prev, startIndex: (page*10)+1 }));
  };
  const updateCurrentCountPage = page => {
    setCount(page);
  };

  useEffect(() => {
    dispatch(getUserDetails(`${location.state}?coin=${chain}`));
  }, [chain, isEmailSend]);

  useEffect(() => {
    dispatch(getUserDetails(`${location.state}?coin=${chain}`));
    if (isUserUpdated) {
      toast.success('User updated successfully');
      setEvent(false);
    }
  }, [isUserUpdated]);

  useEffect(() => {
    switch (currentTab) {
      case 1:
        dispatch(walletList(`${location.state}?page=${currentPage}&limit=${count}`));
        break;
      case 2:
        dispatch(loanList(`${location.state}?page=${currentPage}&limit=${count}`));
        break;
      case 3:
        dispatch(lendingList(`${location.state}?page=${currentPage}&limit=${count}`));
        break;
      case 4:
        dispatch(
          walletList(`${location.state}?txnType=Interest&page=${currentPage}&limit=${count}`),
        );
        break;
      case 5:
        dispatch(walletList(`${location.state}?token=Swap&page=${currentPage}&limit=${count}`));
        break;
      default:
        dispatch(
          walletList(`${location.state}?txnType=Interest&page=${currentPage}&limit=${count}`),
        );
    }
    // dispatch(getUserDetails({ id: location.state }));
  }, [currentTab]);

  useEffect(() => {
    if (walletListData?.items && walletListData?.items) {
      walletListData?.items.forEach(ele => {
        const obj = ele;
        obj.createdAt = ele?.createdAt ? new Date(ele.createdAt).toLocaleString() : '-';
        obj.token = ele?.token || '-';
        obj.amount = ele?.amount || '-';
        obj.status = ele?.status || '-';
        obj.type = ele?.type || '-';
      });
      const paginationConfigTemp = {
        currentPage,
        pageCount: walletListData?.totalPage,
        count,
        itemCount: walletListData?.totalItem,
        onPageChange: onPageChangeWallet,
        updateCurrentCountPage,
      };
      setPaginationConfig(paginationConfigTemp);
    }
  }, [walletListData?.items]);

  useEffect(() => {
    if (loanListData?.loandata?.list) {
      loanListData?.loandata?.list?.forEach(ele => {
        const obj = ele;
        obj.updatedAt = ele.createdAt ? new Date(ele.createdAt).toLocaleString() : '-';
        obj.dueDate = ele.dueDate ? new Date(ele.dueDate).toLocaleString() : '-';
        obj.collateralAmount = ele.collateral.amount.toFixed(6);
        obj.loanAmount = ele.loan.amount.toFixed(6);
        obj.status =
          new Date(ele?.dueDate).getTime() < new Date().getTime() && !ele?.isLoanRepaid
            ? 'Outstanding'
            : ele?.isLoanRepaid
            ? 'Completed'
            : 'Active';
      });
      const paginationConfigTemp = {
        currentPage,
        pageCount: loanListData?.loandata?.totalPage,
        count,
        itemCount: loanListData?.loandata?.totalItem,
        onPageChange: onPageChangeLoan,
        updateCurrentCountPage,
      };
      setPaginationConfig(paginationConfigTemp);
    }
  }, [loanListData]);

  useEffect(() => {
    if (lendingListData?.lendingData?.list) {
      lendingListData?.lendingData?.list?.forEach(ele => {
        const obj = ele;
        obj.createdAt = ele.createdAt ? new Date(ele.createdAt).toLocaleString() : '-';
        obj.dueDate = ele.termEndsOn ? new Date(ele.termEndsOn).toLocaleString() : '-';
        obj.status = ele.isActive ? 'Active' : 'Inactive';
      });
      const paginationConfigTemp = {
        currentPage,
        pageCount: lendingListData?.lendingData?.totalPage,
        count,
        itemCount: lendingListData?.lendingData?.totalItem,
        onPageChange: onPageChangeLend,
        updateCurrentCountPage,
      };
      setPaginationConfig(paginationConfigTemp);
    }
  }, [lendingListData]);
  const handleCopy = async text => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied successfully.');

      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      return false;
    }
  };
  return (
    <div className="page-content">
      <div className="d-flex align-items-baseline justify-content-between">
        <div className="d-flex">
          <div>
            {' '}
            <i
              className="uil-arrow-circle-left cursor-pointer"
              style={{ padding: 5 }}
              onClick={() => {
                history.push(`${isUser ? '/user-management' : '/affiliate-management'}`);
              }}
            />
          </div>
          <div>
            <Breadcrumb name={`View ${isUser ? 'User' : 'Agent'}`} />
          </div>
        </div>
        <div className="d-flex">
          <AvForm className="mr-5">
            <AvField
              name="coin"
              type="select"
              className="form-control form-select"
              id="coin"
              onChange={e => setChain(e.target.value)}
            >
              <option value="eth">ETH</option>
              <option value="btc">BTC</option>
              <option value="usdc">USDC</option>
              <option value="usdt">USDT</option>
            </AvField>
          </AvForm>

          <Button type="button" className="button-color mr-5" onClick={handelResetPassword}>
            Reset Password
          </Button>
          <Button type="button" className="button-color mr-5" onClick={handleEdit}>
            Edit
          </Button>
          <Button type="button" className="button-color mr-5" onClick={handleSendEmail}>
            Send an email
          </Button>
        </div>
      </div>
      <RenderIf>
        <LogoLoader />
      </RenderIf>
      <RenderIf render>
        <Container fluid>
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <div>
                    <div className="d-flex">
                      <div style={{ padding: 20 }}>
                        {' '}
                        <img
                          className="rounded-circle user-image"
                          src={user4}
                          alt="Header Avatar"
                        />
                      </div>
                      <div className="w-100">
                        <Row className="p-2">
                          <Col lg={3}>
                            <div className="user-title">{`User's Name`}</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">{userDetails?.fullName || 'N/A'}</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-title">{`${
                              isUser ? 'User' : 'Affiliate'
                            } Id`}</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">{userDetails?._id || 'N/A'}</div>
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col lg={3}>
                            <div className="user-title">Email</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">{userDetails?.email || 'N/A'}</div>
                          </Col>
                          {/* <Col lg={3}>
                            <div className="user-title">Country</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">{userDetails?.country || 'N/A'}</div>
                          </Col> */}
                          <Col lg={3}>
                            <div className="user-title">Available Lend</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">
                              {userDetails?.availableLending || '-'}
                            </div>
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col lg={3}>
                            <div className="user-title">Mobile Number</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">{userDetails?.mobile || '-'}</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-title">KYC Status</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">
                              {userDetails?.verification || 'N/A'}
                            </div>
                          </Col>
                        </Row>
                        <Row className="p-2">
                          {/* <Col lg={3}>
                            <div className="user-title">Address</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">
                              2-312, plot no.-12, Ahmedabad,India
                            </div>
                          </Col> */}
                          <Col lg={3}>
                            <div className="user-title">Available Loan</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">
                              {userDetails?.availableLoan || '-'}
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-title">Available Balance</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">
                              {userDetails?.availableBalance || '-'}
                            </div>
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col lg={3}>
                            <div className="user-title">Saving Wallet Address</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">
                              {userDetails?.savingWalletAddress?.slice(0, 6)} ...{' '}
                              {userDetails?.savingWalletAddress?.slice(
                                userDetails?.savingWalletAddress?.length - 4,
                                userDetails?.savingWalletAddress?.length,
                              ) || 'Not Created'}
                              {userDetails?.creditLineWalletAddress && (
                                <i
                                  className="fa fa-files-o ml-1 cp"
                                  title="Copy"
                                  onClick={() => handleCopy(userDetails?.savingWalletAddress)}
                                />
                              )}
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-title">Credit Line Wallet Address</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">
                              {userDetails?.creditLineWalletAddress?.slice(0, 6)} ...{' '}
                              {userDetails?.creditLineWalletAddress?.slice(
                                userDetails?.creditLineWalletAddress?.length - 4,
                                userDetails?.creditLineWalletAddress?.length,
                              ) || 'Not Created'}
                              {userDetails?.creditLineWalletAddress && (
                                <i
                                  className="fa fa-files-o ml-1 cp"
                                  title="Copy"
                                  onClick={() => handleCopy(userDetails?.creditLineWalletAddress)}
                                />
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col lg={3}>
                            <div className="user-title">First Deposited Amount</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">
                              {userDetails?.firstDeposit?.amount || '-'}{' '}
                              {userDetails?.firstDeposit?.coin}
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-title">Total Swapped Amount</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">
                              {userDetails?.totalSwappedAmount
                                ? `$ ${userDetails?.totalSwappedAmount}`
                                : '-'}
                            </div>
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col lg={3}>
                            <div className="user-title">First Withdrawal Amount</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">
                              {userDetails?.firstWithdraw?.amount || '-'}{' '}
                              {userDetails?.firstWithdraw?.token}
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-title">Total Profit Earned</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">
                              {userDetails?.totalProfitEarned
                                ? `$ ${userDetails?.totalProfitEarned}`
                                : '-'}
                            </div>
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col lg={3}>
                            <div className="user-title">First Swapped</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">
                              {userDetails?.firstSwap?.amount || '-'}
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-title">Total Loan Taken</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">
                              {' '}
                              {userDetails?.totalLoanTaken
                                ? `$ ${userDetails?.totalLoanTaken}`
                                : '-'}
                            </div>
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col lg={3}>
                            <div className="user-title">Total Lending Amount</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">
                              {userDetails?.totalLendingAmount
                                ? `$ ${userDetails?.totalLendingAmount}`
                                : '-'}
                            </div>
                          </Col>
                          {/* <Col lg={3}>
                            <div className="user-title">Total Loan Taken</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title"> {userDetails?.totalLoanTaken ? `$ ${userDetails?.totalLoanTaken}` : '-'}</div>
                          </Col> */}
                        </Row>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={12}>
              <Card className="detail-card">
                <CardBody>
                  <Nav tabs>
                    {TabsHeader.map(item => (
                      <NavItem>
                        <NavLink
                          className={`${currentTab === item.position ? 'active' : ''} cp`}
                          onClick={() => {
                            setCurrentTab(item.position);
                          }}
                        >
                          {item.name}
                        </NavLink>
                      </NavItem>
                    ))}
                  </Nav>
                  <TabContent activeTab={currentTab}>
                    <TabPane tabId={1}>
                      <DatatableTables
                        column={walletHistoryColumn}
                        row={
                          isLoading ? 'loading' : walletListData?.items ? walletListData?.items : []
                        }
                        hidePaging
                        paginationConfig={paginationConfig}
                        // action={action}
                      />
                    </TabPane>
                    <TabPane tabId={2}>
                      <DatatableTables
                        column={loanHistoryColumn}
                        row={isLoading ? 'loading' : loanListData?.loandata?.list}
                        hidePaging
                        paginationConfig={paginationConfig}
                        // action={action}
                      />
                    </TabPane>
                    <TabPane tabId={3}>
                      <DatatableTables
                        column={lendingHistoryColumn}
                        row={isLoading ? 'loading' : lendingListData?.lendingData?.list}
                        hidePaging
                        paginationConfig={paginationConfig}
                        // action={action}
                      />
                    </TabPane>
                    <TabPane tabId={4}>
                      <DatatableTables
                        column={earningHistoryColumn}
                        row={
                          isLoading ? 'loading' : walletListData?.items ? walletListData?.items : []
                        }
                        hidePaging
                        paginationConfig={paginationConfig}
                        // action={action}
                      />
                    </TabPane>
                    <TabPane tabId={5}>
                      <DatatableTables
                        column={swappingHistoryColumn}
                        row={
                          isLoading ? 'loading' : walletListData?.items ? walletListData?.items : []
                        }
                        hidePaging
                        paginationConfig={paginationConfig}
                        // action={action}
                      />
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </RenderIf>
      <RenderIf render={event === 'edit'}>
        <EditUsers
          isOpen={event === 'remove' ? '' : event}
          close={() => setEvent(false)}
          disable={event === 'view' || event === 'edit'}
          onSubmit={onUpdate}
          adminDetails={selectedAdmin}
          // generateTempPassword={generateTempPasswordCB}
        />
      </RenderIf>
      <RenderIf render={event === 'sendEmail'}>
        <SendEmail
          isOpen={event}
          close={() => setEvent(false)}
          onSubmit={onUpdate}
          userID={userDetails?._id}
        />
      </RenderIf>
      <RenderIf render={event === 'resetPassword'}>
        <ResetPassword isOpen={event} close={() => setEvent(false)} value={userDetails?.email} />
      </RenderIf>
    </div>
  );
};

export default ViewUserDetails;
