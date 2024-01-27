import React, { useEffect } from 'react'
import './TestDoneComponent.scss';

import {useNavigate} from 'react-router-dom';

import {Button} from '@mui/material';

import { resetChosenAnswers, setChosenAnswers } from '../../../slices/TestSlice'
import { useDispatch } from 'react-redux'

import AdPlaceholderComponent from '../../AdPlaceholderComponent/AdPlaceholderComponent';

function TestDoneComponent() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetChosenAnswers());
    })

    const navigate = useNavigate();

    return (
        <div className='TestDoneComponent'>
            <div className="TestDoneComponent-Wrapper">
                <AdPlaceholderComponent AdId={10}></AdPlaceholderComponent>
                <div className="TestDone-Label">
                    <h1>ტესტი დამთავრებულია!</h1>
                </div>
                <div className="TestDone-Buttons">
                    <Button
                    variant='outlined'
                    className='TestDone-Button'
                    onClick={() => navigate('/')}
                    >
                        მთავარი გვერდი
                    </Button>
                    <Button
                    variant='outlined'
                    className='TestDone-Button'
                    onClick={() => navigate(0)}
                    >
                        ახალი ტესტის დაწყება
                    </Button>
                    <Button
                    className='TestDone-Button'
                    variant='outlined'
                    onClick={() => navigate('/profile')}
                    >
                        ჩემი ტესტების ნახვა
                    </Button>
                </div>
                <div className="TestDone-Content">
                    <div className="Content-Left">
                        <img src={process.env.PUBLIC_URL+'/images/TestDoneHero.png'} alt="" />
                    </div>
                    <div className="Content-Right">
                        <div className="Right-Top">
                            <h2>ყველაფერი დამახსოვრებულია!</h2>
                        </div>
                        <div className="Right-Bottom">
                            <ul>
                                <li>
                                    <h5>
                                        ნახე შენი ტესტები პროფილის გვერდზე
                                    </h5>
                                </li>
                                <li>
                                    <h5>
                                        ყველა შემოხაზული პასუხი, ატვირთული სურათი, დრო და ქულა შენახულია
                                    </h5>
                                </li>
                                <li>
                                    <h5>
                                        გაუზიარე შენი ტესტი ჩვენი ტესტების გაზიარების სისტემით
                                    </h5>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestDoneComponent