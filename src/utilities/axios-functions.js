import axios from 'axios'

//const url = 'http://94.156.189.137:8000/api/'
const url = 'http://localhost:22658/api/API'

export async function getData(addr){
    const response = await axios.get(`${url}${addr}`)
    return response
}

export async function getDataId(addr,id){
    const response = await axios.get(`${url}${addr}/${id}`)
    return response
}

export async function postData(addr,obj){
    const response = await axios.post(`${url}${addr}`,obj)
    return response
}

export async function deleteDataId(addr,id){
    const response = await axios.delete(`${url}${addr}/${id}`)
    return response
}

export async function putData(addr,id,obj){
    const response = await axios.put(`${url}${addr}/${id}`,obj)
    return response
}

export async function multipleGetDataId(addr,ids){
    try{
        let allLoc=ids.map(id => axios(`${url}${addr}/${id}`))
        let rez=await Promise.all(allLoc)
        return rez
    } catch(error){
        console.log(error)
        return null
    }

}