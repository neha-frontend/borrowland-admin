import * as actionLabels from '../../actionLabels';

export const getEarlyInvestorStart = () => ({
  type: actionLabels.GET_EARLY_USER_START,
});

export const getEarlyInvestor = payload => ({
  type: actionLabels.GET_EARLY_USER,
  payload,
});

export const getEarlyInvestorSuccess = payload => ({
  type: actionLabels.GET_EARLY_USER_SUCCESS,
  payload,
});

export const getEarlyInvestorFail = payload => ({
  type: actionLabels.GET_EARLY_USER_FAIL,
  payload,
});

export const sendPassword = payload => ({
  type: actionLabels.SEND_PASSWORD,
  payload,
});

export const sendPasswordStart = () => ({
  type: actionLabels.SEND_PASSWORD_START,
});

export const sendPasswordSuccess = payload => ({
  type: actionLabels.SEND_PASSWORD_SUCCESS,
  payload,
});

export const sendPasswordFail = payload => ({
  type: actionLabels.SEND_PASSWORD_FAIL,
  payload,
});

export const addInvestor = payload => ({
  type: actionLabels.ADD_INVESTOR,
  payload,
});

export const addInvestorStart = () => ({
  type: actionLabels.ADD_INVESTOR_START,
});

export const addInvestorSuccess = payload => ({
  type: actionLabels.ADD_INVESTOR_SUCCESS,
  payload,
});

export const addInvestorFail = payload => ({
  type: actionLabels.ADD_INVESTOR_FAIL,
  payload,
});

export const setSavedItem = payload => ({
  type: actionLabels.SAVED_ITEM,
  payload,
});

export const BlackWhiteListStart = () => ({
  type: actionLabels.BLACK_WHITE_LIST_START,
});

export const BlackWhiteList = payload => ({
  type: actionLabels.BLACK_WHITE_LIST,
  payload,
});

export const BlackWhiteListSuccess = payload => ({
  type: actionLabels.BLACK_WHITE_LIST_SUCCESS,
  payload,
});

export const BlackWhiteListFail = payload => ({
  type: actionLabels.BLACK_WHITE_LIST_FAIL,
  payload,
});

// USERS

/* GLOBAL */
export const userStart = payload => ({
  type: actionLabels.USER_START,
  payload,
});

export const userFail = payload => ({
  type: actionLabels.USER_FAIL,
  payload,
});

export const userActionStart = payload => ({
  type: actionLabels.USER_ACTION_START,
  payload,
});

export const userActionFail = payload => ({
  type: actionLabels.USER_ACTION_FAIL,
  payload,
});
/* For Admin List */
export const userList = payload => ({
  type: actionLabels.GET_USER_LIST_SAGA,
  payload,
});

export const userListSuccess = payload => ({
  type: actionLabels.GET_USER_LIST_SUCCESS,
  payload,
});

export const walletList = payload => ({
  type: actionLabels.GET_WALLET_LIST_SAGA,
  payload,
});

export const walletListSuccess = payload => ({
  type: actionLabels.GET_WALLET_LIST_SUCCESS,
  payload,
});

export const loanList = payload => ({
  type: actionLabels.GET_LOAN_LIST_SAGA,
  payload,
});

export const loanListSuccess = payload => ({
  type: actionLabels.GET_LOAN_LIST_SUCCESS,
  payload,
});

export const lendingList = payload => ({
  type: actionLabels.GET_LENDING_LIST_SAGA,
  payload,
});

export const lendingListSuccess = payload => ({
  type: actionLabels.GET_LENDING_LIST_SUCCESS,
  payload,
});
/* For Admin Details */
export const getUserDetails = payload => ({
  type: actionLabels.GET_USER_DETAILS_SAGA,
  payload,
});

export const getUserDetailsSuccess = payload => ({
  type: actionLabels.GET_USER_DETAILS_SUCCESS,
  payload,
});

/* For Add Admin */
// export const addAdmin = payload => ({
//   type: actionLabels.ADD_USER_SAGA,
//   payload,
// });

// export const addAdminSuccess = payload => ({
//   type: actionLabels.ADD_USER_SUCCESS,
//   payload,
// });

/* For Update Admin */
export const updateUser = payload => ({
  type: actionLabels.UPDATE_USER_SAGA,
  payload,
});

export const updateUserSuccess = payload => ({
  type: actionLabels.UPDATE_USER_SUCCESS,
  payload,
});

/* For Delete Admin */
export const deleteUser = payload => ({
  type: actionLabels.DELETE_USER_SAGA,
  payload,
});

export const deleteUserSuccess = payload => ({
  type: actionLabels.DELETE_USER_SUCCESS,
  payload,
});

/* For send email */
export const sendEmailToUser = payload => ({
  type: actionLabels.SEND_EMAIL_TO_USER_SAGA,
  payload,
});

export const sendEmailToUserSuccess = payload => ({
  type: actionLabels.SEND_EMAIL_TO_USER_SUCCESS,
  payload,
});

export const sendGiftToUser = payload => ({
  type: actionLabels.SEND_GIFT_TO_USER_SAGA,
  payload,
});

export const sendGiftToUserSuccess = payload => ({
  type: actionLabels.SEND_GIFT_TO_USER_SUCCESS,
  payload,
});
/* For Generating Temporary Password */
// export const generateTempPassword = payload => ({
//   type: actionLabels.TEMP_PWD_SAGA,
//   payload,
// });

// export const generateTempPasswordSuccess = payload => ({
//   type: actionLabels.TEMP_PWD_SUCCESS,
//   payload,
// });
