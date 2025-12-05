import React from "react";
import { Github, Mail, Linkedin } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="contactUs">
      <div className="contents">
        <div className="mail">
          <a href={`mailto:connect.with.ankana@gmail.com`}>
            <Mail className="contactImage"/>
          </a>
          <h3>Any Issues? Send a mail</h3>
        </div>
        <div className="linkedin">
          <a href={`https://www.linkedin.com/in/ankana-ghosh-1a76071b7/`}>
            <Linkedin className="contactImage"/>
          </a>
          <h3>Connect with me on LinkedIn</h3>
        </div>
        <div className="github">
          <a href={`https://github.com/ankanaghosh2001`}>
            <Github className="contactImage"/>
          </a>
          <h3>Find me on Github</h3>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
