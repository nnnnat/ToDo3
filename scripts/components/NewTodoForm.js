import React from 'react';
import classSet from 'classnames';
import h from '../helpers';

var AddTodoForm = React.createClass({

  getInitialState : function() {
    return {
      init : false,
      invalidTitle : false,
      invalidDate : false
    }
  },

  componentDidUpdate : function() {
    if(!this.state.init) {
      this.setTodaysDate();
    }
  },

  validateForm : function(event) {
    event.preventDefault();
    var titleValid = this.validateTitle();
    var dateValid = this.validateDate();

    // if everything is valid submit this bad boi
    if(titleValid && dateValid) {
      this.submitForm();
    }
  },

  validateTitle : function() {
    var form = this.refs;
    var isTitleValid = (form.newTodoTitle.value === '' ? false : true);

    this.setState({
      invalidTitle : !isTitleValid
    });

    return isTitleValid;
  },

  validateDate : function() {
    var form = this.refs;
    var dueDate = String(form.newTodoYear.value+'-'+form.newTodoMonth.value+'-'+form.newTodoDay.value);
    var currentDate = new Date();
    dueDate = new Date(dueDate);
    currentDate.setHours(0,0,0,0);
    dueDate.setHours(0,0,0,0);

    var isDateValid = (currentDate.getTime() <= dueDate.getTime() ? true : false);

    this.setState({
      invalidDate : !isDateValid
    });

    return isDateValid;
  },

  submitForm : function() {
    var form = this.refs;
    var createdDate = new Date();
    var dueDate = String(form.newTodoYear.value+'-'+form.newTodoMonth.value+'-'+form.newTodoDay.value);
    createdDate = h.uglyDate(String(createdDate));

    var todo = {
      title : form.newTodoTitle.value,
      due_date : dueDate,
      created_date : createdDate,
      overdue : false,
      complete : false
    }

    this.props.addTodo(todo);
    this.cancelForm();
  },

  cancelForm : function(event) {
    var form = this.refs;
    if(event) {
      event.preventDefault();
    }

    this.setState({
      init : false,
      invalidTitle : false,
      invalidDate : false
    });

    this.props.toggleNewTodoForm();
    form.newTodoForm.reset();
  },

  setTodaysDate : function() {
    var form = this.refs;
    var date = new Date();
    var day = date.getDate()+1;
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    month = (month < 10 ? '0' + month : month);
    day = (day < 10 ? '0' + day : day);

    form.newTodoMonth.value = month;
    form.newTodoDay.value = day;
    form.newTodoYear.value = year;

    this.setState({
      init : true
    });

    form.newTodoForm.focus();
  },

  render : function() {
    var formClasses = classSet({
      'todo-panel' : true,
      'active' : this.props.isActive
    });

    var titleClasses = classSet({
      'error' : this.state.invalidTitle
    });

    var titleError = classSet({
      'message' : true,
      'message--urgent' : true,
      'active' : this.state.invalidTitle
    });

    var dateClasses = classSet({
      'todo-panel-due-date' : true,
      'error' : this.state.invalidDate
    });

    var dateError = classSet({
      'message' : true,
      'message--urgent' : true,
      'active' : this.state.invalidDate
    });

    return (
      <section className={formClasses} aria-hidden={this.props.isActive} aria-expanded={this.props.isActive}>
        <form className="todo-panel-form" ref="newTodoForm" id="todo-panel-form" tabindex="-1" aria-label="New Todo Form" onSubmit={this.validateForm}>
          <label for="todo-title">
            ToDo:
          </label>
          <div className={titleError}><p>You forgot the title!</p></div>
          <input onBlur={this.validateTitle} onChange={this.validateTitle} ref="newTodoTitle" id="todo-title" className={titleClasses} type="text" />

          <fieldset>
            <legend>Due Date:</legend>
            <div className={dateError}><p>Due dates must be a valid date in the future!</p></div>
            <div className={dateClasses} id="todo-due-date">

              <label for="todo-due-month">
                <span className="text">Month</span>
                <select onChange={this.validateDate} ref="newTodoMonth" name="todo due month" id="todo-due-month">
                  <option value="01">Jan</option>
                  <option value="02">Feb</option>
                  <option value="03">Mar</option>
                  <option value="04">Apr</option>
                  <option value="05">May</option>
                  <option value="06">Jun</option>
                  <option value="07">Jul</option>
                  <option value="08">Aug</option>
                  <option value="09">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </select>
              </label>

              <label for="todo-due-day">
                <span className="text">Day</span>
                <select onChange={this.validateDate} ref="newTodoDay" name="todo due day" id="todo-due-day">
                  <option value="01">1</option>
                  <option value="02">2</option>
                  <option value="03">3</option>
                  <option value="04">4</option>
                  <option value="05">5</option>
                  <option value="06">6</option>
                  <option value="07">7</option>
                  <option value="08">8</option>
                  <option value="09">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
              </label>

              <label for="todo-due-year">
                <span className="text">Year</span>
                <select onChange={this.validateDate} ref="newTodoYear" name="todo due year" id="todo-due-year">
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </label>
            </div>
          </fieldset>

          <div className="button-group todo-panel-block">
            <button className="button button--primary invert" type="submit">Add</button>
            <button className="button button--primary invert" onClick={this.cancelForm}>Cancel</button>
          </div>
        </form>
      </section>
    )
  }

});

export default AddTodoForm;
