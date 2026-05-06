// import { Button } from "@material-ui/core";
// import { DataGrid } from "@material-ui/data-grid";
// import React, { useEffect } from "react";
// import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { getAllProductsShop } from "../../redux/actions/product";
// import { deleteProduct } from "../../redux/actions/product";
// import Loader from "../Layout/Loader";
// import axios from "axios";
// import { server } from "../../server";
// import { useState } from "react";

// const AllProducts = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get(`${server}/product/admin-all-products`, {withCredentials: true}).then((res) => {
//         setData(res.data.products);
//     })
//   }, []);

//   const columns = [
//     { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
//     {
//       field: "name",
//       headerName: "Name",
//       minWidth: 180,
//       flex: 1.4,
//     },
//     {
//       field: "price",
//       headerName: "Price",
//       minWidth: 100,
//       flex: 0.6,
//     },
//     {
//       field: "Stock",
//       headerName: "Stock",
//       type: "number",
//       minWidth: 80,
//       flex: 0.5,
//     },

//     {
//       field: "sold",
//       headerName: "Sold out",
//       type: "number",
//       minWidth: 130,
//       flex: 0.6,
//     },
//     {
//       field: "Preview",
//       flex: 0.8,
//       minWidth: 100,
//       headerName: "",
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={`/product/${params.id}`}>
//               <Button>
//                 <AiOutlineEye size={20} />
//               </Button>
//             </Link>
//           </>
//         );
//       },
//     },
//   ];

//   const row = [];

//   data &&
//   data.forEach((item) => {
//       row.push({
//         id: item._id,
//         name: item.name,
//         price: "US$ " + item.discountPrice,
//         Stock: item.stock,
//         sold: item?.sold_out,
//       });
//     });

//   return (
//     <>
//         <div className="w-full mx-8 pt-1 mt-10 bg-white">
//           <DataGrid
//             rows={row}
//             columns={columns}
//             pageSize={10}
//             disableSelectionOnClick
//             autoHeight
//           />
//         </div>
//     </>
//   );
// };

// export default AllProducts;

import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import Loader from "../Layout/Loader";

const AllProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // PAGINATION STATE
  // ===============================
  const [page, setPage] = useState(0); // DataGrid starts from 0
  const limit = 10;
  const [total, setTotal] = useState(0);

  // ===============================
  // FETCH ADMIN PRODUCTS (CHUNKED)
  // ===============================
  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `${server}/product/admin-all-products?page=${page + 1}&limit=${limit}`,
        { withCredentials: true },
      )
      .then((res) => {
        setData(res.data.products);
        setTotal(res.data.pagination.totalProducts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  // ===============================
  // COLUMNS
  // ===============================
  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },

    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/product/${params.id}`}>
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  // ===============================
  // ROW DATA
  // ===============================
  const rows =
    data?.map((item) => ({
      id: item._id,
      name: item.name,
      price: "US$ " + item.discountPrice,
      Stock: item.stock,
      sold: item?.sold_out,
    })) || [];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={limit}
            rowCount={total}
            // ===============================
            // SERVER SIDE PAGINATION
            // ===============================
            paginationMode="server"
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllProducts;
