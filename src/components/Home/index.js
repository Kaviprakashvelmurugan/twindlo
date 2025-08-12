import {Component} from 'react'
import UserFeedback  from '../UserFeedback'
import KeyFeatures from '../KeyFeatures'
import FooterTwindlo from '../FooterTwindlo'
import './index.css'

class Home extends Component {

   liveReactLearners = Math.floor(Math.random()*(72-20+1))+20 
   liveNeetLearners = Math.floor(Math.random()*(46-10+1))+10
 
    state = {stickySubPara :`Twindlo brings people together with shared goals and passion.
Find like-minded learners, creators, and problem-solvers instantly.
No more searching endlessly , just genuine connections.
Start your journey with the right people, right here.`}


    stickySubParaObj= {
        'para1':`Twindlo brings people together with shared goals and passion.
Find like-minded learners, creators, and problem-solvers instantly.
No more searching endlessly , just genuine connections.
Start your journey with the right people, right here.`,
        'para2':`Team up, share ideas, and build something bigger.
With Twindlo, you don’t just work,you grow together.
Projects thrive when great minds unite.
Real-time tools and communication, built for teamwork.`,
        'para3':`Turn efforts into impact through meaningful progress.
Twindlo tracks your goals, celebrates your wins.
From small milestones to big dreams, we’re with you.
Success is better when shared , let’s reach it together.`
    }
 componentDidMount() {
  const contentBoxes = document.querySelectorAll('.sticky-content-box');
  const productiveElements = document.querySelectorAll('.element')
  const observerOptions = {
    threshold: 0.9,
    root: null,
  };

  const elementOnserverOptions = {
   threshold: 0.6,
    root: null,
  }
  const observer = new IntersectionObserver(entries => {
   
    entries.forEach(eachEntry => {
      const contentElementForPara = eachEntry.target.id;
      const index = contentElementForPara.slice(-1);
      const paraELement = document.querySelector(`#stickypara${index}`);
   
      if (eachEntry.isIntersecting) {
        paraELement.classList.add('sticky-black-para');
        const subParaKey = `para${index}`;
        this.setState({ stickySubPara: this.stickySubParaObj[subParaKey] });
      } else {
        paraELement.classList.remove('sticky-black-para');
      }
    });
  }, observerOptions); 

  contentBoxes.forEach(eachContentBox => {
    observer.observe(eachContentBox);
  });

const elementObserver = new IntersectionObserver(entries=>{

   entries.forEach(enteredElement=>{
      if (enteredElement.isIntersecting){
          enteredElement.target.classList.add('visible-element')

      }

      else {
         enteredElement.target.classList.remove('visible-element');
}
   })

},elementOnserverOptions)
  productiveElements.forEach(eachProductiveElement=>{
   elementObserver.observe(eachProductiveElement)
  })

}
  

