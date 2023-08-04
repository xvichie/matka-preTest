import React, { useEffect, useRef, useState } from 'react'
import './ScrollButtonComponent.scss';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

function ScrollButtonComponent({ problems }) {
    const containerRef = useRef(null);

    const chosenAnswers = useSelector((state) => state.test.chosenAnswers);
    const answers = useSelector((state) => state.test.answers);

    const [scroll, setScroll] = useState(0);

    const translateAnswer = (answer) => {
        let translated = '';
        if (answer === 'ა') {
            translated = 'a'
        } else if (answer === 'ბ') {
            translated = 'b'
        } else if (answer === 'გ') {
            translated = 'c'
        } else if (answer === 'დ') {
            translated = 'd'
        }
        else {
            translated = ''
        }
        return translated;
    }

    const [hasScrolled, setHasScrolled] = useState(false);

    const handleScroll = () => {
        // Get the height of the header
        const headerHeight = document.querySelector('header').offsetHeight;

        // Check the scroll position
        //console.log(window.scrollY, ' ', headerHeight - 2)
        if (window.scrollY > headerHeight - 3) {
            setHasScrolled(true);
        } else {
            setHasScrolled(false);
        }
    };

    useEffect(() => {
        // Attach the scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div style={{ top: hasScrolled ? '0px' : '60px' }} className='ScrollButtons' ref={containerRef}>
            <div className='ScrollButtons-Div'>
                {problems.map((problem, index) => {
                    console.log('chosenAnswers ', index, '-', chosenAnswers[index]);
                    console.log(translateAnswer(answers[index]));
                    return (
                        <Button
                            color={
                                (chosenAnswers[index] !== '') ? chosenAnswers[index] === translateAnswer(answers[index]) ? 'success' : 'secondary' : 'primary'
                            }
                            className='ScrollButtons-Button'
                            variant={(chosenAnswers[index] !== '') ? 'contained' : 'outlined'}
                            key={index}
                            onClick={() => {
                                const element = document.getElementById(`problem-${index}`);
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        >
                            {index + 1}
                        </Button>
                    )
                })}
            </div>
        </div >
    );
};

export default ScrollButtonComponent;