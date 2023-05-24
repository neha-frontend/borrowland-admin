import * as actionLabels from '../../actionLabels';

// USERS

/* GLOBAL */
export const affiliateManageStart = payload => ({
  type: actionLabels.AFFILIATE_MANAGEMENT_START,
  payload,
});

export const affiliateManageFail = payload => ({
  type: actionLabels.AFFILIATE_MANAGEMENT_FAIL,
  payload,
});

/* For Affiliate List */
export const affiliateManageList = payload => ({
  type: actionLabels.GET_AFFILIATE_MANAGEMENT_LIST_SAGA,
  payload,
});

export const affiliateManageListSuccess = payload => ({
  type: actionLabels.GET_AFFILIATE_MANAGEMENT_LIST_SUCCESS,
  payload,
});

// APPROVE
export const approveAffiliateStart = payload => ({
  type: actionLabels.APPROVE_AFFILIATE_START,
  payload,
});

export const approveAffiliateFail = payload => ({
  type: actionLabels.APPROVE_AFFILIATE_FAIL,
  payload,
});
export const approveAffiliate = payload => ({
  type: actionLabels.APPROVE_AFFILIATE_SAGA,
  payload,
});

export const approveAffiliateSuccess = payload => ({
  type: actionLabels.APPROVE_AFFILIATE_SUCCESS,
  payload,
});
