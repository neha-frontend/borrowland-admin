import { put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import errorHandler from 'utils/apiHandler';
import {
  affiliateManageStart,
  affiliateManageListSuccess,
  affiliateManageFail,
  approveAffiliateSuccess,
  approveAffiliateStart,
  approveAffiliateFail,
} from 'store/actions';
import * as actionLabels from '../../actionLabels';

export function* getAffiliateListSaga(action) {
  const { query, data: userData } = action.payload;
  yield put(affiliateManageStart());

  yield errorHandler({
    endpoint: `/affiliate/listing?${query}`,

    successHandler: yield function* (response) {
      const { data } = response;
      yield put(affiliateManageListSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(
        affiliateManageFail({ response, type: actionLabels.GET_AFFILIATE_MANAGEMENT_LIST_SAGA }),
      );
    },
    payload: { ...userData },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}

export function* approveAffiliateSage(action) {
  const { status, reason, id } = action.payload;
  yield put(approveAffiliateStart());
  yield errorHandler({
    endpoint: `/affiliate/approve/${id}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(approveAffiliateSuccess(data));
      if (status === 'Approved') {
        toast.success('Agent has been approved successfully');
      } else {
        toast.success('Agent has been rejected successfully');
      }
    },
    failHandler: yield function* (response) {
      yield put(approveAffiliateFail({ response, type: actionLabels.APPROVE_AFFILIATE_SAGA }));
      toast.error(response);
    },
    payload: { status, reason },
    failHandlerType: 'CUSTOM',
    apiType: 'patch',
    token: true,
  });
}
