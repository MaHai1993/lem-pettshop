import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import CustomerManagement from './customer-management';
import CustomerManagementDetail from './customer-management-detail';
import CustomerManagementUpdate from './customer-management-update';
import CustomerManagementDeleteDialog from './customer-management-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CustomerManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/update`} component={CustomerManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CustomerManagementDetail} />
      <ErrorBoundaryRoute path={match.url} component={CustomerManagement} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CustomerManagementDeleteDialog} />
  </>
);

export default Routes;
