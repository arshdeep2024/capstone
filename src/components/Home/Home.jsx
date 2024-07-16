import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='flex flex-col items-center h-screen p-16'>
      <p className='text-black text-9xl text-center my-auto'>HOLA!</p>
      <Link to='/shop' className='bg-green-500 rounded-lg mx-2 hover:scale-105 hover:bg-green-600 shadow-lg  m-16  fixed bottom-10 right-9 px-10 py-4 font-bold'>BUY NOW!</Link>
    </div>
  )
}

export default Home