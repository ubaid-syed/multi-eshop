// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import Footer from "../components/Layout/Footer";
// import Header from "../components/Layout/Header";
// import Loader from "../components/Layout/Loader";
// import ProductCard from "../components/Route/ProductCard/ProductCard";
// import styles from "../styles/styles";

// const ProductsPage = () => {
//   const [searchParams] = useSearchParams();
//   const categoryData = searchParams.get("category");
//   const {allProducts,isLoading} = useSelector((state) => state.products);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     if (categoryData === null) {
//       const d = allProducts;
//       setData(d);
//     } else {
//       const d =
//       allProducts && allProducts.filter((i) => i.category === categoryData);
//       setData(d);
//     }
//     //    window.scrollTo(0,0);
//   }, [allProducts]);

//   return (
//   <>
//   {
//     isLoading ? (
//       <Loader />
//     ) : (
//       <div>
//       <Header activeHeading={3} />
//       <br />
//       <br />
//       <div className={`${styles.section}`}>
//         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
//           {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
//         </div>
//         {data && data.length === 0 ? (
//           <h1 className="text-center w-full pb-[100px] text-[20px]">
//             No products Found!
//           </h1>
//         ) : null}
//       </div>
//       <Footer />
//     </div>
//     )
//   }
//   </>
//   );
// };

// export default ProductsPage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import { getAllProducts } from "../redux/actions/product";

const ProductsPage = () => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");

  const { allProducts, pagination, isLoading } = useSelector(
    (state) => state.products,
  );

  const [page, setPage] = useState(1);

  // Load products whenever page changes
  useEffect(() => {
    dispatch(getAllProducts(page, 10));
  }, [dispatch, page]);

  // useEffect(() => {
  //   console.log("========== PRODUCTS DEBUG ==========");
  //   console.log("Page:", page);
  //   console.log("Products length:", allProducts?.length);
  //   console.log("Pagination:", pagination);
  //   console.log("Sample product:", allProducts?.[0]);
  //   console.log("====================================");
  // }, [allProducts, page, pagination]);
  // filter by category (client side)
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!categoryData) {
      setData(allProducts);
    } else {
      const filtered =
        allProducts && allProducts.filter((i) => i.category === categoryData);

      setData(filtered);
    }
  }, [allProducts, categoryData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <br />

          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 xl:grid-cols-5 mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>

            {data && data.length === 0 && (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No products Found!
              </h1>
            )}

            {/* ================= PAGINATION ================= */}
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

          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
