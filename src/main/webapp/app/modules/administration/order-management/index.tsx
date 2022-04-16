import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import OrderManagement from './order-management';
import OrderManagementDetail from './order-management-detail';
import OrderManagementUpdate from './order-management-update';
import OrderManagementDeleteDialog from './order-management-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OrderManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/update`} component={OrderManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OrderManagementDetail} />
      <ErrorBoundaryRoute path={match.url} component={OrderManagement} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={OrderManagementDeleteDialog} />
  </>
);

export default Routes;
