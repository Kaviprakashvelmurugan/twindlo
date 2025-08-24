import {Component,createRef} from 'react'
import Styles from './index.module.css'

import { FaHome } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { MdEnhancedEncryption } from "react-icons/md";

class Login extends Component{

    loginNavTextsList = [
            'Organize your day, crush your goals, and watch your progress grow with every task you complete.',
            'Stay consistent, track streaks, and build habits that make productivity effortless and rewarding.',
            'Collaborate with friends and teammates to tackle tasks together and achieve more, faster.',
            'Level up with AI-powered insights and challenges from Teek, turning tasks into meaningful learning.',
            'Join a thriving community, compete, stay motivated, and celebrate progress every step of the way.'
    ]

    navTextsForMobile= ['Arjun','Crush' ,'Execute', 'Elevate','Connect']
    navTextsForTab = ['Organize your day, crush goals.','Track streaks & build habits.','Complete tasks with friends.','Level up with AI challenges.','Join, compete, stay motivated.']
    navTextsForLap = ['Organize your tasks and accomplish daily goals efficiently.','Stay consistent, track your progress, and maintain productive streaks.','Collaborate with friends to complete tasks and achieve more.','Level up with AI insights and meaningful task challenges.','Join a thriving community and celebrate every achievement together.']
    navTextsForDesktop = ['Organize your day, crush your goals, and watch your progress grow with every task you complete.',
            'Stay consistent, track streaks, and build habits that make productivity effortless and rewarding.',
            'Collaborate with friends and teammates to tackle tasks together and achieve more, faster.',
            'Level up with AI-powered insights and challenges from Teek, turning tasks into meaningful learning.',
            'Join a thriving community, compete, stay motivated, and celebrate progress every step of the way.']
  
   
            state = { navTextIndex: 0, navTextPosition: 0, deleting: false, pause: false }

   componentDidMount() {
    const navTextUpdation = setInterval(() => {
        this.setState(prevState => {
            if (prevState.pause) {
                return { pause: false, deleting: true }
            }
            if (!prevState.deleting) {
                if (prevState.navTextPosition === this.loginNavTextsList[prevState.navTextIndex].length) {
                     setTimeout(() => {
                      this.setState({ pause: true })
                     }, 1000) 
                      return {} 
                } 
                return { navTextPosition: prevState.navTextPosition + 1 }
            } else {
              if (prevState.navTextPosition === 0) {
                    const nextIndex = (prevState.navTextIndex + 1) % this.loginNavTextsList.length
                    return { navTextIndex: nextIndex, deleting: false }
                }
                return { navTextPosition: prevState.navTextPosition - 1 }
            }

        })
    }, 100)

   
    if (window.innerWidth<=468) {
        this.loginNavTextsList= this.navTextsForMobile
    }
    else if (window.innerWidth<=768){
       this.loginNavTextsList= this.navTextsForTab
    }
    else if (window.innerWidth<=1200){
        this.loginNavTextsList = this.navTextsForLap
    }
    else{
        this.loginNavTextsList=this.navTextsForDesktop
    }
 }

    
    render(){

        const {navTextIndex,navTextPosition} = this.state
        return (
            <div className={Styles.loginBg}>
                <div className={Styles.loginNavBg}>
                    <ul className={Styles.loginNav}>
                        <li className={Styles.loginNavChild}>
                            <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752215015/twindlo_logo_all_device_p5x0pi.png' alt='twindlo-log0-login-nav'/>
                        </li>
                        <li className={Styles.loginNavChild}>
                            <h1 className={Styles.textBox} ref={this.navTextRef}>{this.loginNavTextsList[navTextIndex].slice(0,navTextPosition)}</h1>
                        </li>
                        <li className={Styles.loginNavChild}>
                            <div className={Styles.loginNavIcons}>
                               <FaHome/>
                            </div>
                            <div className={Styles.loginNavIcons}>
                                <IoIosInformationCircle/>
                            </div>
                            <div className={Styles.loginNavIcons}>
                                <MdEnhancedEncryption/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
 
 export default Login