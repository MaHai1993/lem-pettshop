import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getOrder, deleteOrder } from './order-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const OrderManagementDeleteDialog = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrder(props.match.params.id));
  }, []);

  const handleClose = event => {
    event.stopPropagation();
    props.history.push('/admin/order-management');
  };

  const order = useAppSelector(state => state.orderManagement.order);

  const confirmDelete = event => {
    dispatch(deleteOrder(order.id));
    handleClose(event);
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Confirm delete operation</ModalHeader>
      <ModalBody>Are you sure you want to delete this Order?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default OrderManagementDeleteDialog;
