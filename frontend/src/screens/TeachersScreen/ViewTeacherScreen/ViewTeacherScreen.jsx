import React, { useEffect, useState } from 'react';
import './ViewTeacherScreen.scss';
import TeachersJSON from '../../../assets/teachers/teachers.json';
import { useNavigate, useParams } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdPlaceholderComponent from '../../../components/AdPlaceholderComponent/AdPlaceholderComponent';


function ViewTeacherScreen() {
  const { TeacherId } = useParams();
  const [Teacher, setTeacher] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    // Assuming TeachersJSON.teachers is an array
    const teacher = TeachersJSON.teachers.find((teacher) => teacher.id === parseInt(TeacherId, 10));

    if (teacher) {
      setTeacher(teacher);
    }
    else navigate('/notFound');
  }, [TeacherId]);

  return (
    <div className='ViewTeacherScreen'>
      <div className="ViewTeacherScreen-Wrapper">
        <AdPlaceholderComponent AdId={2}></AdPlaceholderComponent>
        <div className="ViewTeacherScreen-Teacher">
          {Teacher ? (
            <>
                <div className="Teacher-ImageDiv">
                    <img src={Teacher.image} alt="" />
                </div>
                <div className="Teacher-Right">
                    <div className="Teacher-Main">
                        <div className="Main-Top">
                            <div className="Main-Occupation">
                                <AccountCircleIcon className='Occupation-Icon' sx={{mr:0.2}}></AccountCircleIcon>
                                {Teacher.occupation}
                            </div>
                            <div className="Main-Name">
                                {Teacher.name}
                            </div>
                            <div className="Main-Description">
                                {Teacher.description}
                            </div>
                        </div>
                        <div className="Main-Bottom">
                            <div className="Main-Price">
                                <h3><span className='Price-Currency'>{Teacher.paymentCurrency}</span>{Teacher.price}/{Teacher.paymentType}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="Teacher-Information">
                        <div className="Information-Label">
                            ზოგადი ინფორმაცია
                        </div>
                        <div className="Information-Location">
                            <div className="Location-Label Label">მისამართი:</div>
                            <div className="Location-Div Info-Div">{Teacher.location}</div>
                        </div>
                        <div className="Information-Number">
                            <div className="Number-Label Label">ტელეფონის ნომერი:</div>
                            <div className="Number-Div Info-Div">{Teacher.mobileNumber}</div>
                        </div>
                        <div className="Information-Education">
                            <div className="Education-Label Label">განათლება:</div>
                            <div className="Education-Div Info-Div">{Teacher.academicLevel}, {Teacher.university}</div>
                        </div>
                        <div className="Teacher-Workplace">
                            <div className="Workplace-Label Label">ახლანდელი სამუშაო ადგილი:</div>
                            <div className="Workplace-Div Info-Div">{Teacher.workplace}</div>
                        </div>
                    </div>
                </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewTeacherScreen;
