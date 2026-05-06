// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import styles from "../../../styles/styles";
// import ProductCard from "../ProductCard/ProductCard";

// const FeaturedProduct = () => {
//   const {allProducts} = useSelector((state) => state.products);

//   return (
//     <div>
//       <div className={`${styles.section}`}>
//         <div className={`${styles.heading}`}>
//           <h1>Featured Products</h1>
//         </div>
//         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
//         {
//             allProducts && allProducts.length !== 0 &&(
//               <>
//                {allProducts && allProducts.map((i, index) => <ProductCard data={i} key={index} />)}
//               </>
//             )
//            }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedProduct;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { getAllProducts } from "../../../redux/actions/product";

const FeaturedProduct = () => {
  const dispatch = useDispatch();

  const { allProducts, pagination } = useSelector((state) => state.products);

  const [page, setPage] = useState(1);

  // Load chunked products
  useEffect(() => {
    dispatch(getAllProducts(page, 10)); // featured = small limit
  }, [dispatch, page]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mb-12 border-0">
          {allProducts &&
            allProducts.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>

        {/* EMPTY STATE */}
        {allProducts && allProducts.length === 0 && (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No Featured Products Found!
          </h1>
        )}

        {/* PAGINATION */}
        {pagination?.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pb-10">
            <button
              disabled={!pagination.hasPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>

            <span>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>

            <button
              disabled={!pagination.hasNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProduct;
