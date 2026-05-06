// import axios from "axios";
// import { server } from "../../server";

// // get all orders of user
// export const getAllOrdersOfUser = (userId) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllOrdersUserRequest",
//     });

//     const { data } = await axios.get(
//       `${server}/order/get-all-orders/${userId}`
//     );

//     dispatch({
//       type: "getAllOrdersUserSuccess",
//       payload: data.orders,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllOrdersUserFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

// // get all orders of seller
// export const getAllOrdersOfShop = (shopId) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllOrdersShopRequest",
//     });

//     const { data } = await axios.get(
//       `${server}/order/get-seller-all-orders/${shopId}`
//     );

//     dispatch({
//       type: "getAllOrdersShopSuccess",
//       payload: data.orders,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllOrdersShopFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

// // get all orders of Admin
// export const getAllOrdersOfAdmin = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "adminAllOrdersRequest",
//     });

//     const { data } = await axios.get(`${server}/order/admin-all-orders`, {
//       withCredentials: true,
//     });

//     dispatch({
//       type: "adminAllOrdersSuccess",
//       payload: data.orders,
//     });
//   } catch (error) {
//     dispatch({
//       type: "adminAllOrdersFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

import axios from "axios";
import { server } from "../../server";

// ===============================
// GET ALL ORDERS OF USER
// ===============================
export const getAllOrdersOfUser =
  (userId, page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "getAllOrdersUserRequest",
      });

      const { data } = await axios.get(
        `${server}/order/get-all-orders/${userId}?page=${page}&limit=${limit}`,
      );

      dispatch({
        type: "getAllOrdersUserSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "getAllOrdersUserFailed",
        payload: error.response.data.message,
      });
    }
  };

// ===============================
// GET ALL ORDERS OF SHOP (SELLER)
// ===============================
export const getAllOrdersOfShop =
  (shopId, page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "getAllOrdersShopRequest",
      });

      const { data } = await axios.get(
        `${server}/order/get-seller-all-orders/${shopId}?page=${page}&limit=${limit}`,
      );

      dispatch({
        type: "getAllOrdersShopSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "getAllOrdersShopFailed",
        payload: error.response.data.message,
      });
    }
  };

// ===============================
// GET ALL ORDERS (ADMIN)
// ===============================
export const getAllOrdersOfAdmin =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "adminAllOrdersRequest",
      });

      const { data } = await axios.get(
        `${server}/order/admin-all-orders?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        },
      );

      dispatch({
        type: "adminAllOrdersSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "adminAllOrdersFailed",
        payload: error.response.data.message,
      });
    }
  };
