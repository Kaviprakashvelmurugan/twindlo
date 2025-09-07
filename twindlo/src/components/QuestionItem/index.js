import { useState, useRef , useEffect} from 'react'
import Styles from './index.module.css'

import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

const QuestionItem = ({question,totalQuestions,updateQuestion,sendAnswer}) => {
    
    const {id, field,questionText,subtext,placeholder,type,options,required} = question


    const [answer,setAnswer] = useState('');
    const [interests,setInterests] = useState([])
    const requiredRef = useRef()
    const scrollBox = useRef()
    const topArrow= useRef()
    const bottomArrow = useRef()


    useEffect(()=>{
       
      if (scrollBox.current){
          if (scrollBox.current.scrollTop===0){
            if (topArrow.current)
              topArrow.current.classList.add(Styles.hideArrow)
          }
        }
    },[])

    const updateAnswer = event => {
           setAnswer(event.target.value)
    }


    const handleNext = action => {
        if (type==='text' || type==='select'){
             if (answer===''){
               if (requiredRef.current){
                requiredRef.current.classList.add(`${Styles.turnRed}`)
               }
             }
             else {
               console.log(answer)
               console.log(field)
               sendAnswer(field,answer)
                updateQuestion(action)
             }
        }
        else{
          if (interests.length===0){
               if (requiredRef.current){
                requiredRef.current.classList.add(`${Styles.turnRed}`)
               }
             }
             else{
               
                sendAnswer(field,interests)
                updateQuestion(action)

             }
         
        }
    }   


    const handleBack = action => {
        updateQuestion(action)
    }


    const handleChecking = event => {
        if(event.target.checked){
           const previousInterests = interests
           const newInterestList = [...previousInterests,event.target.value]
           setInterests(newInterestList)
        }
         
        else{
          const previousInterests = interests
          const newInterestList = previousInterests.filter(each=>{
               return each !== event.target.value
          })
           setInterests(newInterestList)
        }
    }

    
    
    const handleScroll = direction => {
        const scrollContainer = scrollBox.current 
        if (scrollContainer){
          if (scrollContainer.scrollTop===0){
            if (topArrow.current){
               topArrow.current.classList.add(Styles.hideArrow)
                bottomArrow.current.classList.remove(Styles.hideArrow)
            }   
          }

          else if (scrollContainer.scrollTop>=(scrollContainer.scrollHeight-scrollContainer.clientHeight)-10){
            if (bottomArrow.current){
              bottomArrow.current.classList.add(Styles.hideArrow)
              topArrow.current.classList.remove(Styles.hideArrow)
            }
          }

          else{
            bottomArrow.current.classList.remove(Styles.hideArrow)
              topArrow.current.classList.remove(Styles.hideArrow)
          }
          console.log(scrollContainer.scrollTop)
          console.log(scrollContainer.scrollHeight-scrollContainer.clientHeight)
          const scrollAmount = 100
          scrollContainer.scrollTo({
            top: scrollContainer.scrollTop + (direction === "bottom" ? scrollAmount : -120),
            behavior:'smooth'
          })
        }
    }

    return (
         <div className={Styles.questionItem}>
               <div className={Styles.headerBox}>
                   <div>
                        {  required?  
                          <h1 className={Styles.questionHeading} > {questionText} <span ref = {requiredRef} className={Styles.required}>required</span> </h1>
                          :  
                          <h1 className={Styles.questionHeading} >{questionText}</h1>
                        }
                       <p className={Styles.questionSubtext}>{subtext}</p>
                   </div>
                   <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752215015/twindlo_logo_all_device_p5x0pi.png' alt='twindlo-logo'/>
               </div>
               
               <div className = {type !=='checkbox'? `${Styles.inputBox}` :`${Styles.checkboxBox}`}>
                  {type==='text' && <input  className={Styles.textInput} value ={answer} onChange = {updateAnswer} placeholder={placeholder}/> }


                  {type==='select' &&  <select className={Styles.selectInput} onChange = {updateAnswer} defaultValue =''>
                                                <option value='' disabled >{placeholder}</option>
                                                    {options.map((value,index)=>{
                                                         return <option  value ={value} key={index}>{value}</option>
                                                    })}
                                       </select>}


                   {type==='checkbox'&& <div ref = {scrollBox} className={Styles.checkboxParent}>
                           <button ref = {topArrow} onClick={()=>{handleScroll('top')}} className={Styles.topArrow}> <IoMdArrowDropup/> </button>
                           <button ref = {bottomArrow} onClick={()=>{handleScroll('bottom')}} className={Styles.bottomArrow}><IoMdArrowDropdown/> </button>
                           {options.map((eachBox,index)=>{
                            return <label key ={index}> <input value ={eachBox} onChange = {handleChecking} type={type}/> {eachBox}</label>
                           })}
                    </div>}
               </div>
               <div className={Styles.qustionCtaBox}>
                  <button onClick = {()=>{handleNext('Next')}} className={Styles.nextCta}>Next</button>
                  {id>1  && <button onClick = {()=>{handleBack('Back')}} className={Styles.backCta}>Back</button>}
                  
                </div>
               
         </div>
       
    )
}

export default QuestionItem