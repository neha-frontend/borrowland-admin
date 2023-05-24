/* eslint-disable prefer-template */
/* eslint-disable arrow-body-style */
/* eslint-disable no-empty */
import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  // DropdownMenu,
  // DropdownItem,
  // DropdownToggle,
  // ButtonDropdown,
} from 'reactstrap';

import Breadcrumb from 'components/UI/Common/Breadcrumb';

// import BarChart from 'components/chart/BarChart';
import PieChart from 'components/chart/PieChart';
import MiniWidget from 'components/MiniWidget';
import ProfiteWidget from 'components/ProfiteWidget';
import { DOLLAR_ICON } from 'assets/images';
import OverViewTable from 'components/OverViewTable';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCountDataSaga,
  getProfitDataSaga,
  getLoanDataSaga,
  getSwapDataSaga,
  getEarnDataSaga,
  getCollateralDataSaga,
  getBalanceDataSaga,
  getGlobalDataSaga,
} from 'store/actions';

import './dashboard.css';
import { DateRange } from 'react-date-range';
import moment from 'moment';
import { useOutsideAlerter } from 'utils/useOutsideAlearter';
// import setupanalytics from "../../assets/images/setup-analytics-amico.svg";

const series1 = [
  {
    data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54],
  },
];

const options1 = {
  fill: {
    colors: ['#5b73e8'],
  },
  chart: {
    width: 70,
    sparkline: {
      enabled: !0,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
    },
  },
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  xaxis: {
    crosshairs: {
      width: 1,
    },
  },
  tooltip: {
    fixed: {
      enabled: !1,
    },
    x: {
      show: !1,
    },
    y: {
      title: {
        // formatter: function (seriesName) {
        //   return '';
        // }
      },
    },
    marker: {
      show: !1,
    },
  },
};

const series2 = [70];

const options2 = {
  fill: {
    colors: ['#34c38f'],
  },
  chart: {
    sparkline: {
      enabled: !0,
    },
  },
  dataLabels: {
    enabled: !1,
  },
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: '60%',
      },
      track: {
        margin: 0,
      },
      dataLabels: {
        show: !1,
      },
    },
  },
};

const series4 = [
  {
    data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
  },
];

const options4 = {
  fill: {
    colors: ['#f1b44c'],
  },
  chart: {
    width: 70,
    sparkline: {
      enabled: !0,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
    },
  },
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  xaxis: {
    crosshairs: {
      width: 1,
    },
  },
  tooltip: {
    fixed: {
      enabled: !1,
    },
    x: {
      show: !1,
    },
    y: {
      title: {
        // formatter: function (seriesName) {
        //   return '';
        // }
      },
    },
    marker: {
      show: !1,
    },
  },
};

