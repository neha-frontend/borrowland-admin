import { toast } from 'react-toastify';
import { put } from 'redux-saga/effects';
import errorHandler from 'utils/apiHandler';
// import { axios } from '../../../http';
import {
  loginSuccess,
  loginFail,
  loginStart,
  otpVerifySuccess,
  passwordResetStart,
  passwordResetSuccess,
  passwordResetFail,
  otpVerifyStart,
  otpVerifyFail,
  passwordChangeStart,
  passwordChangeSuccess,
  passwordChangeFail,
} from '../../actions';

export function* loginSaga(action) {
  const { email, password } = action.payload;

  yield put(loginStart());
  yield errorHandler({
    endpoint: '/admin/login',
    successHandler: yield function* (response) {
      localStorage.setItem('email', email);
      const { data } = response;
      yield put(loginSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(loginFail(response));
    },
    payload: { email, password },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}
export function* resetPassword(action) {
  const { password, email, otp } = action.payload;
  yield put(passwordResetStart());
  yield errorHandler({
    endpoint: `/admin/resetPassword`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(passwordResetSuccess(data));
      toast.success(response?.message);
    },
    failHandler: yield function* (response) {
      yield put(passwordResetFail(response));
      // toast.error(response);
    },
    payload: { password, email, otp },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}
export function* changePassword(action) {
  const { value, close } = action.payload;
  yield put(passwordChangeStart());
  yield errorHandler({
    endpoint: `/admin/changePassword`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(passwordChangeSuccess(data));
      toast.success(response?.message);
      close();
    },
    failHandler: yield function* (response) {
      yield put(passwordChangeFail(response));
      toast.error(response);
    },
    payload: { ...value },
    failHandlerType: 'CUSTOM',
    apiType: 'put',
  });
}
export function* otpVerifySaga(action) {
  yield put(otpVerifyStart());
  yield errorHandler({
    endpoint: '/admin/verifyOtp',
    successHandler: yield function* (response) {
      const { data } = response;
      localStorage.setItem('fullName', data?.fullName);
      yield put(otpVerifySuccess({ token: data?.authToken, fullName: data?.fullName }));
    },
    failHandler: yield function* (response) {
      yield put(otpVerifyFail(response));
    },
    payload: action.payload,
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}

export function* authenticationValidatorSaga() {
  yield put(loginStart());
  const token = yield localStorage.getItem('authToken');
  const fullName = yield localStorage.getItem('fullName');
  if (!token) {
    yield put(loginFail(''));
    // yield put(logout()); // logout action
  } else {
    yield put(loginSuccess({ token, fullName }));
  }
}
