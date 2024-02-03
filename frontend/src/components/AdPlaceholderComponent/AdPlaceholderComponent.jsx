import React from 'react'
import './AdPlaceholderComponent.scss';

function AdPlaceholderComponent({AdId}) {
  
  return (
    <div className='AdPlaceholderComponent'>
      <a target='_blank' href="https://docs.google.com/forms/d/1zpduQEM3Xm-leGwVJRgCfNsef8Da4982DuJLA0LG2cs/edit?usp=sharing_eil_se_dm&ts=65bccb87">
        <div className="Ad-Ad">
            სარეკლამო ადგილი #{AdId}
        </div>
      </a>
    </div>
  )
}

export default AdPlaceholderComponent