import React, { useEffect, useRef, useState } from 'react'
import './AnswerComponent.scss';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { storage } from '../../../../services/firebase/firebase';
import { getDownloadURL, ref,uploadBytes  } from 'firebase/storage';

import { Button, Checkbox, FormGroup, IconButton } from '@mui/material';

import { toast } from 'react-toastify';

import {v4} from 'uuid';

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

        let copy = [...chosenAnswers];
        copy[props.NumberOfAProblem] = translateAnswer(event.target.value);
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

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = async (event) => {
        setSelectedImage(event.target.files[0]);

        if(selectedImage == null) return;

        const imageRef = ref(storage,`images/${selectedImage.name + v4()}`)
        uploadBytes(imageRef, selectedImage)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
                let copy = [...chosenAnswers];
                const localImageUrl = url;
                copy[props.NumberOfAProblem] = localImageUrl;
                dispatch(setChosenAnswers(copy));

                toast.success('🦄 სურათი ატვირთულია!', {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch((error) => {
                console.error(error);
                toast.error('შეცდომაა, სურათი არ დამახსოვრა', {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
        })
        .catch((error) => {
            toast.error('შეცდომაა, სურათი არ დამახსოვრა', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    };
    console.log(chosenAnswers[props.NumberOfAProblem])
    return (
        <FormGroup className='AnswerSheet-Answer'>
            {props.CorrectAnswer != "Custom" ?
                <>
                    <div className='Answer-Radio-Tag-Label'>{props.NumberOfAProblem + 1}</div>
                    <div className='Answer-Radio-Tag'>
                        <Checkbox color='primary' style={{ margin: 0, padding: 0 }} onChange={onChangeValue} checked={chosenAnswers[props.NumberOfAProblem] == 'a'} disabled={(used['ა'] == true && currentAnswer != 'a') || correctAnswerHasBeenFound} value={"ა"} name={props.NumberOfAProblem}></Checkbox>
                    </div>
                    <div className='Answer-Radio-Tag'>
                        <Checkbox color='primary' style={{ margin: 0, padding: 0 }} onChange={onChangeValue} checked={chosenAnswers[props.NumberOfAProblem] == 'b'} disabled={(used['ბ'] == true && currentAnswer != 'b') || correctAnswerHasBeenFound} value="ბ" name={props.NumberOfAProblem} ></Checkbox>
                    </div>
                    <div className='Answer-Radio-Tag'>
                        <Checkbox color='primary' style={{ margin: 0, padding: 0 }} onChange={onChangeValue} checked={chosenAnswers[props.NumberOfAProblem] == 'c'} disabled={(used['გ'] == true && currentAnswer != 'c') || correctAnswerHasBeenFound} value="გ" name={props.NumberOfAProblem} ></Checkbox>
                    </div>
                    <div className='Answer-Radio-Tag'>
                        <Checkbox color='primary' style={{ margin: 0, padding: 0 }} onChange={onChangeValue} checked={chosenAnswers[props.NumberOfAProblem] == 'd'} disabled={(used['დ'] == true && currentAnswer != 'd') || correctAnswerHasBeenFound} value="დ" name={props.NumberOfAProblem}></Checkbox>
                    </div>
                    <div className='Answer-CorrectnessIcon'>
                        {answer != 'Correct' && answer != 'Incorrect' && <RadioButtonUncheckedIcon></RadioButtonUncheckedIcon>}
                        {answer == 'Incorrect' && <CancelIcon color='primary'></CancelIcon>}
                        {answer == 'Correct' && <CheckCircleIcon color='success'></CheckCircleIcon>}
                    </div>
                </>
                :
                <>
                    <div className="Answer-Custom">
                        <div className='Answer-Radio-Tag-Label'>{props.NumberOfAProblem + 1}</div>
                        <div className="Answer-Choose-Photo">
                            {chosenAnswers[props.NumberOfAProblem].length === 0
                                ?
                                <h6>ატვირთე ამოხსნის სურათი</h6>
                                :
                                <h6>სურათი ატვირთულია!</h6>
                            }
                            <input
                                type="file"
                                id={"inputId-" + props.NumberOfAProblem}
                                className="hidden"
                                hidden
                                onClick={(e) => e.target.value = ''}
                                onChange={handleImageChange}
                                accept=".jpg,.jpeg,.png,.doc,.docx,.pdf"
                            />
                            <label htmlFor={"inputId-" + props.NumberOfAProblem}>
                                <IconButton component="span">
                                    <CameraAltIcon color={chosenAnswers[props.NumberOfAProblem].length === 0 ? 'primary' : 'success'} />
                                </IconButton>
                            </label>
                        </div>
                    </div>
                </>
            }

        </FormGroup>
    )
}

export default AnswerComponent