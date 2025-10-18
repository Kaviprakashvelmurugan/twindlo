import Styles from './index.module.css'
import UserContext from '../UserContext'
import { IoIosRocket } from "react-icons/io";
import ActionButton from '../ActionButton';

import {useState} from 'react'

const DashHome = () => {
    const welcomeCardButtons = [
        {
           id:'overview',
           text:'Overview',
        },
        {
           id:'activity',
           text:'Activities',
        },
        {
           id:'request',
           text:'Requests',
        }
    ]
     const [actionButton,setActionButton] = useState(welcomeCardButtons[0].id)
    const handleActionButtonClick = (clickedButton) => {
        setActionButton(clickedButton)
    }

    return (
        <UserContext.Consumer>
            {value=>{
                const {userId,name,email} = value;
                console.log(name)
                return(
                  <div className={Styles.dashHomeBg}>
                    <div className={Styles.userWelcomeCard}>
                       <div className={Styles.welcomeHeader}>
                          <h1 className={Styles.userName}>Hello ! , {name}</h1>
                          <p className={Styles.welcomeTag}>welcome back to twindlo <IoIosRocket/> </p>
                          <div className={Styles.welcomeCardButtons}>
                             {
                                welcomeCardButtons.map(each=>{
                                    return <ActionButton key ={each.id}  action= {each} handleActionButtonClick = {handleActionButtonClick} activeButton = {actionButton} />
                                })
                             }
                          </div>
                       </div>
                       <div className={Styles.welcomeDetails}>
                       </div>
                    </div>
                 </div>
                )
            }}
        </UserContext.Consumer>
        
    )
}

export default DashHome