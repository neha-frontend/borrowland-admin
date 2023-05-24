import * as actionLabels from '../../actionLabels';

export const initialState = {
  isLoading: false,
  isPlatLoading: false,
  platVariableListData: {},
  platVariableSingleData: {},
  errorMsg: '',
  // generatingTempPass: false,

  activityHistory: {},
};

const failStateConfig = payload => {
  let stateObj = {};
  switch (payload?.type) {
    case actionLabels.ADD_PLAT_VARIABLE_SAGA:
      stateObj.isPlatVariableAdded = false;
      break;

    case actionLabels.GET_PLAT_VARIABLE_LIST_SAGA:
      stateObj.usersList = {};
      break;

    case actionLabels.UPDATE_PLAT_VARIABLE_SAGA:
      stateObj.isPlatVariableUpdated = false;
      break;

    case actionLabels.GET_SINGLE_PLAT_VARIABLE_SAGA:
      stateObj.platVariableSingleData = {};
      break;

    case actionLabels.GET_PLAT_VARIABLE_ACTIVITY_HISTORY_SAGA:
      stateObj.activityHistory = {};
      break;

    default:
      stateObj = {};
  }

  stateObj.errorMsg = payload?.response;
  return stateObj;
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionLabels.GET_PLAT_VARIABLE_START:
      return {
        ...state,
        [payload || 'isLoading']: true,
        isPlatVariableAdded: false,
        isPlatVariableUpdated: false,
        isPlatVariableDeleted: false,
      };
    case actionLabels.GET_PLAT_VARIABLE_FAIL:
      return {
        ...state,
        [payload?.load || 'isLoading']: false,
        ...failStateConfig(payload),
      };
    case actionLabels.GET_PLAT_VARIABLE_ACTIVITY_START:
      return {
        ...state,
        [payload || 'isPlatLoading']: true,
        isPlatVariableAdded: false,
        isPlatVariableUpdated: false,
        isPlatVariableDeleted: false,
      };
    case actionLabels.GET_PLAT_VARIABLE_ACTIVITY_FAIL:
      return {
        ...state,
        [payload?.load || 'isPlatLoading']: false,
        ...failStateConfig(payload),
      };
    case actionLabels.GET_PLAT_VARIABLE_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        platVariableListData: payload,
      };
    }

    case actionLabels.GET_PLAT_VARIABLE_ACTIVITY_HISTORY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isPlatLoading: false,
        activityHistory: payload,
      };
    }

    case actionLabels.GET_SINGLE_PLAT_VARIABLE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isPlatLoading: false,
        platVariableSingleData: payload,
      };
    }

    case actionLabels.UPDATE_PLAT_VARIABLE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isPlatLoading: false,
        isPlatVariableUpdated: true,
      };
    }
    // case actionLabels.TEMP_PWD_SAGA: {
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isTempPWDGenerated: false,
    //   };
    // }

    // case actionLabels.TEMP_PWD_SUCCESS: {
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isTempPWDGenerated: true,
    //     generatingTempPass: false,
    //   };
    // }
    default:
      return state;
  }
};
