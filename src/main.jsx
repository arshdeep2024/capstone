import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
// import Home from './components/HomeSecond/Home.jsx'
import Login from './components/account/Login.jsx'
import Register from './components/account/Register.jsx'
import Logout from './components/account/Logout.jsx'
import Cart from './components/Cart/Cart.jsx'
import Shop from './components/Shop/Shop.jsx'
import Home from './components/Home/Home.jsx'
// import Test from './components/Test.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route path='' element={<Home />} />
      <Route path='/shop' element={<Shop />}/>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='logout' element={<Logout />} />
      <Route path='cart' element={<Cart />} />
      {/* <Route path='shop' element={<Shop />} /> */}
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
