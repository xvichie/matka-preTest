import React from 'react'
import './GlobalLoader.scss';

function GlobalLoader() {
  return (
    <div className='GlobalLoader'>
        <svg height="100" stroke="#F97432" stroke-width="2" class="text-line" width="130%">
            <text x="50%" dominant-baseline="middle" text-anchor="middle" y="50%">
                #Matka.ge
            </text>
        </svg>
    </div>
  )
}

export default GlobalLoader