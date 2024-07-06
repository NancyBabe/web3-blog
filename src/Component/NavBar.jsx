import {useState} from 'react'
import{BsBlockquoteRight} from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import {Link, useNavigate} from 'react-router-dom'
import {signOut} from 'firebase/auth'
import {auth} from '../Firebase/Firebaseconfig'


const NavBar = ({isAuth, setisAuth}) => {

         const navigate =useNavigate();

         let Links = [
                  {name:" Admin Dashboard", links:"/"},
                  //{name:"MESSAGES",link:"/"},
                  {name:"Post", link:"/post"},
         ];
         
         //toggling
         const [open,setOpen]=useState(false);
         const handleClose = () => {
                  setOpen(!open)
         }


         //signOut btn
         //const signUserOut = () =>{
                 // signUserOut(auth).then(() =>{
                           //localStorage.clear()
                           //setisAuth(false)
                           //navigate('/login')
                  //})
        // }

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-6 md:px-10 px-7">

         <div className="font-bold text-3xl cursor-pointer flex items-center font-[Poppins] text-indigo-800">
                  <span className="text-3xl text-indigo-600 mr-1 pt-2"></span>
                  <Link to='/'>WEB3 BLOG </Link>
         </div>

         <div onClick={() => setOpen(!open)} className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
                  {open ? <AiOutlineClose/> : <BsBlockquoteRight/>}
         </div>

        <ul className={`md:flex md:items-center  md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1]left-0 w-full
         md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`} onClick={handleClose}>
                  {
                           Links.map((links) =>(
                                    <li key ={links.name} className='md:ml-8 text-xl md:my-0 my-7' >
                                     <Link to ={links.link} className='text-black-800 hover:text-black-400 duration-500'>{links.name}</Link>
                                    </li>
                           ))
                  }
                {!isAuth ? (   <Link to= '/login'> <button className='bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500'>Login</button> </Link> ) : (

                           <button  className='bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500'>Logout</button>
                )}
         </ul> 

      </div>
    </div>
  )
}

export default NavBar
