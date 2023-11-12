import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setAnswers, setComponentOrder, setErovnuli, setIsLoading, setMaxScore, setProblems, setScore, setSimilars, setTestHasStarted, setTestIsDone, setTestType, setTime } from '../../../slices/TestSlice';
import { Button, FormControl, InputLabel, MenuItem, Select, Tab, Tabs } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';

import AnswersJSON from '../../../assets/AnswersForEveryTest.json';
import SimilarJSON from '../../../assets/SimilarsForEveryTest.json';

import './StartTestComponent.scss';

console.log(SimilarJSON);

function StartTestComponent({ isLoadingSetter }) {
    const dispatch = useDispatch();

    const testType = useSelector((state) => state.test.testType);

    const availableYears = Object.entries(AnswersJSON).map((AnswerJson, indxe) => parseInt(AnswerJson[0]));
    //const availableYears = [2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010]; 
    console.log(availableYears)

    const generateProblems = () => {

        const NumberOf1PointProblems = 37;
        const NumberOf3PointProblems = 2;
        const NumberOf4PointProblems = 2;

        dispatch(setMaxScore(NumberOf1PointProblems));
        localStorage.setItem('MaxScore', NumberOf1PointProblems);

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
            const VersionInfoJSON = require('../../../assets/' + Year + '/info.json');

            const Version = Math.floor(Math.random() * VersionInfoJSON['NumberOfVersionsInThatYear']) + 1;
            const Problem = Math.floor(Math.random() * VersionInfoJSON['NumberOf1PointProblems']);

            const ProblemObject = {
                Year: Year,
                Version: Version,
                Problem: Problem
            };
            if (Used[Year][Version][Problem] == false) {

                generatedProblems.push(ProblemObject);
                Used[Year][Version][Problem] = true;
                generatedAnswers.push(AnswersJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem]);
                console.log(ProblemObject.Year, ProblemObject.Version,ProblemObject.Problem);
                generatedSimilars.push(SimilarJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem]);
                Generated1PointProblems += 1;
            }
        }

        //GENERATE 3 POINT PROBLEMS
        while (Generated3PointProblems != NumberOf3PointProblems) {

            const Year = availableYears[Math.floor(Math.random() * availableYears.length)];
            const VersionInfoJSON = require('../../../assets/' + Year + '/info.json');

            const Version = Math.floor(Math.random() * VersionInfoJSON['NumberOfVersionsInThatYear']) + 1;

            const Problem = Math.floor(Math.random() * VersionInfoJSON['NumberOf3PointProblems']) + VersionInfoJSON['NumberOf1PointProblems'] + VersionInfoJSON['NumberOf2PointProblems'];

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
            const VersionInfoJSON = require('../../../assets/' + Year + '/info.json');

            const Version = Math.floor(Math.random() * VersionInfoJSON['NumberOfVersionsInThatYear']) + 1;

            const Problem = Math.floor(Math.random() * VersionInfoJSON['NumberOf4PointProblems']) + VersionInfoJSON['NumberOf1PointProblems'] + VersionInfoJSON['NumberOf2PointProblems'] + VersionInfoJSON['NumberOf3PointProblems'];

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

        const VersionInfoJSON = require('../../../assets/' + Year + '/info.json');

        const NumberOf1PointProblems = VersionInfoJSON['NumberOf1PointProblems'];
        const NumberOf2PointProblems = VersionInfoJSON['NumberOf2PointProblems'];
        const NumberOf3PointProblems = VersionInfoJSON['NumberOf3PointProblems'];
        const NumberOf4PointProblems = VersionInfoJSON['NumberOf4PointProblems'];

        dispatch(setMaxScore(NumberOf1PointProblems))
        localStorage.setItem('MaxScore', NumberOf1PointProblems);


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
                Problem: GeneratedProblems
            };
            generatedProblems.push(ProblemObject);
            generatedAnswers.push(AnswersJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem + 1])
            generatedSimilars.push(SimilarJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem + 1]);
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

    const handleStart = () => {
        if (value == 0) {
            const localStorageTestObject = localStorage.getItem('TestObject');
            if (!localStorageTestObject) {
                dispatch(setTestType('Custom'));
                const generatedData = generateProblems();
                console.log(generatedData);
                dispatch(setProblems(generatedData.Problems));
                dispatch(setAnswers(generatedData.Answers));
                dispatch(setSimilars(generatedData.Similars));
                localStorage.setItem('TestObject', JSON.stringify({
                    Problems: generatedData.Problems,
                    Answers: generatedData.Answers,
                    Similars: generatedData.Similars
                }))
            }
            else {
                const parsedTestObject = JSON.parse(localStorageTestObject);
                dispatch(setProblems(parsedTestObject.Problems));
                dispatch(setAnswers(parsedTestObject.Answers));
                dispatch(setSimilars(parsedTestObject.Similars));
            }
        }
        else if (value == 1) {
            const localStorageTestObject = localStorage.getItem('TestObject');
            if (!localStorageTestObject) {
                const generatedData = generateErovnuli(year, version);
                console.log(generatedData);
                dispatch(setProblems(generatedData.Problems));
                dispatch(setAnswers(generatedData.Answers));
                dispatch(setSimilars(generatedData.Similars));
                localStorage.setItem('TestObject', JSON.stringify({
                    Problems: generatedData.Problems,
                    Answers: generatedData.Answers,
                    Similars: generatedData.Similars
                }))
                dispatch(setTestType('Erovnuli'));
            } else {
                const parsedTestObject = JSON.parse(localStorageTestObject);
                dispatch(setProblems(parsedTestObject.Problems));
                dispatch(setAnswers(parsedTestObject.Answers));
                dispatch(setSimilars(parsedTestObject.Similars));
            }
        }

        dispatch(setComponentOrder('Test'));
        dispatch(setScore(0));
        dispatch(setTime(0));
        dispatch(setTestHasStarted(true));
        localStorage.setItem('TestHasStarted', true);
        isLoadingSetter(true);
    }

    const [year, setYear] = useState(2023);
    const [version, setVersion] = useState(1);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
        console.log(year);
    };
    const handleVersionChange = (event) => {
        setVersion(event.target.value);
        console.log(version);
    };
    console.log(value);

    const getVersions = (Year) => {
        const VersionInfoJSON = require('../../../assets/' + Year + '/info.json');
        return Array.from({ length: VersionInfoJSON['NumberOfVersionsInThatYear'] }, (_, i) => i + 1)
    }

    console.log(useSelector((state) => state.test.problems))

    return (
        <>
            <div className="StartTestComponent">
                <div className="ChooseTest">
                    <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
                        <Tab label="ტესტის გენერატორი" />
                        <Tab label="ეროვნული გამოცდები" />
                    </Tabs>
                    <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
                        <div className='StartTest-TestGenerator' value={value} index={0}>
                            <div className="TestGenerator-Label">
                                ტესტის გენერატორი
                            </div>
                            <div>
                                <div className="TestGenerator-Content-Left">

                                </div>
                                <div className="TestGenerator-Content-Right">

                                </div>
                            </div>
                        </div>
                        <div className='StartTest-Erovnuli' value={value} index={1}>
                            <h2>ეროვნული გამოცდები</h2>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">წელი</InputLabel>
                                <Select
                                    defaultValue={2023}
                                    value={year}
                                    label="Year"
                                    onChange={handleYearChange}
                                >
                                    <MenuItem value={2023}>2023</MenuItem>
                                    <MenuItem value={2022}>2022</MenuItem>
                                    <MenuItem value={2021}>2021</MenuItem>
                                    <MenuItem value={2020}>2020</MenuItem>
                                    <MenuItem value={2019}>2019</MenuItem>
                                    <MenuItem value={2018}>2018</MenuItem>
                                    <MenuItem value={2017}>2017</MenuItem>
                                    <MenuItem value={2016}>2016</MenuItem>
                                    <MenuItem value={2015}>2015</MenuItem>
                                    <MenuItem value={2014}>2014</MenuItem>
                                    <MenuItem value={2013}>2013</MenuItem>
                                    <MenuItem value={2012}>2012</MenuItem>
                                    <MenuItem value={2011}>2011</MenuItem>
                                    <MenuItem value={2010}>2010</MenuItem>
                                    <MenuItem value={2009}>2009</MenuItem>
                                    <MenuItem value={2008}>2008</MenuItem>
                                    {/* <MenuItem value={2007}>2007</MenuItem> */}
                                    {/* <MenuItem value={2006}>2006</MenuItem> */}
                                    {/* <MenuItem value={2005}>2005</MenuItem> */}
                                    <MenuItem value={2004}>2023 მაჭარაშვილი ტესტი #1</MenuItem>
                                    <MenuItem value={2003}>2023 მაჭარაშვილი ტესტი #2</MenuItem>
                                    <MenuItem value={2002}>2023 მაჭარაშვილი ტესტი #3</MenuItem>
                                    <MenuItem value={2001}>2023 მაჭარაშვილი ტესტი #4</MenuItem>
                                    <MenuItem value={2000}>2023 მაჭარაშვილი ტესტი #5</MenuItem>
                                    <MenuItem value={1999}>2023 მაჭარაშვილი ტესტი #6</MenuItem>
                                    <MenuItem value={1998}>2023 მაჭარაშვილი ტესტი #7</MenuItem>
                                    <MenuItem value={1997}>2023 მაჭარაშვილი ტესტი #8</MenuItem>
                                    <MenuItem value={1996}>2023 მაჭარაშვილი ტესტი #9</MenuItem>
                                    <MenuItem value={1995}>2023 მაჭარაშვილი ტესტი #10</MenuItem>
                                    <MenuItem value={1994}>2023 მაჭარაშვილი ტესტი #11</MenuItem>
                                    <MenuItem value={1993}>2023 მაჭარაშვილი ტესტი #12</MenuItem>
                                    <MenuItem value={1992}>2023 მაჭარაშვილი ტესტი #13</MenuItem>
                                    <MenuItem value={1991}>2023 მაჭარაშვილი ტესტი #14</MenuItem>
                                    <MenuItem value={1990}>2023 მაჭარაშვილი ტესტი #15</MenuItem>
                                    <MenuItem value={1989}>2023 მაჭარაშვილი ტესტი #16</MenuItem>
                                    <MenuItem value={1988}>2023 მაჭარაშვილი ტესტი #17</MenuItem>

                                    {/* <MenuItem value={1987}>2023 მაჭარაშვილი ტესტი #18</MenuItem>
                                    <MenuItem value={1986}>2023 მაჭარაშვილი ტესტი #19</MenuItem>
                                    <MenuItem value={1985}>2023 მაჭარაშვილი ტესტი #20</MenuItem>
                                    <MenuItem value={1984}>2023 მაჭარაშვილი ტესტი #21</MenuItem>
                                    <MenuItem value={1983}>2023 მაჭარაშვილი ტესტი #22</MenuItem>
                                    <MenuItem value={1982}>2023 მაჭარაშვილი ტესტი #23</MenuItem>
                                    <MenuItem value={1981}>2023 მაჭარაშვილი ტესტი #24</MenuItem>
                                    <MenuItem value={1980}>2023 მაჭარაშვილი ტესტი #25</MenuItem> */}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">ვარიანტი</InputLabel>
                                <Select
                                    defaultValue={1}
                                    value={version}
                                    label="Version"
                                    onChange={handleVersionChange}
                                >
                                    {getVersions(year).map((Version, index) => {
                                        return (<MenuItem value={Version}>{Version == 1 ? 'I' : Version == 2 ? 'II' : 'III'} ვარიანტი</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                    </SwipeableViews>
                </div>
                <div className="StartTest-Button">
                    <div>*დრო ჩაირთვება ტესტის ეკრანზე ჩატვირთვისთანავე</div>
                    <Button variant='contained' color='primary' style={{ color: 'white' }} onClick={handleStart}>dawyeba bozi viyo</Button>
                </div>
            </div>
        </>
    )
}

export default StartTestComponent