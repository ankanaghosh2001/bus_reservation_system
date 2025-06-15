import React from 'react'
import mailLogo from '../assets/icon_gmail.svg'
import linkedinLogo from '../assets/icon_linkedin.svg'
import githubLogo from '../assets/icon_github.svg'

const ContactUs = () => {
  return (
    <div className='contactUs'>
      <div className="mail">
        <a href={`mailto:connect.with.ankana@gmail.com`}><img src={mailLogo} alt="Gmail Logo" /></a> 
        <h3>Any Issues? Send a mail</h3>
      </div>
      <div className='linkedin'>
        <a href={`https://www.linkedin.com/in/ankana-ghosh-1a76071b7/`}><img src={linkedinLogo} alt="LinkedIn Logo" /></a>
        <h3>Connect with me on LinkedIn</h3>
      </div>
      <div className="github">
        <a href={`https://github.com/ankanaghosh2001`}><img src={githubLogo} alt="Github Logo" /></a>
        <h3>Find me on Github</h3>
      </div>
    </div>
  )
}

export default ContactUs
