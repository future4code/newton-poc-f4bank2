"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const fs_1 = require("fs");
const jsonFile = "users.json";
let newUser = {
    name: "Severo",
    cpf: 2,
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
const getBalance = (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    ;
    const consultation = {
        name: "Severo",
        cpf: 4,
    };
    const accountsJSONContent = data.toString();
    const database = JSON.parse(accountsJSONContent);
    console.log(database);
    for (let user of database.accounts) {
        if (user.name === consultation.name && user.cpf === consultation.cpf) {
            console.log("Seu saldo é: ", user.accountBalance);
            return;
        }
        ;
    }
    ;
    console.log("Conta bancária não encontrada.");
};
const addBalance = (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    ;
    const depositOrder = {
        name: "Severo",
        cpf: 2,
        value: 50,
        date: moment(),
        description: "Depósito em dinheiro"
    };
    const accountsJSONContent = data.toString();
    const database = JSON.parse(accountsJSONContent);
    console.log(database);
    for (let user of database.accounts) {
        if (user.name === depositOrder.name && user.cpf === depositOrder.cpf) {
            user.accountBalance = user.accountBalance + depositOrder.value;
            console.log("Seu novo saldo é: ", user.accountBalance);
            const newStatementInput = {
                value: depositOrder.value,
                date: depositOrder.date,
                description: depositOrder.description,
            };
            user.statement.push(newStatementInput);
            const newDatabase = JSON.stringify(database);
            createAcount(newDatabase);
            return;
        }
        ;
    }
    ;
    console.log("Conta bancária não encontrada.");
};
fs_1.readFile(jsonFile, addBalance);
//# sourceMappingURL=index.js.map