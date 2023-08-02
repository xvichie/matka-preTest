import React, { useEffect, useState } from 'react'
import PDFViewer from '../TestComponent/ProblemComponent/PDFViewer';

import AnswersJSON from '../../assets/AnswersForEveryTest.json';
import SimilarJSON from '../../assets/SimilarsForEveryTest.json';

import AnswersComponent from './AnswersComponent/AnswersComponent';
import ScrollButtonComponent from './ScrollButtonComponent/ScrollButtonComponent';

import { useSelector, useDispatch } from 'react-redux';
import { setProblems, setAnswers, setSimilars, setComponentOrder } from '../../slices/TestSlice';
import SpinnerComponent from './SpinnerComponent/SpinnerComponent';
import TestDoneComponent from './TestDoneComponent/TestDoneComponent';
import StartTestComponent from './StartTestComponent/StartTestComponent';
//import { Button, ButtonGroup } from 'react-bootstrap';
import { Button, ButtonGroup } from '@mui/material';
import SimilarModalComponent from '../Profile/MyTestsComponent/SimilarModalComponent/SimilarModalComponent';

import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import './TestComponent.scss';

function TestComponent() {

    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    const problems = useSelector((state) => state.test.problems);
    const answers = useSelector((state) => state.test.answers);
    const similars = useSelector((state) => state.test.similars);

    const testHasStarted = useSelector((state) => state.test.testHasStarted);
    const testType = useSelector((state) => state.test.testType);
    const erovnuli = useSelector((state) => state.test.erovnuli)

    const availableYears = Object.entries(AnswersJSON).map((AnswerJson, indxe) => parseInt(AnswerJson[0]));
    console.log(availableYears)

    const componentOrder = useSelector((state) => state.test.componentOrder)

    const generateProblems = () => {

        const NumberOf1PointProblems = 37;
        const NumberOf3PointProblems = 2;
        const NumberOf4PointProblems = 2;

        let Generated1PointProblems = 0;
        let Generated3PointProblems = 0;
        let Generated4PointProblems = 0;

        const generatedProblems = [];
        const generatedAnswers = [];
        const generatedSimilars = [];

        const Used = Array.from({ length: 2025 }, () =>
            Array.from({ length: 4 }, () => Array.from({ length: 43 }, () => false))
        );

        //GENERATE 1 POINT PROBLEMS
        while (Generated1PointProblems != NumberOf1PointProblems) {

            const Year = availableYears[Math.floor(Math.random() * availableYears.length)];
            const VersionInfoJSON = require('../../assets/' + Year + '/info.json');

            const Version = Math.floor(Math.random() * VersionInfoJSON['NumberOfVersionsInThatYear']) + 1;
            const Problem = Math.floor(Math.random() * VersionInfoJSON['NumberOf1PointProblems']) + 1;

            const ProblemObject = {
                Year: Year,
                Version: Version,
                Problem: Problem
            };
            if (Used[Year][Version][Problem] == false) {

                generatedProblems.push(ProblemObject);
                Used[Year][Version][Problem] = true;
                generatedAnswers.push(AnswersJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem])
                generatedSimilars.push(SimilarJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem]);
                Generated1PointProblems += 1;
            }
        }

        //GENERATE 3 POINT PROBLEMS
        while (Generated3PointProblems != NumberOf3PointProblems) {

            const Year = availableYears[Math.floor(Math.random() * availableYears.length)];
            const VersionInfoJSON = require('../../assets/' + Year + '/info.json');

            const Version = Math.floor(Math.random() * VersionInfoJSON['NumberOfVersionsInThatYear']) + 1;

            const Problem = Math.floor(Math.random() * VersionInfoJSON['NumberOf3PointProblems']) + 1 + VersionInfoJSON['NumberOf1PointProblems'] + VersionInfoJSON['NumberOf2PointProblems'];

            const ProblemObject = {
                Year: Year,
                Version: Version,
                Problem: Problem
            };
            if (Used[Year][Version][Problem] == false) {

                generatedProblems.push(ProblemObject)
                Used[Year][Version][Problem] = true;

                generatedAnswers.push(AnswersJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem])
                generatedSimilars.push(SimilarJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem]);
                Generated3PointProblems += 1;
            }
        }

        //GENERATE 4 POINT PROBLEMS
        while (Generated4PointProblems != NumberOf4PointProblems) {

            const Year = availableYears[Math.floor(Math.random() * availableYears.length)];
            const VersionInfoJSON = require('../../assets/' + Year + '/info.json');

            const Version = Math.floor(Math.random() * VersionInfoJSON['NumberOfVersionsInThatYear']) + 1;

            const Problem = Math.floor(Math.random() * VersionInfoJSON['NumberOf4PointProblems']) + 1 + VersionInfoJSON['NumberOf1PointProblems'] + VersionInfoJSON['NumberOf2PointProblems'] + VersionInfoJSON['NumberOf3PointProblems'];

            const ProblemObject = {
                Year: Year,
                Version: Version,
                Problem: Problem
            };
            if (Used[Year][Version][Problem] == false) {

                generatedProblems.push(ProblemObject)
                Used[Year][Version][Problem] = true;
                generatedAnswers.push(AnswersJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem])
                generatedSimilars.push(SimilarJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem]);
                Generated4PointProblems += 1;
            }
        }
        // console.log(generatedProblems);
        // console.log(generatedAnswers);
        // console.log(generatedSimilars);
        return {
            Problems: generatedProblems,
            Answers: generatedAnswers,
            Similars: generatedSimilars
        }
    }

    const generateErovnuli = (Year, Version) => {

        const VersionInfoJSON = require('../../assets/' + Year + '/info.json');

        const NumberOf1PointProblems = VersionInfoJSON['NumberOf1PointProblems'];
        const NumberOf2PointProblems = VersionInfoJSON['NumberOf2PointProblems'];
        const NumberOf3PointProblems = VersionInfoJSON['NumberOf3PointProblems'];
        const NumberOf4PointProblems = VersionInfoJSON['NumberOf4PointProblems'];

        let GeneratedProblems = 0;

        const generatedProblems = [];
        const generatedAnswers = [];
        const generatedSimilars = [];

        const Used = Array.from({ length: 2025 }, () =>
            Array.from({ length: 4 }, () => Array.from({ length: 43 }, () => false))
        );

        while (GeneratedProblems < NumberOf1PointProblems + NumberOf2PointProblems + NumberOf3PointProblems + NumberOf4PointProblems) {
            const ProblemObject = {
                Year: Year,
                Version: Version,
                Problem: GeneratedProblems + 1
            };
            generatedProblems.push(ProblemObject);
            generatedAnswers.push(AnswersJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem])
            generatedSimilars.push(SimilarJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem]);
            GeneratedProblems += 1;
        }

        // console.log(generatedProblems);
        // console.log(generatedAnswers);
        // console.log(generatedSimilars);
        return {
            Problems: generatedProblems,
            Answers: generatedAnswers,
            Similars: generatedSimilars
        }
    }


    useEffect(() => {
        dispatch(setComponentOrder('Start'));
        setIsLoading(false);
        console.log(localStorage.getItem('TestHasStarted'));
        console.log(localStorage.getItem('TestObject'));
        if (localStorage.getItem('TestObject') !== null && localStorage.getItem('TestHasStarted') == 'true') {
            const parsedTestObject = JSON.parse(localStorage.getItem('TestObject'));
            dispatch(setProblems(parsedTestObject.Problems));
            dispatch(setAnswers(parsedTestObject.Answers));
            dispatch(setSimilars(parsedTestObject.Similars));
            dispatch(setComponentOrder('Test'));
        }
        setIsLoading(false) // Set isLoading to false once the data is loaded

    }, []);

    useEffect(() => {
        setIsLoading(false);
    }, [isLoading]);



    return (
        <div className='TestComponent'>
            {isLoading ? (
                <div>
                    <SpinnerComponent />
                </div>
            ) : componentOrder === 'Start' ? (
                <StartTestComponent isLoadingSetter={setIsLoading} />
            ) : componentOrder === 'Test' ? (
                <>
                    {problems.map((problem, index) => {
                        return (
                            <div key={'problem-div-' + index} className='TestComponent-Problem'>
                                <PDFViewer id={'problem-' + index} key={'problem-' + index} Problem={problem} />
                                <div key={'problem-button' + index} className="PDFButtons">
                                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                                        <Button variant='outlined' className='Test-SolutionButton' style={{ borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px' }}><EmojiObjectsIcon></EmojiObjectsIcon>ამოხსნა</Button>
                                        <SimilarModalComponent ButtonIcon={ContentCopyIcon} index={index} ViewedIn={'Test'}></SimilarModalComponent>
                                    </ButtonGroup>
                                </div>
                            </div>)
                    })}
                    <AnswersComponent SimilarsSheet={similars} Problems={problems} AnswersSheet={answers} />
                    <ScrollButtonComponent problems={problems} />
                </>
            ) : (
                <TestDoneComponent />
            )}
        </div>
    )
}
export default TestComponent;