import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { IconButton, Link } from '@mui/material';
import ReactPlayer from 'react-player';

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';


import "./SolutionComponent.scss";
import { LinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-bootstrap';
import { useTheme } from '@emotion/react';
import useWindowDimensions from '../../../services/hooks/useWindowDimensions';


const Fade = React.forwardRef(function Fade(props, ref) {
    const {
        children,
        in: open,
        onClick,
        onEnter,
        onExited,
        ownerState,
        ...other
    } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter(null, true);
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited(null, true);
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {React.cloneElement(children, { onClick })}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element.isRequired,
    in: PropTypes.bool,
    onClick: PropTypes.any,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
    ownerState: PropTypes.any,
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
};

export default function SolutionComponent({ ButtonIcon, VideoURL, ViewedIn }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const theme = useTheme();
    const { height, width } = useWindowDimensions();

    style.height = height*90/100;
    //console.log(VideoURL);
    return (
        <div className='WholeDiv'>
            {/* <Button onClick={handleOpen}><ButtonIcon /></Button> */}
                <Button
                    className='OuterButton'
                    style={{
                        borderTopLeftRadius: '50px',
                        borderBottomLeftRadius: '50px',
                        borderTopRightRadius: ViewedIn === 'TestViewer' ? '50px' : '0',
                        borderBottomRightRadius: ViewedIn === 'TestViewer' ? '50px' : '0'
                    }}
                    variant='outlined'
                    onClick={handleOpen}
                >
                <ButtonIcon className='OuterIcon' />ამოხსნა
                </Button>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        TransitionComponent: Fade,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style} className="SolutionOuterBox">
                        <div className="SolutionBox">
                            <div className="SolutionBox-Title">
                                <h1>
                                    ამოხსნა
                                </h1>
                            </div>
                            {
                                VideoURL && VideoURL.length > 10 
                                ?
                                <ReactPlayer
                                className="SolutionBox-VideoPlayer"
                                url={VideoURL}
                                controls
                                ></ReactPlayer>
                                :
                                <div className="SolutionBox-NotFound">
                                    <SentimentVeryDissatisfiedIcon className='Icon'></SentimentVeryDissatisfiedIcon>
                                    <h4>სამწუხაროდ, ამოცანა ვერ მოიძებნა</h4>
                                </div>
                            }
                            <div className="SolutionBox-Bottom">
                                <h5>
                                    თეორია გაინტერესებს?
                                    {" "}
                                    <a style={{color: theme.palette.primary}} href='/theory' target="_blank">
                                        გადადი თეორიების გვერდზე
                                    </a>
                                </h5>
                                <Button variant='contained' className='CloseModalButton' onClick={handleClose}>
                                    დახურვა
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}