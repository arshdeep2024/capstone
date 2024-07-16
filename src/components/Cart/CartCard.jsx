import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { purchaseItem, removeFromCart } from '../store/authSlice'
import { useDispatch } from 'react-redux'

function CartCard({
    itemName,
    price,
    img,
    itemId,
}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let userId = null;

    let loggedIn = useSelector((state) => (state.auth.active))
    try {
        userId = useSelector((state) => (state.auth.userData.$id))
    } catch (error) {
        console.log("CartCard.jsx :: User not logged in")
    }

    // console.log("itemName: ", itemName)

    const handlePurchase = async () => {
        try {
            const date = new Date()
            let number = Math.round((Math.random() * 7) + 3)
            date.setDate(date.getDate() + number)
            await authService.placeOrder({ itemName, itemId, userId, deliveryBy: date, delivered: false, price })
            dispatch(purchaseItem([`itemName: ${itemName}`, `itemId: ${itemId}`, `userId: ${userId}`, `Will be delivered by: ${date.toDateString()}`, `delivered: false`, `price: ${price}`]))
            dispatch(removeFromCart({itemId})) 
            console.log("Purchase Successful")
        } catch (error) {
            console.log("Card.jsx :: handlePurchase :: error ", error)
        }
    }


    return (
        <div className='w-full p-2'>
            <div className='flex flex-row justify-around flex-wrap items-center py-5 border-2 border-red-600 bg-[rgb(118,153,231)] rounded-lg'>
                <div className='flex items-center w-1/5'>
                    <img src={img} alt="Item Photo" className='rounded-lg'/>
                    <div className='py-5 px-10'>
                        <p className='text-xl text-white'>{itemName}</p>
                        <p className='text-xl text-white'>₹{price}</p>
                    </div>
                </div>
                <button
                    onClick={handlePurchase}
                    className='bg-green-500 p-2 rounded-lg hover:scale-105 hover:bg-green-600'
                >Buy Now
                </button>
            </div>
        </div>
    )
}

export default CartCard