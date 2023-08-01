import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import { setComponentOrder, setScore, setTestHasStarted, setTime } from '../../../../slices/TestSlice';

import './ScoreComponent.scss';

function ScoreComponent(props) {

    const { user } = useAuth0();
    const dispatch = useDispatch();

    const problems = useSelector((state) => state.test.problems);
    const answers = useSelector((state) => state.test.answers);
    const similars = useSelector((state) => state.test.similars);
    const chosenAnswers = useSelector(state => state.test.chosenAnswers);

    const score = useSelector(state => state.test.score);
    const Overalltime = useSelector((state) => state.test.time)


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
                    time: secondsTime
                }
            }
            console.log(data);
            await axios.post(apiUrl, data, {
                headers: {
                    'Content-Type': 'application/json',
                },

            })
                .then(() => {
                    localStorage.clear('TestObject');
                })
                .catch(err => console.error(err));
        }
        dispatch(setComponentOrder('Done'));
        dispatch(setTestHasStarted(false));
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

    // useEffect(() => {
    //     if (secondsTime % 600 == 0) {
    //         dispatch(setTime(secondsTime));
    //         console.log('Time Set In Redux');
    //     }
    //     return () => {
    //         // Code to run on component unmount (optional)
    //     };
    // }, [secondsTime])

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
    return (
        <div className='Score'>
            <Button variant='contained' onClick={handleFinish}>დასრულება</Button>
            <div className='Score-Stats'>
                <div className='Score-Score'>
                    {score}/37
                </div>
                <div className="Score-Time">
                    {hours}:{minutes.toString().padStart(2, "0")}:
                    {seconds.toString().padStart(2, "0")}
                </div>
            </div>
        </div>
    )
}

export default ScoreComponent