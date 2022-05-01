export interface ICustomer {
  id?: any;
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  note?: string;
  customerType?: string;
  buyTime?: number;
  totalBuy?: string;
  createdBy?: string;
  lastModifiedBy?: string;
  createdDate?: Date | null;
  updatedDate?: Date | null;
  lastModifiedDate?: Date | null;
}

export const defaultValue: Readonly<ICustomer> = {
  id: '',
  name: '',
  note: '',
  email: '',
  phoneNumber: '',
  buyTime: 0,
  totalBuy: '0',
  lastModifiedBy: '',
  createdBy: '',
  customerType: '',
  createdDate: null,
  updatedDate: null,
  lastModifiedDate: null,
};
