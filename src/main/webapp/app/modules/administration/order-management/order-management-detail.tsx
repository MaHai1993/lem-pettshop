import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row } from 'reactstrap';
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
          <dt>Customer Name</dt>
          <dd>{order.customer.name}</dd>
          <dt>Note</dt>
          <dd>{order.note}</dd>
          <dt>Order items</dt>
          <dd>
            <tbody>
              {order.orderDetail.orderItems.map((items, i) => (
                <tr id={order.name} key={`order-detail-${i}`}>
                  <td>{items.productName}</td>
                  <td>{items.quantity}</td>
                  <td>{items.note}</td>
                  <td>
                    {items.createdDate ? (
                      <TextFormat value={items.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                    ) : null}
                  </td>
                  <td>{items.lastModifiedBy}</td>
                  <td>
                    {items.lastModifiedDate ? (
                      <TextFormat value={items.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </dd>
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
        </dl>
      </Row>
      <Button tag={Link} to="/admin/order-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
      </Button>
    </div>
  );
};

export default OrderManagementDetail;
