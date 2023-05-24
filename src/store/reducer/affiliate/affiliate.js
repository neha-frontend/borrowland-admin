import * as actionLabels from '../../actionLabels';

export const initialState = {
  isLoading: false,
  affiliateManagementList: {},
  errorMsg: '',
  isAffiliateApprove: false,
};

const failStateConfig = payload => {
  let stateObj = {};
  switch (payload?.type) {
    case actionLabels.GET_AFFILIATE_MANAGEMENT_LIST_SAGA:
      stateObj.affiliateManagementList = {};
      break;

    case actionLabels.APPROVE_AFFILIATE_SAGA:
      stateObj.isAffiliateApprove = false;
      break;

    default:
      stateObj = {};
  }

  stateObj.errorMsg = payload?.response;
  return stateObj;
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionLabels.AFFILIATE_MANAGEMENT_START:
      return {
        ...state,
        // isLoading: true,
        [payload || 'isLoading']: true,
        affiliateManagementList: {},
      };
    case actionLabels.AFFILIATE_MANAGEMENT_FAIL:
      return {
        ...state,
        // isLoading: false,
        // errorMsg: payload,
        [payload?.load || 'isLoading']: false,
        ...failStateConfig(payload),
      };
    case actionLabels.GET_AFFILIATE_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        affiliateManagementList: payload,
      };
    case actionLabels.APPROVE_AFFILIATE_START:
      return {
        ...state,
        // isLoading: true,
        [payload || 'isLoading']: true,
        isAffiliateApprove: false,
      };
    case actionLabels.APPROVE_AFFILIATE_FAIL:
      return {
        ...state,
        // isLoading: false,
        // errorMsg: payload,
        [payload?.load || 'isLoading']: false,
        ...failStateConfig(payload),
      };
    case actionLabels.APPROVE_AFFILIATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAffiliateApprove: true,
      };
    }

    default:
      return state;
  }
};
