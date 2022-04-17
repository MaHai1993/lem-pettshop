import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge } from 'reactstrap';
import { TextFormat, JhiPagination, JhiItemCount, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
// import { getUsersAsAdmin, updateOrder } from './customer-management.reducer';
import { getCustomers, updateCustomer } from './customer-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CustomerManagement = (props: RouteComponentProps<any>) => {
  const dispatch = useAppDispatch();

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const getCustomersFromProps = () => {
    dispatch(
      getCustomers({
        page: pagination.activePage - 1,
        size: pagination.itemsPerPage,
        sort: `${pagination.sort},${pagination.order}`,
      })
    );
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    getCustomersFromProps();
  }, [pagination.activePage, pagination.order, pagination.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sortParam = params.get(SORT);
    if (page && sortParam) {
      const sortSplit = sortParam.split(',');
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === ASC ? DESC : ASC,
      sort: p,
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    getCustomersFromProps();
  };

  const { match } = props;
  const customers = useAppSelector(state => state.customerManagement.customers);
  const totalItems = useAppSelector(state => state.customerManagement.totalItems);
  const loading = useAppSelector(state => state.customerManagement.loading);

  return (
    <div>
      <h2 id="customer-management-page-heading" data-cy="customerManagementPageHeading">
        Products
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity">
            <FontAwesomeIcon icon="plus" /> Create a new Customer
          </Link>
        </div>
      </h2>
      <Table responsive striped>
        <thead>
          <tr>
            <th className="hand" onClick={sort('id')}>
              ID
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('name')}>
              Customer name
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('email')}>
              Customer email
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('address')}>
              Customer address
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('phoneNumber')}>
              Customer phone
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand">
              Customer note
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand">
              Customer Types
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('buyTime')}>
              Customer buy time
              <FontAwesomeIcon icon="sort" />
            </th>
            {/*<th>Profiles</th>*/}
            <th className="hand" onClick={sort('createdDate')}>
              Created Date
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('lastModifiedBy')}>
              Last Modified By
              <FontAwesomeIcon icon="sort" />
            </th>
            <th id="modified-date-sort" className="hand" onClick={sort('lastModifiedDate')}>
              Last Modified Date
              <FontAwesomeIcon icon="sort" />
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, i) => (
            <tr id={customer.name} key={`customer-${i}`}>
              <td>
                <Button tag={Link} to={`${match.url}/${customer.id}`} color="link" size="sm">
                  {customer.id}
                </Button>
              </td>
              <td>{customer.name}</td>
              {/*<td>{customer.customerName}</td>*/}
              <td>{customer.email}</td>
              <td>{customer.address}</td>
              <td>{customer.phoneNumber}</td>
              <td>{customer.note}</td>
              <td>{customer.userType}</td>
              <td>{customer.buyTime}</td>
              {/*<td>*/}
              {/*{user.authorities*/}
              {/*  ? user.authorities.map((authority, j) => (*/}
              {/*      <div key={`user-auth-${i}-${j}`}>*/}
              {/*        <Badge color="info">{authority}</Badge>*/}
              {/*      </div>*/}
              {/*    ))*/}
              {/*  : null}*/}
              {/*</td>*/}
              <td>
                {customer.createdDate ? (
                  <TextFormat value={customer.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                ) : null}
              </td>
              <td>{customer.lastModifiedBy}</td>
              <td>
                {customer.lastModifiedDate ? (
                  <TextFormat value={customer.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                ) : null}
              </td>
              <td className="text-right">
                <div className="btn-group flex-btn-group-container">
                  <Button tag={Link} to={`${match.url}/${customer.id}`} color="info" size="sm">
                    <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                  </Button>
                  <Button tag={Link} to={`${match.url}/${customer.id}/update`} color="primary" size="sm">
                    <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                  </Button>
                  <Button tag={Link} to={`${match.url}/${customer.id}/delete/`} color="danger" size="sm">
                    <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {totalItems ? (
        <div className={customers && customers.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={pagination.activePage} total={totalItems} itemsPerPage={pagination.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={pagination.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={pagination.itemsPerPage}
              totalItems={totalItems}
            />
          </Row>
        </div>
      ) : (
        'Current customer list is empty'
      )}
    </div>
  );
};

export default CustomerManagement;
