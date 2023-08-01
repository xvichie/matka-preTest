import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setComponentOrder, setIsLoading, setScore, setTestHasStarted, setTestIsDone, setTime } from '../../../slices/TestSlice';

function StartTestComponent({ isLoadingSetter }) {
    const dispatch = useDispatch();

    const handleStart = () => {
        dispatch(setComponentOrder('Test'));
        dispatch(setScore(0));
        dispatch(setTime(0));
        dispatch(setTestHasStarted(true));
        isLoadingSetter(true);
    }
    return (
        <>
            <div>Daiwye testi tu tesli xar, yo</div>
            <button onClick={handleStart}>dawyeba bozi viyo</button>
        </>
    )
}

export default StartTestComponent