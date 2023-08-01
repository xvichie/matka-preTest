import React, { useEffect } from 'react'
import { resetChosenAnswers, setChosenAnswers } from '../../../slices/TestSlice'
import { useDispatch } from 'react-redux'

function TestDoneComponent() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetChosenAnswers());
    })

    return (
        <div>Test Is Done, madloba</div>
    )
}

export default TestDoneComponent