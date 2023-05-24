import * as actionLabels from '../../actionLabels';

export const initialState = {
  isLoading: false,
  transactionManagementList: {},
  errorMsg: '',
  pendingTransactionListData: {},
  pendingTransactionDetailsData: {},
  isTransactionApprove: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionLabels.GET_TRANSACTION_MANAGEMENT_START:
      return {
        ...state,
        isLoading: true,
        transactionManagementList: {},
      };
    case actionLabels.GET_TRANSACTION_MANAGEMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transactionManagementList: payload,
      };
    case actionLabels.GET_TRANSACTION_MANAGEMENT_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };

    // pending transaction
    case actionLabels.GET_PENDING_TRANSACTION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        pendingTransactionListData: payload,
      };
    }

    case actionLabels.GET_PENDING_TRANSACTION_DETAILS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        pendingTransactionDetailsData: payload,
      };
    }

    case actionLabels.APPROVE_PENDING_TRANSACTION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isTransactionApprove: true,
      };
    }
    default:
      return state;
  }
};
