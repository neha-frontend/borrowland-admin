import { authMain, paymentMain } from 'http/axios/axios_main';

import { put } from 'redux-saga/effects';
import errorHandler from 'utils/apiHandler';
import toaster from 'utils/toaster';

import {
  getPlaidTokenStart,
  getPlaidTokenSuccess,
  getPlaidTokenFail,
  addACHBankAccountStart,
  addACHBankAccountSuccess,
  addACHBankAccountFail,
  addWireBankAccountStart,
  addWireBankAccountSuccess,
  addWireBankAccountFail,
  getLocationStart,
  getLocationSuccess,
  getLocationFail,
  getCityLocationStart,
  getCityLocationSuccess,
  getCityLocationFail,
  getDistrictLocationStart,
  getDistrictLocationSuccess,
  getDistrictLocationFail,
  depositCurrencyStart,
  depositCurrencySuccess,
  depositCurrencyFail,
  withdrawCurrencyStart,
  withdrawCurrencySuccess,
  withdrawCurrencyFail,
  getServiceFeesStart,
  getServiceFeesSuccess,
  getServiceFeesFail,
  getWalletBalanceStart,
  getWalletBalanceSuccess,
  getWalletBalanceFail,
  getListOfBankAccountStart,
  getListOfBankAccountSuccess,
  getListOfBankAccountFail,
  getListOfTransactionsStart,
  getListOfTransactionsSuccess,
  getListOfTransactionsFail,
  deleteCardStart,
  deleteCardSuccess,
  deleteCardFail,
  getBankDetailsStart,
  getBankDetailsSuccess,
  getBankDetailsFail,
  addCardStart,
  addCardSuccess,
  addCardFail,
  getListOfCardsStart,
  getListOfCardsSuccess,
  getListOfCardsFail,
} from '../../actions';

export function* getPlaidTokenSaga() {
  yield put(getPlaidTokenStart());
  yield errorHandler({
    endpoint: `/payment/plaid_link_token`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getPlaidTokenSuccess({ data }));
    },
    failHandler: yield function* (response) {
      yield put(getPlaidTokenFail(response));
    },
    failHandlerType: 'CUSTOM',
    payload: { rememberMe: false },
    apiType: 'get',
    token: true,
    baseAxios: paymentMain,
  });
}

export function* addACHBankAccountSaga({ payload }) {
  const { requestBody } = payload;
  yield put(addACHBankAccountStart());
  yield errorHandler({
    endpoint: `/payment/ach`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(addACHBankAccountSuccess({ data }));
      toaster.success(response.msg);
    },
    failHandler: yield function* (response) {
      yield put(addACHBankAccountFail(response));
      toaster.error(response);
    },
    failHandlerType: 'CUSTOM',
    payload: requestBody,
    apiType: 'post',
    token: true,
    baseAxios: paymentMain,
  });
}

export function* addWireBankAccountSaga({ payload }) {
  const { requestBody } = payload;
  yield put(addWireBankAccountStart());
  yield errorHandler({
    endpoint: `/payment/wire`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(addWireBankAccountSuccess({ data }));
      toaster.success(response.msg);
    },
    failHandler: yield function* (response) {
      yield put(addWireBankAccountFail(response));
      toaster.error(response);
    },
    failHandlerType: 'CUSTOM',
    payload: requestBody,
    apiType: 'post',
    token: true,
    baseAxios: paymentMain,
  });
}

// Check list of all the countries, states and city
export function* getLocation(action) {
  const { url, reqType, type } = action.payload;
  yield put(getLocationStart({ type }));
  yield errorHandler({
    endpoint: url,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getLocationSuccess({ data, type }));
    },
    failHandler: yield function* (response) {
      yield put(getLocationFail({ msg: response.msg, type }));
    },
    failHandlerType: 'CUSTOM',
    apiType: reqType,
    baseAxios: authMain,
  });
}

export function* getCityLocationSaga(action) {
  const { url, reqType, type } = action.payload;
  yield put(getCityLocationStart({ type }));
  yield errorHandler({
    endpoint: url,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getCityLocationSuccess({ data, type }));
    },
    failHandler: yield function* (response) {
      yield put(getCityLocationFail({ msg: response.msg, type }));
    },
    failHandlerType: 'CUSTOM',
    apiType: reqType,
    baseAxios: authMain,
  });
}

