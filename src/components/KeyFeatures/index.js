
import {useEffect,useRef,useState}  from 'react'
import { CiCircleChevLeft } from "react-icons/ci"
 import { CiCircleChevRight } from "react-icons/ci"
import FeaturesTab from '../FeaturesTab'
import TaskExplainer from '../TaskExplainer'
import styles from './index.module.css'


const KeyFeatures = () => {

    
    const [featureCardOnScreen, selectFeatureCard] = useState('Match rivals')
    const [deviceScreen,changeDeviceScreen] = useState('small')
    const [showLeftScrollArrow,setLeftScrollArrow] = useState(false)
    const [showRightScrollArrow,setRightScrollArrow] = useState(true)
    const [parasForSmallScreen,setParaForSmallScreen] = useState(false)
    const keyFeaturesContainerReference = useRef(null) 
    const keyFeaturesHeadingReference = useRef(null)
    const scrollableButtonsContainer = useRef(null)

        const featureTabList = [
        {
           id:'Match rivals',
           text:'Match rivals',
        },
        {
           id:'AI Challenge',
           text:'AI Challenge',
        },
        {
           id:'Battle Tasks',
           text:'Battle Tasks',
 
        },
        {
           id:'Streak stats',
           text:'Streak stats',
        },
    
      
    ]


    const TaskIconsObj= [
        {
            id:'INVITE',
            iconUrl:'https://res.cloudinary.com/djtbynnte/image/upload/v1753712525/add-user_gra_x8ym0c.png',
            text:'Partner up and complete tasks side by side',
            subText:'Invite a buddy to your task, stay consistent together, and turn productivity into a shared journey.',
            mouseOnIt:true
        },
        {
            id: 'MULTI_TASK',
            iconUrl: 'https://res.cloudinary.com/djtbynnte/image/upload/v1753798955/Screenshot_2025-07-29_194805_ypfnqh.png', 
            text: 'Create multiple tasks in seconds',
            subText: 'Add a bunch of tasks at once, organize faster, and jump straight into action,all without breaking flow.',
            mouseOnIt:false
        },
        {
           id: 'AI_ASSIST',
           iconUrl: 'https://res.cloudinary.com/djtbynnte/image/upload/v1753795890/Screenshot_2025-07-29_185809_ktcziw.png', 
           text: 'Let Teek guide your next step',
           subText: 'Stuck on a task? Ask teekAi for suggestions, tips, or a smarter way to get it done.',
           mouseOnIt:false
       },
           
    ]

     
    useEffect(()=>{
     
     const keyFeaturesHomesObserver = new IntersectionObserver(([entry])=>{

        if(entry.isIntersecting){
            
            if (keyFeaturesHeadingReference.current){
              
                keyFeaturesHeadingReference.current.classList.add(styles['show-key-features-heading'])
            }
          
        }
        else{
             keyFeaturesHeadingReference.current.classList.remove(styles['show-key-features-heading'])
        }
     },{threshold: 0.5,})
        
     if (keyFeaturesContainerReference.current){
        keyFeaturesHomesObserver.observe(keyFeaturesContainerReference.current)
     }

      return () => {
    keyFeaturesHomesObserver.disconnect();
    };
    },[])
    



    const handleButtonsScroll =direction=>{
     const scrollBox = scrollableButtonsContainer.current
     if (!scrollBox){
        return 
     }
     const scrollAmount = 120 ;
    
     scrollBox.scrollTo(
        {
           left: scrollBox.scrollLeft + (direction === 'right' ? -scrollAmount : scrollAmount),
           behavior:'smooth'
        })
    
        
     if (scrollBox.scrollLeft >= scrollBox.scrollWidth - scrollBox.clientWidth - 1) { // -1 accounts for rounding errors
        setLeftScrollArrow(true);
        setRightScrollArrow(false);
    }
    
    else if (scrollBox.scrollLeft <= 0) {
        setLeftScrollArrow(false);
        setRightScrollArrow(true);
    }
   
    else {
        setLeftScrollArrow(true);
        setRightScrollArrow(true);
    }
    }




    useEffect(()=>{
        if (window.innerWidth<=768){
           setParaForSmallScreen(true)
        }

        const handleWindowWidthChange = () => {
            if (window.innerWidth>=550){
                  changeDeviceScreen('large')
            }
            else{
                changeDeviceScreen('small')
            }

            if (window.innerWidth<=768){
                setParaForSmallScreen(true)
            }
            else{
                setParaForSmallScreen(false)
            }
        }
        
        window.addEventListener('resize',handleWindowWidthChange)
        return ()=>{
            window.removeEventListener('resize',handleWindowWidthChange)
            
           
        }
    },[])



    
    const changeFeatureCard = uniqueId => {
      selectFeatureCard(uniqueId)

    }

    const [taskIconList,setTaskIconList] = useState(TaskIconsObj)

    const updataMouseOnIt = uniqueId => {
        const newTaskIconsList = taskIconList.map(eachIcon=>(
            {
                ...eachIcon,
                mouseOnIt:uniqueId===eachIcon.id
            }
        ))
        setTaskIconList(newTaskIconsList)
    }


    const renderMatchRivalsCard= () => {
        return <div className={styles.matchRivalsBox}>
               <div className={styles.matchRivalsBox1}>
                  <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1753340148/featuresConnect_bqq1ue.png' alt ='matchRivalsImage'/>
               </div>

               <div className={styles.matchRivalsBox2}>
                    <h1>Levelup Together</h1>
                    <h2>Iron sharpens Iron</h2>
                    {
                        parasForSmallScreen? <p>
                                                Progress needs pressure — Twindlo pairs you with rivals for battles, streak duels, and showdowns. The closer the match, the faster you grow. Win or learn, you never stay the same
                                            </p>
                                           
                                           :<p>
                                                                Progress plateaus without pressure. We pair you with rivals who expose your weak spots through timed challenges and scoreboard pressure. Expect late-night comebacks, tactical taunts, and eventual mutual respect ,Find your ultimate study rival—someone at your level who pushes you harder. Twindlo pairs you with competitors for weekly knowledge battles, streak duels, and progress showdowns. The closer the match, the fiercer the growth. Will you out-learn them this month?
                                           </p>
                    }

                    <button>Find One</button>
               </div>
        </div>
    }

    const renderAiChallengeCard = () => {
        return <div className={styles.aiChallengesCard}>
                  <div className={styles.teekHeader}>
                       <div className={styles.teekLogo}>
                            <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1753418361/teek_logo_jlunee.png' alt='teekAi Logo'/>
                           
                       </div>
                       <div className={styles.teekNameAndSlogan}>
                           <h1>teekAi</h1>
                           <p>Your Smarter Study Sidekick.</p>
                       </div>

                       
                      
                  </div>

                  <div className={styles.teekContentParent}>
                       <div className={styles.teekInfoCard}>
                          <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1753424720/teek_credit_logo_vabuwl.png' alt='teel openAi'/>

                          <h1>Meet Teek — your smarter study sidekick.</h1>
                          {
                            parasForSmallScreen? <p>Teek, powered by OpenAI, helps you learn faster, stay consistent, and track goals — with challenges to keep you and your friends motivated.</p>:<p>Built into Twindlo and powered by OpenAI, Teek helps you learn faster, stay consistent, and tackle any subject with confidence. Whether you're revising key concepts, generating challenge questions, or planning your study goals — Teek is always by your side.
                                    Feeling competitive? Use Teek to challenge your buddies, and keep each other motivated.</p>
                          }
                          
                       </div>

                       <ul className={styles.teekBulletsCard}>
                            <li>
                                <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1753426594/check_icon_coutht.png' alt='check icon'/>
                                <p>Creates smart questions from your tasks — instantly</p>
                            </li>
                            <li>
                                 <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1753426594/check_icon_coutht.png' alt='check icon'/>
                                <p>Challenges you to recall and apply what you study.</p>
                            </li>
                            <li>
                                <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1753426594/check_icon_coutht.png' alt='check icon'/>
                                <p>Lets you challenge your buddies and compete for streaks</p>
                            </li>
                            <li>
                                 <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1753426594/check_icon_coutht.png' alt='check icon'/>
                                <p>Pushes you to stay consistent, focused, and ahead of the pack.</p>
                            </li>
                       </ul>
                  </div>

               </div>
    }

    const renderBattleTasksCard = () => {
        return <div className={styles.battleTaskCard}> 
               <div className={styles.battleTaskContent}>
                  <div className={styles.battleTaskContent1}>
                     <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1753693492/image-removebg-preview_7_ts7elo.png' alt='task-sample'/>
                     <h1>Make every task <br/>a showdown</h1>
                     <p>Win the day, one task at a time</p>
                     <div className={styles.taskCtaBg}>
                       <button>Create a task</button>
                     </div> 
                  </div>
                   <div className={styles.battleTaskContent2}>
                    {
                        taskIconList.map(eachTaskIcon=>{
                          return <TaskExplainer key ={eachTaskIcon.id} taskIcon={eachTaskIcon} updataMouseOnIt = {updataMouseOnIt}/>
                        })
                    }
                       
                  </div>
               </div>
        </div>
             
    }

    const renderStreakStatsCard = () => {
        return <div className={styles.streaksStatsCard}>
             <div className={styles.streaksStatsCardContent}>
                 <div className={styles.streaksStatsCardContent1}>
                    <div className={styles.pinkBoxstreakCard}>
                         <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1754717707/streak_card_sample_fcub6t.png' alt='streak card demo'/>
                          <div className={styles.streakPointsCard}>
                              <h1>Make Every Day Count</h1>  
                              <p>Keep your streak alive — daily wins build lasting success.</p>
                             <button>Get Started</button>
                          </div>
                     </div>
                 </div> 
                 <div className={styles.streaksStatsCardContent2}>
                     <div className={styles.paperCard}>
                        <img className={styles.paperImage} src='https://res.cloudinary.com/djtbynnte/image/upload/v1754667140/image-removebg-preview_8_qpsza3.png' alt='paper-no-bg'/>
                        <h1 className={styles.paperHeading}>Every day you show up <br/> <span>twindlo</span> remembers</h1>
                        <p className={styles.paperPara}>Consistency that shows. Streaks keep your momentum alive</p>
                        <button className={styles.paperCta}>Know More</button>
                     </div>

                     <div className={styles.leaderBoardBtnCardHome}>
                           <div className={styles.leaderBoardCtaBg}>
                               <button>View Leaderboard</button>
                           </div>
                     </div>
                 </div> 
             </div>
        </div>
             
    }

  
    const featuresContentSwitcher = featureId =>{
        
        switch(featureId){
            case 'AI Challenge':
                return renderAiChallengeCard()
            case 'Battle Tasks':
                return renderBattleTasksCard()
            case 'Streak stats':
                return renderStreakStatsCard()
            default:
                return renderMatchRivalsCard()
        }
    }
    
    
    
    return (
      
      <div ref = {keyFeaturesContainerReference} className={styles.keyfeaturesBg}>
           <div className={styles.keyfeaturesContent}>
                <div  className={styles.keyfeaturesHeader}>
                    <h1 ref = {keyFeaturesHeadingReference} className={styles.keyfeaturesHeading}>Compete With Buddies. Streak Smarter. Own the Rankings</h1>
                    <button className={styles.keyfeaturesCta}>Get Started</button>
                </div>
                <div className={styles.keyfeaturesDetailsBox}>

                    {     
                        (deviceScreen==='small' && showLeftScrollArrow) && <div onClick={()=>{
                                                        return handleButtonsScroll('right')
                                                        }} 
                                                    className={styles.moveLeft}>
                                                        <CiCircleChevLeft/>
                                                   </div>
                    }

                    {
                        (deviceScreen==='small' && showRightScrollArrow) && <div onClick={()=>{
                                                      return handleButtonsScroll('left')
                                                     }} className={styles.moveRight}>
                                                        <CiCircleChevRight/>
                                                     </div>
                    }
                    
                    <div ref ={scrollableButtonsContainer} className={styles.featureButtons}>
                        
                        
                        {featureTabList.map(eachTab=>{
                            return <FeaturesTab key = {eachTab.id} tab={eachTab} changeFeatureCard={changeFeatureCard} feature= {featureCardOnScreen}/>
                        })}
                       
                    </div>

                    <div className={styles.featureExplainer}>
                        {featuresContentSwitcher(featureCardOnScreen)}
                    </div>
                </div>
           </div>
      </div>

    )
}

export default KeyFeatures