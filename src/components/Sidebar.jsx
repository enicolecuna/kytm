import React from 'react';
import './Sidebar.css';
import logoImage from '../assets/logo.png';
import userIconImage from '../assets/user.png';
import { NavLink } from 'react-router-dom'; 

    function Sidebar({ firstName, lastName }) {
        const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
    return(
        <div className="sidebar">
            <div className="logo">
                <img src={logoImage} alt="logo" />
                

            </div>
            <nav className="sidebar-nav">
        <NavLink to="/Dashboard" className="nav-item" activeclassname="active">Dashboard</NavLink>
        <NavLink to="/add" className="nav-item" activeclassname="active">Add Item</NavLink>
        <NavLink to="/sales" className="nav-item" activeclassname="active">Sales</NavLink>
        <NavLink to="/orders" className="nav-item" activeclassname="active">Orders</NavLink>
      </nav>
            <div className="sidebar-bottom">
        <img src={userIconImage} alt="User Icon" className="user-icon" />
        <div className="username">{initials}</div>
      </div>
        </div>
    )
}
export default Sidebar;