import Body from './components/Body';
import React from 'react';
import Login from "./components/Login";

import EventList from "./components/EventList";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {

  


  return (
    <>
      <div className="bg-blue-500 p-2">
        <BrowserRouter basename='/'>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/event' element={<Body /> }></Route>
        </Routes>
        </BrowserRouter>
        
        
         
        
        

        
        
        
        </div>
    </>
  )
}

export default App
