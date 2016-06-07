let helpers = {

  prettyDate : function(date) {
    var newDate = new Date(date);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var month = months[newDate.getMonth()];
    var day = newDate.getDate()+1;
    var year = newDate.getFullYear();

    newDate = String(month+' '+day+' '+year);

    return newDate;
  },

  uglyDate : function(date) {
    var newDate = new Date(date);
    var day = newDate.getDate();
    var year = newDate.getFullYear();
    var month = newDate.getMonth()+1;

    month = (month < 10 ? '0' + month : month);
    day = (day < 10 ? '0' + day : day);
    newDate = String(year+'-'+month+'-'+day);

    return newDate;
  }
}

export default helpers
