import {Component, createRef} from 'react'
import Styles from './index.module.css'

import Stump from '../Stump';
import NavbarWs from '../NavbarWS';
import Dashboard from '../Dashboard'
import DashHome from '../DashHome'
import UpFor from '../UpFor'


import Cookies from 'js-cookie'
import {jwtDecode}  from 'jwt-decode'

import UserContext from '../UserContext'

class WorkSpace  extends Component {
    

    dashObj = {
        home:'home',
        upFor:'upFor'
    }

    state = {userVerified:false ,showDashBoard:false,dashValue:this.dashObj.home,user:null}
    dash = createRef()
    componentDidMount(){
        const jwtToken = Cookies.get('jwtToken');
        const decodedJwt = jwtDecode(jwtToken);
        const {isVerified,id,email,name} = decodedJwt
       
        this.setState({user:{userId:id,email:email,name:name}})
        if (isVerified){
           this.setState({userVerified:true})
        }

        if(window.innerWidth>1200){
            if(this.dash.current){
                this.dash.current.classList.remove(Styles.closeDash)
            }
        }
        else{
             if(this.dash.current){
                this.dash.current.classList.add(Styles.closeDash)
            }
        }

        window.addEventListener('resize', ()=>{
          if(window.innerWidth<=1200){
            if(this.dash.current){
                this.dash.current.classList.add(Styles.closeDash)
            }
          }
          else{
            if(this.dash.current){
                this.dash.current.classList.remove(Styles.closeDash)
            }
          } 
        })
    }
  

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }


    renderWithUpdate = flag => {
        this.setState({userVerified:flag})
    }


    toggleDashBoard = () =>{
         this.setState(prev=>{
            return {showDashBoard:!prev}
         })

         if (this.dash.current){
            this.dash.current.classList.toggle(Styles.closeDash)
         }
    }

    recieveDashValue = clickedButton => {
      this.setState({dashValue:clickedButton})
    }

    renderSwitcher = () => {
        const {dashValue} = this.state
        switch(dashValue) {
            case this.dashObj.home:
                return <DashHome recieveDashValue = {this.recieveDashValue}/>;
            case this.dashObj.upFor:
                return <UpFor/>
            default:
                return null
        }
    }


   
    render(){
        const {userVerified,user} = this.state

        const {name,userId,email} = user || {};
        return (
            <UserContext.Provider value={{userId,email,name}}>
                <div className={Styles.workSpaceBg}>
                     { !userVerified &&   <div className={Styles.stump}>
                        <Stump  renderWithUpdate= {this.renderWithUpdate} />
                     </div>}
               
                    <NavbarWs toggleDashBoard  = {this.toggleDashBoard}/>
                    <div  className={Styles.workspace}>
                      <div ref= {this.dash} className={Styles.dashBoard}>
                            <Dashboard recieveDashValue={this.recieveDashValue}/>
                       </div>
                     
                      <div className={Styles.workSpaceContent}>
                          {this.renderSwitcher()}
                      </div>
                     </div>
                </div>
            </UserContext.Provider>
           
        ) 
    }
}

export default WorkSpace