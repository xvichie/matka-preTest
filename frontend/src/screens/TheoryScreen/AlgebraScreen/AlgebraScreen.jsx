import { Autocomplete, Breadcrumbs, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Container } from 'react-bootstrap';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalculateIcon from '@mui/icons-material/Calculate';

import SearchIcon from '@mui/icons-material/Search';

import './AlgebraScreen.scss'; // Import the Sass file

import TheoremsInfoJSON from '../../../assets/theorems/theorems.json';

import { handleSearch, getAllTheorems } from '../../../services/handleSearch';

function AlgebraScreen() {

    function unEscape(htmlStr) {
        htmlStr = htmlStr.replace(/&lt;/g, "<");
        htmlStr = htmlStr.replace(/&gt;/g, ">");
        htmlStr = htmlStr.replace(/&quot;/g, "\"");
        htmlStr = htmlStr.replace(/&#39;/g, "\'");
        htmlStr = htmlStr.replace(/&amp;/g, "&");
        return htmlStr;
    }

    const [searchTerm, setSearchTerm] = useState("");
    const [handleSearchServiceData, setHandleSearchServiceData] = useState([]);

    const navigate = useNavigate();

    const handleChange = (event) => {
        if (event.target.value) {
            console.log(event.target)
            setSearchTerm(event.target.value);
            //console.log(searchTerm);
            //console.log(handleSearch(['Algebra', 'Geometry', 'Thesis'], searchTerm))
            setHandleSearchServiceData(handleSearch(['Algebra'], searchTerm));
        }
    };

    useEffect(() => {
        setHandleSearchServiceData(handleSearch(['Algebra'], searchTerm));
    }, [])
    const theorems = getAllTheorems(['Algebra']);

    const handleOnChange = (event) => {
        // console.log(handleSearchServiceData);
        // console.log(event.target.innerText);
        event.persist();
        handleSearchServiceData.forEach(data => {
            console.log(data);
            // console.log(event.target.innerText);
            if (data.title === event.target.innerText) {
                navigate('/theory/' + data.TheoremAlgGeo.toLowerCase() + '/' + data.id)
            }
        })
    }

    return (
        <div className="AlgebraScreen">
            <div className="TheoryScreen-Algebra-Search">
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
                <Breadcrumbs aria-label="breadcrumb">
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
                        color="text.primary"
                    >
                        <CalculateIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        ალგებრა
                    </Typography>
                </Breadcrumbs>
            </div>
            <div className="AlgebraScreen-Theorems">
                {
                    TheoremsInfoJSON['algebra'].map((theorem, index) => {
                        console.log(theorem)
                        return (
                            <Link style={{ textDecoration: 'none' }} key={index} to={`${theorem.id}`}>
                                <div>
                                    <h2 dangerouslySetInnerHTML={{ __html: unEscape(theorem.title) }}>{ }</h2>
                                    {theorem.description}
                                </div>
                            </Link>)
                    })
                    // TheoremsInfoJSON['geometry'].map((theorem, index) => {
                    //     <TheoremComponent TheoremAlgGeo={'Geometry'} TheoremId={index + 1}></TheoremComponent>
                    // })
                }
            </div>
        </div>
    )
}

export default AlgebraScreen