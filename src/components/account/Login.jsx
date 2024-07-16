import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import authService from '../appwrite/auth'
import { addToCart, login, purchaseItem } from '../store/authSlice'

function Login() {
    const authStatus = useSelector(state => state.auth.active)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleLogin = async(data) => {
        try {
            if (data) {
                const email = data.email
                const password = data.password
                const session = await authService.login({email, password})
                console.log("Session :: ", session)
                if (session) {
                    const userData = await authService.getCurrentUser()
                    if (userData) {
                        console.log("Userdata :: from getCurrentuser :: ", userData)
                        console.log("id : ", userData.$id)
                        retrieveData(userData)
                        navigate('/')
                    }
                }
                console.log('Succesfully Logged in')
            }
        } catch (error) {
            console.log("Login.jsx :: error ", error)
        }
    }

    const retrieveData = async (userData) => {
        // console.log("Inside retrieve : ", userData)
        const cartItems = await authService.getCart(userData.$id)
        const orderedItems = await authService.getOrderedItems(userData.$id)
        dispatch(login(userData))
        // console.log("cartItems : ", cartItems?.documents?.map((item) => (item)))
        const cartItemsNew = cartItems?.documents?.map((item) => (Object.values(item).slice(0, 5)))
        cartItemsNew.filter((item) => item && item.length === 5)
        for (let index = 0; index < cartItemsNew.length; index++) {
            const element = cartItemsNew[index];
            dispatch(addToCart(element))
        }
        // dispatch(addToCart(item))
        for (let index = 0; index < orderedItems.documents.length; index++) {
            const element = orderedItems.documents[index];
            const newElement = Object.values(element)
            const date = new Date(newElement[5])
            const toDispatch = [`itemName: ${newElement[0]}`, `itemId:${newElement[4]}`, `userId: ${userData.$id}`, `Will be delivered by: ${date.toDateString()}`, `delivered?: ${newElement[2]}`, `price: ${newElement[3]}`]
            console.log("newElement : ", newElement)
            console.log("toDispatch : ", toDispatch)
            if (toDispatch && toDispatch.length === 6) {
                dispatch(purchaseItem(toDispatch))
            }
        }
        dispatch(purchaseItem(orderedItems))
    }

    const onError = async (errors) => {
        console.log("Error : ", errors)
    }
    
  return (
    <div className='flex justify-center items-center h-screen'>
        <form onSubmit={handleSubmit(handleLogin, onError)} className='w-fit px-5 py-10 bg-gray-700 shadow-lg rounded-lg shadow-gray-400 h-fit'>
            <div>
                <p className='text-white text-2xl font-bold underline mx-auto w-fit pb-5'>Login</p>
                <Input  
                placeholder="Email"
                {...register("email", {
                    required: true
                })}
                />
            </div>
            <div>
                <Input 
                placeholder="Password" 
                type='password'
                {...register("password", {
                    required: true
                })}/>
            </div>
            <div className='flex justify-center'>
                <button
                type='submit'
                    className='bg-yellow-600 p-2 rounded-lg hover:scale-105 hover:bg-yellow-700'
                >
                    Login
                </button>
            </div>
        </form>
    </div>
  )
}

export default Login