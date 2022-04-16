import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { IOrder, defaultValue } from 'app/shared/model/order.model';
import { IQueryParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';

const initialState = {
  loading: false,
  errorMessage: null,
  orders: [] as ReadonlyArray<IOrder>,
  // authorities: [] as any[],
  order: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
};

const getAllOrder = 'api/order/get-all-order';
const findOrder = 'api/order/find-order';
const creatOrder = 'api/order/create';
const updateOrderById = 'api/order/update';
const deleteOrderById = 'api/order/';

// Async Actions
export const getOrders = createAsyncThunk('orderManagement/fetch_orders', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${getAllOrder}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return axios.get<IOrder[]>(requestUrl);
});

// export const getUsersAsAdmin = createAsyncThunk('orderManagement/fetch_users_as_admin', async ({ page, size, sort }: IQueryParams) => {
//   const requestUrl = `${updateOrderById}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
//   return axios.get<IOrder[]>(requestUrl);
// });

// export const getRoles = createAsyncThunk('orderManagement/fetch_roles', async () => {
//   return axios.get<any[]>(`api/authorities`);
// });

export const getOrder = createAsyncThunk(
  'orderManagement/fetch_order',
  async (id: string) => {
    const requestUrl = `${findOrder}/${id}`;
    return axios.get<IOrder>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createOrder = createAsyncThunk(
  'orderManagement/create_order',
  async (order: IOrder, thunkAPI) => {
    return await axios.post<IOrder>(creatOrder, order);
    // thunkAPI.dispatch(getUsersAsAdmin({}));
    // return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateOrder = createAsyncThunk(
  'orderManagement/update_order',
  async (order: IOrder, thunkAPI) => {
    return await axios.put<IOrder>(updateOrderById, order);
    // thunkAPI.dispatch(getUsersAsAdmin({}));
    // return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteOrder = createAsyncThunk(
  'orderManagement/delete_order',
  // async (id: string, thunkAPI) => {
  async (id: string, thunkAPI) => {
    const requestUrl = `${deleteOrderById}/${id}`;
    return await axios.delete<IOrder>(requestUrl);
    // thunkAPI.dispatch(getUsersAsAdmin({}));
    // return result;
  },
  { serializeError: serializeAxiosError }
);

export type OrderManagementState = Readonly<typeof initialState>;

export const OrderManagementSlice = createSlice({
  name: 'orderManagement',
  initialState: initialState as OrderManagementState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      // .addCase(getRoles.fulfilled, (state, action) => {
      //   state.authorities = action.payload.data;
      // })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data;
      })
      .addCase(deleteOrder.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.order = defaultValue;
      })
      .addMatcher(isFulfilled(getOrders), (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
        state.totalItems = parseInt(action.payload.headers['x-total-count'], 10);
      })
      .addMatcher(isFulfilled(createOrder, updateOrder), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.order = action.payload.data;
      })
      .addMatcher(isPending(getOrders, getOrder), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createOrder, updateOrder, deleteOrder), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      })
      // .addMatcher(isRejected(getOrders, getOrder, getRoles, createOrder, updateOrder, deleteOrder), (state, action) => {
      .addMatcher(isRejected(getOrders, getOrder, createOrder, updateOrder, deleteOrder), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset } = OrderManagementSlice.actions;

// Reducer
export default OrderManagementSlice.reducer;
