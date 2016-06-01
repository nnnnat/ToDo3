import React from 'react';
import classSet from 'classnames';
import h from '../helpers';

var Todo = React.createClass({

  render : function() {
    var todo = this.props.data;
    return (

      <div tabindex="0" className="todo pink">
        <div className="message message--urgent">
          <p>This ToDo is OverDo!</p>
        </div>
        <div className="todo-info">
          <h2 className="todo-info__title">Due: <span className="text">{h.prettyDate(todo.due_date)}</span></h2>
          <h3 className="todo-info__title">{todo.title}</h3>

          <div className="todo-button-group button-group">
            <button className="button button--secondary js-todo-edit">Edit</button>
            <button className="button button--secondary js-todo-delete">Delete</button>
          </div>
        </div>
        <div className="todo-primary-action">
          <button className="button button--primary button--large js-todo-complete">Done</button>
        </div>
      </div>

    )
  }

});

export default Todo;
