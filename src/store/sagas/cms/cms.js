import { toast } from 'react-toastify';
import { put } from 'redux-saga/effects';
import {
  cmsManageListSuccess,
  cmsManageFail,
  cmsManageStart,
  uploadCmsSuccess,
  addCmsSuccess,
  removeCmsSuccess,
  addCms,
  updateCmsSuccess,
} from 'store/actions';
import errorHandler from 'utils/apiHandler';
import * as actionLabels from '../../actionLabels';

export function* getCmsListSaga({ payload }) {
  yield put(cmsManageStart());
  yield errorHandler({
    endpoint: `cms/banners`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(cmsManageListSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(cmsManageFail({ response, type: actionLabels.GET_CMS_MANAGEMENT_LIST_SAGA }));
    },
    payload,
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}

// upload cms saga
export function* uploadCmsSaga(action) {
  const { data, id } = action.payload;
  yield put(cmsManageStart({ type: actionLabels.UPLOAD_CMS_MANAGEMENT_SAGA }));
  yield errorHandler({
    endpoint: `/cms/upload/${id}`,
    successHandler: yield function* (response) {
      yield put(uploadCmsSuccess(response.data));
      yield put(
        addCms({
          key: response.data?.key,
          url: response.data?.location,
        }),
      );
    },
    failHandler: yield function* (response) {
      yield put(cmsManageFail({ response, type: actionLabels.UPLOAD_CMS_MANAGEMENT_SAGA }));
      toast.error(response);
    },
    payload: data,
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}

// add cms saga
export function* addCmsSaga(action) {
  const { key, url } = action.payload;
  yield put(cmsManageStart());
  yield errorHandler({
    endpoint: `/cms/create`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(addCmsSuccess(data));
      toast.success('Image added successfully.');
    },
    failHandler: yield function* (response) {
      yield put(cmsManageFail({ response, type: actionLabels.ADD_CMS_MANAGEMENT_SAGA }));
      toast.error(response);
    },
    payload: { key, url },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}

// remove cms saga
export function* removeCmsSaga(action) {
  const { id } = action.payload;
  yield put(cmsManageStart());
  yield errorHandler({
    endpoint: `/cms/delete/${id}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(removeCmsSuccess(data));
      toast.success('Image deleted successfully.');
    },
    failHandler: yield function* (response) {
      yield put(cmsManageFail({ response, type: actionLabels.REMOVE_CMS_MANAGEMENT_SAGA }));
      toast.error(response);
    },
    failHandlerType: 'CUSTOM',
    apiType: 'delete',
  });
}

// update cms saga
export function* updateCmsSaga(action) {
  const { data, id } = action.payload;
  yield put(cmsManageStart());
  yield errorHandler({
    endpoint: `/cms/upload/${id}`,
    successHandler: yield function* (response) {
      yield put(updateCmsSuccess(response.data));
      toast.success('CMS updated successfully.');
    },
    failHandler: yield function* (response) {
      yield put(cmsManageFail({ response, type: actionLabels.UPDATE_CMS_MANAGEMENT_SUCCESS }));
      toast.error(response);
    },
    payload: data,
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}
