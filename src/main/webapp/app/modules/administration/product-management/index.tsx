import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import ProductManagement from './product-management';
import ProductManagementDetail from './product-management-detail';
import ProductManagementUpdate from './product-management-update';
import ProductManagementDeleteDialog from './product-management-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProductManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/update`} component={ProductManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProductManagementDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProductManagement} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProductManagementDeleteDialog} />
  </>
);

export default Routes;
