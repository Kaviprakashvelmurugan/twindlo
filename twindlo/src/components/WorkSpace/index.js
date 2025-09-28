import {Component, createRef} from 'react'
import Styles from './index.module.css'

import Stump from '../Stump';
import NavbarWs from '../NavbarWS';
import Dashboard from '../Dashboard'
import DashHome from '../DashHome'

import Cookies from 'js-cookie'
import {jwtDecode}  from 'jwt-decode'



class WorkSpace  extends Component {
    

    dashObj = {
        home:'home'
    }

    state = {userVerified:false ,showDashBoard:false,dashValue:this.dashObj.home}
    dash = createRef()
    componentDidMount(){
        const jwtToken = Cookies.get('jwtToken');
        const decodedJwt = jwtDecode(jwtToken);
        const {isVerified} = decodedJwt
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

        return ()=>{
            window.removeEventListener('resize')
        }
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
            default:
                return null
        }
    }


   
    render(){
        const {userVerified} = this.state
        return (
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
        ) 
    }
}

export default WorkSpace