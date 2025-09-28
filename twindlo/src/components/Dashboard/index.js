import Styles from './index.module.css'
import { RiHome3Line } from "react-icons/ri";
import { IoRocketOutline } from "react-icons/io5";
import { TbSwords } from "react-icons/tb";
import { TbHeartHandshake } from "react-icons/tb";
import { GiDiamondTrophy } from "react-icons/gi";
import { LuSquareDashedBottomCode } from "react-icons/lu";


const Dashboard = () => {
    return(
             <>
                   <button className={`${Styles.dashBoardButton} ${Styles.firstDashButton}`}>
                      <RiHome3Line/>    Home
                   </button>  

             
                   <button className={Styles.dashBoardButton} >
                     <IoRocketOutline/>    Up For
                   </button>

              
                   <button className={Styles.dashBoardButton}>
                     <TbSwords/>    Challenges
                   </button>




                   <button className={Styles.dashBoardButton}>
                    <TbHeartHandshake/>    Buddies
                   </button>


                   <button className={Styles.dashBoardButton}>
                     <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1758939097/teekLogo_yt13ta.png' alt='teek logo'/> <p>teekAi</p>
                   </button>



                   <button className={Styles.dashBoardButton}>
                         <GiDiamondTrophy/>    Leaderboard
                   </button>

                

                   <button className={Styles.dashBoardButton}>
                        <LuSquareDashedBottomCode/> Playground
                   </button>

            </>
    )
}

export default Dashboard;