import { send } from '../api.js';

export function signup(firstName, lastName, email, password, companyName, userType, callback){
    send("POST", "/signup/", {firstName, lastName, email, password, companyName, userType}, callback);
}

export function signin(email, password, callback){
    send("POST", "/signin/", {email, password}, callback);
}

export function signout (callback){
    send("GET", "/signout/", {}, callback);
}
    
