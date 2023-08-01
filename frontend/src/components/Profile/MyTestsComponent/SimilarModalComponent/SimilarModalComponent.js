import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { IconButton } from '@mui/material';
import PDFViewer from '../../../TestComponent/ProblemComponent/PDFViewer';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

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
    width: 1000,
    height: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll'
};

export default function SimilarModalComponent({ index, ButtonIcon, currentTest, ViewedIn }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [objectProblems, setObjectProblems] = useState([]);

    //console.log(Problems);
    let Problems = useSelector((state) => {
        if (ViewedIn == 'MyTests') {
            const test = state.userTests.tests[currentTest].test[0];
            console.log(test.similars[index])
            if (test.similars) {
                //console.log('shemovida');
                return test.similars[index]
            } else {
                return [];
            }
        }
        else if (ViewedIn == 'Test') {
            const test = state.test;
            console.log(test.similars[index])
            if (test.similars) {
                //console.log('shemovida');
                return test.similars[index];
            } else {
                return [];
            }
        }
    });
    //console.log(Problems);
    useEffect(() => {
        if (Problems) {
            let objectProblems = [];
            Problems.forEach((Problem) => {
                console.log(Problem);
                let split = Problem.split('-');
                const ProblemObject = {
                    Year: parseInt(split[0]),
                    Version: parseInt(split[1]),
                    Problem: parseInt(split[2])
                }
                //objectProblems.push(ProblemObject);
                setObjectProblems([...objectProblems, ProblemObject])
            })
        }
    }, [])

    return (
        <div>
            <Button className='Test-SimilarsButton' style={{ borderTopRightRadius: '50px', borderBottomRightRadius: '50px' }} onClick={handleOpen}>მსგავსი <ButtonIcon /></Button>
            {/* <IconButton style={{ padding: 0 }} onClick={handleOpen}><ButtonIcon /></IconButton> */}
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
                    <Box sx={style}>
                        {objectProblems !== null && objectProblems !== undefined && objectProblems.map((problem, index) => {
                            console.log(problem)
                            return (<PDFViewer id={'problem-' + index} key={'problem- ' + index} Problem={problem}></PDFViewer>)
                        })}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}