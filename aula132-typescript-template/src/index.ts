import * as moment from 'moment';
import { writeFile, readFile } from 'fs';

const database: string = "users.json";

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

let users: users[] = [
    {
        name: "Severo", 
        cpf: 2, 
        birth: moment(),
        accountBalance: 0,
        statement: [],
    },
];


const getAllAccounts = (err: any, data:Buffer) => {
    if(err){
        console.error(err);
        return;
    };

    const accountsJSONContent: any = [data.toString(), ...users];
    
    accountsJSONContent.map((account: users) => {
        createAcount(account)
    });
};

const createAcount = (users: users): any => {

    writeFile(database, users, (err: any) => {
        if(err){
            console.error(err);
            return;
        };
    });
};

readFile(database, getAllAccounts);