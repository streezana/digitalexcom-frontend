import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { paths } from "../paths"
import axios from "axios"

export const AllBooksPageDB = () => {
  const [books, setBooks] = useState([])
 
  useEffect(()=> {
        const fetchBooks = async () => {
             return await axios.get(`/api/books`)
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

                {newBooksArr && newBooksArr.map((item, index) =>
                    <div className="item" key={index}>
                        <Link to={`${paths.books}/${item._id}`}>
                            <h3>{item.title.substr(0,25)+'.. '}</h3>

                        <div className="frame">
                        <img src={item.bookImage} alt="" />
                        </div>
                        </Link>
                        <h5>{item.content}</h5>

                    </div>
                )}
            </div>
            </div>

        </div>
    )
}