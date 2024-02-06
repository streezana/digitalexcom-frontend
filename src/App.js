import React from "react"
import './style/redgreenblue.css'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import { HomePage } from "./pages/home-page"
import { paths } from "./paths"
import Navbar from "./components/navbar/Navbar"
import { CreateNewUser } from "./pages/register-user-page"
import { LoginUser } from "./pages/login-user-page"
import { GamePage } from "./pages/game-page"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CreateBookPage } from "./pages/create-book"
import { AllBooksPageDB } from "./pages/all-books-page-db"
import { BookPage } from "./pages/one-book"
import { EditBookPage } from "./pages/edit-book"
import { PersonalAccount } from "./pages/account-page"
import { DevelopmentPage } from "./pages/page-in-development"


function App() {
  return (
    <BrowserRouter>
    <div className='wrapper'> 
        <Navbar />
        <Routes>
          <Route path={paths.home} element={<HomePage />} />
          <Route path={paths.register} element={<CreateNewUser />} />
          <Route path={paths.login} element={<LoginUser />} />
          <Route path={paths.game} element={<GamePage />} />
          <Route path={paths.books} element={<AllBooksPageDB />} />
          <Route path={`${paths.books}/:id`} element={<BookPage />} /> 

          <Route path={paths.bookcreate} element={<CreateBookPage />} />
          <Route path={`${paths.edit}/:id`} element={<EditBookPage />} />
          <Route path={`${paths.account}/:id`} element={<PersonalAccount />} />
          <Route path={paths.developmentpage} element={<DevelopmentPage />} />
          
        </Routes>
        <Outlet />
        </div>
        <ToastContainer position='bottom-right' />
    </BrowserRouter>
  );
}
export default App
