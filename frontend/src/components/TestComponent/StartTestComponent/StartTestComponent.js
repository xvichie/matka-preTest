import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setComponentOrder, setIsLoading, setScore, setTestHasStarted, setTestIsDone, setTime } from '../../../slices/TestSlice';
import { FormControl, InputLabel, MenuItem, Select, Tab, Tabs } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';

function StartTestComponent({ isLoadingSetter }) {
    const dispatch = useDispatch();

    const handleStart = () => {
        dispatch(setComponentOrder('Test'));
        dispatch(setScore(0));
        dispatch(setTime(0));
        dispatch(setTestHasStarted(true));
        isLoadingSetter(true);

        // if (year && version) {
        //     problems
        // }
    }

    const [year, setYear] = useState();
    const [version, setVersion] = useState();

    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };
    const handleVersionChange = (event) => {
        setVersion(event.target.value);
    };

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
                            sex
                        </div>
                        <div className='StartTest-Erovnuli' value={value} index={1}>
                            <h2>ეროვნული გამოცდები</h2>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">წელი</InputLabel>
                                <Select
                                    value={year}
                                    label="Year"
                                    onChange={handleYearChange}
                                >
                                    <MenuItem value={2022}>2022</MenuItem>
                                    <MenuItem value={2021}>2021</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">ვარიანტი</InputLabel>
                                <Select
                                    value={version}
                                    label="Version"
                                    onChange={handleVersionChange}
                                >
                                    <MenuItem value={1}>I ვარიანტი</MenuItem>
                                    <MenuItem value={2}>II ვარიანტი</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </SwipeableViews>
                </div>
                <div className="StartTest-Button">
                    <div>Daiwye testi tu tesli xar, yo</div>
                    <button onClick={handleStart}>dawyeba bozi viyo</button>
                </div>
            </div>
        </>
    )
}

export default StartTestComponent