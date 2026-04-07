import LandingPage from './Components/LandingPage'
import './App.css'
import SignUp from "./Components/SignUp"
import SevakLogin from './Components/Login'
import {Route,Routes,useLocation} from "react-router-dom"
import SevakSignup from './Components/Sevak'
import Grahak from './Components/Grahak'
import SevakHomePage from './Components/SevakHomePage'
function App() {
  const location = useLocation();
  return (
    <>
     <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<SevakLogin/>}/>
          <Route path='/sevak' element={<SevakSignup/>}/>
          <Route path='/grahak' element={<Grahak/>}/>
          <Route path="/SevakHomePage" element={<SevakHomePage/>}/>
     </Routes>
  
    </>
  )
}

export default App
