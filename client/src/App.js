
import React from 'react';
import{ Routes, Route } from 'react-router-dom';
import Topbar from './component/topbar/Topbar';
import Register from './component/register/Register';
import Login from './component/login/Login';


function App() {
  return (
    <div>
      <Topbar/>
      <Routes>
        <Route path='/register' element={ <Register />} />
        <Route path='/Login' element={<Login/>}/>

      </Routes>
      
    </div>
  
     
  
  )
}

export default App;
