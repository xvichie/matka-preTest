import React, { useEffect, useState } from 'react'
import './AnswerComponent.scss';

import CropSquareIcon from '@mui/icons-material/CropSquare';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import BlurCircularIcon from '@mui/icons-material/BlurCircular';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { Checkbox, FormGroup, IconButton } from '@mui/material';

import ModalComponent from '../../../ModalComponent/ModalComponent';
import SimilarProblemComponent from '../../SimilarProblemComponent/SimilarProblemComponent';

import { useDispatch, useSelector } from 'react-redux';
import { setChosenAnswers, setScore } from '../../../../slices/TestSlice';

function AnswerComponent(props) {

    const chosenAnswers = useSelector((state) => state.test.chosenAnswers);
    const score = useSelector((state) => state.test.score)

    const dispatch = useDispatch();



    //console.log(chosenAnswers);

    const [currentAnswer, SetCurrentAnswer] = useState('');
    const [correctAnswerHasBeenFound, setCorrectAnswerHasBeenFound] = useState(false);
    const [used, setUsed] = useState({
        "ა": false,
        "ბ": false,
        "გ": false,
        "დ": false
    });
    const similarProblems = useSelector((state) => state.test.similars)

    const translateAnswer = (answer) => {
        let translated = '';
        if (answer === 'ა') {
            translated = 'a'
        } else if (answer === 'ბ') {
            translated = 'b'
        } else if (answer === 'გ') {
            translated = 'c'
        } else if (answer === 'დ') {
            translated = 'd'
        }
        else {
            translated = ''
        }
        return translated;
    }

    const [answer, setAnswer] = useState('');




    const onChangeValue = (event) => {
        //console.log(event.target.value);
        SetCurrentAnswer(event.target.value);

        let NewValue = { [event.target.value]: true };
        setUsed(prev => ({ ...prev, ...NewValue }));

        let copy = [...chosenAnswers]; // Create a copy of the array
        console.log(translateAnswer(event.target.value))
        copy[props.NumberOfAProblem] = translateAnswer(event.target.value);
        console.log(copy);
        dispatch(setChosenAnswers(copy)); // Dispatch the action with the updated copy

        if (event.target.value == props.CorrectAnswer) {
            setAnswer('Correct');
            dispatch(setScore(score + 1))
            setCorrectAnswerHasBeenFound(true);
        }
        else {
            setAnswer('Incorrect');
        }
    }

    useEffect(() => {
        SetCurrentAnswer(chosenAnswers[props.NumberOfAProblem]);
        //console.log('#', props.NumberOfAProblem, ' პრობლემის არჩეული - ', chosenAnswers[props.NumberOfAProblem]);
        //console.log('#', props.NumberOfAProblem, ' პრობლემის სწორი - ', translateAnswer(props.CorrectAnswer))
        if (chosenAnswers[props.NumberOfAProblem] !== '') {
            if (chosenAnswers[props.NumberOfAProblem] == translateAnswer(props.CorrectAnswer)) {
                setAnswer('Correct');
                setCorrectAnswerHasBeenFound(true)
            } else {
                setAnswer('Incorrect');
            }
        }
    }, [chosenAnswers])

    //console.log(answer);
    return (
        // <div className='AnswerSheet-Answer'>
        //     {props.CorrectAnswer != "Custom" && <>
        //         <div className='Answer-Radio-Tag-Label'>{props.NumberOfAProblem + 1}</div>
        //         <div className='Answer-Radio-Tag'>
        //             <input type="radio" onChange={onChangeValue} checked={chosenAnswers[props.NumberOfAProblem] == 'a'} disabled={(used['ა'] == true && currentAnswer != 'ა') || correctAnswerHasBeenFound} value="ა" name={props.NumberOfAProblem} />
        //         </div>
        //         <div className='Answer-Radio-Tag'>
        //             <input type="radio" onChange={onChangeValue} checked={chosenAnswers[props.NumberOfAProblem] == 'b'} disabled={(used['ბ'] == true && currentAnswer != 'ბ') || correctAnswerHasBeenFound} value="ბ" name={props.NumberOfAProblem} />
        //         </div>
        //         <div className='Answer-Radio-Tag'>
        //             <input type="radio" onChange={onChangeValue} checked={chosenAnswers[props.NumberOfAProblem] == 'c'} disabled={(used['გ'] == true && currentAnswer != 'გ') || correctAnswerHasBeenFound} value="გ" name={props.NumberOfAProblem} />
        //         </div>
        //         <div className='Answer-Radio-Tag'>
        //             <input type="radio" onChange={onChangeValue} checked={chosenAnswers[props.NumberOfAProblem] == 'd'} disabled={(used['დ'] == true && currentAnswer != 'დ') || correctAnswerHasBeenFound} value="დ" name={props.NumberOfAProblem} />
        //         </div>
        //         <div className='Answer-CorrectnessIcon'>
        //             {answer != 'Correct' && answer != 'Incorrect' && <RadioButtonUncheckedIcon></RadioButtonUncheckedIcon>}
        //             {answer == 'Incorrect' && <CancelIcon style={{ color: 'red', outlineColor: 'black' }}></CancelIcon>}
        //             {answer == 'Correct' && <CheckCircleIcon style={{ color: 'green', outlineColor: 'black' }}></CheckCircleIcon>}
        //         </div>
        //     </>}
        // </div>
        <FormGroup className='AnswerSheet-Answer'>
            {props.CorrectAnswer != "Custom" && <>
                <div className='Answer-Radio-Tag-Label'>{props.NumberOfAProblem + 1}</div>
                <div className='Answer-Radio-Tag'>
                    {/* <input type="radio" onChange={onChangeValue} checked={chosenAnswers[props.NumberOfAProblem] == 'a'} disabled={(used['ა'] == true && currentAnswer != 'ა') || correctAnswerHasBeenFound} value="ა" name={props.NumberOfAProblem} /> */}
                    <Checkbox style={{ margin: 0, padding: 0 }} onChange={onChangeValue} checked={chosenAnswers[props.NumberOfAProblem] == 'a'} disabled={(used['ა'] == true && currentAnswer != 'ა') || correctAnswerHasBeenFound} value={"ა"} name={props.NumberOfAProblem}></Checkbox>
                </div>
                <div className='Answer-Radio-Tag'>
                    {/* <input type="radio" onChange={onChangeValue} checked={chosenAnswers[props.NumberOfAProblem] == 'b'} disabled={(used['ბ'] == true && currentAnswer != 'ბ') || correctAnswerHasBeenFound} value="ბ" name={props.NumberOfAProblem} /> */}
                    <Checkbox style={{ margin: 0, padding: 0 }} onChange={onChangeValue} checked={chosenAnswers[props.NumberOfAProblem] == 'b'} disabled={(used['ბ'] == true && currentAnswer != 'ბ') || correctAnswerHasBeenFound} value="ბ" name={props.NumberOfAProblem} ></Checkbox>
                </div>
                <div className='Answer-Radio-Tag'>
                    {/* <input type="radio" onChange={onChangeValue} checked={chosenAnswers[props.NumberOfAProblem] == 'c'} disabled={(used['გ'] == true && currentAnswer != 'გ') || correctAnswerHasBeenFound} value="გ" name={props.NumberOfAProblem} /> */}
                    <Checkbox style={{ margin: 0, padding: 0 }} onChange={onChangeValue} checked={chosenAnswers[props.NumberOfAProblem] == 'c'} disabled={(used['გ'] == true && currentAnswer != 'გ') || correctAnswerHasBeenFound} value="გ" name={props.NumberOfAProblem} ></Checkbox>
                </div>
                <div className='Answer-Radio-Tag'>
                    {/* <input type="radio" onChange={onChangeValue} checked={chosenAnswers[props.NumberOfAProblem] == 'd'} disabled={(used['დ'] == true && currentAnswer != 'დ') || correctAnswerHasBeenFound} value="დ" name={props.NumberOfAProblem} /> */}
                    <Checkbox style={{ margin: 0, padding: 0 }} onChange={onChangeValue} checked={chosenAnswers[props.NumberOfAProblem] == 'd'} disabled={(used['დ'] == true && currentAnswer != 'დ') || correctAnswerHasBeenFound} value="დ" name={props.NumberOfAProblem}></Checkbox>
                </div>
                <div className='Answer-CorrectnessIcon'>
                    {answer != 'Correct' && answer != 'Incorrect' && <RadioButtonUncheckedIcon></RadioButtonUncheckedIcon>}
                    {answer == 'Incorrect' && <CancelIcon color='secondary'></CancelIcon>}
                    {answer == 'Correct' && <CheckCircleIcon color='success'></CheckCircleIcon>}
                </div>
            </>}
        </FormGroup>
    )
}

export default AnswerComponent