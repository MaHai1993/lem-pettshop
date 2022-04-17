import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { ICustomer, defaultValue } from 'app/shared/model/customer.model';
import { IQueryParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';

const initialState = {
  loading: false,
  errorMessage: null,
  customers: [] as ReadonlyArray<ICustomer>,
  customer: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
};

const getAllOrder = 'api/customer/get-all-customer';
const findCustomer = 'api/customer/find-customer';
const creatCustomer = 'api/customer/create';
const updateCustomerById = 'api/customer/update';
const deleteCustomerById = 'api/customer';

// Async Actions
export const getCustomers = createAsyncThunk('customerManagement/fetch_customers', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${getAllOrder}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return axios.get<ICustomer[]>(requestUrl);
});

// export const getUsersAsAdmin = createAsyncThunk('customerManagement/fetch_users_as_admin', async ({ page, size, sort }: IQueryParams) => {
//   const requestUrl = `${updateCustomerById}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
//   return axios.get<ICustomer[]>(requestUrl);
// });

// export const getRoles = createAsyncThunk('customerManagement/fetch_roles', async () => {
//   return axios.get<any[]>(`api/authorities`);
// });

export const getCustomer = createAsyncThunk(
  'customerManagement/fetch_customer',
  async (id: string) => {
    const requestUrl = `${findCustomer}/${id}`;
    return axios.get<ICustomer>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createCustomer = createAsyncThunk(
  'customerManagement/create_customer',
  async (customer: ICustomer, thunkAPI) => {
    return await axios.post<ICustomer>(creatCustomer, customer);
    // thunkAPI.dispatch(getUsersAsAdmin({}));
    // return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateCustomer = createAsyncThunk(
  'customerManagement/update_customer',
  async (customer: ICustomer, thunkAPI) => {
    return await axios.put<ICustomer>(updateCustomerById, customer);
    // thunkAPI.dispatch(getUsersAsAdmin({}));
    // return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteCustomer = createAsyncThunk(
  'customerManagement/delete_customer',
  // async (id: string, thunkAPI) => {
  async (id: string, thunkAPI) => {
    const requestUrl = `${deleteCustomerById}/${id}`;
    return await axios.delete<ICustomer>(requestUrl);
    // thunkAPI.dispatch(getUsersAsAdmin({}));
    // return result;
  },
  { serializeError: serializeAxiosError }
);

export type CustomerManagementState = Readonly<typeof initialState>;

export const CustomerManagementSlice = createSlice({
  name: 'customerManagement',
  initialState: initialState as CustomerManagementState,
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
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload.data;
      })
      .addCase(deleteCustomer.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.customer = defaultValue;
      })
      .addMatcher(isFulfilled(getCustomers), (state, action) => {
        state.loading = false;
        state.customers = action.payload.data;
        state.totalItems = parseInt(action.payload.headers['x-total-count'], 10);
      })
      .addMatcher(isFulfilled(createCustomer, updateCustomer), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.customer = action.payload.data;
      })
      .addMatcher(isPending(getCustomers, getCustomer), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createCustomer, updateCustomer, deleteCustomer), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      })
      // .addMatcher(isRejected(getOrders, getOrder, getRoles, createOrder, updateOrder, deleteCustomer), (state, action) => {
      .addMatcher(isRejected(getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset } = CustomerManagementSlice.actions;

// Reducer
export default CustomerManagementSlice.reducer;
