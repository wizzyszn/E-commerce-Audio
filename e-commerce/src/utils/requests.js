export const baseUrl = "http://localhost:5000/api";
export const postRequest = async (url,body)=>{
    const response = await fetch(url,{
        method : 'POST',
        headers :{
            "Content-Type" : "application/json",
        },
        credentials : 'include', //include cookies to requests
         body
        
    })
const data = await response.json();
//perform Check for errors
if(!response.ok){
    let message;
    if(data?.message){
        message = data.message
    }else{
        message = data;
    }
    return {
        error : true,
        message
    }
}
return data
}
export const getRequest = async(url) =>{
    const response = await fetch(url, {
        credentials : 'include',
        headers: {
            "Content-Type": "application/json",
          }
      
    });
    const data = await response.json();
    if(!response.ok){
        let message = "An error occured..."
        if(data?.message){
            message = data.message;
        }
        return {error : true , message}

    }
return data    
    
};


