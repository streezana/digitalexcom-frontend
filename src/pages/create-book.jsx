import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../paths";
import { Input } from "../components/input/input";
import axios from "axios";
import { toast } from 'react-toastify';
import "../style/loginregpage.css";
import {jwtDecode} from 'jwt-decode'

export const CreateBookPage = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState()
  const [bookImage, setBookImage] = useState(null)
  // const [imageBl, setImageBl] = useState(null)
  const [userId, setUserId] = useState()
  const [notes, setNotes] = useState(false)
  const [errTitle, setErrTitle] = useState()
  const [errContent, setErrContent] = useState()
  const [errBookImage, setErrBookImage] = useState()

useEffect(() => {
if (window.localStorage.getItem('token')) {
  try { 
    setUserId(jwtDecode(localStorage.getItem('token')).id)
  } catch(error) {
    console.log('invalid token format')
  }
}
else {
  setStatus('Пожалуйста, войдите или зарегистрируйтесь')
  if (status) { 
  toast(status);
  navigate(paths.login)
  }
}
}, [status])
// useEffect(() => {
// fetch('/static/no_image.jpg')
// .then((res) => res.blob())
// .then((img) => setImageBl(img));
// })
const handleImageFile = (e) => {
setBookImage(e.target.files[0]);
}
const handleCheckbox = () => {
  notes ? setNotes(false) : setNotes(true)
}

const handleSubmit = async (e) => {
e.preventDefault()
let fileName = 'bookImage-' + new Date().getTime() + ".jpg"
const formData = new FormData()
formData.append("title", e.target.elements.title.value.trim())
formData.append("description", e.target.elements.description.value)
formData.append("content", e.target.elements.content.value)
formData.append("bookImage", bookImage, fileName)
// formData.append("bookImage", bookImage || imageBl, fileName);
formData.append("userId", userId)
formData.append("notes", notes)

try {
  const { data } = await axios.post('https://hopnextgames-api.onrender.com/api/books/create', formData)

  if (data.title) {
    setErrTitle(data.title.message)
    console.log(data.title.message)
}
if (data.content) {
  setErrContent(data.content.message)
  console.log(data.content.message) 
}
if (data.bookUnique) {
  setErrTitle(data.bookUnique)
  console.log(data.bookUnique) 
}
if (data.bookImage) {
  setErrBookImage(data.bookImage.message)
  console.log(data.bookImage.message)
}
if (data.success) {
  toast(data.success)
  navigate(`${paths.books}/${data.book._id}`) 
}
  return data
} catch(error){
    console.log(error);
}
};

  return (
    <div className='create'>
<div className="flexContainerRow">

    <form onSubmit={handleSubmit} className='form-book'>
        <h1 className='title'>Страница создания новой книги</h1>

        <Input
          type="file"
          name="bookImage"
          className="form-control"
          placeholder="Выберите изображение"
          onChange={handleImageFile}
        />
        <div className='error'>
          {errBookImage ? errBookImage : null}
        </div>

        <h4 style={{ marginLeft: 40 }}>Название книги</h4>
        <Input
          name="title"
          className="form-control"
          placeholder="Название книги"
        />
        <div className='error'>
        {errTitle ? errTitle : null}
        </div>

        <h4 style={{ marginLeft: 40 }}>Описание</h4>
        <Input
          name="description"
          className="form-control"
          placeholder="Описание книги"
        />

        <h4 style={{ marginLeft: 40 }}>Содержимое</h4>
        <div className="fit-content" >
          <textarea name="content" type="text" placeholder="Введите текст книги"></textarea>
        </div>
        <div className='error'>
        {errContent ? errContent : null}
        </div>

        <div className="inputfields">
        <h4 style={{ marginLeft: 40 }}>Сохранить как черновик</h4>
        <div className="buttonsleft">
          <input id="checkbox" type="checkbox" name="scales" checked={notes ? true : false} onChange={handleCheckbox} placeholder="Снимите галочку, чтобы опубликовать на главной странице"/>
         </div>
         <h6 style={{ float:'left' }}>Уберите галочку, чтобы опубликовать на главной странице</h6>
         </div>

        <div className="buttonCenter">
        <button type={"submit"} className="buttonCont">Готово!</button>
        </div>
      </form>
    
    </div>
    </div>
  )
}
 