import * as actionLabels from '../../actionLabels';

export const initialState = {
  isLoading: false,
  isSubmitted: false,
  isUserAdded: false,
  isUserUpdated: false,
  isUserDeleted: false,
  isTempPWDGenerated: false,
  usersList: {},
  walletListData: {},
  userDetails: {},
  loanListData: {},
  lendingListData: {},
  errorMsg: '',
  isEmailSend: false,
  isGiftSend: false,

  // generatingTempPass: false,
};

const failStateConfig = payload => {
  let stateObj = {};
  switch (payload?.type) {
    case actionLabels.ADD_USER_SAGA:
      stateObj.isUserAdded = false;
      break;
    case actionLabels.SEND_EMAIL_TO_USER_SAGA:
      stateObj.isEmailSend = false;
      break;
    case actionLabels.SEND_GIFT_TO_USER_SAGA:
      stateObj.isGiftSend = false;
      break;
    case actionLabels.GET_USER_LIST_SAGA:
      stateObj.usersList = {};
      break;

    case actionLabels.GET_USER_DETAILS_SAGA:
      stateObj.userDetails = {};
      break;

    case actionLabels.UPDATE_USER_SAGA:
      stateObj.isUserUpdated = false;
      break;

    case actionLabels.DELETE_USER_SAGA:
      stateObj.isUserDeleted = false;
      break;

    case actionLabels.TEMP_PWD_SAGA:
      stateObj.isTempPWDGenerated = false;
      break;

    default:
      stateObj = {};
  }

  stateObj.errorMsg = payload?.response;
  return stateObj;
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionLabels.USER_START:
      return {
        ...state,
        [payload || 'isLoading']: true,
        isUserAdded: false,
        isUserUpdated: false,
        isUserDeleted: false,
        isEmailSend: false,
      };
    case actionLabels.USER_FAIL:
      return {
        ...state,
        [payload?.load || 'isLoading']: false,
        ...failStateConfig(payload),
      };
    case actionLabels.USER_ACTION_START:
      return {
        ...state,
        [payload || 'isSubmitted']: true,
        isUserAdded: false,
        isUserUpdated: false,
        isUserDeleted: false,
      };
    case actionLabels.USER_ACTION_FAIL:
      return {
        ...state,
        [payload?.load || 'isSubmitted']: false,
        ...failStateConfig(payload),
      };

    case actionLabels.GET_USER_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        usersList: payload,
        isGiftSend: false,
        isEmailSend: false,
      };
    }

    case actionLabels.GET_USER_DETAILS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userDetails: payload,
        isGiftSend: false,
      };
    }
    case actionLabels.GET_USER_DETAILS_SAGA: {
      return {
        ...state,
        isEmailSend: false,
      };
    }
    case actionLabels.ADD_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isUserAdded: true,
      };
    }

    case actionLabels.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isUserUpdated: true,
      };
    }

    case actionLabels.DELETE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isUserDeleted: true,
      };
    }
    case actionLabels.GET_WALLET_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        walletListData: payload,
      };
    }
    case actionLabels.GET_LOAN_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        loanListData: payload,
      };
    }
    case actionLabels.GET_LENDING_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        lendingListData: payload,
      };
    }
    case actionLabels.SEND_EMAIL_TO_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isEmailSend: true,
      };
    }
    case actionLabels.SEND_GIFT_TO_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isGiftSend: true,
      };
    }
    // case actionLabels.TEMP_PWD_SAGA: { SEND_EMAIL_TO_USER_SUCCESS
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
