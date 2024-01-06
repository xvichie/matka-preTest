import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Dropdown from 'react-bootstrap/Dropdown';

import { useSelector, useDispatch } from 'react-redux';
import { setTests } from '../../../slices/userTestsSlice';
import PDFViewer from '../../TestComponent/ProblemComponent/PDFViewer';

import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import './MyTestsComponent.scss';
import { Button, ButtonGroup, Fab, IconButton } from '@mui/material';
import SimilarProblemModalComponent from '../../TestComponent/SimilarProblemComponent/SimilarProblemModalComponent';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SimilarModalComponent from './SimilarModalComponent/SimilarModalComponent';
import { useTheme } from '@emotion/react';
import AnswerSheetModalComponent from './AnswerSheetModalComponent/AnswerSheetModalComponent';

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

    // require('../../../assets')
    console.log(currentTest);
    return (
        <div className='MyTests'>
            <div className="MyTests-Label">
                <h2>
                    ჩემი ტესტები
                </h2>
            </div>
            <div className='MyTests-Dropdown'>
                <Dropdown >
                    <Dropdown.Toggle style={{ backgroundColor: theme.palette.primary.main,height:'100%' }} disabled={!(tests.length > 0)} variant="success" id="dropdown-basic">
                        {currentTest === null ? ("აირჩიე ტესტი") : tests[currentTest]._id}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ maxHeight: '200px', overflow: 'scroll' }}>
                        {tests.map((test, index) => (
                            <div key={test._id}>
                                <Dropdown.Item eventKey={index} onClick={() => setCurrentTest(index)}>ტესტი:{test._id}</Dropdown.Item>
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
                                            <Button className='Test-SolutionButton' style={{ borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px' }}><EmojiObjectsIcon></EmojiObjectsIcon>ამოხსნა</Button>
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