import * as actionLabels from '../../actionLabels';

/* GLOBAL */
export const adminStart = payload => ({
  type: actionLabels.ADMIN_START,
  payload,
});

export const adminFail = payload => ({
  type: actionLabels.ADMIN_FAIL,
  payload,
});

/* GLOBAL */
export const adminActionStart = payload => ({
  type: actionLabels.ADMIN_ACTION_START,
  payload,
});

export const adminActionFail = payload => ({
  type: actionLabels.ADMIN_ACTION_FAIL,
  payload,
});

/* For All top card data */
export const cardStart = payload => ({
  type: actionLabels.GET_CARD_DATA_START,
  payload,
});

export const cardFail = payload => ({
  type: actionLabels.GET_CARD_DATA_FAIL,
  payload,
});

export const getCardData = payload => ({
  type: actionLabels.GET_CARD_DATA_SAGA,
  payload,
});

export const getCardDataSuccess = payload => ({
  type: actionLabels.GET_CARD_DATA_SUCCESS,
  payload,
});

/* For Admin List */
export const adminList = payload => ({
  type: actionLabels.GET_ADMIN_LIST_SAGA,
  payload,
});

export const adminListSuccess = payload => ({
  type: actionLabels.GET_ADMIN_LIST_SUCCESS,
  payload,
});

/* For Admin Details */
export const getAdminDetails = payload => ({
  type: actionLabels.GET_ADMIN_DETAILS_SAGA,
  payload,
});

export const getAdminDetailsSuccess = payload => ({
  type: actionLabels.GET_ADMIN_DETAILS_SUCCESS,
  payload,
});

/* For Add Admin */
export const addAdmin = payload => ({
  type: actionLabels.ADD_ADMIN_SAGA,
  payload,
});

export const addAdminSuccess = payload => ({
  type: actionLabels.ADD_ADMIN_SUCCESS,
  payload,
});

/* For Update Admin */
export const updateAdmin = payload => ({
  type: actionLabels.UPDATE_ADMIN_SAGA,
  payload,
});

export const updateAdminSuccess = payload => ({
  type: actionLabels.UPDATE_ADMIN_SUCCESS,
  payload,
});

/* For Delete Admin */
export const deleteAdmin = payload => ({
  type: actionLabels.DELETE_ADMIN_SAGA,
  payload,
});

export const deleteAdminSuccess = payload => ({
  type: actionLabels.DELETE_ADMIN_SUCCESS,
  payload,
});

/* For Status Update Admin */
export const updateStatusAdmin = payload => ({
  type: actionLabels.UPDATE_STATUS_ADMIN_SAGA,
  payload,
});

export const updateStatusAdminSuccess = payload => ({
  type: actionLabels.UPDATE_STATUS_ADMIN_SUCCESS,
  payload,
});

/* For Generating Temporary Password */
export const generateTempPassword = payload => ({
  type: actionLabels.TEMP_PWD_SAGA,
  payload,
});

export const generateTempPasswordSuccess = payload => ({
  type: actionLabels.TEMP_PWD_SUCCESS,
  payload,
});
