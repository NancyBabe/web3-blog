import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {storage, db,auth} from '../Firebase/Firebaseconfig'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { addDoc,collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';


const initialState={
         author: '',
         title: '',
         message: '',
         messagetwo: '',
         messagethree: '',
};


const Posttwo = () => {

         const navigate =useNavigate();
        const {id}= useParams()
        const types=['image/png', 'image/jpeg']; //file type
       const [imgfile, setimgfile] = useState(null);
       const[errors, seterrors] = useState(null);
       const [formValue,setFormValue] = useState(initialState);
       const{author, title,message,messagetwo,messagethree} =formValue;

       //start from here
       useEffect(() =>{
         const upload = ()=>{
                  const name =new Date().getDate() * Math.floor(Math.random() * 2322344454)
                  const storageRef = ref(storage, `BlogImageOne/${imgfile.name + name}`);
                  const uploadTask = uploadBytesResumable(storageRef, imgfile);
         
                  uploadTask.on('state_changed', (snapshot)=>{

                           //progress bar function
                           const progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  }, (err)=>{
                  console.log(err);
                  }, ()=>{
                           getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                                    setFormValue((prev)=>({...prev, imgUrl: url}))
                           })

                  })

         }
         imgfile && upload();
       },[imgfile]);
   
        //targeting the input fields
        const onInputChange = (e)=>{
         setFormValue({...formValue, [e.target.name]: e.target.value})
        }

        //handling the submit functionality
       const handleSubmit = async (e)=>{
         e.preventDefault();

         try {
                  if (imgfile == null ) {
                           seterrors('please select an image file')
                  } else {
                            await addDoc(collection(db,'StelBlogPost'),{
                                    User: {
                                             name: auth.currentUser.displayName,
                                             email: auth.currentUser.email,
                                             id: auth.currentUser.uid
                                      },
                                      ...formValue,
                                      CreatedAt: serverTimestamp()
                                    })
                                    alert('Blog Post successfully')
                                    navigate('/')
                           }
                  
                  }catch (err) {
                           console.log(err);
                  }
                  
                  
 //targeting the input fields
       const onInputChange = (e)=>{
         setFormValue({...formValue, [e.target.name]: e.target.value})
}

       
      //targeting the image file
      const handleChange = (e)=>{
         let selected = e.target.files[0];
         

         if (selected && types.includes(selected.type)) {
                  setimgfile(selected)
                  seterrors('')
         }else{
                  seterrors('Please select an image file (png or jpeg)' )
         }
       }

       

  return (
         <div className='mt-[15vh] flex items-center justify-center'>
         <div className='block p-6 rounded-lg shadow-2xl bg-white w-[100vh]'>
                  <h1 className='text-center font-bold mb-3 text-3xl text-black'>CREATE A BLOG</h1>

                  <div className='form-group mb-6'>
                           <input type="text" className='form-control block w-full px-5 py-2 text-base font-normal
                           text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded 
                           transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            id='exampleInput7' 
                           placeholder='Author'
                           name='author'
                           value={author}
                           onChange={onInputChange}
                           />
                           </div>

                           <div className='form-group mb-6'>
                           <input type="text" className='form-control block w-full px-3 py-1.5 text-base font-normal
                           text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded 
                           transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            id='exampleInput7' 
                           placeholder='Title'
                           name='title'
                           value={title}
                           onChange={onInputChange}
                           />
                           </div>

                           <div className='form-group mb-6'>
                           <input type="text" className='form-control block w-full px-5 py-2 text-base font-normal
                           text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded 
                           transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            id='exampleInput7' 
                           placeholder= 'Paragraph one'
                           name= 'message'
                           value={message}
                           onChange={onInputChange}
                           />
                           </div>

                           <div className='form-group mb-6'>
                           <input type="text" 
                           className='form-control block w-full px-5 py-2 text-base font-normal
                           text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded 
                           transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            id='exampleInput7' 
                           placeholder='Paragraph two'
                           name='messagetwo'
                           value={messagetwo}
                           onChange={onInputChange}
                           />
                           </div>

                           <div className='form-group mb-6'>
                           <input type="text" className='form-control block w-full px-5 py-2 text-base font-normal
                           text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded 
                           transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            id='exampleInput7' 
                           placeholder= 'Paragraph three'
                           name= 'messagethree'
                           value={messagethree}
                           onChange={onInputChange}
                           />
                           </div>

                           <input className='m-4' type="file" accept='image/*' onChange= {handleChange} />

                           <button onClick={handleSubmit} className='w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight 
                           uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800
                           active:shadow-lg transition duration-150 ease-in-out' >Post</button>


         </div>
      
    </div>
  )
}
}

export default Posttwo;
