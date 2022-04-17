export interface IProduct {
  id?: any;
  name?: string;
  note?: string;
  items?: any[];
  quantity?: number;
  price?: number;
  totalPrice?: number;
  createdBy?: string;
  lastModifiedBy?: string;
  createdDate?: Date | null;
  updatedDate?: Date | null;
  lastModifiedDate?: Date | null;
}

export const defaultValue: Readonly<IProduct> = {
  id: '',
  name: '',
  note: '',
  quantity: 0,
  price: 0,
  totalPrice: 0,
  lastModifiedBy: '',
  createdBy: '',
  items: [],
  createdDate: null,
  updatedDate: null,
  lastModifiedDate: null,
};
