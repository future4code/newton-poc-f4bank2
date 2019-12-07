"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const fs_1 = require("fs");
const jsonFile = "users.json";
let newUser = {
    name: "Severo",
    cpf: 4,
    birth: moment("07/12/2001", "DD/MM/YYYY"),
    accountBalance: 0,
    statement: [],
};
const getAllAccounts = (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    ;
    const today = moment();
    const eighteenYearsInDays = 6574;
    if (today.diff(newUser.birth, "days") >= eighteenYearsInDays) {
        const accountsJSONContent = data.toString();
        const database = JSON.parse(accountsJSONContent);
        for (let user of database.accounts) {
            if (user.cpf === newUser.cpf) {
                console.log("CPF já cadastrado");
                return;
            }
            ;
        }
        ;
        database.accounts.push(newUser);
        const newDatabase = JSON.stringify(database);
        createAcount(newDatabase);
    }
    else {
        console.log("É proibida a criação de contas para menores de idade");
    }
    ;
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