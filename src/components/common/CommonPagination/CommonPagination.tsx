import styles from "./CommonPagination.module.scss";
import { NextArrowIcon2, PrevArrowIcon } from "../../../assets/icons/svgicons";
import { Link } from "react-router-dom";

const CommonPagination = (props: any) => {
  const { activePage, itemsCountPerPage, totalItemsCount, pageRangeDisplayed, onChange } = props;
  const totalPages = Math.ceil(totalItemsCount / itemsCountPerPage);

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages >= 5) {
      pages.push(1);

      if (activePage > 3) {
        pages.push('...');
      }

      const startPage = Math.max(2, activePage - 1);
      const endPage = Math.min(totalPages - 1, activePage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (activePage < totalPages - 3) {
        pages.push('...');
      }

      pages.push(totalPages);
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const handlePageClick = (pageNumber: number | string) => {
    if (typeof pageNumber === 'number') {
      onChange(pageNumber);
    }
  };

  return (
    <div className={styles.pagination}>
      <ul className={styles.pagination_list}>
        <li
          className={`${styles.page_item} ${activePage === 1 ? "disabled" : ""}`}
          onClick={() => activePage > 1 && onChange(1)}
        >
          <Link to="">{"<<"}</Link>
        </li>

        <li
          className={`${styles.page_item} ${activePage === 1 ? "disabled" : ""}`}
          onClick={() => activePage > 1 && onChange(activePage - 1)}
        >
          <Link to=""><PrevArrowIcon /></Link>
        </li>
        {getPageNumbers().map((page, index) => (
          <li
            key={index}
            className={`${styles.page_item} ${page === activePage ? "active" : ""}`}
            onClick={() => handlePageClick(page)}
          >
            <Link to="">{page}</Link>
          </li>
        ))}

        <li
          className={`${styles.page_item} ${activePage === totalPages ? "disabled" : ""}`}
          onClick={() => activePage < totalPages && onChange(activePage + 1)}
        >
          <Link to=""><NextArrowIcon2 /></Link>
        </li>

        <li
          className={`${styles.page_item} ${activePage === totalPages ? "disabled" : ""}`}
          onClick={() => activePage < totalPages && onChange(totalPages)}
        >
          <Link to="">{">>"}</Link>
        </li>
      </ul>
    </div>
  );
};

export default CommonPagination;



// import styles from "./CommonPagination.module.scss";
// import { NextArrowIcon2, PrevArrowIcon } from "../../../assets/icons/svgicons";
// import Pagination from "react-js-pagination";

// const CommonPagination = (props: any) => {
//   return (
//     <div className={styles.pagination}>
//       <Pagination
//         activePage={props.activePage}
//         itemsCountPerPage={props.itemsCountPerPage}
//         totalItemsCount={props.totalItemsCount}
//         hideFirstLastPages={false}
//         pageRangeDisplayed={props.pageRangeDisplayed}
//         onChange={props.onChange}
//         prevPageText={<PrevArrowIcon />}
//         nextPageText={<NextArrowIcon2 />}
//       />
//     </div>
//   );
// };

// export default CommonPagination;
