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

let users: users = {
    name: "Severo", 
    cpf: 2, 
    birth: moment(),
    accountBalance: 0,
    statement: [],
};


const getAllAccounts = (err: any, data:Buffer) => {
    if(err){
        console.error(err);
        return;
    };

    
    const accountsJSONContent: any = data.toString();
    const database = JSON.parse(accountsJSONContent);

    const newDatabase = database.accounts.push(users)
    console.log(newDatabase);    
    
    // JSON.parse(newDatabase);
    // JSON.stringify(newDatabase);
    // createAcount(newDatabase);
};

const createAcount = (users: string): any => {

    writeFile(jsonFile, users, (err: any) => {
        if(err){
            console.error(err);
            return;
        };
    });
};

readFile(jsonFile, getAllAccounts);