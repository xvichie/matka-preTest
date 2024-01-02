import React from 'react'
import './ContactUs.scss';
import { Button, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';

function ContactUs() {

    const Orange = '#F97432';
    const SubtleWhite = '#f7f7ff';

    const options = {
        shouldForwardProp: (prop) => prop !== 'borderColor',
      };
      const outlinedSelectors = [
        '& .MuiOutlinedInput-notchedOutline',
        '&:hover .MuiOutlinedInput-notchedOutline',
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline',
      ];
      const TextField = styled(
        MuiTextField,
        options,
      )(({ borderColor, backgroundColor }) => ({
        '& label.Mui-focused': {
          color: borderColor,
        },
        [outlinedSelectors.join(',')]: {
          borderWidth: 1.5,
          borderColor,
        },
        '& .MuiInputBase-root': {
          backgroundColor, // Change the background color of the input area
        },
      }));
  return (
    <div className='ContactUs'>
        <div className="ContactUs-Wrapper">
            <div className="ContactUs-Label">
                <h1>დაგვიკავშირდით</h1>
            </div>
            <div className="ContactUs-Form">
                <FormControl className='Form-Form'>
                    <div className="ContactUs-Top">
                        <TextField
                        fullWidth
                            required 
                            type="text" 
                            variant='outlined'
                            borderColor={Orange}
                            backgroundColor={SubtleWhite}
                            label="თქვენი სრული სახელი"/>
                        <span style={{width:'20px'}}>

                        </span>
                        <TextField
                        fullWidth 
                            required 
                            type="email" 
                            variant='outlined' 
                            borderColor={Orange}
                            backgroundColor={SubtleWhite}
                            label="თქვენი Email"/>
                    </div>
                    <div className="ContactUs-Bottom">
                        <TextField
                        fullWidth 
                            type="text" 
                            variant='outlined'
                            multiline
                            minRows={5}
                            maxRows={5} 
                            required
                            backgroundColor={SubtleWhite}
                            borderColor={Orange}
                            label="თქვენი წერილი"/>
                    </div>
                    <div className="ContactUs-Button">
                        <Button type='Submit' variant='contained'>გაგზავნა</Button>
                    </div>
                </FormControl>
            </div>
        </div>
    </div>
  )
}

export default ContactUs