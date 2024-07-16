import React from 'react'
import CartCard from './CartCard'
import { useSelector } from 'react-redux'

function Cart() {
  const cartItems = useSelector(state => state.auth.cart)
  
  return (
    <div className='text-black flex flex-wrap w-full '>
      {
        cartItems.length > 0 ? (cartItems.map((item) => {
            console.log("item : ", item)
            return <CartCard
            className='w-full bg-gray-600 text-black text-xl border-gray-500 p-5 m-5 shadow-sm'
            key={item[1]}
            itemName={item[0]}
            img={item[4]}
            itemId={item[1]}
            price={item[3]}
            />
        })) : <h1 className='text-black text-2xl mx-auto py-5'>Add some items to your cart first!</h1>
      }
    </div>
  )
}

export default Cart