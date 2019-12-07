import * as moment from "moment";
moment.locale("pt-br")

const date: moment.Moment = moment("28/02/2004", "DD/MM/YYYY")
const today: moment.Moment = moment()

const diffInMonths = today.diff(date,"months");

console.log(diffInMonths);