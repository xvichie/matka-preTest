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
import { Button, ButtonGroup } from '@mui/material';
import SimilarProblemModalComponent from '../../TestComponent/SimilarProblemComponent/SimilarProblemModalComponent';
import SimilarModalComponent from './SimilarModalComponent/SimilarModalComponent';

function MyTestsComponent() {

    const { user } = useAuth0();

    const [currentTest, setCurrentTest] = useState(null);

    const tests = useSelector((state) => state.userTests.tests);
    //console.log(tests);
    const dispatch = useDispatch();


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


    return (
        <div className='MyTests'>
            <div className="MyTests-Label">
                <h2>
                    ჩემი ტესტები
                </h2>
            </div>
            <div className='MyTests-Dropdown'>
                <Dropdown >
                    <Dropdown.Toggle disabled={!(tests.length > 0)} variant="success" id="dropdown-basic">
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
            </div>
            {currentTest !== null && tests.length > 0 ? ( // Conditional rendering based on currentTest and tests length
                <div className="MyTests-TestViewer">
                    <div className="MyTests-TestViewer-Tests">
                        {tests[currentTest].test[0].problems.map((problem, index) => (
                            <>
                                <div className='MyTests-TestViewer-Test'>
                                    <PDFViewer id={'problem-' + index} key={'problem-' + index} Problem={problem} />
                                    <div className="PDFButtons">
                                        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                                            <Button className='Test-SolutionButton' style={{ borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px' }}><EmojiObjectsIcon></EmojiObjectsIcon>ამოხსნა</Button>
                                            {/* <Button className='Test-SimilarsButton' style={{ borderTopRightRadius: '50px', borderBottomRightRadius: '50px' }}>მსგავსი <ContentCopyIcon></ContentCopyIcon></Button> */}
                                            <SimilarModalComponent ButtonIcon={ContentCopyIcon} index={index} currentTest={currentTest} ViewedIn={'MyTests'}></SimilarModalComponent>
                                        </ButtonGroup>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    აირჩიე ტესტი
                </div>
            )}
        </div>
    )
}

export default MyTestsComponent