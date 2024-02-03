import React from 'react';
import './GlobalLoader.scss';

function GlobalLoader() {
  return (
    <div className='GlobalLoader'>
      <svg height="10%" stroke="#F97432" strokeWidth="2" className="text-line" width="80%">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="4vw">
          #Matka.ge
        </text>
      </svg>
    </div>
  );
}

export default GlobalLoader;
