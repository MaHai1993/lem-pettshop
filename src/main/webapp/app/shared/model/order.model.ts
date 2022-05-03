export interface IOrder {
  id?: any;
  name?: string;
  note?: string;
  customer?: any;
  orderDetail?: any;
  orderItem?: any;
  customerName?: string;
  orderTotalPrice?: string;
  createdBy?: string;
  lastModifiedBy?: string;
  createdDate?: Date | null;
  updatedDate?: Date | null;
  lastModifiedDate?: Date | null;
}

export const defaultValue: Readonly<IOrder> = {
  id: '',
  name: '',
  note: '',
  customerName: '',
  orderDetail: null,
  orderItem: null,
  lastModifiedBy: '',
  orderTotalPrice: '',
  createdBy: '',
  customer: '',
  createdDate: null,
  updatedDate: null,
  lastModifiedDate: null,
};
