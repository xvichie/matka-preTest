import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

import { Button, Fab } from '@mui/material';

import { resetChosenAnswers, setComponentOrder, setScore, setTestHasStarted, setTime } from '../../../../slices/TestSlice';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayIcon from '@mui/icons-material/Replay';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

import './ScoreComponent.scss';
import { useTheme } from '@emotion/react';

function ScoreComponent() {

    const { user } = useAuth0();
    const dispatch = useDispatch();

    const problems = useSelector((state) => state.test.problems);
    const answers = useSelector((state) => state.test.answers);
    const similars = useSelector((state) => state.test.similars);
    const chosenAnswers = useSelector(state => state.test.chosenAnswers);

    const score = useSelector(state => state.test.score);
    const Overalltime = useSelector((state) => state.test.time)
    const maxScore = useSelector((state) => state.test.maxScore);

    const MAX_TIME_LIMIT = 120; //MINUTES
    const MAX_TIME_LIMIT_IN_SECONDS = 60 * MAX_TIME_LIMIT;

    const { isAuthenticated } = useAuth0();

    const [secondsTime, setSecondsTime] = useState(0);

    let apiUrl = 'http://localhost:5000/api/userTests'

    const translateAnswers = () => {
        //console.log();
        const translated = [];
        answers.forEach((answer) => {
            if (answer === 'ა') {
                translated.push('a')
            } else if (answer === 'ბ') {
                translated.push('b')
            } else if (answer === 'გ') {
                translated.push('c')
            } else if (answer === 'დ') {
                translated.push('d');
            } else if (answer === 'Custom'){
                translated.push('Custom');
            }
        })
        return translated;
    }

    const handleFinish = async () => {
        startAndStop();
        if (isAuthenticated) {
            const data = {
                "email": user.email || "",
                test: {
                    problems: problems,
                    answers: translateAnswers(answers),
                    similars: similars,
                    chosenAnswers: chosenAnswers,
                    score: score,
                    time: secondsTime,
                    maxScore: maxScore
                }
            }
            console.log(data);
            await axios.post(apiUrl, data, {
                headers: {
                    'Content-Type': 'application/json',
                },

            })
                .catch(err => console.error(err));
        }
        dispatch(setComponentOrder('Done'));
        dispatch(setTestHasStarted(false));
        localStorage.setItem('TestHasStarted', false);
        localStorage.clear('TestObject');


    }
    const handleStartOver = async () => {
        startAndStop();
        dispatch(setComponentOrder('Start'));
        dispatch(setTestHasStarted(false));
        dispatch(resetChosenAnswers());
        localStorage.setItem('TestHasStarted', false);
        localStorage.clear('TestObject');
    }
    //console.log(problems['0']);

    // state to check stopwatch running or not
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        startAndStop();
        setSecondsTime(Overalltime)
    }, []);
    useEffect(() => {
        let intervalId, overallIntervalId;
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(
                () => {
                    if (secondsTime % 6000 === 0) {
                        dispatch(setTime(secondsTime));
                        console.log('Time Has Been Set In Redux');
                    }
                    return setSecondsTime(secondsTime + 1)
                },
                10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, secondsTime]);

    useEffect(() => {
        dispatch(setScore(score));
    }, [score])

    // Hours calculation
    const hours = Math.floor(secondsTime / 360000);

    // Minutes calculation
    const minutes = Math.floor((secondsTime % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((secondsTime % 6000) / 100);

    // Method to start and stop timer
    const startAndStop = () => {
        setIsRunning(!isRunning);
    };

    const theme = useTheme()
    return (
        <div className='Score'>
            <Fab
                color='secondary'
                style={{ borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px', borderBottomRightRadius: '0', borderTopRightRadius: '0' }}
                onClick={handleStartOver}
                variant="extended"
            >
                <ReplayIcon></ReplayIcon>
                ახლიდან დაწყება
            </Fab>
            <div className='Score-Stats'>
                <div className='Score-Score' style={{ backgroundColor: theme.palette.secondary.main }}>
                    <div className="Score-Score-Label">
                        <CreditScoreIcon sx={{ mr: 1 }}></CreditScoreIcon>
                    </div>
                    <div className="Score-Score-Score">
                        {score}/{localStorage.getItem('MaxScore')}
                    </div>
                </div>
                <div className="Score-Time" style={{ backgroundColor: theme.palette.secondary.main }}>
                    <div className="Score-Time-Label">
                        <AccessTimeIcon sx={{ mr: 1 }}></AccessTimeIcon>
                    </div>
                    <div className="Score-Time-Time">
                        {hours}:{minutes.toString().padStart(2, "0")}:
                        {seconds.toString().padStart(2, "0")}
                    </div>
                </div>
            </div>
            <Fab
                style={{ color: 'white', borderTopRightRadius: '50px', borderBottomRightRadius: '50px', borderBottomLeftRadius: '0', borderTopLeftRadius: '0' }}
                onClick={handleFinish}
                variant="extended"
                color='primary'
            >
                დასრულება <SportsScoreIcon sx={{ ml: 1 }} ></SportsScoreIcon>
            </Fab>
        </div>
    )
}

export default ScoreComponent