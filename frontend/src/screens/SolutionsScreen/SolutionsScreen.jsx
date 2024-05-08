import React, { useState } from 'react'
import './SolutionsScreen.scss';

import AdPlaceholderComponent from '../../components/AdPlaceholderComponent/AdPlaceholderComponent';
import {GetVersions, GetProblems} from '../../services/test/GetTestInfo.js';

import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PDFViewer from '../../components/TestComponent/ProblemComponent/PDFViewer.jsx';
import { ButtonGroup } from 'react-bootstrap';
import SolutionComponent from '../../components/TestComponent/SolutionComponent/SolutionComponent.jsx';
import SimilarModalComponent from '../../components/Profile/MyTestsComponent/SimilarModalComponent/SimilarModalComponent';

import SolutionsJSON from '../../assets/SolutionURLsForEveryTest.json';

import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

function SolutionsScreen() {

    const [Year, SetYear] = useState(2023);
    const [Version, SetVersion] = useState(1);
    const [Problem, SetProblem] = useState(1);

    const [ProblemObject, SetProblemObject] = useState();

    // console.log(SolutionsJSON)
    
    const handleProblemStatementSearch = () => {
        SetProblemObject({
            Problem: Problem-1,
            Version: Version,
            Year: Year
        });
    };
    
  return (
    <div className='SolutionsScreen'>
        <div className="SolutionsScreen-Wrapper">
            <AdPlaceholderComponent AdId={8}></AdPlaceholderComponent>
            <div className="SolutionsScreen-Label">
                <h1>ამოცანების ამოხსნები</h1>
            </div>
            <div className="SolutionsScreen-Content">
                <div className="Content-Choose">
                    <FormControl fullWidth>
                                            <InputLabel>წელი</InputLabel>
                                            <Select
                                                defaultValue={2023}
                                                value={Year}
                                                label="Year"
                                                onChange={(e) => {SetYear(e.target.value); SetVersion(1); SetProblem(1)}}
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
                                                <MenuItem value={2007}>2007 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
                                                <MenuItem value={2006}>2006 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
                                                <MenuItem value={2005}>2005 წლის ერთიანი ეროვნული გამოცდები</MenuItem>
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
                    {/* <span style={{width:'20px'}}>
                    </span> */}
                    <FormControl fullWidth>
                                            <InputLabel>ვარიანტი</InputLabel>
                                            <Select
                                                defaultValue={1}
                                                value={Version}
                                                label="Version"
                                                onChange={(e) => SetVersion(e.target.value)}
                                            >
                                                {GetVersions(Year).map((Version, index) => {
                                                    return (<MenuItem value={Version}>{Version == 1 ? 'I' : Version == 2 ? 'II' : 'III'} ვარიანტი</MenuItem>)
                                                })}
                                            </Select>
                    </FormControl>
                    {/* <span style={{width:'20px'}}>
                    </span> */}
                    <FormControl fullWidth>
                                            <InputLabel>ამოცანა</InputLabel>
                                            <Select
                                                defaultValue={1}
                                                value={Problem}
                                                label="Problem"
                                                onChange={(e) => SetProblem(e.target.value)}
                                            >
                                                {GetProblems(Year).map((Problem, index) => {
                                                    return (<MenuItem key={index} value={Problem}>ამოცანა #{Problem}</MenuItem>)
                                                })}
                                            </Select>
                    </FormControl>
                    <Button
                    onClick={handleProblemStatementSearch}
                    variant='contained'
                    className='SearchProblemButton'
                    fullWidth
                    >მოძებნა</Button>
                </div>
                <div className="Content-Statement">
                    {ProblemObject ?
                        <div key={'problem-div-'+ProblemObject.Year+'-'+ProblemObject.Version+'-'+ProblemObject.Problem} className='TestComponent-Problem'>
                            <div className='ProblemLabel'>
                                <h3>
                                    {ProblemObject.Problem <= require('../../assets/' + ProblemObject.Year + '/info.json')['NumberOf1PointProblems'] - 1 ? "(1)"
                                        :
                                        ProblemObject.Problem <= require('../../assets/' + ProblemObject.Year + '/info.json')['NumberOf1PointProblems'] - 1 + require('../../assets/' + ProblemObject.Year + '/info.json')['NumberOf2PointProblems']
                                            ? "(2)"
                                            :
                                            ProblemObject.Problem <= require('../../assets/' + ProblemObject.Year + '/info.json')['NumberOf1PointProblems'] - 1 + require('../../assets/' + ProblemObject.Year + '/info.json')['NumberOf2PointProblems'] + require('../../assets/' + ProblemObject.Year + '/info.json')['NumberOf3PointProblems']
                                                ? "(3)"
                                                :
                                                "(4)"}
                                                {(ProblemObject.Problem+1)}
                                </h3>
                            </div>
                            <PDFViewer Problem={ProblemObject} id={'problem-'+ProblemObject.Year+'-'+ProblemObject.Version+'-'+ProblemObject.Problem}></PDFViewer>
                            <div key={'problem-button' + ProblemObject.Problem} className="PDFButtons">
                                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                                    <SolutionComponent color='secondary' ViewedIn={'Test'} index={ProblemObject.Problem} ButtonIcon={EmojiObjectsIcon} VideoURL={SolutionsJSON[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem+1]} ></SolutionComponent>
                                    <SimilarModalComponent color='secondary' ButtonIcon={ContentCopyIcon} index={ProblemObject.Problem-1} ViewedIn={'Test'}></SimilarModalComponent>
                                </ButtonGroup>
                            </div>
                        </div>
                        :
                        <div className="Content-Statement-Placeholder" onClick={handleProblemStatementSearch}>
                            <ContentPasteSearchIcon className="SearchIcon"></ContentPasteSearchIcon>მოძებნე ამოცანა
                        </div>
                    }                            
                </div>
            </div>
        </div>
    </div>
  )
}

export default SolutionsScreen