import React from 'react'
import './UserInfoComponent.scss';
import { useAuth0 } from '@auth0/auth0-react';
import ModalComponent from '../../ModalComponent/ModalComponent';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpComponent from './HelpComponent/HelpComponent';

import { useSelector } from 'react-redux';

function UserInfoComponent() {

    //const { isLoading } = useAuth0();
    const { user } = useAuth0();

    const navigate = useNavigate();

    const tests = useSelector((state) => state.userTests.tests);

    const getScoreArray = (tests) => {
        let scores = [];
        tests.forEach((test) => {
            scores.push(test['test'][0]['score'])
        });
        return scores;
    }

    const getTimeArray = (tests) => {
        let times = [];
        tests.forEach((test) => {
            times.push(test['test'][0]['time'])
        });
        return times;
    }

    const calculateAverage = (arr) => {
        const average = arr.reduce((a, b) => a + b, 0) / arr.length;
        return average;
    }


    return (
        <>
            <div className="UserInfo">
                <div className='UserInfo-Header'>
                    <div className="UserInfo-Header-Left">
                        <img style={{ borderRadius: '75px' }} height={150} width={150} src={user.picture}></img>
                    </div>
                    <div className="UserInfo-Header-Right">
                        <div className='UserInfo-Header-Right-Top'>
                            <h3>
                                @{user.name}
                            </h3>
                            <div className="UserInfo-Header-Right-Top-Icons">
                                <ModalComponent ButtonIcon={HelpOutlineIcon} RenderComponent={HelpComponent}></ModalComponent>
                                <IconButton onClick={() => navigate('/settings')}><SettingsIcon /></IconButton>
                            </div>
                        </div>
                        <div className='UserInfo-Header-Right-Middle'>
                            <div className='UserInfo-Header-Right-Middle-Stats'>
                                <div className='UserInfo-Header-Right-Middle-Stats-DoneTests'>
                                    <h3><strong style={{ fontWeight: 'bolder' }}>{tests.length}</strong> ტესტი</h3>
                                </div>
                                <div className='UserInfo-Header-Right-Middle-Stats-AvgScore'>
                                    <h3><strong>{calculateAverage(getScoreArray(tests)).toFixed(2)}</strong> საშუალო ქულა</h3>
                                </div>
                                <div className='UserInfo-Header-Right-Middle-Stats-AvgTime'>
                                    <h3><strong>{(calculateAverage(getTimeArray(tests)) / 100 / 60).toFixed(0)} წ</strong> საშუალო დრო</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserInfoComponent