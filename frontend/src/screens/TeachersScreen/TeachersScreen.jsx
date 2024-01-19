import React, { useState } from 'react'
import './TeachersScreen.scss';

import TeachersJSON from '../../assets/teachers/teachers.json';
import {Pagination} from '@mui/material/Pagination';
import TeacherPreview from './TeacherPreview/TeacherPreview';


import ReactPaginate from 'react-paginate';
import AdPlaceholderComponent from '../../components/AdPlaceholderComponent/AdPlaceholderComponent';

function TeachersScreen() {

    

    return (
        <div className='TeachersScreen'>
            <div className="TeachersScreen-Wrapper">
                <AdPlaceholderComponent AdId={1}></AdPlaceholderComponent>
                <div className="TeachersScreen-Label">
                    <h1>
                        მასწავლებლები, რომლებსაც რეკომენდირებას ვუწევთ
                    </h1>
                    <h3>
                        გინდა რომ შენი სახელიც იყოს ამ სიაში? <a href="/">დაგვიკავშირდი აქ</a>
                    </h3>
                </div>
                <div className="TeachersScreen-Content">
                    {TeachersJSON.teachers ? (
                        <>
                            {TeachersJSON.teachers.map((teacher,index) => (
                                <TeacherPreview Teacher={teacher} key={index} />
                            ))}
                        </>
                    ): ''}
                </div>
            </div>
        </div>
    )
}

export default TeachersScreen;