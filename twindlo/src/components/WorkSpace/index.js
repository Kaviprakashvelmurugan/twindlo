import {Component, createRef} from 'react'
import Styles from './index.module.css'

import Stump from '../Stump';
import NavbarWs from '../NavbarWS';
import Dashboard from '../Dashboard'

import Cookies from 'js-cookie'
import {jwtDecode}  from 'jwt-decode'



class WorkSpace  extends Component {
    
    state = {userVerified:false ,showDashBoard:false}
    dash = createRef()
    componentDidMount(){
        const jwtToken = Cookies.get('jwtToken');
        const decodedJwt = jwtDecode(jwtToken);
        const {isVerified} = decodedJwt
        if (isVerified){
           this.setState({userVerified:true})
        }
        
        if(this.dash.current){
          this.dash.current.classList.add(Styles.closeDash)
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
                            <Dashboard/>
                     </div>
                   
                 </div>
            </div>
        ) 
    }
}

export default WorkSpace