export interface IOrder {
  id?: any;
  name?: string;
  note?: string;
  items?: any[];
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
  lastModifiedBy: '',
  createdBy: '',
  items: [],
  createdDate: null,
  updatedDate: null,
  lastModifiedDate: null,
};
