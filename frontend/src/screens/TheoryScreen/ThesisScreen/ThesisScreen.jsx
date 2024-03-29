import React, { useState } from 'react'
import './ThesisScreen.scss';

import { Link } from 'react-router-dom'

import { Container } from 'react-bootstrap';

import { Autocomplete, Breadcrumbs, InputAdornment, TextField, Typography } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search';

import TheoremsInfoJSON from '../../../assets/theorems/theorems.json';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalculateIcon from '@mui/icons-material/Calculate';
import { getAllTheorems } from '../../../services/handleSearch';
import TheoremPreview from '../TheoremPreview/TheoremPreview';

function ThesisScreen() {

    function unEscape(htmlStr) {
        htmlStr = htmlStr.replace(/&lt;/g, "<");
        htmlStr = htmlStr.replace(/&gt;/g, ">");
        htmlStr = htmlStr.replace(/&quot;/g, "\"");
        htmlStr = htmlStr.replace(/&#39;/g, "\'");
        htmlStr = htmlStr.replace(/&amp;/g, "&");
        return htmlStr;
    }

    const theorems = getAllTheorems(['Thesis']);

    return (
        <div className='ThesisScreen'>
            <div className="ThesisScreen-Wrapper">
                <div className="TheoryScreen-Thesis-Search">
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
                <div className="Breadcrumbs">
                    <Breadcrumbs aria-label="breadcrumb" className='Breadcrumbs-Breadcrumbs'>
                        <Link style={{ textDecoration: 'none' }}
                            underline="hover"
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="inherit"
                            to={'/theory'}
                        >
                            <MenuBookIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            თეორია
                        </Link>
                        <Typography
                            sx={{ display: 'flex', alignItems: 'center' }}
                            className='Current-Selection'
                        >
                            <CalculateIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            თეზისები
                        </Typography>
                    </Breadcrumbs>
                </div>
                <div className="ThesisScreen-Theorems">
                    {
                        TheoremsInfoJSON['thesis'].map((theorem, index) => {
                            console.log(theorem)
                            return (
                                <Link style={{ textDecoration: 'none' }} key={index} to={`${theorem.id}`}>
                                    <TheoremPreview theorem={theorem}></TheoremPreview>
                                </Link>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ThesisScreen