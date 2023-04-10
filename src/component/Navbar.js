import React, { Component } from "react";
import { Link } from 'react-scroll';
import { Link as Link2 } from 'react-router-dom';

import * as Icon from 'react-feather';
import {
    NavbarBrand,
    NavbarToggler,
    NavItem,
    Nav,
    Collapse
} from "reactstrap";
// Import Logo
import logodark from "../assets/images/logo-dark.png";
import logolight from "../assets/images/logo-light.png";

class NavbarPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleMenu: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);
        window.addEventListener("scroll", this.windowScroll);
    }
    windowScroll() {
        const navbar = document.getElementById("navbar");
        if (
            document.body.scrollTop >= 50 ||
            document.documentElement.scrollTop >= 50
        ) {
            navbar.classList.add("nav-sticky");
        } else {
            navbar.classList.remove("nav-sticky");
        }
    }
    toggleMenu() {
        this.setState({
            toggleMenu: !this.state.toggleMenu
        });
    }
    render() {
        return (
            <React.Fragment>
                <nav id="navbar" className="navbar navbar-expand-lg fixed-top sticky">
                    <div className="container">
                        <NavbarBrand className="navbar-brand" to="/">
                            <img src={logodark} className="logo-light-mode" alt="" />
                            <img src={logolight} className="logo-dark-mode" alt="" />
                        </NavbarBrand>
                        <NavbarToggler className="navbar-toggler" onClick={this.toggleMenu}>
                            <Icon.Menu />
                        </NavbarToggler>

                        <Collapse className="navbar-collapse" isOpen={this.state.toggleMenu} id="navbarSupportedContent">

                            <Nav className="navbar-nav ms-auto mb-2 mb-lg-0" id="navbar-navlist">
                                <NavItem>
                                    <Link activeClass="active" spy={true} smooth={true} duration={500} to="home" className="nav-link" href="#">Home</Link>
                                </NavItem>
                                <NavItem>
                                    <Link activeClass="active" spy={true} smooth={true} duration={500} to="features" className="nav-link" href="#">Features</Link>
                                </NavItem>
                                <NavItem>
                                    <Link activeClass="active" spy={true} smooth={true} duration={500} to="pricing" className="nav-link" href="#">Pricing</Link>
                                </NavItem>
                                <NavItem>
                                    <Link activeClass="active" spy={true} smooth={true} duration={500} to="review" className="nav-link" href="#">Review</Link>
                                </NavItem>
                                <NavItem>
                                    <Link activeClass="active" spy={true} smooth={true} duration={500} to="blog" className="nav-link" href="#">News</Link>
                                </NavItem>
                                <NavItem>
                                    <Link activeClass="active" spy={true} smooth={true} duration={500} to="contact" className="nav-link" href="#">Contact Us</Link>
                                </NavItem>
                            </Nav>

                            <ul className="list-inline menu-social mb-0 ps-lg-4 ms-2">
                                <li className="list-inline-item"><Link2 to="/auth-login" className="text-dark fw-semibold text-uppercase small">Login</Link2></li>
                                <li className="list-inline-item ms-2"><Link2 to="/auth-signup" className="btn btn-primary text-uppercase">Sign Up</Link2></li>
                            </ul>
                        </Collapse>
                    </div>
                </nav>
            </React.Fragment>
        )

    }
}

export default NavbarPage;