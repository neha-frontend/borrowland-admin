import { userMain, axiosMain } from 'http/axios/axios_main';
import { toast } from 'react-toastify';
import { put } from 'redux-saga/effects';
import {
  getEarlyInvestorSuccess,
  getEarlyInvestorFail,
  getEarlyInvestorStart,
  sendPasswordStart,
  sendPasswordFail,
  sendPasswordSuccess,
  addInvestorSuccess,
  BlackWhiteListFail,
  BlackWhiteListSuccess,
  BlackWhiteListStart,
  // getEarlyInvestor,
  userStart,
  userFail,
  getUserDetailsSuccess,
  updateUserSuccess,
  deleteUserSuccess,
  userListSuccess,
  walletListSuccess,
  loanListSuccess,
  lendingListSuccess,
  sendEmailToUserSuccess,
  sendGiftToUserSuccess,
  userActionStart,
  userActionFail,
} from 'store/actions';
import errorHandler from 'utils/apiHandler';
import * as actionLabels from '../../actionLabels';

export function* fetchEarlyInvestors(action) {
  const { list, field, query } = action.payload;
  yield put(getEarlyInvestorStart());
  yield errorHandler({
    endpoint: `/${list}${query ? `?${query}` : ''}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(
        getEarlyInvestorSuccess({
          data: data?.emails || data?.items || data,
          status: data?.earlyAccessStatus,
          field,
        }),
      );
    },
    failHandler: yield function* (response) {
      yield put(getEarlyInvestorFail(response));
      toast.error(response);
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
    baseAxios: list !== 'user/listUsers' ? axiosMain : userMain,
  });
}

export function* sendTempPassword(action) {
  const { ids, success } = action.payload;
  yield put(sendPasswordStart());
  yield errorHandler({
    endpoint: '/user/tempPassword-early-access',
    successHandler: yield function* () {
      yield put(sendPasswordSuccess(ids));
      yield success();
    },
    failHandler: yield function* (response) {
      yield put(sendPasswordFail(response));
    },
    payload: { ids },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}

export function* createInvestors(action) {
  const { emails, success } = action.payload;
  yield put(sendPasswordStart());
  yield errorHandler({
    endpoint: '/user/grant-early-access',
    successHandler: yield function* () {
      yield put(addInvestorSuccess(emails));
      yield success();
      // yield put(getEarlyInvestor());
    },
    failHandler: yield function* (response) {
      yield put(sendPasswordFail(response));
    },
    payload: { emails },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}

export function* blackListInvestor(action) {
  const { userId, blacklistType, success } = action.payload;
  yield put(BlackWhiteListStart());
  yield errorHandler({
    endpoint: '/user/blacklist',
    successHandler: yield function* () {
      yield put(
        BlackWhiteListSuccess({
          id: userId,
          type: blacklistType,
        }),
      );
      success();
      toast.success(
        `Investor Successfully ${blacklistType === 'None' ? 'whitelisted' : 'blacklisted'}`,
      );
    },
    failHandler: yield function* (response) {
      yield BlackWhiteListFail();
      yield toast.error(response);
    },
    payload: action.payload,
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}

// USER

export function* getUserListSaga(action) {
  const { query, data: userData } = action.payload;

  yield put(userStart());
  yield errorHandler({
    endpoint: `/user/usersListWithFilter?${query}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(userListSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(userFail({ response, type: actionLabels.GET_USER_LIST_SAGA }));
    },
    payload: { ...userData },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}

export function* getUserDetailsSaga({ payload }) {
  // const { id } = action.payload;

  yield put(userStart());
  yield errorHandler({
    endpoint: `/user/getUser/${payload}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(getUserDetailsSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(userFail({ response, type: actionLabels.GET_USER_DETAILS_SAGA }));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}

// export function* addUserSaga(action) {
//   const { fullName, mobile, email, countryCode, responsibilities, userRole } = action.payload;
//   yield put(userStart());
//   yield errorHandler({
//     endpoint: '/user/createUser',
//     successHandler: yield function* (response) {
//       const { data } = response;
//       yield put(addUserSuccess(data));
//     },
//     failHandler: yield function* (response) {
//       yield put(userFail({ response, type: actionLabels.ADD_USER_SAGA }));
//       toast.error(response);
//     },
//     payload: { fullName, mobile, email, countryCode, responsibilities, userRole },
//     failHandlerType: 'CUSTOM',
//     apiType: 'post',
//   });
// }

export function* updateUserSaga(action) {
  const { fullName, mobile, email, countryCode, id } = action.payload;
  yield put(userActionStart());
  yield errorHandler({
    endpoint: `/user/updateUser/${id}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(updateUserSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(userActionFail({ response, type: actionLabels.UPDATE_USER_SAGA }));
      toast.error(response);
    },
    payload: { fullName, mobile, email, countryCode, id },
    failHandlerType: 'CUSTOM',
    apiType: 'put',
  });
}

export function* sendEmailToUserSaga(action) {
  const { subject, message, id } = action.payload;
  yield put(userActionStart());
  yield put(userStart());
  yield errorHandler({
    endpoint: `/user/sendMailToUser/${id}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(sendEmailToUserSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(userFail({ response, type: actionLabels.SEND_EMAIL_TO_USER_SAGA }));
      toast.error(response);
    },
    payload: { subject, message },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}

export function* deleteUserSaga(action) {
  const { id } = action.payload;
  yield put(userStart());
  yield errorHandler({
    endpoint: `/user/deleteUser/${id}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(deleteUserSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(userFail({ response, type: actionLabels.DELETE_USER_SAGA }));
      toast.error(response);
    },
    payload: { isDeleted: true },
    failHandlerType: 'CUSTOM',
    apiType: 'put',
  });
}

// export function* tempPWDGenerate(action) {
//   const { id } = action.payload;

//   yield put(userStart('generatingTempPass'));
//   yield errorHandler({
//     endpoint: `/user/sendTempPassword`,
//     successHandler: yield function* (response) {
//       const { data } = response;
//       yield put(generateTempPasswordSuccess(data));
//     },
//     failHandler: yield function* (response) {
//       yield put(
//         userFail({ response, type: actionLabels.TEMP_PWD_SAGA, load: 'generatingTempPass' }),
//       );
//       toast.error(response);
//     },
//     failHandlerType: 'CUSTOM',
//     payload: { id },
//     apiType: 'post',
//   });
// }

export function* getWalletListSaga({ payload }) {
  yield put(userStart());
  yield errorHandler({
    endpoint: `/user/getWalletHistory/${payload}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(walletListSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(userFail({ response, type: actionLabels.GET_WALLET_LIST_SAGA }));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}

export function* getLoanListSaga({ payload }) {
  yield put(userStart());
  yield errorHandler({
    endpoint: `/user/getLoanHistory/${payload}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(loanListSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(userFail({ response, type: actionLabels.GET_LOAN_LIST_SAGA }));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}

export function* getLendingListSaga({ payload }) {
  yield put(userStart());
  yield errorHandler({
    endpoint: `/user/getLendingHistory/${payload}`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(lendingListSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(userFail({ response, type: actionLabels.GET_LENDING_LIST_SAGA }));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
  });
}

export function* sendGiftToUserSaga(action) {
  const { coin, toAddress, amount, type } = action.payload;
  yield put(userStart());
  yield errorHandler({
    endpoint: `/transaction/send-gift`,
    successHandler: yield function* (response) {
      const { data } = response;
      yield put(sendGiftToUserSuccess(data));
    },
    failHandler: yield function* (response) {
      yield put(userFail({ response, type: actionLabels.SEND_GIFT_TO_USER_SAGA }));
      toast.error(response);
    },
    payload: { coin, toAddress, amount, type },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
  });
}
