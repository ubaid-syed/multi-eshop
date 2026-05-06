// import { Button } from "@material-ui/core";
// import { DataGrid } from "@material-ui/data-grid";
// import React, { useEffect } from "react";
// import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { getAllProductsShop } from "../../redux/actions/product";
// import { deleteProduct } from "../../redux/actions/product";
// import Loader from "../Layout/Loader";

// const AllProducts = () => {
//   const { products, isLoading } = useSelector((state) => state.products);
//   const { seller } = useSelector((state) => state.seller);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllProductsShop(seller._id));
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     dispatch(deleteProduct(id));
//     window.location.reload();
//   };

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
//     {
//       field: "Delete",
//       flex: 0.8,
//       minWidth: 120,
//       headerName: "",
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <>
//             <Button onClick={() => handleDelete(params.id)}>
//               <AiOutlineDelete size={20} />
//             </Button>
//           </>
//         );
//       },
//     },
//   ];

//   const row = [];

//   products &&
//     products.forEach((item) => {
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
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="w-full mx-8 pt-1 mt-10 bg-white">
//           <DataGrid
//             rows={row}
//             columns={columns}
//             pageSize={10}
//             disableSelectionOnClick
//             autoHeight
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default AllProducts;

import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop, deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";

const AllProducts = () => {
  const dispatch = useDispatch();

  const { products, pagination, isLoading } = useSelector(
    (state) => state.products,
  );

  const { seller } = useSelector((state) => state.seller);

  // ===============================
  // SERVER SIDE PAGINATION STATE
  // ===============================
  const [page, setPage] = useState(0); // DataGrid starts from 0
  const limit = 10;

  // ===============================
  // FETCH DATA FROM BACKEND
  // ===============================
  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProductsShop(seller._id, page + 1, limit));
    }
  }, [dispatch, seller, page]);

  // ===============================
  // DELETE PRODUCT
  // ===============================
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  // ===============================
  // TABLE COLUMNS
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

    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.id)}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  // ===============================
  // ROW DATA
  // ===============================
  const rows =
    products?.map((item) => ({
      id: item._id,
      name: item.name,
      price: "US$ " + item.discountPrice,
      Stock: item.stock,
      sold: item?.sold_out,
    })) || [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={limit}
            rowCount={pagination?.totalProducts || 0}
            // ⭐ IMPORTANT: SERVER SIDE MODE
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
