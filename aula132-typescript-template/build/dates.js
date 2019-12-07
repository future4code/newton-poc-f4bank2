"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
moment.locale("pt-br");
const date = moment("28/02/2004", "DD/MM/YYYY");
const today = moment();
const diffInMonths = today.diff(date, "months");
console.log(diffInMonths);
//# sourceMappingURL=dates.js.map