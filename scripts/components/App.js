import React from 'react';
import Catalyst from 'react-catalyst';
import Rebase from 're-base';
import CSSTransition from 'react-addons-css-transition-group';

// componenets
import Header from './Header';
import Todo from './Todo';
import Footer from './Footer';
import NewTodoForm from './NewTodoForm';

var base = Rebase.createClass('https://todo33.firebaseio.com/');

var App = React.createClass({
  mixins : [Catalyst.LinkedStateMixin],

  getInitialState : function() {
    return {
      todos : {},
      complete : {},
      newTodoFormActive : false,
      editTodoFormActive : false
    }
  },

  componentDidMount : function() {
    base.syncState('/todos', {
      context : this,
      state : 'todos'
    });

    base.syncState('/complete', {
      context : this,
      state : 'complete'
    });
  },

  // adding & editing a todo
  addTodo : function(todo) {
    var timeStamp = (new Date()).getTime();
    this.state.todos['todo-' + timeStamp] = todo;
    this.setState({ todos : this.state.todos });
  },

  // toggling the newTodoForm & editTodoForm
  toggleNewTodoForm : function() {
    this.setState({
      newTodoFormActive : !this.state.newTodoFormActive
    });
  },

  toggleEditTodoForm : function() {
    this.setState({
      editTodoFormActive : !this.state.editTodoFormActive
    });
  },

  // render functions
  renderTodo : function(key) {
    return <Todo key={key} index={key} data={this.state.todos[key]} />
  },

  render : function() {
    return (
      <div>
        <Header toggleNewTodoForm={this.toggleNewTodoForm} />

        <CSSTransition id="todo-list" className="todo-list" component="main" transitionName="todo-list" transitionEnterTimeout={1500} transitionLeaveTimeout={1500}>
          { Object.keys(this.state.todos).map(this.renderTodo) }
        </CSSTransition>

        <Footer />

        <NewTodoForm isActive={this.state.newTodoFormActive} toggleNewTodoForm={this.toggleNewTodoForm} addTodo={this.addTodo} />

        <button className="button button--primary" onClick={this.loadSamples}>Load Sample Data</button>
      </div>
    )
  },

  loadSamples : function() {
    this.setState({
      todos : require('../sample-todos.js'),
      complete : require('../sample-complete.js')
    });
  },
});

export default App;
