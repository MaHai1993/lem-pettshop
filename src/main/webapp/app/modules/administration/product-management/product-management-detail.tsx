import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Badge } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          {/*<dt>Order</dt>*/}
          {/*<dd>*/}
          {/*  <span>{user.login}</span>&nbsp;*/}
          {/*  {user.activated ? <Badge color="success">Activated</Badge> : <Badge color="danger">Deactivated</Badge>}*/}
          {/*</dd>*/}
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
      <Button tag={Link} to="/admin/product-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
      </Button>
    </div>
  );
};

export default ProductManagementDetail;
