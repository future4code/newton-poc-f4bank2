"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const fs_1 = require("fs");
const jsonFile = "users.json";
let users = {
    name: "Severo",
    cpf: 2,
    birth: moment(),
    accountBalance: 0,
    statement: [],
};
const getAllAccounts = (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    ;
    const accountsJSONContent = data.toString();
    const database = JSON.parse(accountsJSONContent);
    database.accounts.push(users);
    const newDatabase = JSON.stringify(database);
    createAcount(newDatabase);
};
const createAcount = (newDatabase) => {
    fs_1.writeFile(jsonFile, newDatabase, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        ;
    });
};
fs_1.readFile(jsonFile, getAllAccounts);
//# sourceMappingURL=index.js.map