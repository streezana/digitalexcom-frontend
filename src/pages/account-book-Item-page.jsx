import React from "react"
import { paths } from "../paths"
import { useNavigate, Link, useParams } from "react-router-dom"
import axios from "axios"
import "../style/loginregpage.css"
import { toast } from 'react-toastify'
//const navigate = useNavigate()

const deleteHandler = async (idBook) => {
  console.log('Book deleted - '+idBook)
try {
    await axios.delete(`https://hopnextgames-api.onrender.com/api/books/${idBook}`)
    return (
/*       navigate(`${paths.account}/${tokenUserId}`), */
      toast('Книга успешно удалена'),
      console.log('Книга успешно удалена')
      )
  } catch(error){
      console.log(error);
  }
}

const BooksItemAccount = ({
  _id = "",
  title = "",
  description = "",
  content = "",
  notes = "",
}) => {
  return (
    // <div className="result">
    //    <div>
<>
          <div className="rowbut">
            <Link to={`${paths.books}/${_id}`}>
              <h3>{title.substr(0, 100) + '.. '}</h3>
            </Link>
          </div>
          <div className="rowbar">
            {/* <button type="button" className="lowerbuttons" onClick={() => navigate(`${paths.edit}/${_id}`)} style={{ width: 'auto' }}><h5>Редактировать книгу</h5></button> */}
            <Link to={`${paths.edit}/${_id}`}>
            <button type="button" className="lowerbuttons" style={{ width: 'auto' }}><h5>Редактировать книгу</h5></button>
            </Link>

            <button type="button" className="lowerbuttons" onClick={() => deleteHandler(_id)} style={{ width: 'auto', float: 'right' }}><h5>Удалить книгу</h5></button>
          </div>
      
     <h5>{description.substr(0,220)+'.. '}</h5>
         <h4>{content.substr(0,250)+'.. '}</h4>

<div className="row">
 <div className="inputfields">
  <div className="buttonsleft">
  <input id="checkbox" type="checkbox" name="scales" checked={notes ? true : false} readOnly />
  </div>
<h6 style={{ float: 'left' }}>{notes ? "Черновик" : 'Книга опубликована на главной странице'}</h6>
</div>
</div>
</>
    //  </div>
    // </div>
  )
}
export default BooksItemAccount

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
