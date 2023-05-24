import { combineReducers } from 'redux';
import auth from './auth/auth';
import modal from './modal/modal';
import user from './user/user';
import account from './account/account';
import admins from './admins';
import market from './market/market';
import property from './property/property';
import platformVariable from './platformVariables/platformvariable';
import platformManagement from './platformManagement/platformManagement';
import transactionManagement from './transactionManagement/transactionManagement';
import dashboard from './dashboard/dashboard';
import affiliate from './affiliate/affiliate';
import cms from './cms/cms';

const allReducers = combineReducers({
  auth,
  modal,
  user,
  platformVariable,
  platformManagement,
  account,
  admins,
  market,
  property,
  transactionManagement,
  dashboard,
  affiliate,
  cms,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return allReducers(state, action);
};

export default rootReducer;
