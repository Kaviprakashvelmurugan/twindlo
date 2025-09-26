import Styles from './index.module.css'

import {Link} from 'react-router-dom';
import { useEffect,useState,useRef} from 'react';
import Cookies from 'js-cookie';
import { MdNotificationsNone } from "react-icons/md";
import { TbSwords } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";


const NavbarWs = () => {
    const [profileDetails,setProfileDetails] = useState({})
    const profileCard = useRef()
     const getProfileDetails = async () =>{
        const jwtToken = Cookies.get('jwtToken')

        const getProfileApi = 'http://localhost:3000/user-basic-profile-details'
        const options = {
             method:'GET',
             headers:{
                 Authorization:`Bearer ${jwtToken}`
            }
         }

         try{
           const response = await fetch(getProfileApi,options)
           console.log(response)
           let jsonResponse = await response.json()
           jsonResponse = jsonResponse.profileDetails
           const details = {
              accountType :jsonResponse.account_type,
              degree:jsonResponse.degree,
              department:jsonResponse.department,
              educationLevel:jsonResponse.education_level,
              gender:jsonResponse.gender,
              gitHubLink:jsonResponse.github_link,
              id:jsonResponse.id,
              location:jsonResponse.location,
              profileUrl:jsonResponse.profile_url,
              reasonToJoin:jsonResponse.reason_to_join ,
              userId:jsonResponse.user_id,
              userName:jsonResponse.username,
              uesrOfStudy:jsonResponse.year_of_study,
         }

         console.log(details)
          setProfileDetails(details)
         }
         catch(error){
         console.log(error)
        }
      }

     useEffect(()=>{
        getProfileDetails()
     },[])
     
     const toggleProfile = () => {
       if (profileCard.current){
         profileCard.current.classList.toggle(`${Styles.showProfileCard}`)
       }
     }


     const {accountType,degree,department,educationLevel,gender,gitHubLink,id,location,profileUrl,reasonToJoin,userId,userName,uesrOfStudy} = profileDetails
     const loaded = Object.keys(profileDetails).length>0
     return (
       <div className={Styles.navbarWsBg}>
                 
                <img  className={Styles.twindloLogoForNav} src={process.env.REACT_APP_TWINDLO_LOGO} alt = 'twindlo logo'/>
                <button className={Styles.menuForMobile}> <HiMenu/> </button>
                <div className={Styles.navEndBox}>
                    <Link to = '#' className={Styles.navLink} tooltip='Notifications'>
                       <MdNotificationsNone />
                    </Link>
                    <Link to='#' className={Styles.navLink} tooltip='Challenges'>
                       <TbSwords/>
                    </Link>
                    <Link  onClick={toggleProfile} to='#' className={Styles.navLink} tooltip='Profile'>
                       <FaRegUserCircle/>
                       <div ref={profileCard} className={Styles.profileCard}>
                            <div className={Styles.profilePicCard}>
                                 <img className={Styles.profilePic} src={profileUrl} alt='profile pic' />
                                 <h1>{userName}</h1>
                                 <p>{location}</p>
                            </div>
                            <h1 className={Styles.tagLine}>Dreams in Action !</h1>
                            <hr/>
                            <div className={Styles.iconBoxProfile}>
                              <FaEdit/>
                              <p>Edit Profile</p>
                            </div>
                           <div className={Styles.streakDisplay}>
                                <h1> <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752631115/fire_dlgp2i.png' alt='streak icon'/> Streak : 76</h1>
                                <p>Every Day Counts.</p>
                           </div>
                             <button className={Styles.logoutCta}>
                                Logout
                            </button>
                       </div>
                    </Link>
                </div>
       </div>
    ) 
}

export default NavbarWs