import { all, takeLatest } from 'redux-saga/effects';
import * as actionLabels from '../actionLabels';
import {
  loginSaga,
  authenticationValidatorSaga,
  otpVerifySaga,
  resetPassword,
  changePassword,
} from './auth/auth';
import {
  blackListInvestor,
  createInvestors,
  fetchEarlyInvestors,
  sendTempPassword,
  // user
  getUserListSaga,
  getUserDetailsSaga,
  deleteUserSaga,
  updateUserSaga,
  getWalletListSaga,
  getLoanListSaga,
  getLendingListSaga,
  sendEmailToUserSaga,
  sendGiftToUserSaga,
} from './user/user';
import {
  getPlatVariableActivityHistorySaga,
  getPlatVariableListSaga,
  getPlatVariableSingleDataSaga,
  updatePlatVariableSaga,
} from './platformVariables/platformvariable';
import {
  getPlatManagementEarnListSaga,
  getPlatManagementLendingListSaga,
  getPlatManagementSwapListSaga,
  getPlatManagementLoanListSaga,
} from './platformManagement/platformManagement';
import { fetchMarketList, marketCreate, marketUpdate, removeMarket } from './market/market';
import {
  addProperty,
  buyMogulEquity,
  fetchPropertyList,
  mintPropertySaga,
  putOnSaleProperty,
  deleteProperty,
} from './property/property';
import {
  getPlaidTokenSaga,
  addACHBankAccountSaga,
  addWireBankAccountSaga,
  getLocation,
  getCityLocationSaga,
  getDistrictLocationSaga,
  depositCurrencySaga,
  withdrawCurrencySaga,
  getServiceFeesSaga,
  getWalletBalanceSaga,
  getListOfTransactionsSaga,
  getListOfBankAccountSaga,
  deleteCardSaga,
  getBankDetailsSaga,
  addCardSaga,
  getListOfCardsSaga,
} from './account/account';
import {
  getAdminListSaga,
  addAdminSaga,
  getAdminDetailsSaga,
  deleteAdminSaga,
  updateAdminSaga,
  tempPWDGenerate,
  getTopCardDataSaga,
  updateStatusAdminSaga,
} from './admins';
import {
  approvePendingTransactionSage,
  getPendingTransactionDetailsSaga,
  getPendingTransactionListSaga,
  getTransactionManagementSaga,
} from './transactionManagement/transactionManagement';
import {
  getBalanceDataSaga,
  getCollateralDataSaga,
  getCountDataSaga,
  getEarnDataSaga,
  getGlobalDataSaga,
  getLoanDataSaga,
  getProfitDataSaga,
  getSwapDataSaga,
} from './dashboard/dashboard';
import { approveAffiliateSage, getAffiliateListSaga } from './affiliate/affiliate';
import { addCmsSaga, getCmsListSaga, removeCmsSaga, updateCmsSaga, uploadCmsSaga } from './cms/cms';

export function* watchAuthentication() {
  yield all([
    takeLatest(actionLabels.LOGIN_SAGA, loginSaga),
    takeLatest(actionLabels.OTP_VERIFY, otpVerifySaga),
    takeLatest(actionLabels.AUTHENTICATION_VALIDATOR, authenticationValidatorSaga),
    takeLatest(actionLabels.RESET_PASSWORD, resetPassword),
    takeLatest(actionLabels.CHANGE_PASSWORD, changePassword),
  ]);
}

