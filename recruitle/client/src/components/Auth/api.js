  
function send(method, url, data, callback){
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status !== 200) callback("[" + xhr.status + "]" + xhr.responseText, null);
        else callback(null, JSON.parse(xhr.responseText));
    };
    xhr.open(method, url, true);
    if (!data) xhr.send();
    else{
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }
}

export function signup(username, password, callback){
    send("POST", "/signup/", {username, password}, callback);
}

export function signin(username, password, callback){
    send("POST", "/signin/", {username, password}, callback);
}
    
