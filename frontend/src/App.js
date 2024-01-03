import './App.css';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ThemeProvider, createTheme } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalTheme } from './slices/globalSettingsSlice';
import Footer from './components/Footer/Footer';
import ContactUs from './components/ContactUs/ContactUs';


const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        background: {
          main: '#f7f7ff'
        },
        primary: {
          main: '#f97432'
        },
        secondary: {
          main: '#52389d'
        },
        accent1: {
          main: '#f6e8d5'
        },
        accent2: {
          main: '#0777de'
        },
        accent3: {
          main: '#fbab00'
        },
        accent4: {
          main: '#ff5c98'
        },
        error: {
          main: '#ba000d'
        },
        success: {
          main: '#4caf50'
        },
        differentSecondary: {
          main: '#F54C22'
        }, // This custom color should be part of the palette
        custom_gray: {
          main: '#828282'
        }
      }
      : {
        // palette values for dark mode
        primary: {
          main: '#333333'
        },
        background: {
          main: '#0d112b'
        },
      }),
  },
  components: {
    MuiCheckbox: {
      defaultProps: {
        checkedIcon: <CloseIcon />
      }
    }
  },
  typography: {
    allVariants: {
      fontFamily: 'Extra Square Mtavruli',
    },
  },
});


function App() {

  const [theme, setTheme] = useState(createTheme(getDesignTokens('light')));

  const StateGlobalTheme = useSelector((state) => state.globalSettings.GlobalTheme);

  const dispatch = useDispatch()

  useEffect(() => {
    const GlobalTheme = localStorage.getItem('GlobalTheme');
    if (GlobalTheme) {
      dispatch(setGlobalTheme(GlobalTheme));
    } else {
      localStorage.setItem('GlobalTheme', 'light');
      dispatch(setGlobalTheme('light'));
    }
  }, []);

  useEffect(() => {
    setTheme(createTheme(getDesignTokens(StateGlobalTheme)));
  }, [StateGlobalTheme]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header></Header>
        <div style={{ backgroundColor: theme.palette.background.main, width: '100%' }} >
          {/* <Container> */}
            <Outlet></Outlet>
          {/* </Container> */}
        </div>
        <ToastContainer />
        <ContactUs></ContactUs>
        <Footer></Footer>
      </ThemeProvider>
    </>
  );
}

export default App;
