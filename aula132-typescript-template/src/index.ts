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

    const today: moment.Moment = moment()
    const eighteenYearsInDays = 6574

    if (today.diff(newUser.birth,"days") >= eighteenYearsInDays) {
        const accountsJSONContent: any = data.toString();
        const database = JSON.parse(accountsJSONContent);
        database.accounts.push(newUser)    
        const newDatabase = JSON.stringify(database);
            
        createAcount(newDatabase);
    } else {
        console.log("É proibida a criação de contas para menores de idade")
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

readFile(jsonFile, getAllAccounts);