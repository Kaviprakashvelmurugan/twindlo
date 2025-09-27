import Styles from './index.module.css'
import {Link} from 'react-router-dom'

import { RiHome3Line } from "react-icons/ri";
import { IoRocketOutline } from "react-icons/io5";
import { TbSwords } from "react-icons/tb";
import { TbHeartHandshake } from "react-icons/tb";
import { GiDiamondTrophy } from "react-icons/gi";
import { LuSquareDashedBottomCode } from "react-icons/lu";


const Dashboard = () => {
    return(
             <>
                <Link className={`${Styles.dashLink} ${Styles.firstDashLink}`} to='#'>
                   <button className={`${Styles.dashBoardButton} ${Styles.firstDashButton}`}>
                      <RiHome3Line/>    Home
                   </button>
                </Link>
             

                <Link className={Styles.dashLink} to='#'>
                   <button className={`${Styles.dashBoardButton} ${Styles.firstDashButton}`}>
                     <IoRocketOutline/>    Up For
                   </button>
                </Link>

                <Link className={Styles.dashLink} to='#'>
                   <button className={`${Styles.dashBoardButton} ${Styles.firstDashButton}`}>
                     <TbSwords/>    Challenges
                   </button>
                </Link>


                <Link className={Styles.dashLink} to='#'>
                   <button className={`${Styles.dashBoardButton} ${Styles.firstDashButton}`}>
                    <TbHeartHandshake/>    Buddies
                   </button>
                </Link>

                <Link className={Styles.dashLink} to='#'>
                   <button className={`${Styles.dashBoardButton} ${Styles.firstDashButton}`}>
                     <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1758939097/teekLogo_yt13ta.png' alt='teek logo'/> <p>teekAi</p>
                   </button>
                </Link>

                <Link className={Styles.dashLink} to='#'>
                   <button className={`${Styles.dashBoardButton} ${Styles.firstDashButton}`}>
                         <GiDiamondTrophy/>    Leaderboard
                   </button>
                </Link>
                
                <Link className={Styles.dashLink} to='#'>
                   <button className={`${Styles.dashBoardButton} ${Styles.firstDashButton}`}>
                        <LuSquareDashedBottomCode/> Playground
                   </button>
                </Link>
            </>
    )
}

export default Dashboard;