import React, { useEffect } from 'react'
import './Footer.scss';
import { Link } from 'react-router-dom';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {

    const addVisitorCounter = () => {
        // Create a script element
        const script = document.createElement('script');
        script.src = '//counter.top.ge/counter.js';
        script.async = true;
      
        // Create a div element
        const div = document.createElement('div');
        div.id = 'top-ge-counter-container';
        div.setAttribute('data-site-id', '117400');
      
        // Append the div to the body
        document.body.appendChild(div);
      
        // Append the script to the body
        document.body.appendChild(script);
      
        // Cleanup function to remove the script and div
        return () => {
          document.body.removeChild(script);
          document.body.removeChild(div);
        };
      };

      useEffect(() => {
        const cleanup = addVisitorCounter();

        // Cleanup on unmount
        return cleanup;
      },[])

  return (
    <div className='Footer'>
        <div className="Footer-Wrapper">
            <div className="Footer-Brand">
                <div className="Brand-Title Title">
                <h3>ვებსაიტი</h3>
                </div>
                <h2>
                <Link to={'/'}>Matka.ge</Link>
                </h2>
                {/* <Link>
                            <img className='Brand-Alfa' src={process.env.PUBLIC_URL+'images/DevelopedByAlfa.png'} alt="" />
                        </Link> */}
                <h5 style={{ fontSize: '12px' }}>
                2023© Matka.ge <br /> ყველა უფლება დაცულია.
                </h5>
            </div>
            <div className="Footer-About">
                <div className="About-Title Title">
                <h3>ჩვენ შესახებ</h3>
                </div>
                <div className="About-Contents">
                <h4 className='Subtitle'>
                    <Link to={'/aboutUs'}>ჩვენს შესახებ</Link>
                </h4>
                <h4 className='Subtitle'>
                    <Link to={'/aboutUs'}>ჩვენი გუნდი</Link>
                </h4>
                <h4 className='Subtitle'>
                    <Link target='_blank' to={'https://docs.google.com/forms/d/1zpduQEM3Xm-leGwVJRgCfNsef8Da4982DuJLA0LG2cs/edit?usp=sharing_eil_se_dm&ts=65bccb87'}>
                    რეკლამის განთავსება
                    </Link>
                </h4>
                </div>
            </div>
            <div className="Footer-Other">
                <div className="Other-Title Title">
                <h3>სხვა</h3>
                </div>
                <div className="Other-Contents">
                <h4 className='Subtitle'>
                    <Link to={'/termsAndConditions'}>წესები და პირობები</Link>
                </h4>
                <h4 className='Subtitle'>
                    <Link to={'/privacy'}>კონფიდენციალურობა</Link>
                </h4>
                <h4 className='Subtitle'>
                    <Link to={'/aboutUs'}>ჩვენი მიზნები</Link>
                </h4>
                <h4 className='Subtitle'>
                    <Link target='_blank' to={'https://docs.google.com/forms/d/1zpduQEM3Xm-leGwVJRgCfNsef8Da4982DuJLA0LG2cs/edit?usp=sharing_eil_se_dm&ts=65bccb87'}>
                    რეკლამის განთავსება
                    </Link>
                </h4>
                </div>
            </div>
            <div className="Footer-Contact">
                <div className="Contact-Title Title">
                <h3>კონტაქტი</h3>
                </div>
                <div className="Contact-Contents">
                <h4 className='Subtitle'>
                    <Link target='_blank' to={'https://docs.google.com/forms/d/16YalAE6PeyR2UgdWEZVc8-P_5gnCjGsuGasDabQ6uGo/edit?usp=sharing_eip_se_dm&ts=65bccf96'}>
                    მასწავლებლის განაცხადის შევსება
                    </Link>
                </h4>
                <h4 className='Subtitle'>
                    <Link target='_blank' to={'https://docs.google.com/forms/d/1yR7-Hk_OhnZQg45x7grUWe9emNx0UqOCW84SgCWNS6A/edit?ts=65bccd0a'}>
                    ამოცანების გამოგზავნა
                    </Link>
                </h4>
                <h4 className='Subtitle'>ელ. ფოსტა: <strong style={{ color: 'orange' }}>matkageyt@gmail.com</strong> </h4>
                <div className="Contents-Socials">
                    <ul>
                    <Link target='_blank' to={'https://www.facebook.com/profile.php?id=61555894596638'}>
                        <li>
                        <FacebookIcon></FacebookIcon>
                        </li>
                    </Link>
                    <Link target='_blank' to={'https://www.instagram.com/matka.ge/'}>
                        <li>
                        <InstagramIcon></InstagramIcon>
                        </li>
                    </Link>
                    <Link target='_blank' to={'https://www.tiktok.com/@matka.ge'}>
                        <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tiktok" viewBox="0 0 16 16">
                            <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                        </svg>
                        </li>
                    </Link>
                    <Link target='_blank' to={'https://www.youtube.com/@Matkage'}>
                        <li>
                        <YouTubeIcon></YouTubeIcon>
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