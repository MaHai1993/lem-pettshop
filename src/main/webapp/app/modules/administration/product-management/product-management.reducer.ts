import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { IProduct, defaultValue } from 'app/shared/model/product.model';
import { IQueryParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';

const initialState = {
  loading: false,
  errorMessage: null,
  products: [] as ReadonlyArray<IProduct>,
  allProducts: [] as ReadonlyArray<IProduct>,
  listProduct: [
    {
      name: '',
      id: 0,
      quantity: 0,
      price: 0,
    },
  ],
  // authorities: [] as any[],
  product: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
};

const getAllOrder = 'api/product/get-all-product';
const getAllProductWithoutPaging = 'api/product/get-all-product-without-paging';
const findProduct = 'api/product/find-product';
const creatProduct = 'api/product/create';
const updateProductById = 'api/product/update';
const deleteProductById = 'api/product';

// Async Actions
export const getProducts = createAsyncThunk('productManagement/fetch_products', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${getAllOrder}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return axios.get<IProduct[]>(requestUrl);
});

// Async Actions
export const getAllProduct = createAsyncThunk('productManagement/fetch_all_products', async () => {
  return axios.get<IProduct[]>(getAllProductWithoutPaging);
});

// export const getUsersAsAdmin = createAsyncThunk('productManagement/fetch_users_as_admin', async ({ page, size, sort }: IQueryParams) => {
//   const requestUrl = `${updateProductById}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
//   return axios.get<IProduct[]>(requestUrl);
// });

// export const getRoles = createAsyncThunk('productManagement/fetch_roles', async () => {
//   return axios.get<any[]>(`api/authorities`);
// });

export const getProduct = createAsyncThunk(
  'productManagement/fetch_product',
  async (id: string) => {
    const requestUrl = `${findProduct}/${id}`;
    return axios.get<IProduct>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createProduct = createAsyncThunk(
  'productManagement/create_product',
  async (product: IProduct, thunkAPI) => {
    return await axios.post<IProduct>(creatProduct, product);
    // thunkAPI.dispatch(getUsersAsAdmin({}));
    // return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateProduct = createAsyncThunk(
  'productManagement/update_product',
  async (product: IProduct, thunkAPI) => {
    return await axios.put<IProduct>(updateProductById, product);
    // thunkAPI.dispatch(getUsersAsAdmin({}));
    // return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteProduct = createAsyncThunk(
  'productManagement/delete_product',
  // async (id: string, thunkAPI) => {
  async (id: string, thunkAPI) => {
    const requestUrl = `${deleteProductById}/${id}`;
    return await axios.delete<IProduct>(requestUrl);
    // thunkAPI.dispatch(getUsersAsAdmin({}));
    // return result;
  },
  { serializeError: serializeAxiosError }
);

export type ProductManagementState = Readonly<typeof initialState>;

export const ProductManagementSlice = createSlice({
  name: 'productManagement',
  initialState: initialState as ProductManagementState,
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
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      })
      .addCase(deleteProduct.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.product = defaultValue;
      })
      .addMatcher(isFulfilled(getProducts), (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.totalItems = parseInt(action.payload.headers['x-total-count'], 10);
      })
      .addMatcher(isFulfilled(getAllProduct), (state, action) => {
        state.loading = false;
        state.allProducts = action.payload.data;
      })
      .addMatcher(isFulfilled(createProduct, updateProduct), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.product = action.payload.data;
      })
      .addMatcher(isPending(getProducts, getProduct, getAllProduct), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createProduct, updateProduct, deleteProduct), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      })
      // .addMatcher(isRejected(getOrders, getOrder, getRoles, createOrder, updateOrder, deleteProduct), (state, action) => {
      .addMatcher(isRejected(getProducts, getAllProduct, getProduct, createProduct, updateProduct, deleteProduct), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset } = ProductManagementSlice.actions;

// Reducer
export default ProductManagementSlice.reducer;
