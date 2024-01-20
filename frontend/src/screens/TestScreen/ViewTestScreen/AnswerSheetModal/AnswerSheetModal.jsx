import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useSpring, animated } from '@react-spring/web';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { translateAnswer } from '../../../../services/translateAnswers';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import './AnswerSheetModal.scss';

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
    width: '80%',
    height: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll'
};

export default function AnswerSheetModal({ index, ButtonIcon, Test }) {
    const [open, setOpen] = React.useState(false);
    const [imgOpen, setImgOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [rows, setRows] = useState([]);
    const [ImageRows,setImageRows] = useState([]);


    const [imageOpenStates, setImageOpenStates] = useState([]);

    // Function to handle opening/closing of a specific image
    const handleImageOpen = (index) => {
    setImageOpenStates((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index]; // Toggle the state for the specific image index
        return newState;
    });
    };

    console.log(Test);
    const test = Test.test[0];
    const testId=test._id;
    //console.log(test);
    useEffect(() => {
        const newRows = [];
        const newImageRows = [];
        setRows([]);
        setImageRows([]);

        test.answers.forEach((answer, index) => {
            if (answer !== 'Custom') {
                newRows.push([index, answer, test.chosenAnswers[index]]);
            } else {
                //console.log(index)
                newImageRows.push([index, test.chosenAnswers[index]]);
            }
        });
    
        setRows(newRows);
        setImageRows(newImageRows);
    }, [test]);

    // console.log('CurrTest: ',currentTest);
    console.log(test);

    console.log("Rows: ",rows);
    console.log("ImageRows: ",ImageRows);
    return (
        <div className='AnswerSheet-Button'>
            <Button className='Test-AnswerSheetButton' variant='outlined' onClick={handleOpen}>პასუხების ფურცელი <ButtonIcon /></Button>
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
                        <div className="AnswerSheetModal-TopStats">
                            <div className="TopStats-Label">
                                <h1>პასუხების ფურცელი</h1>
                                <h3>ტესტის Id: {testId}</h3>
                            </div>
                            <div className="TopStats-Stats">
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className='TableCrits' align="center"><strong>ტესტის #</strong></TableCell>
                                                <TableCell className='TableCrits' align="center"><strong>მაქს. ქულა</strong></TableCell>
                                                <TableCell className='TableCrits' align="center"><strong>აღებული ქულა</strong></TableCell>
                                                <TableCell className='TableCrits' align="center"><strong>გასული დრო:</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center">{1}</TableCell>
                                                <TableCell align="center">{test.maxScore}</TableCell>
                                                <TableCell align="center">{test.score} </TableCell>
                                                <TableCell align="center">{(test.time/60/100).toFixed(0)} წთ</TableCell>
                                                {/* <TableCell align="center">{test.time} წთ</TableCell> */}
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            <Button
                            fullWidth
                            variant='contained'
                            className='CloseButton'
                            onClick={handleClose}
                            >
                            დახურვა
                            </Button>
                        </div>
                        <h1 className='AnswersLabel'>
                            პასუხები
                        </h1>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table" className='Main-Table'>
                                <TableHead className='TableHead'>
                                    <TableRow>
                                        <TableCell className='TableCrits' align="center"><strong>#</strong></TableCell>
                                        <TableCell className='TableCrits' align="center"><strong>არჩეული პასუხი</strong></TableCell>
                                        <TableCell className='TableCrits' align="center"><strong>სწორი პასუხი</strong></TableCell>
                                        <TableCell className='TableCrits' align="center"><strong>ქულა</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                    key={test._id+' '+row[0]+" "+row[1]+" "+row[2]}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell 
                                        className='RowContent'
                                        align="center" component="th" scope="row">
                                            <h5>{row[0]+1}</h5>
                                        </TableCell>
                                        <TableCell 
                                        className='RowContent'
                                        align="center">
                                            <h5>
                                            {translateAnswer(row[2]) !== '' ? translateAnswer(row[2]) : 'არ იყო არჩეული'}
                                            </h5>
                                        </TableCell>
                                        <TableCell 
                                        className='RowContent'
                                        align="center">
                                            <h5>
                                            {translateAnswer(row[1])}
                                            </h5>
                                        </TableCell>
                                        <TableCell 
                                        className='RowContent'
                                        align="center">
                                            <h5>
                                            {translateAnswer(row[1]) == translateAnswer(row[2]) ?
                                                <CheckCircleIcon color='success'></CheckCircleIcon>
                                                :
                                                <CancelIcon color='error'></CancelIcon>
                                            }
                                            </h5>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {ImageRows.map((imageRow,index) => (
                                    <TableRow
                                    className='RowContent'
                                    key={index+' '+imageRow[0]+" "+imageRow[1]+" "}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell
                                        className='RowContent'
                                        align="center" component="th" scope="row">
                                            <h5>{imageRow[0]+1}</h5>
                                        </TableCell>
                                        <TableCell 
                                        className='RowContent'
                                        align="center" component="th" scope="row">
                                            <h5>
                                                {imageRow[1] !== '' ? (
                                                <>
                                                    <Button onClick={() => handleImageOpen(index)}>
                                                    <RemoveRedEyeIcon /> ნახვა
                                                    </Button>
                                                    <Lightbox
                                                    className='Lightbox'
                                                    open={imageOpenStates[index] || false}
                                                    close={() => handleImageOpen(index)}
                                                    slides={[{ src: imageRow[1] }]} // Pass the correct image source here
                                                    />
                                                </>
                                                ) : (
                                                'არ იყო არჩეული'
                                                )}
                                            </h5>
                                            </TableCell>
                                        <TableCell
                                        className='RowContent'
                                        align="center" component="th" scope="row">
                                        </TableCell>
                                        <TableCell
                                        className='RowContent'
                                        align="center" component="th" scope="row">
                                            {imageRow[1] != '' ?
                                                <CheckCircleIcon color='success'></CheckCircleIcon>
                                                :
                                                <CancelIcon color='error'></CancelIcon>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer> 
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}