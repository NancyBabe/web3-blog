import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './Component/NavBar'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import { AuthContextProvider } from './Context/AdminContext'
import Post from './Pages/Posttwo';
import Homepage from './Pages/Homepage';

const App = () => {

  const [isAuth, setisAuth] = useState(localStorage.getItem('isAuth'));

  
  return (
    <Router>
      <NavBar isAuth={isAuth} setisAuth={setisAuth}/>
      <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Homepage setisAuth ={setisAuth}/> } />
        <Route path='/signup' element={ <SignUp setisAuth={setisAuth}/> } />
        <Route path='/login' element={ <Login setisAuth={setisAuth} /> }/>
        <Route path='/post' element={ <Post setisAuth={setisAuth} />} />
      </Routes>
      </AuthContextProvider>
    </Router>
  )
}

export default App


