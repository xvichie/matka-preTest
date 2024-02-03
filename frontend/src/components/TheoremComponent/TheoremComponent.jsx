import React, { useEffect } from 'react'
import './TheoremComponent.scss';
import TheoryPDFViewer from './ThoryPDFViewer/TheoryPDFViewer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';

import InterestsIcon from '@mui/icons-material/Interests';
import MenuBookIcon from '@mui/icons-material/MenuBook';

// import TheoremsInfoJSON from '../../../assets/theorems/theorems.json';
import TheoremsInfoJSON from '../../assets/theorems/theorems.json'

function TheoremComponent({ TheoremAlgGeo }) {

    const { TheoremId } = useParams();
    const navigate = useNavigate();

    

    useEffect(() => {
        console.log("he");
        const theoremInfo = TheoremsInfoJSON[TheoremAlgGeo.toLowerCase()][TheoremId - 1];
        if (theoremInfo === undefined) {
          navigate('/notFound');
        }
      }, []);
    
      // Check if the theoremInfo is available before accessing its properties


    return (
        <div className='TheoremComponent'>
            <div className="TheoremComponent-Wrapper">
                <div className="TheoremComponent-Breadcrumbs">
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
                        <Link style={{ textDecoration: 'none' }}
                            underline="hover"
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="inherit"
                            to={'/theory/algebra'}
                        >
                            <InterestsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            {TheoremAlgGeo == 'Algebra' ? 'ალგებრა' : 'გეომეტრია'}
                        </Link>
                        {TheoremsInfoJSON[TheoremAlgGeo.toLowerCase()][TheoremId - 1] !== undefined ?
                        <Typography
                            sx={{ display: 'flex', alignItems: 'center' }}
                            className='Current-Selection'
                        >
                            <InterestsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            {TheoremsInfoJSON[TheoremAlgGeo.toLowerCase()][TheoremId - 1].title}
                        </Typography>
                        :
                        ""
                        }
                    </Breadcrumbs>
                </div>
                {TheoremsInfoJSON[TheoremAlgGeo.toLowerCase()][TheoremId - 1] !== undefined ?
                    <div className="TheoryPDF">
                        <TheoryPDFViewer TheoremAlgGeo={TheoremAlgGeo} TheoryID={TheoremId}>
                        </TheoryPDFViewer>
                    </div>
                    :
                    ""
                }
            </div>
        </div>
    )
}

export default TheoremComponent