export function* watchInvestor() {
  yield all([
    takeLatest(actionLabels.GET_EARLY_USER, fetchEarlyInvestors),
    takeLatest(actionLabels.SEND_PASSWORD, sendTempPassword),
    takeLatest(actionLabels.ADD_INVESTOR, createInvestors),
    takeLatest(actionLabels.BLACK_WHITE_LIST, blackListInvestor),
  ]);
}
export function* watchPlatformManagement() {
  yield all([
    takeLatest(actionLabels.GET_PLATFORM_MANAGEMENT_EARN_LIST_SAGA, getPlatManagementEarnListSaga),
    takeLatest(
      actionLabels.GET_PLATFORM_MANAGEMENT_LENDING_LIST_SAGA,
      getPlatManagementLendingListSaga,
    ),
    takeLatest(actionLabels.GET_PLATFORM_MANAGEMENT_SWAP_LIST_SAGA, getPlatManagementSwapListSaga),
    takeLatest(actionLabels.GET_PLATFORM_MANAGEMENT_LOAN_LIST_SAGA, getPlatManagementLoanListSaga),
  ]);
}
// Dashboard
export function* watchDashboard() {
  yield all([
    takeLatest(actionLabels.DASHBOARD_COUNT_DATA_SAGA, getCountDataSaga),
    takeLatest(actionLabels.DASHBOARD_PROFIT_DATA_SAGA, getProfitDataSaga),
    takeLatest(actionLabels.DASHBOARD_LOAN_DATA_SAGA, getLoanDataSaga),
    takeLatest(actionLabels.DASHBOARD_SWAP_DATA_SAGA, getSwapDataSaga),

    takeLatest(actionLabels.DASHBOARD_EARN_DATA_SAGA, getEarnDataSaga),
    takeLatest(actionLabels.DASHBOARD_COLLATERAL_DATA_SAGA, getCollateralDataSaga),
    takeLatest(actionLabels.DASHBOARD_GLOBAL_DATA_SAGA, getGlobalDataSaga),
    takeLatest(actionLabels.DASHBOARD_BALANCE_DATA_SAGA, getBalanceDataSaga),
  ]);
}

// Transaction management
export function* watchTransactionManagement() {
  yield all([
    takeLatest(actionLabels.GET_TRANSACTION_MANAGEMENT_LIST_SAGA, getTransactionManagementSaga),
    takeLatest(actionLabels.GET_PENDING_TRANSACTION_LIST_SAGA, getPendingTransactionListSaga),
    takeLatest(actionLabels.GET_PENDING_TRANSACTION_DETAILS_SAGA, getPendingTransactionDetailsSaga),
    takeLatest(actionLabels.APPROVE_PENDING_TRANSACTION_SAGA, approvePendingTransactionSage),
  ]);
}

