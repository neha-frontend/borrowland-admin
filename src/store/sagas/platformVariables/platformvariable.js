// import { userMain, axiosMain } from 'http/axios/axios_main';
// import { toast } from 'react-toastify';
import { toast } from 'react-toastify';
import { put } from 'redux-saga/effects';
import {
  // getEarlyInvestor,
  platformStart,
  platformFail,
  platVariableListSuccess,
  getPlatformActivityHistorySuccess,
  platVariableGetSingleDataSuccess,
  platVariableUpdateSuccess,
  platformActivityStart,
  platformActivityFail,
} from 'store/actions';
import errorHandler from 'utils/apiHandler';
import * as actionLabels from '../../actionLabels';

export function* getPlatVariableListSaga({ payload }) {
  yield put(platformStart());
  yield errorHandler({
    endpoint: `platForm/platformListWithFilter${payload}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(platVariableListSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(platformFail({ response, type: actionLabels.GET_PLAT_VARIABLE_LIST_SAGA }));
    },
    payload,
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}

export function* getPlatVariableActivityHistorySaga({ payload }) {
  // const { id } = action.payload;
  yield put(platformActivityStart());

  // yield put(adminStart());
  yield errorHandler({
    endpoint: `platForm/getActivityHistory/${payload}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getPlatformActivityHistorySuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(
        platformActivityFail({
          response,
          type: actionLabels.GET_PLAT_VARIABLE_ACTIVITY_HISTORY_SAGA,
        }),
      );
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}

export function* getPlatVariableSingleDataSaga({ payload }) {
  // const { id } = action.payload;
  // yield put(platformStart());
  yield put(platformActivityStart());

  // yield put(adminStart());
  yield errorHandler({
    endpoint: `platForm/variable-name/${payload}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(platVariableGetSingleDataSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(
        platformActivityFail({ response, type: actionLabels.GET_SINGLE_PLAT_VARIABLE_SAGA }),
      );
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}
export function* updatePlatVariableSaga(action) {
  const { id, param } = action.payload;
  yield put(platformStart());
  yield errorHandler({
    endpoint: `platForm/updatePlateformVariable/${id}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(platVariableUpdateSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(platformFail({ response, type: actionLabels.UPDATE_PLAT_VARIABLE_SAGA }));
      toast.error(response);
    },
    payload: param,
    failHandlerType: 'CUSTOM',
    apiType: 'put',
  });
}
