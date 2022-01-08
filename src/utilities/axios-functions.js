import axios from 'axios'

//const url = 'http://94.156.189.137:8000/api/'
const url = 'http://localhost:47815/api/API'

export function getData(addr){
    const response = axios.get(`${url}${addr}`)
    return response
}

export function getDataId(addr,id){
    const response = axios.get(`${url}${addr}/${id}`)
    return response
}

export function postData(addr,obj){
    const response = axios.post(`${url}${addr}`,obj)
    return response
}

export function deleteDataId(addr,id){
    const response = axios.delete(`${url}${addr}/${id}`)
    return response
}

export function putData(addr,id,obj){
    const response = axios.put(`${url}${addr}/${id}`,obj)
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