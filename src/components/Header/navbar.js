import {useState,useEffect} from 'react'
import './navbar.css'
import {Menu,X} from 'lucide-react'
const Header = () => {

       const [showMenu,toggleMenu]= useState(false)

       useEffect (()=>{
        const handleWindowResize = () => {
            if (window.innerWidth>810){
                toggleMenu(false)
            }
        }
        
          if (window.innerWidth > 810) {
            toggleMenu(false);
        }
        window.addEventListener('resize',handleWindowResize)
        
        return ()=>{
            window.removeEventListener('resize',handleWindowResize)
        }
       },[])
     
       
       const handleMenuIcons = () => {
        toggleMenu(!showMenu)
       }
      return <div className='nav-bar'>
            <div className='nav-logo-box'>
                 <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752215015/twindlo_logo_all_device_p5x0pi.png' alt='twindlo-icon' />
                 <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752218990/twindlo_text_lg-removebg-preview_qnao2t.png' alt='twindlo-txt' />
            </div>

            <div className='nav-headings-box'>
                <p>Home</p>
                <p>Explore</p>
                <p>Room</p>
                <p>Challenges</p>
                <p>Leaderboard</p>
            </div>

            <div className='log-in-out-box'>
                <button>Login</button>
                <button>Logout</button>
            </div>

            <div className='nav-mobile-button' onClick={handleMenuIcons}>
               {showMenu? <X/> :<Menu/>}
            </div>
             
      
             <div className={`mobile-nav-menu ${showMenu ? 'show-menu-bar':''}`}>
                  <p>Home</p>
                  <p>Explore</p>
                  <p>Room</p>
                  <p>Challenges</p>
                  <p>Leaderboard</p>
                  <div className='nav-mobile-logout-login-buttons'> 
                       <button>Sign in</button>
                       <button>Login</button>
                  </div>
            </div>

       </div>
}
export default Header