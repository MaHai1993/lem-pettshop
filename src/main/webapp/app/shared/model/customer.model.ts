export interface ICustomer {
  id?: any;
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  note?: string;
  userType?: string;
  buyTime?: number;
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
  lastModifiedBy: '',
  createdBy: '',
  userType: '',
  createdDate: null,
  updatedDate: null,
  lastModifiedDate: null,
};
