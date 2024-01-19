import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import Toggle from "react-toggle";

import { Navbar, Nav, Container,NavLink as BSNavLink } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { BsNewspaper } from 'react-icons/bs';
import Dropdown from 'react-bootstrap/Dropdown';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LoginIcon from '@mui/icons-material/Login';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

import { useSelector, useDispatch } from 'react-redux'

import { setCredentials, logoutUser } from '../../slices/authSlice.js';


import './Header.scss';
import { useTheme } from '@emotion/react';
import MuiSwitch from './HeaderComponents/MuiSwitch.jsx';
import { Link, NavLink } from 'react-router-dom';

function Header() {
    const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [isDark, setIsDark] = useState(false);

    const dispatch = useDispatch();
    const theme = useTheme();


    return (
        <header>
            <Navbar expand='lg' collapseOnSelect>
                <Container>
                    <Link>
                        {/* <LinkContainer to='/'> */}
                            <Navbar.Brand className='Brand' style={{ color: theme.palette.primary.main, fontWeight: 'bold', fontSize: '1.5rem', alignItems: 'center' }}>Matka.ge</Navbar.Brand>
                        {/* </LinkContainer> */}
                    </Link>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className="ms-auto">

                            <MuiSwitch></MuiSwitch>

                            <NavLink to={'/teachers'} className='Nav-Item'>
                                <LinkContainer to={'/teachers'}>
                                    <>
                                        <CoPresentIcon sx={{ mr: 0.5 }}></CoPresentIcon>რეპეტიტორები
                                    </>
                                </LinkContainer>
                            </NavLink>
                            <NavLink to={'/theory'} className='Nav-Item'>
                                <LinkContainer to={'/theory'}>
                                    <>
                                        <AutoStoriesIcon sx={{ mr: 0.5 }}></AutoStoriesIcon>თეორია
                                    </>
                                </LinkContainer>
                            </NavLink>
                            <NavLink to={'/solutions'} className='Nav-Item'>
                                <LinkContainer to={'/solutions'}>
                                    <>
                                            <EmojiObjectsIcon sx={{ mr: 0 }}></EmojiObjectsIcon> ამოხსნები
                                    </>
                                </LinkContainer>
                            </NavLink>
                            <NavLink to={'/test'} className='Nav-Item'>
                                <LinkContainer to={'/test'}>
                                    <>
                                            <AssignmentIcon sx={{ mr: 0.5 }}></AssignmentIcon> ტესტი
                                    </>
                                </LinkContainer>
                            </NavLink>
                            
                            {isAuthenticated == false ?
                            
                                <Link to={'/'}  onClick={loginWithPopup} className='Nav-Login'>
                                        <>
                                            {/* <FaSignInAlt style={{ marginRight: '3px' }}></FaSignInAlt> */}
                                            <LoginIcon style={{ marginRight: '3px' }}></LoginIcon>
                                            შესვლა
                                            </>
                                </Link>
                                :
                                <Dropdown>
                                    <Dropdown.Toggle style={{ backgroundColor: theme.palette.primary.main }} variant="success" id="dropdown-basic">
                                        <AccountCircleIcon></AccountCircleIcon> {user && user.name.split('@')[0]}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <LinkContainer to='/profile'>
                                            <Dropdown.Item>პროფილი</Dropdown.Item>
                                        </LinkContainer>
                                        <Dropdown.Item style={{ borderRadius: '10px' }} id='Logout' onClick={logout}>გამოსვლა</Dropdown.Item>
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