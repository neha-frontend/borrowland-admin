import errorHandler from 'utils/apiHandler';
import { put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  adminStart,
  adminFail,
  getAdminDetailsSuccess,
  updateAdminSuccess,
  deleteAdminSuccess,
  updateStatusAdminSuccess,
  adminListSuccess,
  addAdminSuccess,
  generateTempPasswordSuccess,
  getCardDataSuccess,
  adminActionStart,
  adminActionFail,
  cardStart,
  cardFail,
} from '../../actions';

import * as actionLabels from '../../actionLabels';

export function* getAdminListSaga({ payload }) {
  yield put(adminStart());
  yield errorHandler({
    endpoint: `/admin/adminList?${payload}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(adminListSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(adminFail({ response, type: actionLabels.GET_ADMIN_LIST_SAGA }));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}

export function* getTopCardDataSaga({ payload }) {
  console.info('PAYLOAD', payload);
  yield put(cardStart());
  yield errorHandler({
    endpoint: `/admin/adminCountData`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getCardDataSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(cardFail({ response, type: actionLabels.GET_CARD_DATA_SAGA }));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}

export function* getAdminDetailsSaga(action) {
  const { id } = action.payload;

  yield put(adminStart());
  yield errorHandler({
    endpoint: `/admin/getAdmin/${id}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getAdminDetailsSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(adminFail({ response, type: actionLabels.GET_ADMIN_DETAILS_SAGA }));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}

export function* addAdminSaga(action) {
  const { fullName, mobile, email, countryCode, responsibilities, userRole } = action.payload;
  yield put(adminActionStart());
  yield errorHandler({
    endpoint: '/admin/createAdmin',
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(addAdminSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(adminActionFail({ response, type: actionLabels.ADD_ADMIN_SAGA }));
      toast.error(response);
    },
    payload: { fullName, mobile, email, countryCode, responsibilities, userRole },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}

export function* updateAdminSaga(action) {
  const { fullName, mobile, email, countryCode, responsibilities, userRole, id, status } =
    action.payload;
  yield put(adminActionStart());
  yield errorHandler({
    endpoint: `/admin/updateAdmin/${id}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(updateAdminSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(adminActionFail({ response, type: actionLabels.UPDATE_ADMIN_SAGA }));
      toast.error(response);
    },
    payload: { fullName, mobile, email, countryCode, responsibilities, userRole, id, status },
    failHandlerType: 'CUSTOM',
    apiType: 'put',
  });
}

export function* deleteAdminSaga(action) {
  const { id } = action.payload;
  yield put(adminStart());
  yield errorHandler({
    endpoint: `/admin/deleteAdmin/${id}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(deleteAdminSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(adminFail({ response, type: actionLabels.DELETE_ADMIN_SAGA }));
      toast.error(response);
    },
    payload: { isDeleted: true },
    failHandlerType: 'CUSTOM',
    apiType: 'put',
  });
}
export function* updateStatusAdminSaga(action) {
  const { id, status } = action.payload;
  yield put(adminStart());

  yield errorHandler({
    endpoint: `/admin/activeUnactiveAdmin/${id}`,
    successHandler: yield function* (response) {
      // const { data } = response;
      yield put(updateStatusAdminSuccess(response?.message));
    },
    failHandler: yield function* (response) {
      yield put(adminFail({ response, type: actionLabels.UPDATE_STATUS_ADMIN_SAGA }));
      toast.error(response);
    },
    payload: { status },
    failHandlerType: 'CUSTOM',
    apiType: 'put',
  });
  yield put(adminStart());
}

export function* tempPWDGenerate(action) {
  const { id } = action.payload;

  yield put(adminStart('generatingTempPass'));
  yield errorHandler({
    endpoint: `/admin/sendTempPassword`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(generateTempPasswordSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(
        adminFail({ response, type: actionLabels.TEMP_PWD_SAGA, load: 'generatingTempPass' }),
      );
      toast.error(response);
    },
    failHandlerType: 'CUSTOM',
    payload: { id },
    apiType: 'post',
  });
}
