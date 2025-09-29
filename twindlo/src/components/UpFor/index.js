
import Styles from './index.module.css'
import {useState} from 'react'

const UpFor = () => {
    const languages = {
        initial:'Choose Language',
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



    const [language,setLanguage] = useState(languages.initial)
    return (
         <>
          <div className = {Styles.upForHeaderBg}>
             <div className={Styles.upForHeaderContent}>
                 <h1 className={Styles.upForHeading}>Im Up for !</h1>
                 <p className={`${Styles.language} ${language===languages.initial ? Styles.intialLanguage : ''}`}>{language}</p>
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
             </div>
             <div className={Styles.upForHeaderAnimation}>

             </div>
          </div>
         </>
    )
}

export default UpFor;