import * as actionLabels from '../../actionLabels';

const initialState = {
  marketList: [],
  loading: false,
  createLoader: false,
  errorMsg: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionLabels.GET_MARKET_START:
      return { ...state, loading: true, errorMsg: '' };
    case actionLabels.GET_MARKET_SUCCESS:
      return { ...state, loading: false, errorMsg: '', marketList: payload };
    case actionLabels.GET_MARKET_FAIL:
      return { ...state, loading: false, errorMsg: payload };
    case actionLabels.CREATE_MARKET_SUCCESS:
      return { ...state, createLoader: false, errorMsg: '' };
    case actionLabels.CREATE_MARKET_START:
      return { ...state, createLoader: true };
    case actionLabels.CREATE_MARKET_FAIL:
      return { ...state, createLoader: false, errorMsg: payload };
    case actionLabels.DELETE_MARKET_SUCCESS:
      return { ...state, marketList: state.marketList.filter(item => item._id !== payload) };
    default:
      return state;
  }
};
