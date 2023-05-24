import {
  DASHBOARD_COUNT_DATA_SUCCESS,
  DASHBOARD_COUNT_DATA_FAIL,
  DASHBOARD_COUNT_DATA_SAGA,
  DASHBOARD_COUNT_DATA_START,
  DASHBOARD_PROFIT_DATA_START,
  DASHBOARD_PROFIT_DATA_FAIL,
  DASHBOARD_PROFIT_DATA_SUCCESS,
  DASHBOARD_PROFIT_DATA_SAGA,
  DASHBOARD_LOAN_DATA_START,
  DASHBOARD_LOAN_DATA_FAIL,
  DASHBOARD_LOAN_DATA_SUCCESS,
  DASHBOARD_LOAN_DATA_SAGA,
  DASHBOARD_SWAP_DATA_START,
  DASHBOARD_SWAP_DATA_FAIL,
  DASHBOARD_SWAP_DATA_SUCCESS,
  DASHBOARD_SWAP_DATA_SAGA,
  DASHBOARD_EARN_DATA_START,
  DASHBOARD_EARN_DATA_FAIL,
  DASHBOARD_EARN_DATA_SUCCESS,
  DASHBOARD_EARN_DATA_SAGA,
  DASHBOARD_COLLATERAL_DATA_START,
  DASHBOARD_COLLATERAL_DATA_FAIL,
  DASHBOARD_COLLATERAL_DATA_SUCCESS,
  DASHBOARD_COLLATERAL_DATA_SAGA,
  DASHBOARD_BALANCE_DATA_START,
  DASHBOARD_BALANCE_DATA_FAIL,
  DASHBOARD_BALANCE_DATA_SUCCESS,
  DASHBOARD_BALANCE_DATA_SAGA,
  DASHBOARD_GLOBAL_DATA_START,
  DASHBOARD_GLOBAL_DATA_FAIL,
  DASHBOARD_GLOBAL_DATA_SUCCESS,
  DASHBOARD_GLOBAL_DATA_SAGA,
} from 'store/actionLabels';

// Count
export const getCountDataStart = () => ({
  type: DASHBOARD_COUNT_DATA_START,
});

export const getCountDataSaga = payload => ({
  type: DASHBOARD_COUNT_DATA_SAGA,
  payload,
});

export const getCountDataSuccess = payload => ({
  type: DASHBOARD_COUNT_DATA_SUCCESS,
  payload,
});

export const getCountDataFail = payload => ({
  type: DASHBOARD_COUNT_DATA_FAIL,
  payload,
});

// Profit

export const getProfitDataStart = () => ({
  type: DASHBOARD_PROFIT_DATA_START,
});

export const getProfitDataSaga = payload => ({
  type: DASHBOARD_PROFIT_DATA_SAGA,
  payload,
});

export const getProfitDataSuccess = payload => ({
  type: DASHBOARD_PROFIT_DATA_SUCCESS,
  payload,
});

export const getProfitDataFail = payload => ({
  type: DASHBOARD_PROFIT_DATA_FAIL,
  payload,
});

// Loan overview

export const getLoanDataStart = () => ({
  type: DASHBOARD_LOAN_DATA_START,
});

export const getLoanDataSaga = payload => ({
  type: DASHBOARD_LOAN_DATA_SAGA,
  payload,
});

export const getLoanDataSuccess = payload => ({
  type: DASHBOARD_LOAN_DATA_SUCCESS,
  payload,
});

export const getLoanDataFail = payload => ({
  type: DASHBOARD_LOAN_DATA_FAIL,
  payload,
});

// Swap overview

export const getSwapDataStart = () => ({
  type: DASHBOARD_SWAP_DATA_START,
});

export const getSwapDataSaga = payload => ({
  type: DASHBOARD_SWAP_DATA_SAGA,
  payload,
});

export const getSwapDataSuccess = payload => ({
  type: DASHBOARD_SWAP_DATA_SUCCESS,
  payload,
});

export const getSwapDataFail = payload => ({
  type: DASHBOARD_SWAP_DATA_FAIL,
  payload,
});

// Earn overview

export const getEarnDataStart = () => ({
  type: DASHBOARD_EARN_DATA_START,
});

export const getEarnDataSaga = payload => ({
  type: DASHBOARD_EARN_DATA_SAGA,
  payload,
});

export const getEarnDataSuccess = payload => ({
  type: DASHBOARD_EARN_DATA_SUCCESS,
  payload,
});

export const getEarnDataFail = payload => ({
  type: DASHBOARD_EARN_DATA_FAIL,
  payload,
});

// Collateral chart

export const getCollateralDataStart = () => ({
  type: DASHBOARD_COLLATERAL_DATA_START,
});

export const getCollateralDataSaga = payload => ({
  type: DASHBOARD_COLLATERAL_DATA_SAGA,
  payload,
});

export const getCollateralDataSuccess = payload => ({
  type: DASHBOARD_COLLATERAL_DATA_SUCCESS,
  payload,
});

export const getCollateralDataFail = payload => ({
  type: DASHBOARD_COLLATERAL_DATA_FAIL,
  payload,
});

// Balance chart

export const getBalanceDataStart = () => ({
  type: DASHBOARD_BALANCE_DATA_START,
});

export const getBalanceDataSaga = payload => ({
  type: DASHBOARD_BALANCE_DATA_SAGA,
  payload,
});

export const getBalanceDataSuccess = payload => ({
  type: DASHBOARD_BALANCE_DATA_SUCCESS,
  payload,
});

export const getBalanceDataFail = payload => ({
  type: DASHBOARD_BALANCE_DATA_FAIL,
  payload,
});

// Global data

export const getGlobalDataStart = () => ({
  type: DASHBOARD_GLOBAL_DATA_START,
});

export const getGlobalDataSaga = payload => ({
  type: DASHBOARD_GLOBAL_DATA_SAGA,
  payload,
});

export const getGlobalDataSuccess = payload => ({
  type: DASHBOARD_GLOBAL_DATA_SUCCESS,
  payload,
});

export const getGlobalDataFail = payload => ({
  type: DASHBOARD_GLOBAL_DATA_FAIL,
  payload,
});
