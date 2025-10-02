import Styles from './index.module.css'
import {useState,useEffect,useRef} from 'react'
import Cookies from 'js-cookie'

import Topic from '../Topic'
import UserContext from '../UserContext'

import { FaFire } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

import { MdArrowDropDownCircle } from "react-icons/md";

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
            id:'cplusplus',
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
        setApiStatus(apiStatusObj.loading)
        setUpForList([])
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
            setTopics(responseTopics.topics)
            setApiStatus(apiStatusObj.success)
         }
        catch(error){
            console.log(error)
         }
    }

    const [language,setLanguage] = useState(languages.python)
    const [apiStatus,setApiStatus] = useState(apiStatusObj.loading)
    const [topics,setTopics] = useState(null)
    const [upForList,setUpForList] = useState([])
    
    const previewContentBox = useRef()
    const dropDownRef = useRef()
    const dropDownSvg = useRef()

    useEffect(()=>{
      fetchTopics()
    },[language])
    
    const hadleTogglingWhenResize = () => {
        if(dropDownSvg.current){
            dropDownSvg.current.classList.remove(Styles.rotateDropDown)
        }
        if(previewContentBox.current){
            previewContentBox.current.classList.remove(Styles.togglePreviewContent)
        }
    }
    useEffect(()=>{
        window.addEventListener('resize',hadleTogglingWhenResize)

        return ()=>{
          window.removeEventListener('resize',hadleTogglingWhenResize)
        }
    },[])
    
    const handleArrowClick  = () => {
        if(dropDownRef.current && dropDownSvg.current){
            dropDownSvg.current.classList.toggle(Styles.rotateDropDown)
        }
        if(previewContentBox.current){
            previewContentBox.current.classList.toggle(Styles.togglePreviewContent)
        }
    }
    const handleTopicSelection =  (uniqueTopic) => {
        let newupForList = [...upForList,uniqueTopic]
        if (upForList.includes(uniqueTopic)){
             newupForList = upForList.filter(each=>{
                return each !== uniqueTopic
             })
        }
        
        setUpForList(newupForList)
    }

    const removeTopic  = event => {

       const filteredTopics = upForList.filter(each=>{
        return each.id !== parseInt(event.target.id)
       })
       setUpForList(filteredTopics)
    }

    const clearUpForList = () => {
        setUpForList([])
    }


    const renderTopics = () => {

        
        return topics.map((eachTopic,index)=>{
            const isTopicSelected = upForList.includes(eachTopic) ? true : false;
            return <Topic key ={index} topicDetails={eachTopic} handleTopicSelection = {handleTopicSelection} isTopicSelected={isTopicSelected} />
        })
    }

    const renderFailureView = ()=> {
        return (
            <h1>Failed</h1>
        )
    }
    
    const renderSkeleton= ()=>{
        return Array.from({length:5}).map((_,index)=>{
             return <div className={Styles.skeletonCard}>
                        <button></button>
                        <div className={Styles.skeletonContent}>
                            <div className={Styles.div1}></div>
                            <div className={Styles.div2}></div>
                        </div>
                    </div>
        })
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
        <UserContext.Consumer>
            {
              (value)=>{
                const {name} = value
                const sendUpForListsToDb = async () => {
                       const jwtToken = Cookies.get('jwtToken')
                       
                       const languageId = languageIds[language]
                       const addUpForData = 'http://localhost:3000/add-upfor'
                       const options = {
                             method:'POST',
                             headers: {
                            'Content-Type':'application/json',
                             Authorization:`Bearer ${jwtToken}`
                            },
                            body:JSON.stringify({
                              languageId,
                              topics:upForList.map(each=>{
                                return each.topic
                              }),
                            })
                        }
                    try {
                        const response = await fetch(addUpForData,options)
                        const jsonResponse = await response.json()
                        console.log(jsonResponse)
                        setUpForList([])
                    }
                    catch(error){
                        console.log(error)
                    }
                }

                return  <>
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
          
          
          <div className={Styles.upForListPreviewBox}>
               <div className={Styles.upForListOverlay}>
               </div>

                <div ref = {dropDownRef} onClick={handleArrowClick} className={Styles.upForListPreviewHeader}>
                           <p>Topics picked by you.</p>
                           <button ><MdArrowDropDownCircle ref={dropDownSvg} /></button>
                </div>
               
               <div ref = {previewContentBox} className={Styles.previewContentBox}>
                    {upForList.length===0 ? (
                      <div className={Styles.emptyUpForBox}>
                          <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1759282817/empty-box_1_kpwwde.png' alt='empty-box'/>
                          <div className={Styles.emptyUpForBoxContent}>
                             <h1>You have'nt pciked any topic yet.</h1>
                             <p>select a topic to get started.</p>
                          </div>
                      </div>
                    )
                    :
                    (
                      <div className={Styles.pickedUpForListBox}>
                            <h1 className={Styles.pickedUpForListBoxHeading}>
                                Topics pciked by you.
                            </h1>

                            <div className={Styles.pickedUpForListBoxContent}>
                                {upForList.map(each=>{
                                    return <button key = {each.id} id={each.id} onClick = {removeTopic}><img src='https://res.cloudinary.com/djtbynnte/image/upload/v1759284417/icons8-cross-128_a7ytrj.png' alt='cross icon'/>  {each.topic}</button>
                                })}
                            </div>    
                      </div>  
                    )
                    }
               </div>
          </div>

          <div className={Styles.topicsHeader}>
               <div>
                   <h1>Build Your Challenge Path</h1>
                   <p>Select at least 2 topics to tailor your coding journey.</p>
               </div>
               <div className={Styles.topicHeaderButtons}>
                  <button onClick = {clearUpForList} disabled={upForList.length===0} className={`${Styles.announceButton} ${upForList.length!==0 ? Styles.showButton :''}`}>Clear</button>    
                  <button onClick = {sendUpForListsToDb} disabled={upForList.length===0} className={`${Styles.clearButton} ${upForList.length!==0 ? Styles.showButton :''}`}>Announce</button>
               </div>
               
          </div>
               {
                renderSwitcher()
               }
         </>
        }
      }
  </UserContext.Consumer>
        
    )
}

export default UpFor;