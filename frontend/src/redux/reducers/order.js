// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//   isLoading: true,
// };

// export const orderReducer = createReducer(initialState, {
//   // get all orders of user
//   getAllOrdersUserRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAllOrdersUserSuccess: (state, action) => {
//     state.isLoading = false;
//     state.orders = action.payload;
//   },
//   getAllOrdersUserFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },

//   // get all orders of shop
//   getAllOrdersShopRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAllOrdersShopSuccess: (state, action) => {
//     state.isLoading = false;
//     state.orders = action.payload;
//   },
//   getAllOrdersShopFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },

//   // get all orders for admin
//   adminAllOrdersRequest: (state) => {
//     state.adminOrderLoading = true;
//   },
//   adminAllOrdersSuccess: (state, action) => {
//     state.adminOrderLoading = false;
//     state.adminOrders = action.payload;
//   },
//   adminAllOrdersFailed: (state, action) => {
//     state.adminOrderLoading = false;
//     state.error = action.payload;
//   },

//   clearErrors: (state) => {
//     state.error = null;
//   },
// });

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  adminOrderLoading: false,

  orders: [],
  adminOrders: [],

  pagination: {},
  adminPagination: {},

  error: null,
};

export const orderReducer = createReducer(initialState, {
  // USER ORDERS
  getAllOrdersUserRequest: (state) => {
    state.isLoading = true;
  },
  getAllOrdersUserSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload.orders;
    state.pagination = action.payload.pagination;
  },
  getAllOrdersUserFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // SHOP ORDERS
  getAllOrdersShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllOrdersShopSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload.orders;
    state.pagination = action.payload.pagination;
  },
  getAllOrdersShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // ADMIN ORDERS
  adminAllOrdersRequest: (state) => {
    state.adminOrderLoading = true;
  },
  adminAllOrdersSuccess: (state, action) => {
    state.adminOrderLoading = false;
    state.adminOrders = action.payload.orders;
    state.adminPagination = action.payload.pagination;
  },
  adminAllOrdersFailed: (state, action) => {
    state.adminOrderLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
