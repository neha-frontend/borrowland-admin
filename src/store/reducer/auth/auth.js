import * as actionLabels from '../../actionLabels';

export const initialState = {
  isLogin: false,
  isLoading: false,
  userData: null,
  authToken: '',
  errorMsg: '',
  fcmToken: '',
  isResetPassword: false,
  otpVerified: false,
  fullName: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionLabels.LOGIN_START:
      return { ...state, isLoading: true, isLogin: false };
    case actionLabels.LOGIN_SUCCESS: {
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        errorMsg: '',
        ...(payload.token
          ? { authToken: payload.token, fullName: payload.fullName }
          : { userData: payload }),
      };
    }
    case actionLabels.LOGIN_FAIL: {
      return { ...state, isLoading: false, errorMsg: payload };
    }
    case actionLabels.CLEAR_AUTH: {
      return { ...state, isLogin: false, errorMsg: '', isResetPassword: false };
    }
    case actionLabels.OTP_VERIFY_START: {
      return { ...state, isLoading: true };
    }
    case actionLabels.OTP_VERIFY_SUCCESS: {
      return {
        ...state,
        authToken: payload.token,
        fullName: payload.fullName,
        isLoading: false,
        otpVerified: true,
      };
    }
    case actionLabels.OTP_VERIFY_FAIL: {
      return { ...state, errorMsg: payload, isLoading: false };
    }
    case actionLabels.RESET_PASSWORD_START: {
      return { ...state, isLoading: true };
    }
    case actionLabels.RESET_PASSWORD_SUCCESS: {
      return { ...state, isLoading: false, isResetPassword: true };
    }
    case actionLabels.RESET_PASSWORD_FAIL: {
      return { ...state, isLoading: false, errorMsg: payload };
    }
    case actionLabels.CHANGE_PASSWORD_START: {
      return { ...state, isLoading: true };
    }
    case actionLabels.CHANGE_PASSWORD_SUCCESS: {
      return { ...state, isLoading: false, isResetPassword: true };
    }
    case actionLabels.CHANGE_PASSWORD_FAIL: {
      return { ...state, isLoading: false, errorMsg: payload };
    }

    default:
      return state;
  }
};
