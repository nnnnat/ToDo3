import React from 'react';

const Footer = props => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-copyright">
        <p className="small">ToDo3 © {year}</p>
        <p className="small">Nat Hamilton</p>
      </div>
    </footer>
  );
};

export default Footer;
