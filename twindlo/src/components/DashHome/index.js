import Styles from './index.module.css'
import UserContext from '../UserContext'

const DashHome = () => {
    return (
        <UserContext.Consumer>
            {value=>{
                const {userId,name,email} = value;
                return(
                  <div className={Styles.dashHomeBg}>
                    <div className={Styles.userWelcomeCard}>
                       <div className={Styles.welcomeHeader}>
                          <h1 className={Styles.userName}>Hello ! , {name}</h1>
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