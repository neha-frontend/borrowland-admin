import { put } from 'redux-saga/effects';
import {
  getCountDataFail,
  getCountDataSuccess,
  getCountDataStart,
  getProfitDataFail,
  getProfitDataSuccess,
  getProfitDataStart,
  getLoanDataFail,
  getLoanDataSuccess,
  getLoanDataStart,
  getSwapDataFail,
  getSwapDataSuccess,
  getSwapDataStart,
  getEarnDataFail,
  getEarnDataSuccess,
  getEarnDataStart,
  getCollateralDataFail,
  getCollateralDataSuccess,
  getCollateralDataStart,
  getBalanceDataFail,
  getBalanceDataSuccess,
  getBalanceDataStart,
  getGlobalDataFail,
  getGlobalDataSuccess,
  getGlobalDataStart,
} from 'store/actions';
import errorHandler from 'utils/apiHandler';

export function* getCountDataSaga({ payload }) {
  yield put(getCountDataStart());
  yield errorHandler({
    endpoint: `/dashboard/count-data${payload}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getCountDataSuccess({ data }));
    },
    failHandler: yield function* (response) {
      yield put(getCountDataFail(response));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}

export function* getProfitDataSaga() {
  yield put(getProfitDataStart());
  yield errorHandler({
    endpoint: `/dashboard/profit-data`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getProfitDataSuccess({ data }));
    },
    failHandler: yield function* (response) {
      yield put(getProfitDataFail(response));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}
export function* getLoanDataSaga() {
  yield put(getLoanDataStart());
  yield errorHandler({
    endpoint: `/dashboard/table-overview.loan`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getLoanDataSuccess({ data }));
    },
    failHandler: yield function* (response) {
      yield put(getLoanDataFail(response));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}
export function* getSwapDataSaga() {
  yield put(getSwapDataStart());
  yield errorHandler({
    endpoint: `/dashboard/table-overview.swap`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getSwapDataSuccess({ data }));
    },
    failHandler: yield function* (response) {
      yield put(getSwapDataFail(response));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}
export function* getEarnDataSaga() {
  yield put(getEarnDataStart());
  yield errorHandler({
    endpoint: `/dashboard/table-overview.earning`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getEarnDataSuccess({ data }));
    },
    failHandler: yield function* (response) {
      yield put(getEarnDataFail(response));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}
export function* getCollateralDataSaga({ payload }) {
  yield put(getCollateralDataStart());
  yield errorHandler({
    endpoint: `/dashboard/collateral-data${payload}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getCollateralDataSuccess({ data }));
    },
    failHandler: yield function* (response) {
      yield put(getCollateralDataFail(response));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}
export function* getGlobalDataSaga() {
  yield put(getGlobalDataStart());
  yield errorHandler({
    endpoint: `/dashboard/percentile-data`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getGlobalDataSuccess({ data }));
    },
    failHandler: yield function* (response) {
      yield put(getGlobalDataFail(response));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}
export function* getBalanceDataSaga() {
  yield put(getBalanceDataStart());
  yield errorHandler({
    endpoint: `/dashboard/balance-sheet`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getBalanceDataSuccess({ data }));
    },
    failHandler: yield function* (response) {
      yield put(getBalanceDataFail(response));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}
