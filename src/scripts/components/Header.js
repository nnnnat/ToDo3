import React from 'react';

const Header = React.createClass({

  propTypes : {
    toggleTodoForm : React.PropTypes.func.isRequired
  },

  openTodoForm : function() {
    this.props.toggleTodoForm(null);
  },

  render : function() {
    var buttonText = (this.props.completeActive ? 'View Upcoming' : 'View Completed');

    return (
      <header>
        <div className="header-block">
          <h1 className="header-block__logo">
            ToDo3
          </h1>
        </div>
        <div className="header-block button-group">
          <button className="button button--primary" onClick={this.openTodoForm}>New ToDo</button>
          <button className="button button--primary" onClick={this.props.toggleTodosList}>{buttonText}</button>
        </div>
      </header>
    );
  }

});

export default Header;
