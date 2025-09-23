import {Component} from 'react'
import Styles from './index.module.css'

import Stump from '../Stump';
import NavbarWs from '../NavbarWS';

import Cookies from 'js-cookie'
import {jwtDecode}  from 'jwt-decode'



class WorkSpace  extends Component {
    
    state = {userVerified:false }
    
    componentDidMount(){
        console.log('came')
        const jwtToken = Cookies.get('jwtToken');
        const decodedJwt = jwtDecode(jwtToken);
        const {isVerified} = decodedJwt
        if (isVerified){
           this.setState({userVerified:true})
        }
    }
  
    renderWithUpdate = flag => {
        this.setState({userVerified:flag})
    }

    render(){
        const {userVerified} = this.state
        return (
            <div className={Styles.workSpaceBg}>
                 <div className={Styles.stump}>
                        {!userVerified && <Stump className={Styles.stump} renderWithUpdate= {this.renderWithUpdate} />}
                 </div>
                 <NavbarWs/>
            </div>
        ) 
    }
}

export default WorkSpace