import QuestionItem from '../QuestionItem'
import Styles from './index.module.css'
import {useEffect,useState} from 'react'
import Cookies from 'js-cookie'
import {jwtDecode}  from 'jwt-decode'
import { IoIosTimer } from "react-icons/io";

const Stump = ()=>{
    
    const [questions,setQuestions]  = useState([])
    const [currentQuestion,changeQuestion] = useState(0)
    const [answersObj,updateAnswerObj] = useState({})
    const [emailVerifyBox,setEmailVerifyBox] = useState(true)
    const [userEmail,setUserEmail] = useState('')
    const [isMailRecieved,setisMailRecieved] = useState(false)
    const [waitTime,setWaitTime] = useState(25)
    const [veirfyEntry,setVerifyEntry] = useState(false)


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

    let waitTimer;
    const sendOtpAgain = () => {
        clearInterval(waitTimer)
        setisMailRecieved(false)
        setWaitTime(25)
    }

    useEffect(()=>{
       
       if (isMailRecieved){
            waitTimer = setInterval(()=>{
            setWaitTime(prev=>{
              if(prev>0){
                return prev-1
              }
              else{
                sendOtpAgain()
                return 0
              }
            })
           },1000);
        }
        return ()=>{
            clearInterval(waitTimer)
        }
    },[isMailRecieved])


    const verifyEmailApi = async () => {
       const emailVerifyApi = 'http://localhost:3000/send-verify-email'
       const emailVerifyOptions = {
        method:"POST",
        headers : {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({  
            email: userEmail
        })
       }

       try{
        const response = await fetch(emailVerifyApi,emailVerifyOptions)
        const responseData = await response.json()
        console.log('response',response)
        console.log('response data',responseData)

        if (response.ok){
            setVerifyEntry(true)
            setisMailRecieved(true)
        }
       }
       catch(error){
        console.log(error)
       }
    }

    

    return (
        <div className={Styles.stumpBg}>
           <div className={Styles.stumpContent}>

            {emailVerifyBox && <div className={Styles.mailVerifyBox}> 
                                   <div className={Styles.mailVerifyBoxHeader}>
                                       <h1 className={Styles.mailVerifyHeading}>Verify Your Email.</h1>
                                       <p className={Styles.emailVerifyStatus}>You can modify your mail!</p>
                                       <div className={Styles.emailVerifyMain}>
                                            <div className={Styles.emailVerifyInputBox}>
                                              <input  onChange = {changeEmail} value = {userEmail} type='text'/>
                                            </div>
                                       </div>
                                       {veirfyEntry===true && <div className={Styles.otpBox}>
                                         <input placeholder='Enter 6-digit OTP' type='text'/>
                                       </div>}
                                       <div className={Styles.emailButtons}>
                                            <button disabled={isMailRecieved} onClick = {verifyEmailApi} className={Styles.emailSendCta}> {isMailRecieved ? <><IoIosTimer/> {`${waitTime}`}</>  :'Send OTP'}</button>
                                            {veirfyEntry===true && <button onClick = {verifyEmailApi} className={Styles.emailVerifyCta}>Verify OTP</button>}
                                        </div>
                                       
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