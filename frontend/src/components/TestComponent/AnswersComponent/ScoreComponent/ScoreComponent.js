import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  Fab
} from '@mui/material';
import {
  resetChosenAnswers,
  setComponentOrder,
  setScore,
  setTestHasStarted,
  setTime
} from '../../../../slices/TestSlice';
import ReplayIcon from '@mui/icons-material/Replay';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ArticleIcon from '@mui/icons-material/Article';
import './ScoreComponent.scss';
import { useTheme } from '@emotion/react';
import AnswersComponent from '../AnswersComponent';
import Endpoints from '../../../../api/Endpoints';
import useTimer from './useTimer'; // Import the custom hook

function ScoreComponent() {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const problems = useSelector((state) => state.test.problems);
  const answers = useSelector((state) => state.test.answers);
  const similars = useSelector((state) => state.test.similars);
  const chosenAnswers = useSelector((state) => state.test.chosenAnswers);
  const score = useSelector((state) => state.test.score);
  const overallTime = useSelector((state) => state.test.time);
  const maxScore = useSelector((state) => state.test.maxScore);

  const { secondsTime, start, stop, reset, isRunning } = useTimer(overallTime);

  useEffect(() => {
    reset(overallTime);
    start();
  }, [overallTime, start, reset]);

  useEffect(() => {
    dispatch(setScore(score));
  }, [score, dispatch]);

  useEffect(() => {
    if (isRunning) {
      dispatch(setTime(secondsTime));
    }
  }, [secondsTime, isRunning, dispatch]);

  const translateAnswers = () => {
    return answers.map((answer) => {
      switch (answer) {
        case 'ა':
          return 'a';
        case 'ბ':
          return 'b';
        case 'გ':
          return 'c';
        case 'დ':
          return 'd';
        default:
          return 'Custom';
      }
    });
  };

  const handleFinish = async () => {
    stop();
    if (isAuthenticated) {
      const data = {
        email: user.email || "",
        test: {
          problems: problems,
          answers: translateAnswers(),
          similars: similars,
          chosenAnswers: chosenAnswers,
          score: score,
          time: secondsTime,
          maxScore: maxScore
        }
      };
      try {
        await axios.post(Endpoints.userTests, data, {
          headers: { 'Content-Type': 'application/json' }
        });
        dispatch(setComponentOrder('Done'));
        dispatch(setTestHasStarted(false));
        localStorage.setItem('TestHasStarted', false);
        localStorage.removeItem('TestObject');
      } catch (err) {
        console.error(err);
      }
    } else {
      handleClickOpen();
    }
  };

  const handleStartOver = () => {
    stop();
    dispatch(setComponentOrder('Start'));
    dispatch(setTestHasStarted(false));
    dispatch(resetChosenAnswers());
    localStorage.setItem('TestHasStarted', false);
    localStorage.removeItem('TestObject');
  };

  const hours = Math.floor(secondsTime / 3600);
  const minutes = Math.floor((secondsTime % 3600) / 60);
  const seconds = secondsTime % 60;

  const theme = useTheme();

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 220 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <AnswersComponent SimilarsSheet={similars} Problems={problems} AnswersSheet={answers} />
      </div>
    </Box>
  );

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDontWantToSave = () => {
    handleClose();
    dispatch(setComponentOrder('Done'));
    dispatch(setTestHasStarted(false));
    localStorage.setItem('TestHasStarted', false);
    localStorage.removeItem('TestObject');
  };

  const handleLoginToSave = () => {
    loginWithRedirect();
  };

  return (
    <div className='Score'>
      <Fab
        color='secondary'
        style={{ borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px', borderBottomRightRadius: '0', borderTopRightRadius: '0' }}
        onClick={handleStartOver}
        variant="extended"
        className='NewButton'
      >
        <ReplayIcon className='Icon'></ReplayIcon>
        <span className='ButtonText-Dissapear'>ახლიდან დაწყება</span>
      </Fab>
      <div className='Score-Stats'>
        <div className='Score-Score' style={{ backgroundColor: theme.palette.secondary.main }}>
          <div className="Score-Score-Label">
            <CreditScoreIcon className='Icon' sx={{ mr: 1 }}></CreditScoreIcon>
          </div>
          <div className="Score-Score-Score">
            {score}/{localStorage.getItem('MaxScore')}
          </div>
        </div>
        <div className="Score-Time" style={{ backgroundColor: theme.palette.secondary.main }}>
          <div className="Score-Time-Label">
            <AccessTimeIcon className='Icon' sx={{ mr: 1 }}></AccessTimeIcon>
          </div>
          <div className="Score-Time-Time">
            {hours}:{minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </div>
        </div>
      </div>
      <Fab
        variant="extended"
        onClick={toggleDrawer("left", true)}
        className='AnswersButton'
        color='secondary'
      >
        <ArticleIcon className='Icon' sx={{ mr: 1 }} />
        <span className='ButtonText-Dissapear'>პასუხები</span>
      </Fab>
      <Drawer
        onRequestChange={(open) => toggleDrawer("left", open)}
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
      <Fab
        style={{ color: 'white', borderTopRightRadius: '50px', borderBottomRightRadius: '50px', borderBottomLeftRadius: '0', borderTopLeftRadius: '0' }}
        onClick={handleFinish}
        variant="extended"
        color='primary'
        className='FinishButton'
      >
        <span className='ButtonText-Dissapear'>დასრულება</span> <SportsScoreIcon className='Icon' sx={{ ml: 1 }} ></SportsScoreIcon>
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className='DialogTitle' id="alert-dialog-title">
          <>{"Whoops, საიტზე შესვლა დაგავიწყდა..."}</>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className='DialogContentText' id="alert-dialog-description">
            საიტზე თუ არ შეხვედი შენ საკუთარ ანგარიშზე, ვერ ნახავ შენს დამახსოვრებულ ტესტებს და სტატისტიკას.
            როგორ გსურს გაგრძელება?
          </DialogContentText>
        </DialogContent>
        <DialogActions className='DialogActions'>
          <Button className='DialogActionButton' variant='outlined' onClick={handleDontWantToSave}>დასრულება შენახვის გარეშე</Button>
          <Button className='DialogActionButton' variant='outlined' onClick={handleLoginToSave} autoFocus>
            შესვლა
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ScoreComponent;
