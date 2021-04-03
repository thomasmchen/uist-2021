import React, { Component } from 'react';
import { MenuItems } from "./MenuItems";
import { Button } from "../Button"
import './Navbar.css'
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
    state = { clicked: false }
    
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo">UIST 2021</h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map( (item, index) => {
                        return(
                            <li key={index} className={item.cName}>
                                <NavLink to={item.url}>{item.title}</NavLink>
                            </li>
                        )
                    })}
                </ul>
                <Button>
                    <NavLink to="/static/about">About Us</NavLink>
                </Button>
            </nav>
        )
    }
}

export default Navbar