import React from 'react';
import classSet from 'classnames';
import h from '../helpers';

var Todo = React.createClass({

  componentWillMount : function() {
    this.overdue();
  },

  overdue : function() {
    var todo = this.props.data;
    var dueDate = new Date(todo.due_date);
    var currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    dueDate.setHours(0,0,0,0);

    if (currentDate.getTime() > dueDate.getTime()) {
      this.props.overdueTodo(this.props.index);
    }
  },

  remove : function() {
    var todoId = this.props.index;
    this.props.deleteTodo(todoId);
  },

  render : function() {
    var todo = this.props.data;
    var overdueClasses = classSet({
      'message' : true,
      'message--urgent' : true,
      'active' : todo.overdue
    });

    return (

      <div tabindex="0" className="todo pink">
        <div className={overdueClasses}>
          <p>This ToDo is OverDo!</p>
        </div>
        <div className="todo-info">
          <h2 className="todo-info__title">Due: <span className="text">{h.prettyDate(todo.due_date)}</span></h2>
          <h3 className="todo-info__title">{todo.title}</h3>

          <div className="todo-button-group button-group">
            <button className="button button--secondary">Edit</button>
            <button className="button button--secondary" onClick={this.props.deleteTodo.bind(null, this.props.index)}>Delete</button>
          </div>
        </div>
        <div className="todo-primary-action">
          <button className="button button--primary button--large">Done</button>
        </div>
      </div>

    )
  }

});

export default Todo;
