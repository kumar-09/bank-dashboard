import {React, useState} from 'react'
const Service=()=>{
    const baseURL = 'http://127.0.0.1:8000';
    const [loggedIn,setloggedIn] = useState(false)
    const [User,setUser] = useState({})

    const updateUser = (user)=>{
        setUser(user)
    }
    const updateloggedIn=(flag)=>{
        setloggedIn(flag)
    }

    return {
        baseURL,User,updateUser,updateloggedIn
    };
}
export default Service