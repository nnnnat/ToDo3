// react junk
import React, { Component, PropTypes } from 'react';
import CSSTransition from 'react-addons-css-transition-group';
import Rebase from 're-base';
// componenets
import Header from './Header';
import Todo from './Todo';
import Footer from './Footer';
import TodoForm from './TodoForm';

const base = Rebase.createClass('https://todo33.firebaseio.com/');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos : {},
      complete : {},
      editTodoId : null,
      todoFormActive : false,
      completeActive : false
    };
  }

  componentDidMount() {
    base.syncState('/complete', {
      context : this,
      state : 'complete'
    });

    base.syncState('/todos', {
      context : this,
      state : 'todos'
    });
  }

  // todo actions
  addTodo(todo) {
    var timeStamp = (new Date()).getTime();
    this.state.todos['todo-' + timeStamp] = todo;
    this.setState({
      todos : this.state.todos
    });
  }

  editTodo(todo) {
    var todoId = this.state.editTodoId;
    this.state.todos[todoId].title = todo.title;
    this.state.todos[todoId].due_date = todo.due_date;
    this.state.todos[todoId].overdue = false;
    this.setState({
      todos : this.state.todos
    });
  }

  overdueTodo(key) {
    this.state.todos[key].overdue = true;
    this.setState({
      todos : this.state.todos
    });
  }

  deleteTodo(key) {
    var list = (this.state.completeActive ? this.state.complete : this.state.todos);
    list[key] = null;

    if(this.state.completeActive) {
      this.setState({
        complete : this.state.complete
      });
    } else {
      this.setState({
        todos : this.state.todos
      });
    }
  }

  primaryActionTodo(key) {
    // if the completed todos are active set oldList to the state.complete else state.todos
    var oldList = (this.state.completeActive ? this.state.complete : this.state.todos);
    // if the completed todos are active set newList to the state.todos else state.complete
    var newList = (!this.state.completeActive ? this.state.complete : this.state.todos);
    /*
    if the completed todos are active set the todoName to todo- since we are moving the todo from state.complete to state.todo
    */
    var todoName = (this.state.completeActive ? 'todo-' : 'complete-');
    // saving the todo object off in a temp variable
    var tempTodo = oldList[key];
    var timeStamp = (new Date()).getTime();

    // switching the complete flag to the opisite
    tempTodo.complete = !tempTodo.complete;
    // adding the temp todo to the state with the right name and timestamp as an ID
    newList[todoName + timeStamp] = tempTodo;

    // updating state with the moved todo
    if(!this.state.completeActive) {
      this.setState({
        complete : this.state.complete
      });
    } else {
      this.setState({
        todos : this.state.todos
      });
    }

    // deleting the old todo from state
    this.deleteTodo(key);
  }

  // this opens and closes the Todo Form component
  toggleTodoForm(key = null) {
    this.setState({
      editTodoId : key,
      todoFormActive : !this.state.todoFormActive
    });
  }

  // loading in completed todos
  toggleTodosList() {
    this.state.completeActive = !this.state.completeActive;
    this.setState({
      completeActive : this.state.completeActive
    });
  }

  // sorting datalsit
  // sortDataList(key) {
  //   var tempArr = new Array();
  //   tempArr.push(this.state.todos[key]);

  //   return tempArr;
  // }

  // render functions
  renderTodo(key) {
    var data = (this.state.completeActive ? this.state.complete[key] : this.state.todos[key]);

    return <Todo key={key} index={key} data={data} overdueTodo={this.overdueTodo.bind(this)} deleteTodo={this.deleteTodo.bind(this)} primaryActionTodo={this.primaryActionTodo.bind(this)} toggleTodoForm={this.toggleTodoForm.bind(this)} />;
  }

  render() {
    var dataList = (this.state.completeActive ? this.state.complete : this.state.todos);

    return (
      <div>
        <Header toggleTodoForm={this.toggleTodoForm.bind(this)} toggleTodosList={this.toggleTodosList.bind(this)} completeActive={this.state.completeActive} />

        <CSSTransition id="todo-list" className="todo-list" component="main" transitionName="todo-list" transitionEnterTimeout={2000} transitionLeaveTimeout={2000}>

          { Object.keys(dataList).map(this.renderTodo.bind(this)) }

        </CSSTransition>

        <button className="button button--primary" onClick={this.loadSamples.bind(this)}>Load Sample Data</button>

        <Footer />

        <TodoForm isActive={this.state.todoFormActive} editTodoId={this.state.editTodoId} todos={this.state.todos} toggleTodoForm={this.toggleTodoForm.bind(this)} editTodo={this.editTodo.bind(this)} addTodo={this.addTodo.bind(this)} />

      </div>
    );
  }

  loadSamples() {
    this.setState({
      todos : require('../sample-todos.js'),
      complete : require('../sample-complete.js')
    });
  }
};

export default App;
