import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import { Navbar, Nav, Container } from 'react-bootstrap';
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

function Header() {
    const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    // const callProtectedApi = async () => {
    //     try {
    //         const token = await getAccessTokenSilently();
    //         const res = await axios.get('http://localhost:' + "5000" + '/protected', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //         console.log(res);
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

    const dispatch = useDispatch();
    const theme = useTheme();


    return (
        <header>
            <Navbar style={{ backgroundColor: theme.palette.primary.main }} expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Nav.Link active>
                            <Navbar.Brand>Matka.ge</Navbar.Brand>
                        </Nav.Link>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className="ms-auto">
                            <LinkContainer to={'/teachers'}>
                                <Nav.Link>
                                    <CoPresentIcon sx={{ mr: 0.5 }}></CoPresentIcon>რეპეტიტორები
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/theory'}>
                                <Nav.Link>
                                    <AutoStoriesIcon sx={{ mr: 0.5 }}></AutoStoriesIcon>თეორია
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/test'}>
                                <Nav.Link>
                                    <BsNewspaper sx={{ mr: 0.5 }}></BsNewspaper> ტესტი
                                </Nav.Link>
                            </LinkContainer>
                            {isAuthenticated == false ?
                                <LinkContainer onClick={loginWithPopup} to={'/'}>
                                    <Nav.Link>
                                        <FaSignInAlt></FaSignInAlt>
                                        შესვლა
                                    </Nav.Link>
                                </LinkContainer>
                                :
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
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