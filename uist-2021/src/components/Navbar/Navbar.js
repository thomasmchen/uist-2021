import React, { Component } from 'react';
import { MenuItems } from "./MenuItems";
import { Button } from "../Button"
import './Navbar.css'
import { Link } from 'react-router-dom';

class Navbar extends Component {
    state = { clicked: false }
    
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo">Contoso <i className="fab fa-affiliatetheme"></i></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map( (item, index) => {
                        return(
                            <li key={index} className="nav-links">
                                <Link to={item.url}>{item.title}</Link>
                            </li>
                        )
                    })}
                </ul>
                <Button>About Us</Button>
            </nav>
        )
    }
}

export default Navbar