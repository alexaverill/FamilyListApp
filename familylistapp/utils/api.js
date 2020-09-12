async function GetRequest(url){
    const response = await fetch(url,{
        method:'GET'
    });
    if(response === null || response === undefined){
        return {status:"failed"};
    }
    if(response.status == 200){
    return response.json();
    }
    return {status:"failed"};
}
async function PostRequest(url,data){
    const response = await fetch(url,{
        method:'POST',
        body:JSON.stringify(data)
    });
    if(response === null || response === undefined){
        return {status:"failed"};
    }
    if(response.status == 200){
        return response.json();
        }
        return {status:"failed"};
}
module.exports = {
    GetRequest,
    PostRequest
}