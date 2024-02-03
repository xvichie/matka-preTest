import React from 'react'
import './NotFoundScreen.scss';

function NotFoundScreen() {
  return (
    <div className='NotFoundScreen'>
        <div className="NotFoundScreen-Wrapper">
          <img src={process.env.PUBLIC_URL+'/images/Error404Foreground.png'} alt="Error404" />
          <h2><span>შეცდომა 404:</span> გვერდი ნაპოვნი არაა!</h2>
          <h4>ამდენი მეცადინეობისგან მგონი გზა აგებნა, აქ აღარაფერია {":)"}</h4>
        </div>
    </div>
  )
}

export default NotFoundScreen