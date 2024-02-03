import React, { useRef, useState } from 'react'
import './ContactUs.scss';
import { Button, FormControl, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';
import emailjs from '@emailjs/browser';
import Endpoints from '../../api/Endpoints';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function ContactUs() {

  const Orange = '#F97432';
  const SubtleWhite = '#f7f7ff';

  const [SendButtonText, SetTextButtonTest] = useState("გაგზავნა");

  const [Name,SetName] = useState("");
  const [Email,SetEmail] = useState("");
  const [Message,SetMessage] = useState("");

  const {user} = useAuth0();

  const sendEmail = async (e) => {

    const getEmailConfirmationOfLimits = async () => {
      try {
        const response = await axios.post(Endpoints.sendEmail, {
          params: {
            email: Email,
          },
        });
  
        console.log(response);
        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        // console.error(error);
        return false;
      }
    };


    e.preventDefault(); // prevents the page from reloading when you hit “Send”

    let letSendEmail = await getEmailConfirmationOfLimits();
    // console.log(letSendEmail);

    if(letSendEmail){
      const formData = {
        from_name: Name,
        message: Message,
        from_email: Email
      };

      const hiddenForm = document.createElement('form');

      // Set form attributes
      hiddenForm.setAttribute('action', '');  // Add your emailjs API endpoint here
      hiddenForm.setAttribute('method', 'post');
      hiddenForm.style.display = 'none';

      // Append form fields
      for (const key in formData) {
          const input = document.createElement('input');
          input.setAttribute('type', 'hidden');
          input.setAttribute('name', key);
          input.setAttribute('value', formData[key]);
          hiddenForm.appendChild(input);
      }

      document.body.appendChild(hiddenForm);
        try{
        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, 
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID, 
          hiddenForm, 
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
          .then((result) => {
              if (result.status === 200) {
                SetTextButtonTest("მესიჯი გაიგზავნა!");
                SetEmail("");
                SetName("");
                SetMessage("");
                setTimeout(() => {
                  SetTextButtonTest("გაგზავნა");
                }, 15000);
              }
              
          }, (error) => {
            console.error('მესიჯი არ გაიგზავნა!', error);
          });
        }
        catch(error)
        {
          console.error('მესიჯი არ გაიგზავნა!', error);
        }
        finally {
          // Remove the hidden form from the DOM
          document.body.removeChild(hiddenForm);
        }
      } else{
        SetTextButtonTest("მესიჯების გაგზავნის დღიური ლიმიტი ამოწურულია");
      }
  };

  return (
    <div className='ContactUs' id='contactUsComponent'>
        <div className="ContactUs-Wrapper">
            <div className="ContactUs-Label">
                <h1>დაგვიკავშირდით</h1>
            </div>
            <div className="ContactUs-Form">
              <form onSubmit={sendEmail} className='Form-Form'>
                    <div className="ContactUs-Top">
                          <TextField
                          className='TextField'
                          key={"NameInput"}
                          name='NameInput'
                              fullWidth
                              required 
                              type="text" 
                              variant='outlined'
                              borderColor={Orange}
                              backgroundColor={SubtleWhite}
                              value={Name} 
                              onChange={(e) => SetName(e.target.value)}
                              label="თქვენი სრული სახელი"/>
                          <span style={{width:'20px'}}>

                          </span>
                          <TextField
                          className='TextField'
                          key={"EmailInput"}
                          name='EmailInput'
                          fullWidth
                          value={Email}
                          onChange={(e) => SetEmail(e.target.value)} 
                              required 
                              type="email" 
                              variant='outlined' 
                              borderColor={Orange}
                              backgroundColor={SubtleWhite}
                              label="თქვენი Email"/>
                      </div>
                      <div className="ContactUs-Bottom">
                          <TextField
                          className='TextField'
                          fullWidth
                              key={"Input"}
                              value={Message}
                              onChange={(e) => SetMessage(e.target.value)} 
                              type="text"
                              name='MessageInput'
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
                          <Button type='Submit' variant='contained' id='SubmitButton' >{SendButtonText}</Button>
                      </div>
                  </form>
            </div>
        </div>
    </div>
  )
}

export default ContactUs