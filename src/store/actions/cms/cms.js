import * as actionLabels from '../../actionLabels';

/* GLOBAL */
export const cmsManageStart = payload => ({
  type: actionLabels.CMS_MANAGEMENT_START,
  payload,
});

export const cmsManageFail = payload => ({
  type: actionLabels.CMS_MANAGEMENT_FAIL,
  payload,
});

/* For Cms List */
export const cmsManageList = payload => ({
  type: actionLabels.GET_CMS_MANAGEMENT_LIST_SAGA,
  payload,
});

export const cmsManageListSuccess = payload => ({
  type: actionLabels.GET_CMS_MANAGEMENT_SUCCESS,
  payload,
});

// upload cms
export const uploadCms = payload => ({
  type: actionLabels.UPLOAD_CMS_MANAGEMENT_SAGA,
  payload,
});

export const uploadCmsSuccess = payload => ({
  type: actionLabels.UPLOAD_CMS_MANAGEMENT_SUCCESS,
  payload,
});

// update cms
export const updateCms = payload => ({
  type: actionLabels.UPDATE_CMS_MANAGEMENT_SAGA,
  payload,
});

export const updateCmsSuccess = payload => ({
  type: actionLabels.UPDATE_CMS_MANAGEMENT_SUCCESS,
  payload,
});

// add cms
export const addCms = payload => ({
  type: actionLabels.ADD_CMS_MANAGEMENT_SAGA,
  payload,
});

export const addCmsSuccess = payload => ({
  type: actionLabels.ADD_CMS_MANAGEMENT_SUCCESS,
  payload,
});

// remove cms
export const removeCms = payload => ({
  type: actionLabels.REMOVE_CMS_MANAGEMENT_SAGA,
  payload,
});

export const removeCmsSuccess = payload => ({
  type: actionLabels.REMOVE_CMS_MANAGEMENT_SUCCESS,
  payload,
});
