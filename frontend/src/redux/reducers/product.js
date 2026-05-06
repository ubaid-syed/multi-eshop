// // import { createReducer } from "@reduxjs/toolkit";

// // const initialState = {
// //   isLoading: true,
// // };

// // export const productReducer = createReducer(initialState, {
// //   productCreateRequest: (state) => {
// //     state.isLoading = true;
// //   },
// //   productCreateSuccess: (state, action) => {
// //     state.isLoading = false;
// //     state.product = action.payload;
// //     state.success = true;
// //   },
// //   productCreateFail: (state, action) => {
// //     state.isLoading = false;
// //     state.error = action.payload;
// //     state.success = false;
// //   },

// //   // get all products of shop
// //   getAllProductsShopRequest: (state) => {
// //     state.isLoading = true;
// //   },
// //   getAllProductsShopSuccess: (state, action) => {
// //     state.isLoading = false;
// //     state.products = action.payload;
// //   },
// //   getAllProductsShopFailed: (state, action) => {
// //     state.isLoading = false;
// //     state.error = action.payload;
// //   },

// //   // delete product of a shop
// //   deleteProductRequest: (state) => {
// //     state.isLoading = true;
// //   },
// //   deleteProductSuccess: (state, action) => {
// //     state.isLoading = false;
// //     state.message = action.payload;
// //   },
// //   deleteProductFailed: (state, action) => {
// //     state.isLoading = false;
// //     state.error = action.payload;
// //   },

// //   // get all products
// //   getAllProductsRequest: (state) => {
// //     state.isLoading = true;
// //   },
// //   getAllProductsSuccess: (state, action) => {
// //     state.isLoading = false;
// //     state.allProducts = action.payload;
// //   },
// //   getAllProductsFailed: (state, action) => {
// //     state.isLoading = false;
// //     state.error = action.payload;
// //   },

// //   clearErrors: (state) => {
// //     state.error = null;
// //   },
// // });

// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//   isLoading: true,
//   allProducts: [],
//   pagination: {},
//   products: [],
//   product: null,
//   error: null,
//   success: false,
//   message: null,
// };

// export const productReducer = createReducer(initialState, {
//   // CREATE PRODUCT
//   productCreateRequest: (state) => {
//     state.isLoading = true;
//   },
//   productCreateSuccess: (state, action) => {
//     state.isLoading = false;
//     state.product = action.payload;
//     state.success = true;
//   },
//   productCreateFail: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//     state.success = false;
//   },

//   // GET ALL PRODUCTS OF SHOP
//   getAllProductsShopRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAllProductsShopSuccess: (state, action) => {
//     state.isLoading = false;
//     state.products = action.payload;
//   },
//   getAllProductsShopFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },

//   // DELETE PRODUCT
//   deleteProductRequest: (state) => {
//     state.isLoading = true;
//   },
//   deleteProductSuccess: (state, action) => {
//     state.isLoading = false;
//     state.message = action.payload;
//   },
//   deleteProductFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },

//   // ✅ GET ALL PRODUCTS (PAGINATION FIXED)
//   getAllProductsRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAllProductsSuccess: (state, action) => {
//     state.isLoading = false;
//     state.allProducts = action.payload.products; //  chunked data
//     state.pagination = action.payload.pagination; //  pagination info
//   },
//   getAllProductsFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },

//   // CLEAR ERROR
//   clearErrors: (state) => {
//     state.error = null;
//   },
// });

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  allProducts: [],
  products: [],
  product: null,
  pagination: {},
  error: null,
  success: false,
  message: null,
};

export const productReducer = createReducer(initialState, {
  // ===============================
  // CREATE PRODUCT
  // ===============================
  productCreateRequest: (state) => {
    state.isLoading = true;
  },
  productCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  productCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // ===============================
  // SHOP PRODUCTS
  // ===============================
  getAllProductsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload.products;
    state.pagination = action.payload.pagination;
  },
  getAllProductsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // ===============================
  // DELETE PRODUCT
  // ===============================
  deleteProductRequest: (state) => {
    state.isLoading = true;
  },
  deleteProductSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteProductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // ===============================
  // ALL PRODUCTS (PAGINATED)
  // ===============================
  getAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload.products;
    state.pagination = action.payload.pagination;
  },
  getAllProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // ===============================
  // CLEAR ERROR
  // ===============================
  clearErrors: (state) => {
    state.error = null;
  },
});
