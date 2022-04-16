import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge } from 'reactstrap';
import { TextFormat, JhiPagination, JhiItemCount, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
// import { getUsersAsAdmin, updateOrder } from './order-management.reducer';
import { getOrders, updateOrder } from './order-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const OrderManagement = (props: RouteComponentProps<any>) => {
  const dispatch = useAppDispatch();

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const getOrdersFromProps = () => {
    dispatch(
      getOrders({
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
    getOrdersFromProps();
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
    // getOrdersFromProps();
    console.error('HaiMH - getUsersFromProps');
  };

  const toggleActive = order => () =>
    dispatch(
      updateOrder({
        ...order,
        // activated: !user.activated,
      })
    );

  const { match } = props;
  // const account = useAppSelector(state => state.authentication.account);
  const orders = useAppSelector(state => state.orderManagement.orders);
  const totalItems = useAppSelector(state => state.orderManagement.totalItems);
  const loading = useAppSelector(state => state.orderManagement.loading);

  return (
    <div>
      {/*<h2 id="user-management-page-heading" data-cy="userManagementPageHeading">*/}
      <h2 id="order-management-page-heading" data-cy="orderManagementPageHeading">
        Orders
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity">
            <FontAwesomeIcon icon="plus" /> Create a new Order
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
              Order name
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('note')}>
              Order note
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
          {orders.map((order, i) => (
            <tr id={order.name} key={`order-${i}`}>
              <td>
                <Button tag={Link} to={`${match.url}/${order.id}`} color="link" size="sm">
                  {order.id}
                </Button>
              </td>
              <td>{order.name}</td>
              {/*<td>{order.customerName}</td>*/}
              <td>{order.note}</td>
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
                {order.createdDate ? <TextFormat value={order.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}
              </td>
              <td>{order.lastModifiedBy}</td>
              <td>
                {order.lastModifiedDate ? (
                  <TextFormat value={order.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                ) : null}
              </td>
              <td className="text-right">
                <div className="btn-group flex-btn-group-container">
                  <Button tag={Link} to={`${match.url}/${order.id}`} color="info" size="sm">
                    <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                  </Button>
                  <Button tag={Link} to={`${match.url}/${order.id}/update`} color="primary" size="sm">
                    <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                  </Button>
                  <Button tag={Link} to={`${match.url}/${order.id}/delete/`} color="danger" size="sm">
                    <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {totalItems ? (
        <div className={orders && orders.length > 0 ? '' : 'd-none'}>
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
        ''
      )}
    </div>
  );
};

export default OrderManagement;
