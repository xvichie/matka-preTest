import React from 'react'
import './TheoremComponent.scss';
import TheoryPDFViewer from './ThoryPDFViewer/TheoryPDFViewer';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';

import InterestsIcon from '@mui/icons-material/Interests';
import MenuBookIcon from '@mui/icons-material/MenuBook';

// import TheoremsInfoJSON from '../../../assets/theorems/theorems.json';
import TheoremsInfoJSON from '../../assets/theorems/theorems.json'

function TheoremComponent({ TheoremAlgGeo }) {

    const { TheoremId } = useParams();
    console.log(TheoremsInfoJSON[TheoremAlgGeo.toLowerCase()][TheoremId - 1].title);

    return (
        <div className='TheoremComponent'>
            <div className="TheoremComponent-Wrapper">
                <div className="TheoremComponent-Breadcrumbs">
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
                        <Link style={{ textDecoration: 'none' }}
                            underline="hover"
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="inherit"
                            to={'/theory/algebra'}
                        >
                            <InterestsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            {TheoremAlgGeo == 'Algebra' ? 'ალგებრა' : 'გეომეტრია'}
                        </Link>
                        <Typography
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="text.primary"
                        >
                            <InterestsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            {TheoremsInfoJSON[TheoremAlgGeo.toLowerCase()][TheoremId - 1].title}
                        </Typography>
                    </Breadcrumbs>
                </div>
                <div className="TheoryPDF">
                    <TheoryPDFViewer TheoremAlgGeo={TheoremAlgGeo} TheoryID={TheoremId}>
                    </TheoryPDFViewer>
                </div>
            </div>
        </div>
    )
}

export default TheoremComponent