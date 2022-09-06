import React from "react";
import { Routes, Route } from 'react-router-dom';
import Register from "./pages/Register";
import Login from './pages/Login';
import Chat from "./pages/Chat";
import SetAvatar from "./components/SetAvatar";

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/setavatar' element={<SetAvatar />}/>
        <Route path='/' element={<Chat />}/>
      </Routes>
    </div>
  )
}

export default App;
