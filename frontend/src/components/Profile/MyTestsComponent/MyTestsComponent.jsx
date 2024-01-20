import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Dropdown from 'react-bootstrap/Dropdown';

import { useSelector, useDispatch } from 'react-redux';
import { setTests } from '../../../slices/userTestsSlice';
import PDFViewer from '../../TestComponent/ProblemComponent/PDFViewer';

import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import SolutionsJSON from '../../../assets/SolutionURLsForEveryTest.json';

import {toast} from 'react-toastify';

import './MyTestsComponent.scss';
import { Button, ButtonGroup, Fab, IconButton } from '@mui/material';
import SimilarProblemModalComponent from '../../TestComponent/SimilarProblemComponent/SimilarProblemModalComponent';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShareIcon from '@mui/icons-material/Share';
import SimilarModalComponent from './SimilarModalComponent/SimilarModalComponent';
import { useTheme } from '@emotion/react';
import AnswerSheetModalComponent from './AnswerSheetModalComponent/AnswerSheetModalComponent';
import SolutionComponent from '../../TestComponent/SolutionComponent/SolutionComponent';

function MyTestsComponent() {

    const { user } = useAuth0();

    const [currentTest, setCurrentTest] = useState(null);


    const tests = useSelector((state) => state.userTests.tests);
    //console.log(tests);
    const dispatch = useDispatch();
    const theme = useTheme()

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/userTests', {
                    params: {
                        email: user.email,
                    },
                });

                // Use the setTests action creator with dispatch
                dispatch(setTests(response.data));
            } catch (error) {
                console.error(error);
            }
        };

        fetchTests();
    }, [user.email]); // Add user.email to the dependency array to fetch data when user.email changes


    const CopyTestUrlToClipboard = () => {
        try{
            let url = window.location.host+'/test/'+tests[currentTest]._id;
            navigator.clipboard.writeText(url);
            toast.success('თქვენი ტესტის ლინკი ჩაკოპირებულია. გაუგზავნეთ იგი მეგობრებს, რომ ნახონ თქვენი ტესტი!', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        catch
        {
            toast.error('თქვენი ტესტი ვერ ჩაკოპირდა! ცადეთ ახლიდან.', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    console.log(currentTest);
    return (
        <div className='MyTests'>
            <div className="MyTests-Label">
                <h2>
                    ჩემი ტესტები
                </h2>
            </div>
            <div className='MyTests-Dropdown'>
                <div className="Dropdown-Top">
                    <Dropdown >
                        <Dropdown.Toggle style={{ backgroundColor: theme.palette.primary.main,height:'100%' }} disabled={!(tests.length > 0)} variant="success" id="dropdown-basic">
                            {currentTest === null ? ("აირჩიე ტესტი") : 'ტესტი #'+(currentTest+1)+' ('+tests[currentTest]._id+')'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '200px', overflow: 'scroll' }}>
                            {tests.map((test, index) => (
                                <div key={test._id}>
                                    <Dropdown.Item eventKey={index} onClick={() => setCurrentTest(index)}>ტესტი #{(index+1)}{' ('}{test._id}{')'}</Dropdown.Item>
                                </div>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    {currentTest !== null && tests.length > 0 &&
                    <AnswerSheetModalComponent 
                        ButtonIcon={ReceiptIcon} 
                        currentTest={currentTest}
                    >
                    </AnswerSheetModalComponent>}
                </div>
                <div className="Dropdown-Bottom">
                    {currentTest !== null && tests.length > 0 &&
                        <Button 
                        variant='outlined'
                        className='Share-Button'
                        onClick={CopyTestUrlToClipboard}
                        ><ShareIcon 
                        sx={{mr:2}}
                        ></ShareIcon> გააზიარე ტესტი</Button>
                    }
                </div>
            </div>
            {currentTest !== null && tests.length > 0 ? ( // Conditional rendering based on currentTest and tests length
                <div className="MyTests-TestViewer">
                    <div className="MyTests-TestViewer-Tests">
                        {tests[currentTest].test[0].problems.map((problem, index) => (
                                <div className='MyTests-TestViewer-Test' key={tests[currentTest]._id+'-TestDiv-'+index}>
                                    <div className='ProblemLabel'>
                                        <h3>
                                            {problem.Problem <= require('../../../assets/' + problem.Year + '/info.json')['NumberOf1PointProblems'] - 1 ? "(1)"
                                                :
                                                problem.Problem <= require('../../../assets/' + problem.Year + '/info.json')['NumberOf1PointProblems'] - 1 + require('../../../assets/' + problem.Year + '/info.json')['NumberOf2PointProblems']
                                                    ? "(2)"
                                                    :
                                                    problem.Problem <= require('../../../assets/' + problem.Year + '/info.json')['NumberOf1PointProblems'] - 1 + require('../../../assets/' + problem.Year + '/info.json')['NumberOf2PointProblems'] + require('../../../assets/' + problem.Year + '/info.json')['NumberOf3PointProblems']
                                                        ? "(3)"
                                                        :
                                                        "(4)"}{(index + 1)}
                                        </h3>
                                    </div>
                                    <PDFViewer 
                                        id={'problem-' + index} 
                                        Problem={problem} />
                                    <div className="PDFButtons">
                                        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                                            <SolutionComponent color='secondary' ViewedIn={'Test'} index={index} ButtonIcon={EmojiObjectsIcon} VideoURL={SolutionsJSON[problem.Year][problem.Version][problem.Problem+1]} ></SolutionComponent>
                                            <SimilarModalComponent ButtonIcon={ContentCopyIcon} index={index} currentTest={currentTest} ViewedIn={'MyTests'}></SimilarModalComponent>
                                        </ButtonGroup>
                                    </div>
                                </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className='ChooseTest-Placeholder'>
                    <RemoveRedEyeIcon className='Placeholder-Icon'></RemoveRedEyeIcon>
                    აირჩიე ტესტი
                </div>
            )}
        </div>
    )
}

export default MyTestsComponent