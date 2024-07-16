import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { addToCart } from '../store/authSlice'
import { purchaseItem } from '../store/authSlice'
import './Card.css'

function Card({
    itemId,
    price,
    itemName,
    img
}) {
  let loggedIn = useSelector(state => state.auth.active)
  let userId = useSelector(state => state.auth.userData.$id)
  // console.log("userId : ", userId)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleAdd = async () => {
    if (!loggedIn) {
      navigate('/login')
    } else {
      try {
        alert("Adding, please wait...")
        await authService.addToCart({itemName, itemId, userId, price, img})
        alert("Added to Cart, you can ask Kevin about all items in your cart.")
        dispatch(addToCart([itemName, itemId, userId, price, img]))
      } catch (error) {
        console.log("Card.jsx :: handleAdd :: error ", error)
      }
    }
  }

  const handlePurchase = async () => {
    if (!loggedIn) {
      navigate('/login')
    } else {
      try {
        const date = new Date()
        let number = Math.round((Math.random() * 7) + 3)
        date.setDate(date.getDate() + number)
        alert("Purchasing, please wait...")
        await authService.placeOrder({itemName, itemId, userId, deliveryBy: date.toDateString(), delivered: false, price})
        dispatch(purchaseItem([`itemName: ${itemName}`, `itemId:${itemId}`, `userId: ${userId}`, `Will be delivered by: ${date.toDateString()}`, `delivered?: ${false}`, `price: ${price}`]))
        // console.log("Purchase Successful")
        alert("Purchase Successful, you can ask Kevin about delivery")
      } catch (error) {
        console.log("Card.jsx :: handlePurchase :: error ", error)
      }
    }
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col xs:w-5/6 m-12 bg-blue-200 p-2 rounded-full hover:scale-105 duration-200'>
          <img src={img} alt="image" className='rounded-xl mx-auto xs:w-full m-5' style={{height: 150, width: 150}} />
          <p className='mx-auto text-white'>{itemName}</p>
          <p className='mx-auto text-white'>Price: ₹{price}</p>
          <button 
          onClick={handleAdd}
          className='p-1 bg-white hover:bg-yellow-100 rounded-lg w-fit mx-auto'
          >Add To Cart</button>
          <button
          onClick={handlePurchase}
          className='p-1 m-1 bg-white hover:bg-yellow-100 rounded-lg w-fit mx-auto'
          >Buy Now</button>
        </div>
    </div>
  )
}

export default Card