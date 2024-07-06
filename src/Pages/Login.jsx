import {useState} from 'react'
import bg from '../Assets/Btcimage 2.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../Context/AdminContext'

const initialState ={
         email: '',
         password: '',
};


const LogIn = ({setisAuth}) => {


                  const navigate =useNavigate();

                  const [errors, seterrors]  = useState('')
                  const [formValue, setFormValue] = useState(initialState);
                  const {email,password} = formValue;
         
                  //gotten from the context api
                  const {signIn} = UserAuth();
         
                  //targeting the input form
                  const onInputChange = (e)=>{
                           setFormValue({...formValue, [e.target.name]: e.target.value})
         
                   };
                   const handleSubmit = async (e)=>{
                           e.preventDefault();
                                seterrors('')
              
                                try {
                                      await signIn(email,password)
                                     localStorage.setItem('isAuth',true);
                                    setisAuth(true); //setting it to true when signin
                                    navigate('/')
                                     } catch (err) {
                                        seterrors(err.message);
                                         console.log(err.message);
                                     }

                           }          
  return (
         <section className='flex flex-col md:flex-row h-screen items-center'>
         <div className='bg-blue-700 hidden lg:block w-full md:w-1/2 xl:w-1/2 h-screen'>
                  <img src={bg} alt="Bgimage" className='w-full h-full object-cover' />
         </div>

         <div className='bg-white mt-0 w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 
         flex items-center  justify-center'>
                  <div className='w-full h-100 mt-1 block p-6 rounded-lg shadow-lg bg-white'>
                           <h1 className='text-xs mt-[2rem] md:text-xl font-semibold'>Login in your account</h1>
                           <form className='mt-6' onSubmit={handleSubmit}>
                                    {errors && <h2>{errors}</h2>}
                                    <div className='mt-4'>
                                             <label className='block text-gray-700'>Email</label>
                                             <input type="email" placeholder='Enter Email' className='w-full px-4 placeholder-shown:border-gray-500 
                                             py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none' 
                                            autoFocus autoComplete='true'
                                            required
                                            name='email' 
                                            value={email}
                                            onChange={onInputChange} />
                                    </div>
                                    <div className='mt-4'>
                                             <label className='block text-gray-700'>Password</label>
                                             <input type="passwordl" placeholder='Enter Password' className='w-full px-4 placeholder-shown:border-gray-500 
                                             py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none' 
                                            autoFocus autoComplete='true'
                                            required
                                            name='password'
                                            value={password}
                                            onChange={onInputChange} />  
                                    </div>



                                    <button type='submit' className='w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400
                                     text-white font-semibold rounded-lg py-3 mt-6' > Login </button>
                           </form>
                           <p className='mt-2'>Create account? <Link to ='/Signup' className='text-blue-500 hover:text-blue-700
                           font-semibold'>sign up</Link> </p>

                  </div>
         </div>

</section>
  )
}

export default LogIn