  render() {
       
       return (
         <>
         <div className='home-hero-bg'>
            <div className='home-hero'>
                <h1>Find Your Perfect Study Partner</h1>
                <p>Connect, collaborate, and achieve your goals together.</p>
                <button>Get Started</button>
            </div>
         </div>

         <div className='home-sticky-container'>
             <div className='sticky-box'>
                  <p className='sticky-para ' id ='stickypara1'>CONNECT</p>
                  <p className='sticky-para ' id ='stickypara2'>COLLABORATE</p>
                  <p className='sticky-para ' id ='stickypara3'>ACHIEVE</p>

                   <p className='sticky-sub-para' id = 'stickysub'>{this.state.stickySubPara}</p>
             </div>
             <div className='sticky-content' >
                 <div className='sticky-content-box connect-box' id = 'stickyContent1'>
                    <div className='connect-box-header'>
                       <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752484165/connet_ucmdvh.png' alt='connect-icon'/>
                       <h1>Your perfect study partner is one click away</h1>
                    </div>

                    <div className='connect-box-body'>
                        <p> <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752488183/image-removebg-preview_1_wx2lpo.png' alt='bullet'/> Twindlo analyzes 20+ factors (learning style, timezone, even personality) to pair you with ideal study buddies</p>
                        <p> <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752488183/image-removebg-preview_1_wx2lpo.png' alt='bullet'/>Join niche communities: ‘Late-Night Coders’, ‘Medical Mnemonics Squad’, or ‘GRE Word Warriors’</p>
                        <p> <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752488183/image-removebg-preview_1_wx2lpo.png' alt='bullet'/>All profiles verified via academic emails. Report anyone in 2 taps</p>
                    </div>
                    
                    <div className='connect-box-fire'>
                       <button>CONNECT WITH BUDDY</button>
                    </div>
                 </div>
                 <div className='sticky-content-box collaborate-box' id = 'stickyContent2'>  
                     <div  className='collaborate-box-header'>

                       <div className='collaborate-heading-box'>
                          <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752631115/fire_dlgp2i.png' alt ='fire-icon'/>
                          <h1>Most Productive Rooms Today</h1>  
                       </div>
                        <p>Real-time grinding in progress</p>
                     </div>
                    
                    <div className='neet-room-box element'>
                       <div className='collaborate-room-logo-box'>
                          <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752633958/Screenshot_2025-07-16_081209_ggaats.png' alt='neet-logo'/>
                           <p>The 720 Club</p>
                       </div>
                       <div className='collaborate-room-details'>
                          <p className='participant-count element'>46 Participants</p>
                          <p className='live-users-count element'>{this.liveNeetLearners} <span>Online</span> Now</p>
                          <div className="spin-border-button element">
                              <button> Join Now</button>
                         </div>
                       </div>
                    </div>

                    <div className='react-room-box element'>
                       <div className='collaborate-room-logo-box'>
                          <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752634567/Screenshot_2025-07-16_082231_s7ns0e.png' alt='react-logo'/>
                          <p>React Huddlers</p>
                       </div>
                       <div className='collaborate-room-details'>
                        <p className='participant-count element'>72 Participants</p>
                        <p  className='live-users-count element'>{this.liveReactLearners} <span>Online</span> Now</p>
                        <div className="spin-border-button element">
                              <button>Join Now</button>
                         </div>
                       </div>
                    </div>
                 </div>
                 <div className='sticky-content-box achieve-box' id = 'stickyContent3'>
                      <div className='top-twindlers'>
                         <div className='twindler-one element'>
                             <img className='first-prize-winner' src='https://res.cloudinary.com/djtbynnte/image/upload/v1752675893/first-prize-winner_pwlima.jpg'alt='first-prize-winner'/>
                             <img className='gold-badge' src='https://res.cloudinary.com/djtbynnte/image/upload/v1752677350/gold_yx2y87.png' alt='gold-badge' />
                         </div>

                         <div className='twindler-two-three'>
                               <div className='twindler-two element'>
                                   <img className='second-prize-winner' src='https://res.cloudinary.com/djtbynnte/image/upload/v1752675902/second-prize-winner_k618og.jpg'alt='second-prize-winner'/>
                                    <img className='silver-badge' src='https://res.cloudinary.com/djtbynnte/image/upload/v1752677361/silver_ffadoz.png' alt='silver-badge' />
                              </div>

                              <div className='twindler-three element'>
                                  <img className='third-prize-winner' src='https://res.cloudinary.com/djtbynnte/image/upload/v1752675913/third-prize-winner_hnours.jpg' alt='third-prize-winner'/>
                                   <img className='bronze-badge' src='https://res.cloudinary.com/djtbynnte/image/upload/v1752677378/platinum_bltglq.png' alt='bronze-badge' />
                              </div>
                         </div>

                      </div>

                      <div className='achieve-heading'>
                           <h1><span className='gold-text'>Hussain</span>, <span  className='silver-text'>Vishalini</span> & <span className='bronze-text'>Deepika</span> are winning. Want to join them?</h1>
                     </div> 

                     <div className='achive-body element'>
                        <p> <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752731887/automation-removebg-preview_bto19w.png' alt='icon' /> They don’t just study ,they debate concepts with buddies</p>
                        <p> <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752731897/goals-removebg-preview_kyzaij.png' alt='icon' />Their secret? Weekly challenge battles</p>
                        <p> <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752731875/support_yymzyv.png' alt='icon' />No more ghosting, they found real accountability partners</p>
                     </div>

                     <button className='achive-cta '>See who could be your perfect study match</button>
                 </div>
             </div>
             
         </div>
         
         <div className='user-feedback-container'>
             <UserFeedback/>
         </div>
  
         <KeyFeatures/>
         
          <FooterTwindlo/>
         </>
       )
   }
}

export default Home