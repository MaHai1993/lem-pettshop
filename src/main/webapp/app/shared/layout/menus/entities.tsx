import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';

import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" data-cy="entity" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <>{/* to avoid warnings when empty */}</>
    <MenuItem icon="users" to="/admin/user-management">
      User management
    </MenuItem>
    <MenuItem icon="bags-shopping" to="/admin/order-management">
      Order management
    </MenuItem>
    <MenuItem icon="bags-shopping" to="/admin/product-management">
      Product management
    </MenuItem>
    <MenuItem icon="bags-shopping" to="/admin/customer-management">
      Customer management
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
