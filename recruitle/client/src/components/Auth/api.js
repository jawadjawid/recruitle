import { send } from '../api.js';

export function signup(username, password, callback){
    send("POST", "/signup/", {username, password}, callback);
}

export function signin(username, password, callback){
    send("POST", "/signin/", {username, password}, callback);
}

export function signout (callback){
    send("GET", "/signout/", {}, callback);
}
    
