import { useState, useEffect } from "react";
import axios from 'axios'

function Auth() {
    /*     const [userData, setUserData] = useState({
            isLoggedIn: false
        })
    
        useEffect(() => {
    
            const authenticateUser = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/api/auth', { withCredentials: true })
    
                    if (response.status === 200) {
                        setUserData(prev => response.data)
                    }
    
                    else {
                        setUserData(null);
                    }
    
    
                }
                catch (error) {
                    setUserData(null)
                }
            }
    
            authenticateUser();
    
        }, [])
    
        return [userData, setUserData] 

    // State variable to store login state

    const [userData, setUserData] = useState({
        isSignedIn: false
    })
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'))
            console.log(user)
            setUserData(prev => ({ ...user }))
        }

        */
}
