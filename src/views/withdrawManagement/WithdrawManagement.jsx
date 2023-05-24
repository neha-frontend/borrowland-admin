/* eslint-disable prefer-template */
// import { useHistory } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  FormGroup,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import { useEffect, useRef, useState } from 'react';
import { AvField, AvForm } from 'availity-reactstrap-validation';

import RenderIf from 'components/RenderIf';
import LogoLoader from 'components/UI/Spinner/LogoSpinner';
import Breadcrumb from 'components/BreadCrumb';
import DatatableTables from 'components/Table/Table';
import { pendingTransactionColumn, withdrawManagementColumn } from 'constants/tableColumn';
import { transactionManageList, approvePendingTransaction } from 'store/actions';

import '../viewcommon.css';
import { useDispatch, useSelector } from 'react-redux';
import UserWidget from 'components/UserWidget';
import ActionCell from 'components/ActionButton';
import ViewPendingTransaction from 'components/UI/Model/transactionModal/ViewPendingTransaction';
import ApproveTransaction from 'components/UI/Model/transactionModal/ApproveTransaction';
import RejectTransaction from 'components/UI/Model/transactionModal/RejectTransaction';
import { DateRange } from 'react-date-range';
import moment from 'moment';
import { useOutsideAlerter } from 'utils/useOutsideAlearter';

