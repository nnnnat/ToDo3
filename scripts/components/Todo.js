import React from 'react';
import classSet from 'classnames';
import h from '../helpers';

var Todo = React.createClass({

  propTypes : {
    data : React.PropTypes.object.isRequired,
    toggleTodoForm : React.PropTypes.func.isRequired,
    deleteTodo : React.PropTypes.func.isRequired,
    overdueTodo : React.PropTypes.func.isRequired,
    primaryActionTodo : React.PropTypes.func.isRequired
  },

  componentWillMount : function() {
    var todo = this.props.data;

    if(!todo.complete && !todo.overdue) {
      this.overdue();
    }
  },

  overdue : function() {
    var todo = this.props.data;
    var dueDate = new Date(todo.due_date);
    var currentDate = new Date();
    currentDate.setUTCHours(0,0,0,0);
    dueDate.setUTCHours(0,0,0,0);

    if (currentDate.getTime() > dueDate.getTime()) {
      this.props.overdueTodo(this.props.index);
    }
  },

  remove : function() {
    var todoId = this.props.index;
    this.props.deleteTodo(todoId);
  },

  // undo : function() {
  //   var todoId = this.props.index;
  //   this.props.undoCompleteTodo(todoId);
  // },

  // done : function() {
  //   var todoId = this.props.index;
  //   this.props.completeTodo(this.props.index);
  // },

  priamryAction : function() {
    var todoId = this.props.index;
    this.props.primaryActionTodo(todoId)
  },

  edit : function() {
    var todoId = this.props.index;
    this.props.toggleEditTodoForm(todoId);
  },

  render : function() {
    var todo = this.props.data;
    var overdueClasses = classSet({
      'message' : true,
      'message--urgent' : true,
      'active' : todo.overdue
    });

    if(todo.complete) {
      return (
        <div tabindex="0" className="todo complete blue">
          <div className="todo-info">
            <h2 className="todo-info__title">Due: <span className="text">{h.prettyDate(todo.due_date)}</span></h2>
            <h3 className="todo-info__title">{todo.title}</h3>
          </div>
          <div className="todo-primary-action">
            <button className="button button--primary button--large" onClick={this.priamryAction}>Undo</button>
          </div>
        </div>
      )
    }

    return (

      <div tabindex="0" className="todo pink">
        <div className={overdueClasses}>
          <p>This ToDo is OverDo!</p>
        </div>
        <div className="todo-info">
          <h2 className="todo-info__title">Due: <span className="text">{h.prettyDate(todo.due_date)}</span></h2>
          <h3 className="todo-info__title">{todo.title}</h3>

          <div className="todo-button-group button-group">
            <button className="button button--secondary" onClick={this.edit} >Edit</button>
            <button className="button button--secondary" onClick={this.remove}>Delete</button>
          </div>
        </div>
        <div className="todo-primary-action">
          <button className="button button--primary button--large" onClick={this.priamryAction}>Done</button>
        </div>
      </div>

    )
  }

});

export default Todo;
