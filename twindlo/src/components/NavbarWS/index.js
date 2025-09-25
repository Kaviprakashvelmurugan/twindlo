import Styles from './index.module.css'

import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { MdNotificationsNone } from "react-icons/md";
import { TbSwords } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";

const NavbarWs = () => {
    
  

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
                    <Link to='#' className={Styles.navLink} tooltip='Profile'>
                       <FaRegUserCircle/>
                       <div className={Styles.profileCard}>
                           
                       </div>
                    </Link>
                </div>
       </div>
    ) 
}
export default NavbarWs 