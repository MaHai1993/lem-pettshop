import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { getOrder, getRoles, updateOrder, createOrder, reset } from './order-management.reducer';
import { getOrder, updateOrder, createOrder, reset } from './order-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

// export const OrderManagementUpdate = (props: RouteComponentProps<{ login: string }>) => {
export const OrderManagementUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getOrder(props.match.params.id));
    }
    // dispatch(getRoles());
    return () => {
      dispatch(reset());
    };
  }, [props.match.params.id]);

  const handleClose = () => {
    props.history.push('/admin/order-management');
  };

  const saveOrder = values => {
    if (isNew) {
      dispatch(createOrder(values));
    } else {
      dispatch(updateOrder(values));
    }
    handleClose();
  };

  const isInvalid = false;
  const order = useAppSelector(state => state.orderManagement.order);
  const loading = useAppSelector(state => state.orderManagement.loading);
  const updating = useAppSelector(state => state.orderManagement.updating);
  // const authorities = useAppSelector(state => state.orderManagement.authorities);

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
                name="login"
                label="Login"
                validate={{
                  required: {
                    value: true,
                    message: 'Your username is required.',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                    message: 'Your username is invalid.',
                  },
                  minLength: {
                    value: 1,
                    message: 'Your username is required to be at least 1 character.',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Your username cannot be longer than 50 characters.',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="firstName"
                label="First name"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'This field cannot be longer than 50 characters.',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="lastName"
                label="Last name"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'This field cannot be longer than 50 characters.',
                  },
                }}
              />
              <FormText>This field cannot be longer than 50 characters.</FormText>
              <ValidatedField
                name="email"
                label="Email"
                placeholder={'Your email'}
                type="email"
                validate={{
                  required: {
                    value: true,
                    message: 'Your email is required.',
                  },
                  minLength: {
                    value: 5,
                    message: 'Your email is required to be at least 5 characters.',
                  },
                  maxLength: {
                    value: 254,
                    message: 'Your email cannot be longer than 50 characters.',
                  },
                  validate: v => isEmail(v) || 'Your email is invalid.',
                }}
              />
              <ValidatedField type="checkbox" name="activated" check value={true} disabled={!order.id} label="Activated" />
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
