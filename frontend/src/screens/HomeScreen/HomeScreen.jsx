import React from 'react';
import './HomeScreen.scss';

import {Button} from '@mui/material';

import {Link} from 'react-router-dom';

function HomeScreen() {
    return (
        <div className='HomeScreen'>
            <div className="HomeScreen-Main">
                <video autoPlay muted loop>
                    <source src={process.env.PUBLIC_URL+'/videos/HomeVideo.mp4'} />
                </video>
                <div className="HomeScreen-Main-Contents">
                    <div className="Contents-Wrapper">
                        <div className="Contents-Label">
                            <h1>
                                გახადე ეროვნულები მარტივი
                            </h1>
                        </div>
                        <div className="Contents-CallButton">
                            <Link to='/test'>
                                <Button
                                className='StartTestButton'
                                variant='contained'
                                >ტესტის დაწყება</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen