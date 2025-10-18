import Styles from './index.module.css'

import { useEffect,useState } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import UserItem from '../UserItem'


const Buddies = () => {

    const usersListStatusObj =  {
        success:'sucess',
        failed:'failed',
        loading:'loading'
    }
    const [usersList,setusersList] = useState([])
    const [usersListStatus,setUsersListStatus] = useState(usersListStatusObj.loading)

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
             console.log(jsonResponse.usersList)
             setUsersListStatus(usersListStatusObj.success)
            }

            console.log(jsonResponse)
        }
        catch (error) {
             console.log(error)
             setUsersListStatus(usersListStatusObj.loading)
        }
    }
    useEffect(()=>{
        getUsers()
    },[])


    const renderUsersSkeleton = () => {
          return (
            Array.from({length:6}).map((_,index)=>{
                return <div className={Styles.usersSkeleton}>
                           <div className={Styles.skeletonImg}> 
                           </div>
                           <div className={Styles.skeletonTextContent}>
                                <div className={Styles.skeletonUserHeading}></div>
                                <div className={Styles.skeletonUserPara}></div>
                           </div>
                       </div>
            })
          )
    }
    

    const renderUsersList = () => {
        const jwtToken = Cookies.get('jwtToken')
        const decodedJwt= jwtDecode(jwtToken)
        const you = decodedJwt.userId
        return usersList.map(eachUser=>{
            if (eachUser.user_id !==you){
               return <UserItem key={eachUser.id} user={eachUser}/>
            }
           
        })
    }


    const renderUsersFailureView = () => {

    }


    const usersListSwitchers = () => {

        switch (usersListStatus) {
            case usersListStatusObj.loading:
                return renderUsersSkeleton()
            case usersListStatusObj.success:
                return renderUsersList()
            default:
                return renderUsersFailureView()
        }
    }

    return (
        <div className={Styles.buddiesBg}>
            <div className={Styles.buddiesContent}>

            </div>

            <div className={Styles.buddiesScrollBox}>
               <ul className={Styles.scrollContent}>
                    <div className={Styles.usersHeader}>
                        <div className={Styles.title}>
                              <h1>Discover Buddies</h1>
                              <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1760704317/research_sf5lop.png' alt='discover buddies'/>
                        </div>
                        <p className={Styles.headerPara}>Find driven learners like you.</p>
                        <hr className={Styles.usersListHrLine}/>
                    </div>
                    {usersListSwitchers()}
               </ul>
            </div>
        </div>
    )
}

export default Buddies