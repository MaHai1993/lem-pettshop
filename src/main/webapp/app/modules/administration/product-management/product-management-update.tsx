import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getProduct, updateProduct, createProduct, reset } from './product-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ProductManagementUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getProduct(props.match.params.id));
    }
    // dispatch(getRoles());
    return () => {
      dispatch(reset());
    };
  }, [props.match.params.id]);

  const handleClose = () => {
    props.history.push('/admin/product-management');
  };

  const saveProduct = values => {
    if (isNew) {
      dispatch(createProduct(values));
    } else {
      dispatch(updateProduct(values));
    }
    handleClose();
  };

  const isInvalid = false;
  const product = useAppSelector(state => state.productManagement.product);
  const loading = useAppSelector(state => state.productManagement.loading);
  const updating = useAppSelector(state => state.productManagement.updating);
  // const authorities = useAppSelector(state => state.productManagement.authorities);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>Create or edit a Product</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm onSubmit={saveProduct} defaultValues={product}>
              {product.id ? <ValidatedField type="text" name="id" required readOnly label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                type="text"
                name="name"
                label="Product Name"
                validate={{
                  required: {
                    value: true,
                    message: 'Your product name is required.',
                  },
                  // pattern: {
                  //   value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                  //   message: 'Your product name is invalid.',
                  // },
                  minLength: {
                    value: 1,
                    message: 'Your product name is required to be at least 1 character.',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Your product name cannot be longer than 50 characters.',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="note"
                label="Product note"
                // validate={{
                //   maxLength: {
                //     value: 250,
                //     message: 'This field cannot be longer than 250 characters.',
                //   },
                // }}
              />
              <ValidatedField
                type="number"
                name="quantity"
                label="Current quantity of product"
                // validate={{
                //   maxLength: {
                //     value: 50,
                //     message: 'This field cannot be longer than 50 characters.',
                //   },
                // }}
              />
              <ValidatedField
                type="number"
                name="price"
                label="Price of each product"
                validate={{
                  required: {
                    value: true,
                    message: 'Your product price is required.',
                  },
                  min: {
                    value: 1,
                    message: 'This field cannot be empty, should have min price value',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="imageUrl"
                label="Test product imageUrl"
                // validate={{
                //   maxLength: {
                //     value: 50,
                //     message: 'This field cannot be longer than 50 characters.',
                //   },
                // }}
              />
              {/*<FormText>This field cannot be longer than 50 characters.</FormText>*/}
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
              {/*<ValidatedField type="checkbox" name="activated" check value={true} disabled={!product.id} label="Activated" />*/}
              {/*<ValidatedField type="select" name="authorities" multiple label="Profiles">*/}
              {/*  {authorities.map(role => (*/}
              {/*    <option value={role} key={role}>*/}
              {/*      {role}*/}
              {/*    </option>*/}
              {/*  ))}*/}
              {/*</ValidatedField>*/}
              <Button tag={Link} to="/admin/product-management" replace color="info">
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

export default ProductManagementUpdate;
