import React, { useEffect, useRef } from 'react'
import './TheoremPreview.scss';

function TheoremPreview({ theorem }) {
    const mathRef = useRef(null);
  
    useEffect(() => {
      if (mathRef.current) {
        mathRef.current.innerHTML = theorem.title;
        // Optionally, you might need to re-render MathJax if used
        // window.MathJax && window.MathJax.typeset();
      }
    }, [theorem]);
  
    return (
      <div className='TheoremPreview'>
        <h2 ref={mathRef} />
        <h5>{theorem.description}</h5>
      </div>
    );
  }
  
  export default TheoremPreview;