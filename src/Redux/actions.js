// action types

const CLIENT_USERNAME = "CLIENT_USERNAME"
const CLIENT_PROBLEMS = "CLIENT_PROBLEMS"
const ERASE = "ERASE"
const ADMIN = "ADMIN"

// Action Creators

export const addClientUsername = (clientname) => {
    return {
        type : CLIENT_USERNAME,
        payload : clientname,
    }
}

export const addClientProblems = (object) => {
   return {
       type : CLIENT_PROBLEMS,
       payload : object,
   } 
}

export const addErase = (array) => {
    return {
        type : ERASE,
        payload : array,
    } 
}

export const addAdmin = (data) => {
    return {
        type : ADMIN,
        payload : data,
    } 
 }