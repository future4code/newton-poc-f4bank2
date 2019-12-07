import * as moment from 'moment';
import { writeFile, readFile } from 'fs';

const jsonFile: string = "users.json";

type movements = {
    value: number, 
    date: moment.Moment, 
    description: string, 
};

type users = {
    name: string, 
    cpf: number, 
    birth: moment.Moment,
    accountBalance: number,
    statement: movements[],
};

let newUser: users = {
    name: "Severo", 
    cpf: 2, 
    birth: moment("07/12/2001", "DD/MM/YYYY"),
    accountBalance: 0,
    statement: [],
};


const getAllAccounts = (err: any, data:Buffer) => {
    if(err){
        console.error(err);
        return;
    };

    const today: moment.Moment = moment();
    const eighteenYearsInDays = 6574;

    if (today.diff(newUser.birth,"days") >= eighteenYearsInDays) {
        const accountsJSONContent: any = data.toString();
        const database = JSON.parse(accountsJSONContent);
        for (let user of database.accounts) {
            if (user.cpf === newUser.cpf) {
                console.log("CPF já cadastrado");
                return;
            };
        };

        database.accounts.push(newUser);    
        const newDatabase = JSON.stringify(database);
            
        createAcount(newDatabase);
    } else {
        console.log("É proibida a criação de contas para menores de idade");
    };
};

const createAcount = (newDatabase: string): any => {

    writeFile(jsonFile, newDatabase, (err: any) => {
        if(err){
            console.error(err);
            return;
        };
    });
};

type consultationsData = {
    name: string,
    cpf: number,
};

const getBalance = (err: any, data:Buffer) => {
    if(err){
        console.error(err);
        return;
    };

    const consultation: consultationsData = {
        name: "Severo",
        cpf: 4,
    };

    const accountsJSONContent: any = data.toString();
    const database = JSON.parse(accountsJSONContent);
    console.log(database);
    for (let user of database.accounts) {
        if (user.name === consultation.name && user.cpf === consultation.cpf) {
            console.log("Seu saldo é: ", user.accountBalance);
            return
        };
    };
    console.log("Conta bancária não encontrada.");
};

type depositData = {
    name: string,
    cpf: number,
    value: number,
    date: moment.Moment,
    description: string
};

type statementInput = {
    value: number,
    date: moment.Moment,
    description: string
};

const addBalance = (err: any, data:Buffer) => {
    if(err){
        console.error(err);
        return;
    };

    const depositOrder: depositData = {
        name: "Severo",
        cpf: 2,
        value: 50,
        date: moment(),
        description: "Depósito em dinheiro"
    };

    const accountsJSONContent: any = data.toString();
    const database = JSON.parse(accountsJSONContent);
    console.log(database);
    for (let user of database.accounts) {
        if (user.name === depositOrder.name && user.cpf === depositOrder.cpf) {
            user.accountBalance = user.accountBalance + depositOrder.value
            console.log("Seu novo saldo é: ", user.accountBalance);
            
            const newStatementInput: statementInput = {
                value: depositOrder.value,
                date: depositOrder.date,
                description: depositOrder.description,
            };
            user.statement.push(newStatementInput);    
            const newDatabase = JSON.stringify(database);
            createAcount(newDatabase);
            return
        };
    };
    console.log("Conta bancária não encontrada.");
};

const payBill = (err: any, data:Buffer) => {
    if(err){
        console.error(err);
        return;
    };

    const paymentOrder: statementInput = {
        value: 500,
        date: moment("06/01/2020", "DD/MM/YYYY"),
        description: "Depósito em dinheiro"
    };

    const userWhosPay = {
        name: "Pedro",
        cpf: 1
    };

    const today = moment()

    if (paymentOrder.date.unix() >= today.unix()) {
        const accountsJSONContent: any = data.toString();
        const database = JSON.parse(accountsJSONContent);
        if (database.accountBalance >= paymentOrder.value) {
            for (let user of database.accounts) {
                if (user.name === userWhosPay.name && user.cpf === userWhosPay.cpf) {            
                    if (!paymentOrder.date) {
                        paymentOrder.date = moment();
                    };

                    const newPaymentOrder: statementInput = {
                        value: paymentOrder.value,
                        date: paymentOrder.date,
                        description: paymentOrder.description,
                    };
                    
                    user.statement.push(newPaymentOrder);    
                    const newDatabase = JSON.stringify(database);
                    createAcount(newDatabase);
                    return
                };
            };
        } else {
            console.log("Saldo insuficiente.");
            return;
        };
    } else {
        console.log("Data de pagamento inválida.");
        return;
    };
    console.log("Conta bancária não encontrada.");
};

readFile (jsonFile, payBill);