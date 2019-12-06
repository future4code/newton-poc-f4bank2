"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const fs_1 = require("fs");
const database = "users.json";
let users = [
    {
        name: "Severo",
        cpf: 2,
        birth: moment(),
        accountBalance: 0,
        statement: [],
    }
];
const getAllAccounts = (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const accountsJSONContent = [data.toString(), ...users];
    accountsJSONContent.map((account) => {
        createAcount(account);
    });
};
const createAcount = (users) => {
    fs_1.writeFile(database, users, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        ;
        console.log("Usuário criado com sucesso:", users);
    });
};
fs_1.readFile(database, getAllAccounts);
//# sourceMappingURL=index.js.map