export interface IOrder {
  id?: any;
  name?: string;
  note?: string;
  customer?: any;
  orderDetail?: any;
  customerName?: string;
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
  lastModifiedBy: '',
  createdBy: '',
  customer: '',
  createdDate: null,
  updatedDate: null,
  lastModifiedDate: null,
};
