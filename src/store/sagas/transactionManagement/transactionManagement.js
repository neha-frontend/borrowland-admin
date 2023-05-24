import { toast } from 'react-toastify';
import { put } from 'redux-saga/effects';
import {
  transactionManageSuccess,
  transactionManageStart,
  transactionManageFail,
  pendingTransactionListSuccess,
  getPendingTransactionDetailsSuccess,
  approvePendingTransactionSuccess,
} from 'store/actions';
import errorHandler from 'utils/apiHandler';
import * as actionLabels from '../../actionLabels';

export function* getTransactionManagementSaga(action) {
  const { query, data: userData, status } = action.payload;

  yield put(transactionManageStart());
  yield errorHandler({
    endpoint: `/transaction/transactionsListWithFilter?${query}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(transactionManageSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(transactionManageFail(response));
    },
    payload: { ...userData, ...status },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}

export function* getPendingTransactionListSaga({ payload }) {
  yield put(transactionManageStart());

  yield errorHandler({
    endpoint: `/transaction/pendings${payload}`,

    successHandler: yield function* (response) {
      const { data } = response;
      yield put(pendingTransactionListSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(
        transactionManageFail({ response, type: actionLabels.GET_PENDING_TRANSACTION_LIST_SAGA }),
      );
    },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}

export function* getPendingTransactionDetailsSaga(action) {
  const { id } = action.payload;

  // yield put(adminStart());
  yield errorHandler({
    endpoint: `/transaction/pending/${id}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getPendingTransactionDetailsSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(
        transactionManageFail({
          response,
          type: actionLabels.GET_PENDING_TRANSACTION_DETAILS_SAGA,
        }),
      );
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}

export function* approvePendingTransactionSage(action) {
  const { status, reason, id } = action.payload;
  yield put(transactionManageStart());
  yield errorHandler({
    endpoint: `/transaction/approve-transaction/${id}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(approvePendingTransactionSuccess(data));
      if (status === 'Approved') {
        toast.success('Transaction has been approved successfully');
      } else {
        toast.success('Transaction has been rejected successfully');
      }
    },
    failHandler: yield function* (response) {
      yield put(
        transactionManageFail({ response, type: actionLabels.APPROVE_PENDING_TRANSACTION_SAGA }),
      );
      toast.error(response);
    },
    payload: { status, reason },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}
