import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Badge } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';

import { getCustomer } from './customer-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CustomerManagementDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCustomer(props.match.params.id));
  }, []);

  const customer = useAppSelector(state => state.customerManagement.customer);

  return (
    <div style={{ margin: 'auto' }}>
      <h2>
        Customer name [<strong>{customer.name}</strong>]
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          {/*<dt>Order</dt>*/}
          {/*<dd>*/}
          {/*  <span>{user.login}</span>&nbsp;*/}
          {/*  {user.activated ? <Badge color="success">Activated</Badge> : <Badge color="danger">Deactivated</Badge>}*/}
          {/*</dd>*/}
          <dt>Email</dt>
          <dd>{customer.email}</dd>
          <dt>Address</dt>
          <dd>{customer.address}</dd>
          <dt>Phone Number</dt>
          <dd>{customer.phoneNumber}</dd>
          <dt>Note</dt>
          <dd>{customer.note}</dd>
          <dt>Created By</dt>
          <dd>{customer.createdBy}</dd>
          <dt>Created Date</dt>
          <dd>
            {customer.createdDate ? <TextFormat value={customer.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}
          </dd>
          <dt>Last Modified By</dt>
          <dd>{customer.lastModifiedBy}</dd>
          <dt>Last Modified Date</dt>
          <dd>
            {customer.lastModifiedDate ? (
              <TextFormat value={customer.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
            ) : null}
          </dd>
          {/*<dt>Profiles</dt>*/}
          {/*<dd>*/}
          {/*  <ul className="list-unstyled">*/}
          {/*    {user.authorities*/}
          {/*      ? user.authorities.map((authority, i) => (*/}
          {/*          <li key={`user-auth-${i}`}>*/}
          {/*            <Badge color="info">{authority}</Badge>*/}
          {/*          </li>*/}
          {/*        ))*/}
          {/*      : null}*/}
          {/*  </ul>*/}
          {/*</dd>*/}
        </dl>
      </Row>
      <Button tag={Link} to="/admin/customer-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
      </Button>
    </div>
  );
};

export default CustomerManagementDetail;
