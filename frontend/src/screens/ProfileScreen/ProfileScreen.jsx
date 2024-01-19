import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import UserInfoComponent from '../../components/Profile/UserInfoComponent/UserInfoComponent';
import './ProfileScreen.scss';
import MyTestsComponent from '../../components/Profile/MyTestsComponent/MyTestsComponent';
import CheckoutComponent from '../../components/CheckoutComponent/CheckoutComponent';
import AdPlaceholderComponent from '../../components/AdPlaceholderComponent/AdPlaceholderComponent';



function ProfileScreen() {

    const navigate = useNavigate();
    const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();

    if (!isLoading) {
        if (!isAuthenticated) {
            navigate('/');
        }
    }

    return (
        <div className='ProfileScreen'>
            <div className="ProfileScreen-Wrapper">
                {!isLoading && isAuthenticated &&
                    <>
                        {/* <CheckoutComponent></CheckoutComponent> */}
                        <UserInfoComponent user={user}></UserInfoComponent>
                        <MyTestsComponent></MyTestsComponent>
                    </>
                }
                <AdPlaceholderComponent AdId={4}></AdPlaceholderComponent>
            </div>
        </div>
    )
}

export default ProfileScreen