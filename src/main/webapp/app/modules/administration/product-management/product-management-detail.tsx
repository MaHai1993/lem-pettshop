import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CurrencyFormat from 'react-currency-format';

import { APP_DATE_FORMAT } from 'app/config/constants';

import { getProduct } from './product-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ProductManagementDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProduct(props.match.params.id));
  }, []);

  const product = useAppSelector(state => state.productManagement.product);

  return (
    <div style={{ margin: 'auto' }}>
      <h2>
        Product name [<strong>{product.name}</strong>]
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          <dt>Quantity</dt>
          <dd>{product.quantity}</dd>
          <dt>Price</dt>
          <dd>
            <CurrencyFormat
              value={product.price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
              renderText={value => <div>{value}</div>}
            />
          </dd>
          <dt>Total Price</dt>
          <dd>
            <CurrencyFormat
              value={product.totalPrice}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
              renderText={value => <div>{value}</div>}
            />
          </dd>
          <dt>Note</dt>
          <dd>{product.note}</dd>
          <dt>Created By</dt>
          <dd>{product.createdBy}</dd>
          <dt>Created Date</dt>
          <dd>
            {product.createdDate ? <TextFormat value={product.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}
          </dd>
          <dt>Last Modified By</dt>
          <dd>{product.lastModifiedBy}</dd>
          <dt>Last Modified Date</dt>
          <dd>
            {product.lastModifiedDate ? (
              <TextFormat value={product.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
            ) : null}
          </dd>
        </dl>
      </Row>
      <Button tag={Link} to="/admin/product-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
      </Button>
    </div>
  );
};

export default ProductManagementDetail;
