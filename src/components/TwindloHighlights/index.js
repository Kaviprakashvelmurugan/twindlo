import { LuCircleArrowRight } from "react-icons/lu";
import Styles from './index.module.css'

const TwindloHighlights = () => {

    const highlights = [
        {
            imgUrl:'https://res.cloudinary.com/djtbynnte/image/upload/v1756568860/highlight_1_piuivm.png',
            label:'Discover your perfect study partner.'
        },
        {
            imgUrl:'https://res.cloudinary.com/djtbynnte/image/upload/v1756570658/highlight_2_mmoeq4.png',
            label:'Push yourself with AI-powered challenges.'
        },
        {
            imgUrl:'https://res.cloudinary.com/djtbynnte/image/upload/v1756573257/Screenshot_2025-08-30_222557_a8nh6c.png',
            label:'Proactively reminding users in Gmail.'
        }

    ]
    return (
       <div className={Styles.highlightsBg}>
             <div className={Styles.highlightsContent}>
                   <h1 className={Styles.highlightsHeading}>Catch up on the highlights from Twindlo</h1>
                   <button className={Styles.highlightsCta}>See more at Blog</button>

                   <ul className={Styles.highlightCards}>
                       {
                        highlights.map(eachHighlight=>{
                            return <li className={Styles.highlight}>
                                        <img src={eachHighlight.imgUrl} alt='highlight-card'/>
                                        <label>{eachHighlight.label}</label>
                                        <button>Read More <LuCircleArrowRight/> </button>
                                   </li>
                        })
                       }
                   </ul>
             </div>
       </div>

    )
}

export default TwindloHighlights