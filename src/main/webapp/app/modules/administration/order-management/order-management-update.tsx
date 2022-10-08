import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CurrencyFormat from 'react-currency-format';

import { getAllProduct } from '../product-management/product-management.reducer';
import { getAllCustomer } from '../customer-management/customer-management.reducer';
// import { getOrder, getRoles, updateOrder, createOrder, reset } from './order-management.reducer';
import { createOrder, getOrder, reset, updateOrder } from './order-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
/* eslint-disable */
// export const OrderManagementUpdate = (props: RouteComponentProps<{ login: string }>) => {
export const OrderManagementUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);
  const dispatch = useAppDispatch();
  let [listProductOrder, setListProductOrder] = useState([
    {
      id: 0,
      name: '',
      quantity: 0,
      price: 0,
    },
  ]);

  let [customerId, setCustomerId] = useState(0);

  const isInvalid = false;
  const order = useAppSelector(state => state.orderManagement.order);
  const allProducts = useAppSelector(state => state.productManagement.allProducts);
  const allCustomers = useAppSelector(state => state.customerManagement.allCustomers);
  const listProduct = useAppSelector(state => state.productManagement.listProduct);
  const loading = useAppSelector(state => state.orderManagement.loading);
  const updating = useAppSelector(state => state.orderManagement.updating);

  let orderModel = {};

  // let listProductOrder = [];

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
      listProductOrder = listProduct;
    } else {
      dispatch(getOrder(props.match.params.id));
      listProductOrder = order.orderItem;
    }
    dispatch(getAllProduct());
    dispatch(getAllCustomer());
    return () => {
      dispatch(reset());
    };
  }, [props.match.params.id]);

  const handleClose = () => {
    props.history.push('/admin/order-management');
  };

  const addOrRemoveProduct = (e, currentRowIndex) => {
    if (orderModel && Object.keys(orderModel).length === 0 && Object.getPrototypeOf(orderModel) === Object.prototype) {
      orderModel = Object.assign({ selected: false }, order);
    }
    const productId = e.target.value;
    const product = allProducts.find(p => p.id === Number(productId));
    let price = product.price;
    let currentProductRow = listProductOrder[currentRowIndex];
    currentProductRow.name = product.name;
    currentProductRow.price = price;
    currentProductRow.id = productId;
    // handleUpdate(currentProductRow);
    // const exists = listProduct.includes(productId);

    // if (exists) {
    //   listProduct = listProduct.filter(c => {
    //     return c !== e.target.value;
    //   });
    // } else {
    //   listProduct.push(e.target.value);
    // }
    refresh();
    // orderModel["orderItem"] = listProduct;
  };

  const handleUpdateCustomerId = e => {
    setCustomerId(e.target.value);
  };

  const handleUpdate = product => {
    setListProductOrder({ ...listProductOrder, [product.id]: product });
  };

  const refresh = () => {
    setListProductOrder([...listProductOrder]);
  };

  const addNewProductOrderRow = () => {
    setListProductOrder([...listProductOrder, { id: listProductOrder.length + 1, price: 0, name: '', quantity: 0 }]);
  };

  const onChangeValueProductOrder = (e, currentRowIndex) => {
    let currentProductRow = listProductOrder[currentRowIndex];
    if (e.target.name === 'price') {
      currentProductRow.price = e.target.value;
    }

    if (e.target.name === 'quantity') {
      currentProductRow.quantity = e.target.value;
    }
    refresh();
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
    values.orderItem = listProductOrder;
    values.customerId = customerId;
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
              <ValidatedField type="text" name="note" label="Order Note" />
              {/*<table>*/}
              {/*  <thead>*/}
              {/*    <tr>*/}
              {/*      <th>#</th>*/}
              {/*      <th>name</th>*/}
              {/*      <th>age</th>*/}
              {/*      <th>number</th>*/}
              {/*    </tr>*/}
              {/*  </thead>*/}
              {/*  <tbody>*/}
              {/*    {allProducts.map(row => (*/}
              {/*      <tr key={`order-detail-${row.id}`}>*/}
              {/*        <td>{row.id}</td>*/}
              {/*        <td>{row.name}</td>*/}
              {/*        <td>{row.quantity}</td>*/}
              {/*        <td>{row.price}</td>*/}
              {/*        <td>*/}
              {/*          <button className="editRow">Edit</button>*/}
              {/*        </td>*/}
              {/*      </tr>*/}
              {/*    ))}*/}
              {/*  </tbody>*/}
              {/*</table>*/}
              <label>List of customer</label>
              <Row>
                <select onChange={handleUpdateCustomerId}>
                  {allCustomers.map((option, index) => (
                    <option key={index} value={option.id}>
                      Name: {option.name} - Phone: {option.phoneNumber} - Address: {option.address}
                    </option>
                  ))}
                </select>
              </Row>
              <label>List of product</label>
              <Row>
                {listProductOrder.map((product, rowIndex) => (
                  <tr key={`product-detail-${product.id}`}>
                    <td>
                      <select onChange={e => addOrRemoveProduct(e, rowIndex)}>
                        {allProducts.map((option, index) => (
                          <option key={index} value={option.id}>
                            {option.name} - Price: {option.price} - Quantity: {option.quantity}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input value={product.name} />
                    </td>
                    <td>
                      <input value={product.price} name="price" onChange={e => onChangeValueProductOrder(e, rowIndex)} />
                      <CurrencyFormat
                        value={product.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        renderText={value => <div>{value}</div>}
                      />
                    </td>
                    <td>
                      <input value={product.quantity} name="quantity" onChange={e => onChangeValueProductOrder(e, rowIndex)} />
                    </td>
                    <td>
                      <Button color="primary" type="button" data-cy="submit" onClick={addNewProductOrderRow}>
                        Add new row
                      </Button>
                    </td>
                  </tr>
                ))}
              </Row>
              {/*<Multiselect*/}
              {/*  options={allProducts}*/}
              {/*  displayValue="name-quantity"*/}
              {/*  name="orderItem"*/}
              {/*  onChange={addOrRemoveProduct}*/}
              {/*  // showCheckbox={true}*/}
              {/*/>*/}
              {/*<Row>*/}
              {/*  {allProducts.map((items, i) => (*/}
              {/*    <tr id={order.name} key={`order-detail-${i}`}>*/}
              {/*      <td>{items.name}</td>*/}
              {/*      <td>{items.quantity}</td>*/}
              {/*      <td>{items.note}</td>*/}
              {/*      <td>*/}
              {/*        {items.createdDate ? (*/}
              {/*          <TextFormat value={items.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />*/}
              {/*        ) : null}*/}
              {/*      </td>*/}
              {/*      <td>{items.lastModifiedBy}</td>*/}
              {/*      <td>*/}
              {/*        {items.lastModifiedDate ? (*/}
              {/*          <TextFormat value={items.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />*/}
              {/*        ) : null}*/}
              {/*      </td>*/}
              {/*    </tr>*/}
              {/*  ))}*/}
              {/*</Row>*/}
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
