import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import SignInSide from './pages/singin';
import Signup from './pages/signup';
import Home from './pages/home';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Routes>
        <Route path='/signin' element={<SignInSide/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/:userId' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
