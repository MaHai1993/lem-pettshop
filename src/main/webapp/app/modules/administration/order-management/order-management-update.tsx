import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Multiselect } from 'multiselect-react-dropdown';

import { getAllProduct } from '../product-management/product-management.reducer';
// import { getOrder, getRoles, updateOrder, createOrder, reset } from './order-management.reducer';
import { createOrder, getOrder, reset, updateOrder } from './order-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { APP_DATE_FORMAT } from 'app/config/constants';

// export const OrderManagementUpdate = (props: RouteComponentProps<{ login: string }>) => {
export const OrderManagementUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);
  const dispatch = useAppDispatch();

  const isInvalid = false;
  const order = useAppSelector(state => state.orderManagement.order);
  const allProducts = useAppSelector(state => state.productManagement.allProducts);
  const loading = useAppSelector(state => state.orderManagement.loading);
  const updating = useAppSelector(state => state.orderManagement.updating);

  let listProduct = [];

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getOrder(props.match.params.id));
    }
    dispatch(getAllProduct());
    // dispatch(getRoles());
    return () => {
      dispatch(reset());
    };
  }, [props.match.params.id]);

  const handleClose = () => {
    props.history.push('/admin/order-management');
  };

  const handleChange = e => {
    // order.name = e.target.value;
    console.error(e.target.value);
  };

  const addOrRemoveProduct = e => {
    const exists = listProduct.includes(e.target.value);

    if (exists) {
      listProduct = listProduct.filter(c => {
        return c !== e.target.value;
      });
    } else {
      listProduct.push(e.target.value);
    }
  };

  // const addOrRemoveProduct = (e) => {
  //   // order.name = e.target.value;
  //   const index = listProduct.indexOf(e.target.value)
  //   if (index === -1) {
  //     listProduct = listProduct.slice(index, 1);
  //   } else {
  //     listProduct.push(e.target.value);
  //   }
  // }

  const saveOrder = values => {
    if (isNew) {
      dispatch(createOrder(values));
    } else {
      dispatch(updateOrder(values));
    }
    handleClose();
  };

  /* eslint-disable */
  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>Create or edit a Order</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm onSubmit={saveOrder} defaultValues={order}>
              {order.id ? <ValidatedField type="text" name="id" required readOnly label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                type="text"
                name="name"
                label="Order name"
                validate={{
                  minLength: {
                    value: 1,
                    message: 'Your order name is required to be at least 1 character.',
                  },
                }}
              />
              {/*<ValidatedField*/}
              {/*  type="text"*/}
              {/*  name="firstName"*/}
              {/*  label="First name"*/}
              {/*  validate={{*/}
              {/*    maxLength: {*/}
              {/*      value: 50,*/}
              {/*      message: 'This field cannot be longer than 50 characters.',*/}
              {/*    },*/}
              {/*  }}*/}
              {/*/>*/}
              {/*<ValidatedField*/}
              {/*  type="text"*/}
              {/*  name="lastName"*/}
              {/*  label="Last name"*/}
              {/*  validate={{*/}
              {/*    maxLength: {*/}
              {/*      value: 50,*/}
              {/*      message: 'This field cannot be longer than 50 characters.',*/}
              {/*    },*/}
              {/*  }}*/}
              {/*/>*/}
              {/*<FormText>This field cannot be longer than 50 characters.</FormText>*/}
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>name</th>
                    <th>age</th>
                    <th>number</th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts.map(row => (
                    <tr key={`order-detail-${row.id}`}>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.quantity}</td>
                      <td>{row.price}</td>
                      <td>
                        <button className="editRow">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <select name="name" onChange={addOrRemoveProduct}>
                {allProducts.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <Multiselect
                options={allProducts}
                displayValue="name-quantity"
                name="orderItem"
                onChange={addOrRemoveProduct}
                // showCheckbox={true}
              />
              <Row>
                {allProducts.map((items, i) => (
                  <tr id={order.name} key={`order-detail-${i}`}>
                    <td>{items.name}</td>
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
                    <br></br>
                  </tr>
                ))}
              </Row>
              {/*<ValidatedField*/}
              {/*  name="email"*/}
              {/*  label="Email"*/}
              {/*  placeholder={'Your email'}*/}
              {/*  type="email"*/}
              {/*  validate={{*/}
              {/*    required: {*/}
              {/*      value: true,*/}
              {/*      message: 'Your email is required.',*/}
              {/*    },*/}
              {/*    minLength: {*/}
              {/*      value: 5,*/}
              {/*      message: 'Your email is required to be at least 5 characters.',*/}
              {/*    },*/}
              {/*    maxLength: {*/}
              {/*      value: 254,*/}
              {/*      message: 'Your email cannot be longer than 50 characters.',*/}
              {/*    },*/}
              {/*    validate: v => isEmail(v) || 'Your email is invalid.',*/}
              {/*  }}*/}
              {/*/>*/}
              {/*<ValidatedField type="checkbox" name="activated" check value={true} disabled={!order.id} label="Activated" />*/}
              {/*<ValidatedField type="select" name="authorities" multiple label="Profiles">*/}
              {/*  {authorities.map(role => (*/}
              {/*    <option value={role} key={role}>*/}
              {/*      {role}*/}
              {/*    </option>*/}
              {/*  ))}*/}
              {/*</ValidatedField>*/}
              <Button tag={Link} to="/admin/order-management" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" type="submit" disabled={isInvalid || updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default OrderManagementUpdate;
