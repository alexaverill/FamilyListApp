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
async function AuthGetRequest(url,token){
    const response = await fetch(url,{
        method:'GET',
        headers:{
            'Authorization':token
        }
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
async function AuthPostRequest(url,data,token){
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Authorization':token
        },
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
async function AuthDeleteRequest(url,data,token){
    const response = await fetch(url,{
        method:'DELETE',
        headers:{
            'Authorization':token
        },
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
    PostRequest,
    AuthGetRequest,
    AuthPostRequest,
    AuthDeleteRequest
}