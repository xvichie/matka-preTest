import React, { useEffect, useState } from 'react'
import './TheoryScreen.scss';

import CalculateIcon from '@mui/icons-material/Calculate';
import InterestsIcon from '@mui/icons-material/Interests';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SearchIcon from '@mui/icons-material/Search';

import Button from '@mui/material/Button';

import { Container } from 'react-bootstrap';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';

import { Link, useNavigate } from "react-router-dom";

import { handleSearch, getAllTheorems } from '../../services/handleSearch';

function TheoryScreen() {

    const theorems = getAllTheorems(['Algebra', 'Geometry', 'Thesis']);

    return (
        <div className='TheoryScreen'>
            <div className="TheoryScreen-Wrapper">
                <div className="TheoryScreen-Search">
                    <Container className='SearchBar' sx={{ mt: 20 }}>
                        <Autocomplete
                            id="search"
                            type="search"
                            sx={{ width: 600 }}
                            options={theorems}
                            freeSolo
                            disableClearable
                            autoComplete
                            groupBy={(option) => option.TheoremAlgGeo}
                            getOptionLabel={(option) => {
                                console.log(option);
                                return (
                                    option.title
                                );
                            }}
                            renderOption={(props, option, { selected }) => (
                                <Link style={{ textDecoration: 'none' }} to={'/theory/' + option.TheoremAlgGeo + '/' + option.id}>
                                    <li {...props}>
                                        <h3 dangerouslySetInnerHTML={{ '__html': option.title }}></h3>
                                    </li>
                                </Link>
                            )}
                            renderInput={(params) => {
                                return (<TextField {...params} label="მოძებნე თეორია ან თეორემა"></TextField>)
                            }}
                        />
                    </Container>
                </div>
                <div className="TheoryScreen-Label">
                    {/* <h1>აირჩიე მიმართულება</h1> */}
                </div>
                <div className="TheoryScreen-Hero">
                    <img src={process.env.PUBLIC_URL+'/images/TheoryScreenHero.png'} alt="" />
                    <div className="Hero-Labels">
                        <div className="Labels-Top">
                            <strong className='animate-charcter'>ყველა თეორია</strong>
                        </div>
                        <div className="Labels-Bottom">
                            <strong>აირჩიე მათემატიკის სასურველი მიმართულება:</strong>
                            <br />
                            <br />
                            • ალგებრა

                            <br />
                            • გეომეტრია

                            <br />
                            • თეზისები
                        </div>
                    </div>
                </div>
                <div className="TheoryScreen-Choose">
                    <div className='Choose-Button'>
                        <Link style={{ textDecoration: 'none' }} to={'algebra'} className='Choose-Tab' >
                            <Button variant='outlined' className='Choose-Algebra'>
                                <CalculateIcon className='ChooseIcon'></CalculateIcon>
                                <h2>
                                    ალგებრა
                                </h2>
                            </Button>
                        </Link>
                    </div>
                    <div className='Choose-Button'>
                        <Link style={{ textDecoration: 'none' }} to={'geometry'} className='Choose-Tab'>
                            <Button variant='outlined' className="Choose-Geometry">
                                <InterestsIcon className='ChooseIcon'></InterestsIcon>
                                <h2>
                                    გეომეტრია
                                </h2>
                            </Button>
                        </Link>
                    </div>
                    <div className='Choose-Button'>
                        <Link style={{ textDecoration: 'none' }} to={'thesis'} className='Choose-Tab'>
                            <Button variant='outlined' className="Choose-Short">
                                <SummarizeIcon className='ChooseIcon'></SummarizeIcon>
                                <h2>
                                    თეზისები
                                </h2>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TheoryScreen