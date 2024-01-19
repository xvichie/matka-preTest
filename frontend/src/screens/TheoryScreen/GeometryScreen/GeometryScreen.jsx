import React, { useEffect, useState } from 'react'

import InterestsIcon from '@mui/icons-material/Interests';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { Autocomplete, Breadcrumbs, InputAdornment, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';

import TheoremsInfoJSON from '../../../assets/theorems/theorems.json';
import { Container } from 'react-bootstrap';

import { handleSearch, getAllTheorems } from '../../../services/handleSearch';

import './GeometryScreen.scss';
import TheoremPreview from '../TheoremPreview/TheoremPreview';

function GeometryScreen() {

    function unEscape(htmlStr) {
        htmlStr = htmlStr.replace(/&lt;/g, "<");
        htmlStr = htmlStr.replace(/&gt;/g, ">");
        htmlStr = htmlStr.replace(/&quot;/g, "\"");
        htmlStr = htmlStr.replace(/&#39;/g, "\'");
        htmlStr = htmlStr.replace(/&amp;/g, "&");
        return htmlStr;
    }

    const theorems = getAllTheorems(['Geometry']);

    return (
        <div className='GeometryScreen'>
            <div className="GeometryScreen-Wrapper">
                <div className="TheoryScreen-Geometry-Search">
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
                            <InterestsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            გეომეტრია
                        </Typography>
                    </Breadcrumbs>
                </div>
                <div className="GeometryScreen-Theorems">
                    {
                        TheoremsInfoJSON['geometry'].map((theorem, index) => {
                            console.log(theorem)
                            return (
                                <Link style={{ textDecoration: 'none' }} key={index} to={`${theorem.id}`}>
                                    <TheoremPreview theorem={theorem}></TheoremPreview>
                                </Link>)
                        })
                        // TheoremsInfoJSON['geometry'].map((theorem, index) => {
                        //     <TheoremComponent TheoremAlgGeo={'Geometry'} TheoremId={index + 1}></TheoremComponent>
                        // })
                    }
                </div>
            </div>
        </div>
    )
}

export default GeometryScreen