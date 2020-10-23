export function startSession(userName,userID,authKey){
    localStorage.setItem('username',userName);
    localStorage.setItem('id',userID);
    localStorage.setItem('key',authKey);
}
export function getUsername(){
    if("username" in localStorage){
        return localStorage.getItem('username');
    }else{
        return null;
    }
}
export function getID(){
    return Number(localStorage.getItem('id'));
}
export function getKey(){
    return localStorage.getItem('key');
}
export function getUserData(){
    let data = {
        id:localStorage.getItem('id'),
        username:localStorage.getItem('username'),
        key:localStorage.getItem('key')
    }
    return data;
}
export function endSession(){
    localStorage.clear();
}