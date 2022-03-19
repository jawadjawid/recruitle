export function send(method, url, data, callback){
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status !== 200) callback(xhr.responseText, null);
        else callback(null, JSON.parse(xhr.responseText));
    };
    xhr.open(method, url, true);
    if (!data) xhr.send();
    else{
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }
}  

export function getUsername(){
    return document.cookie.split(";")[0].replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}

export function getUsertype(){
    return document.cookie.split(";")[1].trim().replace(/(?:(?:^|.*;\s*)userType\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}
