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

import DatatableTables from 'components/Table/Table';
import RenderIf from 'components/RenderIf';
import LogoLoader from 'components/UI/Spinner/LogoSpinner';
import Breadcrumb from 'components/BreadCrumb';
import EditUsers from 'components/UI/Model/userModals/EditUsers';

import user4 from 'assets/images/avatar.jpg';

import '../viewcommon.css';
import SendEmail from 'components/UI/Model/userModals/sendEmail';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  affiliateWalletHistoryColumn,
  affiliateLoanHistoryColumn,
  affiliateLendingHistoryColumn,
  affiliateSwappingHistoryColumn,
  affliateEarningHistoryColumn,
} from 'constants/tableColumn';

const TabsHeader = [
  { name: 'Wallet History', position: 1 },
  { name: 'Loan History', position: 2 },
  { name: 'Lending History', position: 3 },
  { name: 'Earning History', position: 4 },
  { name: 'Swapping History', position: 5 },
];

const ViewAffiliateUser = () => {
  const history = useHistory();
  const location = useLocation();

  // eslint-disable-next-line no-unused-vars
  const [currentTab, setCurrentTab] = useState(1);
  const [event, setEvent] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({});
  // const [currentPage, setCurrentPage] = useState(1);
  // const [count, setCount] = useState(10);
  // const [paginationConfig, setPaginationConfig] = useState({});

  const { isLoading, userDetails, lendingListData, isUserUpdated } = useSelector(
    state => state.user,
  );

  console.log('userDetails', userDetails);
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
  const onUpdate = data => {
    if (event === 'edit') {
      const obj = data;
      obj.id = location?.state;
      // dispatch(updateUser(obj));
    }
    setSelectedAdmin('');
  };
  /* Pagination Config */
  // const onPageChange = page => {
  //   setCurrentPage(page);
  //   dispatch(walletList(`?page=${page}&limit=${count}`));
  //   dispatch(loanList(`?page=${page}&limit=${count}`));
  //   dispatch(lendingList(`?page=${page}&limit=${count}`));
  // };

  // const updateCurrentCountPage = page => {
  //   setCount(page);
  // };

  // useEffect(() => {
  //   dispatch(getUserDetails({ id: location.state }));
  // }, []);
  useEffect(() => {
    if (isUserUpdated) {
      toast.success('User updated successfully');
    }
    setEvent(false);
  }, [isUserUpdated]);

  // useEffect(() => {
  //   switch (currentTab) {
  //     case 1:
  //       dispatch(walletList(`${location.state}?page=${currentPage}&limit=${count}`));
  //       break;
  //     case 2:
  //       dispatch(loanList(`${location.state}?page=${currentPage}&limit=${count}`));
  //       break;
  //     case 3:
  //       dispatch(lendingList(`${location.state}?page=${currentPage}&limit=${count}`));
  //       break;
  //     case 4:
  //       dispatch(walletList(`${location.state}?token=Earn`));
  //       break;
  //     case 5:
  //       dispatch(walletList(`${location.state}?token=Swap`));
  //       break;
  //     default:
  //       dispatch(walletList(`${location.state}?token=Swap`));
  //   }
  // }, [currentTab]);

  // useEffect(() => {
  //   if (walletListData?.items) {
  //     walletListData?.items?.forEach(ele => {
  //       const obj = ele;
  //       obj.createdAt = ele?.createdAt ? new Date(ele.createdAt).toLocaleString() : '-';
  //       obj.token = ele?.token || '-';
  //       obj.amount = ele?.amount || '-';
  //       obj.status = ele?.status || '-';
  //       obj.type = ele?.type || '-';
  //     });
  //     const paginationConfigTemp = {
  //       currentPage,
  //       pageCount: walletListData?.totalPage,
  //       count,
  //       itemCount: walletListData?.totalItem,
  //       onPageChange,
  //       updateCurrentCountPage,
  //     };
  //     setPaginationConfig(paginationConfigTemp);
  //   }
  // }, [walletListData]);

  // useEffect(() => {
  //   if (loanListData?.loandata?.list) {
  //     loanListData?.loandata?.list?.forEach(ele => {
  //       const obj = ele;
  //       obj.updatedAt = ele.createdAt ? new Date(ele.createdAt).toLocaleString() : '-';
  //       obj.dueDate = ele.dueDate ? new Date(ele.dueDate).toLocaleString() : '-';
  //       obj.collateralAmount = ele.collateral.amount.toFixed(6);
  //       obj.loanAmount = ele.loan.amount.toFixed(6);
  //     });
  //     const paginationConfigTemp = {
  //       currentPage,
  //       pageCount: loanListData?.loandata?.totalPage,
  //       count,
  //       itemCount: loanListData?.loandata?.totalItem,
  //       onPageChange,
  //       updateCurrentCountPage,
  //     };
  //     setPaginationConfig(paginationConfigTemp);
  //   }
  // }, [loanListData]);

  // useEffect(() => {
  //   if (lendingListData?.lendingData?.list) {
  //     lendingListData?.lendingData?.list?.forEach(ele => {
  //       const obj = ele;
  //       obj.createdAt = ele.createdAt ? new Date(ele.createdAt).toLocaleString() : '-';
  //       obj.dueDate = ele.termEndsOn ? new Date(ele.termEndsOn).toLocaleString() : '-';
  //     });
  //     const paginationConfigTemp = {
  //       currentPage,
  //       pageCount: lendingListData?.totalPage,
  //       count,
  //       itemCount: lendingListData?.totalItem,
  //       onPageChange,
  //       updateCurrentCountPage,
  //     };
  //     setPaginationConfig(paginationConfigTemp);
  //   }
  // }, [lendingListData]);
  return (
    <div className="page-content">
      <div className="d-flex align-items-baseline justify-content-between">
        <div className="d-flex">
          <div>
            {' '}
            <i
              className="uil-arrow-circle-left cursor-pointer"
              onClick={() => history.push('/user-management')}
            />
          </div>
          <div>
            <Breadcrumb name="View User" />
          </div>
        </div>
        <div>
          <Button type="button" className="button-color mr-5">
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
                            <div className="user-sub-title">John Doe</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-title">Affiliate ID</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">C1259.....1536</div>
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col lg={3}>
                            <div className="user-title">Email</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">doejohn@email.com</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-title">Country</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">England</div>
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col lg={3}>
                            <div className="user-title">Mobile Number</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">+01, 78965621202</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-title">KYC Status</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">Verfed</div>
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col lg={3}>
                            <div className="user-title">Address</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">482, Baker Street Newyork USA</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-title">Available Balace</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">1.25 BTC</div>
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col lg={3}>
                            <div className="user-title">Wallet Address</div>
                          </Col>
                          <Col lg={3}>
                            <div className="user-sub-title">0x656.......2986dF17</div>
                          </Col>
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
                        column={affiliateWalletHistoryColumn}
                        // row={isLoading ? 'loading' : walletListData?.items}
                        hidePaging
                        // paginationConfig={paginationConfig}
                        // action={action}
                      />
                    </TabPane>
                    <TabPane tabId={2}>
                      <DatatableTables
                        column={affiliateLoanHistoryColumn}
                        // row={isLoading ? 'loading' : loanListData?.loandata?.list}
                        hidePaging
                        // paginationConfig={paginationConfig}
                        // action={action}
                      />
                    </TabPane>
                    <TabPane tabId={3}>
                      <DatatableTables
                        column={affiliateLendingHistoryColumn}
                        row={isLoading ? 'loading' : lendingListData?.lendingData?.list}
                        hidePaging
                        // paginationConfig={paginationConfig}
                        // action={action}
                      />
                    </TabPane>
                    <TabPane tabId={4}>
                      <DatatableTables
                        column={affliateEarningHistoryColumn}
                        // row={isLoading ? 'loading' : walletListData?.items}
                        hidePaging
                        // paginationConfig={paginationConfig}
                        // action={action}
                      />
                    </TabPane>
                    <TabPane tabId={5}>
                      <DatatableTables
                        column={affiliateSwappingHistoryColumn}
                        // row={isLoading ? 'loading' : walletListData?.items}
                        hidePaging
                        // paginationConfig={paginationConfig}
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
          adminDetails={selectedAdmin}
        />
      </RenderIf>
    </div>
  );
};

export default ViewAffiliateUser;
