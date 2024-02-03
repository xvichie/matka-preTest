import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './ViewTestScreen.scss';
import axios from 'axios';
import { toast } from 'react-toastify';

import ReceiptIcon from '@mui/icons-material/Receipt';
import AnswerSheetModal from './AnswerSheetModal/AnswerSheetModal';
import { Button, ButtonGroup } from '@mui/material';
import SimilarModalComponent from '../../../components/Profile/MyTestsComponent/SimilarModalComponent/SimilarModalComponent';
import PDFViewer from '../../../components/TestComponent/ProblemComponent/PDFViewer';

import AdPlaceholderComponent from '../../../components/AdPlaceholderComponent/AdPlaceholderComponent';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import SolutionsJSON from '../../../assets/SolutionURLsForEveryTest.json';
import SolutionComponent from '../../../components/TestComponent/SolutionComponent/SolutionComponent';
import Endpoints from '../../../api/Endpoints';

function ViewTestScreen() {

  const params = useParams();
  const testId = params.TestId;

  const [TestObject,SetTestObject] = useState(null);
  const [test,setTest] = useState(null);

  useEffect(() => {
    
    const FetchTest = async () =>{
      try{
        const response = await axios.get(Endpoints.getTestById+testId);
        console.log(response.status);
        if(response.status == 200){
          SetTestObject(response.data);
          setTest(TestObject.test);
          console.log('shemodis');
        }
      }
      catch{
          console.error("Error Finding Test!");
      }
    }

    FetchTest();

  },[]);

  console.log(TestObject);

  return (
    <div className='ViewTestScreen'>
      <div className="ViewTestScreen-Wrapper">
        <AdPlaceholderComponent AdId={6}></AdPlaceholderComponent>
        {TestObject ? (
          <>
            <div className="ViewTestScreen-Labels">
              <h1>ტესტი:{' '}<span>{testId}</span></h1>
              <h3>ავტორი:{' '}<span>{TestObject.email}</span></h3>
            </div>
            <div className="ViewTestScreen-Stats">
              {/* Other content or stats related to the test */}
            </div>
            <div className="ViewTestScreen-TestView">
                <AnswerSheetModal
                ButtonIcon={ReceiptIcon}
                Test={TestObject}
                >
                </AnswerSheetModal>
                <div className="MyTests-TestViewer">
                    <div className="MyTests-TestViewer-Tests">
                        {TestObject.test[0].problems.map((problem, index) => (
                                <div className='MyTests-TestViewer-Test' key={TestObject._id+'-TestDiv-'+index}>
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
                                            <SolutionComponent color='secondary' ViewedIn={'TestViewer'} index={index} ButtonIcon={EmojiObjectsIcon} VideoURL={SolutionsJSON[problem.Year][problem.Version][problem.Problem+1]} ></SolutionComponent>
                                        </ButtonGroup>
                                    </div>
                                </div>
                        ))}
                    </div>
                </div>
            </div>
          </>
        ) : (
          <div className='TestNotFound'>
            
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewTestScreen