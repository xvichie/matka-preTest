import React from 'react'
import './AdPlaceholderComponent.scss';

function AdPlaceholderComponent({AdId}) {
  
  return (
    <div className='AdPlaceholderComponent'>
      <a href="/">
        <div className="Ad-Ad">
            სარეკლამო ადგილი #{AdId}
        </div>
      </a>
    </div>
  )
}

export default AdPlaceholderComponent