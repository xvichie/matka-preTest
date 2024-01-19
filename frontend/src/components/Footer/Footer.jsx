import React from 'react'
import './Footer.scss';
import { Link } from 'react-router-dom';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <div className='Footer'>
        <div className="Footer-Wrapper">
            <div className="Footer-Brand">
                <div className="Brand-Title Title">
                    <h3>ვებსაიტი</h3>
                </div>
                <Link to={'/'}>
                    <h2>Matka.ge</h2>
                </Link>
                {/* <Link>
                    <img className='Brand-Alfa' src={process.env.PUBLIC_URL+'images/DevelopedByAlfa.png'} alt="" />
                </Link> */}
                <h5
                style={{color:'white',fontSize:'12px'}}
                >2023© Matka.ge <br /> ყველა უფლება დაცულია.</h5>
            </div>
            <div className="Footer-About">
                <div className="About-Title Title">
                    <h3>ჩვენ შესახებ</h3>
                </div>
                <div className="About-Contents">
                    <Link to={'/'}>
                        <h4 className='Subtitle'>რეკლამის განთავსება</h4>
                    </Link>
                    <Link to={'/aboutUs'}>
                        <h4 className='Subtitle'>ჩვენს შესახებ</h4>
                    </Link>
                    <Link to={'/aboutUs'}>
                        <h4 className='Subtitle'>ჩვენი გუნდი</h4>
                    </Link>
                </div>
            </div>
            <div className="Footer-Other">
                <div className="Other-Title Title">
                    <h3>სხვა</h3>
                </div>
                <div className="Other-Contents">
                    <Link to={'/'}>
                        <h4 className='Subtitle'>რეკლამის განთავსება</h4>
                    </Link>
                    <Link to={'/terms-and-conditions'}>
                        <h4 className='Subtitle'>წესები და პირობები</h4>
                    </Link>
                    <Link to={'/privacy'}>
                        <h4 className='Subtitle'>კონფიდენციალურობა</h4>
                    </Link>
                    <Link to={'/aboutUs'}>
                        <h4 className='Subtitle'>ჩვენი მიზნები</h4>
                    </Link>
                </div>
            </div>
            <div className="Footer-Contact">
                <div className="Contact-Title Title">
                    <h3>კონტაქტი</h3>
                </div>
                <div className="Contact-Contents">
                    <Link to={'/'}>
                        <h4 className='Subtitle'>რეკლამის განთავსება</h4>
                    </Link>
                    <h4 className='Subtitle'>ელ. ფოსტა: <strong style={{color:'orange'}}>andriakhvichia2005@gmail.com</strong> </h4>
                    <div className="Contents-Socials">
                        <ul>
                            <Link to={'/'}>
                                <li>
                                    <FacebookIcon></FacebookIcon>
                                </li>
                            </Link>
                            <Link to={'/'}>
                                <li>
                                    <InstagramIcon></InstagramIcon>
                                </li>
                            </Link>
                            <Link to={'/'}>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tiktok" viewBox="0 0 16 16">
                                        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
                                    </svg>
                                </li>
                            </Link>
                            <Link to={'/'}>
                                <li>
                                    <LinkedInIcon></LinkedInIcon>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer