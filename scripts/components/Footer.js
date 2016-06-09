import React from 'react';

const Footer = React.createClass({

  render : function() {
    var year = new Date();
    year = year.getFullYear();

    return (
      <footer>
        <div className="footer-copyright">
          <p className="small">ToDo3 © {year}</p>
          <p className="small">Nat Hamilton</p>
        </div>
      </footer>
    )
  }

});

export default Footer;
