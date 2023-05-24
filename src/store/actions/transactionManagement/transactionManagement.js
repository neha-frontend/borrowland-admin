import * as actionLabels from '../../actionLabels';

export const transactionManageStart = payload => ({
  type: actionLabels.GET_TRANSACTION_MANAGEMENT_START,
  payload,
});

export const transactionManageSuccess = payload => ({
  type: actionLabels.GET_TRANSACTION_MANAGEMENT_SUCCESS,
  payload,
});

export const transactionManageFail = payload => ({
  type: actionLabels.GET_TRANSACTION_MANAGEMENT_FAIL,
  payload,
});

export const transactionManageList = payload => ({
  type: actionLabels.GET_TRANSACTION_MANAGEMENT_LIST_SAGA,
  payload,
});

// pending transaction
export const pendingTransactionList = payload => ({
  type: actionLabels.GET_PENDING_TRANSACTION_LIST_SAGA,
  payload,
});

export const pendingTransactionListSuccess = payload => ({
  type: actionLabels.GET_PENDING_TRANSACTION_SUCCESS,
  payload,
});

/* For pending Details */
export const getPendingTransactionDetails = payload => ({
  type: actionLabels.GET_PENDING_TRANSACTION_DETAILS_SAGA,
  payload,
});

export const getPendingTransactionDetailsSuccess = payload => ({
  type: actionLabels.GET_PENDING_TRANSACTION_DETAILS_SUCCESS,
  payload,
});

// APPROVE
export const approvePendingTransaction = payload => ({
  type: actionLabels.APPROVE_PENDING_TRANSACTION_SAGA,
  payload,
});

export const approvePendingTransactionSuccess = payload => ({
  type: actionLabels.APPROVE_PENDING_TRANSACTION_SUCCESS,
  payload,
});
