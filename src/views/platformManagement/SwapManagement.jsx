// import { useHistory } from 'react-router-dom';
import { Button, Col, Container, FormGroup, Label, Row } from 'reactstrap';
import { useEffect, useRef, useState } from 'react';
import { AvField, AvForm } from 'availity-reactstrap-validation';

import RenderIf from 'components/RenderIf';
import LogoLoader from 'components/UI/Spinner/LogoSpinner';
import Breadcrumb from 'components/BreadCrumb';
import DatatableTables from 'components/Table/Table';
import { swapManagementColumn } from 'constants/tableColumn';

import '../viewcommon.css';
import { platformManageSwapList } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import UserWidget from 'components/UserWidget';
import { DateRange } from 'react-date-range';
import moment from 'moment';
import { useOutsideAlerter } from 'utils/useOutsideAlearter';

const SwapManagement = () => {
  const dispatch = useDispatch();
  const dateInput = useRef(null);

  const { isLoading, platformManagementSwapList } = useSelector(state => state.platformManagement);
  const [isActive, setIsActive] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(10);
  const [paginationConfig, setPaginationConfig] = useState({});
  const { topCardData, isCardLoading } = useSelector(state => state.admins);
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
    console.info('VALUES', e);

    // eslint-disable-next-line no-shadow, no-unused-vars
    const temp = Object.fromEntries(Object.entries(values).filter(([_, v]) => v !== ''));
    setFilteredData(temp);
    dispatch(platformManageSwapList({ query: `page=${currentPage}&limit=${count}`, data: temp }));
  };

  useEffect(() => {
    if (startDate) {
      dispatch(
        platformManageSwapList({
          query: `page=${currentPage}&limit=${count}&startDate=${startDate}&endDate=${endDate}`,
          data: filteredData,
        }),
      );
    }
  }, [startDate, endDate, filteredData]);
  /* Pagination Config */
  const onPageChange = page => {
    setCurrentPage(page);
    dispatch(platformManageSwapList({ query: `page=${page}&limit=${count}`, data: filteredData }));
  };
  const updateCurrentCountPage = page => {
    setCount(page);
  };

  useEffect(() => {
    if (platformManagementSwapList?.list) {
      platformManagementSwapList?.list?.forEach(ele => {
        const obj = ele;
        obj.createdAt = ele.createdAt ? new Date(ele.createdAt).toLocaleString() : '-';
        obj.amount = ele.amount || '-';
        obj.fee = ele?.fee ? `${+ele?.fee?.toFixed(6)}` : '-';
        // eslint-disable-next-line no-underscore-dangle
        obj.type = ele.token._type;
        obj.senderWalletAddress = ele?.userdata?.fullName || '-';
        obj.txnHash = ele?.txnHash
          ? `${ele.txnHash.slice(0, 6)} ...${ele.txnHash.slice(
              ele.txnHash.length - 4,
              ele.txnHash.length,
            )}`
          : '-';
        // eslint-disable-next-line no-underscore-dangle
        obj.from = ele.token._from || '-';
        // eslint-disable-next-line no-underscore-dangle
        obj.to = ele.token._to || '-';
      });
      const paginationConfigTemp = {
        currentPage,
        pageCount: platformManagementSwapList?.totalPage,
        count,
        itemCount: platformManagementSwapList?.totalItem,
        onPageChange,
        updateCurrentCountPage,
      };
      setPaginationConfig(paginationConfigTemp);
    }
  }, [platformManagementSwapList]);
  useEffect(() => {
    dispatch(platformManageSwapList({ query: `page=${currentPage}&limit=${count}` }));
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

  return (
    <div className="page-content">
      <div className="d-flex align-items-baseline justify-content-between">
        <div className="d-flex">
          <div>
            <Breadcrumb name="Swap Management" />
          </div>
        </div>
      </div>
      <RenderIf>
        <LogoLoader />
      </RenderIf>
      <Row>
        <UserWidget reports={topCardData?.swapManagement} loading={isCardLoading} />
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
                // value={adminObj?.name}
                // required
                // validate={{
                //   pattern: {
                //     value: /^([a-zA-Z ]{1,})$/i,
                //     errorMessage: 'Enter User Name',
                //   },
                // }}
                // onChange={e => (adminObj.name = e?.target?.value)}
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
            {/* <Col sm={12} lg={3} md={4}>
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
            </Col> */}
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
          </Row>
          <Row className="row mb-4">
            {/* <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-email-Input" className="col-form-Label">
                Total Balance
              </Label>
              <AvField
                name="totalBalance"
                className="form-control"
                placeholder="Total balance"
                type="text"
                validate={{
                  pattern: {
                    value: /^[0-9]+$/,
                    errorMessage: 'Balance must be a number',
                  },
                }}
              />
            </Col> */}

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
                type="text"

                // onChange={e => (adminObj.email = e?.target?.value)}
              />
            </Col>
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-email-Input" className="col-form-Label">
                User ID
              </Label>
              <AvField
                name="userId"
                // value={adminObj?.email}
                className="form-control"
                placeholder="User ID "
                // disabled={isOpen === 'edit' || isOpen === 'view'}
                type="text"
                validate={{
                  pattern: {
                    value: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/,
                    errorMessage: 'User Id is not in correct format.',
                  },
                }}
                // onChange={e => (adminObj.email = e?.target?.value)}
              />
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
              column={swapManagementColumn}
              //   handleClick={handleClick}
              //   isSend
              //   isEdit
              //   isView
              //   isBlock
              row={isLoading ? 'loading' : platformManagementSwapList?.list}
              hidePaging
              paginationConfig={paginationConfig}
              // action={action}
            />
          </div>
        </Container>
      </RenderIf>
    </div>
  );
};

export default SwapManagement;
