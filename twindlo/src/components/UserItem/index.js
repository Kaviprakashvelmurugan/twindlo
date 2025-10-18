import Styles from './index.module.css'

const UserItem = ({user}) => {
    const {user_id,username,education_level,gender,profile_url}  = user;
    return (
      <li className={Styles.userItem}>
         <div className={Styles.profileBox}>
             <img src={profile_url} alt='user-profile'/>
         </div>
         <div className={Styles.textBox}> 
            <h1>{username}</h1>
            <p>{education_level}</p>
         </div>
         <button>BuddyUp</button>
      </li>
    )
}

export default UserItem