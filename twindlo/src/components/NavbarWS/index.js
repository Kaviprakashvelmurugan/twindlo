import Styles from './index.module.css'

import {Link} from 'react-router-dom';
import { useEffect,useState,useRef} from 'react';
import Cookies from 'js-cookie';
import { MdNotificationsNone } from "react-icons/md";
import { TbSwords } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


const NavbarWs = ({toggleDashBoard}) => {
    const [profileDetails,setProfileDetails] = useState({})
    const [showDashBoard,setShowDashBoard] = useState(false)

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
     
      const updateMenuIconWhileResize = () =>{
         setShowDashBoard(false)
      }
     useEffect(()=>{
        getProfileDetails()
        window.addEventListener('resize',updateMenuIconWhileResize)
        return ()=>{
         window.removeEventListener('resize' ,updateMenuIconWhileResize)
        }
     },[])
     
     const toggleProfile = () => {
       if (profileCard.current){
         profileCard.current.classList.toggle(`${Styles.showProfileCard}`)
       }
     }

     const toggleMenu = () => {
        setShowDashBoard(prev=>{
         return !prev
        })
        toggleDashBoard()
     }

  
     const {location,profileUrl,userName,} = profileDetails
     const loaded = Object.keys(profileDetails).length>0
     return ( 
       <div className={Styles.navbarWsBg}>
                 
                <img  className={Styles.twindloLogoForNav} src={process.env.REACT_APP_TWINDLO_LOGO} alt = 'twindlo logo'/>
                <button onClick={toggleMenu} className={Styles.menuForMobile}> {showDashBoard?<MdOutlineClose/>:<MdMenu/>} </button>
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