import React, { lazy, Suspense } from 'react'
import './style/redgreenblue.css'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
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
import { DevelopmentPage } from "./pages/page-in-development"
import { HomePage } from './pages/home-page'
import { PersonalAccount } from './pages/account-page'
// const HomePage = lazy(() => import('./pages/home-page'))
// const PersonalAccount = lazy(() => import('./pages/account-page'))

function App() {
  return (
    <BrowserRouter>
    <div className='wrapper'> 
        <Navbar />
        {/* <Suspense fallback={<div className="title"><h3>Loading...</h3></div>}> */}
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
        {/* </Suspense> */}
        <Outlet />
        </div>
        <ToastContainer position='bottom-right' />
    </BrowserRouter>
  );
}
export default App