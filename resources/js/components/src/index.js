import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { render } from 'react-dom';
import Login from './components/login/login';
import Home from './components/home/home';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/navbar/navbar';

function App() {
    return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Home/>}/>
          </Routes>
          <ToastContainer />
        </Router>
      </>
    );
}

if (document.getElementById('root')) {
    if (localStorage.getItem("token")) {
        render(<App/>, document.getElementById('root'));
    } else {
        render(<Login />, document.getElementById('root'));
    }
}
