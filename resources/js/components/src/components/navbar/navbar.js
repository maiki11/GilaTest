import React from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';

export default function Navbar(){
    
    const logout = async() =>{
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        window.location.href = "/";
    }

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link className='logoutBtn' onClick={logout} to='/'>
                        Log out
                    </Link>
                </div>
            </nav>
        </>
    )
}