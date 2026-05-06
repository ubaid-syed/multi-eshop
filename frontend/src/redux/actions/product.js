// import axios from "axios";
// import { server } from "../../server";

// // create product
// export const createProduct =
//   (
//     name,
//     description,
//     category,
//     tags,
//     originalPrice,
//     discountPrice,
//     stock,
//     shopId,
//     images,
//   ) =>
//   async (dispatch) => {
//     try {
//       dispatch({
//         type: "productCreateRequest",
//       });

//       const { data } = await axios.post(
//         `${server}/product/create-product`,
//         name,
//         description,
//         category,
//         tags,
//         originalPrice,
//         discountPrice,
//         stock,
//         shopId,
//         images,
//       );
//       dispatch({
//         type: "productCreateSuccess",
//         payload: data.product,
//       });
//     } catch (error) {
//       dispatch({
//         type: "productCreateFail",
//         payload: error.response.data.message,
//       });
//     }
//   };

// // get All Products of a shop
// export const getAllProductsShop = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllProductsShopRequest",
//     });

//     const { data } = await axios.get(
//       `${server}/product/get-all-products-shop/${id}`,
//     );
//     dispatch({
//       type: "getAllProductsShopSuccess",
//       payload: data.products,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllProductsShopFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

// // delete product of a shop
// export const deleteProduct = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "deleteProductRequest",
//     });

//     const { data } = await axios.delete(
//       `${server}/product/delete-shop-product/${id}`,
//       {
//         withCredentials: true,
//       },
//     );

//     dispatch({
//       type: "deleteProductSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "deleteProductFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

// // get all products
// // export const getAllProducts = () => async (dispatch) => {
// //   try {
// //     dispatch({
// //       type: "getAllProductsRequest",
// //     });

// //     const { data } = await axios.get(`${server}/product/get-all-products`);
// //     dispatch({
// //       type: "getAllProductsSuccess",
// //       payload: data.products,
// //     });
// //   } catch (error) {
// //     dispatch({
// //       type: "getAllProductsFailed",
// //       payload: error.response.data.message,
// //     });
// //   }
// // };
// export const getAllProducts =
//   (page = 1, limit = 10) =>
//   async (dispatch) => {
//     try {
//       dispatch({
//         type: "getAllProductsRequest",
//       });

//       const { data } = await axios.get(
//         `${server}/product/get-all-products?page=${page}&limit=${limit}`,
//       );

//       dispatch({
//         type: "getAllProductsSuccess",
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: "getAllProductsFailed",
//         payload: error.response.data.message,
//       });
//     }
//   };

import axios from "axios";
import { server } from "../../server";

// ===============================
// CREATE PRODUCT
// ===============================
export const createProduct =
  (
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images,
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: "productCreateRequest" });

      const { data } = await axios.post(`${server}/product/create-product`, {
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images,
      });

      dispatch({
        type: "productCreateSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "productCreateFail",
        payload: error.response.data.message,
      });
    }
  };

// ===============================
// GET SHOP PRODUCTS (PAGINATED)
// ===============================
export const getAllProductsShop =
  (id, page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch({ type: "getAllProductsShopRequest" });

      const { data } = await axios.get(
        `${server}/product/get-all-products-shop/${id}?page=${page}&limit=${limit}`,
      );

      dispatch({
        type: "getAllProductsShopSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "getAllProductsShopFailed",
        payload: error.response.data.message,
      });
    }
  };

// ===============================
// DELETE PRODUCT
// ===============================
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      { withCredentials: true },
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

// ===============================
// GET ALL PRODUCTS (PAGINATED)
// ===============================
export const getAllProducts =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch({ type: "getAllProductsRequest" });

      const { data } = await axios.get(
        `${server}/product/get-all-products?page=${page}&limit=${limit}`,
      );

      dispatch({
        type: "getAllProductsSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "getAllProductsFailed",
        payload: error.response.data.message,
      });
    }
  };
