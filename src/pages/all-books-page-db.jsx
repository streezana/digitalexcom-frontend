import React, { useState, useEffect, lazy, Suspense } from "react"
import { Link } from "react-router-dom"
import { paths } from "../paths"
import axios from "axios"
// import {BookItem} from "./book-Item"
const BookItem = lazy(() => import('./book-Item'))

export const AllBooksPageDB = () => {
  const [books, setBooks] = useState([])
 
  useEffect(()=> {
        const fetchBooks = async () => {
             return await axios.get(`https://hopnextgames-api.onrender.com/api/books`)
              .then(res => res.data)
              .then(data => setBooks(data))
          };
        fetchBooks();
      }, );
const newBooksArr = books.filter(item => {
        if (!item.notes) return item;
    });
 return (
     <div id="app">
         <div className="create">
             <div id="cont" className="flexContainerRow">

                 {newBooksArr && newBooksArr.map((item) =>
                     <Suspense fallback={<div className="title"><h3>Loading...</h3></div>}>
                         <BookItem key={item._id} {...item} />
                     </Suspense>
                 )}

             </div>
         </div>
     </div>
    )
}