const Dashboard = () => {
  const dateInput = useRef(null);
  const dispatch = useDispatch();
  const {
    countData,
    profitData,
    loanData,
    swapData,
    earnData,
    collateralData,
    balanceData,
    globalData,
    isLoading,
  } = useSelector(state => state.dashboard);
  const [isActive, setIsActive] = useState('');
  const [allTime, setAllTime] = useState('all_time');

  // Local State
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
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

  const handleDateChange = item => {
    setState([item.selection]);
    setStartDate(moment(item.selection?.startDate).format('YYYY-MM-DD'));
    setEndDate(moment(item.selection?.endDate).format('YYYY-MM-DD'));
  };

  const handleCollateralChange = (name, value) => {
    setAllTime(name);
    if (value) {
      dispatch(getCollateralDataSaga(`?last30days=${value}`));
    } else {
      dispatch(getCollateralDataSaga(''));
    }
  };
  const handleReset = () => {
    setIsActive('');
    dispatch(getCountDataSaga(''));
    setIsOpenRange(false);
    // window.location.reload();
  };
  // const convertToIntCurrency = labelValue => {
  //   console.log(labelValue, 'labelValue');
  //   // Nine Zeroes for Billions
  //   return Math.abs(Number(labelValue)) >= 1.0e9
  //     ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'B'
  //     : // Six Zeroes for Millions
  //     Math.abs(Number(labelValue)) >= 1.0e6
  //     ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'M'
  //     : // Three Zeroes for Thousands
  //     Math.abs(Number(labelValue)) >= 1.0e3
  //     ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'k'
  //     : Math.abs(Number(labelValue));
  // };
  const reports = [
    {
      id: 1,
      // icon: 'mdi mdi-arrow-up-bold',
      title: 'Total Deposits',
      value: +countData?.totalDepositAmount,
      prefix: '$',
      suffix: '',
      decimal: 6,
      charttype: 'radialBar',
      chartheight: 40,
      chartwidth: 70,

      series: series2,
      options: options2,
    },
    {
      id: 2,
      // icon: 'mdi mdi-arrow-down-bold',
      title: 'Total Withdraw',
      value: +countData?.totalWithdrawAmount,
      decimal: 6,
      charttype: 'radialBar',
      chartheight: 45,
      chartwidth: 45,
      prefix: '$',
      suffix: '',
      series: series2,
      options: options2,
    },
    {
      id: 3,
      // icon: 'mdi mdi-arrow-down-bold',
      title: 'Total Profit',
      value: +countData?.totalProfit,
      decimal: 0,
      prefix: '$',
      suffix: '',
      charttype: 'radialBar',
      chartheight: 45,
      chartwidth: 45,
      series: series2,
      options: options2,
    },
    {
      id: 4,
      // icon: 'mdi mdi-arrow-up-bold',
      title: 'Players Logged In',
      value: +countData?.playersLoggedIn,
      decimal: 2,
      prefix: '',
      suffix: '',
      charttype: 'radialBar',
      chartheight: 40,
      chartwidth: 70,
      series: series2,
      options: options2,
    },
    {
      id: 5,
      // icon: 'mdi mdi-arrow-up-bold',
      title: 'Players Registered',
      value: +countData?.playersRegistered,
      decimal: 2,
      prefix: '',
      suffix: '',
      charttype: 'bar',
      chartheight: 40,
      chartwidth: 70,
      series: series1,
      options: options1,
    },
    {
      id: 6,
      // icon: 'mdi mdi-arrow-up-bold',
      title: 'Players Balance',
      value: +countData?.playersBalance,
      decimal: 4,
      prefix: '$',
      suffix: '',
      charttype: 'bar',
      chartheight: 40,
      chartwidth: 70,
      series: series1,
      options: options1,
    },
    {
      id: 7,
      // icon: 'mdi mdi-arrow-up-bold',
      title: 'Total Interest Paid',
      value: +countData?.totalInterestPaid,
      decimal: 4,
      prefix: '$',
      suffix: '',
      charttype: 'bar',
      chartheight: 40,
      chartwidth: 70,
      series: series1,
      options: options1,
    },
    {
      id: 8,
      // icon: 'mdi mdi-arrow-up-bold',
      title: 'Total Loan Amount',
      value: +countData?.totalLoanAmount,
      decimal: 2,
      prefix: '$',
      suffix: '',
      charttype: 'bar',
      chartheight: 40,
      chartwidth: 70,
      series: series1,
      options: options1,
    },
    {
      id: 9,
      // icon: 'mdi mdi-arrow-up-bold',
      title: 'Total Number Of Swap',
      value: +countData?.totalNumberOfSwap,
      decimal: 2,
      prefix: '',
      suffix: '',
      charttype: 'bar',
      chartheight: 40,
      chartwidth: 70,
      series: series4,
      options: options4,
    },
    {
      id: 10,
      // icon: 'mdi mdi-arrow-up-bold',
      title: 'Total Amount Of Swap',
      value: +countData?.totalSwapAmount,
      decimal: 4,
      prefix: '$',
      suffix: '',
      charttype: 'bar',
      chartheight: 40,
      chartwidth: 70,
      series: series4,
      options: options4,
    },
    {
      id: 11,
      // icon: 'mdi mdi-arrow-up-bold',
      title: 'Correction Up',
      value: +countData?.correctionUp,
      decimal: 2,
      prefix: '$',
      suffix: '',
      charttype: 'bar',
      chartheight: 40,
      chartwidth: 70,
      series: series4,
      options: options4,
    },
    // {
    //   id: 12,
    //   // icon: 'mdi mdi-arrow-up-bold',
    //   title: 'Correction Down',
    //   value: +countData?.correctionUp,
    //   decimal: 2,
    //   prefix: '+',
    //   suffix: '%',
    //   charttype: 'bar',
    //   chartheight: 40,
    //   chartwidth: 70,
    //   series: series4,
    //   options: options4,
    // },
  ];

  const profite = [
    {
      id: 1,
      coin: 'BTC',
      price: profitData?.BTC_Profit || 0,
      icon: DOLLAR_ICON,
    },
    {
      id: 2,
      coin: 'ETH',
      price: profitData?.ETH_Profit || 0,
      icon: DOLLAR_ICON,
    },
    {
      id: 3,
      coin: 'USDC',
      price: profitData?.USDC_Profit || 0,
      icon: DOLLAR_ICON,
    },
    {
      id: 4,
      coin: 'USDT',
      price: profitData?.USDT_Profit || 0,
      icon: DOLLAR_ICON,
    },
    {
      id: 5,
      coin: 'Loan Repayment',
      price: profitData?.Loan_Repayment_Profit || 0,
      icon: DOLLAR_ICON,
    },
  ];

  const LoanOverViewTableData = [
    {
      id: 1,
      currency: 'BTC',
      firstMonth: (loanData?.OneMonth && loanData?.OneMonth[0]?.amount) || 0,
      thirdMonth: (loanData?.ThreeMonth && loanData?.ThreeMonth[0]?.amount) || 0,
      sixthMonth: (loanData?.SixMonth && loanData?.SixMonth[0]?.amount) || 0,
    },
    {
      id: 2,
      currency: 'USDC',
      firstMonth: (loanData?.OneMonth && loanData?.OneMonth[2]?.amount) || 0,
      thirdMonth: (loanData?.ThreeMonth && loanData?.ThreeMonth[2]?.amount) || 0,
      sixthMonth: (loanData?.SixMonth && loanData?.SixMonth[2]?.amount) || 0,
    },
    {
      id: 3,
      currency: 'USDT',
      firstMonth: (loanData?.OneMonth && loanData?.OneMonth[3]?.amount) || 0,
      thirdMonth: (loanData?.ThreeMonth && loanData?.ThreeMonth[3]?.amount) || 0,
      sixthMonth: (loanData?.SixMonth && loanData?.SixMonth[3]?.amount) || 0,
    },
    {
      id: 4,
      currency: 'ETH',
      firstMonth: (loanData?.OneMonth && loanData?.OneMonth[1]?.amount) || 0,
      thirdMonth: (loanData?.ThreeMonth && loanData?.ThreeMonth[1]?.amount) || 0,
      sixthMonth: (loanData?.SixMonth && loanData?.SixMonth[1]?.amount) || 0,
    },
  ];

  const EarnOverViewTableData = [
    {
      id: 1,
      currency: 'BTC',
      firstMonth: (earnData?.OneMonth && earnData?.OneMonth[0]?.amount) || 0,
      thirdMonth: (earnData?.ThreeMonth && earnData?.ThreeMonth[0]?.amount) || 0,
      sixthMonth: (earnData?.SixMonth && earnData?.SixMonth[0]?.amount) || 0,
    },
    {
      id: 2,
      currency: 'USDC',
      firstMonth: (earnData?.OneMonth && earnData?.OneMonth[2]?.amount) || 0,
      thirdMonth: (earnData?.ThreeMonth && earnData?.ThreeMonth[2]?.amount) || 0,
      sixthMonth: (earnData?.SixMonth && earnData?.SixMonth[2]?.amount) || 0,
    },
    {
      id: 3,
      currency: 'USDT',
      firstMonth: (earnData?.OneMonth && earnData?.OneMonth[3]?.amount) || 0,
      thirdMonth: (earnData?.ThreeMonth && earnData?.ThreeMonth[3]?.amount) || 0,
      sixthMonth: (earnData?.SixMonth && earnData?.SixMonth[3]?.amount) || 0,
    },
    {
      id: 4,
      currency: 'ETH',
      firstMonth: (earnData?.OneMonth && earnData?.OneMonth[1]?.amount) || 0,
      thirdMonth: (earnData?.ThreeMonth && earnData?.ThreeMonth[1]?.amount) || 0,
      sixthMonth: (earnData?.SixMonth && earnData?.SixMonth[1]?.amount) || 0,
    },
  ];

  const SwapOverViewTableData = [
    {
      id: 1,
      currency: 'BTC',
      firstMonth: (swapData?.OneMonth && swapData?.OneMonth[0]?.amount) || 0,
      thirdMonth: (swapData?.ThreeMonth && swapData?.ThreeMonth[0]?.amount) || 0,
      sixthMonth: (swapData?.SixMonth && swapData?.SixMonth[0]?.amount) || 0,
    },
    {
      id: 2,
      currency: 'USDC',
      firstMonth: (swapData?.OneMonth && swapData?.OneMonth[2]?.amount) || 0,
      thirdMonth: (swapData?.ThreeMonth && swapData?.ThreeMonth[2]?.amount) || 0,
      sixthMonth: (swapData?.SixMonth && swapData?.SixMonth[2]?.amount) || 0,
    },
    {
      id: 3,
      currency: 'USDT',
      firstMonth: (swapData?.OneMonth && swapData?.OneMonth[3]?.amount) || 0,
      thirdMonth: (swapData?.ThreeMonth && swapData?.ThreeMonth[3]?.amount) || 0,
      sixthMonth: (swapData?.SixMonth && swapData?.SixMonth[3]?.amount) || 0,
    },
    {
      id: 4,
      currency: 'ETH',
      firstMonth: (swapData?.OneMonth && swapData?.OneMonth[1]?.amount) || 0,
      thirdMonth: (swapData?.ThreeMonth && swapData?.ThreeMonth[1]?.amount) || 0,
      sixthMonth: (swapData?.SixMonth && swapData?.SixMonth[1]?.amount) || 0,
    },
  ];

  const BalanceData = {
    labels: balanceData?.label,
    datasets: [
      {
        data: balanceData?.value,
        backgroundColor: ['#e1131d', '#134ee1', '#6fe113', '#eee609'],
        hoverBackgroundColor: ['#e1131d', '#134ee1', '#6fe113', '#eee609'],
        hoverBorderColor: '#fff',
      },
    ],
  };

  const CollatoralData = {
    labels: collateralData?.label,
    datasets: [
      {
        data: collateralData?.value,
        backgroundColor: ['#e1131d', '#134ee1'],
        hoverBackgroundColor: ['#e1131d', '#134ee1'],
        hoverBorderColor: '#fff',
      },
    ],
  };

  const userDetails = [
    {
      id: 1,
      icon: `${
        globalData?.userOnboardedData?.percentage > 0 ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold'
      } mdi`,
      title: 'New user onboard',
      value: +globalData?.userOnboardedData?.data,
      prefix: '',
      suffix: '',
      badgeValue: `${globalData?.userOnboardedData?.percentage || 0} %`,
      decimal: 0,
      charttype: 'bar',
      chartheight: 40,
      chartwidth: 70,
      color: globalData?.userOnboardedData?.percentage > 0 ? 'success' : 'danger',
      desc: 'since last month',
      series: series1,
      options: options1,
    },
    {
      id: 2,
      icon: `${
        globalData?.websiteTraffic?.percentage > 0 ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold'
      } mdi`,
      title: 'Website traffic',
      value: +globalData?.websiteTraffic?.data,
      prefix: '',
      suffix: '',
      badgeValue: `${globalData?.websiteTraffic?.percentage || 0} %`,
      decimal: 0,
      charttype: 'bar',
      chartheight: 40,
      chartwidth: 70,
      color: globalData?.websiteTraffic?.percentage > 0 ? 'success' : 'danger',
      desc: 'since last month',
      series: series1,
      options: options1,
    },
    {
      id: 3,
      icon: `${
        globalData?.activeUsersData?.percentage > 0 ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold'
      } mdi`,
      title: 'Active user',
      value: +globalData?.activeUsersData?.data,
      prefix: '',
      suffix: '',
      badgeValue: `${globalData?.activeUsersData?.percentage || 0} %`,
      decimal: 0,
      charttype: 'bar',
      chartheight: 40,
      chartwidth: 70,
      color: globalData?.activeUsersData?.percentage > 0 ? 'success' : 'danger',
      desc: 'since last month',
      series: series1,
      options: options1,
    },
    {
      id: 4,
      icon: `${
        globalData?.cancelledFixedTermData?.percentage > 0
          ? 'mdi-arrow-up-bold'
          : 'mdi-arrow-down-bold'
      } mdi`,
      title: 'Cancelled Fixed Term',
      value: +globalData?.cancelledFixedTermData?.data,
      prefix: '$',
      suffix: '',
      badgeValue: `${globalData?.cancelledFixedTermData?.percentage || 0} %`,
      decimal: 0,
      charttype: 'bar',
      chartheight: 40,
      chartwidth: 70,
      color: globalData?.cancelledFixedTermData?.percentage > 0 ? 'success' : 'danger',
      desc: 'since last month',
      series: series1,
      options: options1,
    },
  ];

  useEffect(() => {
    dispatch(getCountDataSaga(''));
    dispatch(getProfitDataSaga());
    dispatch(getLoanDataSaga());
    dispatch(getSwapDataSaga());
    dispatch(getEarnDataSaga());
    dispatch(getCollateralDataSaga(''));
    dispatch(getBalanceDataSaga());
    dispatch(getGlobalDataSaga());
  }, []);

  useEffect(() => {
    if (startDate || endDate) {
      dispatch(getCountDataSaga(`?startDate=${startDate}&endDate=${endDate}`));
    }
  }, [startDate, endDate]);

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <div className="d-flex justify-content-between">
            <Breadcrumb name="Dashboard" />
          </div>
          <Row className="mb-3 ">
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
          </Row>
          <Row>
            {' '}
            <MiniWidget reports={reports} isLoading={isLoading?.count} />
          </Row>
          <Row>
            <h4 className="mb-3 ">Profit</h4>
          </Row>
          <Row>
            <ProfiteWidget profite={profite} />
          </Row>
          <Row>
            <h4 className="mb-3 ">Overview</h4>
          </Row>
          <Row>
            <Col xl={4}>
              <h6 className="mb-3 ">Loans</h6>
              <OverViewTable OverViewTableData={LoanOverViewTableData} />
            </Col>
            <Col xl={4}>
              <h6 className="mb-3 ">Earning</h6>
              <OverViewTable OverViewTableData={EarnOverViewTableData} />
            </Col>
            <Col xl={4}>
              <h6 className="mb-3 ">Swaps</h6>
              <OverViewTable OverViewTableData={SwapOverViewTableData} />
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Balance Sheet</CardTitle>
                  {/* <BarChart /> */}
                  {isLoading?.balance ? (
                    <div className="skeleton" style={{ height: 324, width: 512 }} />
                  ) : (
                    <PieChart data={BalanceData} />
                  )}
                </CardBody>
              </Card>
            </Col>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4 d-flex justify-content-between">
                    Total collateral
                    <div className="d-flex">
                      <div
                        className={`btn-chart-filter ${
                          allTime === 'all_time' ? 'btn-chart-active' : ''
                        }`}
                        onClick={() => handleCollateralChange('all_time', false)}
                      >
                        All Time
                      </div>
                      <div
                        className={`btn-chart-filter ${
                          allTime === 'last_30_days' ? 'btn-chart-active' : ''
                        }`}
                        onClick={() => handleCollateralChange('last_30_days', true)}
                      >
                        Last 30days
                      </div>
                    </div>
                  </CardTitle>
                  {isLoading?.collateral ? (
                    <div className="skeleton" style={{ height: 324, width: 512 }} />
                  ) : (
                    <PieChart data={CollatoralData} />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            {' '}
            <MiniWidget reports={userDetails} isLoading={isLoading?.global} />
          </Row>
          {/* <LatestTransaction /> */}
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
