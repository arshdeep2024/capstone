import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../appwrite/auth'
import { logout } from '../store/authSlice'
import { login } from '../store/authSlice'

function Header() {

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(login(userData))
        }
      } catch (error) {
        console.log("Header.jsx :: no user found")
      }
    }

    checkUser()
  }, [])

  const loggedIn = useSelector(state => state.auth.active)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await authService.logout()
      dispatch(logout({}))
    } catch (error) {
      console.log("Header.jsx :: logout :: error :: ", error)
    }
  }

  return (
    <nav className='text-white bg-orange-600 py-3'>
      <ul className='flex justify-right p-2'>
        <li className='my-auto'><Link to='/' className='bg-blue-600 p-2 mx-2 hover:scale-105 hover:bg-blue-700 rounded-full'>Home</Link>{loggedIn ? (<Link to='/cart' className='bg-blue-600 p-2 rounded-lg mx-2 hover:scale-105 hover:bg-blue-700'>Go to Cart</Link>) : ''}</li>
        <li className=' my-auto'>
          <div>
            {
            loggedIn ? (<button onClick={handleLogout} className='bg-blue-600 p-2 rounded-lg mx-2 hover:scale-105 hover:bg-blue-700 absolute right-5 top-3'>Logout</button>) : (<><Link to='/login' className='bg-blue-600 p-2 rounded-lg mx-2 hover:scale-105 hover:bg-blue-700 absolute right-28 top-3'>Login</Link>
              <Link to='/register' className='bg-blue-600 p-2 rounded-lg mx-2 hover:scale-105 hover:bg-blue-700 absolute right-5 top-3'>Register</Link></>)
            }
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Header