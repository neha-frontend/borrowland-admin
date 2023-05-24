import * as actionLabels from '../../actionLabels';

export const initialState = {
  isLoading: false,
  isSubmitted: false,
  isAdminAdded: false,
  isAdminUpdated: false,
  isAdminDeleted: false,
  isAdminStatusUpdated: false,
  adminStatusUpdatedSuccessMsg: '',
  isTempPWDGenerated: false,
  isCardLoading: false,
  adminsList: {},
  adminDetails: {},
  topCardData: {},
  errorMsg: '',
  generatingTempPass: false,
};

const failStateConfig = payload => {
  let stateObj = {};
  switch (payload?.type) {
    case actionLabels.ADD_ADMIN_SAGA:
      stateObj.isAdminAdded = false;
      break;

    case actionLabels.GET_ADMIN_LIST_SAGA:
      stateObj.adminsList = {};
      break;

    case actionLabels.GET_ADMIN_DETAILS_SAGA:
      stateObj.adminDetails = {};
      break;

    case actionLabels.UPDATE_ADMIN_SAGA:
      stateObj.isAdminUpdated = false;
      break;

    case actionLabels.DELETE_ADMIN_SAGA:
      stateObj.isAdminDeleted = false;
      break;
    case actionLabels.UPDATE_STATUS_ADMIN_SAGA:
      stateObj.isAdminStatusUpdated = false;
      stateObj.adminStatusUpdatedSuccessMsg = payload;
      break;

    case actionLabels.TEMP_PWD_SAGA:
      stateObj.isTempPWDGenerated = false;
      break;
    case actionLabels.GET_CARD_DATA_SAGA:
      stateObj.topCardData = {};
      break;
    default:
      stateObj = {};
  }

  stateObj.errorMsg = payload?.response;
  return stateObj;
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionLabels.ADMIN_START:
      return {
        ...state,
        [payload || 'isLoading']: true,
        isAdminAdded: false,
        isAdminUpdated: false,
        isAdminDeleted: false,
        isAdminStatusUpdated: false,
      };
    case actionLabels.ADMIN_FAIL:
      return {
        ...state,
        [payload?.load || 'isLoading']: false,
        ...failStateConfig(payload),
      };
    case actionLabels.GET_CARD_DATA_START:
      return {
        ...state,
        [payload || 'isCardLoading']: true,
      };
    case actionLabels.GET_CARD_DATA_FAIL:
      return {
        ...state,
        [payload?.load || 'isCardLoading']: false,
        ...failStateConfig(payload),
      };
    case actionLabels.ADMIN_ACTION_START:
      return {
        ...state,
        [payload || 'isSubmitted']: true,
        isAdminAdded: false,
        isAdminUpdated: false,
        isAdminDeleted: false,
      };
    case actionLabels.ADMIN_ACTION_FAIL:
      return {
        ...state,
        [payload?.load || 'isSubmitted']: false,
        ...failStateConfig(payload),
      };
    case actionLabels.GET_ADMIN_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        adminsList: payload,
      };
    }

    case actionLabels.GET_ADMIN_DETAILS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        adminDetails: payload,
      };
    }

    case actionLabels.ADD_ADMIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAdminAdded: true,
      };
    }
    case actionLabels.GET_ADMIN_LIST_SAGA: {
      return {
        ...state,
        isLoading: false,
        isSubmitted: false,
      };
    }
    case actionLabels.UPDATE_ADMIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAdminUpdated: true,
      };
    }

    case actionLabels.DELETE_ADMIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAdminDeleted: true,
      };
    }
    case actionLabels.UPDATE_STATUS_ADMIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAdminStatusUpdated: true,
        adminStatusUpdatedSuccessMsg: payload,
      };
    }

    case actionLabels.TEMP_PWD_SAGA: {
      return {
        ...state,
        isLoading: false,
        isTempPWDGenerated: false,
      };
    }
    case actionLabels.GET_CARD_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isCardLoading: false,
        topCardData: payload,
      };
    }

    case actionLabels.TEMP_PWD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isTempPWDGenerated: true,
        generatingTempPass: false,
      };
    }
    default:
      return state;
  }
};
