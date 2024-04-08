import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../features/books/booksSlice2";
//import {BookItem} from "./book-Item";
import { useNavigate } from "react-router-dom";
const BookItem = lazy(() => import('./book-Item'))

export const Books = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
      <div className="container">
                
         <div className="row">
         {books && books.map((item) => <BookItem key={item._id} {...item} />)}

        </div>
        </div>
  );
};

// import React from "react";
// import { Books } from "../components/books/books2";

// export const HomePage = () => {
//   return (
//     <React.Fragment>
//       <Books />
//     </React.Fragment>
//   );
// };