const WithdrawManagement = () => {
  const dispatch = useDispatch();
  const dateInput = useRef(null);

  const { isLoading, transactionManagementList, isTransactionApprove } = useSelector(
    state => state.transactionManagement,
  );
  const { topCardData, isCardLoading } = useSelector(state => state.admins);

  const [isActive, setIsActive] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [event, setEvent] = useState(false);
  const [count, setCount] = useState(10);
  const [paginationConfig, setPaginationConfig] = useState({});
  const [currentTab, setCurrentTab] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filteredData, setFilteredData] = useState({});
  const [isOpenRange, setIsOpenRange] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);
  useOutsideAlerter(dateInput, setIsOpenRange);

  const handleBtnFilter = (name, start, end) => {
    // console.log('FILTER_VALUE', startDate,endDate);
    setStartDate(start);
    setEndDate(end);
    setIsActive(name);
    setIsOpenRange(false);
  };

  const submit = (e, values) => {
    // eslint-disable-next-line no-shadow, no-unused-vars
    const temp = Object.fromEntries(Object.entries(values).filter(([_, v]) => v !== ''));
    setFilteredData(temp);
    let status;
    switch (currentTab) {
      case 1:
        status = { txnType: 'Withdraw', status: 'Requested' };
        break;
      case 2:
        status = { txnType: 'Withdraw', status: 'Pending' };
        break;
      case 3:
        status = { txnType: 'Withdraw', status: 'Rejected' };
        break;
      default:
        status = { txnType: 'Withdraw', status: 'Requested' };
    }
    dispatch(
      transactionManageList({
        query: `page=${currentPage}&limit=${count}`,
        data: temp,
        status,
      }),
    );
  };

  const handleAccept = id => {
    setSelectedTransaction(id);
    setEvent('accept');
  };

  const handleReject = id => {
    setSelectedTransaction(id);
    setEvent('reject');
  };

  const action = id => (
    <ActionCell accept={handleAccept} reject={handleReject} id={id} status="Pending" />
  );

  const handleApproveTransaction = () => {
    dispatch(approvePendingTransaction({ id: selectedTransaction, status: 'Approved' }));
    setEvent(false);
  };

  const handleRejectTransaction = reason => {
    dispatch(approvePendingTransaction({ id: selectedTransaction, status: 'Rejected', reason }));
  };

  /* Pagination Config */
  const onPageChange = page => {
    setCurrentPage(page);
    dispatch(transactionManageList({ query: `page=${page}&limit=${count}`, data: filteredData }));
    // setFilter(prev => ({ ...prev, startIndex: (page*10)+1 }));
  };

  const updateCurrentCountPage = page => {
    setCount(page);
  };

  const TabsHeader = [
    { name: 'Pending Transactions', position: 1 },
    { name: 'Approved Transactions', position: 2 },
    { name: 'Rejected Transactions', position: 3 },
  ];
  useEffect(() => {
    dispatch(
      transactionManageList({
        query: `page=${currentPage}&limit=${count}`,
        data: filteredData,
        status: { txnType: 'Withdraw', status: 'Requested' },
      }),
    );
  }, [isTransactionApprove]);
  useEffect(() => {
    if (transactionManagementList?.list) {
      transactionManagementList?.list?.forEach(ele => {
        const obj = ele;
        obj.action = action(ele?._id);
        obj.userRole = ele?.userdata?.userRole;
        obj.status = ele?.status === 'Pending' ? 'Approved' : ele?.status;

        obj.createdAt = ele?.createdAt ? new Date(ele.createdAt).toLocaleString() : '-';
        obj.amount = +ele?.amount ? +ele?.amount?.toFixed(6) : '-';
        obj.by = ele?.sender?.walletAddress
          ? ele?.sender?.walletAddress.slice(0, 6) +
            '...' +
            ele?.sender?.walletAddress.slice(
              ele?.sender?.walletAddress.length - 4,
              ele?.sender?.walletAddress,
            )
          : '-';
        obj.txnHash = ele?.txnHash
          ? ele?.txnHash?.slice(0, 6) +
            '...' +
            ele?.txnHash?.slice(ele?.txnHash?.length - 4, ele?.txnHash)
          : '-';
        // eslint-disable-next-line no-underscore-dangle
        obj.currency = ele?.token?._coin || '-';
        obj.fee = ele?.fee ? Number.parseFloat(ele?.fee).toFixed(8) : '-';

        // eslint-disable-next-line no-underscore-dangle
        obj.txnType = ele?.token?._type || '-';
      });
      const paginationConfigTemp = {
        currentPage,
        pageCount: transactionManagementList?.totalPage,
        count,
        itemCount: transactionManagementList?.totalItem,
        onPageChange,
        updateCurrentCountPage,
      };
      setPaginationConfig(paginationConfigTemp);
    }
  }, [transactionManagementList?.list]);

  useEffect(() => {
    switch (currentTab) {
      case 1:
        dispatch(
          transactionManageList({
            query: startDate
              ? `page=${currentPage}&limit=${count}&startDate=${startDate}&endDate=${endDate}`
              : `page=${currentPage}&limit=${count}`,
            data: filteredData,
            status: { txnType: 'Withdraw', status: 'Requested' },
          }),
        );

        break;
      case 2:
        dispatch(
          transactionManageList({
            query: startDate
              ? `page=${currentPage}&limit=${count}&startDate=${startDate}&endDate=${endDate}`
              : `page=${currentPage}&limit=${count}`,
            data: filteredData,
            status: { txnType: 'Withdraw', status: 'Pending' },
          }),
        );
        break;
      case 3:
        dispatch(
          transactionManageList({
            query: startDate
              ? `page=${currentPage}&limit=${count}&startDate=${startDate}&endDate=${endDate}`
              : `page=${currentPage}&limit=${count}`,
            data: filteredData,
            status: { txnType: 'Withdraw', status: 'Rejected' },
          }),
        );
        break;
      default:
        dispatch(
          transactionManageList({
            query: `page=${currentPage}&limit=${count}`,
            data: filteredData,
            status: { txnType: 'Withdraw', status: 'Requested' },
          }),
        );
    }
    // dispatch(getUserDetails({ id: location.state }));
  }, [currentTab, startDate, endDate, filteredData]);

  const handleDateChange = item => {
    setState([item.selection]);
    setStartDate(moment(item.selection?.startDate).format('YYYY-MM-DD'));
    setEndDate(moment(item.selection?.endDate).format('YYYY-MM-DD'));
  };

  const handleReset = () => {
    window.location.reload();
  };
  return (
    <div className="page-content">
      <div className="d-flex align-items-baseline justify-content-between">
        <div className="d-flex">
          <div>
            <Breadcrumb name="Withdraw Management" />
          </div>
        </div>
      </div>
      <RenderIf>
        <LogoLoader />
      </RenderIf>
      <Row>
        <UserWidget reports={topCardData?.transactionManagement} loading={isCardLoading} />
      </Row>
      <Row>
        <AvForm onValidSubmit={submit}>
          <Row className="row mb-4">
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-firstname-Input" className="col-form-Label">
                User Name
              </Label>
              <AvField
                type="text"
                className="form-control"
                id="horizontal-firstname-Input"
                name="fullName"
                placeholder="Username"
              />
            </Col>

            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-firstname-Input" className="col-form-Label">
                Country
              </Label>
              <AvField
                type="text"
                className="form-control"
                id="horizontal-firstname-Input"
                name="countryCode"
                placeholder="Country"
              />
            </Col>
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-email-Input" className="col-form-Label">
                Email
              </Label>
              <AvField
                name="email"
                // value={adminObj?.email}
                className="form-control"
                placeholder="Enter email"
                // disabled={isOpen === 'edit' || isOpen === 'view'}
                type="email"
              />
            </Col>
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-email-Input" className="col-form-Label">
                Mobile Number
              </Label>
              <AvField
                name="mobile"
                // value={adminObj?.email}
                className="form-control"
                placeholder="Mobile Number"
                // disabled={isOpen === 'edit' || isOpen === 'view'}
                type="number"
              />
            </Col>
          </Row>
          <Row className="row mb-4">
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-firstname-Input" className="col-form-Label">
                Type of Assets
              </Label>
              <AvField
                type="select"
                className="form-control"
                id="horizontal-firstname-Input"
                name="token"
                placeholder="Type of Assets"
              >
                <option className="d-none" disabled value="">
                  Select
                </option>
                <option value="btc">BTC</option>
                <option value="eth">ETH</option>
                <option value="usdc">USDC</option>
                <option value="usdt">USDT</option>
              </AvField>
            </Col>
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-firstname-Input" className="col-form-Label">
                User Type
              </Label>
              <AvField
                type="select"
                className="form-control"
                id="horizontal-firstname-Input"
                name="userType"
                placeholder="Type of Assets"
              >
                <option className="d-none" disabled value="">
                  Select
                </option>
                <option value="agent">Agent</option>
                <option value="user">User</option>
              </AvField>
            </Col>
          </Row>
          <Row>
            <FormGroup>
              <Button className="float-right mb-4 quick-stats-active">Submit</Button>
            </FormGroup>
          </Row>
        </AvForm>
      </Row>
      <RenderIf render>
        <Container fluid>
          <div style={{ background: 'white', borderRadius: '5px' }}>
            <Nav tabs className="pt-3 px-3">
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
                <div
                  className="d-flex"
                  style={{ padding: 20, justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div>
                    <Button
                      variant="outline-secondary"
                      className={`${
                        isActive === 'today' ? 'quick-stats-active' : ' '
                      } mright-1 quick-stats-btn`}
                      onClick={() =>
                        handleBtnFilter(
                          'today',
                          moment(new Date()).format('YYYY-MM-DD'),
                          moment(new Date()).format('YYYY-MM-DD'),
                        )
                      }
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className={`${
                        isActive === 'yesterday' ? 'quick-stats-active' : ' '
                      } mright-1 quick-stats-btn`}
                      onClick={() =>
                        handleBtnFilter(
                          'yesterday',
                          moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD'),
                          moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD'),
                        )
                      }
                    >
                      Yesterday
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className={`${
                        isActive === 'last_week' ? 'quick-stats-active' : ' '
                      } mright-1 quick-stats-btn`}
                      onClick={() =>
                        handleBtnFilter(
                          'last_week',
                          moment().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD'),
                          moment().subtract(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD'),
                        )
                      }
                    >
                      Last Week
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className={`${
                        isActive === 'this_month' ? 'quick-stats-active' : ' '
                      } mright-1 quick-stats-btn`}
                      onClick={() =>
                        handleBtnFilter(
                          'this_month',
                          moment().clone().startOf('month').format('YYYY-MM-DD'),
                          moment(new Date()).format('YYYY-MM-DD'),
                        )
                      }
                    >
                      This Month
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className={`${
                        isActive === 'last_month' ? 'quick-stats-active' : ' '
                      } mright-1 quick-stats-btn`}
                      onClick={() =>
                        handleBtnFilter(
                          'last_month',
                          moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'),
                          moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD'),
                        )
                      }
                    >
                      Last Month
                    </Button>
                    <span ref={dateInput}>
                      <Button
                        variant="outline-secondary"
                        className={`${
                          isActive === 'c_data' ? 'quick-stats-active' : ' '
                        } mright-1 quick-stats-btn`}
                        onClick={() => {
                          setIsActive('c_data');
                          setIsOpenRange(!isOpenRange);
                        }}
                      >
                        <i className="fa fa-calendar-check-o" /> Custom Date
                        {/* <input type="date" placeholder="Custom Data" className="invisible" /> */}
                      </Button>

                      {isOpenRange && (
                        <DateRange
                          editableDateInputs
                          // onChange={item => setState([item.selection])}
                          onChange={handleDateChange}
                          moveRangeOnFirstSelection={false}
                          ranges={state}
                          maxDate={new Date()}
                        />
                      )}
                    </span>
                    {/* <DateRangePicker
          date={new Date()}
          onChange={item => setState([item.selection])}
          ranges={state}
          editableDateInputs
          direction="horizontal"
        /> */}
                  </div>
                  <div>
                    <a className="cursor-pointer fw-bold" onClick={handleReset}>
                      Reset
                    </a>
                  </div>
                </div>
                <DatatableTables
                  column={pendingTransactionColumn}
                  row={isLoading ? 'loading' : transactionManagementList?.list}
                  hidePaging
                  paginationConfig={paginationConfig}
                  // action={action}
                />
              </TabPane>
              <TabPane tabId={2}>
                <div
                  className="d-flex"
                  style={{ padding: 20, justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div>
                    <Button
                      variant="outline-secondary"
                      className={`${
                        isActive === 'today' ? 'quick-stats-active' : ' '
                      } mright-1 quick-stats-btn`}
                      onClick={() =>
                        handleBtnFilter(
                          'today',
                          moment(new Date()).format('YYYY-MM-DD'),
                          moment(new Date()).format('YYYY-MM-DD'),
                        )
                      }
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className={`${
                        isActive === 'yesterday' ? 'quick-stats-active' : ' '
                      } mright-1 quick-stats-btn`}
                      onClick={() =>
                        handleBtnFilter(
                          'yesterday',
                          moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD'),
                          moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD'),
                        )
                      }
                    >
                      Yesterday
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className={`${
                        isActive === 'last_week' ? 'quick-stats-active' : ' '
                      } mright-1 quick-stats-btn`}
                      onClick={() =>
                        handleBtnFilter(
                          'last_week',
                          moment().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD'),
                          moment().subtract(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD'),
                        )
                      }
                    >
                      Last Week
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className={`${
                        isActive === 'this_month' ? 'quick-stats-active' : ' '
                      } mright-1 quick-stats-btn`}
                      onClick={() =>
                        handleBtnFilter(
                          'this_month',
                          moment().clone().startOf('month').format('YYYY-MM-DD'),
                          moment(new Date()).format('YYYY-MM-DD'),
                        )
                      }
                    >
                      This Month
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className={`${
                        isActive === 'last_month' ? 'quick-stats-active' : ' '
                      } mright-1 quick-stats-btn`}
                      onClick={() =>
                        handleBtnFilter(
                          'last_month',
                          moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'),
                          moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD'),
                        )
                      }
                    >
                      Last Month
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className={`${
                        isActive === 'c_data' ? 'quick-stats-active' : ' '
                      } mright-1 quick-stats-btn`}
                      onClick={() => {
                        setIsActive('c_data');
                        setIsOpenRange(!isOpenRange);
                      }}
                    >
                      <i className="fa fa-calendar-check-o" /> Custom Date
                      {/* <input type="date" placeholder="Custom Data" className="invisible" /> */}
                    </Button>
                    {isOpenRange && (
                      <DateRange
                        editableDateInputs
                        onChange={handleDateChange}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                      />
                    )}
                  </div>
                  <div>
                    <a className="cursor-pointer fw-bold" onClick={handleReset}>
                      Reset
                    </a>
                  </div>
                </div>
                <DatatableTables
                  column={withdrawManagementColumn}
                  //   isBlock
                  row={isLoading ? 'loading' : transactionManagementList?.list}
                  hidePaging
                  isView
                />
              </TabPane>
              <TabPane tabId={3}>
                <div
                  className="d-flex"
                  style={{ padding: 20, justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div>
                    <Button
                      variant="outline-secondary"
                      className={`${
                        isActive === 'today' ? 'quick-stats-active' : ' '
                      } mright-1 quick-stats-btn`}
                      onClick={() =>
                        handleBtnFilter(
                          'today',
                          moment(new Date()).format('YYYY-MM-DD'),
                          moment(new Date()).format('YYYY-MM-DD'),
                        )
                      }
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className={`${
                        isActive === 'yesterday' ? 'quick-stats-active' : ' '
                      } mright-1 quick-stats-btn`}
                      onClick={() =>
                        handleBtnFilter(
                          'yesterday',
                          moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD'),
                          moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD'),
                        )
                      }
                    >
                      Yesterday
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className={`${
                        isActive === 'last_week' ? 'quick-stats-active' : ' '
                      } mright-1 quick-stats-btn`}
                      onClick={() =>
                        handleBtnFilter(
                          'last_week',
                          moment().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD'),
                          moment().subtract(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD'),
                        )
                      }
                    >
                      Last Week
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className={`${
                        isActive === 'this_month' ? 'quick-stats-active' : ' '
                      } mright-1 quick-stats-btn`}
                      onClick={() =>
                        handleBtnFilter(
                          'this_month',
                          moment().clone().startOf('month').format('YYYY-MM-DD'),
                          moment(new Date()).format('YYYY-MM-DD'),
                        )
                      }
                    >
                      This Month
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className={`${
                        isActive === 'last_month' ? 'quick-stats-active' : ' '
                      } mright-1 quick-stats-btn`}
                      onClick={() =>
                        handleBtnFilter(
                          'last_month',
                          moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'),
                          moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD'),
                        )
                      }
                    >
                      Last Month
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className={`${
                        isActive === 'c_data' ? 'quick-stats-active' : ' '
                      } mright-1 quick-stats-btn`}
                      onClick={() => {
                        setIsActive('c_data');
                        setIsOpenRange(!isOpenRange);
                      }}
                    >
                      <i className="fa fa-calendar-check-o" /> Custom Date
                      {/* <input type="date" placeholder="Custom Data" className="invisible" /> */}
                    </Button>
                    {isOpenRange && (
                      <DateRange
                        editableDateInputs
                        onChange={handleDateChange}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                      />
                    )}
                  </div>
                  <div>
                    <a className="cursor-pointer fw-bold" onClick={handleReset}>
                      Reset
                    </a>
                  </div>
                </div>
                <DatatableTables
                  column={withdrawManagementColumn}
                  //   isBlock
                  row={isLoading ? 'loading' : transactionManagementList?.list}
                  hidePaging
                  isView
                />
              </TabPane>
            </TabContent>
          </div>
        </Container>
      </RenderIf>
      <RenderIf render={event === 'view'}>
        <ViewPendingTransaction
          isOpen
          close={() => setEvent(false)}
          pendingTransaction={selectedTransaction}
        />
      </RenderIf>
      <RenderIf render={event === 'accept'}>
        <ApproveTransaction
          isOpen
          close={() => setEvent(false)}
          headerTitle="Approve Transaction"
          text="Do You really want to Approve this Transaction ?"
          onConfirm={handleApproveTransaction}
        />
      </RenderIf>
      <RenderIf render={event === 'reject'}>
        <RejectTransaction
          isOpen
          close={() => setEvent(false)}
          title="Transaction"
          handleReject={handleRejectTransaction}
        />
      </RenderIf>
    </div>
  );
};

export default WithdrawManagement;
