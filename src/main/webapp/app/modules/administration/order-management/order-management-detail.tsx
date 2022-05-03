import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Table } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CurrencyFormat } from 'react-currency-format';

import { APP_DATE_FORMAT } from 'app/config/constants';

import { getOrder } from './order-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const OrderManagementDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();
  const order = useAppSelector(state => state.orderManagement.order);

  useEffect(() => {
    console.error('OrderManagementDetail render - before User Effect');
    dispatch(getOrder(props.match.params.id));
  }, []);

  console.error('OrderManagementDetail render - after User Effect');

  /* eslint-disable */
  return (
    <div>
      <h2>
        Order name [<strong>{order.name}</strong>]
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          <dt>Customer Name</dt>
          <dd>{order.customer.name}</dd>
          <dt>Customer Address</dt>
          <dd>{order.customer.address}</dd>
          <dt>Customer Phone Number</dt>
          <dd>{order.customer.phoneNumber}</dd>
          <dt>Created By</dt>
          <dd>{order.createdBy}</dd>
          <dt>Order Note</dt>
          <dd>{order.note}</dd>
          <dt>Order Total Price</dt>
          <dd>{order.orderTotalPrice}</dd>
          <dt>Order items</dt>
          <dd>
            <Table bordered>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Product price</th>
                  <th>Total Price</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {order.orderDetail
                  ? order.orderDetail.orderItems.map((items, i) => (
                      <tr id={order.name} key={`order-detail-${i}`}>
                        <td>{items.productName}</td>
                        <td>{items.quantity}</td>
                        <td>
                          <CurrencyFormat
                            value={items.productPrice}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'}
                            renderText={value => <div>{value}</div>}
                          />
                        </td>
                        <td>
                          <CurrencyFormat
                            value={items.totalPrice}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'}
                            renderText={value => <div>{value}</div>}
                          />
                        </td>
                        <td>{items.notes}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </dd>
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
