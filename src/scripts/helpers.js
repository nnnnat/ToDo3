export function prettyDate(date) {
  const newDate = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[newDate.getMonth()];
  const day = newDate.getUTCDate();
  const year = newDate.getFullYear();

  return `${month} ${day} ${year}`;
}

export function uglyDate(date) {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  let day = newDate.getDate();
  let month = newDate.getMonth()+1;

  month = (month < 10 ? '0' + month : month);
  day = (day < 10 ? '0' + day : day);
  return `${year}-${month}-${day}`;
}
