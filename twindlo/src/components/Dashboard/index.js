import Styles from './index.module.css'
import { RiHome3Line } from "react-icons/ri";
import { IoRocketOutline } from "react-icons/io5";
import { TbSwords } from "react-icons/tb";
import { TbHeartHandshake } from "react-icons/tb";
import { GiDiamondTrophy } from "react-icons/gi";
import { LuSquareDashedBottomCode } from "react-icons/lu";

import {useState} from 'react'

const Dashboard = ({recieveDashValue}) => {
    const dashButtons = {
        home:'home',
        upFor:'upFor',
        challenges:'challenges',
        buddies:'buddies',
        teek:'teek',
        leaderboard:'leaderboard',
        playground:'playground'
    }

    const [dashButton,setDashButton] = useState('home')

    const updateDashButton = event => {
        setDashButton(event.target.id) 
        recieveDashValue(event.target.id)
    }
    return(
             <>
                   <button onClick={updateDashButton} id={dashButtons.home} className={`${Styles.dashBoardButton} ${Styles.firstDashButton} ${dashButton===dashButtons.home?Styles.clickedDashButton:''}`}>
                      <RiHome3Line/>    Home
                   </button>  

             
                   <button onClick={updateDashButton} id={dashButtons.upFor} className={`${Styles.dashBoardButton} ${dashButtons.upFor===dashButton?Styles.clickedDashButton:''}`} >
                     <IoRocketOutline/>    Up For
                   </button>

              
                   <button onClick={updateDashButton} id={dashButtons.challenges} className={`${Styles.dashBoardButton} ${dashButtons.challenges===dashButton?Styles.clickedDashButton:''}`}>
                     <TbSwords/>    Challenges
                   </button>




                   <button onClick={updateDashButton} id={dashButtons.buddies} className={`${Styles.dashBoardButton} ${dashButtons.buddies===dashButton?Styles.clickedDashButton:''}`}>
                    <TbHeartHandshake/>    Buddies
                   </button>


                   <button onClick={updateDashButton} id={dashButtons.teek} className={`${Styles.dashBoardButton} ${dashButtons.teek===dashButton?Styles.clickedDashButton:''}`}>
                     <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1758939097/teekLogo_yt13ta.png' alt='teek logo'/> <p>teekAi</p>
                   </button>



                   <button onClick={updateDashButton} id={dashButtons.leaderboard} className={`${Styles.dashBoardButton} ${dashButtons.leaderboard===dashButton?Styles.clickedDashButton:''}`}>
                         <GiDiamondTrophy/>    Leaderboard
                   </button>

                

                   <button onClick={updateDashButton} id={dashButtons.playground} className={`${Styles.dashBoardButton} ${dashButtons.playground===dashButton?Styles.clickedDashButton:''}`}>
                        <LuSquareDashedBottomCode/> Playground
                   </button>

            </>
    )
}

export default Dashboard;