import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, FormGroup, Label, Row } from 'reactstrap';

// getAdminDetails

import '../viewcommon.css';
import RenderIf from 'components/RenderIf';
import Breadcrumb from 'components/BreadCrumb';
import EditUsers from 'components/UI/Model/userModals/EditUsers';
import LogoLoader from 'components/UI/Spinner/LogoSpinner';
// import ButtonDropDown from 'components/Dropdowncomponent/DropdownButton';
import DatatableTables from 'components/Table/Table';
// import SimpleToggleSwitch from 'components/Switch/SimpleToggleSwitch';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import UserWidget from 'components/UserWidget';
import { affiliateColumn } from 'constants/tableColumn';
import ActionCell from 'components/ActionButton';
import { useHistory } from 'react-router';
import { affiliateManageList, approveAffiliate } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { DateRange } from 'react-date-range';
import ApproveTransaction from 'components/UI/Model/transactionModal/ApproveTransaction';
import RejectTransaction from 'components/UI/Model/transactionModal/RejectTransaction';
import SendGifts from 'components/UI/Model/userModals/sendGifts';
import { useOutsideAlerter } from 'utils/useOutsideAlearter';

const AffiliateManagement = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const dateInput = useRef(null);

  const { affiliateManagementList, isLoading, isAffiliateApprove } = useSelector(
    state => state.affiliate,
  );
  const { topCardData, isCardLoading } = useSelector(state => state.admins);

  const [event, setEvent] = useState('');
  const [walletAddress, setWalletAddress] = useState();

  const [isActive, setIsActive] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(10);
  const [paginationConfig, setPaginationConfig] = useState({});
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
    dispatch(affiliateManageList({ query: `page=${currentPage}&limit=${count}`, data: temp }));
  };

  const handleDateChange = item => {
    setState([item.selection]);
    setStartDate(moment(item.selection?.startDate).format('YYYY-MM-DD'));
    setEndDate(moment(item.selection?.endDate).format('YYYY-MM-DD'));
  };

  const handleReset = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (startDate) {
      dispatch(
        affiliateManageList({
          query: `page=${currentPage}&limit=${count}&startDate=${startDate}&endDate=${endDate}`,
          data: filteredData,
        }),
      );
    }
  }, [startDate, endDate, filteredData]);

  const handleSend = (e, item) => {
    console.log('item', e);
    setWalletAddress(item);
    setEvent('send');
  };

  // const handleView = () => {
  //   history.push({
  //     pathname: '/affiliate-management/affiliate-user',
  //   });
  // };

  const handleView = id => {
    history.push({
      pathname: `/affiliate-management/affiliate-user/${id}`,
      state: id,
    });
  };

  const handleAccept = id => {
    setSelectedTransaction(id);
    setEvent('accept');
  };

  const handleReject = id => {
    setSelectedTransaction(id);
    setEvent('reject');
  };

  const handleApproveAgent = () => {
    dispatch(approveAffiliate({ id: selectedTransaction, status: 'Approved' }));
    setEvent(false);
  };

  const handleRejectAgent = reason => {
    dispatch(approveAffiliate({ id: selectedTransaction, status: 'Rejected', reason }));
  };

  useEffect(() => {
    dispatch(affiliateManageList({ query: `page=${currentPage}&limit=${count}` }));
  }, []);

  useEffect(() => {
    dispatch(affiliateManageList({ query: `page=${currentPage}&limit=${count}` }));
  }, [isAffiliateApprove]);

  const action = (id, item, status) => (
    <ActionCell
      view={handleView}
      send={handleSend}
      accept={handleAccept}
      reject={handleReject}
      id={id}
      item={item}
      status={status}
    />
  );

  /* Pagination Config */
  const onPageChange = page => {
    setCurrentPage(page);
    dispatch(
      affiliateManageList({ query: `page=${currentPage}&limit=${count}`, data: filteredData }),
    );
    // setFilter(prev => ({ ...prev, startIndex: (page*10)+1 }));
  };

  const updateCurrentCountPage = page => {
    setCount(page);
  };

  useEffect(() => {
    if (affiliateManagementList?.list) {
      affiliateManagementList?.list?.forEach(ele => {
        const obj = ele;
        obj.action = action(ele?._id, ele?.walletAddress?.saving, ele?.status);
      });
      const paginationConfigTemp = {
        currentPage,
        pageCount: affiliateManagementList?.totalPage,
        count,
        itemCount: affiliateManagementList?.totalItem,
        onPageChange,
        updateCurrentCountPage,
      };
      setPaginationConfig(paginationConfigTemp);
    }
  }, [affiliateManagementList?.list]);

  return (
    <div className="page-content">
      <div className="d-flex align-items-center justify-content-between">
        <Breadcrumb name="Affiliate Management" />
      </div>
      <RenderIf>
        <LogoLoader />
      </RenderIf>
      <Row>
        <UserWidget reports={topCardData?.affiliateManagement} loading={isCardLoading} />
      </Row>
      <hr />
      <Row>
        <AvForm onValidSubmit={submit}>
          <Row className="row mb-4">
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-firstname-Input" className="col-form-Label">
                Agent Name
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
              <Label for="horizontal-email-Input" className="col-form-Label">
                Total Withdrawls
              </Label>
              <AvField
                name="totalWithdrawal"
                className="form-control"
                placeholder="Total Withdrawls"
                type="text"

                // onChange={e => (adminObj.email = e?.target?.value)}
              />
            </Col>
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-firstname-Input" className="col-form-Label">
                KYC Status
              </Label>
              <AvField
                type="select"
                className="form-control"
                id="horizontal-firstname-Input"
                name="kycStatus"
                placeholder="KYC Status"
              >
                <option className="d-none" disabled value="">
                  Select
                </option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </AvField>
            </Col>
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-email-Input" className="col-form-Label">
                Agent ID
              </Label>
              <AvField
                name="userId"
                // value={adminObj?.email}
                className="form-control"
                placeholder="User ID "
                // disabled={isOpen === 'edit' || isOpen === 'view'}
                type="text"

                // onChange={e => (adminObj.email = e?.target?.value)}
              />
              {/* <Label for="horizontal-firstname-Input" className="col-form-Label">
                Country
              </Label>
              <AvField
                type="text"
                className="form-control"
                id="horizontal-firstname-Input"
                name="countryCode"
                // value={adminObj?.name}

                // onChange={e => (adminObj.name = e?.target?.value)}
                placeholder="Country"
              /> */}
            </Col>
          </Row>
          <Row className="row mb-4">
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-firstname-Input" className="col-form-Label">
                Agent Status
              </Label>
              <AvField
                type="select"
                className="form-control"
                id="horizontal-firstname-Input"
                name="status"
                placeholder="User Status"
              >
                <option className="d-none" disabled value="">
                  Select
                </option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </AvField>
            </Col>
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-email-Input" className="col-form-Label">
                Email
              </Label>
              <AvField
                name="email"
                className="form-control"
                placeholder="Enter email"
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

                // onChange={e => (adminObj.email = e?.target?.value)}
              />
            </Col>
            <Col sm={12} lg={3} md={4}>
              {/* <Label for="horizontal-email-Input" className="col-form-Label">
                Agent ID
              </Label>
              <AvField
                name="userId"
                // value={adminObj?.email}
                className="form-control"
                placeholder="User ID "
                // disabled={isOpen === 'edit' || isOpen === 'view'}
                type="text"

                // onChange={e => (adminObj.email = e?.target?.value)}
              /> */}
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
                      // editableDateInputs
                      // onChange={item => setState([item.selection])}
                      onChange={handleDateChange}
                      moveRangeOnFirstSelection={false}
                      ranges={state}
                      maxDate={new Date()}
                    />
                  )}
                </span>
              </div>
              <div>
                <a className="cursor-pointer fw-bold" onClick={handleReset}>
                  Reset
                </a>
              </div>
            </div>
            <DatatableTables
              column={affiliateColumn}
              isSend
              isView
              row={isLoading ? 'loading' : affiliateManagementList?.list}
              paginationConfig={paginationConfig}
              hidePaging
            />
          </div>
        </Container>
        <RenderIf render={event === 'send'}>
          <SendGifts
            isOpen={event}
            close={() => setEvent(false)}
            disable={event === 'view' || event === 'edit'}
            // onSubmit={onUpdate}
            walletAddress={walletAddress}
            title="Funds"
          />
        </RenderIf>
        <RenderIf render={event === 'edit' || event === 'view' || event === 'create'}>
          <EditUsers
            isOpen={event === 'remove' ? '' : event}
            close={() => setEvent(false)}
            disable={event === 'view' || event === 'edit'}
            // onSubmit={onUpdate}
            // adminDetails={selectedAdmin}
          />
        </RenderIf>
        <RenderIf render={event === 'accept'}>
          <ApproveTransaction
            isOpen
            close={() => setEvent(false)}
            headerTitle="Approve Agent"
            text="Do You really want to Approve this Agent ?"
            onConfirm={handleApproveAgent}
          />
        </RenderIf>
        <RenderIf render={event === 'reject'}>
          <RejectTransaction
            isOpen
            close={() => setEvent(false)}
            id={selectedTransaction}
            title="Agent"
            handleReject={handleRejectAgent}
          />
        </RenderIf>
      </RenderIf>
    </div>
  );
};

export default AffiliateManagement;
