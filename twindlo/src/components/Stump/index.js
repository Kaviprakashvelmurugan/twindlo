import QuestionItem from '../QuestionItem'
import Styles from './index.module.css'
import {useEffect,useState} from 'react'
import Cookies from 'js-cookie'
import {jwtDecode}  from 'jwt-decode'


const Stump = ()=>{
    
    const [questions,setQuestions]  = useState([])
    const [currentQuestion,changeQuestion] = useState(0)
    const [answersObj,updateAnswerObj] = useState({})
    const [emailVerifyBox,setEmailVerifyBox] = useState(true)
    const [userEmail,setUserEmail] = useState('')


    useEffect(()=>{
        const jwtToken = Cookies.get('jwtToken')
        
        if (jwtToken){
          const decodedJwt = jwtDecode(jwtToken)
          const email = decodedJwt.email
          setUserEmail(email)
    }
    },[])
 


    useEffect(()=>{

        const getOnboardingQuestions = async () => {
           const onBoardingQuesApi = 'http://localhost:3000/onboarding-questions'
           const onBoardingApiOptions =  {
            method:'GET',
            headers: {
             'Content-Type': 'application/json'
            }
           }

           try{
                const onbardingApiResponse = await fetch(onBoardingQuesApi,onBoardingApiOptions)
                const onbardingApiJson = await onbardingApiResponse.json()
                const onboardingQuestions = onbardingApiJson.onboardingQuestions
                if (onbardingApiJson.success){
                    setQuestions(onboardingQuestions)
                }
           }
           catch(error){
            console.log(error)
           }
        }

        getOnboardingQuestions()
    },[])





    const updateQuestion =  step => {
        const questionNum  = currentQuestion;
        console.log('question:', questionNum)
        if (questionNum===questions.length-1 && step==='Next'){
           setEmailVerifyBox(true)
        }

        else {
          if (step==='Next'){
           changeQuestion(questionNum+1)
           setEmailVerifyBox(false)
        }
        else{
            setEmailVerifyBox(false)
            changeQuestion(questionNum-1)
        }
        }
        
    }

    const sendAnswer = (field, value) => {
        updateAnswerObj(prev=>({
            ...prev,
            [field]:value
        }))
    }


    const changeEmail = event => {
          setUserEmail(event.target.value)
    }

    console.log(answersObj)
    return (
        <div className={Styles.stumpBg}>
           <div className={Styles.stumpContent}>

            {emailVerifyBox && <div className={Styles.mailVerifyBox}> 
                                   <div className={Styles.mailVerifyBoxHeader}>
                                       <h1 className={Styles.mailVerifyHeading}>Verify Your Email</h1>
                                       <p className={Styles.emailVerifyStatus}>You can modify your mail!</p>
                                       <div className={Styles.emailVerifyMain}>
                                            <div className={Styles.emailVerifyInputBox}>
                                              <input  onChange = {changeEmail} value = {userEmail} type='text'/>
                                            </div>
                                            <div className={Styles.verifyStatusLoaderBox}>
                                               
                                               <video autoPlay playsInline muted loop preload="metadata" aria-hidden="true"> 
                                               <source src="https://res.cloudinary.com/djtbynnte/video/upload/v1757138781/LOADER-FOR-MAIL_mhqco5.mp4" type="video/mp4" />
                                               Your browser does not support the video tag.</video>
                                            </div>
                                        </div>

                                      
                                       <button className={Styles.emailVerifyCta}>Send OTP</button>
                                   </div>
                                
                                    <div className={Styles.mailVerifyTailBox}>

                                    </div>

                                    



                              </div>
            }

            {!emailVerifyBox && <>
                                 <div className={Styles.stumpQuesBox}>
                                      {questions.length > 0 && <QuestionItem key ={questions[currentQuestion].id}  question = {questions[currentQuestion]} updateQuestion = {updateQuestion} sendAnswer= {sendAnswer} totalQuestions = {questions.length} /> }
                                 </div>
                                 <div className={Styles.stumpTailBox}>
                   
                                  </div>
                                </>
}
         
           </div>
        </div>
    )
}

export default Stump