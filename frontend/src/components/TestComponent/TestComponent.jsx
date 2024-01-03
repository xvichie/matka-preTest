import React, { useEffect, useState } from 'react'
import PDFViewer from './ProblemComponent/PDFViewer';

import AnswersJSON from '../../assets/AnswersForEveryTest.json';
import SimilarJSON from '../../assets/SimilarsForEveryTest.json';
import SolutionsJSON from '../../assets/SolutionURLsForEveryTest.json';

import { updateSimilars } from '../../services/UpdateSimilars';

import AnswersComponent from './AnswersComponent/AnswersComponent';
import ScrollButtonComponent from './ScrollButtonComponent/ScrollButtonComponent';

import { useSelector, useDispatch } from 'react-redux';
import { setProblems, setAnswers, setSimilars, setComponentOrder } from '../../slices/TestSlice';
import SpinnerComponent from './SpinnerComponent/SpinnerComponent';
import TestDoneComponent from './TestDoneComponent/TestDoneComponent';
import StartTestComponent from './StartTestComponent/StartTestComponent';
//import { Button, ButtonGroup } from 'react-bootstrap';
import { Box, Button, ButtonGroup, Drawer, Fab, List } from '@mui/material';
import SimilarModalComponent from '../Profile/MyTestsComponent/SimilarModalComponent/SimilarModalComponent';


import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArticleIcon from '@mui/icons-material/Article';

import './TestComponent.scss';
import ScoreComponent from './AnswersComponent/ScoreComponent/ScoreComponent';
import SolutionComponent from './SolutionComponent/SolutionComponent';

function TestComponent() {

    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    const problems = useSelector((state) => state.test.problems);
    const answers = useSelector((state) => state.test.answers);
    const similars = useSelector((state) => state.test.similars);


    const availableYears = Object.entries(AnswersJSON).map((AnswerJson, index) => parseInt(AnswerJson[0]));
    //console.log(availableYears)

    const componentOrder = useSelector((state) => state.test.componentOrder)



    useEffect(() => {
        dispatch(setComponentOrder('Start'));
        setIsLoading(false);
        // console.log(localStorage.getItem('TestHasStarted'));
        // console.log(localStorage.getItem('TestObject'));
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

    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 220 }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <AnswersComponent SimilarsSheet={similars} Problems={problems} AnswersSheet={answers} />
            </div>
        </Box>
    );

    const [isDesktop, setDesktop] = useState(window.innerWidth > 1050);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 1050);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    useEffect(() => {
        updateSimilars();
    }, [])

    return (
        <div className='TestComponent'>
            <div className='TestComponent-Wrapper'>
                {isLoading ? (
                    <div>
                        <SpinnerComponent />
                    </div>
                ) : componentOrder === 'Start' ? (
                    <StartTestComponent isLoadingSetter={setIsLoading} />
                ) : componentOrder === 'Test' ? (
                    <>
                        {problems.map((problem, index) => {
                            //console.log(SolutionsJSON[problem.Year][problem.Version][problem.Problem+1]);
                            // console.log(index);
                            // console.log(require('../../assets/' + problem.Year + '/info.json'));
                            // console.log(require('../../assets/' + problem.Year + '/info.json')['NumberOf1PointProblems'] - 1 + require('../../assets/' + problem.Year + '/info.json')['NumberOf2PointProblems'] + require('../../assets/' + problem.Year + '/info.json')['NumberOf3PointProblems']);
                            return (
                                <div key={'problem-div-' + index} className='TestComponent-Problem'>
                                    <div className='ProblemLabel'>
                                        <h3>
                                            {problem.Problem <= require('../../assets/' + problem.Year + '/info.json')['NumberOf1PointProblems'] - 1 ? "(1)"
                                                :
                                                problem.Problem <= require('../../assets/' + problem.Year + '/info.json')['NumberOf1PointProblems'] - 1 + require('../../assets/' + problem.Year + '/info.json')['NumberOf2PointProblems']
                                                    ? "(2)"
                                                    :
                                                    problem.Problem <= require('../../assets/' + problem.Year + '/info.json')['NumberOf1PointProblems'] - 1 + require('../../assets/' + problem.Year + '/info.json')['NumberOf2PointProblems'] + require('../../assets/' + problem.Year + '/info.json')['NumberOf3PointProblems']
                                                        ? "(3)"
                                                        :
                                                        "(4)"}
                                                        {(index + 1)}
                                        </h3>
                                    </div>
                                    <PDFViewer id={'problem-' + index} key={'problem-' + index} Problem={problem} />
                                    <div key={'problem-button' + index} className="PDFButtons">
                                        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                                            {/* <Button variant='outlined' color='secondary' className='Test-SolutionButton' style={{ borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px' }}><EmojiObjectsIcon></EmojiObjectsIcon>ამოხსნა</Button> */}
                                            <SolutionComponent color='secondary' ViewedIn={'Test'} index={index} ButtonIcon={EmojiObjectsIcon} VideoURL={SolutionsJSON[problem.Year][problem.Version][problem.Problem+1]} ></SolutionComponent>
                                            <SimilarModalComponent color='secondary' ButtonIcon={ContentCopyIcon} index={index} ViewedIn={'Test'}></SimilarModalComponent>
                                        </ButtonGroup>
                                    </div>
                                </div>)
                        })}

                        <Fab
                            variant="extended"
                            onClick={toggleDrawer("left", true)}
                            className='AnswersButton'
                            color='secondary'
                        >
                            <ArticleIcon sx={{ mr: 1 }} />
                            პასუხები
                        </Fab>
                        <Drawer
                            onRequestChange={(open) => toggleDrawer("left", open)}
                            anchor={"left"}
                            open={state["left"]}
                            onClose={toggleDrawer("left", false)}
                        >
                            {list("left")}
                        </Drawer>
                        <ScrollButtonComponent problems={problems} />
                        <ScoreComponent></ScoreComponent>
                    </>
                ) : (
                    <TestDoneComponent />
                )}
            </div>
        </div>
    )
}
export default TestComponent;