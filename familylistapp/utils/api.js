async function GetRequest(url){
    const response = await fetch(url,{
        method:'GET'
    });
    console.log("API response: ");
    console.log(response);
    if(response === null || response === undefined){
        return {status:false};
    }
    if(response.status == 200){
    return response.json();
    }
    return {status:false};
}
async function PostRequest(url,data){
    const response = await fetch(url,{
        method:'POST',
        body:JSON.stringify(data)
    });
    if(response === null || response === undefined){
        return {status:false};
    }
    if(response.status == 200){
        return response.json();
        }
        return {status:false};
}
module.exports = {
    GetRequest,
    PostRequest
}