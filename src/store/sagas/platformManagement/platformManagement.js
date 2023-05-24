// import { userMain, axiosMain } from 'http/axios/axios_main';
// import { toast } from 'react-toastify';
import { toast } from 'react-toastify';
import { put } from 'redux-saga/effects';
import {
  // getEarlyInvestor,
  platformManageStart,
  platformManageFail,
  platformManageEarnListSuccess,
  platformManageLendingListSuccess,
  platformManageSwapListSuccess,
  platformManageLoanListSuccess,
} from 'store/actions';
import errorHandler from 'utils/apiHandler';
import * as actionLabels from '../../actionLabels';

export function* getPlatManagementEarnListSaga(action) {
  const { query, data: userData } = action.payload;

  yield put(platformManageStart());
  yield errorHandler({
    endpoint: `platFormManagement/earningListWithFilter?${query}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(platformManageEarnListSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(
        platformManageFail({ response, type: actionLabels.GET_PLATFORM_MANAGEMENT_EARN_LIST_SAGA }),
      );
    },
    payload: { ...userData },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}

export function* getPlatManagementLendingListSaga(action) {
  const { query, data: userData } = action.payload;

  yield put(platformManageStart());
  yield errorHandler({
    endpoint: `platFormManagement/lendingListWithFilter?${query}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(platformManageLendingListSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(
        platformManageFail({
          response,
          type: actionLabels.GET_PLATFORM_MANAGEMENT_LENDING_LIST_SAGA,
        }),
      );
    },
    // payload,
    payload: { ...userData },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}

export function* getPlatManagementSwapListSaga(action) {
  const { query, data: userData } = action.payload;

  yield put(platformManageStart());
  yield errorHandler({
    endpoint: `platFormManagement/swapListWithFilter?${query}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(platformManageSwapListSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(
        platformManageFail({ response, type: actionLabels.GET_PLATFORM_MANAGEMENT_SWAP_LIST_SAGA }),
      );
    },
    payload: { ...userData },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}

export function* getPlatManagementLoanListSaga(action) {
  const { query, data: userData } = action.payload;

  yield put(platformManageStart());
  yield errorHandler({
    endpoint: `platFormManagement/loansListWithFilter?${query}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(platformManageLoanListSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(
        platformManageFail({ response, type: actionLabels.GET_PLATFORM_MANAGEMENT_LOAN_LIST_SAGA }),
      );
      toast.error(response);
    },
    payload: { ...userData },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}
