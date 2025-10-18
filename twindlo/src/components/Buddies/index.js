import Styles from './index.module.css'

import { useEffect,useState } from 'react'


import { FaUsers } from "react-icons/fa";

const Buddies = () => {
    const [usersList,setusersList] = useState([])
    const getUsers = async () => {


        const fetchUrl = 'http://localhost:3000/get-all-users'
        const options = {
            method:'GET',
        }

        try {
            const response = await fetch(fetchUrl,options)
            const jsonResponse = await response.json()
            console.log(response)
            if(response.ok){
             setusersList(jsonResponse.usersList)
            }
            console.log(jsonResponse)
        }
        catch (error) {
             console.log(error)
        }
    }
    useEffect(()=>{
        getUsers()
    },[])
    return (
        <div className={Styles.buddiesBg}>
            <div className={Styles.buddiesContent}>

            </div>

            <div className={Styles.buddiesScrollBox}>
               <div className={Styles.scrollContent}>
                    <div className={Styles.usersHeader}>
                        <div className={Styles.title}>
                              <h1>Discover Buddies</h1>
                              <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1760704317/research_sf5lop.png' alt='discover buddies'/>
                        </div>
                        <p className={Styles.headerPara}>Find driven learners like you.</p>
                        <hr className={Styles.usersListHrLine}/>
                    </div>
 
               </div>
            </div>
        </div>
    )
}

export default Buddies