// Account actions based saga
export function* watchAccountBasedSagas() {
  yield all([
    takeLatest(actionLabels.GET_PLAID_TOKEN_SAGA, getPlaidTokenSaga),
    takeLatest(actionLabels.ADD_ACH_BANK_ACCOUNT_SAGA, addACHBankAccountSaga),
    takeLatest(actionLabels.ADD_WIRE_BANK_ACCOUNT_SAGA, addWireBankAccountSaga),
    takeLatest(actionLabels.GET_LOCATION_SAGA, getLocation),
    takeLatest(actionLabels.GET_CITYLOCATION_SAGA, getCityLocationSaga),
    takeLatest(actionLabels.GET_DISTRICTLOCATION_SAGA, getDistrictLocationSaga),
    takeLatest(actionLabels.DEPOSIT_CURRENCY_SAGA, depositCurrencySaga),
    takeLatest(actionLabels.WITHDRAW_CURRENCY_SAGA, withdrawCurrencySaga),
    takeLatest(actionLabels.GET_ADMIN_LIST_SAGA, getAdminListSaga),
    takeLatest(actionLabels.ADD_ADMIN_SAGA, addAdminSaga),
    takeLatest(actionLabels.UPDATE_ADMIN_SAGA, updateAdminSaga),
    takeLatest(actionLabels.DELETE_ADMIN_SAGA, deleteAdminSaga),
    takeLatest(actionLabels.UPDATE_STATUS_ADMIN_SAGA, updateStatusAdminSaga),
    takeLatest(actionLabels.GET_ADMIN_DETAILS_SAGA, getAdminDetailsSaga),
    takeLatest(actionLabels.GET_CARD_DATA_SAGA, getTopCardDataSaga),

    takeLatest(actionLabels.GET_USER_LIST_SAGA, getUserListSaga),
    takeLatest(actionLabels.UPDATE_USER_SAGA, updateUserSaga),
    takeLatest(actionLabels.DELETE_USER_SAGA, deleteUserSaga),
    takeLatest(actionLabels.GET_USER_DETAILS_SAGA, getUserDetailsSaga),

    takeLatest(actionLabels.GET_WALLET_LIST_SAGA, getWalletListSaga),
    takeLatest(actionLabels.GET_LOAN_LIST_SAGA, getLoanListSaga),
    takeLatest(actionLabels.GET_LENDING_LIST_SAGA, getLendingListSaga),
    takeLatest(actionLabels.SEND_EMAIL_TO_USER_SAGA, sendEmailToUserSaga),
    takeLatest(actionLabels.SEND_GIFT_TO_USER_SAGA, sendGiftToUserSaga),

    takeLatest(actionLabels.GET_SINGLE_PLAT_VARIABLE_SAGA, getPlatVariableSingleDataSaga),
    takeLatest(actionLabels.UPDATE_PLAT_VARIABLE_SAGA, updatePlatVariableSaga),

    takeLatest(actionLabels.GET_PLAT_VARIABLE_LIST_SAGA, getPlatVariableListSaga),
    takeLatest(
      actionLabels.GET_PLAT_VARIABLE_ACTIVITY_HISTORY_SAGA,
      getPlatVariableActivityHistorySaga,
    ),

    takeLatest(actionLabels.TEMP_PWD_SAGA, tempPWDGenerate),
    takeLatest(actionLabels.GET_SERVICE_FEES_SAGA, getServiceFeesSaga),
    takeLatest(actionLabels.GET_WALLET_BALANCE_SAGA, getWalletBalanceSaga),
    takeLatest(actionLabels.GET_LIST_OF_BANK_ACCOUNT_SAGA, getListOfBankAccountSaga),
    takeLatest(actionLabels.GET_LIST_OF_TRANSACTIONS_SAGA, getListOfTransactionsSaga),
    takeLatest(actionLabels.DELETE_CARD_SAGA, deleteCardSaga),
    takeLatest(actionLabels.GET_BANK_DETAILS_SAGA, getBankDetailsSaga),
    takeLatest(actionLabels.ADD_CARD_SAGA, addCardSaga),
    takeLatest(actionLabels.GET_LIST_OF_CARDS_SAGA, getListOfCardsSaga),
    takeLatest(actionLabels.GET_AFFILIATE_MANAGEMENT_LIST_SAGA, getAffiliateListSaga),
    takeLatest(actionLabels.APPROVE_AFFILIATE_SAGA, approveAffiliateSage),
    takeLatest(actionLabels.GET_CMS_MANAGEMENT_LIST_SAGA, getCmsListSaga),
    takeLatest(actionLabels.UPLOAD_CMS_MANAGEMENT_SAGA, uploadCmsSaga),
    takeLatest(actionLabels.ADD_CMS_MANAGEMENT_SAGA, addCmsSaga),
    takeLatest(actionLabels.REMOVE_CMS_MANAGEMENT_SAGA, removeCmsSaga),
    takeLatest(actionLabels.UPDATE_CMS_MANAGEMENT_SAGA, updateCmsSaga),
  ]);
}

export function* watchMarket() {
  yield all([
    takeLatest(actionLabels.CREATE_MARKET, marketCreate),
    takeLatest(actionLabels.GET_MARKET, fetchMarketList),
    takeLatest(actionLabels.DELETE_MARKET, removeMarket),
    takeLatest(actionLabels.EDIT_MARKET, marketUpdate),
  ]);
}

export function* watchProperty() {
  yield all([
    takeLatest(actionLabels.GET_PROPERTY_LIST, fetchPropertyList),
    takeLatest(actionLabels.CREATE_PROPERTY, addProperty),
    takeLatest(actionLabels.MINT_PROPERTY, mintPropertySaga),
    takeLatest(actionLabels.PUT_ON_SALE, putOnSaleProperty),
    takeLatest(actionLabels.BUY_EQUITY, buyMogulEquity),
    takeLatest(actionLabels.DELETE_PROPERTY, deleteProperty),
  ]);
}
