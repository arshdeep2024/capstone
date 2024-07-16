import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Input from '../Input'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'

function Register() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()

    const signup = async (data) => {
      console.log(data)
      try {
        if (data) {
          const name = data.name
          const password = data.password
          const email = data.email
          const userData = await authService.createAccount({name, password, email})
          if (userData) {
            dispatch(login(userData))
            navigate('/')
          }
        }
      } catch (error) {
        console.log("Register.jsx :: error :: ", error)
      }
    }
    
  return (
    <div className='flex justify-center items-center h-screen'>
        <form 
        onSubmit={handleSubmit(signup)}
        className='w-fit px-5 py-10 bg-gray-700 shadow-lg rounded-lg shadow-gray-400 h-fit'>
            <p className='text-white text-2xl font-bold underline mx-auto w-fit pb-5'>Register</p>
            <div>
                <Input 
                // label="Name" 
                placeholder="Name"
                {...register("name", {
                  required: true,
                })} />
            </div>
            <div>
                <Input 
                // label="Email" 
                placeholder="Email"
                {...register("email", {
                  required: true,
                  matchPattern: (value) => /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(value) || "Email address must be a valid address"
                })} />
            </div>
            <div>
                <Input 
                // label="Password" 
                placeholder="Password"
                {...register("password", {
                  required: true,
                })} />
            </div>
            <div className='flex justify-center'>
                <button 
                    className='bg-yellow-600 p-2 rounded-lg hover:scale-105 hover:bg-yellow-700'
                >
                    Register
                </button>
            </div>
        </form>
    </div>
  )
}

export default Register