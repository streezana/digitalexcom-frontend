import React from "react";
import { Link } from "react-router-dom"
import { paths } from "../paths"

const BookItemAccount = ({
  _id = "",
  title = "",
  description = "",
  content = "",
  bookImage = "",
}) => {
  return (

    <div className="item">
      <Link to={`${paths.books}/${_id}`}>
        {/* <h3>{item.title.substr(0, 25) + '.. '}</h3> */}
        <h3>{title.substr(0, 25) + '.. '}</h3>

        <div className="frame">
          <img src={bookImage} alt="" />
        </div>
      </Link>
      <h5>{content.substr(0, 156) + '.. '}</h5>
    </div>
  )
}
export default BookItemAccount

// export const BookItem = ({
//   _id = "",
//   name = "",
//   price = "",
//   description = "",
//   bookImage = "",
// }) => {
//   return (

//   <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
//     <div className="card h-100 mb-3">
//     <div className="h-50 d-inline-block table-secondary mx-auto">{ bookImage && <img src={bookImage} className="card-img w-100" alt="" /> }</div> 
//       <div className="card-body bg-light text-dark mb-3">
//       <h6 className="card-title h-25 d-inline-block"><a href={`${paths.api}/${_id}`} className="text-decoration-none text-reset">{name.substr(0,50)}</a></h6>
//       <p className="card-text h-25 d-inline-block">{description.substr(0,70)+'.. '}</p>
//       </div>
//     </div>
//   </div>

//   );
// };
