import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import Toggle from "react-toggle";

import { Navbar, Nav, NavLink, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { BsNewspaper } from 'react-icons/bs';
import Dropdown from 'react-bootstrap/Dropdown';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CoPresentIcon from '@mui/icons-material/CoPresent';

import { useSelector, useDispatch } from 'react-redux'

import { setCredentials, logoutUser } from '../../slices/authSlice.js';


import './Header.scss';
import { useTheme } from '@emotion/react';
import MuiSwitch from './HeaderComponents/MuiSwitch.jsx';

function Header() {
    const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [isDark, setIsDark] = useState(false);

    const dispatch = useDispatch();
    const theme = useTheme();


    return (
        <header>
            <Navbar expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <NavLink activeClassName="active">
                            <Navbar.Brand style={{ color: theme.palette.primary.main, fontWeight: 'bold', fontSize: '1.5rem', alignItems: 'center' }}>Matka.ge</Navbar.Brand>
                        </NavLink>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className="ms-auto">

                            <MuiSwitch></MuiSwitch>

                            <LinkContainer to={'/teachers'}>
                                <NavLink activeClassName="active">
                                    <CoPresentIcon sx={{ mr: 0.5 }}></CoPresentIcon>რეპეტიტორები
                                </NavLink>
                            </LinkContainer>
                            <LinkContainer to={'/theory'}>
                                <NavLink activeClassName="active">
                                    <AutoStoriesIcon sx={{ mr: 0.5 }}></AutoStoriesIcon>თეორია
                                </NavLink>
                            </LinkContainer>
                            <LinkContainer to={'/test'}>
                                <NavLink activeClassName="active">
                                    <BsNewspaper sx={{ mr: 0.5 }}></BsNewspaper> ტესტი
                                </NavLink>
                            </LinkContainer>
                            {isAuthenticated == false ?
                                <LinkContainer onClick={loginWithPopup} to={'/'} style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                                    <NavLink>
                                        <FaSignInAlt style={{ marginRight: '3px' }}></FaSignInAlt>
                                        შესვლა
                                    </NavLink>
                                </LinkContainer>
                                :
                                <Dropdown>
                                    <Dropdown.Toggle style={{ backgroundColor: theme.palette.primary.main }} variant="success" id="dropdown-basic">
                                        <AccountCircleIcon></AccountCircleIcon> {user && user.name}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <LinkContainer to='/profile'>
                                            <Dropdown.Item>პროფილი</Dropdown.Item>
                                        </LinkContainer>
                                        <Dropdown.Item style={{ backgroundColor: 'beige', borderRadius: '10px' }} onClick={logout}>გამოსვლა</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header