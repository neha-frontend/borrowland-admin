import * as actionLabels from '../../actionLabels';

// USERS

/* GLOBAL */
export const platformStart = payload => ({
  type: actionLabels.GET_PLAT_VARIABLE_START,
  payload,
});

export const platformFail = payload => ({
  type: actionLabels.GET_PLAT_VARIABLE_FAIL,
  payload,
});
export const platformActivityStart = payload => ({
  type: actionLabels.GET_PLAT_VARIABLE_ACTIVITY_START,
  payload,
});

export const platformActivityFail = payload => ({
  type: actionLabels.GET_PLAT_VARIABLE_ACTIVITY_FAIL,
  payload,
});

/* For PLatform Variables list */
export const platVariableList = payload => ({
  type: actionLabels.GET_PLAT_VARIABLE_LIST_SAGA,
  payload,
});

export const platVariableListSuccess = payload => ({
  type: actionLabels.GET_PLAT_VARIABLE_LIST_SUCCESS,
  payload,
});

export const platVariableGetSingleData = payload => ({
  type: actionLabels.GET_SINGLE_PLAT_VARIABLE_SAGA,
  payload,
});

export const platVariableGetSingleDataSuccess = payload => ({
  type: actionLabels.GET_SINGLE_PLAT_VARIABLE_SUCCESS,
  payload,
});

export const platVariableUpdate = payload => ({
  type: actionLabels.UPDATE_PLAT_VARIABLE_SAGA,
  payload,
});

export const platVariableUpdateSuccess = payload => ({
  type: actionLabels.UPDATE_PLAT_VARIABLE_SUCCESS,
  payload,
});

export const getPlatformActivityHistory = payload => ({
  type: actionLabels.GET_PLAT_VARIABLE_ACTIVITY_HISTORY_SAGA,
  payload,
});

export const getPlatformActivityHistorySuccess = payload => ({
  type: actionLabels.GET_PLAT_VARIABLE_ACTIVITY_HISTORY_SUCCESS,
  payload,
});
