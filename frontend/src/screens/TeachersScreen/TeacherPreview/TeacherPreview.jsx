import React from 'react'
import './TeacherPreview.scss';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function TeacherPreview({Teacher}) {
    const navigate = useNavigate();
  return (
    <div className='TeacherPreview' onClick={() => navigate('/teachers/'+Teacher.id)}>
        <div className="TeacherPreview-Wrapper">
            <div className="TeacherPreview-Left">
                <img src={Teacher.image} alt="hell" />
            </div>
            <div className="TeacherPreview-Right">
                <div className="Right-Top">
                    <div className="Top-Occupation">
                        <AccountCircleIcon className='Occupation-Icon' sx={{mr:0.2}}></AccountCircleIcon>
                        {Teacher.occupation}
                    </div>
                    <div className="Top-Name">
                        {Teacher.name}
                    </div>
                    <div className="Top-Descpription">
                        {Teacher.description}
                    </div>
                </div>
                <div className="Right-Bottom">
                    <div className="Bottom-Bottom">
                        <div className="Bottom-Price">
                            <h3><span className='Price-Currency'>{Teacher.paymentCurrency}</span>{Teacher.price}/{Teacher.paymentType}</h3>
                        </div>
                        <Button className='More-Button' variant='contained'>სრულად {">>"}</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TeacherPreview