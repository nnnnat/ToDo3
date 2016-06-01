import React from 'react';

var Header = React.createClass({

  openAddTodoForm : function() {

  },

  render : function() {
    return (
      <header>
        <div className="header-block">
          <h1 className="header-block__logo">
            ToDo3
          </h1>
        </div>
        <div className="header-block button-group">
          <button className="button button--primary" onClick={this.props.toggleNewTodoForm}>New ToDo</button>
          <button className="button button--primary js-load-completed-todo">Completed ToDos</button>
        </div>
      </header>
    )
  }

});

export default Header;
