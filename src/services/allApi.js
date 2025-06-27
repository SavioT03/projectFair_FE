import CommonAPI from "./commonApi";


export const registerUser=async(reqBody)=>{

    return await CommonAPI('post','/register',reqBody)

}

export const loginUser =async(reqBody)=>{
    return await CommonAPI('post','/login',reqBody)
}

export const createProject= async(reqHeader,reqBody)=>{
    return await CommonAPI('post','/addProject',reqBody,reqHeader)
}

export const getLimitedProjects= async()=>{
    return await CommonAPI('get','/getLimitedProjects'," ")
}

export const getAllProjects= async(reqHeader,searchKey)=>{
    return await CommonAPI('get',`/getAllProjects?search=${searchKey}`," ",reqHeader)
}

export const getUserProjects= async(reqHeader)=>{
    return await CommonAPI('get','/getUserProjects'," ",reqHeader)
}

export const editProject=async(reqHeader,reqBody,id)=>{
    return await CommonAPI('put',`/editProject/${id}`,reqBody,reqHeader)
}

export const deleteProject=async(id,reqHeader)=>{
    return await CommonAPI('delete',`/deleteProject/${id}`,{},reqHeader)
}

export const editProfile=async(reqBody,reqHeader)=>{
    return await CommonAPI('patch','/editProfile',reqBody,reqHeader)
}