export function* getDistrictLocationSaga(action) {
  const { url, reqType, type } = action.payload;
  yield put(getDistrictLocationStart({ type }));
  yield errorHandler({
    endpoint: url,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getDistrictLocationSuccess({ data, type }));
    },
    failHandler: yield function* (response) {
      yield put(getDistrictLocationFail({ msg: response.msg, type }));
    },
    failHandlerType: 'CUSTOM',
    apiType: reqType,
    baseAxios: authMain,
  });
}

// Deposit currency using bank account
export function* depositCurrencySaga(action) {
  const { endpoint, requestBody } = action.payload;
  yield put(depositCurrencyStart());
  yield errorHandler({
    endpoint,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(depositCurrencySuccess(data));
      toaster.success(response.msg);
    },
    failHandler: yield function* (response) {
      yield put(depositCurrencyFail(response));
      toaster.error(response);
    },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
    payload: requestBody,
    token: true,
    baseAxios: paymentMain,
  });
}

// Deposit currency using bank account
export function* withdrawCurrencySaga(action) {
  const { requestBody } = action.payload;
  yield put(withdrawCurrencyStart());
  yield errorHandler({
    endpoint: `/payment/payout`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(withdrawCurrencySuccess(data));
      toaster.success(response.msg);
    },
    failHandler: yield function* (response) {
      yield put(withdrawCurrencyFail(response));
      toaster.error(response);
    },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
    payload: requestBody,
    token: true,
    baseAxios: paymentMain,
  });
}

// Get Wallet Balance
export function* getWalletBalanceSaga() {
  yield put(getWalletBalanceStart());
  yield errorHandler({
    endpoint: `/payment/balance/`,

    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getWalletBalanceSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(getWalletBalanceFail(response));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
    token: true,
    baseAxios: paymentMain,
  });
}

// Get list of all bank accounts
export function* getListOfBankAccountSaga() {
  yield put(getListOfBankAccountStart());
  yield errorHandler({
    endpoint: `/payment/bank-accounts`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getListOfBankAccountSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(getListOfBankAccountFail(response));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
    token: true,
    baseAxios: paymentMain,
  });
}

// Get list of all transactions
export function* getListOfTransactionsSaga({ payload }) {
  yield put(getListOfTransactionsStart());
  yield errorHandler({
    endpoint: `/payment/transaction?transactionType=${payload.type}&page=${payload.currentPage}&limit=10000`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getListOfTransactionsSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(getListOfTransactionsFail(response));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
    token: true,
    baseAxios: paymentMain,
  });
}

// Get Limits & Service fess
export function* getServiceFeesSaga() {
  yield put(getServiceFeesStart());
  yield errorHandler({
    endpoint: `/payment/fees`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getServiceFeesSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(getServiceFeesFail(response));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
    token: true,
    baseAxios: paymentMain,
  });
}

// Delete Card
export function* deleteCardSaga({ payload }) {
  yield put(deleteCardStart());
  yield errorHandler({
    endpoint: `/payment/unlink`,
    successHandler: yield function* (response) {
      const { data, msg } = response;
      yield put(deleteCardSuccess(data));
      toaster.success(msg);
    },
    failHandler: yield function* (response) {
      yield put(deleteCardFail(response));
      toaster.error(response);
    },
    payload,
    failHandlerType: 'CUSTOM',
    apiType: 'put',
    token: true,
    baseAxios: paymentMain,
  });
}

// Get Bank Details
export function* getBankDetailsSaga({ payload }) {
  yield put(getBankDetailsStart());
  yield errorHandler({
    endpoint: `/payment/bankDetails/${payload}`,

    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getBankDetailsSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(getBankDetailsFail(response));
      toaster.error(response);
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
    token: true,
    baseAxios: paymentMain,
  });
}

export function* addCardSaga({ payload }) {
  // const { requestBody, handleSuccess } = payload;
  yield put(addCardStart());
  yield errorHandler({
    endpoint: `/payment/addCard`,
    successHandler: yield function* (response) {
      const { data, msg } = response;
      yield put(addCardSuccess({ data }));
      toaster.success(msg);
      // handleSuccess();
    },
    failHandler: yield function* (response) {
      yield put(addCardFail(response));
      toaster.error(response);
    },
    failHandlerType: 'CUSTOM',
    payload,
    apiType: 'post',
    token: true,
    baseAxios: paymentMain,
  });
}

// Get list of all cards
export function* getListOfCardsSaga() {
  yield put(getListOfCardsStart());
  yield errorHandler({
    endpoint: `/payment/cards`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getListOfCardsSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(getListOfCardsFail(response));
      toaster.error(response);
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
    token: true,
    baseAxios: paymentMain,
  });
}
