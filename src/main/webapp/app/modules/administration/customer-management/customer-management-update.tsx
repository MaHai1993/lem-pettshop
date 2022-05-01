import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getCustomer, updateCustomer, createCustomer, reset } from './customer-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CustomerManagementUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getCustomer(props.match.params.id));
    }
    // dispatch(getRoles());
    return () => {
      dispatch(reset());
    };
  }, [props.match.params.id]);

  const handleClose = () => {
    props.history.push('/admin/customer-management');
  };

  const saveCustomer = values => {
    if (isNew) {
      dispatch(createCustomer(values));
    } else {
      dispatch(updateCustomer(values));
    }
    handleClose();
  };

  const isInvalid = false;
  const customer = useAppSelector(state => state.customerManagement.customer);
  const loading = useAppSelector(state => state.customerManagement.loading);
  const updating = useAppSelector(state => state.customerManagement.updating);
  // const authorities = useAppSelector(state => state.customerManagement.authorities);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>Create or edit a Customer</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm onSubmit={saveCustomer} defaultValues={customer}>
              {customer.id ? <ValidatedField type="text" name="id" required readOnly label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                type="text"
                name="name"
                label="Customer Name"
                validate={{
                  required: {
                    value: true,
                    message: 'Your customer name is required.',
                  },
                  // pattern: {
                  //   value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                  //   message: 'Your customer name is invalid.',
                  // },
                  minLength: {
                    value: 1,
                    message: 'Your customer name is required to be at least 1 character.',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Your customer name cannot be longer than 50 characters.',
                  },
                }}
              />
              <ValidatedField
                name="email"
                label="Customer Email"
                placeholder={'Customer email - should correct format'}
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
              <ValidatedField
                type="text"
                name="phoneNumber"
                label="Customer phone"
                // validate={{
                //   maxLength: {
                //     value: 250,
                //     message: 'This field cannot be longer than 250 characters.',
                //   },
                // }}
              />
              <ValidatedField
                type="text"
                name="address"
                label="Customer address"
                // validate={{
                //   maxLength: {
                //     value: 250,
                //     message: 'This field cannot be longer than 250 characters.',
                //   },
                // }}
              />
              <ValidatedField
                type="text"
                name="note"
                label="Customer note"
                // validate={{
                //   maxLength: {
                //     value: 250,
                //     message: 'This field cannot be longer than 250 characters.',
                //   },
                // }}
              />
              <ValidatedField
                type="text"
                name="customerType"
                placeholder={'This field for separate type of customer, can leave it empty for future feature'}
                label="Customer type"
                // validate={{
                //   maxLength: {
                //     value: 250,
                //     message: 'This field cannot be longer than 250 characters.',
                //   },
                // }}
              />
              <ValidatedField
                type="number"
                name="buyTime"
                placeholder={'If new customer, this should be 0'}
                label="Current buy time of customer"
                // validate={{
                //   maxLength: {
                //     value: 50,
                //     message: 'This field cannot be longer than 50 characters.',
                //   },
                // }}
              />
              {/*<ValidatedField*/}
              {/*  type="number"*/}
              {/*  name="price"*/}
              {/*  label="Price of each customer"*/}
              {/*  validate={{*/}
              {/*    required: {*/}
              {/*      value: true,*/}
              {/*      message: 'Your customer price is required.',*/}
              {/*    },*/}
              {/*    min: {*/}
              {/*      value: 1,*/}
              {/*      message: 'This field cannot be empty, should have min price value',*/}
              {/*    },*/}
              {/*  }}*/}
              {/*/>*/}
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
              {/*<ValidatedField type="checkbox" name="activated" check value={true} disabled={!customer.id} label="Activated" />*/}
              {/*<ValidatedField type="select" name="authorities" multiple label="Profiles">*/}
              {/*  {authorities.map(role => (*/}
              {/*    <option value={role} key={role}>*/}
              {/*      {role}*/}
              {/*    </option>*/}
              {/*  ))}*/}
              {/*</ValidatedField>*/}
              <Button tag={Link} to="/admin/customer-management" replace color="info">
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

export default CustomerManagementUpdate;
