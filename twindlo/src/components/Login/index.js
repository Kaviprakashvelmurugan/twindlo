import {Component,createRef} from 'react'
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import Styles from './index.module.css'

import { FaHome } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { MdEnhancedEncryption } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";
import {RiInstagramFill } from "react-icons/ri"; 
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";


class Login extends Component{

    loginNavTextsList = [
            'Organize your day, crush your goals, and watch your progress grow with every task you complete.',
            'Stay consistent, track streaks, and build habits that make productivity effortless and rewarding.',
            'Collaborate with friends and teammates to tackle tasks together and achieve more, faster.',
            'Level up with AI-powered insights and challenges from Teek, turning tasks into meaningful learning.',
            'Join a thriving community, compete, stay motivated, and celebrate progress every step of the way.'
    ]

    navTextsForMobile= ['Organize','Crush' ,'Execute', 'Elevate','Connect']
    navTextsForTab = ['Organize your day, crush goals.','Track streaks & build habits.','Complete tasks with friends.','Level up with AI challenges.','Join, compete, stay motivated.']
    navTextsForLap = ['Organize your tasks and accomplish daily goals efficiently.','Stay consistent, track your progress, and maintain productive streaks.','Collaborate with friends to complete tasks and achieve more.','Level up with AI insights and meaningful task challenges.','Join a thriving community and celebrate every achievement together.']
    navTextsForDesktop = ['Organize your day, crush your goals, and watch your progress grow with every task you complete.',
            'Stay consistent, track streaks, and build habits that make productivity effortless and rewarding.',
            'Collaborate with friends and teammates to tackle tasks together and achieve more, faster.',
            'Level up with AI-powered insights and challenges from Teek, turning tasks into meaningful learning.',
            'Join a thriving community, compete, stay motivated, and celebrate progress every step of the way.']
   
  
   
