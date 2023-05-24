import {
  DASHBOARD_COUNT_DATA_SUCCESS,
  DASHBOARD_COUNT_DATA_FAIL,
  DASHBOARD_COUNT_DATA_START,
  DASHBOARD_PROFIT_DATA_START,
  DASHBOARD_PROFIT_DATA_FAIL,
  DASHBOARD_PROFIT_DATA_SUCCESS,
  DASHBOARD_LOAN_DATA_START,
  DASHBOARD_LOAN_DATA_FAIL,
  DASHBOARD_LOAN_DATA_SUCCESS,
  DASHBOARD_SWAP_DATA_START,
  DASHBOARD_SWAP_DATA_FAIL,
  DASHBOARD_SWAP_DATA_SUCCESS,
  DASHBOARD_EARN_DATA_START,
  DASHBOARD_EARN_DATA_FAIL,
  DASHBOARD_EARN_DATA_SUCCESS,
  DASHBOARD_COLLATERAL_DATA_START,
  DASHBOARD_COLLATERAL_DATA_FAIL,
  DASHBOARD_COLLATERAL_DATA_SUCCESS,
  DASHBOARD_BALANCE_DATA_START,
  DASHBOARD_BALANCE_DATA_FAIL,
  DASHBOARD_BALANCE_DATA_SUCCESS,
  DASHBOARD_GLOBAL_DATA_START,
  DASHBOARD_GLOBAL_DATA_FAIL,
  DASHBOARD_GLOBAL_DATA_SUCCESS,
} from 'store/actionLabels';

export const initialState = {
  isLoading: {
    count: false,
    profit: false,
    loan: false,
    swap: false,
    earn: false,
    collateral: false,
    balance: false,
    global: false,
  },
  countData: {},
  profitData: {},
  loanData: {},
  swapData: {},
  earnData: {},
  collateralData: {},
  balanceData: {},
  globalData: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    // Count
    case DASHBOARD_COUNT_DATA_START: {
      return {
        ...state,
        countData: {},
        isLoading: {
          ...state.isLoading,
          count: true,
        },
      };
    }
    case DASHBOARD_COUNT_DATA_SUCCESS: {
      return {
        ...state,
        countData: payload.data,
        isLoading: {
          ...state.isLoading,
          count: false,
        },
      };
    }
    case DASHBOARD_COUNT_DATA_FAIL: {
      return {
        ...state,
        countData: {},
        isLoading: {
          ...state.isLoading,
          count: false,
        },
      };
    }

    // Profit
    case DASHBOARD_PROFIT_DATA_START: {
      return {
        ...state,
        profitData: {},
        isLoading: {
          ...state.isLoading,
          profit: true,
        },
      };
    }
    case DASHBOARD_PROFIT_DATA_SUCCESS: {
      return {
        ...state,
        profitData: payload.data,
        isLoading: {
          ...state.isLoading,
          profit: false,
        },
      };
    }
    case DASHBOARD_PROFIT_DATA_FAIL: {
      return {
        ...state,
        profitData: {},
        isLoading: {
          ...state.isLoading,
          profit: false,
        },
      };
    }

    // Loan
    case DASHBOARD_LOAN_DATA_START: {
      return {
        ...state,
        loanData: {},
        isLoading: {
          ...state.isLoading,
          loan: true,
        },
      };
    }
    case DASHBOARD_LOAN_DATA_SUCCESS: {
      return {
        ...state,
        loanData: payload.data,
        isLoading: {
          ...state.isLoading,
          loan: false,
        },
      };
    }
    case DASHBOARD_LOAN_DATA_FAIL: {
      return {
        ...state,
        loanData: {},
        isLoading: {
          ...state.isLoading,
          loan: false,
        },
      };
    }

    // Swap
    case DASHBOARD_SWAP_DATA_START: {
      return {
        ...state,
        swapData: {},
        isLoading: {
          ...state.isLoading,
          swap: true,
        },
      };
    }
    case DASHBOARD_SWAP_DATA_SUCCESS: {
      return {
        ...state,
        swapData: payload.data,
        isLoading: {
          ...state.isLoading,
          swap: false,
        },
      };
    }
    case DASHBOARD_SWAP_DATA_FAIL: {
      return {
        ...state,
        swapData: {},
        isLoading: {
          ...state.isLoading,
          swap: false,
        },
      };
    }

    // Earn
    case DASHBOARD_EARN_DATA_START: {
      return {
        ...state,
        earnData: {},
        isLoading: {
          ...state.isLoading,
          earn: true,
        },
      };
    }
    case DASHBOARD_EARN_DATA_SUCCESS: {
      return {
        ...state,
        earnData: payload.data,
        isLoading: {
          ...state.isLoading,
          earn: false,
        },
      };
    }
    case DASHBOARD_EARN_DATA_FAIL: {
      return {
        ...state,
        earnData: {},
        isLoading: {
          ...state.isLoading,
          earn: false,
        },
      };
    }

    // Collateral
    case DASHBOARD_COLLATERAL_DATA_START: {
      return {
        ...state,
        collateralData: {},
        isLoading: {
          ...state.isLoading,
          collateral: true,
        },
      };
    }
    case DASHBOARD_COLLATERAL_DATA_SUCCESS: {
      return {
        ...state,
        collateralData: payload.data,
        isLoading: {
          ...state.isLoading,
          collateral: false,
        },
      };
    }
    case DASHBOARD_COLLATERAL_DATA_FAIL: {
      return {
        ...state,
        collateralData: {},
        isLoading: {
          ...state.isLoading,
          collateral: false,
        },
      };
    }

    // Balance
    case DASHBOARD_BALANCE_DATA_START: {
      return {
        ...state,
        balanceData: {},
        isLoading: {
          ...state.isLoading,
          balance: true,
        },
      };
    }
    case DASHBOARD_BALANCE_DATA_SUCCESS: {
      return {
        ...state,
        balanceData: payload.data,
        isLoading: {
          ...state.isLoading,
          balance: false,
        },
      };
    }
    case DASHBOARD_BALANCE_DATA_FAIL: {
      return {
        ...state,
        balanceData: {},
        isLoading: {
          ...state.isLoading,
          balance: false,
        },
      };
    }

    // Global
    case DASHBOARD_GLOBAL_DATA_START: {
      return {
        ...state,
        globalData: {},
        isLoading: {
          ...state.isLoading,
          global: true,
        },
      };
    }
    case DASHBOARD_GLOBAL_DATA_SUCCESS: {
      return {
        ...state,
        globalData: payload.data,
        isLoading: {
          ...state.isLoading,
          global: false,
        },
      };
    }
    case DASHBOARD_GLOBAL_DATA_FAIL: {
      return {
        ...state,
        globalData: {},
        isLoading: {
          ...state.isLoading,
          global: false,
        },
      };
    }

    default:
      return state;
  }
};
