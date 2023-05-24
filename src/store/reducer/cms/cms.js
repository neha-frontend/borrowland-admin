import * as actionLabels from '../../actionLabels';

export const initialState = {
  isLoading: false,
  errorMsg: '',
  cmsList: {},
  isUploaded: false,
  isUploadLoading: false,
  isAdded: false,
  isUpdated: false,
  uploadImgData: {},
  updatedImgData: {},
  isRemoved: false,
};

const failStateConfig = payload => {
  let stateObj = {};
  switch (payload?.type) {
    case actionLabels.GET_CMS_MANAGEMENT_LIST_SAGA:
      stateObj.cmsList = {};
      break;
    case actionLabels.UPLOAD_CMS_MANAGEMENT_SAGA:
      stateObj.isUploaded = false;
      stateObj.uploadImgData = {};
      break;
    case actionLabels.UPDATE_CMS_MANAGEMENT_SAGA:
      stateObj.isUpdated = false;
      stateObj.updatedImgData = {};
      break;
    case actionLabels.ADD_CMS_MANAGEMENT_SAGA:
      stateObj.isAdded = false;
      break;
    case actionLabels.REMOVE_CMS_MANAGEMENT_SAGA:
      stateObj.isRemoved = false;
      break;
    default:
      stateObj = {};
  }

  stateObj.errorMsg = payload?.response;
  return stateObj;
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionLabels.CMS_MANAGEMENT_START:
      return {
        ...state,
        [payload || 'isLoading']: true,
        isUploadLoading:
          payload?.type === actionLabels.UPLOAD_CMS_MANAGEMENT_SAGA ? true : state.isUploadLoading,
        isUploaded: false,
        isRemoved: false,
        isUpdated: false,
        isAdded: false,
      };

    case actionLabels.CMS_MANAGEMENT_FAIL:
      return {
        ...state,
        [payload?.load || 'isLoading']: false,
        isUploadLoading: false,
        ...failStateConfig(payload),
      };
    case actionLabels.GET_CMS_MANAGEMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        cmsList: payload,
      };
    }
    case actionLabels.UPLOAD_CMS_MANAGEMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isUploaded: true,
        uploadImgData: payload,
      };
    }
    case actionLabels.UPDATE_CMS_MANAGEMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isUploadLoading: false,
        isUploaded: false,
        isUpdated: true,
        updatedImgData: payload,
      };
    }
    case actionLabels.ADD_CMS_MANAGEMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isUploadLoading: false,
        isAdded: true,
      };
    }
    case actionLabels.REMOVE_CMS_MANAGEMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isRemoved: true,
      };
    }
    default:
      return state;
  }
};
