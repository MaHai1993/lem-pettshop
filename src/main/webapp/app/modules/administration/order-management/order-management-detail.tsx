import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Badge } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';

import { getOrder } from './order-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const OrderManagementDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrder(props.match.params.id));
  }, []);

  const order = useAppSelector(state => state.orderManagement.order);

  return (
    <div>
      <h2>
        Order name [<strong>{order.name}</strong>]
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          {/*<dt>Order</dt>*/}
          {/*<dd>*/}
          {/*  <span>{user.login}</span>&nbsp;*/}
          {/*  {user.activated ? <Badge color="success">Activated</Badge> : <Badge color="danger">Deactivated</Badge>}*/}
          {/*</dd>*/}
          <dt>Note</dt>
          <dd>{order.note}</dd>
          {/*<dt>Last Name</dt>*/}
          {/*<dd>{user.lastName}</dd>*/}
          {/*<dt>Email</dt>*/}
          {/*<dd>{user.email}</dd>*/}
          <dt>Created By</dt>
          <dd>{order.createdBy}</dd>
          <dt>Created Date</dt>
          <dd>{order.createdDate ? <TextFormat value={order.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}</dd>
          <dt>Last Modified By</dt>
          <dd>{order.lastModifiedBy}</dd>
          <dt>Last Modified Date</dt>
          <dd>
            {order.lastModifiedDate ? (
              <TextFormat value={order.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
            ) : null}
          </dd>
          <dt>Profiles</dt>
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
      <Button tag={Link} to="/admin/order-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
      </Button>
    </div>
  );
};

export default OrderManagementDetail;
