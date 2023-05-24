import * as actionLabels from '../../actionLabels';

// USERS

/* GLOBAL */
export const platformManageStart = payload => ({
  type: actionLabels.PLATFORM_MANAGEMENT_START,
  payload,
});

export const platformManageFail = payload => ({
  type: actionLabels.PLATFORM_MANAGEMENT_FAIL,
  payload,
});

/* For Admin List */
export const platformManageEarnList = payload => ({
  type: actionLabels.GET_PLATFORM_MANAGEMENT_EARN_LIST_SAGA,
  payload,
});

export const platformManageEarnListSuccess = payload => ({
  type: actionLabels.GET_PLATFORM_MANAGEMENT_EARN_LIST_SUCCESS,
  payload,
});

export const platformManageLendingList = payload => ({
  type: actionLabels.GET_PLATFORM_MANAGEMENT_LENDING_LIST_SAGA,
  payload,
});

export const platformManageLendingListSuccess = payload => ({
  type: actionLabels.GET_PLATFORM_MANAGEMENT_LENDING_LIST_SUCCESS,
  payload,
});

export const platformManageSwapList = payload => ({
  type: actionLabels.GET_PLATFORM_MANAGEMENT_SWAP_LIST_SAGA,
  payload,
});

export const platformManageSwapListSuccess = payload => ({
  type: actionLabels.GET_PLATFORM_MANAGEMENT_SWAP_LIST_SUCCESS,
  payload,
});

export const platformManageLoanList = payload => ({
  type: actionLabels.GET_PLATFORM_MANAGEMENT_LOAN_LIST_SAGA,
  payload,
});

export const platformManageLoanListSuccess = payload => ({
  type: actionLabels.GET_PLATFORM_MANAGEMENT_LOAN_LIST_SUCCESS,
  payload,
});
