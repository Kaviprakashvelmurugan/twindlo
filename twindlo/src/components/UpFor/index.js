import Styles from './index.module.css'
import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'

import Topic from '../Topic'


import { FaFire } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const UpFor = () => {
    const languages = {
        python:'python',
        java:'java',
        javascript:'javascript',
        cplusplus:'c++',
    }

    const languageUrlList= [
        {
            id:'python',
            imageUrl:'https://res.cloudinary.com/djtbynnte/image/upload/python_ybxxsx.png',
            gifUrl:'https://res.cloudinary.com/djtbynnte/image/upload/python_gif_pddzye.gif'

        },
        {
            id:'java',
            imageUrl:'https://res.cloudinary.com/djtbynnte/image/upload/java_k4eqvt.png',
            gifUrl:'https://res.cloudinary.com/djtbynnte/image/upload/java_gif_dm1klr.gif'
        },
        {
            id:'c++',
            imageUrl:'https://res.cloudinary.com/djtbynnte/image/upload/c_asq7mk.png',
            gifUrl:'https://res.cloudinary.com/djtbynnte/image/upload/c_gif_arquzx.png'
        },
        {
            id:'javascript',
            imageUrl:'https://res.cloudinary.com/djtbynnte/image/upload/javascript_jszoev.png',
            gifUrl:'https://res.cloudinary.com/djtbynnte/image/upload/v1759124424/javascript_gif_ylygko.gif'
        }
    ]

    const languageIds = {
        python:1,
        java:2,
        cplusplus:3,
        javascript:4
    }
    
    const apiStatusObj = {
        loading:'loading',
        success:'success',
        failed:'failed'
    }

    const hotTopics = [
        {id:1,
         imageUrl:`https://res.cloudinary.com/djtbynnte/image/upload/java_k4eqvt.png`,
         topic:'HashMap',
         people:245
        },
        {id:2,
         imageUrl:`https://res.cloudinary.com/djtbynnte/image/upload/python_ybxxsx.png`,
         topic:'Recursion',
        people:199
        },
        {id:3,
         imageUrl:`https://res.cloudinary.com/djtbynnte/image/upload/c_asq7mk.png`,
         topic:'STL (Vectors & Maps)',
         people:95
        },
        
    ]
    const fetchTopics = async () => {
        
        const languageId = languageIds[language]
        const jwtToken = Cookies.get('jwtToken')
        const fetchUrl = `http://localhost:3000/topics?language=${languageId}`
        const options = {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${jwtToken}`
            }
        }

        try{
            const response = await fetch(fetchUrl,options)
            const responseTopics =  await response.json()
            console.log('here' , responseTopics)
            setTopics(responseTopics.topics)
            setApiStatus(apiStatusObj.success)
         }
        catch(error){
            console.log(error)
         }
    }
    useEffect(()=>{
        fetchTopics()
    },[])


    const [language,setLanguage] = useState(languages.python)
    const [apiStatus,setApiStatus] = useState(apiStatusObj.loading)
    const [topics,setTopics] = useState(null)

    const renderTopics = () => {
        return topics.map((eachTopic,index)=>{
            return <Topic key ={index} topicDetails={eachTopic}/>
        })
    }

    const renderFailureView = ()=> {
        return (
            <h1>Failed</h1>
        )
    }

    const renderSkeleton= ()=>{
        return (
            <h1>loading</h1>
        )
    }
    const renderSwitcher = () => {

        switch(apiStatus){
            case apiStatusObj.success:
               return renderTopics()
            case apiStatusObj.loading:
                return renderSkeleton()
            default:
                return renderFailureView()
        }
    }


    return (
         <>
          <div className = {Styles.upForHeaderBg}>
             <div className={Styles.upForHeaderContent}>
                 <h1 className={Styles.upForHeading}>Im Up for....</h1>
                 <div className={Styles.languageButtons}>
                    {
                        languageUrlList.map(each=>{
                            return <button onClick={()=>{
                                         setLanguage(each.id)
                                       }} className={`${Styles.languageButton} ${language===each.id ? Styles.makeItBigger:''}`}>
                                       <img src={language===each.id?each.gifUrl:each.imageUrl} alt={each.id}/>
                                   </button>
                        })
                    }
                 </div>
                 <p className={Styles.microClarity}>( Pick your language. Then choose 2+ topics )</p>
             </div>
             <div className={Styles.upForHeaderHotTopics}>
                 <h1 className={Styles.hotTopicHeading}>Hot topics of the week <FaFire/></h1>
                 {
                    hotTopics.map(each=>{
                        return <div className={Styles.hotTopic}>
                                   <img src={each.imageUrl}  alt='hot-topic-image'/>
                                   <p className={Styles.hotTopicPara}>{each.topic}</p>
                                   <p className={Styles.choosenByUsersPara}><FaUser/> {each.people}</p>
                               </div>
                    })
                 }
             </div>
          </div>

          <div className={Styles.topicsHeader}>
               <div>
                   <h1>Build Your Challenge Path</h1>
                   <p>Select at least 2 topics to tailor your coding journey.</p>
               </div>
               <div className={Styles.topicHeaderButtons}>
                  <button className={Styles.announceButton}>Clear</button>    
                  <button className={Styles.clearButton}>Announce</button>
               </div>
               
          </div>
               {
                renderSwitcher()
               }
         </>
    )
}

export default UpFor;