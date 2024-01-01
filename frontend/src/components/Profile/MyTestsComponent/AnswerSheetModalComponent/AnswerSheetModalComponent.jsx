import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PDFViewer from '../../../TestComponent/ProblemComponent/PDFViewer';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { translateAnswer } from '../../../../services/translateAnswers';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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

export default function AnswerSheetModalComponent({ index, ButtonIcon, currentTest }) {
    const [open, setOpen] = React.useState(false);
    const [imgOpen, setImgOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [rows, setRows] = useState([]);
    const [ImageRows,setImageRows] = useState([]);

    //console.log(Problems);
    const test = useSelector((state) => state.userTests.tests[currentTest].test[0]);
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
        <div>
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
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell align="center"><strong>#</strong></TableCell>
                                    <TableCell align="center"><strong>არჩეული პასუხი</strong></TableCell>
                                    <TableCell align="center"><strong>სწორი პასუხი</strong></TableCell>
                                    <TableCell align="center"><strong>ქულა</strong></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                    key={test._id+' '+row[0]+" "+row[1]+" "+row[2]}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" component="th" scope="row">
                                            <h5>{row[0]+1}</h5>
                                        </TableCell>
                                        <TableCell align="center">
                                            <h5>
                                            {translateAnswer(row[2]) !== '' ? translateAnswer(row[2]) : 'არ იყო არჩეული'}
                                            </h5>
                                        </TableCell>
                                        <TableCell align="center">
                                            <h5>
                                            {translateAnswer(row[1])}
                                            </h5>
                                        </TableCell>
                                        <TableCell align="center">
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
                                {ImageRows.map(imageRow => (
                                    <TableRow
                                    key={imageRow[0]+" "+imageRow[1]+" "}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" component="th" scope="row">
                                            <h5>{imageRow[0]+1}</h5>
                                        </TableCell>
                                        <TableCell align="center" component="th" scope="row">
                                            <h5>{imageRow[1] != '' ?<> <Button onClick={() => setImgOpen(true)}><RemoveRedEyeIcon /> ნახვა</Button> 
                                            <Lightbox
                                                open={imgOpen}
                                                close={() => setImgOpen(false)}
                                                slides={[{ src: imageRow[1] }]}
                                            />
                                            </>: 'არ იყო არჩეული'}</h5>
                                        </TableCell>
                                        <TableCell align="center" component="th" scope="row">
                                        </TableCell>
                                        <TableCell align="center" component="th" scope="row">
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