    state = { navTextIndex: 0, navTextPosition: 0, deleting: false, pause: false ,formType:'signin' , email:'',password:'' , loginStatusMessage:'Enter Your Credentials !' , canRedirect:false} 





    
   componentDidMount() {
    this.navTextUpdation = setInterval(() => {
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

    console.log('Login component mounted');

    console.log('checking node modules commiting or not')

   }





     componentWillUnmount() {
        clearInterval(this.navTextUpdation)

    }

    usernameLabelRef = createRef()
    passwordLabelRef = createRef()
    navTextRef = createRef()
    loginFormRef = createRef()

    clickingUserName = ()=> {
        if (this.usernameLabelRef.current){
            this.usernameLabelRef.current.classList.add(Styles.labelUp)
        }
    }

    clickingPassword = ()=> {
        if(this.passwordLabelRef.current){
            this.passwordLabelRef.current.classList.add(Styles.labelUp)
        }
    }
    
    
    authenticate = async (event) =>{

      event.preventDefault()
    
      const {email,password,formType}= this.state

      let   testApi = 'http://localhost:3000/signup'

      let  options = {
        method:'POST',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({
          email,password,isVerified:false
        })
      }

      if (formType==='signin'){
         testApi = 'http://localhost:3000/signin'

      }
   
      

      try {
         const response = await fetch(testApi,options)
         const data = await response.json()
         console.log(data)
         this.setState({loginStatusMessage:data.message})
        
         if (data.success){
            console.log('yes')
            Cookies.set('jwtToken',data.jwtToken,{expires:30});
            this.setState({canRedirect:true})
         }
      }
      
      catch (error) {
        console.log(error)
      }
      
    }




    changeForm = (event)=>{
        
        const {formType} = this.state
        const loginElement = this.loginFormRef.current

        loginElement.classList.remove(Styles.formSigninUp);
        loginElement.classList.remove(Styles.formLoginUp);
        
        void loginElement.offsetWidth;
        if (formType === 'signin') {
            loginElement.classList.add(Styles.formSigninUp);
        } 
        else {    
           loginElement.classList.add(Styles.formLoginUp);
        }
        
        this.usernameLabelRef.current.classList.remove(Styles.labelUp)
        this.passwordLabelRef.current.classList.remove(Styles.labelUp)
        
        event.preventDefault();
          this.setState((prevState)=>{
            if (prevState.formType==='signin'){
            
                return {formType:'signup',email:'',password:''}
            }
            return {formType:'signin',email:'',password:''}
        })

    }
    
    

    updateEmail = event =>{
       this.setState({email:event.target.value})
    }
    
    updatePassword = event => {
        this.setState({password:event.target.value})
    }


    renderLoginForm(){
        const {formType,email,password} = this.state
        return (
                    <div ref = {this.loginFormRef}  className={`${Styles.login} ${formType === 'signin' ? Styles.formSigninUp : Styles.formLoginUp}`}>
                            <div className={Styles.formHeader}>
                                <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1756044140/twindlo_black_logo_jvilpn.png' alt='twindlo-black-logo' />
                                <div className={Styles.signinCta}>
                                    <h1>Welcome back to twindlo</h1>
                                    <p> {formType==='signin'? 'New to twindlo ?':'Already have an account?'} <button  onClick={this.changeForm}> {formType==='signin' ? 'Sign up to continue' :'click here to Signin'} </button></p>
                                </div>
                                
                            </div>
                            <div className={Styles.inputElement}>
                                <label ref = {this.usernameLabelRef} htmlFor='username'>username</label>
                                <input value ={email} onChange={this.updateEmail} onClick={this.clickingUserName} id='username' type='text' />
                            </div>
                            <div className={Styles.inputElement}>
                                <label ref = {this.passwordLabelRef} htmlFor='password'>password</label>
                                 <input value = {password} onChange={this.updatePassword} onClick={this.clickingPassword} id='password' type='password' /> 
                            </div>

                            <div className={Styles.loginCtaBox}>
                                    <button type='submit' className={Styles.loginCta}> {formType==='signin'?'Signin':'Signup'} <FaSignInAlt/> </button>
                            </div>

                            <div className={Styles.continueWithGoogle}>
                                 <div className={Styles.cwgHrBox}>
                                    <hr/>
                                      <p>or</p>
                                    <hr/>
                                 </div>
                                 <div className={Styles.cwgCta}>
                                     <button>
                                        <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1756084203/search_byc0f8.png' alt='continue-with-google'/>
                                        <p>Continue with google</p>
                                     </button>
                                 </div>
                            </div>
                          </div>
        )
    }
    
    render(){

        const {navTextIndex,navTextPosition, loginStatusMessage, canRedirect} = this.state
        if (canRedirect){
            return <Navigate to='/workspace' replace/>
        }
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
                    <div className={Styles.loginStatusBox}>
                        <h1 className={Styles.loginStatusHeading}><span>Heads Up : </span> {loginStatusMessage}</h1>
                    </div>
                </div>
                
                <div className={Styles.loginContentBg}>
                   <div className={Styles.loginContent}>
                       <div className={Styles.loginHero}>
                              <div className={Styles.loginHeroContent}>
                                  <div className={Styles.heroUsersCountBox}>
                                  <div className={Styles.usersCountImgBox}>
                                    <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1756097155/7.2k_users_tnu6ym.png' alt='7.2k users'/>
                                  </div>

                                  <div className={Styles.usersCountTextBox}>
                                      <h1>JOIN WITH 7.2K+ USERS</h1>
                                      <p>Built for your consistency.</p>
                                  </div>
                                  </div> 
                                

                                  <div className={Styles.loginFooterBox}>
                                      <div className={Styles.loginSocialMediaBox}>
                                          <div>
                                            <RiInstagramFill/>
                                          </div> 
                                           <div>
                                             <FaFacebookF/>
                                           </div>
                                           <div>
                                             <FaTwitter/>
                                           </div>
                                           <div>
                                            <FaLinkedinIn/>
                                           </div>
                                      </div>

                                      <div className={Styles.loginFooterTextContent}>
                                          <h1>Twindlo - Your Goal-Getting Sidekick</h1>
                                          <p1>Made with <FaHeart/> </p1>
                                      </div>
                                  </div>
                              </div>
                       </div>

                       <form onSubmit= {this.authenticate} className={Styles.form}>
                          {this.renderLoginForm()}
                       </form>
                   </div>
                </div>
            </div>
        )
    }
}
 
 export default Login