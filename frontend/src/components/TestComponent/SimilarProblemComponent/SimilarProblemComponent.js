import React, { useEffect, useState } from 'react'
import SimilarProblemModalComponent from './SimilarProblemModalComponent'
import { useSelector } from 'react-redux';

function SimilarProblemComponent({ ButtonIcon, problemStringArray }) {
    const [problems, setProblems] = useState([]);
    const [Used, SetUsed] = useState(Array.from({ length: 2025 }, () => Array.from({ length: 4 }, () => Array.from({ length: 43 }, () => false))));
    const [counter, setCounter] = useState(0);

    console.log(problemStringArray);

    useEffect(() => {
        let i = 0;
        if (problemStringArray !== null && problemStringArray !== undefined) {
            problemStringArray.forEach((problemString, index) => {
                let splitProblemString = problemString.split('-');
                //console.log(splitProblemString);
                const ProblemObject = {
                    Year: parseInt(splitProblemString[0]),
                    Version: parseInt(splitProblemString[1]),
                    Problem: parseInt(splitProblemString[2])
                }

                //COULDN'T FIND THE BUG :D :D :D
                if (Used[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem] == false) {

                    setProblems(problems => [...problems, ProblemObject]);

                    let copy = [...Used];
                    copy[ProblemObject.Year][ProblemObject.Version][ProblemObject.Problem] = true;
                    SetUsed(copy);

                }
            });
        }
    }, [])

    //console.log(counter);
    //console.log(problems.length);
    return (
        <SimilarProblemModalComponent ButtonIcon={ButtonIcon} Problems={problems}></SimilarProblemModalComponent>
    )
}

export default SimilarProblemComponent