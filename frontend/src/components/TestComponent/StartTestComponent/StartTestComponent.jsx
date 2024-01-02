import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setAnswers, setComponentOrder, setErovnuli, setIsLoading, setMaxScore, setProblems, setScore, setSimilars, setTestHasStarted, setTestIsDone, setTestType, setTime } from '../../../slices/TestSlice';
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Tab, Tabs } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SwipeableViews from 'react-swipeable-views';

import AnswersJSON from '../../../assets/AnswersForEveryTest.json';
import SimilarJSON from '../../../assets/SimilarsForEveryTest.json';

import TestGenConfig from '../../../config/Test/TestGeneratationConfig.json';

import './StartTestComponent.scss';

console.log(SimilarJSON);

function StartTestComponent({ isLoadingSetter }) {
    const dispatch = useDispatch();

    const [ErovnuliChechbox,setErovnuliCheckbox] = useState(true);
    const [TestChechbox,setTestCheckbox] = useState(true);

    const testType = useSelector((state) => state.test.testType);

    const EROVNULI_BORDER = {"LEFT":2023,"RIGHT":2008};
    const TEST_BORDER = {"LEFT":2004,"RIGHT":1980};

    let availableYears = [];
    if(ErovnuliChechbox){
        // availableYears = Object.entries(AnswersJSON).filter((AnswerJson, indxe) => {
        // });
        for(let i = EROVNULI_BORDER.LEFT;i>=EROVNULI_BORDER.RIGHT;i--)
        {
            availableYears.push(i);
        }
    }

    if(TestChechbox){
        for(let i = TEST_BORDER.LEFT;i>=TEST_BORDER.RIGHT;i--)
        {
            availableYears.push(i);
        }
    }

    //const availableYears = [2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010]; 
    console.log(availableYears)

    const findProblemRange = (k,n) => {
        if(k==1){
            if (n >= 1 && n <= 1) {
                return 1;
            } else if (n>=2 && n<=5) {
            return 2;
            } else if (n>=6 && n<=9) {
                return 3;
            } else if (n>=10 && n<=16) {
                return 4;
            } else if (n>=17 && n<=23) {
                return 5;
            } else if (n>=24 && n<=29) {
                return 6;
            } else if (n>=30 && n<=33) {
                return 7;
            } else if (n>=34 && n<=37) {
                return 8;
            }
        }
        else if(k==3){
            if(n>=38 && n<=39)
            {
                return 1;
            }
        }
        else if(k==4){
            if(n>=40 && n<=40){
                return 1;
            }
            else if(n>=41 && n<=41){
                return 2;
            }
        }
    };
    

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

            console.log("==== GENERATING AMOCANA #",Generated1PointProblems+1," ====");

            const Year = availableYears[Math.floor(Math.random() * availableYears.length)];
            const VersionInfoJSON = require('../../../assets/' + Year + '/info.json');
            const NumberOfAllProblems = VersionInfoJSON['NumberOf1PointProblems']+VersionInfoJSON['NumberOf2PointProblems']+
            VersionInfoJSON['NumberOf3PointProblems']+VersionInfoJSON['NumberOf4PointProblems'];

            const Version = Math.floor(Math.random() * VersionInfoJSON['NumberOfVersionsInThatYear']) + 1;

            console.log("Year:",Year, "Version", Version);

            let Problem = null;

            if(GenType === 0){
                let ProblemRange = findProblemRange(1,Generated1PointProblems+1);
                console.log("ProblemRange",ProblemRange);

                //console.log(TestGenConfig);

                console.log("NumberOfAllProblems",NumberOfAllProblems);
                console.log("Config[Range]",TestGenConfig["Ranges"][NumberOfAllProblems]);

                let TestLeftBorder = TestGenConfig["Ranges"][NumberOfAllProblems]["1"][ProblemRange];
                let TestRightBorder = TestGenConfig["Ranges"][NumberOfAllProblems]["1"][ProblemRange+1];

                if(TestRightBorder == undefined){
                    if(TestGenConfig["Ranges"][NumberOfAllProblems]["2"]["1"] === -1){
                        TestRightBorder = TestGenConfig["Ranges"][NumberOfAllProblems]["3"]["1"]-1;
                    }
                    else TestRightBorder = TestGenConfig["Ranges"][NumberOfAllProblems]["2"]["1"]-1;
                }

                console.log("Borders: ",TestLeftBorder,TestRightBorder);

                Problem = TestLeftBorder+ Math.floor(Math.random() * (TestRightBorder-TestLeftBorder)) -1;
            }
            else if(GenType===1){
                Problem = Math.floor(Math.random() * VersionInfoJSON['NumberOf1PointProblems']);
            }

                const ProblemObject = {
                    Year: Year,
                    Version: Version,
                    Problem: Problem
                };
                if (Used[Year][Version][Problem] == false) {
    
                    generatedProblems.push(ProblemObject);
                    Used[Year][Version][Problem] = true;
                    generatedAnswers.push(AnswersJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem+1])
                    generatedSimilars.push(SimilarJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem+1]);
                    Generated1PointProblems += 1;
    
                    console.log("==== MORCHA GENERATING AMOCANA #",Generated1PointProblems+1," ====");
    
                }
        }

        //GENERATE 3 POINT PROBLEMS
        while (Generated3PointProblems != NumberOf3PointProblems) {

            console.log("==== GENERATING AMOCANA #",Generated1PointProblems+Generated3PointProblems+1," ====")


            const Year = availableYears[Math.floor(Math.random() * availableYears.length)];
            const VersionInfoJSON = require('../../../assets/' + Year + '/info.json');

            const NumberOfAllProblems = VersionInfoJSON['NumberOf1PointProblems']+VersionInfoJSON['NumberOf2PointProblems']+
            VersionInfoJSON['NumberOf3PointProblems']+VersionInfoJSON['NumberOf4PointProblems'];

            const Version = Math.floor(Math.random() * VersionInfoJSON['NumberOfVersionsInThatYear']) + 1;

            let Problem = null;

            if(GenType==0){
                let ProblemRange = findProblemRange(3,Generated1PointProblems+Generated3PointProblems+1);
                console.log("ProblemRange",ProblemRange);

                //console.log(TestGenConfig);

                console.log("NumberOfAllProblems",NumberOfAllProblems);
                console.log("Config[Range]",TestGenConfig["Ranges"][NumberOfAllProblems]);

                let TestLeftBorder = TestGenConfig["Ranges"][NumberOfAllProblems]["3"][ProblemRange];
                let TestRightBorder = TestGenConfig["Ranges"][NumberOfAllProblems]["3"][ProblemRange+1];

                if(TestRightBorder == undefined){
                    TestRightBorder = TestGenConfig["Ranges"][NumberOfAllProblems]["4"]["1"]-1;
                }

                console.log("Borders: ",TestLeftBorder,TestRightBorder);

                Problem = TestLeftBorder+ Math.floor(Math.random() * (TestRightBorder-TestLeftBorder)) -1;
            } else if(GenType===1){
                Problem = Math.floor(Math.random() * VersionInfoJSON['NumberOf3PointProblems']) + VersionInfoJSON['NumberOf1PointProblems'] + VersionInfoJSON['NumberOf2PointProblems'];
            }

            //const Problem = Math.floor(Math.random() * VersionInfoJSON['NumberOf3PointProblems']) + VersionInfoJSON['NumberOf1PointProblems'] + VersionInfoJSON['NumberOf2PointProblems'];

            const ProblemObject = {
                Year: Year,
                Version: Version,
                Problem: Problem
            };
            if (Used[Year][Version][Problem] == false) {

                console.log("==== MORCHA GENERATING AMOCANA #",Generated1PointProblems+Generated3PointProblems+1," ====")


                generatedProblems.push(ProblemObject)
                Used[Year][Version][Problem] = true;

                console.log(ProblemObject.Year, ProblemObject.Version,ProblemObject.Problem+1);


                generatedAnswers.push(AnswersJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem+1])
                generatedSimilars.push(SimilarJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem+1]);
                Generated3PointProblems += 1;

                
            }
        }

        //GENERATE 4 POINT PROBLEMS
        while (Generated4PointProblems != NumberOf4PointProblems) {

            const Year = availableYears[Math.floor(Math.random() * availableYears.length)];
            const VersionInfoJSON = require('../../../assets/' + Year + '/info.json');

            const NumberOfAllProblems = VersionInfoJSON['NumberOf1PointProblems']+VersionInfoJSON['NumberOf2PointProblems']+
            VersionInfoJSON['NumberOf3PointProblems']+VersionInfoJSON['NumberOf4PointProblems'];


            const Version = Math.floor(Math.random() * VersionInfoJSON['NumberOfVersionsInThatYear']) + 1;

            let Problem = null;

            if(GenType===0){
                let ProblemRange = findProblemRange(4,Generated1PointProblems+Generated3PointProblems+Generated4PointProblems+1);
                console.log("ProblemRange",ProblemRange);

                //console.log(TestGenConfig);

                console.log("NumberOfAllProblems",NumberOfAllProblems);
                console.log("Config[Range]",TestGenConfig["Ranges"][NumberOfAllProblems]);

                let TestLeftBorder = TestGenConfig["Ranges"][NumberOfAllProblems]["4"][ProblemRange];
                let TestRightBorder = TestGenConfig["Ranges"][NumberOfAllProblems]["4"][ProblemRange+1];

                if(TestRightBorder == undefined){
                    TestRightBorder = TestGenConfig["Ranges"][NumberOfAllProblems]["4"]["2"]+1;
                }

                console.log("Borders: ",TestLeftBorder,TestRightBorder);

                Problem = TestLeftBorder+ Math.floor(Math.random() * (TestRightBorder-TestLeftBorder)) -1;
            } else if(GenType===1){
                Problem = Math.floor(Math.random() * VersionInfoJSON['NumberOf4PointProblems']) + VersionInfoJSON['NumberOf1PointProblems'] + VersionInfoJSON['NumberOf2PointProblems'] + VersionInfoJSON['NumberOf3PointProblems'];
            }

            const ProblemObject = {
                Year: Year,
                Version: Version,
                Problem: Problem
            };
            if (Used[Year][Version][Problem] == false) {

                generatedProblems.push(ProblemObject)
                Used[Year][Version][Problem] = true;
                console.log(ProblemObject.Year, ProblemObject.Version,ProblemObject.Problem+1);

                generatedAnswers.push(AnswersJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem+1])
                generatedSimilars.push(SimilarJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem+1]);
                Generated4PointProblems += 1;
            }
        }
        console.log(generatedProblems);
        console.log(generatedAnswers);
        console.log(generatedSimilars);
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

    const [GenType,setGenType] = useState(0);

    const handleGenTypeChange = (event) => {
        setGenType(event.target.value);
    }

    return (
        <>
            <div className="StartTestComponent">
                <div className="ChooseTest">
                    <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
                        <Tab label="ტესტის გენერატორი" style={{fontWeight:'bold'}} />
                        <Tab label="ეროვნული გამოცდები" style={{fontWeight:'bold'}}/>
                    </Tabs>
                    <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
                        <div className='StartTest-TestGenerator' value={value} index={0}>
                            <div className="TestGenerator-Label">
                                ტესტის გენერატორი
                            </div>
                            <div className='StartTest-Configuration'>
                            <div className='StartTest-Configuration-Problems'>
                                <FormControl>
                                    <InputLabel id="type-label">გენერაციის ტიპი</InputLabel>
                                    <Select
                                        value={GenType}
                                        label="გენერაციის ტიპი"
                                        onChange={handleGenTypeChange}
                                    >
                                        <MenuItem value={0}>რეალისტური</MenuItem>
                                        <MenuItem value={1}>შემთხვევითი</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl className='StartTest-Configuration-Problems-Checkboxs'>
                                    <FormControlLabel checked={ErovnuliChechbox} control={<Checkbox onClick={
                                        () => {
                                            if(TestChechbox){
                                                setErovnuliCheckbox(!ErovnuliChechbox);
                                            }                                            
                                        }
                                    } checkedIcon={<CheckBoxIcon />}  />} label="ეროვნულები" />
                                    <FormControlLabel control={<Checkbox checked={TestChechbox} onClick={
                                        () => {
                                            if(ErovnuliChechbox)
                                            {
                                                setTestCheckbox(!TestChechbox);
                                            }
                                        }
                                    } checkedIcon={<CheckBoxIcon />}  />} label="მაჭარაშვილის ტესტები" />
                                </FormControl>
                            </div>
                            </div>
                            <div className='TestGenerator-Content'>
                                <div className="TestGenerator-Content-Left">
                                    <div className='Left-Top'>
                                        <h2>შექმენი ახალი ტესტები</h2>
                                        <h4>ტესტები აღარასოდეს გამოგელევა</h4>
                                    </div>
                                    <div className='Left-Bottom'>
                                        <ul>
                                            <li>
                                                გახადე მათემატიკა უფრო სახალისო
                                            </li>
                                            <li>
                                                რეალისტური და შემთხვევითი გენერაცია
                                            </li>
                                            <li>
                                                ტესტის,პასუხების და დროის შენახვა
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="TestGenerator-Content-Right">
                                    <img src={process.env.PUBLIC_URL+'images/TestHero.png'} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className='StartTest-Erovnuli' value={value} index={1}>
                            <div className="Erovnuli-Label">
                                ეროვნული გამოცდები
                            </div>
                            <div className='Erovnuli-Configuration'>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">წელი</InputLabel>
                                    <Select
                                        defaultValue={2023}
                                        value={year}
                                        label="Year"
                                        onChange={handleYearChange}
                                    >
                                        <MenuItem value={2023}>2023 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
                                        <MenuItem value={2022}>2022 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
                                        <MenuItem value={2021}>2021 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
                                        <MenuItem value={2020}>2020 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
                                        <MenuItem value={2019}>2019 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
                                        <MenuItem value={2018}>2018 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
                                        <MenuItem value={2017}>2017 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
                                        <MenuItem value={2016}>2016 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
                                        <MenuItem value={2015}>2015 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
                                        <MenuItem value={2014}>2014 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
                                        <MenuItem value={2013}>2013 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
                                        <MenuItem value={2012}>2012 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
                                        <MenuItem value={2011}>2011 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
                                        <MenuItem value={2010}>2010 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
                                        <MenuItem value={2009}>2009 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
                                        <MenuItem value={2008}>2008 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
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
                                        <MenuItem value={1987}>2023 მაჭარაშვილი ტესტი #18</MenuItem>
                                        <MenuItem value={1986}>2023 მაჭარაშვილი ტესტი #19</MenuItem>
                                        <MenuItem value={1985}>2023 მაჭარაშვილი ტესტი #20</MenuItem>
                                        <MenuItem value={1984}>2023 მაჭარაშვილი ტესტი #21</MenuItem>
                                        <MenuItem value={1983}>2023 მაჭარაშვილი ტესტი #22</MenuItem>
                                        <MenuItem value={1982}>2023 მაჭარაშვილი ტესტი #23</MenuItem>
                                        <MenuItem value={1981}>2023 მაჭარაშვილი ტესტი #24</MenuItem>
                                        <MenuItem value={1980}>2023 მაჭარაშვილი ტესტი #25</MenuItem>
                                    </Select>
                                </FormControl>
                                <span style={{width:'20px'}}>
                                </span>
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
                            <div className='Erovnuli-Content'>
                                <div className="Erovnuli-Content-Left">
                                    <img src={process.env.PUBLIC_URL+'images/ErovnuliHero.png'} alt="" />
                                </div>
                                <div className="Erovnuli-Content-Right">
                                    <div className='Left-Top'>
                                        <h2>არსებული ტესტები</h2>
                                        <h4>ყველაფერი ერთ ადგილას</h4>
                                    </div>
                                    <div className='Left-Bottom'>
                                        <ul>
                                            <li>
                                                უკვე გამოყენებული და ჩვენი შექმნილი ტესტები
                                            </li>
                                            <li>
                                                ტესტების პასუხები და ვიდეო ამოხსნები
                                            </li>
                                            <li>
                                                ამოცანის მსგავსი ამოცანები
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwipeableViews>
                </div>
                <div className="StartTest-Button">
                    <div
                    style={{marginBottom:'5px'}}
                    >*დრო ჩაირთვება ტესტის ეკრანზე ჩატვირთვისთანავე</div>
                    <Button variant='contained' color='primary' style={{ color: 'white' }} onClick={handleStart}>ტესტის დაწყება</Button>
                </div>
            </div>
        </>
    )
}

export default StartTestComponent