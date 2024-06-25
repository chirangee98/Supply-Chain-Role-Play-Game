import React from 'react';
import Login from './components/login';
import SignUp from './components/SignUp';
import Home from './components/Home.jsx';
import Test from './components/test.jsx';
import {BrowserRouter, createBrowserRouter,Routes, Route, RouterProvider} from 'react-router-dom';



const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
