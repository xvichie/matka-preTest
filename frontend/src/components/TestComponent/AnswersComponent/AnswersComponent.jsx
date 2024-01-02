import React, { useEffect, useState } from 'react'
import AnswerComponent from './AnswerComponent/AnswerComponent';
import './AnswersComponent.scss';
import ScoreComponent from './ScoreComponent/ScoreComponent.js';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useDispatch, useSelector } from 'react-redux';
import { setScore } from '../../../slices/TestSlice';

export default function AnswersComponent(props) {



    const score = useSelector((state) => state.test.score)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(setScore());
    // }, [dispatch])numberOfCorrectAnswers
    return (
        <div className="AnswersBox">
            <div className="AnswersText">
                <h2 style={{ margin: '10px' }}>პასუხები</h2>
            </div>
            <div className='Answer-Sheet'>
                <div className='AnswerSheet-Answer'>
                    {<>
                        <div className='Answer-Radio-Tag-Label'><strong>#</strong></div>
                        <div className="AnswerSheet-Letters">
                            <div className='Answer-Radio-Tag-Startup'>
                                <h6><strong>ა</strong></h6>
                            </div>
                            <div className='Answer-Radio-Tag-Startup'>
                                <h6><strong>ბ</strong></h6>
                            </div>
                            <div className='Answer-Radio-Tag-Startup'>
                                <h6><strong>გ</strong></h6>
                            </div>
                            <div className='Answer-Radio-Tag-Startup'>
                                <h6><strong>დ</strong></h6>
                            </div>
                        </div>
                        <div className='Answer-CorrectnessIcon'>

                        </div>
                    </>}
                </div>
                {props.AnswersSheet.map((Answer, index) => {
                    if (props.AnswersSheet[index]) {
                        //console.log(props.SimilarsSheet[index]);
                        return (<AnswerComponent key={index} NumberOfAProblem={index} SimilarProblem={props.SimilarsSheet[index]} CorrectAnswer={Answer}></AnswerComponent>);
                    }
                })}
            </div>
            <div>
                {/* <ScoreComponent Problems={props.Problems} Similars={props.SimilarsSheet} Answers={props.AnswerSheet}></ScoreComponent> */}
            </div>
        </div>
    )
}
