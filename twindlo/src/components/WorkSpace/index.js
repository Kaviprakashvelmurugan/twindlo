import {Component} from 'react'
import Styles from './index.module.css'

import Stump from '../Stump';
import Cookies from 'js-cookie'
import {jwtDecode}  from 'jwt-decode'



class WorkSpace  extends Component {
    jwtToken = Cookies.get('jwtToken');
    decodedJwt = jwtDecode(this.jwtToken);
    
    
    state = {userVerified:false,showStump:true}
    
    componentDidMount(){
        const {isVerfied} = this.decodedJwt
        if (isVerfied){
           this.setState({userVerified:true})
        }
    }
  
    render(){
        const {userVerified} = this.state
        return (
            <div className={Styles.workSpaceBg}>
                 {!userVerified ? <Stump/> : null}
            </div>
        ) 
    }
}

export default WorkSpace