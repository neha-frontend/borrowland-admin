export * from './auth/auth';
export * from './modal/modal';
export * from './user/user';
export * from './account/account';
export * from './admins';
export * from './market/market';
export * from './property/property';
export * from './platformVariables/platformvariable';
export * from './platformManagement/platformManagement';
export * from './transactionManagement/transactionManagement';
export * from './dashboard/dashboard';
export * from './affiliate/affiliate';
export * from './cms/cms';

export const resetApp = payload => ({
  type: 'RESET_APP',
  payload,
});
