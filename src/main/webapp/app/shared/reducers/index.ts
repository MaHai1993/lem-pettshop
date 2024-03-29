import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication from './authentication';
import applicationProfile from './application-profile';

import administration from 'app/modules/administration/administration.reducer';
import userManagement from 'app/modules/administration/user-management/user-management.reducer';
import orderManagement from 'app/modules/administration/order-management/order-management.reducer';
import productManagement from 'app/modules/administration/product-management/product-management.reducer';
import customerManagement from 'app/modules/administration/customer-management/customer-management.reducer';
import register from 'app/modules/account/register/register.reducer';
import activate from 'app/modules/account/activate/activate.reducer';
import password from 'app/modules/account/password/password.reducer';
import settings from 'app/modules/account/settings/settings.reducer';
import passwordReset from 'app/modules/account/password-reset/password-reset.reducer';

const rootReducer = {
  authentication,
  applicationProfile,
  administration,
  userManagement,
  orderManagement,
  productManagement,
  customerManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  loadingBar,
};

export default rootReducer;
