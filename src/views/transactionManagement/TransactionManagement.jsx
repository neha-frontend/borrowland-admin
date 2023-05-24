/* eslint-disable prefer-template */
// import { useHistory } from 'react-router-dom';
import { Button, Col, Container, FormGroup, Label, Row } from 'reactstrap';
import { useEffect, useRef, useState } from 'react';
import { AvField, AvForm } from 'availity-reactstrap-validation';

import RenderIf from 'components/RenderIf';
import LogoLoader from 'components/UI/Spinner/LogoSpinner';
import Breadcrumb from 'components/BreadCrumb';
import DatatableTables from 'components/Table/Table';
import { transactionManagementColumn } from 'constants/tableColumn';
import { transactionManageList } from 'store/actions';

import '../viewcommon.css';
import { useDispatch, useSelector } from 'react-redux';
import UserWidget from 'components/UserWidget';
import { DateRange } from 'react-date-range';
import moment from 'moment';
import { useOutsideAlerter } from 'utils/useOutsideAlearter';

const TransactionManagement = () => {
  const dispatch = useDispatch();
  const dateInput = useRef(null);

  const { isLoading, transactionManagementList } = useSelector(
    state => state.transactionManagement,
  );
  const { topCardData, isCardLoading } = useSelector(state => state.admins);

  const [isActive, setIsActive] = useState('');
  const [sortConfig, setSortConfig] = useState({ sortBy: '', sortValue: '' });
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [event, setEvent] = useState(false);
  const [count, setCount] = useState(10);
  const [paginationConfig, setPaginationConfig] = useState({});
  // eslint-disable-next-line no-unused-vars
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
    dispatch(transactionManageList({ query: `page=${currentPage}&limit=${count}`, data: temp }));
  };

  useEffect(() => {
    if (startDate) {
      dispatch(
        transactionManageList({
          query: `page=${currentPage}&limit=${count}&startDate=${startDate}&endDate=${endDate}`,
          data: filteredData,
        }),
      );
    }
  }, [startDate, endDate, filteredData]);

  /* Pagination Config */
  const onPageChange = page => {
    setCurrentPage(page);
    let qr = `page=${page}&limit=${count}`;
    if (startDate) {
      qr = `page=${page}&limit=${count}&startDate=${startDate}&endDate=${endDate}`;
    }
    dispatch(
      transactionManageList({
        query: qr,
        data: filteredData,
      }),
    );
    // setFilter(prev => ({ ...prev, startIndex: (page*10)+1 }));
  };

  const updateCurrentCountPage = page => {
    setCount(page);
  };

  useEffect(() => {
    if (transactionManagementList?.list) {
      transactionManagementList?.list?.forEach(ele => {
        const obj = ele;
        obj.id = ele?.createdAt ? new Date(ele.createdAt).toLocaleString() : '-';
        obj.amount = +ele?.amount.toFixed(6) || '-';
        obj.name = ele?.sender?.walletAddress
          ? ele?.sender?.walletAddress?.slice(0, 6) +
            '...' +
            ele?.sender?.walletAddress?.slice(
              ele?.sender?.walletAddress?.length - 4,
              ele?.sender?.walletAddress,
            )
          : '-';
        obj.to = ele?.receiver?.walletAddress
          ? ele?.receiver?.walletAddress?.slice(0, 6) +
            '...' +
            ele?.receiver?.walletAddress?.slice(
              ele?.receiver?.walletAddress?.length - 4,
              ele?.receiver?.walletAddress,
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
    dispatch(transactionManageList({ query: `page=${currentPage}&limit=${count}` }));
  }, []);
  const handleDateChange = item => {
    setState([item.selection]);
    setStartDate(moment(item.selection?.startDate).format('YYYY-MM-DD'));
    setEndDate(moment(item.selection?.endDate).format('YYYY-MM-DD'));
  };

  const handleReset = () => {
    // setIsActive('');
    // setStartDate('');
    // setEndDate('');
    window.location.reload();
  };
  useEffect(() => {
    console.log('sortValue', sortConfig);

    if (sortConfig.sortBy) {
      dispatch(
        transactionManageList({
          query: `page=${currentPage}&limit=${count}&sortBy=${sortConfig?.sortBy}&sortValue=${sortConfig?.sortValue}`,
        }),
      );
    }
  }, [sortConfig.sortBy, sortConfig.sortValue]);

  const handelSort = sortObj => {
    console.log('sortValue', sortObj);

    const temp = sortObj?.direction === 'asc' ? 1 : -1;
    if (sortObj?.column) {
      setSortConfig({ sortBy: sortObj?.column, sortValue: temp });
      // dispatch(
      //   transactionManageList({
      //     query: `page=${currentPage}&limit=${count}&sortBy=${sortObj?.column}&sortValue=${sortValue}`,
      //   }),
      // );
    }
  };
  return (
    <div className="page-content">
      <div className="d-flex align-items-baseline justify-content-between">
        <div className="d-flex">
          <div>
            <Breadcrumb name="Transaction Management" />
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
                Total Swap
              </Label>
              <AvField
                type="text"
                className="form-control"
                id="horizontal-firstname-Input"
                name="totalSwap"
                // value={adminObj?.name}

                // onChange={e => (adminObj.name = e?.target?.value)}
                placeholder="Total Swap"
                validate={{
                  pattern: {
                    value: /^[0-9]+$/,
                    errorMessage: 'Swap must be a number',
                  },
                }}
              />
            </Col>
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
              />
            </Col>
          </Row>
          <Row className="row mb-4">
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-email-Input" className="col-form-Label">
                Transaction Type
              </Label>
              <AvField
                name="txnType"
                className="form-control"
                placeholder="Transaction Type"
                type="select"
              >
                <option className="d-none" disabled value="">
                  Select
                </option>
                <option value="Fixed Term">Fixed Terms</option>
                <option value="Swap">Swap</option>
                <option value="Loan">Loan</option>
                <option value="Loan Repayment"> Loan Repayment</option>
                <option value="Collateral">Collateral</option>
                <option value="Deposit">Deposit</option>
                <option value="Interest">Interest</option>
                <option value="Gift">Gift</option>

                {/* <option value="Gift">Gift</option> */}
                <option value="Cancelled Fixed Term">Cancelled Fixed Term</option>
              </AvField>
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
                // required
                // errorMessage="Email is required"
                // validate={{
                //   required: { value: true },
                //   pattern: {
                //     value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                //     errorMessage: 'Enter valid email',
                //   },
                // }}
                // onChange={e => (adminObj.email = e?.target?.value)}
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
              <Label for="horizontal-email-Input" className="col-form-Label">
                Transaction Status
              </Label>
              <AvField
                name="status"
                // value={adminObj?.email}
                className="form-control"
                placeholder="Transaction Status"
                // disabled={isOpen === 'edit' || isOpen === 'view'}
                type="select"

                // onChange={e => (adminObj.email = e?.target?.value)}
              >
                <option className="d-none" disabled value="">
                  Select
                </option>
                <option value="Pending">Pending</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
                <option value="Rejected"> Rejected</option>
                <option value="requested">Requested</option>
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
              column={transactionManagementColumn}
              row={isLoading ? 'loading' : transactionManagementList?.list}
              hidePaging
              paginationConfig={paginationConfig}
              handelSort={handelSort}

              // action={action}
            />
          </div>
        </Container>
      </RenderIf>
    </div>
  );
};

export default TransactionManagement;
