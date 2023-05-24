import * as actionLabels from '../../actionLabels';

export const initialState = {
  isLoading: false,
  platformManagementLoanList: {},
  platformManagementSwapList: {},
  platformManagementLendingList: {},
  platformManagementEarnList: {},

  errorMsg: '',
  // generatingTempPass: false,
};

const failStateConfig = payload => {
  let stateObj = {};
  switch (payload?.type) {
    case actionLabels.GET_PLATFORM_MANAGEMENT_EARN_LIST_SAGA:
      stateObj.platformManagementEarnList = {};
      break;

    case actionLabels.GET_PLATFORM_MANAGEMENT_LENDING_LIST_SAGA:
      stateObj.platformManagementLendingList = {};
      break;

    case actionLabels.GET_PLATFORM_MANAGEMENT_SWAP_LIST_SAGA:
      stateObj.platformManagementSwapList = {};
      break;

    case actionLabels.GET_PLATFORM_MANAGEMENT_LOAN_LIST_SAGA:
      stateObj.platformManagementLoanList = {};
      break;

    default:
      stateObj = {};
  }

  stateObj.errorMsg = payload?.response;
  return stateObj;
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionLabels.PLATFORM_MANAGEMENT_START:
      return {
        ...state,
        [payload || 'isLoading']: true,
        platformManagementLoanList: {},
        platformManagementSwapList: {},
        platformManagementLendingList: {},
        platformManagementEarnList: {},
      };
    case actionLabels.PLATFORM_MANAGEMENT_FAIL:
      return {
        ...state,
        [payload?.load || 'isLoading']: false,
        ...failStateConfig(payload),
      };
    case actionLabels.GET_PLATFORM_MANAGEMENT_EARN_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        platformManagementEarnList: payload,
      };
    }
    case actionLabels.GET_PLATFORM_MANAGEMENT_LENDING_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        platformManagementLendingList: payload,
      };
    }
    case actionLabels.GET_PLATFORM_MANAGEMENT_SWAP_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        platformManagementSwapList: payload,
      };
    }
    case actionLabels.GET_PLATFORM_MANAGEMENT_LOAN_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        platformManagementLoanList: payload,
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
