import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import UserInfoComponent from '../../components/Profile/UserInfoComponent/UserInfoComponent';
import './ProfileScreen.scss';
import MyTestsComponent from '../../components/Profile/MyTestsComponent/MyTestsComponent';



function ProfileScreen() {

    const navigate = useNavigate();
    const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();

    if (!isLoading) {
        if (!isAuthenticated) {
            navigate('/');
        }
    }

    //const callProtectedApi = async () => {
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


    return (
        <div className='ProfileScreen'>
            <>
                {!isLoading && isAuthenticated &&
                    <>
                        <UserInfoComponent user={user}></UserInfoComponent>
                        <MyTestsComponent></MyTestsComponent>
                    </>
                }
            </>
        </div>
    )
}

export default ProfileScreen