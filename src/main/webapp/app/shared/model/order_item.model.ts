export interface IOrder {
  id?: number;
  quantity?: number;
}

export const defaultValue: Readonly<IOrder> = {
  id: 0,
  quantity: 0,
};
