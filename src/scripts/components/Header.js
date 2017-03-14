import React from 'react';

const Header = props => {
  let buttonText = (props.completeActive ? 'View Upcoming' : 'View Completed');

  return (
    <header>
      <div className="header-block">
        <h1 className="header-block__logo">
          ToDo3
        </h1>
      </div>
      <div className="header-block button-group">
        <button className="button button--primary" onClick={props.toggleTodoForm}>New ToDo</button>
        <button className="button button--primary" onClick={props.toggleTodosList}>{buttonText}</button>
      </div>
    </header>
  );
};

// propTypes : {
//   toggleTodoForm : React.PropTypes.func.isRequired
// },

export default Header;
